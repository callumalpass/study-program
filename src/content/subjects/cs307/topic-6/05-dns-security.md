# DNS Security

DNS is critical internet infrastructure but has inherent security weaknesses. This subtopic covers DNSSEC for authentication, DNS over HTTPS for privacy, and common DNS attacks with prevention techniques.

## DNS Vulnerabilities

DNS was designed without security, making it vulnerable to various attacks.

### Common DNS Attacks

```
DNS Attack Types:

1. DNS Spoofing/Cache Poisoning
   Attacker → [Fake DNS Response] → Victim
   Result: User directed to malicious site

2. DNS Hijacking
   Attacker modifies DNS settings
   Result: All DNS queries redirected

3. DNS Tunneling
   Data exfiltration through DNS queries
   Result: Bypass firewalls, exfiltrate data

4. DDoS Amplification
   Small query → Large response
   Result: Amplified attack traffic

5. Domain Hijacking
   Take control of domain registration
   Result: Complete domain control
```

### DNS Security Monitoring

```python
import re
from typing import Dict, List
from collections import defaultdict

class DNSSecurityMonitor:
    """Monitor DNS for security issues"""

    def __init__(self):
        self.query_log = []
        self.suspicious_domains = set()
        self.query_counts = defaultdict(int)

    def analyze_query(self, query: Dict) -> List[str]:
        """Analyze DNS query for suspicious patterns"""
        alerts = []

        domain = query['domain']
        query_type = query['type']
        source_ip = query['source_ip']

        # 1. Check for DGA (Domain Generation Algorithm) patterns
        if self._is_dga_domain(domain):
            alerts.append("Possible DGA domain detected")

        # 2. Check for DNS tunneling
        if self._is_dns_tunneling(query):
            alerts.append("Possible DNS tunneling detected")

        # 3. Check query rate (DDoS detection)
        self.query_counts[source_ip] += 1
        if self.query_counts[source_ip] > 100:  # per minute
            alerts.append("High query rate from IP")

        # 4. Check for suspicious TLDs
        if self._is_suspicious_tld(domain):
            alerts.append("Suspicious TLD detected")

        # 5. Check subdomain count
        if domain.count('.') > 5:
            alerts.append("Excessive subdomain levels")

        return alerts

    def _is_dga_domain(self, domain: str) -> bool:
        """Detect algorithmically generated domains (malware)"""
        # DGA domains typically have high entropy
        # Check for random-looking strings

        # Remove TLD
        base = domain.rsplit('.', 1)[0]

        # Check length
        if len(base) > 20:
            # Check for consonant clusters (random looking)
            consonants = re.findall(r'[bcdfghjklmnpqrstvwxyz]{4,}', base.lower())
            if consonants:
                return True

        # Check for low vowel ratio
        vowels = sum(1 for c in base.lower() if c in 'aeiou')
        if len(base) > 10 and vowels < len(base) * 0.2:
            return True

        return False

    def _is_dns_tunneling(self, query: Dict) -> bool:
        """Detect DNS tunneling attempts"""
        domain = query['domain']

        # Check for long subdomains (data encoding)
        subdomains = domain.split('.')[:-2]  # Exclude domain and TLD
        for subdomain in subdomains:
            if len(subdomain) > 63:  # Max label length
                return True
            # Check for hex/base64 patterns
            if re.match(r'^[A-Fa-f0-9]{20,}$', subdomain):
                return True

        # Check for unusual query types
        if query['type'] in ['TXT', 'NULL']:
            return True

        return False

    def _is_suspicious_tld(self, domain: str) -> bool:
        """Check for commonly abused TLDs"""
        suspicious_tlds = [
            '.tk', '.ml', '.ga', '.cf', '.gq',  # Free TLDs
            '.cn', '.ru'  # High abuse rates
        ]

        return any(domain.endswith(tld) for tld in suspicious_tlds)
```

## DNSSEC

DNSSEC adds cryptographic signatures to DNS records to prevent tampering.

### DNSSEC Overview

```
DNSSEC Record Types:

┌─────────────────────────────────────────────┐
│ RRSIG (Resource Record Signature)          │
│ - Cryptographic signature of record set    │
│ - Signed by zone's private key             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ DNSKEY (Public Key)                         │
│ - Zone Signing Key (ZSK)                    │
│ - Key Signing Key (KSK)                     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ DS (Delegation Signer)                      │
│ - Hash of DNSKEY                            │
│ - Stored in parent zone                     │
│ - Creates chain of trust                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ NSEC/NSEC3 (Next Secure)                   │
│ - Proves non-existence of records          │
│ - NSEC3 adds privacy (hashed names)        │
└─────────────────────────────────────────────┘
```

### DNSSEC Validation

```python
import dns.resolver
import dns.dnssec
from typing import Dict, List

class DNSSECValidator:
    """Validate DNSSEC signatures"""

    def __init__(self):
        self.resolver = dns.resolver.Resolver()
        # Use DNSSEC-validating resolver
        self.resolver.nameservers = ['8.8.8.8', '1.1.1.1']

    def validate_domain(self, domain: str) -> Dict:
        """
        Check if domain has valid DNSSEC
        """
        result = {
            'domain': domain,
            'dnssec_enabled': False,
            'validation_status': 'unknown',
            'issues': []
        }

        try:
            # Query for DNSKEY records
            answers = self.resolver.resolve(domain, 'DNSKEY')

            if answers:
                result['dnssec_enabled'] = True

                # Check for both KSK and ZSK
                has_ksk = False
                has_zsk = False

                for rdata in answers:
                    flags = rdata.flags
                    if flags & 0x0001:  # Bit 0 = Zone Key
                        if flags & 0x0100:  # Bit 8 = Secure Entry Point (KSK)
                            has_ksk = True
                        else:
                            has_zsk = True

                if not has_ksk:
                    result['issues'].append("No Key Signing Key (KSK) found")
                if not has_zsk:
                    result['issues'].append("No Zone Signing Key (ZSK) found")

                # Validate chain of trust
                if self._validate_chain(domain):
                    result['validation_status'] = 'valid'
                else:
                    result['validation_status'] = 'invalid'
                    result['issues'].append("Chain of trust broken")

        except dns.resolver.NXDOMAIN:
            result['issues'].append("Domain does not exist")
        except dns.resolver.NoAnswer:
            result['dnssec_enabled'] = False
            result['validation_status'] = 'unsigned'
        except Exception as e:
            result['issues'].append(f"Error: {str(e)}")

        return result

    def _validate_chain(self, domain: str) -> bool:
        """Validate DNSSEC chain of trust"""
        # Simplified validation
        # Production implementation would:
        # 1. Get DNSKEY from zone
        # 2. Get DS from parent zone
        # 3. Verify DS matches DNSKEY
        # 4. Validate signatures
        # 5. Repeat up to root

        try:
            # Query with DNSSEC validation
            answers = self.resolver.resolve(domain, 'A')
            return True
        except dns.dnssec.ValidationFailure:
            return False
        except:
            return False

    @staticmethod
    def check_dnssec_deployment(domain: str) -> Dict:
        """Check DNSSEC deployment status"""
        return {
            'domain': domain,
            'steps': {
                'generate_keys': 'Generate ZSK and KSK',
                'sign_zone': 'Sign zone file with keys',
                'publish_keys': 'Publish DNSKEY records',
                'submit_ds': 'Submit DS records to registrar',
                'enable_validation': 'Enable DNSSEC validation on resolvers'
            },
            'benefits': [
                'Prevents DNS spoofing',
                'Authenticates DNS responses',
                'Protects against cache poisoning',
                'Ensures data integrity'
            ],
            'limitations': [
                'Does not encrypt DNS traffic',
                'Increases DNS response size',
                'Requires key management',
                'Not universally deployed'
            ]
        }
```

## DNS over HTTPS (DoH) and DNS over TLS (DoT)

Encrypted DNS prevents eavesdropping and manipulation.

### DoH vs DoT

```
Traditional DNS:              DNS over HTTPS (DoH):
┌──────────────┐             ┌──────────────┐
│ Client       │─────────────│ Client       │
└──────────────┘             └──────────────┘
       │                            │
       │ UDP/53                     │ HTTPS/443
       │ Unencrypted                │ Encrypted
       ↓                            ↓
┌──────────────┐             ┌──────────────┐
│ DNS Server   │             │ DoH Resolver │
└──────────────┘             └──────────────┘

DNS over TLS (DoT):
┌──────────────┐
│ Client       │
└──────────────┘
       │
       │ TLS/853
       │ Encrypted
       ↓
┌──────────────┐
│ DoT Resolver │
└──────────────┘
```

### DoH Implementation

```python
import requests
import base64
import dns.message

class DoHClient:
    """DNS over HTTPS client"""

    def __init__(self, doh_server: str = "https://1.1.1.1/dns-query"):
        self.doh_server = doh_server
        self.session = requests.Session()

    def query(self, domain: str, qtype: str = 'A') -> Dict:
        """
        Query DNS over HTTPS
        """
        # Create DNS query
        query = dns.message.make_query(domain, qtype)
        query_wire = query.to_wire()

        # Base64 encode for GET request (alternative: POST with wire format)
        query_b64 = base64.urlsafe_b64encode(query_wire).decode('utf-8').rstrip('=')

        # Make DoH request
        response = self.session.get(
            self.doh_server,
            params={'dns': query_b64},
            headers={'Accept': 'application/dns-message'},
            timeout=5
        )

        if response.status_code == 200:
            # Parse DNS response
            dns_response = dns.message.from_wire(response.content)

            answers = []
            for answer in dns_response.answer:
                for item in answer.items:
                    answers.append({
                        'name': str(answer.name),
                        'type': dns.rdatatype.to_text(item.rdtype),
                        'ttl': answer.ttl,
                        'data': str(item)
                    })

            return {
                'success': True,
                'answers': answers,
                'encrypted': True
            }
        else:
            return {
                'success': False,
                'error': f"HTTP {response.status_code}",
                'encrypted': True
            }

    @staticmethod
    def compare_doh_dot():
        """Compare DoH and DoT"""
        return {
            'DoH': {
                'port': 443,
                'protocol': 'HTTPS',
                'pros': [
                    'Uses standard HTTPS port (hard to block)',
                    'Looks like regular HTTPS traffic',
                    'Works through firewalls'
                ],
                'cons': [
                    'More overhead (HTTP layer)',
                    'Can be mixed with web traffic',
                    'Centralization concerns'
                ]
            },
            'DoT': {
                'port': 853,
                'protocol': 'TLS',
                'pros': [
                    'Dedicated port (clear purpose)',
                    'Lower overhead than DoH',
                    'Easier to implement'
                ],
                'cons': [
                    'Easy to block (dedicated port)',
                    'Visible as DNS traffic',
                    'May not work through some firewalls'
                ]
            }
        }
```

## DNS Security Best Practices

```python
class DNSSecurityBestPractices:
    """DNS security recommendations"""

    RECOMMENDATIONS = """
    DNS Security Best Practices:

    1. Enable DNSSEC
       ✓ Sign your zones with DNSSEC
       ✓ Validate DNSSEC on resolvers
       ✓ Monitor DNSSEC expiration
       ✓ Automate key rotation

    2. Use Encrypted DNS
       ✓ Deploy DoH or DoT
       ✓ Prevents eavesdropping
       ✓ Protects against MITM
       ✓ Use trusted resolvers (1.1.1.1, 8.8.8.8)

    3. Implement Rate Limiting
       ✓ Limit queries per source IP
       ✓ Prevents DDoS amplification
       ✓ Use Response Rate Limiting (RRL)

    4. Restrict Zone Transfers
       ✓ Allow only to authorized servers
       ✓ Use TSIG for authentication
       ✓ Don't expose internal structure

    5. Monitor DNS Traffic
       ✓ Log all queries
       ✓ Detect anomalies
       ✓ Watch for DGA domains
       ✓ Monitor query patterns

    6. Secure DNS Infrastructure
       ✓ Separate authoritative and recursive
       ✓ Use anycast for DDoS protection
       ✓ Keep DNS software updated
       ✓ Harden DNS servers

    7. Domain Registration Security
       ✓ Enable registry lock
       ✓ Use strong registrar passwords
       ✓ Enable 2FA on registrar account
       ✓ Monitor for unauthorized changes

    8. Cache Hardening
       ✓ Randomize source ports
       ✓ Randomize query IDs
       ✓ Limit cache size
       ✓ Set appropriate TTLs
    """

    @staticmethod
    def dns_security_checklist() -> Dict:
        """DNS security configuration checklist"""
        return {
            'authoritative_server': [
                'DNSSEC signing enabled',
                'Zone transfers restricted',
                'Rate limiting configured',
                'Latest software version',
                'Monitoring enabled',
                'Redundant servers (anycast)'
            ],
            'recursive_resolver': [
                'DNSSEC validation enabled',
                'DoH/DoT support',
                'Query logging enabled',
                'Rate limiting configured',
                'Response filtering',
                'Cache hardening'
            ],
            'client': [
                'Use encrypted DNS (DoH/DoT)',
                'Verify DNSSEC',
                'Use trusted resolvers',
                'Monitor DNS queries',
                'Check for DNS hijacking'
            ],
            'domain_management': [
                'Registry lock enabled',
                'Registrar 2FA enabled',
                'Contact info current',
                'Auto-renewal enabled',
                'Transfer lock enabled'
            ]
        }
```

## DNS Filtering and RPZ

```python
class DNSResponsePolicyZones:
    """DNS RPZ for security filtering"""

    def __init__(self):
        self.blocked_domains = set()
        self.malware_domains = set()
        self.phishing_domains = set()

    def check_domain(self, domain: str) -> Dict:
        """
        Check domain against RPZ policies
        """
        result = {
            'domain': domain,
            'action': 'allow',
            'reason': None,
            'category': None
        }

        # Check blocklists
        if domain in self.blocked_domains:
            result['action'] = 'block'
            result['reason'] = 'Domain in blocklist'
            result['category'] = 'blocked'

        elif domain in self.malware_domains:
            result['action'] = 'block'
            result['reason'] = 'Known malware domain'
            result['category'] = 'malware'

        elif domain in self.phishing_domains:
            result['action'] = 'block'
            result['reason'] = 'Known phishing domain'
            result['category'] = 'phishing'

        return result

    def add_to_blocklist(self, domain: str, category: str):
        """Add domain to blocklist"""
        if category == 'malware':
            self.malware_domains.add(domain)
        elif category == 'phishing':
            self.phishing_domains.add(domain)
        else:
            self.blocked_domains.add(domain)

    @staticmethod
    def rpz_config_example():
        """Example RPZ configuration"""
        return """
        ; Response Policy Zone
        $TTL 60
        @ IN SOA rpz.example.com. admin.example.com. (
            2024010101 ; serial
            3600       ; refresh
            900        ; retry
            604800     ; expire
            60 )       ; minimum

        ; Block malware domains (return NXDOMAIN)
        malware.example.com CNAME .

        ; Redirect phishing domains to warning page
        phishing.example.com CNAME warning.example.com.

        ; Wildcard block for entire domain
        *.badnetwork.com CNAME .
        """
```

## Summary

DNS security is critical for internet infrastructure:

- **DNSSEC**: Authenticates DNS responses with cryptographic signatures, prevents cache poisoning
- **DNS over HTTPS (DoH)**: Encrypts DNS queries over HTTPS (port 443)
- **DNS over TLS (DoT)**: Encrypts DNS queries over TLS (port 853)
- **Monitoring**: Detect DGA domains, DNS tunneling, and anomalous query patterns
- **Best Practices**: Enable DNSSEC, use encrypted DNS, implement rate limiting, monitor traffic
- **RPZ**: Response Policy Zones for domain filtering and threat blocking

DNS security requires multiple layers: DNSSEC for authentication, DoH/DoT for privacy, monitoring for threat detection, and hardening for attack prevention.
