---
id: cs302-t4-bgp
title: "Border Gateway Protocol (BGP)"
order: 6
---

# BGP: Border Gateway Protocol

## The Need for BGP

The Internet is composed of thousands of Autonomous Systems (ASes), each independently operated network. While interior routing protocols like OSPF handle routing within an AS, a different type of protocol is needed for routing between ASes.

BGP (Border Gateway Protocol) is the exterior gateway protocol that holds the Internet together. It enables ISPs, enterprises, and content providers to exchange routing information and establish reachability across the global Internet.

## BGP Characteristics

**Path Vector Protocol**: BGP is neither purely distance vector nor link state. It advertises complete AS paths to each destination, allowing loop detection and policy implementation.

**Policy-Based**: Unlike IGPs that always choose shortest path, BGP allows administrators to implement complex routing policies based on business relationships.

**Incremental Updates**: After initial exchange, BGP sends only changes (additions, withdrawals), not periodic full updates.

**TCP-Based**: BGP runs over TCP (port 179), providing reliable delivery.

**Slow Convergence**: BGP prioritizes stability over speed. Convergence can take minutes.

## Autonomous Systems

An **Autonomous System (AS)** is a collection of networks under single administrative control with a unified routing policy.

**AS Numbers (ASN)**: Each AS has a unique identifier.
- 2-byte ASN: 1-65535 (64512-65534 private)
- 4-byte ASN: Extended range for Internet growth

**Types of ASes**:
- **Stub AS**: Single connection to Internet (most enterprises)
- **Transit AS**: Carries traffic for other ASes (ISPs)
- **Multihomed AS**: Multiple connections but doesn't provide transit

## BGP Operation

**Session Establishment**:
1. TCP connection on port 179
2. Exchange OPEN messages (AS number, router ID, capabilities)
3. Exchange full routing tables via UPDATE messages
4. Maintain connection with periodic KEEPALIVE messages

**Message Types**:
- **OPEN**: Initiates session, negotiates parameters
- **UPDATE**: Advertises new routes or withdraws old ones
- **KEEPALIVE**: Maintains session (default 60 seconds)
- **NOTIFICATION**: Reports errors, closes session

## eBGP vs iBGP

**eBGP (External BGP)**: Between routers in different ASes
- Typically directly connected
- TTL = 1 by default
- Next hop changes at AS boundary

**iBGP (Internal BGP)**: Between routers in same AS
- Don't need to be directly connected
- Full mesh required (or route reflectors/confederations)
- Next hop usually preserved

iBGP rule: Routes learned via iBGP cannot be advertised to other iBGP peers. This prevents loops but requires full mesh or special configurations.

## BGP Path Selection

When multiple paths exist to a destination, BGP uses a decision process:

1. **Highest Weight** (Cisco proprietary, local)
2. **Highest Local Preference** (within AS)
3. **Locally Originated** (by this router)
4. **Shortest AS Path** (fewer ASes traversed)
5. **Lowest Origin Type** (IGP < EGP < Incomplete)
6. **Lowest MED** (Multi-Exit Discriminator, from neighbor)
7. **eBGP over iBGP** (external preferred)
8. **Lowest IGP Cost** to next hop
9. **Oldest Route** (stability)
10. **Lowest Router ID**

Administrators manipulate these attributes to control routing:
- Local Preference: Prefer one provider over another
- AS Path Prepending: Make path look longer to discourage use
- MED: Influence incoming traffic from neighbors

## BGP Route Attributes

**Well-Known Mandatory**:
- AS_PATH: List of ASes the route traversed
- NEXT_HOP: IP address to forward to
- ORIGIN: How route was learned (IGP, EGP, incomplete)

**Well-Known Discretionary**:
- LOCAL_PREF: Preference within AS (higher better)
- ATOMIC_AGGREGATE: Indicates aggregation occurred

**Optional Transitive**:
- AGGREGATOR: AS and router that aggregated
- COMMUNITY: Tags for grouping and policy

**Optional Non-Transitive**:
- MED: Preference for traffic entering neighbor AS
- ORIGINATOR_ID, CLUSTER_LIST: For route reflectors

## BGP and Internet Routing

BGP carries the Internet routing table—currently over 900,000 IPv4 prefixes and 150,000+ IPv6 prefixes.

**Routing table growth concerns**:
- Memory requirements for routers
- CPU for processing updates
- Convergence time

**Aggregation**: ISPs aggregate customer routes to reduce table size.

**CIDR**: Classless addressing enables efficient aggregation.

## BGP Security Concerns

BGP has minimal built-in security:

**Prefix Hijacking**: Malicious or accidental announcement of someone else's prefix.

**Path Manipulation**: Inserting false AS paths.

**Route Leaks**: Inadvertently providing transit when not intended.

**Mitigations**:
- Route filtering (IRR, RPKI)
- RPKI/ROA (Resource Public Key Infrastructure)
- BGPsec (cryptographic path validation)
- Peering agreements and monitoring

BGP is critical infrastructure—its stability and security affect global Internet connectivity.
