import type { Topic } from '../../core/types';

import topic1_1 from './content/topic-1/01-security-overview.md?raw';
import topic1_2 from './content/topic-1/02-cia-triad.md?raw';
import topic1_3 from './content/topic-1/03-threat-modeling.md?raw';
import topic1_4 from './content/topic-1/04-defense-in-depth.md?raw';
import topic1_5 from './content/topic-1/05-least-privilege.md?raw';
import topic1_6 from './content/topic-1/06-security-policies.md?raw';
import topic1_7 from './content/topic-1/07-risk-assessment.md?raw';

import topic2_1 from './content/topic-2/01-cryptography-intro.md?raw';
import topic2_2 from './content/topic-2/02-symmetric-encryption.md?raw';
import topic2_3 from './content/topic-2/03-asymmetric-encryption.md?raw';
import topic2_4 from './content/topic-2/04-hash-functions.md?raw';
import topic2_5 from './content/topic-2/05-digital-signatures.md?raw';
import topic2_6 from './content/topic-2/06-key-management.md?raw';
import topic2_7 from './content/topic-2/07-cryptographic-protocols.md?raw';

import topic3_1 from './content/topic-3/01-authentication-basics.md?raw';
import topic3_2 from './content/topic-3/02-password-security.md?raw';
import topic3_3 from './content/topic-3/03-multi-factor-auth.md?raw';
import topic3_4 from './content/topic-3/04-oauth-openid.md?raw';
import topic3_5 from './content/topic-3/05-access-control-models.md?raw';
import topic3_6 from './content/topic-3/06-rbac-abac.md?raw';
import topic3_7 from './content/topic-3/07-session-management.md?raw';

import topic4_1 from './content/topic-4/01-vulnerability-overview.md?raw';
import topic4_2 from './content/topic-4/02-injection-attacks.md?raw';
import topic4_3 from './content/topic-4/03-xss-csrf.md?raw';
import topic4_4 from './content/topic-4/04-buffer-overflows.md?raw';
import topic4_5 from './content/topic-4/05-broken-access-control.md?raw';
import topic4_6 from './content/topic-4/06-security-misconfig.md?raw';
import topic4_7 from './content/topic-4/07-vulnerable-components.md?raw';

import topic5_1 from './content/topic-5/01-secure-coding-principles.md?raw';
import topic5_2 from './content/topic-5/02-input-validation.md?raw';
import topic5_3 from './content/topic-5/03-output-encoding.md?raw';
import topic5_4 from './content/topic-5/04-error-handling.md?raw';
import topic5_5 from './content/topic-5/05-memory-safety.md?raw';
import topic5_6 from './content/topic-5/06-secure-dependencies.md?raw';
import topic5_7 from './content/topic-5/07-code-review-analysis.md?raw';

import topic6_1 from './content/topic-6/01-network-security-basics.md?raw';
import topic6_2 from './content/topic-6/02-tls-ssl.md?raw';
import topic6_3 from './content/topic-6/03-firewalls-ids.md?raw';
import topic6_4 from './content/topic-6/04-vpn-tunneling.md?raw';
import topic6_5 from './content/topic-6/05-dns-security.md?raw';
import topic6_6 from './content/topic-6/06-wireless-security.md?raw';
import topic6_7 from './content/topic-6/07-network-monitoring.md?raw';

import topic7_1 from './content/topic-7/01-security-testing-intro.md?raw';
import topic7_2 from './content/topic-7/02-vulnerability-scanning.md?raw';
import topic7_3 from './content/topic-7/03-penetration-testing.md?raw';
import topic7_4 from './content/topic-7/04-static-analysis.md?raw';
import topic7_5 from './content/topic-7/05-dynamic-analysis.md?raw';
import topic7_6 from './content/topic-7/06-fuzzing.md?raw';
import topic7_7 from './content/topic-7/07-incident-response.md?raw';

export const cs307Topics: Topic[] = [
  {
    id: 'cs307-topic-1',
    title: 'Security Principles',
    content: 'Foundational concepts of information security including the CIA triad, threat modeling, defense in depth, and security policy frameworks.',
    subtopics: [
      { id: 'cs307-topic-1-1', slug: 'security-overview', order: 1, title: 'Security Overview', content: topic1_1 },
      { id: 'cs307-topic-1-2', slug: 'cia-triad', order: 2, title: 'The CIA Triad', content: topic1_2 },
      { id: 'cs307-topic-1-3', slug: 'threat-modeling', order: 3, title: 'Threat Modeling', content: topic1_3 },
      { id: 'cs307-topic-1-4', slug: 'defense-in-depth', order: 4, title: 'Defense in Depth', content: topic1_4 },
      { id: 'cs307-topic-1-5', slug: 'least-privilege', order: 5, title: 'Principle of Least Privilege', content: topic1_5 },
      { id: 'cs307-topic-1-6', slug: 'security-policies', order: 6, title: 'Security Policies', content: topic1_6 },
      { id: 'cs307-topic-1-7', slug: 'risk-assessment', order: 7, title: 'Risk Assessment', content: topic1_7 }
    ],
    quizIds: ['cs307-quiz-1-1', 'cs307-quiz-1-2', 'cs307-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs307-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs307-topic-2',
    title: 'Cryptography Fundamentals',
    content: 'Core cryptographic concepts including symmetric and asymmetric encryption, hash functions, digital signatures, and key management.',
    subtopics: [
      { id: 'cs307-topic-2-1', slug: 'cryptography-intro', order: 1, title: 'Introduction to Cryptography', content: topic2_1 },
      { id: 'cs307-topic-2-2', slug: 'symmetric-encryption', order: 2, title: 'Symmetric Encryption', content: topic2_2 },
      { id: 'cs307-topic-2-3', slug: 'asymmetric-encryption', order: 3, title: 'Asymmetric Encryption', content: topic2_3 },
      { id: 'cs307-topic-2-4', slug: 'hash-functions', order: 4, title: 'Hash Functions', content: topic2_4 },
      { id: 'cs307-topic-2-5', slug: 'digital-signatures', order: 5, title: 'Digital Signatures', content: topic2_5 },
      { id: 'cs307-topic-2-6', slug: 'key-management', order: 6, title: 'Key Management', content: topic2_6 },
      { id: 'cs307-topic-2-7', slug: 'cryptographic-protocols', order: 7, title: 'Cryptographic Protocols', content: topic2_7 }
    ],
    quizIds: ['cs307-quiz-2-1', 'cs307-quiz-2-2', 'cs307-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs307-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs307-topic-3',
    title: 'Authentication and Access Control',
    content: 'Authentication mechanisms including passwords, multi-factor authentication, OAuth/OpenID, and access control models like RBAC and ABAC.',
    subtopics: [
      { id: 'cs307-topic-3-1', slug: 'authentication-basics', order: 1, title: 'Authentication Fundamentals', content: topic3_1 },
      { id: 'cs307-topic-3-2', slug: 'password-security', order: 2, title: 'Password Security', content: topic3_2 },
      { id: 'cs307-topic-3-3', slug: 'multi-factor-auth', order: 3, title: 'Multi-Factor Authentication', content: topic3_3 },
      { id: 'cs307-topic-3-4', slug: 'oauth-openid', order: 4, title: 'OAuth and OpenID Connect', content: topic3_4 },
      { id: 'cs307-topic-3-5', slug: 'access-control-models', order: 5, title: 'Access Control Models', content: topic3_5 },
      { id: 'cs307-topic-3-6', slug: 'rbac-abac', order: 6, title: 'RBAC and ABAC', content: topic3_6 },
      { id: 'cs307-topic-3-7', slug: 'session-management', order: 7, title: 'Session Management', content: topic3_7 }
    ],
    quizIds: ['cs307-quiz-3-1', 'cs307-quiz-3-2', 'cs307-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs307-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs307-topic-4',
    title: 'Common Vulnerabilities',
    content: 'OWASP Top 10 vulnerabilities including injection attacks, XSS, CSRF, buffer overflows, and security misconfigurations.',
    subtopics: [
      { id: 'cs307-topic-4-1', slug: 'vulnerability-overview', order: 1, title: 'Vulnerability Overview', content: topic4_1 },
      { id: 'cs307-topic-4-2', slug: 'injection-attacks', order: 2, title: 'Injection Attacks', content: topic4_2 },
      { id: 'cs307-topic-4-3', slug: 'xss-csrf', order: 3, title: 'XSS and CSRF', content: topic4_3 },
      { id: 'cs307-topic-4-4', slug: 'buffer-overflows', order: 4, title: 'Buffer Overflows', content: topic4_4 },
      { id: 'cs307-topic-4-5', slug: 'broken-access-control', order: 5, title: 'Broken Access Control', content: topic4_5 },
      { id: 'cs307-topic-4-6', slug: 'security-misconfig', order: 6, title: 'Security Misconfiguration', content: topic4_6 },
      { id: 'cs307-topic-4-7', slug: 'vulnerable-components', order: 7, title: 'Vulnerable Components', content: topic4_7 }
    ],
    quizIds: ['cs307-quiz-4-1', 'cs307-quiz-4-2', 'cs307-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs307-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs307-topic-5',
    title: 'Secure Coding Practices',
    content: 'Best practices for writing secure code including input validation, output encoding, error handling, and memory safety.',
    subtopics: [
      { id: 'cs307-topic-5-1', slug: 'secure-coding-principles', order: 1, title: 'Secure Coding Principles', content: topic5_1 },
      { id: 'cs307-topic-5-2', slug: 'input-validation', order: 2, title: 'Input Validation', content: topic5_2 },
      { id: 'cs307-topic-5-3', slug: 'output-encoding', order: 3, title: 'Output Encoding', content: topic5_3 },
      { id: 'cs307-topic-5-4', slug: 'error-handling', order: 4, title: 'Secure Error Handling', content: topic5_4 },
      { id: 'cs307-topic-5-5', slug: 'memory-safety', order: 5, title: 'Memory Safety', content: topic5_5 },
      { id: 'cs307-topic-5-6', slug: 'secure-dependencies', order: 6, title: 'Secure Dependencies', content: topic5_6 },
      { id: 'cs307-topic-5-7', slug: 'code-review-analysis', order: 7, title: 'Code Review and Analysis', content: topic5_7 }
    ],
    quizIds: ['cs307-quiz-5-1', 'cs307-quiz-5-2', 'cs307-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs307-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs307-topic-6',
    title: 'Network Security',
    content: 'Network security protocols and technologies including TLS/SSL, firewalls, IDS/IPS, VPNs, and wireless security.',
    subtopics: [
      { id: 'cs307-topic-6-1', slug: 'network-security-basics', order: 1, title: 'Network Security Fundamentals', content: topic6_1 },
      { id: 'cs307-topic-6-2', slug: 'tls-ssl', order: 2, title: 'TLS and SSL', content: topic6_2 },
      { id: 'cs307-topic-6-3', slug: 'firewalls-ids', order: 3, title: 'Firewalls and IDS', content: topic6_3 },
      { id: 'cs307-topic-6-4', slug: 'vpn-tunneling', order: 4, title: 'VPN and Tunneling', content: topic6_4 },
      { id: 'cs307-topic-6-5', slug: 'dns-security', order: 5, title: 'DNS Security', content: topic6_5 },
      { id: 'cs307-topic-6-6', slug: 'wireless-security', order: 6, title: 'Wireless Security', content: topic6_6 },
      { id: 'cs307-topic-6-7', slug: 'network-monitoring', order: 7, title: 'Network Monitoring', content: topic6_7 }
    ],
    quizIds: ['cs307-quiz-6-1', 'cs307-quiz-6-2', 'cs307-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs307-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs307-topic-7',
    title: 'Security Testing',
    content: 'Security testing methodologies including vulnerability scanning, penetration testing, static/dynamic analysis, fuzzing, and incident response.',
    subtopics: [
      { id: 'cs307-topic-7-1', slug: 'security-testing-intro', order: 1, title: 'Security Testing Overview', content: topic7_1 },
      { id: 'cs307-topic-7-2', slug: 'vulnerability-scanning', order: 2, title: 'Vulnerability Scanning', content: topic7_2 },
      { id: 'cs307-topic-7-3', slug: 'penetration-testing', order: 3, title: 'Penetration Testing', content: topic7_3 },
      { id: 'cs307-topic-7-4', slug: 'static-analysis', order: 4, title: 'Static Analysis', content: topic7_4 },
      { id: 'cs307-topic-7-5', slug: 'dynamic-analysis', order: 5, title: 'Dynamic Analysis', content: topic7_5 },
      { id: 'cs307-topic-7-6', slug: 'fuzzing', order: 6, title: 'Fuzzing', content: topic7_6 },
      { id: 'cs307-topic-7-7', slug: 'incident-response', order: 7, title: 'Incident Response', content: topic7_7 }
    ],
    quizIds: ['cs307-quiz-7-1', 'cs307-quiz-7-2', 'cs307-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs307-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
