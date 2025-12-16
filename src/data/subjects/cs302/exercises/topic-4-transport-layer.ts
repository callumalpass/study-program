import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs302-t4-ex01',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Port Number Classifier',
    difficulty: 1,
    description: 'Classify a port number as well-known (0-1023), registered (1024-49151), or dynamic/private (49152-65535).',
    starterCode: '# Classify port number\ndef classify_port(port):\n    # Your code here\n    pass\n\n# Test your function\nprint(classify_port(80))\nprint(classify_port(8080))\nprint(classify_port(55000))',
    solution: 'def classify_port(port):\n    if port < 0 or port > 65535:\n        return "invalid"\n    elif port <= 1023:\n        return "well-known"\n    elif port <= 49151:\n        return "registered"\n    else:\n        return "dynamic"\n\nprint(classify_port(80))\nprint(classify_port(8080))\nprint(classify_port(55000))',
    testCases: [
      { input: '80', isHidden: false, description: 'Well-known port' },
      { input: '8080', isHidden: false, description: 'Registered port' },
      { input: '55000', isHidden: true, description: 'Dynamic port' }
    ],
    hints: [
      'Well-known ports: 0-1023',
      'Registered ports: 1024-49151',
      'Dynamic/Private: 49152-65535',
      'Total port range: 0-65535'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex02',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Common Port Lookup',
    difficulty: 1,
    description: 'Look up common port numbers and return the associated service name.',
    starterCode: '# Lookup common port services\ndef port_service(port):\n    # Your code here\n    pass\n\n# Test your function\nprint(port_service(80))\nprint(port_service(443))\nprint(port_service(22))',
    solution: 'def port_service(port):\n    services = {\n        20: "FTP Data",\n        21: "FTP Control",\n        22: "SSH",\n        23: "Telnet",\n        25: "SMTP",\n        53: "DNS",\n        67: "DHCP Server",\n        68: "DHCP Client",\n        80: "HTTP",\n        110: "POP3",\n        143: "IMAP",\n        443: "HTTPS",\n        993: "IMAPS",\n        995: "POP3S",\n        3306: "MySQL",\n        5432: "PostgreSQL",\n        6379: "Redis"\n    }\n    return services.get(port, "Unknown")\n\nprint(port_service(80))\nprint(port_service(443))\nprint(port_service(22))',
    testCases: [
      { input: '80', isHidden: false, description: 'HTTP' },
      { input: '443', isHidden: false, description: 'HTTPS' },
      { input: '53', isHidden: true, description: 'DNS' }
    ],
    hints: [
      'Port 80 = HTTP, 443 = HTTPS',
      'Port 22 = SSH, 23 = Telnet',
      'Port 53 = DNS, 25 = SMTP',
      'Use a dictionary for lookups'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex03',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'TCP vs UDP Comparator',
    difficulty: 2,
    description: 'Return characteristics of TCP or UDP given the protocol name. Include connection type, reliability, and typical use cases.',
    starterCode: '# Get protocol characteristics\ndef protocol_info(protocol):\n    # Return dict with: connection, reliable, ordering, typical_use\n    pass\n\n# Test your function\nprint(protocol_info("TCP"))\nprint(protocol_info("UDP"))',
    solution: 'def protocol_info(protocol):\n    protocols = {\n        "TCP": {\n            "connection": "connection-oriented",\n            "reliable": True,\n            "ordering": True,\n            "typical_use": ["HTTP", "HTTPS", "SSH", "FTP", "SMTP"]\n        },\n        "UDP": {\n            "connection": "connectionless",\n            "reliable": False,\n            "ordering": False,\n            "typical_use": ["DNS", "DHCP", "VoIP", "Video Streaming", "Gaming"]\n        }\n    }\n    return protocols.get(protocol.upper(), {})\n\nprint(protocol_info("TCP"))\nprint(protocol_info("UDP"))',
    testCases: [
      { input: '"TCP"', isHidden: false, description: 'TCP characteristics' },
      { input: '"UDP"', isHidden: false, description: 'UDP characteristics' },
      { input: '"tcp"', isHidden: true, description: 'Case insensitive' }
    ],
    hints: [
      'TCP is connection-oriented, reliable, ordered',
      'UDP is connectionless, unreliable, unordered',
      'TCP uses handshakes, UDP does not',
      'UDP has lower latency, good for real-time'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex04',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Sequence Number Calculator',
    difficulty: 3,
    description: 'Calculate TCP sequence numbers for a data stream. Given initial sequence number and data segments, return sequence numbers for each segment.',
    starterCode: '# Calculate TCP sequence numbers\ndef calculate_seq_numbers(initial_seq, segment_sizes):\n    # Return list of sequence numbers for each segment\n    pass\n\n# Test your function\nprint(calculate_seq_numbers(1000, [100, 200, 150]))',
    solution: 'def calculate_seq_numbers(initial_seq, segment_sizes):\n    seq_numbers = []\n    current_seq = initial_seq\n    \n    for size in segment_sizes:\n        seq_numbers.append(current_seq)\n        current_seq += size\n    \n    return seq_numbers\n\nprint(calculate_seq_numbers(1000, [100, 200, 150]))',
    testCases: [
      { input: '1000, [100, 200, 150]', isHidden: false, description: 'Three segments' },
      { input: '0, [500, 500, 500]', isHidden: true, description: 'Equal segments' }
    ],
    hints: [
      'First segment uses initial sequence number',
      'Each subsequent segment = previous + previous size',
      'Sequence number = first byte of segment data',
      'Sequence increments by bytes sent'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex05',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'ACK Number Calculator',
    difficulty: 3,
    description: 'Calculate the TCP acknowledgment number. ACK = sequence number of next expected byte.',
    starterCode: '# Calculate TCP ACK number\ndef calculate_ack(received_seq, received_length):\n    # Return the ACK number to send back\n    pass\n\n# Test your function\nprint(calculate_ack(1000, 500))  # Received seq 1000, 500 bytes\nprint(calculate_ack(1500, 300))  # Received seq 1500, 300 bytes',
    solution: 'def calculate_ack(received_seq, received_length):\n    # ACK = sequence number of next expected byte\n    return received_seq + received_length\n\nprint(calculate_ack(1000, 500))\nprint(calculate_ack(1500, 300))',
    testCases: [
      { input: '1000, 500', isHidden: false, description: 'ACK after 500 bytes' },
      { input: '1500, 300', isHidden: false, description: 'ACK after 300 bytes' },
      { input: '0, 1460', isHidden: true, description: 'Full MSS segment' }
    ],
    hints: [
      'ACK number = next byte expected',
      'ACK = received_seq + data_length',
      'Acknowledges all bytes up to this point',
      'Cumulative acknowledgment in TCP'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex06',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'TCP Handshake Simulator',
    difficulty: 3,
    description: 'Simulate the TCP three-way handshake. Track sequence and ACK numbers through SYN, SYN-ACK, and ACK.',
    starterCode: '# Simulate TCP three-way handshake\ndef three_way_handshake(client_isn, server_isn):\n    # Return list of (sender, seq, ack, flags) tuples\n    pass\n\n# Test your function\nhandshake = three_way_handshake(100, 300)\nfor step in handshake:\n    print(step)',
    solution: 'def three_way_handshake(client_isn, server_isn):\n    steps = []\n    \n    # Step 1: Client sends SYN\n    steps.append(("client", client_isn, 0, "SYN"))\n    \n    # Step 2: Server sends SYN-ACK\n    steps.append(("server", server_isn, client_isn + 1, "SYN-ACK"))\n    \n    # Step 3: Client sends ACK\n    steps.append(("client", client_isn + 1, server_isn + 1, "ACK"))\n    \n    return steps\n\nhandshake = three_way_handshake(100, 300)\nfor step in handshake:\n    print(step)',
    testCases: [
      { input: '100, 300', isHidden: false, description: 'Normal handshake' },
      { input: '0, 0', isHidden: true, description: 'Zero ISNs' }
    ],
    hints: [
      'SYN: client seq=ISN, ack=0',
      'SYN-ACK: server seq=ISN, ack=client_ISN+1',
      'ACK: client seq=ISN+1, ack=server_ISN+1',
      'SYN and SYN-ACK consume one sequence number'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex07',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Window Size Analyzer',
    difficulty: 3,
    description: 'Calculate how many segments can be sent without waiting for ACKs, given window size and MSS (Maximum Segment Size).',
    starterCode: '# Calculate segments in flight\ndef segments_in_window(window_size, mss):\n    # Return number of full segments that fit\n    pass\n\n# Test your function\nprint(segments_in_window(65535, 1460))  # Typical values\nprint(segments_in_window(16384, 536))',
    solution: 'def segments_in_window(window_size, mss):\n    return window_size // mss\n\nprint(segments_in_window(65535, 1460))\nprint(segments_in_window(16384, 536))',
    testCases: [
      { input: '65535, 1460', isHidden: false, description: 'Max window, Ethernet MSS' },
      { input: '16384, 536', isHidden: false, description: 'Smaller window' },
      { input: '1460, 1460', isHidden: true, description: 'Window equals MSS' }
    ],
    hints: [
      'Window size is in bytes',
      'MSS is maximum segment size in bytes',
      'Segments = window_size / MSS',
      'Use integer division for full segments'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex08',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Checksum Calculator',
    difficulty: 4,
    description: 'Calculate a simplified TCP/UDP checksum using one\'s complement sum of 16-bit words.',
    starterCode: '# Calculate transport layer checksum\ndef calculate_checksum(data_bytes):\n    # data_bytes is a list of integers (bytes)\n    # Return 16-bit checksum\n    pass\n\n# Test your function\nprint(hex(calculate_checksum([0x00, 0x01, 0x00, 0x02])))',
    solution: 'def calculate_checksum(data_bytes):\n    # Pad if odd number of bytes\n    if len(data_bytes) % 2 == 1:\n        data_bytes = data_bytes + [0]\n    \n    # Sum 16-bit words\n    total = 0\n    for i in range(0, len(data_bytes), 2):\n        word = (data_bytes[i] << 8) + data_bytes[i + 1]\n        total += word\n    \n    # Fold 32-bit sum to 16 bits\n    while total > 0xFFFF:\n        total = (total & 0xFFFF) + (total >> 16)\n    \n    # One\'s complement\n    return (~total) & 0xFFFF\n\nprint(hex(calculate_checksum([0x00, 0x01, 0x00, 0x02])))',
    testCases: [
      { input: '[0x00, 0x01, 0x00, 0x02]', isHidden: false, description: 'Simple data' },
      { input: '[0xFF, 0xFF, 0x00, 0x00]', isHidden: true, description: 'With max values' }
    ],
    hints: [
      'Sum 16-bit words (big-endian)',
      'Fold carries back into lower 16 bits',
      'Final result is one\'s complement (~sum)',
      'Checksum verifies to 0xFFFF when valid'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex09',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'RTT Estimator',
    difficulty: 4,
    description: 'Implement TCP RTT estimation using exponential weighted moving average (EWMA). EstimatedRTT = (1-α) × EstimatedRTT + α × SampleRTT',
    starterCode: '# TCP RTT Estimation\nclass RTTEstimator:\n    def __init__(self, alpha=0.125):\n        self.alpha = alpha\n        self.estimated_rtt = None\n    \n    def update(self, sample_rtt):\n        # Update estimated RTT with new sample\n        # Return new estimated RTT\n        pass\n\n# Test your class\nest = RTTEstimator()\nfor sample in [100, 120, 90, 110, 105]:\n    print(f"Sample: {sample}, Estimated: {est.update(sample)}")',
    solution: 'class RTTEstimator:\n    def __init__(self, alpha=0.125):\n        self.alpha = alpha\n        self.estimated_rtt = None\n    \n    def update(self, sample_rtt):\n        if self.estimated_rtt is None:\n            self.estimated_rtt = sample_rtt\n        else:\n            self.estimated_rtt = (1 - self.alpha) * self.estimated_rtt + self.alpha * sample_rtt\n        return round(self.estimated_rtt, 2)\n\nest = RTTEstimator()\nfor sample in [100, 120, 90, 110, 105]:\n    print(f"Sample: {sample}, Estimated: {est.update(sample)}")',
    testCases: [
      { input: 'samples: [100, 120, 90, 110, 105]', isHidden: false, description: 'Multiple samples' },
      { input: 'single sample', isHidden: true, description: 'First sample' }
    ],
    hints: [
      'First sample becomes initial estimate',
      'EWMA formula: EstRTT = (1-α)×EstRTT + α×Sample',
      'α = 0.125 (1/8) is recommended',
      'Smooths out RTT variations'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex10',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Timeout Calculator',
    difficulty: 4,
    description: 'Calculate TCP retransmission timeout (RTO) from EstimatedRTT and DevRTT. RTO = EstimatedRTT + 4 × DevRTT',
    starterCode: '# TCP Timeout Calculation\nclass TimeoutCalculator:\n    def __init__(self, alpha=0.125, beta=0.25):\n        self.alpha = alpha\n        self.beta = beta\n        self.estimated_rtt = None\n        self.dev_rtt = None\n    \n    def update(self, sample_rtt):\n        # Update estimates and return RTO\n        pass\n\n# Test your class\ncalc = TimeoutCalculator()\nfor sample in [100, 150, 80, 120]:\n    print(f"Sample: {sample}, RTO: {calc.update(sample)}")',
    solution: 'class TimeoutCalculator:\n    def __init__(self, alpha=0.125, beta=0.25):\n        self.alpha = alpha\n        self.beta = beta\n        self.estimated_rtt = None\n        self.dev_rtt = None\n    \n    def update(self, sample_rtt):\n        if self.estimated_rtt is None:\n            self.estimated_rtt = sample_rtt\n            self.dev_rtt = sample_rtt / 2\n        else:\n            # Update DevRTT first (uses old EstimatedRTT)\n            self.dev_rtt = (1 - self.beta) * self.dev_rtt + self.beta * abs(sample_rtt - self.estimated_rtt)\n            # Update EstimatedRTT\n            self.estimated_rtt = (1 - self.alpha) * self.estimated_rtt + self.alpha * sample_rtt\n        \n        # Calculate RTO\n        rto = self.estimated_rtt + 4 * self.dev_rtt\n        return round(rto, 2)\n\ncalc = TimeoutCalculator()\nfor sample in [100, 150, 80, 120]:\n    print(f"Sample: {sample}, RTO: {calc.update(sample)}")',
    testCases: [
      { input: 'samples: [100, 150, 80, 120]', isHidden: false, description: 'Variable samples' },
      { input: 'stable RTT', isHidden: true, description: 'Consistent samples' }
    ],
    hints: [
      'DevRTT = (1-β)×DevRTT + β×|Sample-EstRTT|',
      'EstRTT = (1-α)×EstRTT + α×Sample',
      'RTO = EstRTT + 4×DevRTT',
      'Initial DevRTT = SampleRTT/2'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex11',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Congestion Window Simulator',
    difficulty: 4,
    description: 'Simulate TCP congestion control. Implement slow start (exponential growth) and congestion avoidance (linear growth).',
    starterCode: '# TCP Congestion Control Simulator\nclass CongestionControl:\n    def __init__(self, mss=1460, ssthresh=65535):\n        self.mss = mss\n        self.ssthresh = ssthresh\n        self.cwnd = mss  # Start with 1 MSS\n    \n    def on_ack(self):\n        # Called when ACK received\n        # Return new cwnd\n        pass\n    \n    def on_loss(self):\n        # Called on packet loss\n        # Return new cwnd\n        pass\n\n# Test your class\ncc = CongestionControl(mss=1000, ssthresh=8000)\nfor i in range(10):\n    print(f"Round {i+1}: cwnd = {cc.on_ack()}")',
    solution: 'class CongestionControl:\n    def __init__(self, mss=1460, ssthresh=65535):\n        self.mss = mss\n        self.ssthresh = ssthresh\n        self.cwnd = mss\n    \n    def on_ack(self):\n        if self.cwnd < self.ssthresh:\n            # Slow start: double cwnd (exponential)\n            self.cwnd += self.mss\n        else:\n            # Congestion avoidance: add 1 MSS per RTT (linear)\n            self.cwnd += self.mss * self.mss // self.cwnd\n        return self.cwnd\n    \n    def on_loss(self):\n        # Multiplicative decrease\n        self.ssthresh = max(self.cwnd // 2, 2 * self.mss)\n        self.cwnd = self.mss\n        return self.cwnd\n\ncc = CongestionControl(mss=1000, ssthresh=8000)\nfor i in range(10):\n    print(f"Round {i+1}: cwnd = {cc.on_ack()}")',
    testCases: [
      { input: 'slow start growth', isHidden: false, description: 'Exponential increase' },
      { input: 'after loss', isHidden: true, description: 'Reset to slow start' }
    ],
    hints: [
      'Slow start: cwnd doubles each RTT (< ssthresh)',
      'Congestion avoidance: cwnd += MSS²/cwnd per ACK',
      'On loss: ssthresh = cwnd/2, cwnd = 1 MSS',
      'AIMD: Additive Increase, Multiplicative Decrease'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex12',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'TCP State Machine',
    difficulty: 5,
    description: 'Implement a simplified TCP state machine for connection establishment and teardown.',
    starterCode: '# TCP State Machine\nclass TCPStateMachine:\n    def __init__(self, is_server=False):\n        self.state = "CLOSED"\n        self.is_server = is_server\n    \n    def process_event(self, event):\n        # Event can be: LISTEN, CONNECT, SYN, SYN_ACK, ACK, FIN, FIN_ACK\n        # Return new state\n        pass\n\n# Test client connection\nclient = TCPStateMachine(is_server=False)\nprint(client.process_event("CONNECT"))  # -> SYN_SENT\nprint(client.process_event("SYN_ACK"))  # -> ESTABLISHED',
    solution: 'class TCPStateMachine:\n    def __init__(self, is_server=False):\n        self.state = "CLOSED"\n        self.is_server = is_server\n    \n    def process_event(self, event):\n        transitions = {\n            # Server states\n            ("CLOSED", "LISTEN"): "LISTEN",\n            ("LISTEN", "SYN"): "SYN_RECEIVED",\n            ("SYN_RECEIVED", "ACK"): "ESTABLISHED",\n            \n            # Client states\n            ("CLOSED", "CONNECT"): "SYN_SENT",\n            ("SYN_SENT", "SYN_ACK"): "ESTABLISHED",\n            \n            # Connection termination (both)\n            ("ESTABLISHED", "FIN"): "FIN_WAIT_1",\n            ("ESTABLISHED", "CLOSE"): "FIN_WAIT_1",\n            ("FIN_WAIT_1", "FIN_ACK"): "TIME_WAIT",\n            ("FIN_WAIT_1", "ACK"): "FIN_WAIT_2",\n            ("FIN_WAIT_2", "FIN"): "TIME_WAIT",\n            ("TIME_WAIT", "TIMEOUT"): "CLOSED",\n            \n            # Passive close\n            ("ESTABLISHED", "FIN_RECV"): "CLOSE_WAIT",\n            ("CLOSE_WAIT", "CLOSE"): "LAST_ACK",\n            ("LAST_ACK", "ACK"): "CLOSED"\n        }\n        \n        key = (self.state, event)\n        if key in transitions:\n            self.state = transitions[key]\n        return self.state\n\nclient = TCPStateMachine(is_server=False)\nprint(client.process_event("CONNECT"))\nprint(client.process_event("SYN_ACK"))',
    testCases: [
      { input: 'client connection', isHidden: false, description: 'Client handshake' },
      { input: 'connection teardown', isHidden: true, description: 'FIN sequence' }
    ],
    hints: [
      'Use (current_state, event) -> new_state mapping',
      'Client: CLOSED -> SYN_SENT -> ESTABLISHED',
      'Server: CLOSED -> LISTEN -> SYN_RECEIVED -> ESTABLISHED',
      'Teardown involves FIN_WAIT and TIME_WAIT states'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex13',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'UDP Datagram Builder',
    difficulty: 2,
    description: 'Build a UDP datagram header. Include source port, destination port, length, and checksum fields.',
    starterCode: '# Build UDP header\ndef build_udp_header(src_port, dst_port, data):\n    # Return dict with header fields and total length\n    pass\n\n# Test your function\nheader = build_udp_header(12345, 80, "Hello")\nprint(header)',
    solution: 'def build_udp_header(src_port, dst_port, data):\n    data_bytes = data.encode() if isinstance(data, str) else data\n    data_length = len(data_bytes)\n    # UDP header is 8 bytes + data\n    total_length = 8 + data_length\n    \n    return {\n        "source_port": src_port,\n        "destination_port": dst_port,\n        "length": total_length,\n        "checksum": 0,  # Placeholder (optional in UDP)\n        "data": data,\n        "header_size": 8,\n        "data_size": data_length\n    }\n\nheader = build_udp_header(12345, 80, "Hello")\nprint(header)',
    testCases: [
      { input: '12345, 80, "Hello"', isHidden: false, description: 'Simple UDP datagram' },
      { input: '53, 53, "query"', isHidden: true, description: 'DNS-like' }
    ],
    hints: [
      'UDP header is always 8 bytes',
      'Length = header (8) + data length',
      'Checksum is optional in UDP over IPv4',
      'Ports are 16-bit (0-65535)'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex14',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Flow Control Simulator',
    difficulty: 4,
    description: 'Simulate TCP flow control with receive window. Track buffer usage and advertise window size.',
    starterCode: '# TCP Flow Control\nclass FlowControl:\n    def __init__(self, buffer_size):\n        self.buffer_size = buffer_size\n        self.buffer_used = 0\n    \n    def receive_data(self, data_size):\n        # Receive data, return True if accepted\n        pass\n    \n    def consume_data(self, size):\n        # Application consumes data from buffer\n        pass\n    \n    def get_window(self):\n        # Return advertised receive window\n        pass\n\n# Test your class\nfc = FlowControl(1000)\nprint(fc.receive_data(400))  # Accept\nprint(fc.get_window())       # 600\nfc.consume_data(200)\nprint(fc.get_window())       # 800',
    solution: 'class FlowControl:\n    def __init__(self, buffer_size):\n        self.buffer_size = buffer_size\n        self.buffer_used = 0\n    \n    def receive_data(self, data_size):\n        if self.buffer_used + data_size <= self.buffer_size:\n            self.buffer_used += data_size\n            return True\n        return False\n    \n    def consume_data(self, size):\n        self.buffer_used = max(0, self.buffer_used - size)\n    \n    def get_window(self):\n        return self.buffer_size - self.buffer_used\n\nfc = FlowControl(1000)\nprint(fc.receive_data(400))\nprint(fc.get_window())\nfc.consume_data(200)\nprint(fc.get_window())',
    testCases: [
      { input: 'normal flow', isHidden: false, description: 'Accept and consume' },
      { input: 'buffer full', isHidden: true, description: 'Reject when full' }
    ],
    hints: [
      'Receive window = buffer_size - buffer_used',
      'Reject data if it exceeds available space',
      'Application consuming data frees buffer space',
      'Window size controls sender\'s rate'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex15',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Selective ACK Parser',
    difficulty: 4,
    description: 'Parse TCP Selective Acknowledgment (SACK) blocks. SACK indicates non-contiguous received data.',
    starterCode: '# Parse SACK blocks\ndef parse_sack(sack_blocks, cumulative_ack):\n    # sack_blocks: list of (start, end) tuples\n    # cumulative_ack: sequence number of cumulative ACK\n    # Return list of missing ranges\n    pass\n\n# Test your function\n# Cumulative ACK at 1000, SACK blocks at 1500-2000 and 2500-3000\nprint(parse_sack([(1500, 2000), (2500, 3000)], 1000))',
    solution: 'def parse_sack(sack_blocks, cumulative_ack):\n    # Sort SACK blocks by start\n    sorted_blocks = sorted(sack_blocks, key=lambda x: x[0])\n    \n    missing = []\n    current = cumulative_ack\n    \n    for start, end in sorted_blocks:\n        if start > current:\n            missing.append((current, start))\n        current = max(current, end)\n    \n    return missing\n\nprint(parse_sack([(1500, 2000), (2500, 3000)], 1000))',
    testCases: [
      { input: '[(1500, 2000), (2500, 3000)], 1000', isHidden: false, description: 'Two SACK blocks' },
      { input: 'consecutive blocks', isHidden: true, description: 'No gaps' }
    ],
    hints: [
      'SACK shows received but non-contiguous data',
      'Missing ranges are gaps between cumulative ACK and SACK blocks',
      'Sort blocks by start sequence',
      'Track the end of last received data'
    ],
    language: 'python'
  },
  {
    id: 'cs302-t4-ex16',
    subjectId: 'cs302',
    topicId: 'cs302-topic-4',
    title: 'Throughput Calculator',
    difficulty: 3,
    description: 'Calculate TCP throughput given window size and RTT. Throughput ≈ WindowSize / RTT for a single connection.',
    starterCode: '# Calculate TCP throughput\ndef tcp_throughput(window_size_bytes, rtt_ms):\n    # Return throughput in Mbps\n    pass\n\n# Test your function\nprint(tcp_throughput(65535, 100))   # 65KB window, 100ms RTT\nprint(tcp_throughput(1048576, 50))  # 1MB window, 50ms RTT',
    solution: 'def tcp_throughput(window_size_bytes, rtt_ms):\n    # Throughput = Window / RTT\n    # Convert window to bits\n    window_bits = window_size_bytes * 8\n    # Convert RTT to seconds\n    rtt_seconds = rtt_ms / 1000\n    # Throughput in bits per second\n    throughput_bps = window_bits / rtt_seconds\n    # Convert to Mbps\n    throughput_mbps = throughput_bps / 1_000_000\n    return round(throughput_mbps, 2)\n\nprint(tcp_throughput(65535, 100))\nprint(tcp_throughput(1048576, 50))',
    testCases: [
      { input: '65535, 100', isHidden: false, description: 'Standard window' },
      { input: '1048576, 50', isHidden: false, description: 'Large window' },
      { input: '65535, 1', isHidden: true, description: 'Low latency' }
    ],
    hints: [
      'Throughput = WindowSize / RTT',
      'Convert bytes to bits (* 8)',
      'Convert milliseconds to seconds (/ 1000)',
      'Result is bits per second, convert to Mbps'
    ],
    language: 'python'
  }
];
