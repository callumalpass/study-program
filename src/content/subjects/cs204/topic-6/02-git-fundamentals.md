# Git Fundamentals

Git is the dominant distributed version control system in modern software development. Created by Linus Torvalds in 2005 for Linux kernel development, Git has become the de facto standard for version control across all types of projects.

## Git's Architecture

Git uses a snapshot-based model rather than tracking file differences. Each commit stores a complete snapshot of your project, though Git is smart about storage efficiency through compression and object sharing.

### The Three States

Files in Git can exist in three states:

**Modified**: You've changed the file but haven't committed it yet.

**Staged**: You've marked a modified file to go into your next commit snapshot.

**Committed**: The data is safely stored in your local repository.

This leads to three main sections of a Git project:

```
Working Directory  →  Staging Area  →  Repository
    (modify)         (stage/add)      (commit)
```

### The Object Database

Git stores everything as objects identified by SHA-1 hashes:

**Blob**: Stores file contents
**Tree**: Stores directory structure
**Commit**: Stores metadata and points to tree
**Tag**: Stores named references to commits

## Getting Started with Git

### Initial Configuration

Before using Git, configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Set your preferred editor:

```bash
git config --global core.editor "vim"
```

View your configuration:

```bash
git config --list
```

### Creating a Repository

Initialize a new repository in the current directory:

```bash
git init
```

This creates a `.git` directory containing all repository metadata and object database.

Clone an existing repository:

```bash
git clone https://github.com/user/repo.git
```

Cloning creates a local copy of the entire repository including all history.

## Working with Git

### Checking Status

The `git status` command shows the state of your working directory and staging area:

```bash
git status
```

Output shows:
- Current branch
- Untracked files (new files Git isn't tracking)
- Modified tracked files
- Staged changes ready to commit

### Staging Changes

The staging area (or "index") is a layer between your working directory and repository. It lets you craft commits precisely.

Add specific files:

```bash
git add filename.txt
```

Add all changes in current directory:

```bash
git add .
```

Add all changes including deletions:

```bash
git add -A
```

Stage only part of a file (interactive mode):

```bash
git add -p filename.txt
```

Remove file from staging (keep modifications):

```bash
git reset HEAD filename.txt
```

### Making Commits

A commit creates a snapshot of staged changes:

```bash
git commit -m "Add user authentication feature"
```

For longer messages, omit `-m` to open your editor:

```bash
git commit
```

Follow this commit message format:

```
Short summary (50 characters or less)

More detailed explanation if needed. Wrap at 72 characters.
Explain the problem this commit solves and why you chose
this solution.

- Bullet points are fine
- Use present tense: "Add feature" not "Added feature"
```

Commit all modified tracked files (skip staging):

```bash
git commit -a -m "Fix bug in login validation"
```

Amend the last commit:

```bash
git commit --amend
```

This is useful for fixing commit messages or adding forgotten files, but avoid amending commits that have been pushed.

### Viewing History

Show commit history:

```bash
git log
```

Compact view (one line per commit):

```bash
git log --oneline
```

Show last 5 commits:

```bash
git log -5
```

Show commits with file changes:

```bash
git log --stat
```

Show commits with full diff:

```bash
git log -p
```

Visual branch graph:

```bash
git log --graph --oneline --all
```

View specific commit:

```bash
git show <commit-hash>
```

## Branching

Branches are pointers to commits. Git's branching is lightweight, making it fast and encouraging frequent use.

### Creating and Switching Branches

Create a new branch:

```bash
git branch feature-login
```

Switch to a branch:

```bash
git checkout feature-login
```

Create and switch in one command:

```bash
git checkout -b feature-login
```

Modern Git also supports:

```bash
git switch feature-login     # Switch to existing branch
git switch -c feature-login  # Create and switch
```

### Listing Branches

Show local branches:

```bash
git branch
```

Show all branches (including remote):

```bash
git branch -a
```

Show branches with last commit:

```bash
git branch -v
```

### Deleting Branches

Delete a merged branch:

```bash
git branch -d feature-login
```

Force delete an unmerged branch:

```bash
git branch -D experimental-feature
```

## Merging

Merging integrates changes from one branch into another.

### Fast-Forward Merge

When the target branch hasn't diverged, Git simply moves the pointer forward:

```bash
git checkout main
git merge feature-login
```

If main hasn't changed since feature-login was created, this is a fast-forward merge.

### Three-Way Merge

When both branches have new commits, Git creates a merge commit:

```bash
git checkout main
git merge feature-login
```

Git automatically merges non-conflicting changes and creates a merge commit with two parents.

### Merge Conflicts

When the same lines have been modified differently, Git cannot auto-merge:

```bash
git merge feature-login
# CONFLICT (content): Merge conflict in file.txt
```

Conflict markers look like:

```
<<<<<<< HEAD
code from current branch
=======
code from merging branch
>>>>>>> feature-login
```

To resolve:
1. Edit the file to resolve conflicts
2. Remove conflict markers
3. Stage the resolved file: `git add file.txt`
4. Complete the merge: `git commit`

Abort a merge in progress:

```bash
git merge --abort
```

## Working with Remotes

Remotes are versions of your repository hosted on servers.

### Managing Remotes

List remotes:

```bash
git remote -v
```

Add a remote:

```bash
git remote add origin https://github.com/user/repo.git
```

Remove a remote:

```bash
git remote remove origin
```

Rename a remote:

```bash
git remote rename origin upstream
```

### Fetching and Pulling

Fetch downloads remote changes without merging:

```bash
git fetch origin
```

This updates your remote-tracking branches (like origin/main) but doesn't modify your working directory.

Pull fetches and merges:

```bash
git pull origin main
```

Equivalent to:

```bash
git fetch origin
git merge origin/main
```

### Pushing

Push local commits to remote:

```bash
git push origin main
```

Push new branch and set upstream:

```bash
git push -u origin feature-login
```

After setting upstream, you can simply use:

```bash
git push
```

## Undoing Changes

### Discard Changes in Working Directory

Discard modifications to a file:

```bash
git checkout -- filename.txt
```

Or with modern Git:

```bash
git restore filename.txt
```

### Unstage Files

Remove file from staging area:

```bash
git reset HEAD filename.txt
```

Or:

```bash
git restore --staged filename.txt
```

### Reverting Commits

Create a new commit that undoes a previous commit:

```bash
git revert <commit-hash>
```

This is safe for commits that have been shared because it doesn't rewrite history.

### Resetting Commits

Move branch pointer to a previous commit:

```bash
git reset --soft HEAD~1   # Keep changes staged
git reset --mixed HEAD~1  # Keep changes unstaged (default)
git reset --hard HEAD~1   # Discard changes completely
```

Warning: `--hard` is destructive and `reset` rewrites history. Avoid on shared branches.

## Ignoring Files

Create a `.gitignore` file to specify files Git should ignore:

```
# Build outputs
*.o
*.class
/build/
/dist/

# Dependencies
/node_modules/
/vendor/

# Environment files
.env
.env.local

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db
```

Patterns use glob matching. Lines starting with `#` are comments.

## Best Practices

**Commit Related Changes**: Each commit should represent one logical change. Don't mix refactoring with feature additions.

**Commit Often**: Frequent small commits are easier to understand and revert than large ones.

**Test Before Committing**: Ensure your code works before committing. Don't commit broken code.

**Use Meaningful Branch Names**: Names like `feature/user-auth` or `fix/login-bug` are better than `new-branch`.

**Keep Commits Focused**: Don't commit unrelated changes together. Use `git add -p` to stage specific changes.

**Write Good Commit Messages**: Future you (and your team) will thank you for clear explanations of why changes were made.

## Conclusion

Git's fundamentals—staging, committing, branching, and merging—form the foundation for all Git workflows. Understanding these core concepts enables you to use Git effectively whether working alone or in large teams. Mastering these basics is essential before exploring advanced features and workflows.
