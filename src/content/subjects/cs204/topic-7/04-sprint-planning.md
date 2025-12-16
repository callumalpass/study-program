# Sprint Planning

Sprint planning is a critical ceremony in Scrum where the team determines what work can be accomplished in the upcoming sprint and how that work will be achieved. Effective sprint planning sets the team up for a successful sprint.

## Purpose of Sprint Planning

### Goals of the Ceremony

**Establish Sprint Goal:**
- Define a coherent objective for the sprint
- Create focus for the team's efforts
- Enable flexibility in how work is accomplished
- Provide direction when making tradeoffs

**Select Sprint Backlog:**
- Choose which product backlog items to work on
- Match work to team capacity
- Ensure items are ready for development
- Create commitment (or forecast) for the sprint

**Create Initial Plan:**
- Break stories into tasks
- Identify dependencies
- Discuss technical approach
- Surface risks and unknowns

## The Sprint Planning Meeting

### Structure and Timeboxes

Sprint planning is timeboxed based on sprint length:
- 2-week sprint: 4 hours maximum
- 1-week sprint: 2 hours maximum
- 4-week sprint: 8 hours maximum

**Typical Agenda:**
```
Sprint Planning Agenda (2-week sprint)

Part 1: What can be done? (2 hours)
- Product Owner presents prioritized backlog
- Team discusses and clarifies items
- Team selects items for the sprint
- Sprint goal is defined

Part 2: How will it be done? (2 hours)
- Team breaks items into tasks
- Technical approach discussed
- Dependencies identified
- Initial task assignments
```

### Participants and Roles

**Product Owner:**
- Presents the prioritized backlog
- Answers questions about requirements
- Clarifies acceptance criteria
- Negotiates scope based on capacity
- Helps define the sprint goal

**Scrum Master:**
- Facilitates the meeting
- Ensures timebox is respected
- Helps resolve impediments
- Coaches the team on process
- Documents outcomes

**Development Team:**
- Asks clarifying questions
- Estimates effort
- Selects items they can commit to
- Breaks work into tasks
- Identifies technical risks

## Part 1: Selecting Sprint Backlog Items

### Prerequisites: Backlog Refinement

Before sprint planning, items should already be refined:

**Definition of Ready:**
```
A product backlog item is ready when:
- User story is clearly written
- Acceptance criteria are defined
- Dependencies are identified
- Story is estimated (story points)
- Story is small enough for one sprint
- Technical approach is understood
- Questions have been answered
```

### Capacity Planning

**Calculate Team Capacity:**
```
Capacity Calculation Example:

Team: 5 developers
Sprint length: 10 working days
Average focus factor: 70%

Available hours per person: 8 hrs/day x 10 days = 80 hours
Adjusted for meetings, support: 80 x 0.7 = 56 hours
Total team capacity: 5 x 56 = 280 hours

Adjustments:
- Alice: 3 days vacation -> -24 hours
- Bob: 2 days training -> -16 hours
Adjusted capacity: 280 - 40 = 240 hours
```

**Using Velocity:**
```
Historical Velocity (story points per sprint):
Sprint 1: 32 points
Sprint 2: 28 points
Sprint 3: 35 points
Sprint 4: 30 points

Average velocity: 31 points
Range: 28-35 points

Sprint 5 capacity: Plan for 28-32 points
(Conservative estimate accounting for uncertainty)
```

### Selecting Items

**Process:**
1. Product Owner presents highest priority items
2. Team asks clarifying questions
3. Team confirms understanding of acceptance criteria
4. Team determines if item can fit in sprint
5. Team pulls items until capacity is reached

**Example Discussion:**
```
Product Owner: "The next priority is user password reset.
               Users need to reset their password via email."

Developer: "What's the expiration time for reset links?"

Product Owner: "24 hours."

Developer: "Do we need rate limiting to prevent abuse?"

Product Owner: "Yes, limit to 3 requests per hour."

Developer: "Given our current capacity of 30 points,
           and this story is 8 points, we can take it.
           That leaves 22 points for other items."
```

### Defining the Sprint Goal

**Characteristics of a Good Sprint Goal:**
- Provides cohesive focus
- Is achievable within the sprint
- Supports the product vision
- Creates team commitment
- Allows flexibility in implementation

**Examples:**

Poor Sprint Goals:
- "Complete the sprint backlog" (too vague)
- "Fix all bugs" (no clear measure of success)
- "Make progress on features" (not specific)

Good Sprint Goals:
- "Enable users to reset their passwords securely"
- "Launch basic search functionality for products"
- "Improve checkout page load time to under 2 seconds"
- "Complete the integration with payment gateway"

## Part 2: Planning the Work

### Task Breakdown

**Breaking Stories into Tasks:**

```
User Story: As a user, I want to reset my password
           via email so I can regain account access.

Tasks:
1. Design password reset email template (2h)
2. Create forgot password API endpoint (4h)
3. Implement email sending service (3h)
4. Create reset token generation and storage (3h)
5. Build password reset form UI (4h)
6. Implement password update API endpoint (3h)
7. Add rate limiting for reset requests (2h)
8. Write unit tests for password reset logic (3h)
9. Write integration tests for reset flow (2h)
10. Update user documentation (1h)

Total: 27 hours
Story point estimate: 8 points
```

### Technical Design Discussion

**Questions to Address:**
- What's the overall technical approach?
- Are there multiple viable implementations?
- What are the risks and unknowns?
- Are there dependencies on other teams or systems?
- What needs to be tested?
- Are there performance considerations?

**Example Discussion:**
```
Developer A: "For the reset token, should we use a
            UUID or a signed JWT?"

Developer B: "JWT is self-validating, but UUID is simpler.
            Since we need to revoke tokens, UUID stored
            in the database makes more sense."

Developer A: "Agreed. We should also add an index on
            the token column for lookup performance."

Developer C: "Don't forget we need to handle the case
            where the user doesn't exist - we shouldn't
            reveal whether an email is registered."
```

### Identifying Dependencies

**Internal Dependencies:**
```
Sprint Backlog Dependencies

[Password Reset] -> [Email Service]
                    (Email service must be deployed first)

[Search Feature] -> [Indexing Task]
                    (Can work in parallel, integration last)

[Mobile App Update] -> [API Changes]
                       (API must be deployed before app store submission)
```

**External Dependencies:**
- Third-party service availability
- Other team deliverables
- Infrastructure changes
- Security review requirements
- Design approvals

### Risk Identification

**Common Risks:**
```
Risk Register for Sprint

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Email service rate limits | Medium | High | Test with provider limits |
| Design changes mid-sprint | Low | Medium | Get final approval before starting |
| Integration complexity | High | Medium | Spike first day |
| Team member illness | Low | High | Cross-train on critical items |
```

## Sprint Planning Outputs

### Sprint Backlog

The sprint backlog includes:
- Selected product backlog items
- Tasks for each item
- Initial task assignments
- Estimated effort for tasks

**Example Sprint Backlog:**
```
Sprint 7 Backlog (Goal: Enable secure password reset)

1. Password Reset Feature (8 points)
   - Design email template [Alice] [2h] [To Do]
   - Create forgot password endpoint [Bob] [4h] [To Do]
   - Implement email service [Alice] [3h] [To Do]
   - Create reset token logic [Bob] [3h] [To Do]
   - Build reset form UI [Carol] [4h] [To Do]
   - Implement password update [Bob] [3h] [To Do]
   - Add rate limiting [Dave] [2h] [To Do]
   - Unit tests [Dave] [3h] [To Do]
   - Integration tests [Carol] [2h] [To Do]
   - Documentation [Alice] [1h] [To Do]

2. Search Functionality (13 points)
   - [Tasks...]

3. Performance Improvement (5 points)
   - [Tasks...]

Total: 26 points
Capacity: 28 points
Buffer: 2 points
```

### Sprint Board Setup

```
Sprint 7 Board

| To Do | In Progress | Review | Done |
|-------|-------------|--------|------|
| [Design email] | | | |
| [Create endpoint] | | | |
| [Email service] | | | |
| [Token logic] | | | |
| [Reset form] | | | |
| ... | | | |
```

## Common Sprint Planning Challenges

### Problem: Items Not Ready

**Symptoms:**
- Too many questions during planning
- Unclear acceptance criteria
- Missing estimates

**Solutions:**
- Strengthen backlog refinement process
- Use Definition of Ready checklist
- Don't pull unready items into sprint
- Schedule refinement mid-sprint

### Problem: Overcommitment

**Symptoms:**
- Sprint goals consistently missed
- Quality suffers to meet commitments
- Team stress and burnout

**Solutions:**
- Use historical velocity
- Build in buffer for unknowns
- Learn to say no
- Track and learn from past sprints

### Problem: No Clear Sprint Goal

**Symptoms:**
- Team lacks focus
- Difficult to make tradeoffs
- Sprint feels like random tasks

**Solutions:**
- Product Owner defines goal before planning
- Goal should connect to product vision
- Reject sprints without coherent goal
- All items should relate to goal

### Problem: Planning Takes Too Long

**Symptoms:**
- Exceeds timebox
- Team loses focus
- Decisions get relitigated

**Solutions:**
- Better backlog refinement
- Experienced facilitator
- Prepare materials in advance
- Enforce timebox strictly

## Distributed Team Considerations

**Remote Sprint Planning:**
```
Best Practices for Remote Planning:

1. Shared Tools
   - Video conferencing (cameras on)
   - Digital whiteboard (Miro, Mural)
   - Sprint backlog tool (Jira, Azure DevOps)

2. Preparation
   - Share backlog items in advance
   - Pre-record product owner presentations
   - Set clear agenda and timeboxes

3. Facilitation
   - More frequent check-ins
   - Explicit turn-taking for questions
   - Breakout rooms for task breakdown
   - Document decisions in real-time

4. Time Zones
   - Rotate meeting times if needed
   - Record sessions for absent members
   - Allow asynchronous clarifications
```

## Summary

Sprint planning is the foundation for a successful sprint. By bringing together the Product Owner, Scrum Master, and Development Team, the ceremony establishes what will be accomplished (sprint goal), which items will be worked on (sprint backlog), and how the work will be done (task breakdown). Effective sprint planning requires prepared backlogs, honest capacity assessment, clear sprint goals, and collaborative technical discussion. When done well, sprint planning creates shared understanding and commitment, setting the team up to deliver value predictably and sustainably.
