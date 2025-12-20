# Requirements Gathering

## Introduction

Requirements gathering is the systematic process of discovering, documenting, and validating what your software system must do and how it should perform. This phase transforms your project idea into concrete, actionable specifications that guide development. Poor requirements are a leading cause of project failure—they result in wasted effort, missed expectations, and fundamental misalignment between what's built and what's needed.

For a capstone project, you are often your own stakeholder, but that doesn't diminish the importance of rigorous requirements gathering. You need to translate vague ideas into specific, testable criteria. You must consider not just what you want to build, but what users need, what's technically feasible, and what constraints you face.

## Learning Objectives

By the end of this lesson, you will be able to:

- Distinguish between functional and non-functional requirements
- Elicit requirements through user interviews, surveys, and observation
- Write clear, specific, and testable requirement statements
- Prioritize requirements using established frameworks
- Create user stories and acceptance criteria
- Document requirements in a structured format
- Validate requirements with stakeholders and users
- Manage requirement changes throughout the project

## Types of Requirements

### Functional Requirements

Functional requirements describe what the system should do—the features, behaviors, and functions it must provide:

**Characteristics:**
- Describe specific behaviors or functions
- Define inputs, processing, and outputs
- Specify user interactions
- Detail business rules and logic

**Examples:**
- "The system shall allow users to create an account using email and password"
- "The application shall send a confirmation email within 30 seconds of registration"
- "Users shall be able to filter search results by date, category, and price"
- "The system shall calculate shipping costs based on weight and destination"

**Common Categories:**
- User authentication and authorization
- Data management (create, read, update, delete)
- Business logic and calculations
- Reporting and analytics
- Integration with external systems
- Communication and notifications

### Non-Functional Requirements

Non-functional requirements specify how the system should perform—quality attributes and constraints:

**Performance Requirements:**
- Response time (e.g., "API requests shall respond in under 200ms")
- Throughput (e.g., "System shall handle 1000 concurrent users")
- Resource utilization (e.g., "Application shall use less than 500MB RAM")

**Security Requirements:**
- Authentication mechanisms
- Data encryption standards
- Access control policies
- Privacy compliance (GDPR, CCPA)
- Audit logging

**Usability Requirements:**
- Accessibility standards (WCAG 2.1 Level AA)
- Learning curve expectations
- Error message clarity
- Mobile responsiveness

**Reliability Requirements:**
- Uptime expectations (e.g., "99.9% availability")
- Error rates (e.g., "Less than 0.1% transaction failure rate")
- Data backup and recovery
- Fault tolerance

**Scalability Requirements:**
- User growth projections
- Data volume expectations
- Geographic distribution
- Load balancing needs

**Maintainability Requirements:**
- Code documentation standards
- Deployment frequency
- Update mechanisms
- Technical debt limits

### Constraints

Constraints are limitations imposed on the project:

**Technical Constraints:**
- Must use specific programming languages or frameworks
- Must integrate with existing systems
- Must run on particular platforms or devices
- Must comply with API limitations

**Business Constraints:**
- Budget limitations
- Timeline requirements
- Licensing restrictions
- Regulatory compliance

**Design Constraints:**
- Must follow brand guidelines
- Must be accessible on specific browsers
- Must support specific devices
- Must conform to style standards

## Requirements Elicitation Techniques

### Stakeholder Identification

For capstone projects, stakeholders might include:

**Primary Stakeholders:**
- Yourself (as developer and often user)
- Project advisor or supervisor
- Intended end users
- Project evaluators

**Secondary Stakeholders:**
- Domain experts who can validate ideas
- Potential collaborators
- Future employers (portfolio perspective)

### User Interviews

Conduct structured conversations to understand needs:

**Preparation:**
1. Identify 5-10 potential users
2. Prepare open-ended questions
3. Focus on problems, not solutions
4. Schedule 30-45 minute sessions

**Sample Questions:**
- "Tell me about the last time you encountered [problem]"
- "Walk me through how you currently solve this"
- "What frustrates you most about existing solutions?"
- "What would an ideal solution look like?"
- "What features would you use daily vs. occasionally?"

**Best Practices:**
- Listen more than you talk (80/20 rule)
- Ask "why" to uncover root causes
- Avoid leading questions
- Record sessions (with permission) for later analysis
- Take notes on emotional reactions and pain points

### Surveys and Questionnaires

Gather quantitative data from larger groups:

**Effective Survey Design:**
- Keep it short (5-10 minutes maximum)
- Use a mix of question types (multiple choice, rating scales, open-ended)
- Start with screening questions
- Progress from general to specific
- End with demographic information

**Sample Questions:**
- "How often do you encounter [problem]?" (Daily/Weekly/Monthly/Rarely)
- "On a scale of 1-10, how frustrating is this problem?"
- "Which features would be most valuable to you?" (rank order)
- "What tools do you currently use for this purpose?"

**Distribution:**
- Reddit communities related to your domain
- Social media groups
- University mailing lists
- Online forums and discussion boards

### Observational Studies

Watch users in their natural environment:

**Shadowing:**
- Observe users performing relevant tasks
- Note workarounds and pain points
- Identify inefficiencies and frustrations
- Document context and environmental factors

**Task Analysis:**
- Break down current processes into steps
- Identify bottlenecks and error-prone stages
- Measure time spent on different activities
- Note when users need external help

### Competitive Analysis

Study existing solutions to identify gaps:

**Analysis Framework:**
1. Identify 3-5 competitor or similar products
2. Create feature comparison matrix
3. Read user reviews (especially negative ones)
4. Note pricing and business models
5. Test interfaces and user experiences
6. Document strengths and weaknesses

**Key Questions:**
- What do users love about existing solutions?
- What are common complaints?
- What features are missing or poorly implemented?
- How can you differentiate your solution?

### Brainstorming and Workshops

Generate ideas collaboratively:

**Techniques:**
- Mind mapping around central problem
- "How Might We" questions
- Crazy 8s (sketch 8 ideas in 8 minutes)
- Affinity diagramming (group related ideas)

**For solo work:**
- Schedule dedicated brainstorming sessions
- Use prompts like "What if..." and "Imagine..."
- Document all ideas without judgment
- Refine and prioritize later

## Writing Effective Requirements

### Characteristics of Good Requirements

Use the **SMART** criteria:

**Specific:**
- Clear and unambiguous
- Single, well-defined purpose
- Concrete rather than abstract

**Measurable:**
- Testable and verifiable
- Includes success criteria
- Quantifiable when possible

**Achievable:**
- Technically feasible
- Within scope and resources
- Realistic given constraints

**Relevant:**
- Aligned with project goals
- Provides user value
- Necessary, not nice-to-have (for MVP)

**Time-bound:**
- Clear deadlines or milestones
- Priority assigned
- Dependencies identified

### Requirement Statements Format

**User Story Format:**
```
As a [type of user]
I want to [perform some action]
So that [achieve some goal/benefit]
```

**Examples:**
- "As a registered user, I want to reset my password via email so that I can regain access if I forget it"
- "As a content creator, I want to schedule posts in advance so that I can maintain consistent publishing"
- "As an administrator, I want to view user activity logs so that I can monitor system usage and identify issues"

**Acceptance Criteria:**
Each user story should include acceptance criteria defining "done":

```
Given [precondition/context]
When [action/event]
Then [expected outcome]
```

**Example:**
```
Story: As a user, I want to search for products so that I can find what I need quickly

Acceptance Criteria:
- Given I am on the homepage, When I enter a search term and click "Search", Then I see relevant results within 2 seconds
- Given I have searched, When I filter by category, Then results update to show only that category
- Given there are no results, When I search, Then I see a helpful message with suggestions
- Given I am on mobile, When I search, Then the interface is fully functional and responsive
```

### Requirements Documentation Template

```markdown
## REQ-001: User Registration

**Type:** Functional
**Priority:** High (Must Have)
**Category:** Authentication

**Description:**
The system shall allow new users to create accounts using email and password.

**Rationale:**
User accounts are necessary to personalize experience, save preferences, and secure user data.

**User Story:**
As a new visitor, I want to create an account so that I can access personalized features.

**Acceptance Criteria:**
1. Given I am on the registration page, When I provide valid email and password, Then my account is created and I receive confirmation
2. Given I provide an email already in use, When I try to register, Then I see an error message
3. Given I provide an invalid email format, When I try to register, Then I see format validation error
4. Given I provide a weak password, When I try to register, Then I see password strength requirements
5. Given I successfully register, When the process completes, Then I receive a verification email

**Dependencies:**
- REQ-002: Email Service Integration
- REQ-003: Password Security

**Assumptions:**
- Users have access to email
- Email service API is available

**Constraints:**
- Must comply with GDPR data protection
- Password must be hashed using bcrypt
- Email verification required before account activation

**Testing Notes:**
- Test with various email formats
- Test password strength validation
- Verify email delivery
- Test concurrent registrations with same email
```

## Requirements Prioritization

### MoSCoW Method

Classify requirements into four categories:

**Must Have (Critical):**
- Essential for MVP
- Project fails without these
- Non-negotiable core functionality

**Should Have (Important):**
- Important but not vital
- Adds significant value
- Can be delayed if necessary

**Could Have (Nice to Have):**
- Desirable but not necessary
- Improves user experience
- Include if time permits

**Won't Have (Out of Scope):**
- Explicitly excluded
- Future consideration
- Helps prevent scope creep

**Example Application:**
```
Must Have:
- User authentication
- Create and view posts
- Basic search functionality

Should Have:
- User profiles with avatars
- Comment on posts
- Email notifications

Could Have:
- Social media sharing
- Dark mode theme
- Advanced analytics

Won't Have:
- Real-time chat
- Video upload
- Mobile native apps
```

### Value vs. Effort Matrix

Plot requirements on a 2x2 grid:

```mermaid
quadrant-chart
    title Value vs. Effort Matrix
    x-axis Low Effort --> High Effort
    y-axis Low Value --> High Value
    quadrant-1 Nice to Have
    quadrant-2 High Priority
    quadrant-3 Low Priority
    quadrant-4 Quick Wins
    User Auth: [0.7, 0.9]
    Social Share: [0.3, 0.4]
    Analytics Dashboard: [0.8, 0.7]
    Dark Mode: [0.2, 0.5]
    Search: [0.4, 0.8]
    Export Data: [0.3, 0.3]
```

**Quick Wins (High Value, Low Effort):**
- Implement first
- Maximum ROI
- Build momentum

**High Priority (High Value, High Effort):**
- Core features
- Allocate most time
- Break into smaller tasks

**Nice to Have (Low Value, Low Effort):**
- Polish features
- Include if time permits

**Low Priority (Low Value, High Effort):**
- Avoid or defer
- Reconsider necessity

### Kano Model

Categorize features by impact on user satisfaction:

**Basic Needs (Must-be):**
- Assumed by users
- Dissatisfaction if absent
- No extra satisfaction if present
- Example: System stability, basic security

**Performance Needs (One-dimensional):**
- Linear satisfaction relationship
- More is better
- Competitive differentiators
- Example: Speed, accuracy, capacity

**Excitement Needs (Delighters):**
- Unexpected features
- High satisfaction if present
- No dissatisfaction if absent
- Example: Innovative UI, smart features

Focus MVP on Basic Needs, include some Performance Needs, reserve Excitement for later.

## Requirements Validation

### Stakeholder Review

**Review Process:**
1. Document all requirements clearly
2. Schedule review sessions with stakeholders
3. Walk through each requirement
4. Gather feedback and questions
5. Document changes and rationale
6. Obtain sign-off

**Validation Questions:**
- Is this requirement necessary?
- Is it clearly stated and testable?
- Does it align with project goals?
- Is it feasible given constraints?
- Are there conflicting requirements?

### Prototyping

Create low-fidelity prototypes to validate requirements:

**Wireframes:**
- Sketch user interfaces
- Show information architecture
- Demonstrate workflows
- Validate usability requirements

**Mockups:**
- Higher fidelity designs
- Visual style and branding
- Interactive elements
- Get early feedback on UX

**Technical Prototypes:**
- Proof-of-concepts for risky features
- Validate technical feasibility
- Test performance assumptions
- Identify integration challenges

### Requirement Traceability

Ensure every requirement is:

**Sourced:**
- Linked to stakeholder need or project goal
- Justified with clear rationale

**Specified:**
- Documented with sufficient detail
- Includes acceptance criteria
- Priority assigned

**Implemented:**
- Tracked through development
- Covered by tests
- Verified in final product

**Verified:**
- Test cases defined
- Testing completed
- Results documented

Create a traceability matrix:

```
| Req ID | Source | User Story | Implementation | Test Case | Status |
|--------|--------|------------|----------------|-----------|--------|
| REQ-001| Survey | US-001 | Feature/auth | TC-001-005| Done |
| REQ-002| Interview| US-002 | Feature/search| TC-006-010| In Progress|
```

## Managing Requirement Changes

### Change Control Process

**Request Submission:**
1. Document proposed change
2. Explain rationale
3. Identify impact on scope, timeline, resources
4. Suggest alternatives if applicable

**Impact Analysis:**
- Technical complexity
- Dependencies affected
- Timeline implications
- Resource requirements
- Risk assessment

**Decision Making:**
- Evaluate against project goals
- Consider priorities and constraints
- Consult with stakeholders if needed
- Approve, defer, or reject

**Documentation:**
- Update requirements documentation
- Track change history
- Communicate to all stakeholders
- Adjust project plan accordingly

### Version Control

Maintain version history of requirements:

**Versioning Schema:**
```
Requirements Document v1.0 (Initial Release)
Requirements Document v1.1 (Added REQ-015, Modified REQ-007)
Requirements Document v2.0 (Major restructuring, removed REQ-003-005)
```

**Change Log:**
```
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-01-15 | Initial requirements | Student |
| 1.1 | 2024-01-20 | Added social sharing | Student |
| 1.2 | 2024-01-25 | Modified search req | Advisor |
```

## Requirements Documentation Structure

### Complete Requirements Document Outline

```markdown
# [Project Name] Requirements Specification

## 1. Introduction
### 1.1 Purpose
### 1.2 Scope
### 1.3 Definitions and Acronyms
### 1.4 References

## 2. Overall Description
### 2.1 Product Perspective
### 2.2 User Characteristics
### 2.3 Operating Environment
### 2.4 Design and Implementation Constraints
### 2.5 Assumptions and Dependencies

## 3. Functional Requirements
### 3.1 [Feature Category 1]
#### REQ-001: [Requirement Name]
#### REQ-002: [Requirement Name]
### 3.2 [Feature Category 2]
...

## 4. Non-Functional Requirements
### 4.1 Performance Requirements
### 4.2 Security Requirements
### 4.3 Usability Requirements
### 4.4 Reliability Requirements

## 5. External Interface Requirements
### 5.1 User Interfaces
### 5.2 Hardware Interfaces
### 5.3 Software Interfaces
### 5.4 Communication Interfaces

## 6. Appendices
### Appendix A: User Stories
### Appendix B: Use Case Diagrams
### Appendix C: Prototypes and Mockups
```

## Requirements Gathering Checklist

### Pre-Planning
- [ ] Identified all stakeholders
- [ ] Scheduled stakeholder meetings
- [ ] Prepared interview questions
- [ ] Created survey if needed
- [ ] Researched competitive solutions

### Elicitation
- [ ] Conducted user interviews
- [ ] Distributed and analyzed surveys
- [ ] Performed competitive analysis
- [ ] Documented assumptions
- [ ] Identified constraints

### Documentation
- [ ] Written functional requirements
- [ ] Written non-functional requirements
- [ ] Created user stories with acceptance criteria
- [ ] Prioritized using MoSCoW or similar
- [ ] Documented dependencies
- [ ] Created requirement traceability matrix

### Validation
- [ ] Reviewed with stakeholders
- [ ] Created prototypes or wireframes
- [ ] Validated technical feasibility
- [ ] Checked for completeness
- [ ] Checked for consistency
- [ ] Obtained stakeholder approval

### Management
- [ ] Established change control process
- [ ] Set up version control
- [ ] Created communication plan
- [ ] Defined acceptance criteria for each requirement

## Common Pitfalls

### Vague Requirements

**Bad:** "The system should be fast"
**Good:** "The system shall load the dashboard in under 2 seconds on a standard broadband connection"

**Bad:** "Users should be able to easily search"
**Good:** "Users shall be able to search content by keyword, with results displayed within 1 second, showing the most relevant results first based on relevance scoring"

### Gold Plating

Adding unnecessary features beyond what's needed:
- Focus on solving the core problem
- Resist the urge to add "cool" features
- Every feature has cost (development, maintenance, complexity)
- Follow the prioritization framework strictly

### Requirements Creep

Continuously adding new requirements:
- Set clear boundaries for requirements phase
- Use change control for new requirements
- Evaluate impact before accepting changes
- Be comfortable saying "not in scope"

### Ambiguous Language

Avoid words like:
- "Fast," "easy," "user-friendly" (without metrics)
- "Etc.," "and so on" (incomplete)
- "Should," "might," "could" (non-committal)
- "Several," "many," "few" (imprecise)

Use specific, quantifiable terms instead.

## Summary

Requirements gathering transforms project ideas into concrete specifications. Through systematic elicitation techniques—interviews, surveys, competitive analysis—you discover what users need and what the system must do. Effective requirements are specific, measurable, achievable, relevant, and time-bound. They must be documented clearly, prioritized strategically, and validated with stakeholders.

For capstone projects, requirements serve as your contract with yourself and your evaluators. They define success criteria, guide implementation decisions, and provide a baseline for testing. Well-gathered requirements prevent wasted effort, reduce uncertainty, and increase your chances of delivering a valuable, complete product.

Remember that requirements are living documents. As you learn more through development, you'll refine and adjust them. The key is maintaining a disciplined change control process while remaining flexible enough to adapt to new insights.

## Additional Resources

- IEEE Standard 830-1998: Recommended Practice for Software Requirements Specifications
- "Software Requirements" by Karl Wiegers - comprehensive guide
- "User Story Mapping" by Jeff Patton - visual requirements organization
- "The Mom Test" by Rob Fitzpatrick - how to validate requirements
- Aha! Product Roadmap - requirements management tool
- Trello/Jira - user story tracking
- Figma/Balsamiq - wireframing and prototyping tools
