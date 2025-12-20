/**
 * CS405 Topics
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
    title: 'Cloud Fundamentals',
  },
  {
    number: 1,
    title: 'Introduction to Cloud Computing',
  },
  {
    number: 1,
    title: 'Introduction to Virtualization',
  },
  {
    number: 1,
    title: 'Introduction to Containers',
  },
  {
    number: 1,
    title: 'Introduction to Kubernetes',
  },
  {
    number: 1,
    title: 'Introduction to Serverless',
  },
  {
    number: 1,
    title: 'Cloud Storage Types',
  },
  {
    number: 1,
    title: 'Introduction to Cloud-Native',
  },
  {
    number: 2,
    title: 'Cloud Service Models (IaaS, PaaS, SaaS)',
  },
  {
    number: 2,
    title: 'Virtualization',
  },
  {
    number: 2,
    title: 'Hypervisors and VMMs',
  },
  {
    number: 2,
    title: 'Docker Fundamentals',
  },
  {
    number: 2,
    title: 'Kubernetes Architecture',
  },
  {
    number: 2,
    title: 'Function as a Service (FaaS)',
  },
  {
    number: 2,
    title: 'Object Storage (S3, Blob)',
  },
  {
    number: 2,
    title: 'The Twelve-Factor App',
  },
  {
    number: 3,
    title: 'Cloud Deployment Models',
  },
  {
    number: 3,
    title: 'Virtual Machines',
  },
  {
    number: 3,
    title: 'Containers and Docker',
  },
  {
    number: 3,
    title: 'Docker Images and Dockerfiles',
  },
  {
    number: 3,
    title: 'Pods and Deployments',
  },
  {
    number: 3,
    title: 'AWS Lambda and Cloud Functions',
  },
  {
    number: 3,
    title: 'Block and File Storage',
  },
  {
    number: 3,
    title: 'Microservices in the Cloud',
  },
  {
    number: 4,
    title: 'Cloud Providers Overview',
  },
  {
    number: 4,
    title: 'Virtual Networks',
  },
  {
    number: 4,
    title: 'Docker Networking',
  },
  {
    number: 4,
    title: 'Kubernetes',
  },
  {
    number: 4,
    title: 'Services and Networking',
  },
  {
    number: 4,
    title: 'Event-Driven Serverless',
  },
  {
    number: 4,
    title: 'Cloud Databases (RDS, CloudSQL)',
  },
  {
    number: 4,
    title: 'API Design and Management',
  },
  {
    number: 5,
    title: 'Cloud Economics and Pricing',
  },
  {
    number: 5,
    title: 'Storage Virtualization',
  },
  {
    number: 5,
    title: 'Docker Volumes and Storage',
  },
  {
    number: 5,
    title: 'ConfigMaps and Secrets',
  },
  {
    number: 5,
    title: 'Serverless Computing',
  },
  {
    number: 5,
    title: 'Serverless Design Patterns',
  },
  {
    number: 5,
    title: 'NoSQL Databases in the Cloud',
  },
  {
    number: 5,
    title: 'Observability and Monitoring',
  },
  {
    number: 6,
    title: 'Cloud Security Fundamentals',
  },
  {
    number: 6,
    title: 'Resource Management',
  },
  {
    number: 6,
    title: 'Docker Compose',
  },
  {
    number: 6,
    title: 'Scaling and Autoscaling',
  },
  {
    number: 6,
    title: 'Serverless Scaling',
  },
  {
    number: 6,
    title: 'Cloud Storage and Databases',
  },
  {
    number: 6,
    title: 'Data Warehousing and Analytics',
  },
  {
    number: 6,
    title: 'CI/CD in the Cloud',
  },
  {
    number: 7,
    title: 'Cloud Migration Strategies',
    quizIds: ['cs405-quiz-1-1', 'cs405-quiz-1-2', 'cs405-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Performance Optimization',
    quizIds: ['cs405-quiz-2-1', 'cs405-quiz-2-2', 'cs405-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Container Security',
    quizIds: ['cs405-quiz-3-1', 'cs405-quiz-3-2', 'cs405-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Helm and Package Management',
    quizIds: ['cs405-quiz-4-1', 'cs405-quiz-4-2', 'cs405-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Serverless Monitoring and Debugging',
    quizIds: ['cs405-quiz-5-1', 'cs405-quiz-5-2', 'cs405-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Database Migration to Cloud',
    quizIds: ['cs405-quiz-6-1', 'cs405-quiz-6-2', 'cs405-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Cloud-Native Architecture',
  },
  {
    number: 7,
    title: 'Cloud Resilience and Disaster Recovery',
    quizIds: ['cs405-quiz-7-1', 'cs405-quiz-7-2', 'cs405-quiz-7-3'],
  },
];

export const cs405Topics: Topic[] = buildTopicsFromGlob('cs405', content, topicConfigs);
