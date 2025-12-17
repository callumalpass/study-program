# Version Control with Git

## Introduction

Version control is the practice of tracking and managing changes to code over time. Git is the industry-standard version control system, and GitHub (or GitLab, Bitbucket) provides cloud hosting for Git repositories. Effective version control is essential for capstone projects—it protects your work, enables collaboration, and demonstrates professional development practices.

## Learning Objectives

- Understand Git fundamentals and workflows
- Create meaningful commits with clear messages
- Use branches effectively for feature development
- Resolve merge conflicts
- Collaborate using pull requests
- Protect work with proper backup strategies
- Follow Git best practices

## Git Fundamentals

### Repository Structure

```
Working Directory  →  Staging Area  →  Local Repository  →  Remote Repository
  (modified)         (git add)         (git commit)         (git push)
```

### Essential Commands

```bash
# Initialize repository
git init

# Check status
git status

# Add files to staging
git add <file>              # Specific file
git add .                   # All changes
git add -A                  # All changes including deletions

# Commit changes
git commit -m "Commit message"
git commit -m "Title" -m "Description"

# View history
git log
git log --oneline
git log --graph --oneline --all

# View changes
git diff                    # Unstaged changes
git diff --staged          # Staged changes
git diff HEAD              # All changes

# Push to remote
git push
git push origin main

# Pull from remote
git pull
git pull origin main
```

## Commit Best Practices

### Commit Messages

**Good commit message format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Build process, dependencies

**Examples:**

```bash
# Good commits
git commit -m "feat(auth): implement user registration"
git commit -m "fix(api): resolve null pointer in activity endpoint"
git commit -m "docs: add API documentation for activity routes"
git commit -m "refactor(db): extract database logic to repository layer"

# Bad commits (too vague)
git commit -m "fix stuff"
git commit -m "updates"
git commit -m "wip"
```

### When to Commit

**Commit frequently but logically:**

```bash
# ✓ Good commit frequency
git commit -m "feat(ui): add activity form component"
git commit -m "feat(ui): add form validation"
git commit -m "feat(ui): connect form to API"

# ✗ Bad - too large
git commit -m "implement entire activity feature"

# ✗ Bad - too small
git commit -m "add semicolon"
git commit -m "remove space"
```

**Atomic commits:** Each commit should represent one logical change.

## Branching Strategies

### Branch Basics

```bash
# Create branch
git branch feature/user-auth

# Switch to branch
git checkout feature/user-auth

# Create and switch (shorthand)
git checkout -b feature/user-auth

# List branches
git branch                  # Local branches
git branch -a              # All branches including remote

# Delete branch
git branch -d feature/user-auth
git branch -D feature/user-auth  # Force delete
```

### Branch Naming Conventions

```bash
# Features
feature/user-authentication
feature/activity-tracking
feature/data-visualization

# Bug fixes
fix/login-validation
fix/database-connection

# Hotfixes
hotfix/security-vulnerability

# Documentation
docs/api-documentation
docs/readme-update

# Experimental
experiment/new-ui-library
```

### Simple Git Flow for Capstone

```
main (production-ready code)
  ├── develop (integration branch)
      ├── feature/authentication
      ├── feature/dashboard
      └── feature/analytics
```

**Workflow:**

```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Work on feature
git add .
git commit -m "feat: implement X"

# Keep feature updated with develop
git checkout develop
git pull origin develop
git checkout feature/new-feature
git merge develop

# When feature complete
git checkout develop
git merge feature/new-feature
git push origin develop

# Periodically merge to main
git checkout main
git merge develop
git push origin main
```

### Simplified Workflow for Solo Development

```bash
# Work directly on main for small changes
git checkout main
git pull
# make changes
git add .
git commit -m "feat: add feature"
git push

# Use branches for larger features
git checkout -b feature/big-feature
# work on feature
git commit -m "feat: part 1"
git commit -m "feat: part 2"
git checkout main
git merge feature/big-feature
git push
```

## Handling Merge Conflicts

### When Conflicts Occur

```bash
$ git merge feature/auth
Auto-merging src/api/users.ts
CONFLICT (content): Merge conflict in src/api/users.ts
Automatic merge failed; fix conflicts and then commit the result.
```

### Resolving Conflicts

**Conflict markers in file:**

```typescript
<<<<<<< HEAD
export function getUser(id: string) {
  return db.user.findUnique({ where: { id } });
}
=======
export async function getUser(userId: string) {
  return await prisma.user.findUnique({ where: { id: userId } });
}
>>>>>>> feature/auth
```

**Resolution steps:**

1. Open file and find `<<<<<<<` markers
2. Decide which version to keep (or combine both)
3. Remove conflict markers
4. Save file
5. Stage resolved file
6. Complete merge

```typescript
// Resolved version
export async function getUser(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}
```

```bash
git add src/api/users.ts
git commit -m "merge: resolve conflict in users.ts"
```

## Remote Repositories

### Connecting to GitHub

```bash
# Create repository on GitHub first
# Then connect local repository

git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main

# Verify remote
git remote -v
```

### Pushing and Pulling

```bash
# Push changes
git push origin main

# Pull changes
git pull origin main

# Pull with rebase (cleaner history)
git pull --rebase origin main

# Fetch without merging
git fetch origin
```

### SSH Setup (Recommended)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Test connection
ssh -T git@github.com

# Change remote to SSH
git remote set-url origin git@github.com:username/repo.git
```

## Undoing Changes

### Before Committing

```bash
# Unstage files
git restore --staged <file>

# Discard changes in working directory
git restore <file>

# Discard all changes
git restore .
```

### After Committing

```bash
# Amend last commit (change message or add files)
git add forgotten-file.ts
git commit --amend -m "Updated commit message"

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>
```

## .gitignore

**Essential `.gitignore` for Node.js/Next.js:**

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
*.test.js.snap

# Next.js
.next/
out/
build/
dist/

# Production
.vercel
.netlify

# Environment variables
.env
.env.local
.env.*.local
.env.production

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Prisma
prisma/migrations/*_migration.sql
```

## Backup Strategies

### Multiple Remotes

```bash
# Add GitHub as origin
git remote add origin git@github.com:username/capstone.git

# Add GitLab as backup
git remote add backup git@gitlab.com:username/capstone.git

# Push to both
git push origin main
git push backup main

# Create alias to push to both
git remote add all git@github.com:username/capstone.git
git remote set-url --add --push all git@github.com:username/capstone.git
git remote set-url --add --push all git@gitlab.com:username/capstone.git

# Now push to both with
git push all main
```

### Commit Often

```bash
# Commit work at end of each session
git add .
git commit -m "wip: end of day - working on dashboard"
git push

# Even if not complete, save progress
# Better than losing work to hardware failure
```

## GitHub-Specific Features

### Pull Requests

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and push
git add .
git commit -m "feat: implement new feature"
git push -u origin feature/new-feature

# 3. Create PR on GitHub
# Go to repository → Pull Requests → New pull request

# 4. After review and approval, merge PR

# 5. Delete branch locally
git checkout main
git branch -d feature/new-feature
```

### GitHub Actions (CI/CD)

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linter
        run: npm run lint
        
      - name: Type check
        run: npm run type-check
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
```

## Git Workflow Checklist

### Daily Workflow
- [ ] Pull latest changes: `git pull`
- [ ] Create feature branch if needed
- [ ] Make changes
- [ ] Stage changes: `git add`
- [ ] Commit with clear message
- [ ] Push to remote: `git push`

### Feature Development
- [ ] Create feature branch from main/develop
- [ ] Commit changes incrementally
- [ ] Keep branch updated with main
- [ ] Complete feature
- [ ] Create pull request
- [ ] Code review
- [ ] Merge to main
- [ ] Delete feature branch

### End of Session
- [ ] Commit all changes (even WIP)
- [ ] Push to remote
- [ ] Verify on GitHub

## Common Git Mistakes

### Committed Secrets

```bash
# If you committed secrets (.env file):
# 1. Remove from repository
echo ".env" >> .gitignore
git rm --cached .env
git commit -m "remove .env from repository"

# 2. Rotate all exposed secrets immediately
# 3. For sensitive data in history, use git filter-branch or BFG Repo-Cleaner
```

### Large Files

```bash
# Git doesn't handle large files well (>50MB)
# Use .gitignore or Git LFS for large files

# Install Git LFS
git lfs install

# Track large files
git lfs track "*.psd"
git lfs track "*.zip"

# Add .gitattributes
git add .gitattributes
```

## Summary

Essential Git practices:

1. **Commit frequently** with clear, descriptive messages
2. **Use branches** for features and experiments
3. **Push often** to protect against data loss
4. **Write good commit messages** (feat/fix/docs/refactor)
5. **Never commit secrets** (.env, API keys)
6. **Pull before pushing** to avoid conflicts
7. **Use .gitignore** properly

Git protects your work and provides a complete history of your project. It's also evidence of your development process—make your Git history something you're proud to show to evaluators and employers.

## Additional Resources

- Pro Git Book: git-scm.com/book
- GitHub Docs: docs.github.com
- Git Cheat Sheet: education.github.com/git-cheat-sheet-education.pdf
- Atlassian Git Tutorials: atlassian.com/git/tutorials
- Learn Git Branching (interactive): learngitbranching.js.org
