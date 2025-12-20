---
id: cs302-t7-ftp
title: "FTP and SSH"
order: 5
---

# FTP and SSH

## FTP: File Transfer Protocol

FTP is one of the oldest Internet protocols, designed for transferring files between hosts. While largely superseded by more secure alternatives, understanding FTP illuminates fundamental file transfer concepts.

## FTP Architecture

FTP uses two connections:

**Control connection** (port 21):
- Persistent during session
- Commands and responses
- Text-based protocol

**Data connection** (port 20 or dynamic):
- Opened per transfer
- Actual file data
- Closed after transfer

```
Client                              Server
   |------ Control (port 21) ------->|
   |                                  |
   |<===== Data (port 20) ===========>|
```

## FTP Commands

**Access control**:
```
USER alice      # Specify username
PASS secret     # Specify password
QUIT            # End session
```

**File operations**:
```
RETR file.txt   # Retrieve (download)
STOR file.txt   # Store (upload)
DELE file.txt   # Delete
RNFR old.txt    # Rename from
RNTO new.txt    # Rename to
```

**Directory operations**:
```
CWD /path       # Change directory
PWD             # Print working directory
LIST            # List files
MKD dirname     # Make directory
RMD dirname     # Remove directory
```

**Transfer settings**:
```
TYPE A          # ASCII mode
TYPE I          # Binary (Image) mode
PASV            # Passive mode
PORT h1,h2,h3,h4,p1,p2  # Active mode
```

## FTP Response Codes

```
1xx: Positive preliminary (command accepted, wait)
2xx: Positive completion (success)
3xx: Positive intermediate (need more info)
4xx: Transient negative (temporary failure)
5xx: Permanent negative (error)
```

**Common codes**:
- 220: Service ready
- 230: User logged in
- 226: Transfer complete
- 550: File not found

## Active vs Passive Mode

**Active mode**:
1. Client sends PORT command with IP:port
2. Server connects to client's port
3. **Problem**: Client firewalls block incoming

**Passive mode** (preferred):
1. Client sends PASV command
2. Server responds with IP:port
3. Client connects to server's port
4. Works through client firewalls

```
Active:
Client:5000 ←--- Server:20    (Server initiates)

Passive:
Client:random ---→ Server:random    (Client initiates)
```

## FTP Session Example

```
S: 220 FTP server ready
C: USER alice
S: 331 Password required
C: PASS secret
S: 230 User logged in
C: PWD
S: 257 "/" is current directory
C: PASV
S: 227 Entering Passive Mode (192,168,1,1,156,64)
C: LIST
S: 150 Opening data connection
[data connection: directory listing]
S: 226 Transfer complete
C: TYPE I
S: 200 Type set to I
C: PASV
S: 227 Entering Passive Mode (192,168,1,1,156,65)
C: RETR document.pdf
S: 150 Opening data connection
[data connection: file data]
S: 226 Transfer complete
C: QUIT
S: 221 Goodbye
```

## FTP Security Issues

**No encryption**: Passwords sent in plaintext
**Firewall complexity**: Multiple connections, dynamic ports
**Bounce attacks**: Using server to scan other hosts

**Secure alternatives**:
- **SFTP**: SSH File Transfer Protocol
- **FTPS**: FTP over TLS
- **SCP**: Secure Copy

## SSH: Secure Shell

SSH provides secure remote access and file transfer. It replaced insecure protocols like telnet, rlogin, and rsh.

**Port 22** (default)

**SSH provides**:
- Encrypted communication
- Server authentication
- Client authentication
- Port forwarding
- File transfer (SFTP, SCP)

## SSH Protocol Layers

```
┌─────────────────────────────┐
│  Application (shell, sftp) │
├─────────────────────────────┤
│     Connection Protocol     │
│  (channels, port forwarding)│
├─────────────────────────────┤
│  User Authentication Protocol│
│  (password, publickey)      │
├─────────────────────────────┤
│   Transport Layer Protocol  │
│  (encryption, integrity)    │
├─────────────────────────────┤
│          TCP/IP             │
└─────────────────────────────┘
```

## SSH Connection Establishment

1. **TCP connection** to port 22

2. **Version exchange**:
```
SSH-2.0-OpenSSH_8.9
```

3. **Key exchange**: Agree on encryption, exchange session keys

4. **Server authentication**: Client verifies server's host key

5. **User authentication**: Password, public key, or other

6. **Session**: Interactive shell, command execution, or file transfer

## SSH Authentication Methods

**Password**:
```bash
ssh alice@server.example.com
Password: ****
```

**Public key** (preferred):
```bash
# Generate key pair
ssh-keygen -t ed25519

# Copy public key to server
ssh-copy-id alice@server.example.com

# Login without password
ssh alice@server.example.com
```

**Key-based auth flow**:
1. Client offers public key
2. Server checks authorized_keys
3. Server sends challenge
4. Client signs with private key
5. Server verifies signature

## SSH Host Keys

First connection:
```
The authenticity of host 'server (192.168.1.1)' can't be established.
ED25519 key fingerprint is SHA256:abcd1234...
Are you sure you want to continue connecting (yes/no)?
```

Stored in `~/.ssh/known_hosts`. Warning if key changes (possible attack).

## SFTP: SSH File Transfer Protocol

Secure file transfer over SSH:

```bash
sftp alice@server.example.com

sftp> pwd
/home/alice
sftp> ls
file1.txt  file2.txt
sftp> get file1.txt
sftp> put local.txt
sftp> bye
```

**Not FTP over SSH**—completely different protocol with richer functionality.

## SCP: Secure Copy

Simple file copy over SSH:

```bash
# Copy local to remote
scp file.txt alice@server:/path/

# Copy remote to local
scp alice@server:/path/file.txt .

# Copy directory recursively
scp -r directory/ alice@server:/path/

# With specific port
scp -P 2222 file.txt alice@server:/path/
```

## SSH Port Forwarding

**Local forwarding** (access remote service locally):
```bash
ssh -L 8080:localhost:80 alice@server
# localhost:8080 → server:80
```

**Remote forwarding** (expose local service remotely):
```bash
ssh -R 8080:localhost:3000 alice@server
# server:8080 → localhost:3000
```

**Dynamic forwarding** (SOCKS proxy):
```bash
ssh -D 1080 alice@server
# Configure browser to use localhost:1080 as SOCKS proxy
```

## SSH Configuration

`~/.ssh/config`:
```
Host myserver
    HostName server.example.com
    User alice
    Port 2222
    IdentityFile ~/.ssh/mykey

Host *
    ServerAliveInterval 60
```

Then simply: `ssh myserver`

## Security Best Practices

**Disable password auth** (use keys only):
```
# /etc/ssh/sshd_config
PasswordAuthentication no
```

**Use strong keys**:
```bash
ssh-keygen -t ed25519
# or RSA with 4096 bits
```

**Protect private keys**:
- File permissions 600
- Use passphrase
- Never share

**Keep software updated**: SSH vulnerabilities exist
