# VPN and Tunneling

Virtual Private Networks (VPNs) create secure encrypted tunnels over untrusted networks. This subtopic covers VPN protocols, IPsec, and WireGuard for secure remote access and site-to-site connections.

## VPN Overview

VPNs provide secure communication over public networks by encrypting all traffic.

### VPN Use Cases

```
VPN Use Cases:

1. Remote Access VPN
   ┌──────────────┐                    ┌──────────────┐
   │ Remote User  │←─── Encrypted ────→│ Corporate    │
   │ (Home/Travel)│      Tunnel        │ Network      │
   └──────────────┘                    └──────────────┘

   Use: Employees accessing company resources remotely

2. Site-to-Site VPN
   ┌──────────────┐                    ┌──────────────┐
   │ Office A     │←─── Encrypted ────→│ Office B     │
   │ Network      │      Tunnel        │ Network      │
   └──────────────┘                    └──────────────┘

   Use: Connecting multiple office locations

3. Privacy VPN
   ┌──────────────┐     ┌────────┐     ┌──────────────┐
   │ User         │────→│  VPN   │────→│ Internet     │
   │              │     │ Server │     │              │
   └──────────────┘     └────────┘     └──────────────┘

   Use: Hiding IP address, bypassing geo-restrictions
```

## IPsec

IPsec is a protocol suite for secure IP communications through authentication and encryption.

### IPsec Components

```
IPsec Architecture:

┌───────────────────────────────────────────────┐
│ Security Protocols                            │
├───────────────────────────────────────────────┤
│ AH (Authentication Header)                    │
│ - Authentication                              │
│ - Integrity                                   │
│ - No encryption                               │
├───────────────────────────────────────────────┤
│ ESP (Encapsulating Security Payload)         │
│ - Authentication                              │
│ - Integrity                                   │
│ - Encryption                                  │
└───────────────────────────────────────────────┘

┌───────────────────────────────────────────────┐
│ Modes                                         │
├───────────────────────────────────────────────┤
│ Transport Mode                                │
│ - Encrypts payload only                       │
│ - Original IP header preserved                │
│ - Host-to-host VPN                           │
├───────────────────────────────────────────────┤
│ Tunnel Mode                                   │
│ - Encrypts entire IP packet                   │
│ - New IP header added                         │
│ - Gateway-to-gateway VPN                     │
└───────────────────────────────────────────────┘

┌───────────────────────────────────────────────┐
│ Key Exchange                                  │
├───────────────────────────────────────────────┤
│ IKE (Internet Key Exchange)                  │
│ - IKEv1: Two phases                          │
│ - IKEv2: Simplified, more secure             │
│ - Establishes Security Associations (SA)     │
└───────────────────────────────────────────────┘
```

### IPsec Configuration Example

```python
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class IPsecConfiguration:
    """IPsec VPN configuration"""

    # Phase 1 (IKE)
    ike_version: str = "IKEv2"
    auth_method: str = "PSK"  # Pre-Shared Key or Certificates
    encryption: str = "AES-256"
    integrity: str = "SHA-256"
    dh_group: str = "14"  # Diffie-Hellman group
    lifetime: int = 28800  # 8 hours

    # Phase 2 (IPsec)
    esp_encryption: str = "AES-256-GCM"
    esp_integrity: str = "SHA-256"
    pfs_group: str = "14"  # Perfect Forward Secrecy
    sa_lifetime: int = 3600  # 1 hour

    # Network
    local_subnet: str = "10.0.1.0/24"
    remote_subnet: str = "10.0.2.0/24"
    local_gateway: str = "203.0.113.1"
    remote_gateway: str = "203.0.113.2"

class IPsecManager:
    """Manage IPsec VPN connections"""

    def __init__(self):
        self.connections = {}

    def generate_config(self, config: IPsecConfiguration) -> str:
        """
        Generate IPsec configuration (StrongSwan format)
        """
        return f"""
conn site-to-site
    # IKE Configuration
    keyexchange={config.ike_version.lower()}
    ike={config.encryption}-{config.integrity}-modp{config.dh_group}
    ikelifetime={config.lifetime}s

    # ESP Configuration
    esp={config.esp_encryption}-{config.esp_integrity}
    lifetime={config.sa_lifetime}s

    # Perfect Forward Secrecy
    pfs={'yes' if config.pfs_group else 'no'}

    # Network Configuration
    left={config.local_gateway}
    leftsubnet={config.local_subnet}
    right={config.remote_gateway}
    rightsubnet={config.remote_subnet}

    # Authentication
    authby={'secret' if config.auth_method == 'PSK' else 'rsasig'}

    # Auto-start
    auto=start
"""

    def validate_config(self, config: IPsecConfiguration) -> List[str]:
        """Validate IPsec configuration for security"""
        issues = []

        # Check encryption strength
        weak_ciphers = ['DES', '3DES', 'RC4']
        if any(weak in config.encryption for weak in weak_ciphers):
            issues.append(f"Weak encryption: {config.encryption}")

        # Check integrity
        if 'MD5' in config.integrity or 'SHA-1' in config.integrity:
            issues.append(f"Weak integrity algorithm: {config.integrity}")

        # Check DH group
        weak_dh_groups = ['1', '2', '5']
        if config.dh_group in weak_dh_groups:
            issues.append(f"Weak DH group: {config.dh_group}")

        # Check for PFS
        if not config.pfs_group:
            issues.append("Perfect Forward Secrecy not enabled")

        # Check lifetimes
        if config.sa_lifetime > 86400:  # 24 hours
            issues.append("SA lifetime too long (max 24 hours recommended)")

        return issues
```

## WireGuard

WireGuard is a modern, lightweight VPN protocol with strong cryptography.

### WireGuard vs Traditional VPNs

```
WireGuard Advantages:

┌─────────────────────────────────────────────┐
│ Simplicity                                  │
│ - ~4,000 lines of code (vs 400,000+ IPsec) │
│ - Easier to audit                           │
│ - Fewer configuration options               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Performance                                 │
│ - Faster than IPsec/OpenVPN                │
│ - Low latency                               │
│ - Efficient on mobile devices               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Cryptography                                │
│ - ChaCha20 for encryption                   │
│ - Poly1305 for authentication              │
│ - Curve25519 for key exchange              │
│ - BLAKE2s for hashing                       │
│ - No cipher negotiation (secure by default)│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Roaming                                     │
│ - Handles IP address changes seamlessly     │
│ - No reconnection needed                    │
│ - Ideal for mobile devices                  │
└─────────────────────────────────────────────┘
```

### WireGuard Configuration

```python
import subprocess
import ipaddress
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class WireGuardPeer:
    """WireGuard peer configuration"""
    public_key: str
    allowed_ips: List[str]
    endpoint: str = None
    persistent_keepalive: int = 25

@dataclass
class WireGuardInterface:
    """WireGuard interface configuration"""
    private_key: str
    address: str
    listen_port: int
    peers: List[WireGuardPeer]

class WireGuardManager:
    """Manage WireGuard VPN"""

    @staticmethod
    def generate_keypair() -> Dict[str, str]:
        """Generate WireGuard key pair"""
        try:
            # Generate private key
            result = subprocess.run(
                ['wg', 'genkey'],
                capture_output=True,
                text=True,
                check=True
            )
            private_key = result.stdout.strip()

            # Generate public key from private
            result = subprocess.run(
                ['wg', 'pubkey'],
                input=private_key,
                capture_output=True,
                text=True,
                check=True
            )
            public_key = result.stdout.strip()

            return {
                'private_key': private_key,
                'public_key': public_key
            }
        except subprocess.CalledProcessError as e:
            raise RuntimeError(f"Failed to generate keys: {e}")

    @staticmethod
    def generate_config(interface: WireGuardInterface) -> str:
        """Generate WireGuard configuration file"""
        config = f"""[Interface]
PrivateKey = {interface.private_key}
Address = {interface.address}
ListenPort = {interface.listen_port}

"""
        # Add peers
        for peer in interface.peers:
            config += f"""[Peer]
PublicKey = {peer.public_key}
AllowedIPs = {', '.join(peer.allowed_ips)}
"""
            if peer.endpoint:
                config += f"Endpoint = {peer.endpoint}\n"
            if peer.persistent_keepalive:
                config += f"PersistentKeepalive = {peer.persistent_keepalive}\n"
            config += "\n"

        return config

    @staticmethod
    def validate_config(interface: WireGuardInterface) -> List[str]:
        """Validate WireGuard configuration"""
        issues = []

        # Validate address
        try:
            ipaddress.ip_interface(interface.address)
        except ValueError:
            issues.append(f"Invalid IP address: {interface.address}")

        # Validate port
        if not (1 <= interface.listen_port <= 65535):
            issues.append(f"Invalid port: {interface.listen_port}")

        # Validate peers
        for i, peer in enumerate(interface.peers):
            # Validate allowed IPs
            for ip in peer.allowed_ips:
                try:
                    ipaddress.ip_network(ip)
                except ValueError:
                    issues.append(f"Peer {i}: Invalid allowed IP: {ip}")

            # Validate endpoint format
            if peer.endpoint and ':' not in peer.endpoint:
                issues.append(f"Peer {i}: Endpoint must include port")

        return issues


# Example: Site-to-Site WireGuard VPN
def setup_site_to_site_wireguard():
    """Example site-to-site WireGuard configuration"""

    # Generate keys for both sites
    site_a_keys = WireGuardManager.generate_keypair()
    site_b_keys = WireGuardManager.generate_keypair()

    # Site A configuration
    site_a_interface = WireGuardInterface(
        private_key=site_a_keys['private_key'],
        address='10.200.0.1/24',
        listen_port=51820,
        peers=[
            WireGuardPeer(
                public_key=site_b_keys['public_key'],
                allowed_ips=['10.200.0.2/32', '10.0.2.0/24'],  # Peer and remote subnet
                endpoint='203.0.113.2:51820',
                persistent_keepalive=25
            )
        ]
    )

    # Site B configuration
    site_b_interface = WireGuardInterface(
        private_key=site_b_keys['private_key'],
        address='10.200.0.2/24',
        listen_port=51820,
        peers=[
            WireGuardPeer(
                public_key=site_a_keys['public_key'],
                allowed_ips=['10.200.0.1/32', '10.0.1.0/24'],  # Peer and remote subnet
                endpoint='203.0.113.1:51820',
                persistent_keepalive=25
            )
        ]
    )

    # Generate configs
    site_a_config = WireGuardManager.generate_config(site_a_interface)
    site_b_config = WireGuardManager.generate_config(site_b_interface)

    return {
        'site_a': site_a_config,
        'site_b': site_b_config
    }
```

## OpenVPN

OpenVPN is a mature, flexible VPN solution using SSL/TLS.

```python
class OpenVPNConfiguration:
    """OpenVPN configuration management"""

    @staticmethod
    def generate_server_config() -> str:
        """Generate secure OpenVPN server config"""
        return """# OpenVPN Server Configuration

# Network Settings
port 1194
proto udp
dev tun

# Certificate/Key Files
ca ca.crt
cert server.crt
key server.key
dh dh2048.pem
tls-auth ta.key 0

# Network Configuration
server 10.8.0.0 255.255.255.0
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"

# Security Settings
cipher AES-256-GCM
auth SHA-256
tls-version-min 1.2
tls-cipher TLS-ECDHE-RSA-WITH-AES-256-GCM-SHA384

# Connection Settings
keepalive 10 120
persist-key
persist-tun

# Privileges (run as nobody)
user nobody
group nogroup

# Logging
status openvpn-status.log
log-append /var/log/openvpn.log
verb 3

# Performance
comp-lzo no
fast-io
"""

    @staticmethod
    def generate_client_config(server_ip: str) -> str:
        """Generate OpenVPN client config"""
        return f"""# OpenVPN Client Configuration

client
dev tun
proto udp

# Server
remote {server_ip} 1194
resolv-retry infinite

# Privileges
nobind
user nobody
group nogroup

# Persistence
persist-key
persist-tun

# Certificates
ca ca.crt
cert client.crt
key client.key
tls-auth ta.key 1

# Security
cipher AES-256-GCM
auth SHA-256
remote-cert-tls server

# Logging
verb 3
"""
```

## VPN Security Best Practices

```python
class VPNSecurityBestPractices:
    """VPN security guidelines"""

    RECOMMENDATIONS = """
    VPN Security Best Practices:

    1. Encryption
       ✓ Use AES-256 or ChaCha20
       ✗ Avoid DES, 3DES, Blowfish
       ✓ Use AEAD ciphers (GCM mode)

    2. Authentication
       ✓ Use certificates (not just PSK)
       ✓ Implement multi-factor authentication
       ✓ Use strong integrity algorithms (SHA-256+)
       ✗ Avoid MD5, SHA-1

    3. Key Management
       ✓ Use strong key exchange (DH group 14+)
       ✓ Enable Perfect Forward Secrecy (PFS)
       ✓ Rotate keys regularly
       ✓ Secure key storage

    4. Protocol Selection
       ✓ WireGuard for simplicity and performance
       ✓ IPsec IKEv2 for site-to-site
       ✓ OpenVPN for compatibility
       ✗ Avoid PPTP (insecure)
       ✗ Avoid L2TP without IPsec

    5. Network Configuration
       ✓ Use split tunneling carefully
       ✓ Implement DNS leak prevention
       ✓ Enable kill switch (drop on disconnect)
       ✓ Disable IPv6 if not supported

    6. Access Control
       ✓ Implement strong authentication
       ✓ Use least privilege for VPN users
       ✓ Monitor VPN connections
       ✓ Log authentication attempts

    7. Updates and Patches
       ✓ Keep VPN software updated
       ✓ Monitor security advisories
       ✓ Test updates in staging first
    """

    @staticmethod
    def check_vpn_security(config: Dict) -> List[str]:
        """Check VPN configuration security"""
        issues = []

        # Check encryption
        weak_ciphers = ['DES', '3DES', 'Blowfish']
        if any(weak in config.get('cipher', '') for weak in weak_ciphers):
            issues.append("Weak cipher detected")

        # Check authentication
        weak_auth = ['MD5', 'SHA-1']
        if any(weak in config.get('auth', '') for weak in weak_auth):
            issues.append("Weak authentication algorithm")

        # Check for PFS
        if not config.get('pfs_enabled'):
            issues.append("Perfect Forward Secrecy not enabled")

        # Check protocol
        if config.get('protocol') == 'PPTP':
            issues.append("PPTP is insecure, use IPsec or WireGuard")

        return issues
```

## VPN Performance and Security Trade-offs

```python
class VPNPerformanceAnalysis:
    """Analyze VPN performance impact"""

    @staticmethod
    def compare_protocols() -> Dict:
        """Compare VPN protocol characteristics"""
        return {
            'WireGuard': {
                'speed': 'Fastest',
                'latency': 'Lowest',
                'cpu_usage': 'Low',
                'battery_impact': 'Low',
                'security': 'High',
                'maturity': 'Medium',
                'use_case': 'Modern deployments, mobile'
            },
            'IPsec_IKEv2': {
                'speed': 'Fast',
                'latency': 'Low',
                'cpu_usage': 'Medium',
                'battery_impact': 'Medium',
                'security': 'High',
                'maturity': 'High',
                'use_case': 'Site-to-site, enterprise'
            },
            'OpenVPN': {
                'speed': 'Medium',
                'latency': 'Medium',
                'cpu_usage': 'High',
                'battery_impact': 'High',
                'security': 'High',
                'maturity': 'High',
                'use_case': 'Cross-platform, flexibility'
            },
            'PPTP': {
                'speed': 'Fast',
                'latency': 'Low',
                'cpu_usage': 'Low',
                'battery_impact': 'Low',
                'security': 'INSECURE',
                'maturity': 'High',
                'use_case': 'Never (deprecated)'
            }
        }
```

## Summary

VPNs provide secure connectivity over untrusted networks:

- **IPsec**: Industry-standard VPN with strong security, complex configuration
- **WireGuard**: Modern, simple, fast VPN with excellent security
- **OpenVPN**: Flexible, mature VPN using SSL/TLS
- **Security**: Use strong encryption (AES-256, ChaCha20), authentication (certificates, MFA), and PFS
- **Protocol Selection**: WireGuard for modern deployments, IPsec for site-to-site, avoid PPTP
- **Best Practices**: Strong crypto, certificate authentication, regular key rotation, monitoring

Choose VPN protocol based on use case: WireGuard for performance and simplicity, IPsec for enterprise site-to-site, OpenVPN for maximum compatibility.
