---
id: cs204-t7-stories
title: "User Stories"
order: 3
---

# User Stories

User stories are a fundamental practice in Agile software development for capturing requirements from an end-user perspective. Rather than lengthy specification documents, user stories provide lightweight, conversational descriptions of functionality that promote collaboration and flexibility.

## Understanding User Stories

A user story is a short, simple description of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system. The user story format shifts focus from writing about features to discussing them. Stories emphasize verbal communication and collaboration over comprehensive documentation.

Ron Jeffries described user stories using the "Three Cs":
- **Card**: The written story, traditionally on an index card
- **Conversation**: Discussions about the story that flesh out details
- **Confirmation**: Tests that verify the story is complete and correct

This formulation emphasizes that the written story is just a placeholder for ongoing conversation. The card serves as a reminder to have a conversation, not as complete specification. The confirmation (acceptance criteria) provides concrete evidence that the story is done.

## The User Story Format

The most common user story template follows this structure:

**As a [type of user], I want [some goal] so that [some reason].**

This format ensures stories focus on:
- **Who** wants the functionality (the user role)
- **What** they want (the capability or goal)
- **Why** they want it (the benefit or value)

### Examples

**Good User Story:**
As a registered user, I want to reset my password via email so that I can regain access to my account if I forget my password.

This story clearly identifies the user type (registered user), the desired capability (reset password via email), and the value (regain account access).

**Poor User Story:**
The system shall implement a password reset feature.

This technical requirement fails to identify who wants the feature or why it matters. It focuses on system implementation rather than user value.

### When to Deviate from the Template

While the standard template is useful, it is not sacred. Some teams use alternatives:
- **As a [user], I can [capability]** - Simpler but loses the explicit "why"
- **In order to [benefit], as a [user], I want [capability]** - Leads with value
- Job stories: **When [situation], I want to [motivation], so I can [expected outcome]** - Focuses more on context

The key is maintaining focus on user perspective and value, not rigidly adhering to a particular template.

## INVEST Criteria

Bill Wake developed the INVEST acronym to describe qualities of good user stories:

### Independent

Stories should be as independent as possible from other stories. Dependencies between stories create problems for prioritization, estimation, and planning. When story A must be completed before story B can be started, the team loses flexibility.

Independence is not always achievable, but minimizing dependencies improves agility. Techniques for increasing independence include:
- Combining dependent stories
- Finding different ways to split stories that eliminate dependencies
- Accepting some dependencies but making them explicit

### Negotiable

Stories are not explicit contracts or detailed requirements. They are negotiable and can be refined through conversation. The details of implementation should be left open until the team is ready to implement the story, allowing for the latest information and creative solutions.

A story that is too specific (e.g., "The button must be 50 pixels wide and colored #FF0000") is not negotiable and constrains implementation unnecessarily. Better: "Users need a clearly visible button to submit the form."

### Valuable

Each story must deliver value to users or customers. Stories should not be written from a purely technical perspective ("Implement a caching layer") but from a value perspective ("As a user, I want pages to load quickly so I can complete my work efficiently").

If you cannot articulate who benefits and how they benefit, the story likely needs rework. Sometimes technical stories are necessary, but even these should connect to user value.

### Estimable

The team must be able to estimate the story's size or effort. If a story cannot be estimated, it usually indicates:
- The story is too vague or poorly understood
- The team lacks knowledge needed to implement it
- The story is too large and complex

Solutions include discussing the story to improve understanding, conducting a spike (time-boxed research), or breaking the story into smaller pieces.

### Small

Stories should be small enough to plan, prioritize, and implement within a single iteration. A story too large to complete in one iteration is called an "epic" and should be broken down into smaller stories.

How small is small enough? That depends on iteration length and team capacity, but generally stories should represent a few days of work at most. Smaller stories:
- Provide more planning flexibility
- Reduce risk
- Provide faster feedback
- Are easier to estimate accurately

### Testable

The team must be able to verify that the story is complete and correct. This requires clear acceptance criteria (discussed below). If a story cannot be tested, it is usually too vague.

Non-testable: "The system should be user-friendly."
Testable: "A new user can complete the registration process in under two minutes without assistance."

## Writing Effective User Stories

Effective user stories require practice and attention to several key aspects.

### Focus on the User

Always write from the user's perspective, not the system's or developer's perspective. Think about what the user is trying to accomplish and why they care.

Consider different user roles. A system might have end users, administrators, managers, and other stakeholders, each with different needs and perspectives. Explicitly identifying the user type helps clarify requirements.

### Emphasize Value

The "so that" clause should articulate genuine value, not simply restate the want. Poor: "As a user, I want to click a logout button so that I can log out." Better: "As a user, I want to log out so that I can protect my account when using a shared computer."

Understanding the value helps the team find the best solution. Sometimes there are better ways to achieve the desired outcome than the initially suggested approach.

### Keep Stories Small

Large stories (epics) should be split into smaller stories. Common splitting patterns include:

**By workflow steps**: Break a process into discrete steps
- Original: "As a user, I want to purchase a product"
- Split: Multiple stories for browsing, adding to cart, checkout, payment, confirmation

**By data variations**: Handle different data types separately
- Original: "As a user, I want to import data"
- Split: Import CSV, import Excel, import JSON

**By operations**: Separate create, read, update, delete
- Original: "As an admin, I want to manage users"
- Split: Create user, view users, edit user, delete user

**By business rules**: Handle simple cases first, complex cases later
- Original: "As a user, I want to calculate shipping costs"
- Split: Domestic standard shipping, then international shipping, then expedited shipping

**By acceptance criteria**: Convert each criterion into its own story when appropriate

### Avoid Technical Language

Stories should be understandable by non-technical stakeholders. Technical implementation details belong in conversations and tasks, not in the story itself.

Poor: "As a developer, I want to refactor the authentication module to use OAuth 2.0"
Better: "As a user, I want to log in using my Google account so that I do not need to remember another password"

## Acceptance Criteria

Acceptance criteria define the boundaries of a user story and are used to confirm when the story is complete and working as intended. They are the "confirmation" in the Three Cs.

### Characteristics of Good Acceptance Criteria

**Specific and Unambiguous**: Criteria should be clear enough that anyone can verify them without interpretation.

**Testable**: Each criterion should be verifiable through testing or demonstration.

**Complete**: Collectively, the criteria should fully define the story's scope.

**Concise**: Avoid unnecessary detail that constrains implementation.

### Formats for Acceptance Criteria

**Scenario-Based (Given-When-Then)**:
```
Given [some context or initial state]
When [some action is performed]
Then [some observable outcome occurs]
```

Example for a login story:
```
Given I am a registered user with correct credentials
When I enter my username and password and click "Log In"
Then I am taken to my dashboard

Given I am a registered user with incorrect password
When I enter my username and wrong password and click "Log In"
Then I see an error message "Invalid username or password"
And I remain on the login page
```

This format, popularized by Behavior-Driven Development (BDD), is excellent for clarifying the expected behavior in different scenarios.

**Checklist Format**:
- User can select items from the product catalog
- Selected items appear in the shopping cart
- Cart displays the quantity and price for each item
- Cart shows the total price
- User can remove items from the cart
- Cart persists across browser sessions

This simpler format works well for straightforward stories where scenarios are not needed.

### Writing Acceptance Criteria

Acceptance criteria should be written collaboratively, typically during story refinement or planning. The Product Owner typically leads this effort with input from the team.

Good criteria focus on what should happen, not how it should be implemented. They describe observable behavior from the user's perspective.

Avoid:
- Implementation details ("using SHA-256 encryption")
- Vague statements ("should be fast", "user-friendly")
- Exhaustive lists that cover every possible case

Include:
- Normal workflows (the happy path)
- Key alternative workflows
- Important boundary conditions
- Validation and error cases

## Story Refinement

Story refinement (also called backlog grooming) is the ongoing process of reviewing, updating, and improving user stories. This is not a one-time activity but continuous work throughout the project.

During refinement:
- Large stories are split into smaller ones
- Vague stories are clarified through discussion
- Acceptance criteria are defined or updated
- Stories are estimated
- Dependencies are identified
- Stories are re-ordered by priority

Refined stories are "ready" for implementation. Many teams use a Definition of Ready checklist:
- Story follows the user story format
- Acceptance criteria are defined
- Story is sized appropriately
- Dependencies are identified
- Team understands the story well enough to estimate and implement

## Common Pitfalls

### Too Much Detail Too Soon

Writing stories with excessive detail upfront defeats the purpose of user stories. Details should emerge through conversation as implementation approaches. Premature detail leads to wasted effort when requirements change and constrains creative solutions.

### Technical Stories That Ignore Users

While some technical work is necessary, framing everything from a user perspective keeps the team focused on value. Even architectural work can be framed in terms of user benefits (performance, reliability, etc.).

### Not Involving the Team

Writing stories in isolation and handing them to the team misses opportunities for insight and buy-in. The best stories emerge from collaboration between Product Owner, team, and stakeholders.

### Treating Stories as Contracts

Stories are starting points for conversation, not rigid contracts. Treating them as fixed requirements prevents the team from adapting to new information and finding better solutions.

## User Stories in Practice

User stories succeed when teams embrace their collaborative nature. The written story is important, but the conversations around it matter more. Teams that focus too heavily on the written artifact and neglect the conversation miss much of the value.

Effective use of user stories requires:
- Regular communication between Product Owner and team
- Willingness to refine and improve stories continuously
- Focus on delivering value, not just completing tasks
- Acceptance that stories will evolve as understanding grows

When used well, user stories provide just enough structure to guide development while maintaining the flexibility that makes Agile approaches powerful.
