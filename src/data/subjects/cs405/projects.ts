import { Project } from '../../../core/types';

export const cs405Projects: Project[] = [
  {
    id: 'cs405-project-1',
    subjectId: 'cs405',
    title: 'Multi-Tier Web Application on Cloud IaaS',
    description: 'Deploy a three-tier web application (web, application, database) on cloud IaaS (AWS EC2, Azure VMs, or Google Compute Engine). Implement proper networking, security groups, load balancing, and auto-scaling. This project demonstrates understanding of cloud fundamentals, virtual machines, networking, and security.',
    requirements: [
      'Deploy web tier (2+ instances) with load balancer for high availability',
      'Deploy application tier (2+ instances) in private subnet',
      'Deploy database in separate subnet with appropriate security',
      'Implement VPC/virtual network with public and private subnets',
      'Configure security groups/NSGs to allow only necessary traffic',
      'Set up auto-scaling for web and application tiers based on CPU usage',
      'Use cloud-native monitoring (CloudWatch, Azure Monitor, Cloud Monitoring)',
      'Implement backup strategy for database',
      'Document architecture with network diagram',
      'Estimate monthly costs using cloud provider pricing calculator'
    ],
    rubric: [
      {
        name: 'Architecture and Design',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-designed multi-tier architecture with proper separation of concerns, security zones, and comprehensive network diagram'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional three-tier architecture with adequate separation and documentation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic three-tier deployment but lacks security best practices or proper segmentation'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Incomplete architecture or significant security/design flaws'
          }
        ]
      },
      {
        name: 'Security Implementation',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive security with least-privilege security groups, encrypted data, private subnets for backend, bastion host for access'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good security practices with appropriate security groups and subnet isolation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic security groups but overly permissive or lacking encryption'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Significant security vulnerabilities or exposed resources'
          }
        ]
      },
      {
        name: 'High Availability and Scaling',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Load balancer with health checks, auto-scaling properly configured and tested, multi-AZ deployment'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Load balancer and auto-scaling configured correctly'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic load balancing but auto-scaling not optimal or not tested'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Missing load balancing or auto-scaling, single points of failure'
          }
        ]
      },
      {
        name: 'Monitoring and Backup',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive monitoring with dashboards and alerts, automated database backups with tested restore'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Basic monitoring enabled and backup configured'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Minimal monitoring or backup present but not comprehensive'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Missing monitoring or backup strategy'
          }
        ]
      },
      {
        name: 'Documentation and Cost Analysis',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clear architecture diagram, detailed deployment guide, comprehensive cost analysis with optimization suggestions'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good documentation with diagram and basic cost estimation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic documentation but missing details or cost analysis incomplete'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor documentation or missing cost analysis'
          }
        ]
      }
    ],
    estimatedHours: 20,
    scaffolding: {
      overview: 'Build infrastructure incrementally: networking → database → app tier → web tier → scaling',
      gettingStarted: [
        'Choose cloud provider (AWS, Azure, or GCP) and create account',
        'Design VPC/network architecture on paper before implementation',
        'Start with smallest instance sizes and scale up based on testing'
      ],
      milestones: [
        'VPC/network created with public and private subnets across multiple AZs',
        'Database deployed and accessible from private subnet only',
        'Application tier deployed and can connect to database',
        'Web tier deployed behind load balancer',
        'Auto-scaling configured and tested (use stress testing tools)',
        'Monitoring dashboards created and alerts configured',
        'Documentation complete with architecture diagram and cost analysis'
      ],
      starterResources: [
        { label: 'AWS Well-Architected Framework', description: 'Best practices for cloud architectures', link: 'https://aws.amazon.com/architecture/well-architected/' },
        { label: 'Azure Architecture Center', description: 'Reference architectures and guidance', link: 'https://docs.microsoft.com/en-us/azure/architecture/' },
        { label: 'Terraform AWS Examples', description: 'Infrastructure as code examples', link: 'https://github.com/hashicorp/terraform-provider-aws/tree/main/examples' }
      ],
      tips: [
        'Use infrastructure as code (Terraform, CloudFormation) for reproducibility',
        'Tag all resources for cost tracking (Environment, Project, Owner)',
        'Test auto-scaling by generating load (Apache Bench, hey, or custom scripts)',
        'Set up budget alerts to avoid unexpected costs',
        'Destroy resources when not testing to save money'
      ]
    }
  },
  {
    id: 'cs405-project-2',
    subjectId: 'cs405',
    title: 'Containerized Microservices with Docker',
    description: 'Build a microservices application using Docker and Docker Compose. Implement at least three services (e.g., frontend, backend API, database) with proper networking, data persistence, and security. This project demonstrates containerization skills, Docker best practices, and microservices architecture understanding.',
    requirements: [
      'Create at least three microservices (e.g., web frontend, REST API, database)',
      'Write optimized Dockerfiles with multi-stage builds where appropriate',
      'Use Docker Compose to orchestrate all services',
      'Implement proper networking between services (separate networks for frontend/backend)',
      'Use Docker volumes for data persistence',
      'Implement health checks for services',
      'Scan images for vulnerabilities and fix issues',
      'Run services as non-root users',
      'Include environment-based configuration (development vs production)',
      'Document API endpoints and deployment process'
    ],
    rubric: [
      {
        name: 'Dockerfile Quality',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Optimized Dockerfiles with multi-stage builds, minimal layers, small image sizes, proper .dockerignore'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Well-structured Dockerfiles with reasonable image sizes'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Functional Dockerfiles but not optimized or larger than necessary'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor Dockerfile practices or excessively large images'
          }
        ]
      },
      {
        name: 'Architecture and Service Design',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-designed microservices with clear separation of concerns, proper API design, documented interfaces'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional microservices architecture with reasonable separation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic service separation but could be better decomposed'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor service boundaries or essentially monolithic'
          }
        ]
      },
      {
        name: 'Docker Compose Configuration',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-organized compose file with networks, volumes, health checks, environment configs, and secrets management'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional compose configuration with proper service definitions'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic compose file but missing health checks or proper networking'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Minimal compose configuration or significant issues'
          }
        ]
      },
      {
        name: 'Security Implementation',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Non-root users, vulnerability scanning performed and issues fixed, secrets properly managed, minimal base images'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Non-root users and basic security practices'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Some security practices but running as root or secrets in code'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Significant security vulnerabilities'
          }
        ]
      },
      {
        name: 'Documentation and Testing',
        weight: 10,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive README with architecture diagram, API documentation, deployment instructions, tested functionality'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good documentation with clear deployment steps'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic documentation but missing details'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Minimal or unclear documentation'
          }
        ]
      }
    ],
    estimatedHours: 18,
    scaffolding: {
      overview: 'Build services individually with Dockerfiles, then compose together incrementally',
      gettingStarted: [
        'Design microservices architecture (what services, how they communicate)',
        'Start with simple Dockerfiles, optimize later',
        'Use docker build and docker run to test services individually before composing'
      ],
      milestones: [
        'Each service has a working Dockerfile and runs individually',
        'Docker Compose brings all services up successfully',
        'Services can communicate (frontend → backend → database)',
        'Data persists across container restarts using volumes',
        'Multi-stage builds implemented for compiled languages',
        'Images scanned and vulnerabilities addressed',
        'Services run as non-root users',
        'Complete documentation with architecture diagram'
      ],
      starterResources: [
        { label: 'Docker Best Practices', description: 'Official Dockerfile best practices', link: 'https://docs.docker.com/develop/dev-best-practices/' },
        { label: 'Docker Compose Docs', description: 'Complete Docker Compose reference', link: 'https://docs.docker.com/compose/' },
        { label: 'Example Microservices', description: 'Sample Docker microservices apps', link: 'https://github.com/dockersamples/' }
      ],
      tips: [
        'Keep Dockerfiles in project root or service subdirectories',
        'Use .dockerignore to exclude node_modules, .git, etc.',
        'Order Dockerfile instructions from least to most frequently changing',
        'Use specific base image tags (node:18-alpine) not latest',
        'Leverage build cache by copying dependency files before source code'
      ]
    }
  },
  {
    id: 'cs405-project-3',
    subjectId: 'cs405',
    title: 'Kubernetes Cluster Deployment and Management',
    description: 'Deploy a multi-service application to a Kubernetes cluster (EKS, AKS, GKE, or local Minikube/Kind). Implement deployments, services, config management, persistent storage, and monitoring. This project demonstrates Kubernetes orchestration, scaling, and production-ready practices.',
    requirements: [
      'Deploy at least two application tiers to Kubernetes cluster',
      'Use Deployments with replica sets for high availability',
      'Implement different Service types (ClusterIP, LoadBalancer)',
      'Configure application using ConfigMaps and Secrets',
      'Implement Persistent Volumes for stateful components',
      'Set up Horizontal Pod Autoscaling based on CPU/memory',
      'Configure resource requests and limits for Pods',
      'Implement readiness and liveness probes',
      'Deploy an Ingress controller for routing',
      'Set up basic monitoring and logging',
      'Use Helm charts or Kustomize for deployment management'
    ],
    rubric: [
      {
        name: 'Kubernetes Architecture',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-designed Kubernetes architecture with appropriate use of Deployments, Services, ConfigMaps, Secrets, and Ingress'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional Kubernetes deployment with proper resource types'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic deployment but not using Kubernetes features effectively'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Minimal Kubernetes usage or significant architectural issues'
          }
        ]
      },
      {
        name: 'High Availability and Scaling',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Multiple replicas, HPA properly configured and tested, pod anti-affinity rules, readiness/liveness probes'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Replicas and HPA configured, health probes present'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Multiple replicas but scaling not tested or probes missing'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Single replicas or no scaling capabilities'
          }
        ]
      },
      {
        name: 'Configuration and Storage',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'ConfigMaps and Secrets properly used, persistent volumes correctly configured, storage class appropriate'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Config and storage working correctly'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic config/storage but hardcoded values or ephemeral storage'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor configuration management or data loss risk'
          }
        ]
      },
      {
        name: 'Resource Management',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Resource requests and limits properly set based on testing, QoS classes understood'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Reasonable resource requests and limits'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Resources specified but not optimized'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'No resource management or inappropriate values'
          }
        ]
      },
      {
        name: 'Documentation and Tooling',
        weight: 10,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Helm charts or Kustomize used, comprehensive documentation, architecture diagram'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Package management tool used, good documentation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Raw YAML only but documented'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor documentation or organization'
          }
        ]
      }
    ],
    estimatedHours: 25,
    scaffolding: {
      overview: 'Start with simple Deployments, add complexity incrementally (Services → Ingress → Config → Storage → Scaling)',
      gettingStarted: [
        'Set up Kubernetes cluster (Minikube for local, or managed service)',
        'Start with simple Pod, convert to Deployment, then add Services',
        'Use kubectl dry-run to generate YAML templates'
      ],
      milestones: [
        'Kubernetes cluster accessible and kubectl configured',
        'Basic Deployments running with ClusterIP Services',
        'Ingress controller installed and routing working',
        'ConfigMaps and Secrets created and mounted',
        'Persistent storage working for stateful components',
        'HPA configured and tested (generate load to trigger scaling)',
        'Monitoring/logging basic visibility',
        'Helm chart or Kustomize configuration working'
      ],
      starterResources: [
        { label: 'Kubernetes Docs', description: 'Official Kubernetes documentation', link: 'https://kubernetes.io/docs/' },
        { label: 'Helm', description: 'Package manager for Kubernetes', link: 'https://helm.sh/docs/' },
        { label: 'Kubernetes Patterns', description: 'Common Kubernetes patterns', link: 'https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/' }
      ],
      tips: [
        'Use kubectl explain to understand resource fields',
        'Start with kubectl create/run with --dry-run=client -o yaml to generate templates',
        'Organize YAML files by resource type or application component',
        'Use labels consistently for selectors and organization',
        'Test HPA with stress tests (kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh)'
      ]
    }
  },
  {
    id: 'cs405-project-4',
    subjectId: 'cs405',
    title: 'Serverless Application with Event-Driven Architecture',
    description: 'Build a serverless application using cloud functions (AWS Lambda, Azure Functions, or Google Cloud Functions) with event-driven architecture. Implement API endpoints, asynchronous processing, and integration with managed services. This project demonstrates serverless architecture, event-driven design, and cloud-native development.',
    requirements: [
      'Implement at least four serverless functions with different triggers',
      'Create RESTful API using API Gateway (or equivalent)',
      'Implement asynchronous processing with message queues or event streams',
      'Use managed database service (DynamoDB, Cosmos DB, Firestore)',
      'Implement object storage integration for file uploads/processing',
      'Set up proper IAM roles and permissions (least privilege)',
      'Implement error handling and dead letter queues',
      'Add monitoring, logging, and distributed tracing',
      'Optimize for cold starts and cost',
      'Use Infrastructure as Code (Serverless Framework, SAM, or Terraform)'
    ],
    rubric: [
      {
        name: 'Architecture and Design',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-designed event-driven architecture with appropriate use of async patterns, decoupled services, idempotent functions'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional serverless architecture with event-driven elements'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic serverless functions but not truly event-driven'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor architecture or synchronous dependencies'
          }
        ]
      },
      {
        name: 'Function Implementation',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-structured functions, proper error handling, stateless design, cold start optimization'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Clean function code with error handling'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Functions work but could be optimized or have error handling gaps'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor function design or significant issues'
          }
        ]
      },
      {
        name: 'Integration and Event Handling',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive event handling with queues/streams, retry logic, dead letter queues, proper error handling'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Event-driven architecture working with basic retry/error handling'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Some async processing but incomplete error handling'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Primarily synchronous or poor error handling'
          }
        ]
      },
      {
        name: 'Security and Permissions',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Least-privilege IAM roles, secrets properly managed, API authentication/authorization, input validation'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Appropriate IAM permissions and basic security'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Functional permissions but overly broad or secrets in code'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Excessive permissions or security vulnerabilities'
          }
        ]
      },
      {
        name: 'Monitoring and IaC',
        weight: 10,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Infrastructure as Code, comprehensive monitoring, distributed tracing, cost analysis'
          },
          {
            score: 75,
            label: 'Good',
            description: 'IaC used, basic monitoring in place'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Manual deployment or minimal monitoring'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'No IaC or monitoring'
          }
        ]
      }
    ],
    estimatedHours: 22,
    scaffolding: {
      overview: 'Build synchronous API first, then add async processing, then optimize',
      gettingStarted: [
        'Choose cloud provider and serverless framework',
        'Start with single function and API Gateway endpoint',
        'Add functions incrementally, testing each'
      ],
      milestones: [
        'Single function responding to API Gateway',
        'Multiple API endpoints working',
        'Asynchronous processing with queue/stream',
        'Database integration working',
        'Object storage upload/processing working',
        'Error handling and DLQ configured',
        'Monitoring and logging viewable',
        'IaC deployment working'
      ],
      starterResources: [
        { label: 'AWS Serverless Patterns', description: 'Common serverless architecture patterns', link: 'https://serverlessland.com/patterns' },
        { label: 'Serverless Framework', description: 'Cross-cloud serverless framework', link: 'https://www.serverless.com/framework/docs' },
        { label: 'AWS SAM', description: 'AWS Serverless Application Model', link: 'https://aws.amazon.com/serverless/sam/' }
      ],
      tips: [
        'Keep functions small and focused (single responsibility)',
        'Design for idempotency (functions may execute multiple times)',
        'Optimize package size to reduce cold starts',
        'Use environment variables for configuration',
        'Implement timeouts and retries appropriately',
        'Monitor costs closely (set billing alerts)'
      ]
    }
  }
];
