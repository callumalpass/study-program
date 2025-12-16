# Interprocess Communication: Message Passing

Message passing enables processes to communicate by sending and receiving messages without sharing memory. This subtopic covers pipes, message queues, and sockets.

## Message Passing Model

In the message passing model, processes communicate by:
1. Sending messages to the kernel
2. Kernel delivers messages to recipient

```
Message Passing Model:
┌─────────────┐                 ┌─────────────┐
│  Process A  │                 │  Process B  │
│             │                 │             │
│   send()    │                 │   recv()    │
└──────┬──────┘                 └──────┬──────┘
       │                               ↑
       │         ┌─────────┐           │
       └────────→│  Kernel │───────────┘
                 │ Message │
                 │  Queue  │
                 └─────────┘
```

## Pipes

### Anonymous Pipes

Pipes provide unidirectional communication between related processes:

```c
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int main() {
    int pipefd[2];  // pipefd[0] for read, pipefd[1] for write
    char buffer[100];

    // Create pipe
    if (pipe(pipefd) == -1) {
        perror("pipe");
        return 1;
    }

    pid_t pid = fork();

    if (pid == 0) {
        // Child: read from pipe
        close(pipefd[1]);  // Close write end

        int n = read(pipefd[0], buffer, sizeof(buffer));
        printf("Child received: %s\n", buffer);

        close(pipefd[0]);
    } else {
        // Parent: write to pipe
        close(pipefd[0]);  // Close read end

        char *msg = "Hello from parent!";
        write(pipefd[1], msg, strlen(msg) + 1);

        close(pipefd[1]);
        wait(NULL);
    }

    return 0;
}
```

### Bidirectional Communication

Requires two pipes:

```c
int pipe_parent_to_child[2];
int pipe_child_to_parent[2];

pipe(pipe_parent_to_child);
pipe(pipe_child_to_parent);

if (fork() == 0) {
    // Child
    close(pipe_parent_to_child[1]);  // Close write
    close(pipe_child_to_parent[0]);  // Close read

    // Read from parent
    read(pipe_parent_to_child[0], buffer, size);

    // Write to parent
    write(pipe_child_to_parent[1], response, size);
}
```

### Named Pipes (FIFOs)

Named pipes exist in the file system and can connect unrelated processes:

```c
#include <sys/stat.h>
#include <fcntl.h>

// Create FIFO
mkfifo("/tmp/myfifo", 0666);

// Writer process
int fd = open("/tmp/myfifo", O_WRONLY);
write(fd, "Hello", 6);
close(fd);

// Reader process (separate program)
int fd = open("/tmp/myfifo", O_RDONLY);
char buf[100];
read(fd, buf, sizeof(buf));
close(fd);

// Remove when done
unlink("/tmp/myfifo");
```

From command line:
```bash
# Terminal 1 (reader)
cat < /tmp/myfifo

# Terminal 2 (writer)
echo "Hello" > /tmp/myfifo
```

## Message Queues

### POSIX Message Queues

```c
#include <mqueue.h>
#include <stdio.h>
#include <string.h>

#define QUEUE_NAME "/my_queue"
#define MAX_MSG_SIZE 256
#define MAX_MSGS 10

// Sender
int sender() {
    struct mq_attr attr = {
        .mq_flags = 0,
        .mq_maxmsg = MAX_MSGS,
        .mq_msgsize = MAX_MSG_SIZE,
        .mq_curmsgs = 0
    };

    mqd_t mq = mq_open(QUEUE_NAME, O_CREAT | O_WRONLY, 0644, &attr);
    if (mq == (mqd_t)-1) {
        perror("mq_open");
        return 1;
    }

    char msg[] = "Hello via message queue!";
    if (mq_send(mq, msg, strlen(msg) + 1, 0) == -1) {
        perror("mq_send");
        return 1;
    }

    mq_close(mq);
    return 0;
}

// Receiver
int receiver() {
    mqd_t mq = mq_open(QUEUE_NAME, O_RDONLY);
    if (mq == (mqd_t)-1) {
        perror("mq_open");
        return 1;
    }

    char buffer[MAX_MSG_SIZE];
    ssize_t bytes = mq_receive(mq, buffer, MAX_MSG_SIZE, NULL);
    if (bytes == -1) {
        perror("mq_receive");
        return 1;
    }

    printf("Received: %s\n", buffer);

    mq_close(mq);
    mq_unlink(QUEUE_NAME);
    return 0;
}
```

### System V Message Queues

```c
#include <sys/msg.h>
#include <string.h>
#include <stdio.h>

#define MSG_KEY 1234

struct message {
    long mtype;        // Message type (must be > 0)
    char mtext[256];   // Message data
};

// Sender
int sender() {
    int msqid = msgget(MSG_KEY, IPC_CREAT | 0666);

    struct message msg;
    msg.mtype = 1;  // Message type
    strcpy(msg.mtext, "Hello!");

    msgsnd(msqid, &msg, strlen(msg.mtext) + 1, 0);
    return 0;
}

// Receiver
int receiver() {
    int msqid = msgget(MSG_KEY, 0666);

    struct message msg;
    msgrcv(msqid, &msg, sizeof(msg.mtext), 1, 0);

    printf("Received: %s\n", msg.mtext);

    msgctl(msqid, IPC_RMID, NULL);  // Remove queue
    return 0;
}
```

## Sockets for IPC

### Unix Domain Sockets

Local sockets for same-machine communication:

```c
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>
#include <stdio.h>

#define SOCKET_PATH "/tmp/mysocket"

// Server
int server() {
    int server_fd = socket(AF_UNIX, SOCK_STREAM, 0);

    struct sockaddr_un addr;
    addr.sun_family = AF_UNIX;
    strcpy(addr.sun_path, SOCKET_PATH);

    unlink(SOCKET_PATH);
    bind(server_fd, (struct sockaddr *)&addr, sizeof(addr));
    listen(server_fd, 5);

    int client_fd = accept(server_fd, NULL, NULL);

    char buffer[256];
    read(client_fd, buffer, sizeof(buffer));
    printf("Server received: %s\n", buffer);

    write(client_fd, "Hello back!", 12);

    close(client_fd);
    close(server_fd);
    unlink(SOCKET_PATH);
    return 0;
}

// Client
int client() {
    int sock_fd = socket(AF_UNIX, SOCK_STREAM, 0);

    struct sockaddr_un addr;
    addr.sun_family = AF_UNIX;
    strcpy(addr.sun_path, SOCKET_PATH);

    connect(sock_fd, (struct sockaddr *)&addr, sizeof(addr));

    write(sock_fd, "Hello server!", 14);

    char buffer[256];
    read(sock_fd, buffer, sizeof(buffer));
    printf("Client received: %s\n", buffer);

    close(sock_fd);
    return 0;
}
```

### Socket Pairs

For related processes:

```c
#include <sys/socket.h>

int sv[2];  // Socket pair

socketpair(AF_UNIX, SOCK_STREAM, 0, sv);

if (fork() == 0) {
    // Child uses sv[1]
    close(sv[0]);
    write(sv[1], "From child", 11);
    close(sv[1]);
} else {
    // Parent uses sv[0]
    close(sv[1]);
    char buf[100];
    read(sv[0], buf, sizeof(buf));
    printf("Parent got: %s\n", buf);
    close(sv[0]);
    wait(NULL);
}
```

## Blocking vs Non-blocking

### Blocking (Synchronous)

```c
// Blocks until message available
msgrcv(msqid, &msg, size, type, 0);

// Blocks until buffer space available
msgsnd(msqid, &msg, size, 0);
```

### Non-blocking (Asynchronous)

```c
// Return immediately with error if would block
if (msgrcv(msqid, &msg, size, type, IPC_NOWAIT) == -1) {
    if (errno == ENOMSG) {
        // No message available
    }
}

// For sockets
fcntl(fd, F_SETFL, O_NONBLOCK);
```

## Direct vs Indirect Communication

### Direct Communication

```c
// Process A sends directly to Process B
send(B, message);
receive(A, message);

// Both must name each other
// Symmetric: send(P, msg), receive(P, msg)
// Asymmetric: send(P, msg), receive(&id, msg)
```

### Indirect Communication

```c
// Communication through mailbox/port
send(mailbox_A, message);
receive(mailbox_A, message);

// Multiple processes can share a mailbox
// More flexible, decoupled
```

## Comparison of IPC Methods

| Method | Speed | Direction | Scope | Use Case |
|--------|-------|-----------|-------|----------|
| Pipe | Fast | Unidirectional | Related | Simple streams |
| FIFO | Moderate | Unidirectional | Any local | Named channels |
| Message Queue | Moderate | Bidirectional | Any local | Structured messages |
| Unix Socket | Fast | Bidirectional | Local | Client-server |
| TCP Socket | Slow | Bidirectional | Network | Distributed |

## Message Passing vs Shared Memory

```c
// Message Passing: Data copied through kernel
send(dest, data, size);  // User → Kernel
receive(src, buf, size); // Kernel → User

// Shared Memory: Direct access, no copying
*shared_ptr = data;      // Direct write
data = *shared_ptr;      // Direct read
```

Choose message passing when:
- Processes are on different machines
- Simpler programming model needed
- Data amounts are small
- Stronger isolation desired

## Summary

Message passing provides structured IPC:
- Pipes: Simple unidirectional streams for related processes
- FIFOs: Named pipes for unrelated processes
- Message queues: Structured messages with priorities
- Sockets: Flexible, can work over network
- Blocking/non-blocking modes for different needs
- Kernel mediates all communication
- Safer than shared memory but slower for large data
