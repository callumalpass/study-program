import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/cs405/topic-1/01-cloud-intro.md?raw';
import topic1_2 from '../../../content/subjects/cs405/topic-1/02-cloud-service-models.md?raw';
import topic1_3 from '../../../content/subjects/cs405/topic-1/03-cloud-deployment-models.md?raw';
import topic1_4 from '../../../content/subjects/cs405/topic-1/04-cloud-providers.md?raw';
import topic1_5 from '../../../content/subjects/cs405/topic-1/05-cloud-economics.md?raw';
import topic1_6 from '../../../content/subjects/cs405/topic-1/06-cloud-security.md?raw';
import topic1_7 from '../../../content/subjects/cs405/topic-1/07-cloud-migration.md?raw';

import topic2_1 from '../../../content/subjects/cs405/topic-2/01-virtualization-intro.md?raw';
import topic2_2 from '../../../content/subjects/cs405/topic-2/02-hypervisors.md?raw';
import topic2_3 from '../../../content/subjects/cs405/topic-2/03-virtual-machines.md?raw';
import topic2_4 from '../../../content/subjects/cs405/topic-2/04-virtual-networks.md?raw';
import topic2_5 from '../../../content/subjects/cs405/topic-2/05-storage-virtualization.md?raw';
import topic2_6 from '../../../content/subjects/cs405/topic-2/06-resource-management.md?raw';
import topic2_7 from '../../../content/subjects/cs405/topic-2/07-performance-optimization.md?raw';

import topic3_1 from '../../../content/subjects/cs405/topic-3/01-containers-intro.md?raw';
import topic3_2 from '../../../content/subjects/cs405/topic-3/02-docker-fundamentals.md?raw';
import topic3_3 from '../../../content/subjects/cs405/topic-3/03-docker-images.md?raw';
import topic3_4 from '../../../content/subjects/cs405/topic-3/04-docker-networking.md?raw';
import topic3_5 from '../../../content/subjects/cs405/topic-3/05-docker-volumes.md?raw';
import topic3_6 from '../../../content/subjects/cs405/topic-3/06-docker-compose.md?raw';
import topic3_7 from '../../../content/subjects/cs405/topic-3/07-container-security.md?raw';

import topic4_1 from '../../../content/subjects/cs405/topic-4/01-kubernetes-intro.md?raw';
import topic4_2 from '../../../content/subjects/cs405/topic-4/02-kubernetes-architecture.md?raw';
import topic4_3 from '../../../content/subjects/cs405/topic-4/03-pods-deployments.md?raw';
import topic4_4 from '../../../content/subjects/cs405/topic-4/04-services-networking.md?raw';
import topic4_5 from '../../../content/subjects/cs405/topic-4/05-configmaps-secrets.md?raw';
import topic4_6 from '../../../content/subjects/cs405/topic-4/06-scaling-autoscaling.md?raw';
import topic4_7 from '../../../content/subjects/cs405/topic-4/07-helm-package-management.md?raw';

import topic5_1 from '../../../content/subjects/cs405/topic-5/01-serverless-intro.md?raw';
import topic5_2 from '../../../content/subjects/cs405/topic-5/02-faas-functions.md?raw';
import topic5_3 from '../../../content/subjects/cs405/topic-5/03-aws-lambda.md?raw';
import topic5_4 from '../../../content/subjects/cs405/topic-5/04-event-driven-serverless.md?raw';
import topic5_5 from '../../../content/subjects/cs405/topic-5/05-serverless-patterns.md?raw';
import topic5_6 from '../../../content/subjects/cs405/topic-5/06-serverless-scaling.md?raw';
import topic5_7 from '../../../content/subjects/cs405/topic-5/07-serverless-monitoring.md?raw';

import topic6_1 from '../../../content/subjects/cs405/topic-6/01-cloud-storage-types.md?raw';
import topic6_2 from '../../../content/subjects/cs405/topic-6/02-object-storage.md?raw';
import topic6_3 from '../../../content/subjects/cs405/topic-6/03-block-file-storage.md?raw';
import topic6_4 from '../../../content/subjects/cs405/topic-6/04-cloud-databases.md?raw';
import topic6_5 from '../../../content/subjects/cs405/topic-6/05-nosql-databases.md?raw';
import topic6_6 from '../../../content/subjects/cs405/topic-6/06-data-warehousing.md?raw';
import topic6_7 from '../../../content/subjects/cs405/topic-6/07-database-migration.md?raw';

import topic7_1 from '../../../content/subjects/cs405/topic-7/01-cloud-native-intro.md?raw';
import topic7_2 from '../../../content/subjects/cs405/topic-7/02-twelve-factor-app.md?raw';
import topic7_3 from '../../../content/subjects/cs405/topic-7/03-microservices-cloud.md?raw';
import topic7_4 from '../../../content/subjects/cs405/topic-7/04-api-design.md?raw';
import topic7_5 from '../../../content/subjects/cs405/topic-7/05-observability.md?raw';
import topic7_6 from '../../../content/subjects/cs405/topic-7/06-cicd-cloud.md?raw';
import topic7_7 from '../../../content/subjects/cs405/topic-7/07-cloud-resilience.md?raw';

export const cs405Topics: Topic[] = [
  {
    id: 'cs405-topic-1',
    title: 'Cloud Fundamentals',
    content: 'Introduction to cloud computing, service models, deployment models, and cloud providers.',
    subtopics: [
      { id: 'cs405-topic-1-1', slug: 'cloud-intro', order: 1, title: 'Introduction to Cloud Computing', content: topic1_1 },
      { id: 'cs405-topic-1-2', slug: 'cloud-service-models', order: 2, title: 'Cloud Service Models (IaaS, PaaS, SaaS)', content: topic1_2 },
      { id: 'cs405-topic-1-3', slug: 'cloud-deployment-models', order: 3, title: 'Cloud Deployment Models', content: topic1_3 },
      { id: 'cs405-topic-1-4', slug: 'cloud-providers', order: 4, title: 'Cloud Providers Overview', content: topic1_4 },
      { id: 'cs405-topic-1-5', slug: 'cloud-economics', order: 5, title: 'Cloud Economics and Pricing', content: topic1_5 },
      { id: 'cs405-topic-1-6', slug: 'cloud-security', order: 6, title: 'Cloud Security Fundamentals', content: topic1_6 },
      { id: 'cs405-topic-1-7', slug: 'cloud-migration', order: 7, title: 'Cloud Migration Strategies', content: topic1_7 }
    ],
    quizIds: ['cs405-quiz-1-1', 'cs405-quiz-1-2', 'cs405-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs405-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs405-topic-2',
    title: 'Virtualization',
    content: 'Virtualization technologies, hypervisors, virtual machines, and resource management.',
    subtopics: [
      { id: 'cs405-topic-2-1', slug: 'virtualization-intro', order: 1, title: 'Introduction to Virtualization', content: topic2_1 },
      { id: 'cs405-topic-2-2', slug: 'hypervisors', order: 2, title: 'Hypervisors and VMMs', content: topic2_2 },
      { id: 'cs405-topic-2-3', slug: 'virtual-machines', order: 3, title: 'Virtual Machines', content: topic2_3 },
      { id: 'cs405-topic-2-4', slug: 'virtual-networks', order: 4, title: 'Virtual Networks', content: topic2_4 },
      { id: 'cs405-topic-2-5', slug: 'storage-virtualization', order: 5, title: 'Storage Virtualization', content: topic2_5 },
      { id: 'cs405-topic-2-6', slug: 'resource-management', order: 6, title: 'Resource Management', content: topic2_6 },
      { id: 'cs405-topic-2-7', slug: 'performance-optimization', order: 7, title: 'Performance Optimization', content: topic2_7 }
    ],
    quizIds: ['cs405-quiz-2-1', 'cs405-quiz-2-2', 'cs405-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs405-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs405-topic-3',
    title: 'Containers and Docker',
    content: 'Container technology, Docker fundamentals, images, networking, and security.',
    subtopics: [
      { id: 'cs405-topic-3-1', slug: 'containers-intro', order: 1, title: 'Introduction to Containers', content: topic3_1 },
      { id: 'cs405-topic-3-2', slug: 'docker-fundamentals', order: 2, title: 'Docker Fundamentals', content: topic3_2 },
      { id: 'cs405-topic-3-3', slug: 'docker-images', order: 3, title: 'Docker Images and Dockerfiles', content: topic3_3 },
      { id: 'cs405-topic-3-4', slug: 'docker-networking', order: 4, title: 'Docker Networking', content: topic3_4 },
      { id: 'cs405-topic-3-5', slug: 'docker-volumes', order: 5, title: 'Docker Volumes and Storage', content: topic3_5 },
      { id: 'cs405-topic-3-6', slug: 'docker-compose', order: 6, title: 'Docker Compose', content: topic3_6 },
      { id: 'cs405-topic-3-7', slug: 'container-security', order: 7, title: 'Container Security', content: topic3_7 }
    ],
    quizIds: ['cs405-quiz-3-1', 'cs405-quiz-3-2', 'cs405-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs405-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs405-topic-4',
    title: 'Kubernetes',
    content: 'Kubernetes architecture, pods, deployments, services, and orchestration.',
    subtopics: [
      { id: 'cs405-topic-4-1', slug: 'kubernetes-intro', order: 1, title: 'Introduction to Kubernetes', content: topic4_1 },
      { id: 'cs405-topic-4-2', slug: 'kubernetes-architecture', order: 2, title: 'Kubernetes Architecture', content: topic4_2 },
      { id: 'cs405-topic-4-3', slug: 'pods-deployments', order: 3, title: 'Pods and Deployments', content: topic4_3 },
      { id: 'cs405-topic-4-4', slug: 'services-networking', order: 4, title: 'Services and Networking', content: topic4_4 },
      { id: 'cs405-topic-4-5', slug: 'configmaps-secrets', order: 5, title: 'ConfigMaps and Secrets', content: topic4_5 },
      { id: 'cs405-topic-4-6', slug: 'scaling-autoscaling', order: 6, title: 'Scaling and Autoscaling', content: topic4_6 },
      { id: 'cs405-topic-4-7', slug: 'helm-package-management', order: 7, title: 'Helm and Package Management', content: topic4_7 }
    ],
    quizIds: ['cs405-quiz-4-1', 'cs405-quiz-4-2', 'cs405-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs405-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs405-topic-5',
    title: 'Serverless Computing',
    content: 'Serverless architecture, FaaS, AWS Lambda, event-driven patterns, and monitoring.',
    subtopics: [
      { id: 'cs405-topic-5-1', slug: 'serverless-intro', order: 1, title: 'Introduction to Serverless', content: topic5_1 },
      { id: 'cs405-topic-5-2', slug: 'faas-functions', order: 2, title: 'Function as a Service (FaaS)', content: topic5_2 },
      { id: 'cs405-topic-5-3', slug: 'aws-lambda', order: 3, title: 'AWS Lambda and Cloud Functions', content: topic5_3 },
      { id: 'cs405-topic-5-4', slug: 'event-driven-serverless', order: 4, title: 'Event-Driven Serverless', content: topic5_4 },
      { id: 'cs405-topic-5-5', slug: 'serverless-patterns', order: 5, title: 'Serverless Design Patterns', content: topic5_5 },
      { id: 'cs405-topic-5-6', slug: 'serverless-scaling', order: 6, title: 'Serverless Scaling', content: topic5_6 },
      { id: 'cs405-topic-5-7', slug: 'serverless-monitoring', order: 7, title: 'Serverless Monitoring and Debugging', content: topic5_7 }
    ],
    quizIds: ['cs405-quiz-5-1', 'cs405-quiz-5-2', 'cs405-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs405-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs405-topic-6',
    title: 'Cloud Storage and Databases',
    content: 'Cloud storage types, object storage, databases, NoSQL, and data warehousing.',
    subtopics: [
      { id: 'cs405-topic-6-1', slug: 'cloud-storage-types', order: 1, title: 'Cloud Storage Types', content: topic6_1 },
      { id: 'cs405-topic-6-2', slug: 'object-storage', order: 2, title: 'Object Storage (S3, Blob)', content: topic6_2 },
      { id: 'cs405-topic-6-3', slug: 'block-file-storage', order: 3, title: 'Block and File Storage', content: topic6_3 },
      { id: 'cs405-topic-6-4', slug: 'cloud-databases', order: 4, title: 'Cloud Databases (RDS, CloudSQL)', content: topic6_4 },
      { id: 'cs405-topic-6-5', slug: 'nosql-databases', order: 5, title: 'NoSQL Databases in the Cloud', content: topic6_5 },
      { id: 'cs405-topic-6-6', slug: 'data-warehousing', order: 6, title: 'Data Warehousing and Analytics', content: topic6_6 },
      { id: 'cs405-topic-6-7', slug: 'database-migration', order: 7, title: 'Database Migration to Cloud', content: topic6_7 }
    ],
    quizIds: ['cs405-quiz-6-1', 'cs405-quiz-6-2', 'cs405-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs405-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs405-topic-7',
    title: 'Cloud-Native Architecture',
    content: 'Cloud-native principles, twelve-factor apps, microservices, observability, and CI/CD.',
    subtopics: [
      { id: 'cs405-topic-7-1', slug: 'cloud-native-intro', order: 1, title: 'Introduction to Cloud-Native', content: topic7_1 },
      { id: 'cs405-topic-7-2', slug: 'twelve-factor-app', order: 2, title: 'The Twelve-Factor App', content: topic7_2 },
      { id: 'cs405-topic-7-3', slug: 'microservices-cloud', order: 3, title: 'Microservices in the Cloud', content: topic7_3 },
      { id: 'cs405-topic-7-4', slug: 'api-design', order: 4, title: 'API Design and Management', content: topic7_4 },
      { id: 'cs405-topic-7-5', slug: 'observability', order: 5, title: 'Observability and Monitoring', content: topic7_5 },
      { id: 'cs405-topic-7-6', slug: 'cicd-cloud', order: 6, title: 'CI/CD in the Cloud', content: topic7_6 },
      { id: 'cs405-topic-7-7', slug: 'cloud-resilience', order: 7, title: 'Cloud Resilience and Disaster Recovery', content: topic7_7 }
    ],
    quizIds: ['cs405-quiz-7-1', 'cs405-quiz-7-2', 'cs405-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs405-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
