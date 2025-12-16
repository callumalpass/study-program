import { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  {
    id: 'cs204-t6-ex1',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'VCS Fundamentals',
    description: 'Explain the difference between centralized (SVN) and distributed (Git) version control systems. List two advantages of each approach.',
    difficulty: 1,
    hints: [
      'Consider offline work capabilities',
      'Think about single point of failure',
      'Consider branching complexity'
    ],
    solution: `**Centralized VCS (SVN):**
- Single central repository; clients checkout working copies
- Advantages: Simpler model, fine-grained access control, better for large binary files

**Distributed VCS (Git):**
- Every developer has full repository copy with complete history
- Advantages: Offline work, no single point of failure, fast operations, flexible branching

**Key difference:** In DVCS, operations like commit, branch, log are local and instant. Central server is optional, used for sharing.`
  },
  {
    id: 'cs204-t6-ex2',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Git Three-Tree Architecture',
    description: 'Explain Git\'s three trees: Working Directory, Staging Area (Index), and Repository. Describe how files move between them.',
    difficulty: 2,
    hints: [
      'Working directory has actual files',
      'Staging area holds next commit',
      'Repository contains committed history'
    ],
    solution: `**Working Directory:** Actual files on disk. Modified files are "unstaged."

**Staging Area (Index):** Snapshot of files to include in next commit. Files added with \`git add\`.

**Repository (.git):** Committed history stored as objects.

**Flow:**
1. Edit files → changes in Working Directory
2. \`git add\` → moves changes to Staging Area
3. \`git commit\` → saves staged changes to Repository

**Commands:**
- \`git status\`: Shows state across all three
- \`git diff\`: Working vs Staging
- \`git diff --staged\`: Staging vs Repository`
  },
  {
    id: 'cs204-t6-ex3',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Git Branching Basics',
    description: 'Explain how Git branches work internally. What is a branch? What is HEAD? How does creating a branch differ from creating a commit?',
    difficulty: 2,
    hints: [
      'Branch is just a pointer',
      'HEAD points to current branch',
      'Commits are immutable objects'
    ],
    solution: `**Branch:** A lightweight movable pointer to a commit. Stored as 40-char SHA in .git/refs/heads/branchname.

**HEAD:** Special pointer indicating current branch (or commit in detached state). Stored in .git/HEAD.

**Creating branch:** Just creates new pointer file (~41 bytes). Instant, regardless of repository size.

**Creating commit:** Creates commit object (metadata + tree pointer), updates current branch pointer to new commit.

**Example:**
\`git branch feature\` → creates .git/refs/heads/feature pointing to current commit
\`git checkout feature\` → updates HEAD to point to feature branch`
  },
  {
    id: 'cs204-t6-ex4',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Merge vs Rebase',
    description: 'Compare git merge and git rebase. When would you use each? What are the risks of rebasing?',
    difficulty: 3,
    hints: [
      'Merge preserves history',
      'Rebase creates linear history',
      'Never rebase public branches'
    ],
    solution: `**git merge:**
- Creates merge commit with two parents
- Preserves complete history and branch structure
- Use: Integrating feature branches, public/shared branches

**git rebase:**
- Replays commits on top of another branch
- Creates linear, cleaner history
- Use: Updating feature branch with main, cleaning up before PR

**Rebase Risks:**
- Rewrites commit history (changes SHAs)
- **Never rebase commits already pushed/shared** — causes divergent histories for collaborators
- Can cause repeated conflict resolution

**Golden rule:** Rebase local work, merge shared work.`
  },
  {
    id: 'cs204-t6-ex5',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Resolving Merge Conflicts',
    description: 'Explain what causes merge conflicts and describe the step-by-step process to resolve them in Git.',
    difficulty: 2,
    hints: [
      'Conflicts occur when same lines changed',
      'Conflict markers show both versions',
      'Must manually edit then mark resolved'
    ],
    solution: `**Causes:** Same lines modified differently in both branches being merged.

**Resolution Process:**
1. \`git merge feature\` → conflict occurs
2. Git marks files with conflict markers:
   <<<<<<< HEAD
   current branch code
   =======
   incoming branch code
   >>>>>>> feature
3. Edit file to resolve (keep one, both, or new combination)
4. Remove conflict markers
5. \`git add resolved-file.txt\`
6. \`git commit\` → completes merge

**Tools:** \`git mergetool\` launches visual diff tool
**Prevention:** Frequent integration, small focused changes, communication`
  },
  {
    id: 'cs204-t6-ex6',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Git Flow Workflow',
    description: 'Describe the Git Flow branching model. What are the main branch types and their purposes?',
    difficulty: 3,
    hints: [
      'Two long-lived branches',
      'Feature, release, hotfix branches',
      'Consider release management'
    ],
    solution: `**Long-lived Branches:**
- **main/master:** Production-ready code, tagged with versions
- **develop:** Integration branch for features

**Short-lived Branches:**
- **feature/xxx:** New features; branch from develop, merge back
- **release/x.x:** Release preparation; branch from develop, merge to main AND develop
- **hotfix/xxx:** Production fixes; branch from main, merge to main AND develop

**Flow:**
1. Features developed in feature branches
2. Features merged to develop
3. Release branch created for final testing
4. Release merged to main (tagged) and develop
5. Hotfixes go directly to main, then develop

**Best for:** Scheduled release cycles, multiple versions in production`
  },
  {
    id: 'cs204-t6-ex7',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Trunk-Based Development',
    description: 'Compare trunk-based development with Git Flow. When is trunk-based development preferred?',
    difficulty: 3,
    hints: [
      'Single main branch focus',
      'Short-lived feature branches',
      'Requires strong CI/CD'
    ],
    solution: `**Trunk-Based Development:**
- Single main branch (trunk) for integration
- Short-lived feature branches (<2 days)
- Frequent commits directly to trunk or quick PRs
- Feature flags for incomplete features

**vs Git Flow:**
- Simpler branch structure
- Faster integration (less merge complexity)
- Requires robust CI/CD and testing
- Better for continuous deployment

**When to prefer:**
- Continuous deployment environments
- Small, experienced teams
- Strong automated testing
- Web services (single version in production)

**When Git Flow better:**
- Multiple production versions
- Scheduled releases
- Less mature CI/CD infrastructure`
  },
  {
    id: 'cs204-t6-ex8',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'CI/CD Pipeline Stages',
    description: 'Design a CI/CD pipeline for a web application. List the stages and what happens in each.',
    difficulty: 3,
    hints: [
      'Source → Build → Test → Deploy',
      'Consider different environments',
      'Include quality gates'
    ],
    solution: `**CI/CD Pipeline Stages:**

1. **Source:** Trigger on push/PR to repository
   - Checkout code, fetch dependencies

2. **Build:** Compile/bundle application
   - npm install, npm run build
   - Create artifacts

3. **Test:** Automated quality checks
   - Unit tests, linting, type checking
   - Integration tests
   - Code coverage threshold

4. **Security Scan:** Vulnerability detection
   - SAST (static analysis)
   - Dependency vulnerability scan

5. **Deploy to Staging:** Pre-production environment
   - Deploy artifacts
   - Run smoke tests

6. **Manual Approval:** (optional) Human gate

7. **Deploy to Production:**
   - Blue/green or rolling deployment
   - Health checks
   - Automated rollback on failure`
  },
  {
    id: 'cs204-t6-ex9',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Continuous Integration Principles',
    description: 'List and explain five key practices for successful continuous integration.',
    difficulty: 2,
    hints: [
      'Frequent integration',
      'Automated builds',
      'Fast feedback'
    ],
    solution: `**Key CI Practices:**

1. **Maintain Single Source Repository**
   - Everything needed to build in version control
   - No dependencies on local machine state

2. **Automate the Build**
   - Single command builds entire project
   - Include all tests in build process

3. **Commit Frequently**
   - At least daily integration to main branch
   - Smaller changes = easier conflict resolution

4. **Keep Build Fast**
   - Target <10 minutes for feedback
   - Parallelize tests, optimize slow tests

5. **Fix Broken Builds Immediately**
   - Broken build is highest priority
   - Team stops until fixed

**Additional:** Everyone sees build results, test in production clone, make artifacts easily available.`
  },
  {
    id: 'cs204-t6-ex10',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Deployment Strategies',
    description: 'Compare blue-green deployment, canary releases, and rolling deployments. When would you use each?',
    difficulty: 4,
    hints: [
      'Blue-green: instant switch',
      'Canary: gradual rollout',
      'Rolling: incremental replacement'
    ],
    solution: `**Blue-Green Deployment:**
- Two identical environments (blue=current, green=new)
- Deploy to green, switch traffic instantly
- Easy rollback: switch back to blue
- Use: When instant switchover needed, simple rollback required
- Con: Requires double infrastructure

**Canary Release:**
- Route small % of traffic to new version
- Monitor, gradually increase if healthy
- Use: High-risk changes, need real user feedback before full rollout
- Con: Complex routing, version compatibility issues

**Rolling Deployment:**
- Replace instances incrementally (e.g., 1 at a time)
- Use: Resource-efficient, Kubernetes default
- Con: Mixed versions during deploy, slower rollback

**Feature Flags:** Alternative — deploy code, enable via config`
  },
  {
    id: 'cs204-t6-ex11',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Git Hooks',
    description: 'Explain what Git hooks are and describe three useful hooks with practical examples.',
    difficulty: 3,
    hints: [
      'Scripts triggered by Git events',
      'Client-side and server-side hooks',
      'Common: pre-commit, pre-push'
    ],
    solution: `**Git Hooks:** Scripts in .git/hooks/ triggered by Git events.

**Useful Hooks:**

1. **pre-commit:** Runs before commit created
   - Example: Run linter, formatter, tests
   - Prevent committing debug code, large files
   \`\`\`bash
   npm run lint && npm test
   \`\`\`

2. **prepare-commit-msg:** Modify default commit message
   - Example: Prepend branch name/ticket number
   - Auto-format commit message template

3. **pre-push:** Runs before push to remote
   - Example: Run full test suite
   - Prevent pushing to protected branches
   - Check for secrets in code

**Server-side:** pre-receive, post-receive (enforce policies)
**Sharing hooks:** Use tools like Husky (npm) to version control hooks`
  },
  {
    id: 'cs204-t6-ex12',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Pull Request Best Practices',
    description: 'Describe best practices for creating and reviewing pull requests.',
    difficulty: 2,
    hints: [
      'Keep PRs focused and small',
      'Clear descriptions',
      'Constructive code review'
    ],
    solution: `**Creating PRs:**
- Keep small and focused (single concern)
- Clear title describing change
- Description with context, testing done, screenshots
- Link to issue/ticket
- Self-review before requesting review
- Ensure CI passes

**Reviewing PRs:**
- Understand context before reviewing
- Check: correctness, readability, tests, edge cases
- Be constructive: explain why, suggest alternatives
- Approve, request changes, or comment
- Use suggestions feature for small fixes

**Team Practices:**
- Require 1-2 approvals before merge
- Address all comments before merging
- Squash or rebase to clean history
- Delete branch after merge`
  },
  {
    id: 'cs204-t6-ex13',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Git Reset vs Revert',
    description: 'Explain the difference between git reset and git revert. When should each be used? What are the safety considerations?',
    difficulty: 3,
    hints: [
      'Reset moves branch pointer',
      'Revert creates new commit',
      'Reset rewrites history'
    ],
    solution: `**git reset:** Moves branch pointer backward, optionally modifying staging/working directory
- \`--soft\`: Move HEAD only (changes staged)
- \`--mixed\` (default): Reset staging (changes unstaged)
- \`--hard\`: Reset staging AND working directory (destructive!)

**git revert:** Creates new commit that undoes specified commit
- Preserves history
- Safe for shared branches

**When to use:**
- **reset:** Undo local uncommitted/unpushed work
- **revert:** Undo commits already pushed/shared

**Safety:**
- **Never reset pushed commits** — causes divergent history
- **reset --hard loses uncommitted changes permanently**
- Revert is always safe but creates undo commits`
  },
  {
    id: 'cs204-t6-ex14',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Infrastructure as Code',
    description: 'Explain Infrastructure as Code (IaC) and its relationship with CI/CD. Give examples of IaC tools.',
    difficulty: 4,
    hints: [
      'Treat infrastructure like application code',
      'Version control infrastructure',
      'Automate provisioning'
    ],
    solution: `**Infrastructure as Code:** Managing infrastructure through machine-readable definition files rather than manual configuration.

**Benefits:**
- Version control for infrastructure changes
- Reproducible environments
- Code review for infrastructure
- Automated provisioning
- Documentation as code

**Tools:**
- **Terraform:** Cloud-agnostic, declarative
- **AWS CloudFormation:** AWS-specific
- **Ansible/Chef/Puppet:** Configuration management
- **Kubernetes manifests/Helm:** Container orchestration
- **Docker/Dockerfiles:** Container images

**CI/CD Integration:**
1. Infrastructure changes in PR
2. Plan/preview changes
3. Review and approve
4. Apply changes automatically
5. Environment parity (dev=staging=prod)`
  },
  {
    id: 'cs204-t6-ex15',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'Monorepo vs Polyrepo',
    description: 'Compare monorepo and polyrepo (multi-repo) strategies. What are the trade-offs of each?',
    difficulty: 4,
    hints: [
      'Monorepo: one repo, many projects',
      'Polyrepo: one repo per project',
      'Consider scale and tooling'
    ],
    solution: `**Monorepo:** Single repository containing multiple projects/services

*Pros:*
- Atomic cross-project changes
- Shared code and tooling
- Unified versioning
- Easier refactoring across projects

*Cons:*
- Requires specialized tooling at scale
- CI/CD complexity (selective builds)
- Permission management harder

**Polyrepo:** Separate repository per project

*Pros:*
- Clear ownership boundaries
- Independent deployment cycles
- Simpler permissions
- Standard Git tooling works

*Cons:*
- Cross-repo changes are multiple PRs
- Code sharing requires publishing packages
- Version compatibility challenges

**Examples:** Google, Meta use monorepos; microservices teams often use polyrepos.`
  },
  {
    id: 'cs204-t6-ex16',
    subjectId: 'cs204',
    topicId: 'cs204-topic-6',
    type: 'written' as const,
    title: 'CI/CD Pipeline Troubleshooting',
    description: 'A CI/CD pipeline is failing intermittently. Describe strategies for diagnosing and fixing flaky pipelines.',
    difficulty: 5,
    hints: [
      'Identify flaky tests vs infrastructure issues',
      'Check for race conditions',
      'Consider environment differences'
    ],
    solution: `**Diagnosis Strategies:**

1. **Collect Data:** Track which stages fail, frequency, patterns (time of day, load)

2. **Check Logs:** Pipeline logs, test output, system metrics during failures

3. **Identify Root Causes:**
   - **Flaky tests:** Timing dependencies, shared state, external services
   - **Resource issues:** Memory limits, disk space, CPU contention
   - **Network:** Timeouts, rate limiting, DNS issues
   - **Environment drift:** Differences between runs

**Fixes:**
- **Flaky tests:** Isolate tests, mock externals, use retries cautiously (masks issues)
- **Resources:** Increase limits, optimize builds, parallelize wisely
- **Dependencies:** Pin versions, use lock files, local caching
- **Timeouts:** Increase where appropriate, add health checks

**Prevention:** Hermetic builds, reproducible environments, monitoring and alerting on failure rates`
  }
];
