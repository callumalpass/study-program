# Git Workflows

Git workflows are branching strategies and collaboration patterns that teams adopt to organize their development process. The right workflow depends on team size, project complexity, release cadence, and organizational culture.

## Why Workflows Matter

Without a defined workflow, teams face confusion about where to commit changes, when to create branches, and how to integrate work. A workflow provides:

**Consistency**: Everyone follows the same process for creating, reviewing, and merging code.

**Scalability**: Clear patterns handle growth from small teams to large organizations.

**Quality Control**: Built-in review and testing stages catch issues before production.

**Parallel Development**: Multiple features can progress simultaneously without interference.

**Release Management**: Structured approaches to versioning and deployment.

## Centralized Workflow

The simplest workflow mirrors centralized VCS like Subversion. Everyone commits to a single branch, typically `main` or `master`.

### How It Works

1. Clone the repository
2. Make changes locally
3. Pull latest changes before pushing
4. Resolve conflicts if necessary
5. Push to main branch

```bash
git clone https://github.com/team/repo.git
cd repo

# Make changes
git add .
git commit -m "Add feature"

# Get latest changes
git pull origin main

# Push your changes
git push origin main
```

### Advantages

- Simple to understand and implement
- Low overhead for small teams
- Good for beginners learning Git

### Disadvantages

- No code review before integration
- Difficult to isolate features in development
- No staging area for releases
- Higher risk of breaking main branch

### Best For

- Small teams (2-5 developers)
- Simple projects with infrequent changes
- Teams transitioning from centralized VCS
- Projects with very stable, mature codebases

## Feature Branch Workflow

Each feature or bug fix gets its own branch. Work is isolated until ready for integration, enabling code review and testing.

### How It Works

1. Create a feature branch from main
2. Develop and commit changes on the branch
3. Push branch to remote
4. Open pull request for review
5. Merge to main after approval

```bash
# Create and switch to feature branch
git checkout -b feature/user-authentication main

# Develop the feature
git add .
git commit -m "Implement user login"

# Push to remote
git push -u origin feature/user-authentication

# After pull request approval, merge via GitHub/GitLab
# or locally:
git checkout main
git merge feature/user-authentication
git push origin main

# Delete the feature branch
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

### Branch Naming Conventions

Organize branches with prefixes:

- `feature/description` - New features
- `fix/description` or `bugfix/description` - Bug fixes
- `hotfix/description` - Urgent production fixes
- `refactor/description` - Code improvements
- `docs/description` - Documentation changes
- `test/description` - Test additions or modifications

Examples:
- `feature/oauth-integration`
- `fix/memory-leak-in-parser`
- `hotfix/security-vulnerability`

### Advantages

- Main branch stays clean and deployable
- Code review before integration
- Easy to abandon incomplete features
- Parallel development without interference
- Clear separation of concerns

### Disadvantages

- Requires discipline to keep branches short-lived
- Can lead to integration challenges if branches live too long
- Merge conflicts increase with branch duration

### Best For

- Most professional development teams
- Projects requiring code review
- Teams practicing continuous integration
- Applications with regular releases

## Gitflow Workflow

Gitflow is a strict branching model designed around project releases. It uses multiple long-lived branches with specific purposes.

### Branch Structure

**Main Branches** (permanent):
- `main` (or `master`) - Production-ready code
- `develop` - Integration branch for features

**Supporting Branches** (temporary):
- `feature/*` - New features
- `release/*` - Release preparation
- `hotfix/*` - Emergency production fixes

### How It Works

#### Feature Development

```bash
# Start a feature from develop
git checkout -b feature/shopping-cart develop

# Work on feature
git commit -am "Add cart functionality"

# Finish feature
git checkout develop
git merge --no-ff feature/shopping-cart
git branch -d feature/shopping-cart
git push origin develop
```

The `--no-ff` flag creates a merge commit even for fast-forward merges, preserving branch history.

#### Release Preparation

```bash
# Create release branch from develop
git checkout -b release/1.2.0 develop

# Bump version numbers, fix minor bugs
git commit -am "Bump version to 1.2.0"

# Merge to main and tag
git checkout main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"

# Merge back to develop
git checkout develop
git merge --no-ff release/1.2.0

# Delete release branch
git branch -d release/1.2.0
```

#### Hotfix Process

```bash
# Create hotfix from main
git checkout -b hotfix/1.2.1 main

# Fix the critical bug
git commit -am "Fix critical security issue"

# Merge to main and tag
git checkout main
git merge --no-ff hotfix/1.2.1
git tag -a v1.2.1 -m "Hotfix 1.2.1"

# Merge to develop
git checkout develop
git merge --no-ff hotfix/1.2.1

# Delete hotfix branch
git branch -d hotfix/1.2.1
```

### Advantages

- Clear structure for releases
- Parallel development of features and releases
- Supports multiple production versions
- Hotfixes don't interrupt feature development
- Well-documented with tooling support

### Disadvantages

- Complex with many long-lived branches
- Overhead may be excessive for simple projects
- Merge commits create complex history
- Not ideal for continuous deployment
- Requires discipline to maintain properly

### Best For

- Scheduled release cycles (monthly, quarterly)
- Products with multiple supported versions
- Large teams with formal release management
- Enterprise software development
- Desktop or mobile applications

## Trunk-Based Development

Developers work on short-lived branches (or directly on trunk) and integrate frequently, often multiple times per day.

### How It Works

**Short-Lived Branches**:

```bash
# Create very short-lived branch
git checkout -b fix-validation main

# Make small change
git commit -am "Fix email validation regex"

# Immediately push and merge
git push -u origin fix-validation
# Create PR, get quick review, merge within hours
```

**Direct Commits** (for small changes):

```bash
# Small changes can go directly to main
git checkout main
git pull
# Make small change
git commit -am "Update copyright year"
git push
```

### Key Practices

**Feature Flags**: Use feature toggles to hide incomplete features:

```javascript
if (featureFlags.newCheckout) {
  // New checkout flow (in development)
} else {
  // Existing checkout flow
}
```

This allows incomplete features in production without exposing them to users.

**Branch by Abstraction**: Gradually replace implementations without long-lived branches:

1. Create abstraction layer
2. Migrate to new implementation incrementally
3. Remove old implementation
4. Remove abstraction if no longer needed

### Advantages

- Minimal merge conflicts
- Continuous integration is natural
- Simplified branch management
- Fast feedback loops
- Encourages small, incremental changes

### Disadvantages

- Requires robust automated testing
- Feature flags add complexity
- Not suited for scheduled releases
- Demands team discipline and maturity

### Best For

- Continuous deployment environments
- Teams with strong CI/CD practices
- Web applications with frequent updates
- Organizations embracing DevOps culture
- High-trust, experienced teams

## Forking Workflow

Common in open source, each developer has a server-side fork. Changes are integrated via pull requests from forks to the main repository.

### How It Works

1. Fork the upstream repository
2. Clone your fork locally
3. Create feature branch in your fork
4. Push to your fork
5. Create pull request to upstream

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/yourname/project.git
cd project

# Add upstream remote
git remote add upstream https://github.com/original/project.git

# Create feature branch
git checkout -b feature/improvement

# Make changes and push to your fork
git commit -am "Add improvement"
git push origin feature/improvement

# Create pull request on GitHub from your fork to upstream

# Keep your fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Advantages

- No direct commit access required
- Safe for public contributions
- Clear separation between official and contributed code
- Easy to isolate and review external contributions
- Maintainers have full control

### Disadvantages

- More complex setup
- Additional remotes to manage
- Overhead for internal teams
- Synchronization challenges

### Best For

- Open source projects
- Projects with external contributors
- Organizations with contractors
- Projects requiring strict access control

## Choosing a Workflow

Consider these factors:

**Team Size**:
- Small (1-5): Feature branch or centralized
- Medium (5-20): Feature branch or Gitflow
- Large (20+): Trunk-based or Gitflow with strong tooling

**Release Cadence**:
- Continuous deployment: Trunk-based
- Weekly/biweekly: Feature branch
- Monthly/quarterly: Gitflow

**Team Experience**:
- Beginners: Centralized or simple feature branch
- Intermediate: Feature branch or Gitflow
- Advanced: Trunk-based development

**Project Type**:
- Web applications: Trunk-based or feature branch
- Mobile apps: Gitflow or feature branch
- Enterprise software: Gitflow
- Open source: Forking workflow

## Hybrid Approaches

Many teams combine elements from multiple workflows:

- Gitflow structure with trunk-based frequency
- Feature branches with feature flags
- Forking for external contributors, branching for internal team

The best workflow is one your team will actually follow consistently.

## Conclusion

Git workflows provide structure for collaboration and release management. Feature branch workflow suits most teams, Gitflow handles complex release cycles, and trunk-based development enables continuous deployment. Choose based on your team's size, experience, and release requirements, and be willing to adapt as your needs evolve.
