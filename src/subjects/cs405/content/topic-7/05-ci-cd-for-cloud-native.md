---
id: cs405-t7-cicd
title: "CI/CD for Cloud-Native"
order: 5
---

# CI/CD for Cloud-Native Applications

Continuous Integration and Continuous Deployment (CI/CD) form the backbone of cloud-native development practices. CI/CD pipelines automate the process of building, testing, and deploying applications, enabling teams to deliver software changes more frequently and reliably. In cloud-native environments, CI/CD pipelines are specifically designed to work with containers, orchestration platforms, and infrastructure as code.

## Understanding CI/CD

**Continuous Integration (CI)** is the practice of frequently merging code changes into a shared repository, where automated builds and tests verify each integration. CI catches issues early, reduces integration problems, and provides rapid feedback to developers.

**Continuous Delivery (CD)** extends CI by automatically preparing code for deployment to production. Every change that passes automated tests is deployable, though the actual deployment may require manual approval.

**Continuous Deployment** takes this further by automatically deploying every change that passes tests directly to production, with no manual intervention required.

```
Developer Workflow:
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Code   │───►│  Build  │───►│  Test   │───►│  Deploy │───►│  Run    │
│ Commit  │    │  Image  │    │  Suite  │    │ Staging │    │  Prod   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
   Git Push    Container      Unit/Int      Smoke Tests    Monitoring
               Registry       Tests         E2E Tests      Alerting
```

## Pipeline Stages

A typical cloud-native CI/CD pipeline includes several stages:

```yaml
# GitLab CI/CD Pipeline Example
stages:
  - build
  - test
  - security
  - deploy-staging
  - integration-test
  - deploy-production

variables:
  DOCKER_IMAGE: ${CI_REGISTRY_IMAGE}:${CI_COMMIT_SHA}

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t ${DOCKER_IMAGE} .
    - docker push ${DOCKER_IMAGE}
  only:
    - main
    - merge_requests

test:
  stage: test
  image: ${DOCKER_IMAGE}
  script:
    - pytest tests/ --cov=app --cov-report=xml
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage.xml

security-scan:
  stage: security
  image: aquasec/trivy:latest
  script:
    - trivy image --severity HIGH,CRITICAL --exit-code 1 ${DOCKER_IMAGE}
  allow_failure: false

deploy-staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context staging
    - envsubst < k8s/deployment.yaml | kubectl apply -f -
    - kubectl rollout status deployment/myapp -n staging
  environment:
    name: staging
    url: https://staging.example.com
```

Each stage gates the next—failures prevent progression, ensuring only quality code reaches production.

## GitOps with ArgoCD

GitOps is a paradigm where Git repositories are the single source of truth for both application code and infrastructure. Changes to infrastructure are made through Git commits, and specialized operators sync the actual state to match the desired state in Git.

```yaml
# ArgoCD Application definition
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/myapp-config
    targetRevision: HEAD
    path: overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

ArgoCD continuously watches the Git repository and automatically synchronizes Kubernetes resources to match the declared state. This approach provides complete audit trails, easy rollbacks (via Git revert), and declarative infrastructure management.

## Deployment Strategies

Cloud-native deployments use several strategies to minimize risk and enable quick rollbacks:

**Rolling Update** - Gradually replaces old pods with new ones. Zero downtime, but both versions run simultaneously during the update.

**Blue-Green Deployment** - Maintains two identical environments. Deploy to inactive (green), test, then switch traffic from active (blue) to green. Enables instant rollback.

**Canary Deployment** - Routes a small percentage of traffic to the new version. Gradually increase traffic if metrics are healthy. Quick rollback by routing traffic back to the stable version.

```yaml
# Kubernetes Canary with Istio
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp
spec:
  hosts:
    - myapp
  http:
    - route:
        - destination:
            host: myapp
            subset: stable
          weight: 90
        - destination:
            host: myapp
            subset: canary
          weight: 10
```

## Infrastructure as Code

Infrastructure as Code (IaC) treats infrastructure provisioning as software development. Infrastructure is defined in version-controlled files, tested, and deployed through CI/CD pipelines.

```hcl
# Terraform example for Kubernetes cluster
resource "aws_eks_cluster" "main" {
  name     = "production-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids              = aws_subnet.private[*].id
    endpoint_private_access = true
    endpoint_public_access  = false
  }

  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }
}

resource "aws_eks_node_group" "workers" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "workers"
  node_role_arn   = aws_iam_role.eks_nodes.arn
  subnet_ids      = aws_subnet.private[*].id

  scaling_config {
    desired_size = 3
    max_size     = 10
    min_size     = 2
  }
}
```

IaC enables reproducible environments, drift detection, and disaster recovery through infrastructure versioning.

## Key Takeaways

- CI/CD automates building, testing, and deploying applications for faster, more reliable releases
- Pipeline stages (build, test, security, deploy) gate progression to catch issues early
- GitOps uses Git as the single source of truth for both code and infrastructure
- Deployment strategies (rolling, blue-green, canary) minimize risk during releases
- Infrastructure as Code enables version-controlled, reproducible infrastructure

## Common Mistakes

- Skipping security scanning stages to speed up pipeline execution
- Not implementing proper rollback mechanisms for failed deployments
- Having overly long pipelines that slow down the feedback loop
- Lacking integration tests that verify service interactions
- Not versioning infrastructure definitions alongside application code
