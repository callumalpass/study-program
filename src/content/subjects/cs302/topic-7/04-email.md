# Email Protocols

## Email System Overview

Email involves multiple protocols:

**SMTP** (Simple Mail Transfer Protocol): Sending mail
**IMAP** (Internet Message Access Protocol): Accessing mail
**POP3** (Post Office Protocol v3): Downloading mail

```
Sender → [MUA] → SMTP → [MTA] → SMTP → [MTA] → IMAP/POP3 → [MUA] → Recipient
          ↑                        Mail Servers                        ↑
       Mail Client                                                Mail Client
```

## Email Message Format

Defined in RFC 5322:

```
From: alice@example.com
To: bob@example.org
Subject: Hello
Date: Mon, 23 May 2023 15:30:00 -0400
Message-ID: <unique-id@example.com>
MIME-Version: 1.0
Content-Type: text/plain

Hello Bob,
This is the message body.
```

**Header fields**:
- From, To, Cc, Bcc
- Subject, Date
- Message-ID (unique identifier)
- Reply-To, In-Reply-To
- Content-Type, Content-Transfer-Encoding

## MIME: Multipurpose Internet Mail Extensions

Extends email beyond plain text:

**Content-Type**: Media type
```
Content-Type: text/plain; charset=utf-8
Content-Type: text/html
Content-Type: image/jpeg
Content-Type: application/pdf
Content-Type: multipart/mixed; boundary="----=_Part_123"
```

**Multipart messages** (attachments):
```
Content-Type: multipart/mixed; boundary="boundary123"

--boundary123
Content-Type: text/plain

Message body here.

--boundary123
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"
Content-Transfer-Encoding: base64

JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC...

--boundary123--
```

## SMTP: Simple Mail Transfer Protocol

**Port 25**: Server-to-server
**Port 587**: Client submission (with auth)
**Port 465**: SMTPS (deprecated but used)

**SMTP conversation**:
```
S: 220 mail.example.org ESMTP ready
C: EHLO client.example.com
S: 250-mail.example.org
S: 250-SIZE 35651584
S: 250-AUTH LOGIN PLAIN
S: 250 STARTTLS
C: AUTH LOGIN
S: 334 VXNlcm5hbWU6
C: YWxpY2U=
S: 334 UGFzc3dvcmQ6
C: cGFzc3dvcmQ=
S: 235 Authentication successful
C: MAIL FROM:<alice@example.com>
S: 250 OK
C: RCPT TO:<bob@example.org>
S: 250 OK
C: DATA
S: 354 Start mail input
C: From: alice@example.com
C: To: bob@example.org
C: Subject: Test
C:
C: Hello!
C: .
S: 250 OK: Message queued
C: QUIT
S: 221 Bye
```

## SMTP Commands

| Command | Purpose |
|---------|---------|
| EHLO/HELO | Identify client |
| AUTH | Authenticate |
| MAIL FROM | Sender address |
| RCPT TO | Recipient address |
| DATA | Begin message content |
| QUIT | End session |
| RSET | Reset transaction |
| VRFY | Verify address (usually disabled) |

## Mail Delivery

**MX records** determine mail servers:
```
example.org.    MX    10    mail1.example.org.
example.org.    MX    20    mail2.example.org.
```

Lower priority = preferred. If mail1 fails, try mail2.

**Delivery process**:
1. Sender's MTA looks up recipient's MX records
2. Connect to lowest priority MX
3. SMTP conversation
4. Message queued for local delivery

## POP3: Post Office Protocol

Downloads mail to client, typically deleting from server.

**Port 110**: Plaintext
**Port 995**: POP3S (TLS)

```
S: +OK POP3 server ready
C: USER alice
S: +OK
C: PASS secret
S: +OK logged in
C: STAT
S: +OK 2 3200
C: LIST
S: +OK 2 messages
S: 1 1500
S: 2 1700
S: .
C: RETR 1
S: +OK 1500 octets
S: [message content]
S: .
C: DELE 1
S: +OK deleted
C: QUIT
S: +OK bye
```

**POP3 commands**: USER, PASS, STAT, LIST, RETR, DELE, QUIT

## IMAP: Internet Message Access Protocol

Manages mail on server; more sophisticated than POP3.

**Port 143**: Plaintext
**Port 993**: IMAPS (TLS)

**IMAP capabilities**:
- Multiple folders
- Server-side search
- Partial message fetch
- Message flags (read, answered, etc.)
- Multiple simultaneous clients

```
C: A001 LOGIN alice secret
S: A001 OK LOGIN completed
C: A002 SELECT INBOX
S: * 3 EXISTS
S: * 0 RECENT
S: * FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
S: A002 OK [READ-WRITE] SELECT completed
C: A003 FETCH 1 (BODY[HEADER])
S: * 1 FETCH (BODY[HEADER] {350}
S: [header content]
S: )
S: A003 OK FETCH completed
C: A004 LOGOUT
S: * BYE IMAP server terminating
S: A004 OK LOGOUT completed
```

## IMAP vs POP3

| Feature | POP3 | IMAP |
|---------|------|------|
| Mail storage | Downloaded | Server |
| Folders | No | Yes |
| Partial fetch | No | Yes |
| Multiple clients | Problematic | Designed for |
| Search | Client only | Server-side |
| Offline access | Full | Partial |

IMAP is preferred for most users today.

## Email Security

**STARTTLS**: Upgrade connection to TLS
```
C: EHLO client.example.com
S: 250-STARTTLS
C: STARTTLS
S: 220 Ready to start TLS
[TLS handshake]
C: EHLO client.example.com
```

**SPF** (Sender Policy Framework):
- DNS TXT record listing authorized senders
- Prevents envelope From spoofing

**DKIM** (DomainKeys Identified Mail):
- Cryptographic signature on messages
- Proves message unchanged and authorized

**DMARC** (Domain-based Message Authentication):
- Policy for SPF/DKIM failures
- Reporting mechanism

Example SPF record:
```
example.com.  TXT  "v=spf1 mx ip4:192.0.2.0/24 -all"
```

## Email Challenges

**Spam**: Unwanted bulk email
- Content filtering
- Reputation systems
- Authentication (SPF/DKIM/DMARC)

**Phishing**: Fraudulent emails
- User education
- Link scanning
- Authentication helps

**Privacy**: Email often unencrypted
- TLS encrypts in transit
- S/MIME or PGP for end-to-end
- Most email still readable by servers

## Email Implementation

Python example:
```python
import smtplib
from email.mime.text import MIMEText

msg = MIMEText("Hello, World!")
msg['Subject'] = 'Test'
msg['From'] = 'alice@example.com'
msg['To'] = 'bob@example.org'

with smtplib.SMTP('smtp.example.com', 587) as server:
    server.starttls()
    server.login('alice', 'password')
    server.send_message(msg)
```
