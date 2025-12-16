# I/O Multiplexing

## The Concurrency Problem

A simple server handles one client at a time—while processing one client, others wait. This is unacceptable for most applications.

Solutions:
1. **Multi-process**: Fork a process per client
2. **Multi-threaded**: Thread per client
3. **I/O multiplexing**: One thread handles many connections
4. **Async I/O**: Kernel handles completion notification

I/O multiplexing lets a single thread monitor multiple file descriptors efficiently.

## Blocking vs Non-Blocking I/O

**Blocking I/O** (default):
```c
recv(sockfd, buffer, size, 0);  // Blocks until data available
```

**Non-blocking I/O**:
```c
fcntl(sockfd, F_SETFL, O_NONBLOCK);
ssize_t n = recv(sockfd, buffer, size, 0);
if (n == -1 && errno == EAGAIN) {
    // No data available, try again later
}
```

Non-blocking alone requires busy-waiting. I/O multiplexing tells us *when* to try.

## select()

The original multiplexing call:

```c
int select(int nfds,
           fd_set *readfds,    // Check for readable
           fd_set *writefds,   // Check for writable
           fd_set *exceptfds,  // Check for exceptions
           struct timeval *timeout);
```

**fd_set operations**:
```c
fd_set read_fds;
FD_ZERO(&read_fds);        // Clear set
FD_SET(sockfd, &read_fds); // Add fd to set
FD_CLR(sockfd, &read_fds); // Remove fd from set
FD_ISSET(sockfd, &read_fds); // Check if fd is in set
```

## select() Example

```c
#include <sys/select.h>

int server_fd;  // Listening socket
int client_fds[MAX_CLIENTS];
int max_fd;

fd_set read_fds;

while (1) {
    FD_ZERO(&read_fds);
    FD_SET(server_fd, &read_fds);
    max_fd = server_fd;

    // Add all client sockets
    for (int i = 0; i < MAX_CLIENTS; i++) {
        if (client_fds[i] > 0) {
            FD_SET(client_fds[i], &read_fds);
            if (client_fds[i] > max_fd)
                max_fd = client_fds[i];
        }
    }

    // Wait for activity
    int activity = select(max_fd + 1, &read_fds, NULL, NULL, NULL);

    // Check for new connection
    if (FD_ISSET(server_fd, &read_fds)) {
        int new_fd = accept(server_fd, NULL, NULL);
        // Add to client_fds array
    }

    // Check for client activity
    for (int i = 0; i < MAX_CLIENTS; i++) {
        if (client_fds[i] > 0 && FD_ISSET(client_fds[i], &read_fds)) {
            // Handle client data
        }
    }
}
```

## select() Limitations

- **FD_SETSIZE limit**: Usually 1024 file descriptors
- **O(n) scanning**: Must check every fd after return
- **Modifies fd_sets**: Must rebuild before each call
- **Poor scalability**: Performance degrades with many connections

## poll()

Addresses some select() limitations:

```c
#include <poll.h>

int poll(struct pollfd *fds, nfds_t nfds, int timeout);

struct pollfd {
    int   fd;       // File descriptor
    short events;   // Events to monitor
    short revents;  // Events that occurred
};
```

**Event flags**:
```c
POLLIN   // Data available to read
POLLOUT  // Writing won't block
POLLERR  // Error occurred
POLLHUP  // Peer closed connection
```

## poll() Example

```c
struct pollfd fds[MAX_FDS];
int nfds = 0;

// Add listening socket
fds[nfds].fd = server_fd;
fds[nfds].events = POLLIN;
nfds++;

while (1) {
    int ret = poll(fds, nfds, -1);  // -1 = wait forever

    // Check listening socket
    if (fds[0].revents & POLLIN) {
        int client_fd = accept(server_fd, NULL, NULL);
        fds[nfds].fd = client_fd;
        fds[nfds].events = POLLIN;
        nfds++;
    }

    // Check client sockets
    for (int i = 1; i < nfds; i++) {
        if (fds[i].revents & POLLIN) {
            char buffer[1024];
            ssize_t n = recv(fds[i].fd, buffer, sizeof(buffer), 0);
            if (n <= 0) {
                close(fds[i].fd);
                fds[i].fd = -1;  // Mark as removed
            } else {
                // Process data
            }
        }
    }
}
```

## poll() vs select()

| Aspect | select() | poll() |
|--------|----------|--------|
| Limit | FD_SETSIZE | No limit |
| Interface | fd_sets | Array of pollfd |
| Modify input | Yes | No (separate revents) |
| Portability | Everywhere | POSIX |
| Scalability | Poor | Better but still O(n) |

## epoll (Linux)

For high-performance servers, Linux provides epoll:

```c
#include <sys/epoll.h>

int epoll_create1(int flags);
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);
```

**Key advantages**:
- O(1) operations—kernel tracks ready fds
- Returns only ready file descriptors
- Supports edge-triggered mode
- Scales to thousands of connections

## epoll Example

```c
int epfd = epoll_create1(0);

// Add listening socket
struct epoll_event ev;
ev.events = EPOLLIN;
ev.data.fd = server_fd;
epoll_ctl(epfd, EPOLL_CTL_ADD, server_fd, &ev);

struct epoll_event events[MAX_EVENTS];

while (1) {
    int nready = epoll_wait(epfd, events, MAX_EVENTS, -1);

    for (int i = 0; i < nready; i++) {
        if (events[i].data.fd == server_fd) {
            // New connection
            int client_fd = accept(server_fd, NULL, NULL);
            ev.events = EPOLLIN;
            ev.data.fd = client_fd;
            epoll_ctl(epfd, EPOLL_CTL_ADD, client_fd, &ev);
        } else {
            // Client data
            handle_client(events[i].data.fd);
        }
    }
}
```

## Level-Triggered vs Edge-Triggered

**Level-triggered** (default):
- epoll_wait returns if fd is ready
- Returns repeatedly as long as condition is true
- Easier to program

**Edge-triggered** (EPOLLET):
- Returns only when state changes
- Must read/write until EAGAIN
- More efficient but harder to use correctly

```c
// Edge-triggered setup
ev.events = EPOLLIN | EPOLLET;
epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev);

// Must drain socket completely
while (1) {
    ssize_t n = recv(fd, buffer, sizeof(buffer), 0);
    if (n == -1 && errno == EAGAIN)
        break;  // Done reading
    // Process data
}
```

## kqueue (BSD/macOS)

BSD systems provide kqueue:

```c
int kqueue(void);
int kevent(int kq, const struct kevent *changelist, int nchanges,
           struct kevent *eventlist, int nevents,
           const struct timespec *timeout);
```

Similar performance to epoll, different API.

## Choosing the Right Approach

| Approach | When to use |
|----------|-------------|
| select() | Cross-platform, few connections |
| poll() | Cross-platform, moderate connections |
| epoll | Linux, many connections |
| kqueue | BSD/macOS, many connections |

For new code, consider libraries like libevent or libuv that provide a unified interface.
