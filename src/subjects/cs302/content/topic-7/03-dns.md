---
id: cs302-t7-dns
title: "Domain Name System (DNS)"
order: 3
---

# DNS: Domain Name System

## Why DNS?

IP addresses are hard to remember. DNS maps human-readable names to IP addresses:

```
www.example.com → 93.184.216.34
```

DNS is essentially the Internet's phone book—critical infrastructure that nearly every Internet application depends on.

## DNS Services

**Primary**: Hostname to IP translation

**Additional services**:
- **Host aliasing**: Multiple names for one host
- **Mail server aliasing**: MX records for email
- **Load distribution**: Multiple IPs for one name
- **Reverse lookup**: IP to hostname

## Hierarchical Namespace

DNS uses a hierarchical tree structure:

```
                    . (root)
                   /|\
                  / | \
               com org edu ...
              /|\
             / | \
        google amazon example
           |
          www
```

**Domain name**: Path from leaf to root
- www.example.com = www + example + com + root

**Zones**: Administrative divisions
- example.com is a zone
- Managed by zone's nameservers

## DNS Records

**Resource Records** (RRs) store DNS data:

```
Name        TTL     Class   Type    Value
```

**Common record types**:

| Type | Purpose | Example |
|------|---------|---------|
| A | IPv4 address | example.com → 93.184.216.34 |
| AAAA | IPv6 address | example.com → 2606:2800:220:1:... |
| CNAME | Canonical name (alias) | www → example.com |
| MX | Mail server | example.com → mail.example.com |
| NS | Nameserver | example.com → ns1.example.com |
| TXT | Text data | SPF, DKIM records |
| PTR | Reverse lookup | IP → hostname |
| SOA | Zone authority | Zone metadata |

## DNS Resolution Process

**Recursive query** (from client's perspective):

1. Application calls resolver (gethostbyname/getaddrinfo)
2. Resolver sends query to recursive resolver (usually ISP's)
3. Recursive resolver finds answer, returns to client

**Iterative resolution** (by recursive resolver):

```
Resolver                     DNS Servers
   |--- Query: www.example.com --->| Root
   |<-- Referral: .com servers ----|
   |                               |
   |--- Query: www.example.com --->| .com TLD
   |<-- Referral: example.com NS --|
   |                               |
   |--- Query: www.example.com --->| example.com
   |<-- Answer: 93.184.216.34 -----|
```

## DNS Server Types

**Root servers**: Know TLD server addresses
- 13 root server addresses (A-M)
- Many instances via anycast

**TLD (Top-Level Domain) servers**: Know authoritative servers
- .com, .org, .edu, .uk, etc.
- Operated by registries

**Authoritative servers**: Have actual records
- Final authority for a zone
- Operated by domain owners

**Recursive resolvers**: Do lookups for clients
- Cache results
- Usually provided by ISP

## DNS Message Format

```
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                      ID                       |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|QR|   Opcode  |AA|TC|RD|RA|   Z    |   RCODE   |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                    QDCOUNT                    |
|                    ANCOUNT                    |
|                    NSCOUNT                    |
|                    ARCOUNT                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                   Questions                   |
|                    Answers                    |
|                   Authority                   |
|                  Additional                   |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
```

**Header flags**:
- QR: Query (0) or Response (1)
- RD: Recursion Desired
- RA: Recursion Available
- RCODE: Response code (0=OK, 3=NXDOMAIN)

## DNS Transport

**UDP port 53** (default):
- Most queries
- 512-byte limit (traditional)
- Fast, connectionless

**TCP port 53**:
- Zone transfers
- Large responses (EDNS0 extended)
- Fallback when UDP truncated

## Caching and TTL

DNS responses include TTL (Time To Live):

```
example.com    300    IN    A    93.184.216.34
              (5 min)
```

- Resolvers cache records for TTL seconds
- Reduces load on authoritative servers
- Enables fast repeated lookups
- Trade-off: Changes take time to propagate

**Negative caching**: NXDOMAIN responses also cached

## DNS Security Issues

**DNS spoofing/cache poisoning**:
- Attacker returns false responses
- Poisons resolver cache
- Users directed to malicious sites

**DNS amplification DDoS**:
- Small query, large response
- Spoofed source address
- Target flooded with responses

## DNSSEC

Cryptographic authentication of DNS:

**New record types**:
- RRSIG: Signature of RRset
- DNSKEY: Zone's public key
- DS: Delegation Signer (chain to parent)
- NSEC/NSEC3: Authenticated denial

**Verification chain**:
```
Root (trust anchor) → .com DS/DNSKEY → example.com DS/DNSKEY → RRSIGs
```

DNSSEC proves data is authentic but doesn't encrypt.

## DNS over HTTPS (DoH) and DNS over TLS (DoT)

Encrypt DNS to prevent eavesdropping:

**DoT**: DNS over TLS (port 853)
- Standard DNS wire format
- TLS encryption

**DoH**: DNS over HTTPS (port 443)
- HTTP format
- Harder to block/filter
- Blends with web traffic

## DNS Tools

**dig** (Domain Information Groper):
```bash
dig example.com A
dig @8.8.8.8 example.com MX
dig +trace example.com
```

**nslookup**:
```bash
nslookup example.com
nslookup -type=MX example.com
```

**host**:
```bash
host example.com
host -t NS example.com
```

## DNS in Code

```python
import socket

# Simple lookup
ip = socket.gethostbyname('example.com')

# Full resolution with getaddrinfo
results = socket.getaddrinfo('example.com', 80, socket.AF_INET, socket.SOCK_STREAM)
```

For more control, use dnspython library.
