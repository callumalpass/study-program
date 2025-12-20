import { Topic, Subtopic } from '../../core/types';

// Topic 1 Subtopics - Network Architecture and OSI Model
import t1Introduction from './content/topic-1/01-introduction.md?raw';
import t1OsiModel from './content/topic-1/02-osi-model.md?raw';
import t1TcpIpModel from './content/topic-1/03-tcp-ip-model.md?raw';
import t1NetworkTypes from './content/topic-1/04-network-types.md?raw';
import t1NetworkDevices from './content/topic-1/05-network-devices.md?raw';
import t1Addressing from './content/topic-1/06-addressing-fundamentals.md?raw';
import t1Standards from './content/topic-1/07-standards-organizations.md?raw';

// Topic 2 Subtopics - Physical and Data Link Layers
import t2PhysicalLayer from './content/topic-2/01-physical-layer-overview.md?raw';
import t2Framing from './content/topic-2/02-data-link-framing.md?raw';
import t2MacProtocols from './content/topic-2/03-mac-protocols.md?raw';
import t2Ethernet from './content/topic-2/04-ethernet.md?raw';
import t2Wireless from './content/topic-2/05-wireless-lan.md?raw';
import t2Arp from './content/topic-2/06-arp-protocol.md?raw';
import t2Summary from './content/topic-2/07-link-layer-summary.md?raw';

// Topic 3 Subtopics - Network Layer and IP
import t3NetworkLayer from './content/topic-3/01-network-layer-intro.md?raw';
import t3Ipv4Addressing from './content/topic-3/02-ipv4-addressing.md?raw';
import t3Subnetting from './content/topic-3/03-subnetting.md?raw';
import t3Ipv4Header from './content/topic-3/04-ipv4-header.md?raw';
import t3Icmp from './content/topic-3/05-icmp.md?raw';
import t3Ipv6 from './content/topic-3/06-ipv6.md?raw';
import t3Nat from './content/topic-3/07-nat.md?raw';

// Topic 4 Subtopics - Routing Algorithms
import t4RoutingConcepts from './content/topic-4/01-routing-concepts.md?raw';
import t4DistanceVector from './content/topic-4/02-distance-vector.md?raw';
import t4LinkState from './content/topic-4/03-link-state.md?raw';
import t4Dijkstra from './content/topic-4/04-dijkstra.md?raw';
import t4Ospf from './content/topic-4/05-ospf.md?raw';
import t4Bgp from './content/topic-4/06-bgp.md?raw';
import t4RoutingPractice from './content/topic-4/07-routing-practice.md?raw';

// Topic 5 Subtopics - Transport Layer: TCP and UDP
import t5TransportServices from './content/topic-5/01-transport-services.md?raw';
import t5Udp from './content/topic-5/02-udp.md?raw';
import t5TcpBasics from './content/topic-5/03-tcp-basics.md?raw';
import t5TcpConnection from './content/topic-5/04-tcp-connection.md?raw';
import t5TcpReliability from './content/topic-5/05-tcp-reliability.md?raw';
import t5TcpFlowControl from './content/topic-5/06-tcp-flow-control.md?raw';
import t5TcpCongestion from './content/topic-5/07-tcp-congestion.md?raw';

// Topic 6 Subtopics - Socket Programming
import t6SocketConcepts from './content/topic-6/01-socket-concepts.md?raw';
import t6TcpSockets from './content/topic-6/02-tcp-sockets.md?raw';
import t6UdpSockets from './content/topic-6/03-udp-sockets.md?raw';
import t6NameResolution from './content/topic-6/04-name-resolution.md?raw';
import t6IoMultiplexing from './content/topic-6/05-io-multiplexing.md?raw';
import t6ConcurrentServers from './content/topic-6/06-concurrent-servers.md?raw';
import t6SocketSecurity from './content/topic-6/07-socket-security.md?raw';

// Topic 7 Subtopics - Application Layer and Security
import t7ApplicationLayer from './content/topic-7/01-application-layer.md?raw';
import t7Http from './content/topic-7/02-http.md?raw';
import t7Dns from './content/topic-7/03-dns.md?raw';
import t7Email from './content/topic-7/04-email.md?raw';
import t7FtpSsh from './content/topic-7/05-ftp-ssh.md?raw';
import t7Websockets from './content/topic-7/06-websockets.md?raw';
import t7SecurityProtocols from './content/topic-7/07-network-security-protocols.md?raw';

// Topic 1: Network Architecture and OSI Model
const topic1Subtopics: Subtopic[] = [
  { id: 'cs302-t1-intro', slug: 'introduction', title: 'Introduction to Computer Networks', content: t1Introduction, order: 1 },
  { id: 'cs302-t1-osi', slug: 'osi-model', title: 'The OSI Reference Model', content: t1OsiModel, order: 2 },
  { id: 'cs302-t1-tcpip', slug: 'tcp-ip-model', title: 'The TCP/IP Model', content: t1TcpIpModel, order: 3 },
  { id: 'cs302-t1-types', slug: 'network-types', title: 'Types of Networks', content: t1NetworkTypes, order: 4 },
  { id: 'cs302-t1-devices', slug: 'network-devices', title: 'Network Devices', content: t1NetworkDevices, order: 5 },
  { id: 'cs302-t1-addressing', slug: 'addressing-fundamentals', title: 'Network Addressing Fundamentals', content: t1Addressing, order: 6 },
  { id: 'cs302-t1-standards', slug: 'standards-organizations', title: 'Network Standards and Organizations', content: t1Standards, order: 7 },
];

// Topic 2: Physical and Data Link Layers
const topic2Subtopics: Subtopic[] = [
  { id: 'cs302-t2-physical', slug: 'physical-layer', title: 'Physical Layer Overview', content: t2PhysicalLayer, order: 1 },
  { id: 'cs302-t2-framing', slug: 'data-link-framing', title: 'Data Link Layer and Framing', content: t2Framing, order: 2 },
  { id: 'cs302-t2-mac', slug: 'mac-protocols', title: 'Media Access Control Protocols', content: t2MacProtocols, order: 3 },
  { id: 'cs302-t2-ethernet', slug: 'ethernet', title: 'Ethernet Technology', content: t2Ethernet, order: 4 },
  { id: 'cs302-t2-wireless', slug: 'wireless-lan', title: 'Wireless LAN (Wi-Fi)', content: t2Wireless, order: 5 },
  { id: 'cs302-t2-arp', slug: 'arp-protocol', title: 'Address Resolution Protocol (ARP)', content: t2Arp, order: 6 },
  { id: 'cs302-t2-summary', slug: 'link-layer-summary', title: 'Link Layer Summary', content: t2Summary, order: 7 },
];

// Topic 3: Network Layer and IP
const topic3Subtopics: Subtopic[] = [
  { id: 'cs302-t3-intro', slug: 'network-layer-intro', title: 'Network Layer Introduction', content: t3NetworkLayer, order: 1 },
  { id: 'cs302-t3-ipv4', slug: 'ipv4-addressing', title: 'IPv4 Addressing', content: t3Ipv4Addressing, order: 2 },
  { id: 'cs302-t3-subnet', slug: 'subnetting', title: 'Subnetting', content: t3Subnetting, order: 3 },
  { id: 'cs302-t3-header', slug: 'ipv4-header', title: 'IPv4 Header Format', content: t3Ipv4Header, order: 4 },
  { id: 'cs302-t3-icmp', slug: 'icmp', title: 'ICMP Protocol', content: t3Icmp, order: 5 },
  { id: 'cs302-t3-ipv6', slug: 'ipv6', title: 'IPv6 Protocol', content: t3Ipv6, order: 6 },
  { id: 'cs302-t3-nat', slug: 'nat', title: 'Network Address Translation', content: t3Nat, order: 7 },
];

// Topic 4: Routing Algorithms
const topic4Subtopics: Subtopic[] = [
  { id: 'cs302-t4-concepts', slug: 'routing-concepts', title: 'Routing Concepts', content: t4RoutingConcepts, order: 1 },
  { id: 'cs302-t4-dv', slug: 'distance-vector', title: 'Distance Vector Routing', content: t4DistanceVector, order: 2 },
  { id: 'cs302-t4-ls', slug: 'link-state', title: 'Link State Routing', content: t4LinkState, order: 3 },
  { id: 'cs302-t4-dijkstra', slug: 'dijkstra', title: "Dijkstra's Algorithm", content: t4Dijkstra, order: 4 },
  { id: 'cs302-t4-ospf', slug: 'ospf', title: 'OSPF Protocol', content: t4Ospf, order: 5 },
  { id: 'cs302-t4-bgp', slug: 'bgp', title: 'Border Gateway Protocol (BGP)', content: t4Bgp, order: 6 },
  { id: 'cs302-t4-practice', slug: 'routing-practice', title: 'Routing Best Practices', content: t4RoutingPractice, order: 7 },
];

// Topic 5: Transport Layer: TCP and UDP
const topic5Subtopics: Subtopic[] = [
  { id: 'cs302-t5-services', slug: 'transport-services', title: 'Transport Layer Services', content: t5TransportServices, order: 1 },
  { id: 'cs302-t5-udp', slug: 'udp', title: 'User Datagram Protocol (UDP)', content: t5Udp, order: 2 },
  { id: 'cs302-t5-tcp-basics', slug: 'tcp-basics', title: 'TCP Fundamentals', content: t5TcpBasics, order: 3 },
  { id: 'cs302-t5-tcp-conn', slug: 'tcp-connection', title: 'TCP Connection Management', content: t5TcpConnection, order: 4 },
  { id: 'cs302-t5-tcp-rel', slug: 'tcp-reliability', title: 'TCP Reliability Mechanisms', content: t5TcpReliability, order: 5 },
  { id: 'cs302-t5-tcp-flow', slug: 'tcp-flow-control', title: 'TCP Flow Control', content: t5TcpFlowControl, order: 6 },
  { id: 'cs302-t5-tcp-cong', slug: 'tcp-congestion', title: 'TCP Congestion Control', content: t5TcpCongestion, order: 7 },
];

// Topic 6: Socket Programming
const topic6Subtopics: Subtopic[] = [
  { id: 'cs302-t6-concepts', slug: 'socket-concepts', title: 'Socket Programming Concepts', content: t6SocketConcepts, order: 1 },
  { id: 'cs302-t6-tcp', slug: 'tcp-sockets', title: 'TCP Socket Programming', content: t6TcpSockets, order: 2 },
  { id: 'cs302-t6-udp', slug: 'udp-sockets', title: 'UDP Socket Programming', content: t6UdpSockets, order: 3 },
  { id: 'cs302-t6-dns', slug: 'name-resolution', title: 'Name Resolution', content: t6NameResolution, order: 4 },
  { id: 'cs302-t6-io', slug: 'io-multiplexing', title: 'I/O Multiplexing', content: t6IoMultiplexing, order: 5 },
  { id: 'cs302-t6-concurrent', slug: 'concurrent-servers', title: 'Concurrent Servers', content: t6ConcurrentServers, order: 6 },
  { id: 'cs302-t6-security', slug: 'socket-security', title: 'Socket Security', content: t6SocketSecurity, order: 7 },
];

// Topic 7: Application Layer and Security
const topic7Subtopics: Subtopic[] = [
  { id: 'cs302-t7-app', slug: 'application-layer', title: 'Application Layer Overview', content: t7ApplicationLayer, order: 1 },
  { id: 'cs302-t7-http', slug: 'http', title: 'HTTP Protocol', content: t7Http, order: 2 },
  { id: 'cs302-t7-dns', slug: 'dns', title: 'Domain Name System (DNS)', content: t7Dns, order: 3 },
  { id: 'cs302-t7-email', slug: 'email', title: 'Email Protocols', content: t7Email, order: 4 },
  { id: 'cs302-t7-ftp', slug: 'ftp-ssh', title: 'FTP and SSH', content: t7FtpSsh, order: 5 },
  { id: 'cs302-t7-websockets', slug: 'websockets', title: 'WebSockets', content: t7Websockets, order: 6 },
  { id: 'cs302-t7-security', slug: 'network-security-protocols', title: 'Network Security Protocols', content: t7SecurityProtocols, order: 7 },
];

export const cs302Topics: Topic[] = [
  {
    id: 'cs302-topic-1',
    title: 'Network Architecture and OSI Model',
    content: t1Introduction,
    subtopics: topic1Subtopics,
    quizIds: ['cs302-quiz-1a', 'cs302-quiz-1b', 'cs302-quiz-1c'],
    exerciseIds: [
      'cs302-t1-ex01', 'cs302-t1-ex02', 'cs302-t1-ex03', 'cs302-t1-ex04',
      'cs302-t1-ex05', 'cs302-t1-ex06', 'cs302-t1-ex07', 'cs302-t1-ex08',
      'cs302-t1-ex09', 'cs302-t1-ex10', 'cs302-t1-ex11', 'cs302-t1-ex12',
      'cs302-t1-ex13', 'cs302-t1-ex14', 'cs302-t1-ex15', 'cs302-t1-ex16'
    ],
  },
  {
    id: 'cs302-topic-2',
    title: 'Physical and Data Link Layers',
    content: t2PhysicalLayer,
    subtopics: topic2Subtopics,
    quizIds: ['cs302-quiz-2a', 'cs302-quiz-2b', 'cs302-quiz-2c'],
    exerciseIds: [
      'cs302-t2-ex01', 'cs302-t2-ex02', 'cs302-t2-ex03', 'cs302-t2-ex04',
      'cs302-t2-ex05', 'cs302-t2-ex06', 'cs302-t2-ex07', 'cs302-t2-ex08',
      'cs302-t2-ex09', 'cs302-t2-ex10', 'cs302-t2-ex11', 'cs302-t2-ex12',
      'cs302-t2-ex13', 'cs302-t2-ex14', 'cs302-t2-ex15', 'cs302-t2-ex16'
    ],
  },
  {
    id: 'cs302-topic-3',
    title: 'Network Layer and IP',
    content: t3NetworkLayer,
    subtopics: topic3Subtopics,
    quizIds: ['cs302-quiz-3a', 'cs302-quiz-3b', 'cs302-quiz-3c'],
    exerciseIds: [
      'cs302-t3-ex01', 'cs302-t3-ex02', 'cs302-t3-ex03', 'cs302-t3-ex04',
      'cs302-t3-ex05', 'cs302-t3-ex06', 'cs302-t3-ex07', 'cs302-t3-ex08',
      'cs302-t3-ex09', 'cs302-t3-ex10', 'cs302-t3-ex11', 'cs302-t3-ex12',
      'cs302-t3-ex13', 'cs302-t3-ex14', 'cs302-t3-ex15', 'cs302-t3-ex16'
    ],
  },
  {
    id: 'cs302-topic-4',
    title: 'Routing Algorithms',
    content: t4RoutingConcepts,
    subtopics: topic4Subtopics,
    quizIds: ['cs302-quiz-4a', 'cs302-quiz-4b', 'cs302-quiz-4c'],
    exerciseIds: [
      'cs302-t4-ex01', 'cs302-t4-ex02', 'cs302-t4-ex03', 'cs302-t4-ex04',
      'cs302-t4-ex05', 'cs302-t4-ex06', 'cs302-t4-ex07', 'cs302-t4-ex08',
      'cs302-t4-ex09', 'cs302-t4-ex10', 'cs302-t4-ex11', 'cs302-t4-ex12',
      'cs302-t4-ex13', 'cs302-t4-ex14', 'cs302-t4-ex15', 'cs302-t4-ex16'
    ],
  },
  {
    id: 'cs302-topic-5',
    title: 'Transport Layer: TCP and UDP',
    content: t5TransportServices,
    subtopics: topic5Subtopics,
    quizIds: ['cs302-quiz-5a', 'cs302-quiz-5b', 'cs302-quiz-5c'],
    exerciseIds: [
      'cs302-t5-ex01', 'cs302-t5-ex02', 'cs302-t5-ex03', 'cs302-t5-ex04',
      'cs302-t5-ex05', 'cs302-t5-ex06', 'cs302-t5-ex07', 'cs302-t5-ex08',
      'cs302-t5-ex09', 'cs302-t5-ex10', 'cs302-t5-ex11', 'cs302-t5-ex12',
      'cs302-t5-ex13', 'cs302-t5-ex14', 'cs302-t5-ex15', 'cs302-t5-ex16'
    ],
  },
  {
    id: 'cs302-topic-6',
    title: 'Socket Programming',
    content: t6SocketConcepts,
    subtopics: topic6Subtopics,
    quizIds: ['cs302-quiz-6a', 'cs302-quiz-6b', 'cs302-quiz-6c'],
    exerciseIds: [
      'cs302-t6-ex01', 'cs302-t6-ex02', 'cs302-t6-ex03', 'cs302-t6-ex04',
      'cs302-t6-ex05', 'cs302-t6-ex06', 'cs302-t6-ex07', 'cs302-t6-ex08',
      'cs302-t6-ex09', 'cs302-t6-ex10', 'cs302-t6-ex11', 'cs302-t6-ex12',
      'cs302-t6-ex13', 'cs302-t6-ex14', 'cs302-t6-ex15', 'cs302-t6-ex16'
    ],
  },
  {
    id: 'cs302-topic-7',
    title: 'Application Layer and Security',
    content: t7ApplicationLayer,
    subtopics: topic7Subtopics,
    quizIds: ['cs302-quiz-7a', 'cs302-quiz-7b', 'cs302-quiz-7c'],
    exerciseIds: [
      'cs302-t7-ex01', 'cs302-t7-ex02', 'cs302-t7-ex03', 'cs302-t7-ex04',
      'cs302-t7-ex05', 'cs302-t7-ex06', 'cs302-t7-ex07', 'cs302-t7-ex08',
      'cs302-t7-ex09', 'cs302-t7-ex10', 'cs302-t7-ex11', 'cs302-t7-ex12',
      'cs302-t7-ex13', 'cs302-t7-ex14', 'cs302-t7-ex15', 'cs302-t7-ex16'
    ],
  },
];
