import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs302-t5-ex01',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'NAT Port Mapper',
    difficulty: 2,
    description: 'Implement a simple NAT (Network Address Translation) port mapping table. Map internal IP:port to external port.',
    starterCode: 'class NATTable:\n    def __init__(self, external_ip):\n        self.external_ip = external_ip\n        self.mappings = {}  # (internal_ip, internal_port) -> external_port\n        self.next_port = 10000\n    \n    def create_mapping(self, internal_ip, internal_port):\n        # Return external port for this connection\n        pass\n    \n    def lookup_internal(self, external_port):\n        # Return (internal_ip, internal_port) or None\n        pass\n\n# Test your class\nnat = NATTable("203.0.113.1")\nprint(nat.create_mapping("192.168.1.10", 12345))\nprint(nat.create_mapping("192.168.1.20", 12345))',
    solution: 'class NATTable:\n    def __init__(self, external_ip):\n        self.external_ip = external_ip\n        self.mappings = {}\n        self.reverse_mappings = {}\n        self.next_port = 10000\n    \n    def create_mapping(self, internal_ip, internal_port):\n        key = (internal_ip, internal_port)\n        if key in self.mappings:\n            return self.mappings[key]\n        \n        external_port = self.next_port\n        self.next_port += 1\n        self.mappings[key] = external_port\n        self.reverse_mappings[external_port] = key\n        return external_port\n    \n    def lookup_internal(self, external_port):\n        return self.reverse_mappings.get(external_port)\n\nnat = NATTable("203.0.113.1")\nprint(nat.create_mapping("192.168.1.10", 12345))\nprint(nat.create_mapping("192.168.1.20", 12345))',
    testCases: [
      { input: 'create two mappings', isHidden: false, description: 'Different external ports' },
      { input: 'lookup existing', isHidden: true, description: 'Reverse lookup' }
    ],
    hints: [
      'Store both forward and reverse mappings',
      'Assign unique external port for each (ip, port) pair',
      'Reuse existing mapping if same internal ip:port',
      'Increment port counter for new mappings'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex02',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'CIDR Aggregator',
    difficulty: 4,
    description: 'Aggregate multiple contiguous CIDR blocks into a single larger block when possible.',
    starterCode: '# Aggregate CIDR blocks\ndef aggregate_cidrs(cidr_list):\n    # Return list of aggregated CIDR blocks\n    pass\n\n# Test your function\nprint(aggregate_cidrs(["192.168.0.0/24", "192.168.1.0/24"]))\nprint(aggregate_cidrs(["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]))',
    solution: 'def aggregate_cidrs(cidr_list):\n    def ip_to_int(ip):\n        parts = [int(x) for x in ip.split(".")]\n        return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]\n    \n    def int_to_ip(num):\n        return f"{(num >> 24) & 0xFF}.{(num >> 16) & 0xFF}.{(num >> 8) & 0xFF}.{num & 0xFF}"\n    \n    # Parse CIDRs to (network_int, prefix)\n    networks = []\n    for cidr in cidr_list:\n        ip, prefix = cidr.split("/")\n        networks.append((ip_to_int(ip), int(prefix)))\n    \n    # Sort by network address\n    networks.sort()\n    \n    # Try to merge adjacent networks\n    changed = True\n    while changed:\n        changed = False\n        new_networks = []\n        i = 0\n        while i < len(networks):\n            if i + 1 < len(networks):\n                net1, prefix1 = networks[i]\n                net2, prefix2 = networks[i + 1]\n                # Can merge if same prefix and adjacent\n                if prefix1 == prefix2:\n                    size = 1 << (32 - prefix1)\n                    if net2 == net1 + size:\n                        # Check if they form a valid larger network\n                        new_prefix = prefix1 - 1\n                        new_mask = (0xFFFFFFFF << (32 - new_prefix)) & 0xFFFFFFFF\n                        if (net1 & new_mask) == net1:\n                            new_networks.append((net1, new_prefix))\n                            i += 2\n                            changed = True\n                            continue\n            new_networks.append(networks[i])\n            i += 1\n        networks = new_networks\n    \n    return [f"{int_to_ip(net)}/{prefix}" for net, prefix in networks]\n\nprint(aggregate_cidrs(["192.168.0.0/24", "192.168.1.0/24"]))\nprint(aggregate_cidrs(["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]))',
    testCases: [
      { input: '["192.168.0.0/24", "192.168.1.0/24"]', isHidden: false, description: 'Two to one' },
      { input: 'four networks', isHidden: true, description: 'Four to one' }
    ],
    hints: [
      'Sort networks by address first',
      'Two /24s can become one /23 if adjacent',
      'Networks must align on new prefix boundary',
      'Repeat until no more merges possible'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex03',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'QoS Priority Queue',
    difficulty: 3,
    description: 'Implement a simple QoS (Quality of Service) priority queue with traffic classes.',
    starterCode: 'import heapq\n\nclass QoSQueue:\n    def __init__(self):\n        self.queue = []  # priority queue\n        self.priorities = {"realtime": 0, "interactive": 1, "bulk": 2, "best_effort": 3}\n    \n    def enqueue(self, packet, traffic_class):\n        # Add packet with appropriate priority\n        pass\n    \n    def dequeue(self):\n        # Return highest priority packet\n        pass\n\n# Test your class\nq = QoSQueue()\nq.enqueue("Email", "bulk")\nq.enqueue("VoIP", "realtime")\nq.enqueue("Web", "interactive")\nprint(q.dequeue())  # VoIP',
    solution: 'import heapq\n\nclass QoSQueue:\n    def __init__(self):\n        self.queue = []\n        self.priorities = {"realtime": 0, "interactive": 1, "bulk": 2, "best_effort": 3}\n        self.counter = 0  # For FIFO within same priority\n    \n    def enqueue(self, packet, traffic_class):\n        priority = self.priorities.get(traffic_class, 3)\n        heapq.heappush(self.queue, (priority, self.counter, packet))\n        self.counter += 1\n    \n    def dequeue(self):\n        if self.queue:\n            _, _, packet = heapq.heappop(self.queue)\n            return packet\n        return None\n\nq = QoSQueue()\nq.enqueue("Email", "bulk")\nq.enqueue("VoIP", "realtime")\nq.enqueue("Web", "interactive")\nprint(q.dequeue())',
    testCases: [
      { input: 'mixed priorities', isHidden: false, description: 'Realtime first' },
      { input: 'same priority FIFO', isHidden: true, description: 'FIFO order' }
    ],
    hints: [
      'Use heapq for priority queue',
      'Lower number = higher priority',
      'Include counter for FIFO within same priority',
      'Tuple comparison: (priority, counter, data)'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex04',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'Token Bucket Rate Limiter',
    difficulty: 4,
    description: 'Implement a token bucket algorithm for rate limiting. Tokens accumulate up to bucket size, consumed by packets.',
    starterCode: 'import time\n\nclass TokenBucket:\n    def __init__(self, rate, bucket_size):\n        self.rate = rate  # tokens per second\n        self.bucket_size = bucket_size\n        self.tokens = bucket_size\n        self.last_update = time.time()\n    \n    def consume(self, tokens_needed):\n        # Try to consume tokens, return True if allowed\n        pass\n\n# Test your class\nbucket = TokenBucket(rate=10, bucket_size=20)\nprint(bucket.consume(5))   # True\nprint(bucket.consume(20))  # False (only 15 left)',
    solution: 'import time\n\nclass TokenBucket:\n    def __init__(self, rate, bucket_size):\n        self.rate = rate\n        self.bucket_size = bucket_size\n        self.tokens = bucket_size\n        self.last_update = time.time()\n    \n    def _refill(self):\n        now = time.time()\n        elapsed = now - self.last_update\n        self.tokens = min(self.bucket_size, self.tokens + elapsed * self.rate)\n        self.last_update = now\n    \n    def consume(self, tokens_needed):\n        self._refill()\n        if self.tokens >= tokens_needed:\n            self.tokens -= tokens_needed\n            return True\n        return False\n\nbucket = TokenBucket(rate=10, bucket_size=20)\nprint(bucket.consume(5))\nprint(bucket.consume(20))',
    testCases: [
      { input: 'consume within limit', isHidden: false, description: 'Allowed' },
      { input: 'exceed bucket', isHidden: false, description: 'Denied' },
      { input: 'refill over time', isHidden: true, description: 'Tokens regenerate' }
    ],
    hints: [
      'Tokens accumulate at "rate" per second',
      'Maximum tokens = bucket_size',
      'Refill before each consume check',
      'Elapsed time × rate = new tokens'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex05',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'VLAN Manager',
    difficulty: 3,
    description: 'Manage VLAN assignments for switch ports. Support assigning VLANs, checking isolation, and trunk ports.',
    starterCode: 'class VLANManager:\n    def __init__(self, num_ports):\n        self.num_ports = num_ports\n        self.port_vlans = {}  # port -> set of VLANs\n        self.trunk_ports = set()\n    \n    def assign_access_port(self, port, vlan):\n        # Assign port to single VLAN (access mode)\n        pass\n    \n    def assign_trunk_port(self, port, vlans):\n        # Assign port to multiple VLANs (trunk mode)\n        pass\n    \n    def can_communicate(self, port1, port2):\n        # Check if ports share a VLAN\n        pass\n\n# Test your class\nvm = VLANManager(24)\nvm.assign_access_port(1, 10)\nvm.assign_access_port(2, 10)\nvm.assign_access_port(3, 20)\nprint(vm.can_communicate(1, 2))  # True\nprint(vm.can_communicate(1, 3))  # False',
    solution: 'class VLANManager:\n    def __init__(self, num_ports):\n        self.num_ports = num_ports\n        self.port_vlans = {}\n        self.trunk_ports = set()\n    \n    def assign_access_port(self, port, vlan):\n        self.port_vlans[port] = {vlan}\n        self.trunk_ports.discard(port)\n    \n    def assign_trunk_port(self, port, vlans):\n        self.port_vlans[port] = set(vlans)\n        self.trunk_ports.add(port)\n    \n    def can_communicate(self, port1, port2):\n        vlans1 = self.port_vlans.get(port1, set())\n        vlans2 = self.port_vlans.get(port2, set())\n        return bool(vlans1 & vlans2)  # Check intersection\n\nvm = VLANManager(24)\nvm.assign_access_port(1, 10)\nvm.assign_access_port(2, 10)\nvm.assign_access_port(3, 20)\nprint(vm.can_communicate(1, 2))\nprint(vm.can_communicate(1, 3))',
    testCases: [
      { input: 'same VLAN', isHidden: false, description: 'Can communicate' },
      { input: 'different VLAN', isHidden: false, description: 'Isolated' },
      { input: 'trunk port', isHidden: true, description: 'Multiple VLANs' }
    ],
    hints: [
      'Access port: single VLAN',
      'Trunk port: multiple VLANs (carries tags)',
      'Ports communicate if they share a VLAN',
      'Use set intersection to check overlap'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex06',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'Load Balancer',
    difficulty: 3,
    description: 'Implement a simple load balancer with round-robin distribution across backend servers.',
    starterCode: 'class LoadBalancer:\n    def __init__(self, servers):\n        self.servers = servers  # list of server addresses\n        self.current = 0\n        self.connections = {s: 0 for s in servers}\n    \n    def get_server(self):\n        # Return next server using round-robin\n        pass\n    \n    def get_stats(self):\n        # Return connection counts per server\n        pass\n\n# Test your class\nlb = LoadBalancer(["server1", "server2", "server3"])\nfor _ in range(10):\n    print(lb.get_server())\nprint(lb.get_stats())',
    solution: 'class LoadBalancer:\n    def __init__(self, servers):\n        self.servers = servers\n        self.current = 0\n        self.connections = {s: 0 for s in servers}\n    \n    def get_server(self):\n        server = self.servers[self.current]\n        self.connections[server] += 1\n        self.current = (self.current + 1) % len(self.servers)\n        return server\n    \n    def get_stats(self):\n        return self.connections.copy()\n\nlb = LoadBalancer(["server1", "server2", "server3"])\nfor _ in range(10):\n    print(lb.get_server())\nprint(lb.get_stats())',
    testCases: [
      { input: '10 requests to 3 servers', isHidden: false, description: 'Round-robin distribution' },
      { input: 'stats check', isHidden: true, description: 'Balanced connections' }
    ],
    hints: [
      'Round-robin: cycle through servers in order',
      'Use modulo to wrap around server list',
      'Track connection counts per server',
      'Return current server, then increment'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex07',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'Least Connections Load Balancer',
    difficulty: 3,
    description: 'Implement a load balancer using least-connections algorithm. Route to server with fewest active connections.',
    starterCode: 'class LeastConnectionsLB:\n    def __init__(self, servers):\n        self.servers = servers\n        self.active_connections = {s: 0 for s in servers}\n    \n    def get_server(self):\n        # Return server with least active connections\n        pass\n    \n    def release_connection(self, server):\n        # Mark a connection as completed\n        pass\n\n# Test your class\nlb = LeastConnectionsLB(["A", "B", "C"])\nprint(lb.get_server())  # A (0 connections)\nprint(lb.get_server())  # B (0 connections)\nlb.release_connection("A")\nprint(lb.get_server())  # A (back to 0)',
    solution: 'class LeastConnectionsLB:\n    def __init__(self, servers):\n        self.servers = servers\n        self.active_connections = {s: 0 for s in servers}\n    \n    def get_server(self):\n        # Find server with minimum connections\n        server = min(self.servers, key=lambda s: self.active_connections[s])\n        self.active_connections[server] += 1\n        return server\n    \n    def release_connection(self, server):\n        if server in self.active_connections and self.active_connections[server] > 0:\n            self.active_connections[server] -= 1\n\nlb = LeastConnectionsLB(["A", "B", "C"])\nprint(lb.get_server())\nprint(lb.get_server())\nlb.release_connection("A")\nprint(lb.get_server())',
    testCases: [
      { input: 'initial requests', isHidden: false, description: 'Equal distribution' },
      { input: 'after release', isHidden: true, description: 'Routes to freed server' }
    ],
    hints: [
      'Find server with minimum active connections',
      'Use min() with key function',
      'Increment count when assigning',
      'Decrement when connection completes'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex08',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'Multicast Group Manager',
    difficulty: 3,
    description: 'Manage multicast group memberships. Track which hosts have joined which multicast groups.',
    starterCode: 'class MulticastManager:\n    def __init__(self):\n        self.groups = {}  # group_ip -> set of members\n    \n    def join_group(self, host, group_ip):\n        # Host joins multicast group\n        pass\n    \n    def leave_group(self, host, group_ip):\n        # Host leaves multicast group\n        pass\n    \n    def get_members(self, group_ip):\n        # Return set of hosts in group\n        pass\n    \n    def get_groups(self, host):\n        # Return groups that host belongs to\n        pass\n\n# Test your class\nmm = MulticastManager()\nmm.join_group("host1", "224.0.0.1")\nmm.join_group("host2", "224.0.0.1")\nmm.join_group("host1", "224.0.0.2")\nprint(mm.get_members("224.0.0.1"))\nprint(mm.get_groups("host1"))',
    solution: 'class MulticastManager:\n    def __init__(self):\n        self.groups = {}\n    \n    def join_group(self, host, group_ip):\n        if group_ip not in self.groups:\n            self.groups[group_ip] = set()\n        self.groups[group_ip].add(host)\n    \n    def leave_group(self, host, group_ip):\n        if group_ip in self.groups:\n            self.groups[group_ip].discard(host)\n            if not self.groups[group_ip]:\n                del self.groups[group_ip]\n    \n    def get_members(self, group_ip):\n        return self.groups.get(group_ip, set()).copy()\n    \n    def get_groups(self, host):\n        return {g for g, members in self.groups.items() if host in members}\n\nmm = MulticastManager()\nmm.join_group("host1", "224.0.0.1")\nmm.join_group("host2", "224.0.0.1")\nmm.join_group("host1", "224.0.0.2")\nprint(mm.get_members("224.0.0.1"))\nprint(mm.get_groups("host1"))',
    testCases: [
      { input: 'join groups', isHidden: false, description: 'Group membership' },
      { input: 'host groups', isHidden: true, description: 'Reverse lookup' }
    ],
    hints: [
      'Multicast: 224.0.0.0 - 239.255.255.255',
      'Use set for group members',
      'Clean up empty groups on leave',
      'Support both directions of lookup'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex09',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'VPN Tunnel Simulator',
    difficulty: 4,
    description: 'Simulate VPN encapsulation. Wrap an inner packet with VPN header containing tunnel endpoints.',
    starterCode: '# Simulate VPN encapsulation\ndef encapsulate_vpn(inner_packet, tunnel_src, tunnel_dst, tunnel_id):\n    # Return encapsulated packet structure\n    pass\n\ndef decapsulate_vpn(vpn_packet):\n    # Extract inner packet from VPN encapsulation\n    pass\n\n# Test your functions\ninner = {"src": "192.168.1.10", "dst": "192.168.2.20", "data": "Hello"}\nvpn_pkt = encapsulate_vpn(inner, "1.2.3.4", "5.6.7.8", 100)\nprint(vpn_pkt)\nprint(decapsulate_vpn(vpn_pkt))',
    solution: 'def encapsulate_vpn(inner_packet, tunnel_src, tunnel_dst, tunnel_id):\n    return {\n        "outer_src": tunnel_src,\n        "outer_dst": tunnel_dst,\n        "tunnel_id": tunnel_id,\n        "protocol": "VPN",\n        "inner_packet": inner_packet\n    }\n\ndef decapsulate_vpn(vpn_packet):\n    return vpn_packet.get("inner_packet")\n\ninner = {"src": "192.168.1.10", "dst": "192.168.2.20", "data": "Hello"}\nvpn_pkt = encapsulate_vpn(inner, "1.2.3.4", "5.6.7.8", 100)\nprint(vpn_pkt)\nprint(decapsulate_vpn(vpn_pkt))',
    testCases: [
      { input: 'encapsulate inner packet', isHidden: false, description: 'Add VPN header' },
      { input: 'decapsulate', isHidden: true, description: 'Extract original' }
    ],
    hints: [
      'VPN wraps original packet with new header',
      'Outer header has tunnel endpoint addresses',
      'Inner packet travels encrypted through tunnel',
      'Decapsulation reveals original packet'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex10',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'MPLS Label Stack',
    difficulty: 4,
    description: 'Implement MPLS label operations: push, pop, and swap labels on a label stack.',
    starterCode: 'class MPLSPacket:\n    def __init__(self, payload):\n        self.label_stack = []  # Bottom of stack first\n        self.payload = payload\n    \n    def push_label(self, label, ttl=64):\n        # Push label onto stack\n        pass\n    \n    def pop_label(self):\n        # Pop and return top label\n        pass\n    \n    def swap_label(self, new_label):\n        # Replace top label\n        pass\n    \n    def top_label(self):\n        # Peek at top label without removing\n        pass\n\n# Test your class\npkt = MPLSPacket("data")\npkt.push_label(100)\npkt.push_label(200)\nprint(pkt.top_label())  # 200\npkt.swap_label(300)\nprint(pkt.pop_label())  # 300\nprint(pkt.top_label())  # 100',
    solution: 'class MPLSPacket:\n    def __init__(self, payload):\n        self.label_stack = []\n        self.payload = payload\n    \n    def push_label(self, label, ttl=64):\n        self.label_stack.append({"label": label, "ttl": ttl})\n    \n    def pop_label(self):\n        if self.label_stack:\n            return self.label_stack.pop()\n        return None\n    \n    def swap_label(self, new_label):\n        if self.label_stack:\n            old_ttl = self.label_stack[-1]["ttl"]\n            self.label_stack[-1] = {"label": new_label, "ttl": old_ttl - 1}\n    \n    def top_label(self):\n        if self.label_stack:\n            return self.label_stack[-1]["label"]\n        return None\n\npkt = MPLSPacket("data")\npkt.push_label(100)\npkt.push_label(200)\nprint(pkt.top_label())\npkt.swap_label(300)\nprint(pkt.pop_label())\nprint(pkt.top_label())',
    testCases: [
      { input: 'push and pop', isHidden: false, description: 'Stack operations' },
      { input: 'swap label', isHidden: true, description: 'Label swap' }
    ],
    hints: [
      'MPLS uses label stack (LIFO)',
      'Push: add label to top',
      'Pop: remove from top',
      'Swap: replace top label, preserve TTL'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex11',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'Firewall Rule Engine',
    difficulty: 4,
    description: 'Implement a simple firewall rule engine. Support allow/deny rules with source/dest IP and port matching.',
    starterCode: 'class Firewall:\n    def __init__(self):\n        self.rules = []\n    \n    def add_rule(self, action, src_ip, dst_ip, dst_port):\n        # action: "allow" or "deny"\n        # Use "*" for any\n        pass\n    \n    def check_packet(self, src_ip, dst_ip, dst_port):\n        # Return "allow" or "deny" (default deny)\n        pass\n\n# Test your class\nfw = Firewall()\nfw.add_rule("allow", "*", "192.168.1.1", 80)\nfw.add_rule("deny", "10.0.0.0/8", "*", "*")\nprint(fw.check_packet("5.5.5.5", "192.168.1.1", 80))  # allow\nprint(fw.check_packet("10.0.0.1", "1.1.1.1", 443))   # deny',
    solution: 'class Firewall:\n    def __init__(self):\n        self.rules = []\n    \n    def add_rule(self, action, src_ip, dst_ip, dst_port):\n        self.rules.append({\n            "action": action,\n            "src_ip": src_ip,\n            "dst_ip": dst_ip,\n            "dst_port": dst_port\n        })\n    \n    def _match_ip(self, rule_ip, actual_ip):\n        if rule_ip == "*":\n            return True\n        if "/" in rule_ip:\n            # CIDR match (simplified)\n            network, prefix = rule_ip.split("/")\n            prefix = int(prefix)\n            net_parts = [int(x) for x in network.split(".")]\n            ip_parts = [int(x) for x in actual_ip.split(".")]\n            # Compare prefix bits\n            for i in range(prefix // 8):\n                if net_parts[i] != ip_parts[i]:\n                    return False\n            return True\n        return rule_ip == actual_ip\n    \n    def check_packet(self, src_ip, dst_ip, dst_port):\n        for rule in self.rules:\n            if (self._match_ip(rule["src_ip"], src_ip) and\n                self._match_ip(rule["dst_ip"], dst_ip) and\n                (rule["dst_port"] == "*" or rule["dst_port"] == dst_port)):\n                return rule["action"]\n        return "deny"  # Default deny\n\nfw = Firewall()\nfw.add_rule("allow", "*", "192.168.1.1", 80)\nfw.add_rule("deny", "10.0.0.0/8", "*", "*")\nprint(fw.check_packet("5.5.5.5", "192.168.1.1", 80))\nprint(fw.check_packet("10.0.0.1", "1.1.1.1", 443))',
    testCases: [
      { input: 'allowed traffic', isHidden: false, description: 'Match allow rule' },
      { input: 'blocked traffic', isHidden: true, description: 'Match deny rule' }
    ],
    hints: [
      'Process rules in order, first match wins',
      'Support wildcards (*) for any',
      'Support CIDR notation for IP ranges',
      'Default action is deny'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex12',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'SDN Flow Table',
    difficulty: 4,
    description: 'Implement a simple SDN (Software-Defined Networking) flow table. Match on packet fields and execute actions.',
    starterCode: 'class FlowTable:\n    def __init__(self):\n        self.flows = []  # (priority, match, actions)\n    \n    def add_flow(self, priority, match, actions):\n        # match: dict of fields to match\n        # actions: list of action strings\n        pass\n    \n    def process_packet(self, packet):\n        # Return actions for matching flow, or None\n        pass\n\n# Test your class\nft = FlowTable()\nft.add_flow(100, {"dst_port": 80}, ["output:1"])\nft.add_flow(50, {"src_ip": "10.0.0.0/8"}, ["drop"])\nprint(ft.process_packet({"src_ip": "5.5.5.5", "dst_port": 80}))',
    solution: 'class FlowTable:\n    def __init__(self):\n        self.flows = []\n    \n    def add_flow(self, priority, match, actions):\n        self.flows.append((priority, match, actions))\n        # Sort by priority (higher first)\n        self.flows.sort(key=lambda x: -x[0])\n    \n    def _match_field(self, match_value, packet_value):\n        if "/" in str(match_value):\n            # CIDR match\n            network, prefix = match_value.split("/")\n            prefix = int(prefix)\n            net_parts = [int(x) for x in network.split(".")]\n            ip_parts = [int(x) for x in packet_value.split(".")]\n            for i in range(prefix // 8):\n                if net_parts[i] != ip_parts[i]:\n                    return False\n            return True\n        return match_value == packet_value\n    \n    def process_packet(self, packet):\n        for priority, match, actions in self.flows:\n            matched = True\n            for field, value in match.items():\n                if field not in packet or not self._match_field(value, packet[field]):\n                    matched = False\n                    break\n            if matched:\n                return actions\n        return None\n\nft = FlowTable()\nft.add_flow(100, {"dst_port": 80}, ["output:1"])\nft.add_flow(50, {"src_ip": "10.0.0.0/8"}, ["drop"])\nprint(ft.process_packet({"src_ip": "5.5.5.5", "dst_port": 80}))',
    testCases: [
      { input: 'match dst_port', isHidden: false, description: 'Port match' },
      { input: 'priority order', isHidden: true, description: 'Higher priority wins' }
    ],
    hints: [
      'Higher priority flows checked first',
      'All match fields must match',
      'Support wildcard via omitting field',
      'Return actions of first matching flow'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex13',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'BGP Path Selector',
    difficulty: 5,
    description: 'Implement simplified BGP path selection. Compare paths based on AS path length and prefer shorter paths.',
    starterCode: '# BGP Path Selection\nclass BGPPath:\n    def __init__(self, prefix, as_path, next_hop, local_pref=100):\n        self.prefix = prefix\n        self.as_path = as_path  # list of AS numbers\n        self.next_hop = next_hop\n        self.local_pref = local_pref\n\ndef select_best_path(paths):\n    # Return best path based on BGP selection rules\n    pass\n\n# Test\npaths = [\n    BGPPath("10.0.0.0/8", [100, 200, 300], "1.1.1.1"),\n    BGPPath("10.0.0.0/8", [100, 200], "2.2.2.2"),\n    BGPPath("10.0.0.0/8", [100, 200, 300], "3.3.3.3", local_pref=200)\n]\nbest = select_best_path(paths)\nprint(f"Best: {best.next_hop}, AS path: {best.as_path}")',
    solution: 'class BGPPath:\n    def __init__(self, prefix, as_path, next_hop, local_pref=100):\n        self.prefix = prefix\n        self.as_path = as_path\n        self.next_hop = next_hop\n        self.local_pref = local_pref\n\ndef select_best_path(paths):\n    if not paths:\n        return None\n    \n    # BGP selection criteria (simplified):\n    # 1. Highest local preference\n    # 2. Shortest AS path\n    # 3. Lowest next-hop (tiebreaker)\n    \n    def path_key(path):\n        return (\n            -path.local_pref,      # Higher is better (negate)\n            len(path.as_path),     # Shorter is better\n            path.next_hop          # Tiebreaker\n        )\n    \n    return min(paths, key=path_key)\n\npaths = [\n    BGPPath("10.0.0.0/8", [100, 200, 300], "1.1.1.1"),\n    BGPPath("10.0.0.0/8", [100, 200], "2.2.2.2"),\n    BGPPath("10.0.0.0/8", [100, 200, 300], "3.3.3.3", local_pref=200)\n]\nbest = select_best_path(paths)\nprint(f"Best: {best.next_hop}, AS path: {best.as_path}")',
    testCases: [
      { input: 'different path lengths', isHidden: false, description: 'Prefer shorter' },
      { input: 'different local_pref', isHidden: true, description: 'Higher pref wins' }
    ],
    hints: [
      'BGP prefers: highest local preference',
      'Then: shortest AS path length',
      'Then: various tiebreakers',
      'Use tuple comparison for multi-criteria sort'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex14',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'Network Simulator Hop Counter',
    difficulty: 3,
    description: 'Simulate packet routing through a network. Count hops and check if destination is reachable.',
    starterCode: '# Network hop simulation\nclass NetworkSimulator:\n    def __init__(self):\n        self.topology = {}  # node -> list of (neighbor, cost)\n    \n    def add_link(self, node1, node2, cost=1):\n        # Add bidirectional link\n        pass\n    \n    def route_packet(self, src, dst, max_hops=30):\n        # Return (hops, path) or (-1, []) if unreachable\n        pass\n\n# Test your class\nnet = NetworkSimulator()\nnet.add_link("A", "B")\nnet.add_link("B", "C")\nnet.add_link("C", "D")\nprint(net.route_packet("A", "D"))',
    solution: 'from collections import deque\n\nclass NetworkSimulator:\n    def __init__(self):\n        self.topology = {}\n    \n    def add_link(self, node1, node2, cost=1):\n        if node1 not in self.topology:\n            self.topology[node1] = []\n        if node2 not in self.topology:\n            self.topology[node2] = []\n        self.topology[node1].append((node2, cost))\n        self.topology[node2].append((node1, cost))\n    \n    def route_packet(self, src, dst, max_hops=30):\n        if src not in self.topology:\n            return (-1, [])\n        \n        # BFS for shortest path\n        queue = deque([(src, [src])])\n        visited = {src}\n        \n        while queue:\n            node, path = queue.popleft()\n            if len(path) - 1 > max_hops:\n                break\n            if node == dst:\n                return (len(path) - 1, path)\n            for neighbor, _ in self.topology.get(node, []):\n                if neighbor not in visited:\n                    visited.add(neighbor)\n                    queue.append((neighbor, path + [neighbor]))\n        \n        return (-1, [])\n\nnet = NetworkSimulator()\nnet.add_link("A", "B")\nnet.add_link("B", "C")\nnet.add_link("C", "D")\nprint(net.route_packet("A", "D"))',
    testCases: [
      { input: 'A to D', isHidden: false, description: 'Multi-hop path' },
      { input: 'unreachable', isHidden: true, description: 'No path exists' }
    ],
    hints: [
      'Use BFS for shortest hop count',
      'Track visited nodes to avoid loops',
      'Return both hop count and path',
      'Respect max_hops limit (like TTL)'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex15',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'DHCP Lease Manager',
    difficulty: 3,
    description: 'Implement a simple DHCP lease manager. Allocate IPs from a pool and track lease expiration.',
    starterCode: 'import time\n\nclass DHCPServer:\n    def __init__(self, start_ip, end_ip, lease_time=3600):\n        self.pool = []  # Available IPs\n        self.leases = {}  # IP -> (mac, expiry)\n        self.lease_time = lease_time\n        # Initialize pool\n    \n    def allocate(self, mac_address):\n        # Return allocated IP or None\n        pass\n    \n    def release(self, ip):\n        # Release IP back to pool\n        pass\n\n# Test your class\ndhcp = DHCPServer("192.168.1.100", "192.168.1.110")\nprint(dhcp.allocate("AA:BB:CC:DD:EE:FF"))\nprint(dhcp.allocate("11:22:33:44:55:66"))',
    solution: 'import time\n\nclass DHCPServer:\n    def __init__(self, start_ip, end_ip, lease_time=3600):\n        self.leases = {}\n        self.lease_time = lease_time\n        self.mac_to_ip = {}\n        \n        # Generate IP pool\n        def ip_to_int(ip):\n            parts = [int(x) for x in ip.split(".")]\n            return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]\n        \n        def int_to_ip(num):\n            return f"{(num >> 24) & 0xFF}.{(num >> 16) & 0xFF}.{(num >> 8) & 0xFF}.{num & 0xFF}"\n        \n        start = ip_to_int(start_ip)\n        end = ip_to_int(end_ip)\n        self.pool = [int_to_ip(i) for i in range(start, end + 1)]\n    \n    def allocate(self, mac_address):\n        # Check for existing lease\n        if mac_address in self.mac_to_ip:\n            ip = self.mac_to_ip[mac_address]\n            self.leases[ip] = (mac_address, time.time() + self.lease_time)\n            return ip\n        \n        # Allocate new IP\n        if self.pool:\n            ip = self.pool.pop(0)\n            self.leases[ip] = (mac_address, time.time() + self.lease_time)\n            self.mac_to_ip[mac_address] = ip\n            return ip\n        return None\n    \n    def release(self, ip):\n        if ip in self.leases:\n            mac, _ = self.leases[ip]\n            del self.leases[ip]\n            del self.mac_to_ip[mac]\n            self.pool.append(ip)\n\ndhcp = DHCPServer("192.168.1.100", "192.168.1.110")\nprint(dhcp.allocate("AA:BB:CC:DD:EE:FF"))\nprint(dhcp.allocate("11:22:33:44:55:66"))',
    testCases: [
      { input: 'allocate two IPs', isHidden: false, description: 'Sequential allocation' },
      { input: 'same MAC gets same IP', isHidden: true, description: 'Lease renewal' }
    ],
    hints: [
      'Generate IP pool from range',
      'Track MAC address to IP mapping',
      'Return same IP for same MAC (renewal)',
      'Release returns IP to pool'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t5-ex16',
    subjectId: 'cs302',
    topicId: 'cs302-topic-5',
    title: 'Network Bandwidth Monitor',
    difficulty: 3,
    description: 'Monitor network bandwidth usage. Track bytes transferred and calculate rates over time windows.',
    starterCode: 'import time\n\nclass BandwidthMonitor:\n    def __init__(self, window_seconds=60):\n        self.window = window_seconds\n        self.samples = []  # (timestamp, bytes)\n    \n    def record(self, bytes_transferred):\n        # Record a transfer\n        pass\n    \n    def get_rate_mbps(self):\n        # Get current bandwidth rate in Mbps\n        pass\n    \n    def get_total_mb(self):\n        # Get total MB in current window\n        pass\n\n# Test your class\nbw = BandwidthMonitor(window_seconds=10)\nbw.record(1000000)  # 1 MB\nbw.record(2000000)  # 2 MB\nprint(f"Rate: {bw.get_rate_mbps()} Mbps")\nprint(f"Total: {bw.get_total_mb()} MB")',
    solution: 'import time\n\nclass BandwidthMonitor:\n    def __init__(self, window_seconds=60):\n        self.window = window_seconds\n        self.samples = []\n    \n    def _cleanup(self):\n        cutoff = time.time() - self.window\n        self.samples = [(t, b) for t, b in self.samples if t > cutoff]\n    \n    def record(self, bytes_transferred):\n        self.samples.append((time.time(), bytes_transferred))\n        self._cleanup()\n    \n    def get_rate_mbps(self):\n        self._cleanup()\n        if not self.samples:\n            return 0.0\n        total_bytes = sum(b for _, b in self.samples)\n        # Calculate rate based on window\n        elapsed = min(self.window, time.time() - self.samples[0][0]) if self.samples else self.window\n        if elapsed == 0:\n            return 0.0\n        bytes_per_second = total_bytes / elapsed\n        return round(bytes_per_second * 8 / 1_000_000, 2)\n    \n    def get_total_mb(self):\n        self._cleanup()\n        total_bytes = sum(b for _, b in self.samples)\n        return round(total_bytes / 1_000_000, 2)\n\nbw = BandwidthMonitor(window_seconds=10)\nbw.record(1000000)\nbw.record(2000000)\nprint(f"Rate: {bw.get_rate_mbps()} Mbps")\nprint(f"Total: {bw.get_total_mb()} MB")',
    testCases: [
      { input: 'record and query', isHidden: false, description: 'Basic monitoring' },
      { input: 'window expiry', isHidden: true, description: 'Old samples removed' }
    ],
    hints: [
      'Store samples with timestamps',
      'Remove old samples outside window',
      'Rate = total bytes / time elapsed',
      'Convert bytes to bits for Mbps'
    ],
    language: 'python'
  }
];
