import { Quiz } from '../../../core/types';

export const cs405Quizzes: Quiz[] = [
  // ============================================================================
  // TOPIC 1: Cloud Fundamentals (3 quizzes)
  // ============================================================================
  {
    id: 'cs405-quiz-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Cloud Fundamentals - Core Concepts',
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT one of the five essential characteristics of cloud computing according to NIST?',
        options: [
          'On-demand self-service',
          'Broad network access',
          'Guaranteed uptime',
          'Rapid elasticity'
        ],
        correctAnswer: 2,
        explanation: 'The five essential characteristics are: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. Guaranteed uptime is an SLA consideration, not an essential characteristic.'
      },
      {
        id: 'q1-2',
        type: 'multiple_choice',
        prompt: 'In which cloud service model does the customer have the MOST control over the operating system?',
        options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
        correctAnswer: 2,
        explanation: 'IaaS (Infrastructure as a Service) provides virtual machines where customers control the operating system. In PaaS, the provider manages the OS. In SaaS, the provider manages everything except data and access.'
      },
      {
        id: 'q1-3',
        type: 'true_false',
        prompt: 'Multi-cloud refers to using multiple public cloud providers simultaneously.',
        correctAnswer: true,
        explanation: 'Multi-cloud means using services from multiple cloud providers (e.g., AWS, Azure, and GCP). This differs from hybrid cloud which combines public and private clouds.'
      },
      {
        id: 'q1-4',
        type: 'multiple_choice',
        prompt: 'What is the main financial benefit of cloud computing\'s pay-as-you-go model?',
        options: [
          'Eliminates all IT costs',
          'Converts CapEx to OpEx',
          'Reduces employee salaries',
          'Eliminates the need for budgeting'
        ],
        correctAnswer: 1,
        explanation: 'Cloud computing converts capital expenditure (CapEx) to operational expenditure (OpEx), eliminating large upfront hardware investments in favor of monthly consumption-based billing.'
      },
      {
        id: 'q1-5',
        type: 'code_output',
        prompt: 'If a cloud service has a 99.9% SLA, approximately how many minutes of downtime per month is allowed?',
        codeSnippet: '# Month = 30 days = 43,200 minutes\n# Downtime = 43,200 * (1 - 0.999)',
        correctAnswer: '43.2',
        explanation: 'With 99.9% uptime, 0.1% downtime is allowed. For a 30-day month: 43,200 minutes × 0.001 = 43.2 minutes of acceptable downtime.'
      }
    ]
  },
  {
    id: 'cs405-quiz-1b',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Cloud Fundamentals - Service and Deployment Models',
    questions: [
      {
        id: 'q1b-1',
        type: 'multiple_choice',
        prompt: 'Which deployment model combines on-premises infrastructure with public cloud services?',
        options: ['Private cloud', 'Public cloud', 'Hybrid cloud', 'Community cloud'],
        correctAnswer: 2,
        explanation: 'Hybrid cloud integrates on-premises private cloud infrastructure with public cloud services, enabling workload portability and data synchronization between environments.'
      },
      {
        id: 'q1b-2',
        type: 'true_false',
        prompt: 'Reserved instances in cloud computing offer lower pricing in exchange for long-term commitment.',
        correctAnswer: true,
        explanation: 'Reserved instances require 1 or 3-year commitments but offer significant discounts (up to 75%) compared to on-demand pricing.'
      },
      {
        id: 'q1b-3',
        type: 'multiple_choice',
        prompt: 'What does FaaS (Function as a Service) primarily enable?',
        options: [
          'Managing virtual machines',
          'Running code without managing servers',
          'Database administration',
          'Network configuration'
        ],
        correctAnswer: 1,
        explanation: 'FaaS allows developers to run code in response to events without provisioning or managing servers. The cloud provider handles all infrastructure management.'
      },
      {
        id: 'q1b-4',
        type: 'multiple_choice',
        prompt: 'Which cloud provider holds the largest market share?',
        options: ['Microsoft Azure', 'Google Cloud Platform', 'Amazon Web Services', 'IBM Cloud'],
        correctAnswer: 2,
        explanation: 'AWS holds approximately 32% market share, making it the largest cloud provider, followed by Azure (~23%) and Google Cloud (~11%).'
      },
      {
        id: 'q1b-5',
        type: 'true_false',
        prompt: 'In the shared responsibility model, cloud providers are responsible for data encryption.',
        correctAnswer: false,
        explanation: 'While providers secure the infrastructure, customers are responsible for encrypting their data. The provider may offer encryption services, but enabling and managing encryption is a customer responsibility.'
      }
    ]
  },
  {
    id: 'cs405-quiz-1c',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Cloud Fundamentals - Economics and Security',
    questions: [
      {
        id: 'q1c-1',
        type: 'multiple_choice',
        prompt: 'What is the primary advantage of spot instances/preemptible VMs?',
        options: [
          'Guaranteed availability',
          'Up to 90% cost reduction',
          'Better performance',
          'Dedicated hardware'
        ],
        correctAnswer: 1,
        explanation: 'Spot instances use spare cloud capacity at steep discounts (up to 90%) but can be interrupted with short notice, making them suitable for fault-tolerant workloads.'
      },
      {
        id: 'q1c-2',
        type: 'true_false',
        prompt: 'Cloud providers offer service credits as compensation when SLAs are not met.',
        correctAnswer: true,
        explanation: 'When providers fail to meet SLA commitments, they typically offer service credits (future usage credits) rather than cash refunds. The credit amount increases with worse availability.'
      },
      {
        id: 'q1c-3',
        type: 'multiple_choice',
        prompt: 'In the shared responsibility model, who is responsible for patching the guest operating system on IaaS?',
        options: [
          'Cloud provider',
          'Customer',
          'Third-party vendor',
          'Automatic system updates'
        ],
        correctAnswer: 1,
        explanation: 'In IaaS, customers manage the guest OS including patching. The provider manages the hypervisor and physical infrastructure, but OS maintenance is a customer responsibility.'
      },
      {
        id: 'q1c-4',
        type: 'multiple_choice',
        prompt: 'What is the main principle behind FinOps (Cloud Financial Operations)?',
        options: [
          'Eliminating all cloud costs',
          'Maximizing resource usage',
          'Bringing financial accountability to cloud spending',
          'Automating all billing'
        ],
        correctAnswer: 2,
        explanation: 'FinOps brings financial accountability to cloud spending through collaboration between engineering, finance, and business teams, focusing on cost visibility, optimization, and alignment with business value.'
      },
      {
        id: 'q1c-5',
        type: 'code_output',
        prompt: 'If a 99.99% SLA allows approximately 4.38 minutes of downtime per month, how many minutes are allowed per year?',
        codeSnippet: '# Annual downtime = Monthly downtime × 12\n# = 4.38 × 12',
        correctAnswer: '52.56',
        explanation: '99.99% uptime allows approximately 4.38 minutes downtime per month. Annually: 4.38 × 12 = 52.56 minutes (or about 52.6 minutes total downtime per year).'
      }
    ]
  },

  // ============================================================================
  // TOPIC 2: Virtualization (3 quizzes)
  // ============================================================================
  {
    id: 'cs405-quiz-2',
    subjectId: 'cs405',
    topicId: 'cs405-topic-2',
    title: 'Virtualization - Fundamentals',
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_choice',
        prompt: 'What is the primary difference between Type 1 and Type 2 hypervisors?',
        options: [
          'Type 1 runs on bare metal, Type 2 runs on a host OS',
          'Type 1 is faster, Type 2 is cheaper',
          'Type 1 is open source, Type 2 is commercial',
          'Type 1 is for Windows, Type 2 is for Linux'
        ],
        correctAnswer: 0,
        explanation: 'Type 1 hypervisors (bare-metal) run directly on hardware. Type 2 hypervisors (hosted) run as applications on a conventional operating system.'
      },
      {
        id: 'q2-2',
        type: 'true_false',
        prompt: 'Paravirtualization requires modification of the guest operating system.',
        correctAnswer: true,
        explanation: 'Paravirtualization modifies the guest OS to cooperate with the hypervisor using hypercalls instead of privileged instructions. Full virtualization runs unmodified guest OS.'
      },
      {
        id: 'q2-3',
        type: 'multiple_choice',
        prompt: 'Which technology enables hardware-assisted virtualization on Intel processors?',
        options: ['Hyper-V', 'VT-x', 'KVM', 'ESXi'],
        correctAnswer: 1,
        explanation: 'Intel VT-x (Virtualization Technology) is the CPU extension that enables hardware-assisted virtualization. AMD\'s equivalent is AMD-V.'
      },
      {
        id: 'q2-4',
        type: 'multiple_choice',
        prompt: 'What is the typical CPU overhead of modern virtualization with hardware support?',
        options: ['0-2%', '2-10%', '20-30%', '40-50%'],
        correctAnswer: 1,
        explanation: 'Modern hypervisors with hardware virtualization support (VT-x/AMD-V) introduce only 2-10% CPU overhead, making virtualization very efficient.'
      },
      {
        id: 'q2-5',
        type: 'true_false',
        prompt: 'Containers provide stronger isolation than virtual machines because each container has its own kernel.',
        correctAnswer: false,
        explanation: 'Containers share the host OS kernel, providing process-level isolation. VMs have stronger isolation because each VM has its own complete OS and kernel.'
      }
    ]
  },
  {
    id: 'cs405-quiz-2b',
    subjectId: 'cs405',
    topicId: 'cs405-topic-2',
    title: 'Virtualization - Hypervisors and Management',
    questions: [
      {
        id: 'q2b-1',
        type: 'multiple_choice',
        prompt: 'Which hypervisor is used by AWS (historically) and other cloud providers?',
        options: ['VMware ESXi', 'Microsoft Hyper-V', 'Xen', 'VirtualBox'],
        correctAnswer: 2,
        explanation: 'Xen powered AWS EC2 for many years (now transitioning to KVM-based Nitro). Xen is an open-source Type 1 hypervisor designed for cloud environments.'
      },
      {
        id: 'q2b-2',
        type: 'true_false',
        prompt: 'Live migration (vMotion) allows moving a running VM between hosts without downtime.',
        correctAnswer: true,
        explanation: 'Live migration moves a running VM from one host to another with only milliseconds of downtime. This enables maintenance without service interruption.'
      },
      {
        id: 'q2b-3',
        type: 'multiple_choice',
        prompt: 'What is memory ballooning used for in virtualization?',
        options: [
          'Increasing VM performance',
          'Reclaiming unused memory from VMs',
          'Expanding physical memory',
          'Compressing memory'
        ],
        correctAnswer: 1,
        explanation: 'Memory ballooning allows the hypervisor to reclaim unused memory from VMs by inflating a balloon driver in the guest OS, which then releases memory back to the hypervisor.'
      },
      {
        id: 'q2b-4',
        type: 'multiple_choice',
        prompt: 'Which hypervisor is part of the Linux kernel?',
        options: ['Xen', 'ESXi', 'KVM', 'Hyper-V'],
        correctAnswer: 2,
        explanation: 'KVM (Kernel-based Virtual Machine) is built into the Linux kernel, turning Linux into a Type 1 hypervisor. It\'s used by many cloud providers.'
      },
      {
        id: 'q2b-5',
        type: 'true_false',
        prompt: 'Thin provisioning allocates full disk space to a VM upfront.',
        correctAnswer: false,
        explanation: 'Thin provisioning allocates disk space on-demand as data is written, improving storage efficiency. Thick provisioning allocates full space upfront.'
      }
    ]
  },
  {
    id: 'cs405-quiz-2c',
    subjectId: 'cs405',
    topicId: 'cs405-topic-2',
    title: 'Virtualization - Virtual Machines and Resources',
    questions: [
      {
        id: 'q2c-1',
        type: 'multiple_choice',
        prompt: 'What is a vCPU?',
        options: [
          'A physical CPU core',
          'A virtual CPU thread allocated to a VM',
          'A type of CPU cache',
          'A CPU scheduling algorithm'
        ],
        correctAnswer: 1,
        explanation: 'A vCPU (virtual CPU) represents CPU resources allocated to a VM. Each vCPU maps to physical CPU threads/cores, and VMs can have multiple vCPUs.'
      },
      {
        id: 'q2c-2',
        type: 'true_false',
        prompt: 'Over-subscription means allocating more virtual resources than available physical resources.',
        correctAnswer: true,
        explanation: 'Over-subscription allocates more virtual resources (vCPUs, memory) than physically available, betting that not all VMs will use maximum resources simultaneously.'
      },
      {
        id: 'q2c-3',
        type: 'multiple_choice',
        prompt: 'Which virtual disk format is used by VMware?',
        options: ['VHD', 'VMDK', 'QCOW2', 'IMG'],
        correctAnswer: 1,
        explanation: 'VMDK (Virtual Machine Disk) is VMware\'s virtual disk format. VHD is used by Hyper-V, QCOW2 by KVM/QEMU.'
      },
      {
        id: 'q2c-4',
        type: 'multiple_choice',
        prompt: 'What is the recommended practice for sizing VMs?',
        options: [
          'Always allocate maximum resources',
          'Start small and scale up based on monitoring',
          'Use fixed 4 vCPU and 16GB RAM for all VMs',
          'Over-provision by 200% for safety'
        ],
        correctAnswer: 1,
        explanation: 'Best practice is to start with minimal resources and scale up based on actual usage monitoring. Over-provisioning wastes resources and can hurt performance.'
      },
      {
        id: 'q2c-5',
        type: 'true_false',
        prompt: 'Snapshots should be used as a long-term backup solution.',
        correctAnswer: false,
        explanation: 'Snapshots are point-in-time captures for short-term use (testing, updates). They can degrade performance and should not replace proper backups. Delete snapshots after use.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 3: Containers and Docker (3 quizzes)
  // ============================================================================
  {
    id: 'cs405-quiz-3',
    subjectId: 'cs405',
    topicId: 'cs405-topic-3',
    title: 'Containers and Docker - Fundamentals',
    questions: [
      {
        id: 'q3-1',
        type: 'multiple_choice',
        prompt: 'What is the key difference between containers and virtual machines?',
        options: [
          'Containers are slower than VMs',
          'Containers share the host OS kernel, VMs have separate kernels',
          'VMs are more portable than containers',
          'Containers require more resources than VMs'
        ],
        correctAnswer: 1,
        explanation: 'Containers share the host OS kernel and provide process-level isolation, making them lighter and faster. VMs have complete operating systems with separate kernels.'
      },
      {
        id: 'q3-2',
        type: 'true_false',
        prompt: 'Docker containers can run on any operating system without modification.',
        correctAnswer: false,
        explanation: 'Docker containers must share the host OS type. Linux containers run on Linux hosts, Windows containers on Windows hosts. Though Docker Desktop uses a Linux VM to run Linux containers on Windows/Mac.'
      },
      {
        id: 'q3-3',
        type: 'multiple_choice',
        prompt: 'Which Linux kernel feature provides process isolation for containers?',
        options: ['cgroups', 'namespaces', 'SELinux', 'iptables'],
        correctAnswer: 1,
        explanation: 'Namespaces provide isolation (PID, network, mount, etc.). Cgroups limit resources. Together they form the foundation of container isolation.'
      },
      {
        id: 'q3-4',
        type: 'multiple_choice',
        prompt: 'What is the difference between a Docker image and a container?',
        options: [
          'They are the same thing',
          'Image is the template, container is the running instance',
          'Container is the template, image is the running instance',
          'Images are bigger than containers'
        ],
        correctAnswer: 1,
        explanation: 'A Docker image is a read-only template containing the application and dependencies. A container is a running instance of an image.'
      },
      {
        id: 'q3-5',
        type: 'true_false',
        prompt: 'Each layer in a Docker image is read-only except the top container layer.',
        correctAnswer: true,
        explanation: 'Docker images consist of read-only layers stacked together. When a container runs, a writable layer is added on top for runtime changes.'
      }
    ]
  },
  {
    id: 'cs405-quiz-3b',
    subjectId: 'cs405',
    topicId: 'cs405-topic-3',
    title: 'Containers and Docker - Images and Networking',
    questions: [
      {
        id: 'q3b-1',
        type: 'multiple_choice',
        prompt: 'In a Dockerfile, which instruction creates a new layer?',
        options: ['ENV', 'RUN', 'LABEL', 'EXPOSE'],
        correctAnswer: 1,
        explanation: 'RUN, COPY, and ADD instructions create new layers. ENV, LABEL, EXPOSE, and other metadata instructions don\'t create layers.'
      },
      {
        id: 'q3b-2',
        type: 'true_false',
        prompt: 'Multi-stage builds in Docker help reduce final image size.',
        correctAnswer: true,
        explanation: 'Multi-stage builds allow using build tools in early stages while copying only necessary artifacts to the final stage, significantly reducing image size.'
      },
      {
        id: 'q3b-3',
        type: 'multiple_choice',
        prompt: 'What is the default Docker network mode?',
        options: ['host', 'bridge', 'overlay', 'none'],
        correctAnswer: 1,
        explanation: 'Bridge network is the default. Containers get private IPs and can communicate with each other via the bridge. Port mapping is required for external access.'
      },
      {
        id: 'q3b-4',
        type: 'multiple_choice',
        prompt: 'Which Docker networking mode gives containers direct access to the host network stack?',
        options: ['bridge', 'host', 'overlay', 'macvlan'],
        correctAnswer: 1,
        explanation: 'Host networking mode removes network isolation, giving containers direct access to the host\'s network stack. No port mapping needed but less isolation.'
      },
      {
        id: 'q3b-5',
        type: 'true_false',
        prompt: 'Docker layers are cached, which speeds up subsequent image builds.',
        correctAnswer: true,
        explanation: 'Docker caches layers. If a Dockerfile step hasn\'t changed, Docker reuses the cached layer, significantly speeding up builds. Order instructions from least to most frequently changing.'
      }
    ]
  },
  {
    id: 'cs405-quiz-3c',
    subjectId: 'cs405',
    topicId: 'cs405-topic-3',
    title: 'Containers and Docker - Storage and Security',
    questions: [
      {
        id: 'q3c-1',
        type: 'multiple_choice',
        prompt: 'What is the recommended way to persist data in Docker?',
        options: [
          'Store in container filesystem',
          'Use Docker volumes',
          'Use environment variables',
          'Store in Docker images'
        ],
        correctAnswer: 1,
        explanation: 'Docker volumes are the recommended way to persist data. They\'re managed by Docker, exist outside containers, and survive container deletion.'
      },
      {
        id: 'q3c-2',
        type: 'true_false',
        prompt: 'Data stored in a container\'s writable layer persists after the container is deleted.',
        correctAnswer: false,
        explanation: 'Data in the container\'s writable layer is ephemeral and deleted when the container is removed. Use volumes for persistence.'
      },
      {
        id: 'q3c-3',
        type: 'multiple_choice',
        prompt: 'What is the difference between Docker volumes and bind mounts?',
        options: [
          'No difference, they are the same',
          'Volumes are managed by Docker, bind mounts reference host paths',
          'Bind mounts are faster than volumes',
          'Volumes only work on Linux'
        ],
        correctAnswer: 1,
        explanation: 'Volumes are managed by Docker in /var/lib/docker/volumes. Bind mounts reference specific host filesystem paths. Volumes are recommended for most use cases.'
      },
      {
        id: 'q3c-4',
        type: 'multiple_choice',
        prompt: 'Why should containers avoid running as root?',
        options: [
          'Root containers run slower',
          'Security risk if container compromised',
          'Root not supported in Docker',
          'Licensing restrictions'
        ],
        correctAnswer: 1,
        explanation: 'Running as root is a security risk. If a container is compromised, the attacker has root privileges. Use USER instruction to run as non-root user.'
      },
      {
        id: 'q3c-5',
        type: 'true_false',
        prompt: 'Docker Compose is used to define and run multi-container applications.',
        correctAnswer: true,
        explanation: 'Docker Compose uses YAML files to define multi-container applications with their networks, volumes, and configurations, enabling easy deployment and management.'
      }
    ]
  }
];
