# Collaboration with Git

Effective collaboration is essential in modern software development. Git provides powerful tools for working together, but success requires understanding pull requests, code reviews, conflict resolution, and team communication practices.

## Pull Requests

Pull requests (PRs) or merge requests (MRs in GitLab) are the primary mechanism for proposing, reviewing, and integrating changes in collaborative development.

### What is a Pull Request?

A pull request is a request to merge code from one branch into another. It creates a forum for discussion, review, and refinement before integration.

A PR typically includes:
- Source and target branches
- Description of changes and motivation
- Commits included in the PR
- Diff showing exact code changes
- Discussion thread for comments
- Status checks from CI/CD pipelines

### Creating a Pull Request

After pushing your branch to the remote repository:

```bash
git checkout -b feature/user-profile
# Make changes
git add .
git commit -m "Add user profile page with avatar upload"
git push -u origin feature/user-profile
```

On GitHub/GitLab/Bitbucket:
1. Navigate to your repository
2. Click "New Pull Request" or "Create Merge Request"
3. Select source branch (your feature) and target branch (usually main)
4. Write a descriptive title and description
5. Assign reviewers
6. Create the PR

### Writing Good PR Descriptions

A well-written PR description helps reviewers understand your changes:

```markdown
## Summary
Implements user profile page with avatar upload functionality.

## Changes
- Add ProfilePage component with form validation
- Implement avatar upload to S3
- Add user profile API endpoints
- Update navigation to include profile link

## Testing
- Tested avatar upload with files up to 5MB
- Verified form validation for required fields
- Tested on Chrome, Firefox, Safari

## Screenshots
[Include before/after screenshots for UI changes]

## Related Issues
Closes #123
Related to #456
```

### PR Best Practices

**Keep PRs Small**: Smaller PRs are easier to review and less likely to introduce bugs. Aim for 200-400 lines of changes when possible.

**One Purpose Per PR**: Each PR should address a single concern. Don't mix refactoring with new features.

**Provide Context**: Explain why the change is needed, not just what changed.

**Update Regularly**: Rebase or merge from the target branch regularly to minimize conflicts.

**Respond to Feedback**: Address reviewer comments promptly and thoughtfully.

**Self-Review First**: Review your own changes before requesting others' time.

## Code Reviews

Code review is the practice of having teammates examine code changes before integration. It improves code quality, shares knowledge, and catches bugs early.

### Benefits of Code Review

**Quality Improvement**: Catches bugs, security issues, and design problems before they reach production.

**Knowledge Sharing**: Spreads understanding of the codebase across the team.

**Mentorship**: Provides learning opportunities for junior developers.

**Code Consistency**: Ensures adherence to team standards and conventions.

**Collective Ownership**: Increases team responsibility for code quality.

### Reviewing Code Effectively

**Understand the Context**: Read the PR description and related issues before examining code.

**Focus on Important Issues**: Prioritize correctness, security, performance, and maintainability over style preferences.

**Be Constructive**: Suggest improvements rather than just pointing out problems.

```
❌ "This is wrong."
✅ "Consider using Array.map() here for better readability and functional style."
```

**Ask Questions**: If something is unclear, ask rather than assume.

```
"Can you explain why you chose this approach over using the existing UserService?"
```

**Appreciate Good Work**: Recognize clever solutions and improvements.

```
"Nice use of memoization here to avoid unnecessary recalculations!"
```

**Provide Examples**: When suggesting changes, show code examples when helpful.

```
Consider extracting this into a utility function:

function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}
```

**Check for Common Issues**:
- Security vulnerabilities
- Performance bottlenecks
- Error handling
- Edge cases
- Test coverage
- Documentation

### Review Checklist

**Functionality**:
- [ ] Does it solve the stated problem?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?

**Code Quality**:
- [ ] Is the code readable and maintainable?
- [ ] Are functions and variables well-named?
- [ ] Is complexity justified?
- [ ] Are there duplications that should be refactored?

**Testing**:
- [ ] Are there appropriate tests?
- [ ] Do tests cover edge cases?
- [ ] Are tests clear and maintainable?

**Security**:
- [ ] Are inputs validated and sanitized?
- [ ] Are authentication and authorization correct?
- [ ] Are secrets properly handled?

**Documentation**:
- [ ] Are complex parts documented?
- [ ] Are API changes reflected in docs?
- [ ] Are commit messages clear?

### Receiving Code Review Feedback

**Don't Take It Personally**: Reviews critique code, not people. Separate your ego from your code.

**Ask for Clarification**: If feedback is unclear, ask questions.

**Consider All Suggestions**: Even if you disagree initially, think through the feedback.

**Explain Your Reasoning**: If you disagree with a suggestion, explain why respectfully.

**Make Changes Promptly**: Respond to feedback quickly to keep the PR moving.

**Thank Reviewers**: Appreciate the time reviewers invest in improving your code.

## Merge Conflicts

Merge conflicts occur when the same part of a file has been modified differently in two branches. Git can't automatically resolve these and requires human intervention.

### How Conflicts Arise

```
main:         A---B---C
                   \
feature:            D---E

If both C and E modify the same lines of file.txt, merging causes a conflict.
```

### Conflict Example

When you attempt to merge or pull:

```bash
git pull origin main
# or
git merge feature-branch
```

Git reports conflicts:

```
Auto-merging src/utils.js
CONFLICT (content): Merge conflict in src/utils.js
Automatic merge failed; fix conflicts and then commit the result.
```

The conflicted file contains conflict markers:

```javascript
function calculateTotal(items) {
  let total = 0;
<<<<<<< HEAD
  for (const item of items) {
    total += item.price * item.quantity;
  }
=======
  items.forEach(item => {
    total += item.price * (item.quantity || 1);
  });
>>>>>>> feature-branch
  return total;
}
```

**Breakdown**:
- `<<<<<<< HEAD`: Start of your current branch's version
- `=======`: Separator
- `>>>>>>> feature-branch`: End of the merging branch's version

### Resolving Conflicts

#### Manual Resolution

1. Open the conflicted file
2. Examine both versions
3. Decide which changes to keep or combine both
4. Remove conflict markers
5. Test the resolved code
6. Stage the resolved file

```javascript
// Resolved version combining both approaches
function calculateTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.price * (item.quantity || 1);
  });
  return total;
}
```

Then:

```bash
git add src/utils.js
git commit -m "Resolve merge conflict in calculateTotal"
```

#### Using Merge Tools

Git supports visual merge tools:

```bash
git mergetool
```

This launches a configured tool (e.g., vimdiff, meld, kdiff3, P4Merge) showing:
- Local version (your changes)
- Remote version (their changes)
- Base version (common ancestor)
- Result (where you create the merged version)

Configure a merge tool:

```bash
git config --global merge.tool meld
git config --global mergetool.meld.path "/usr/bin/meld"
```

### Preventing Conflicts

**Pull Frequently**: Stay synchronized with the main branch.

```bash
git checkout feature-branch
git pull origin main
```

**Keep Branches Short-Lived**: Merge feature branches quickly to minimize divergence.

**Communicate**: Coordinate with teammates when working on related code.

**Small, Focused Commits**: Easier to understand and resolve if conflicts occur.

**Rebase Instead of Merge** (for feature branches):

```bash
git checkout feature-branch
git rebase main
```

Rebasing replays your commits on top of main, creating a linear history and catching conflicts earlier.

### Aborting a Merge

If conflict resolution becomes too complex:

```bash
git merge --abort
```

This returns to the state before the merge attempt.

## Collaboration Workflows

### Distributed Teams

**Asynchronous Communication**: Document decisions in PR comments for different timezones.

**Clear Expectations**: Define response time expectations for reviews.

**Comprehensive Descriptions**: Write detailed PR descriptions since you can't easily ask clarifying questions in real-time.

### Pair Programming with Git

Even when pair programming, commit regularly:

```bash
# Co-authoring commits
git commit -m "Implement feature X

Co-authored-by: Jane Smith <jane@example.com>"
```

GitHub recognizes this format and credits both authors.

### Protected Branches

Configure branch protection rules to enforce quality:

- Require pull request reviews before merging
- Require status checks to pass
- Require branches to be up to date
- Enforce linear history
- Restrict who can push to the branch

On GitHub: Settings → Branches → Branch protection rules

### Continuous Integration

Integrate automated checks into PRs:

```yaml
# .github/workflows/pr-checks.yml
name: PR Checks
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
      - name: Run linter
        run: npm run lint
```

This ensures every PR passes tests and linting before review.

## Communication Best Practices

**Be Respectful**: Critique code, not people. Use collaborative language ("we could", "let's") rather than accusatory language.

**Be Specific**: "This could be more efficient" is less helpful than "Consider using a Set instead of an array for O(1) lookups."

**Assume Good Intent**: Presume authors made choices for reasons, even if not immediately obvious.

**Balance Perfection and Progress**: Don't let perfect be the enemy of good. Small improvements can happen in follow-up PRs.

**Document Decisions**: Use PR comments to record why certain approaches were chosen for future reference.

**Use Draft PRs**: Create draft/WIP pull requests for early feedback on approach before completing implementation.

## Conclusion

Successful collaboration requires more than Git commands—it demands clear communication, thoughtful code review, and respectful interaction. Pull requests provide structure for proposing changes, code reviews ensure quality, and conflict resolution skills keep development flowing. By following these practices, teams can collaborate effectively and maintain high-quality codebases.
