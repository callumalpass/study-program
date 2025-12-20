---
id: cs204-t7-planning
title: "Sprint Planning"
order: 4
---

# Code Reviews

Code reviews are a systematic examination of source code by one or more developers other than the author. This practice has become a cornerstone of modern software development, serving as both a quality assurance mechanism and a knowledge-sharing tool. When done well, code reviews improve code quality, reduce defects, and strengthen team cohesion.

## The Purpose of Code Reviews

Code reviews serve multiple important purposes that extend beyond simply finding bugs.

### Defect Detection

The most obvious benefit is catching bugs and errors before they reach production. Research consistently shows that code reviews find defects at a much lower cost than finding them through testing or after release. Studies suggest that code reviews can detect 60-90% of defects, making them one of the most cost-effective quality practices available.

Reviews catch different types of issues than testing:
- Logic errors that might not be covered by tests
- Edge cases the author did not consider
- Performance problems that might not be apparent in small-scale testing
- Security vulnerabilities that automated tools miss

### Knowledge Sharing

Code reviews distribute knowledge throughout the team. When developers review each other's code, they:
- Learn about different parts of the codebase
- See different approaches to solving problems
- Understand architectural decisions and patterns
- Reduce knowledge silos where only one person understands certain code

This distributed knowledge makes teams more resilient. When developers leave or are unavailable, others can maintain their code because they have seen it during reviews.

### Code Quality and Consistency

Reviews help maintain consistent coding standards across the codebase. Reviewers can identify:
- Violations of team coding standards
- Opportunities to use existing utilities instead of reinventing solutions
- Inconsistencies in naming, structure, or patterns
- Missing documentation or unclear code

This consistency makes the codebase more maintainable. When code follows consistent patterns, developers can navigate and understand it more quickly.

### Mentoring and Growth

Code reviews provide natural mentoring opportunities. Senior developers reviewing junior developers' code can teach best practices and explain the reasoning behind suggestions. Junior developers reviewing senior code learn from example.

This learning goes both ways. Junior developers sometimes spot issues senior developers miss or ask questions that reveal hidden complexity worth simplifying.

### Team Culture

Regular code reviews create accountability and shared ownership. When developers know their code will be reviewed, they tend to be more careful. When everyone reviews everyone else's code, the team develops collective ownership rather than individual code fiefdoms.

## Types of Code Reviews

Different review approaches serve different purposes and contexts.

### Formal Code Inspections

Formal inspections, pioneered by Michael Fagan at IBM, involve structured meetings where reviewers examine code according to a defined process. These inspections have specific roles (moderator, reader, recorder, author) and follow a multi-phase process including planning, preparation, meeting, rework, and follow-up.

Formal inspections are thorough but time-intensive. They are most valuable for critical code where defects have serious consequences, such as safety-critical systems, security components, or core algorithms.

### Pair Programming

In pair programming, two developers work together at one workstation, with one "driving" (typing) and the other "navigating" (reviewing in real-time). While not traditionally considered a code review, pair programming provides continuous review as code is written.

This approach catches issues immediately but requires two developers' full attention. It is particularly valuable for complex or critical code and provides excellent knowledge transfer.

### Over-the-Shoulder Reviews

Over-the-shoulder reviews are informal and lightweight. The author walks a reviewer through the code, explaining the changes. This approach is quick and conversational but lacks formal structure and documentation.

These reviews work well for small changes or when working closely with another developer. However, they do not scale well to distributed teams or provide a record for future reference.

### Tool-Assisted Reviews

Modern development teams typically use tool-assisted reviews, often called "pull request reviews" or "merge request reviews." The author submits code changes through a version control system, and reviewers comment on the code using a web-based interface.

Tools like GitHub, GitLab, Bitbucket, and Gerrit provide:
- Side-by-side diffs showing changes
- Line-by-line commenting
- Conversation threads on specific issues
- Integration with CI/CD pipelines
- Approval workflows before merging

This approach balances thoroughness with efficiency and works well for distributed teams. It provides documentation of review discussions that can be valuable later.

## Effective Review Practices

Successful code reviews require both technical skill and interpersonal awareness.

### For Authors

**Keep Changes Small**: Large pull requests are difficult to review thoroughly. Reviewers suffer from review fatigue when faced with thousands of lines of changes. Aim for pull requests that can be reviewed in 30-60 minutes.

Studies show review effectiveness decreases significantly after 200-400 lines of code. Break large features into smaller, reviewable chunks.

**Provide Context**: Include a clear description of:
- What changes were made
- Why the changes were necessary
- How the changes work
- Any areas where you want specific feedback
- How to test the changes

**Self-Review First**: Review your own code before submitting it. Catch obvious issues yourself rather than wasting reviewers' time. Many developers find that explaining code to an imaginary reviewer helps them spot problems.

**Respond Graciously**: Treat review feedback as valuable input, not personal criticism. Ask questions when feedback is unclear. Disagree respectfully when you have good reasons. Thank reviewers for their time and insights.

**Make Changes Promptly**: Address review feedback quickly while the context is fresh. Delayed responses stall the review process and force reviewers to re-familiarize themselves with the code.

### For Reviewers

**Review Promptly**: Delayed reviews block authors' work and slow the team. Aim to begin reviews within a few hours of submission. Even if you cannot complete the review immediately, acknowledging receipt shows respect for the author's work.

**Focus on Important Issues**: Distinguish between critical problems that must be fixed and minor suggestions that are nice-to-have. Not every inconsistency needs to be pointed out, especially in working code that functions correctly.

Use labels or severity indicators:
- **Critical**: Bugs, security issues, serious design problems
- **Important**: Significant maintainability or performance concerns
- **Minor**: Stylistic preferences, small improvements
- **Question**: Requests for clarification

**Explain Your Reasoning**: Do not just say "This is wrong." Explain why it is problematic and, if possible, suggest better approaches. Educational feedback is more valuable than simple criticism.

Poor: "This code is bad."
Better: "This approach creates a memory leak because the connection is not closed. Consider using a try-with-resources statement to ensure cleanup."

**Be Specific**: Vague feedback like "This seems complicated" does not help the author. Specific feedback like "This method has three levels of nested loops making it hard to follow. Consider extracting the inner loops into separate methods" provides actionable guidance.

**Ask Questions**: Sometimes code that seems wrong is actually correct but unclear. Asking "Why did you choose this approach?" or "Have you considered X?" can be less confrontational than stating "This is wrong."

**Recognize Good Work**: Point out clever solutions and well-written code, not just problems. Positive feedback reinforces good practices and maintains morale.

### For Teams

**Establish Guidelines**: Create and document team review standards covering:
- What reviewers should look for
- How quickly reviews should be completed
- How to handle disagreements
- Coding standards to enforce
- When additional reviewers are needed

**Use Checklists**: Review checklists help ensure consistency and completeness. A checklist might include:
- Does the code do what it claims to do?
- Are there tests covering the new code?
- Does the code follow team standards?
- Is the code understandable?
- Are there obvious bugs or edge cases?
- Are error conditions handled properly?
- Is there adequate documentation?

**Balance Thoroughness and Speed**: Perfect reviews that take days are often worse than good reviews that take hours. Find the balance appropriate for your code's criticality.

**Rotate Reviewers**: Avoid always having the same people review the same code. Rotation spreads knowledge and brings fresh perspectives.

## What to Look For

Effective reviewers develop an eye for common issues.

### Correctness

- Does the code do what it is supposed to do?
- Are there off-by-one errors or boundary conditions?
- Are there race conditions or concurrency issues?
- Are error cases handled properly?
- Could any inputs cause crashes or unexpected behavior?

### Design and Architecture

- Does the code fit the existing architecture?
- Are there better design patterns for this problem?
- Does the code introduce unnecessary coupling?
- Is functionality in the right place?
- Are abstractions at the appropriate level?

### Complexity

- Is the code more complex than necessary?
- Are there deeply nested conditionals or loops?
- Are methods or classes too long?
- Would this code be difficult to modify in the future?

### Testing

- Are there tests for the new code?
- Do tests cover edge cases and error conditions?
- Are tests clear and maintainable?
- Do tests actually test what they claim to test?

### Security

- Could this code be exploited?
- Is input properly validated and sanitized?
- Are credentials or sensitive data properly handled?
- Are there SQL injection, XSS, or other vulnerabilities?

### Performance

- Are there obvious performance problems?
- Could this code cause performance issues at scale?
- Are expensive operations repeated unnecessarily?
- Are resources properly managed?

### Maintainability

- Would another developer understand this code?
- Are names clear and meaningful?
- Is there adequate documentation?
- Are magic numbers or strings explained?
- Does the code follow team conventions?

## Common Pitfalls

### Nitpicking

Focusing excessively on trivial style issues frustrates authors and wastes time. Automated linters and formatters should handle most style concerns, freeing reviewers to focus on logic and design.

If you find yourself arguing about brace placement or variable naming, your team needs automated tooling and agreed-upon standards, not more review comments.

### Ego and Defensiveness

Authors who take feedback personally or reviewers who are condescending create toxic dynamics. Code reviews should be collaborative, not adversarial.

Remember: you are reviewing code, not people. Focus on the work, not the worker.

### Superficial Reviews

Rubber-stamp reviews that approve everything without careful examination provide no value. If you are not finding any issues, either the code is perfect (unlikely) or you are not looking carefully enough.

Quality reviews take time and mental effort. Budget that time appropriately.

### Review Fatigue

Reviewing too much code at once leads to diminishing returns. After reviewing a few hundred lines, attention wanes and issues slip through.

If a pull request is too large to review effectively, ask the author to break it into smaller pieces.

### Blocking on Preferences

Not every difference of opinion needs to be resolved. If code works correctly and is reasonably maintainable, approval should not be blocked because the reviewer would have written it differently.

Save blocking for actual problems, not stylistic preferences.

## Tools and Technology

Modern code review tools integrate with development workflows, making reviews efficient and well-documented.

### Pull Request Platforms

GitHub, GitLab, and Bitbucket provide web-based review interfaces where:
- Changes are displayed with syntax highlighting
- Reviewers can comment on specific lines
- Conversations track resolution of issues
- Automated checks integrate with the review
- Approvals are tracked and enforced

### Code Analysis Tools

Automated tools can handle many review tasks:
- **Linters** enforce coding standards
- **Static analysis** tools find potential bugs
- **Security scanners** identify vulnerabilities
- **Coverage tools** show untested code
- **Complexity analyzers** flag overly complex code

Integrating these tools into the review process frees human reviewers to focus on higher-level concerns.

### Review Metrics

Teams can track metrics to improve their review process:
- Time to first review
- Time to merge
- Number of review cycles
- Comments per review
- Defects found in review vs. production

These metrics can reveal process problems but should be used carefully. Gaming metrics (e.g., approving quickly to improve time-to-review) defeats their purpose.

## Code Reviews and Culture

Effective code reviews require a culture of trust, learning, and collective ownership. Teams with healthy review cultures:
- View reviews as learning opportunities, not tests
- Give and receive feedback gracefully
- Share ownership of code quality
- Respect each other's time and effort

Building this culture takes time and conscious effort. Lead by example, address toxic behavior quickly, and celebrate when reviews lead to improvements and learning.

When done well, code reviews become one of the most valuable practices in a team's development process, improving not just code quality but team cohesion and individual growth.
