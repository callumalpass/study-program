/**
 * CS307 Topics
 *
 * Uses glob imports and frontmatter for automatic content discovery.
 */

import type { Topic } from '../../core/types';
import { buildTopicsFromGlob } from '../loader';

// Glob import all markdown content
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'Security Principles',
  },
  {
    number: 1,
    title: 'Security Overview',
  },
  {
    number: 1,
    title: 'Introduction to Cryptography',
  },
  {
    number: 1,
    title: 'Authentication Fundamentals',
  },
  {
    number: 1,
    title: 'Vulnerability Overview',
  },
  {
    number: 1,
    title: 'Secure Coding Principles',
  },
  {
    number: 1,
    title: 'Network Security Fundamentals',
  },
  {
    number: 1,
    title: 'Security Testing Overview',
  },
  {
    number: 2,
    title: 'The CIA Triad',
  },
  {
    number: 2,
    title: 'Cryptography Fundamentals',
  },
  {
    number: 2,
    title: 'Symmetric Encryption',
  },
  {
    number: 2,
    title: 'Password Security',
  },
  {
    number: 2,
    title: 'Injection Attacks',
  },
  {
    number: 2,
    title: 'Input Validation',
  },
  {
    number: 2,
    title: 'TLS and SSL',
  },
  {
    number: 2,
    title: 'Vulnerability Scanning',
  },
  {
    number: 3,
    title: 'Threat Modeling',
  },
  {
    number: 3,
    title: 'Asymmetric Encryption',
  },
  {
    number: 3,
    title: 'Authentication and Access Control',
  },
  {
    number: 3,
    title: 'Multi-Factor Authentication',
  },
  {
    number: 3,
    title: 'XSS and CSRF',
  },
  {
    number: 3,
    title: 'Output Encoding',
  },
  {
    number: 3,
    title: 'Firewalls and IDS',
  },
  {
    number: 3,
    title: 'Penetration Testing',
  },
  {
    number: 4,
    title: 'Defense in Depth',
  },
  {
    number: 4,
    title: 'Hash Functions',
  },
  {
    number: 4,
    title: 'OAuth and OpenID Connect',
  },
  {
    number: 4,
    title: 'Common Vulnerabilities',
  },
  {
    number: 4,
    title: 'Buffer Overflows',
  },
  {
    number: 4,
    title: 'Secure Error Handling',
  },
  {
    number: 4,
    title: 'VPN and Tunneling',
  },
  {
    number: 4,
    title: 'Static Analysis',
  },
  {
    number: 5,
    title: 'Principle of Least Privilege',
  },
  {
    number: 5,
    title: 'Digital Signatures',
  },
  {
    number: 5,
    title: 'Access Control Models',
  },
  {
    number: 5,
    title: 'Broken Access Control',
  },
  {
    number: 5,
    title: 'Secure Coding Practices',
  },
  {
    number: 5,
    title: 'Memory Safety',
  },
  {
    number: 5,
    title: 'DNS Security',
  },
  {
    number: 5,
    title: 'Dynamic Analysis',
  },
  {
    number: 6,
    title: 'Security Policies',
  },
  {
    number: 6,
    title: 'Key Management',
  },
  {
    number: 6,
    title: 'RBAC and ABAC',
  },
  {
    number: 6,
    title: 'Security Misconfiguration',
  },
  {
    number: 6,
    title: 'Secure Dependencies',
  },
  {
    number: 6,
    title: 'Network Security',
  },
  {
    number: 6,
    title: 'Wireless Security',
  },
  {
    number: 6,
    title: 'Fuzzing',
  },
  {
    number: 7,
    title: 'Risk Assessment',
    quizIds: ['cs307-quiz-1-1', 'cs307-quiz-1-2', 'cs307-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Cryptographic Protocols',
    quizIds: ['cs307-quiz-2-1', 'cs307-quiz-2-2', 'cs307-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Session Management',
    quizIds: ['cs307-quiz-3-1', 'cs307-quiz-3-2', 'cs307-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Vulnerable Components',
    quizIds: ['cs307-quiz-4-1', 'cs307-quiz-4-2', 'cs307-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Code Review and Analysis',
    quizIds: ['cs307-quiz-5-1', 'cs307-quiz-5-2', 'cs307-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Network Monitoring',
    quizIds: ['cs307-quiz-6-1', 'cs307-quiz-6-2', 'cs307-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Security Testing',
  },
  {
    number: 7,
    title: 'Incident Response',
    quizIds: ['cs307-quiz-7-1', 'cs307-quiz-7-2', 'cs307-quiz-7-3'],
  },
];

export const cs307Topics: Topic[] = buildTopicsFromGlob('cs307', content, topicConfigs);
