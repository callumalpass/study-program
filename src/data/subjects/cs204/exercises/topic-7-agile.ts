import { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  {
    id: 'cs204-t7-ex1',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Agile Manifesto Values',
    description: 'List and explain the four core values of the Agile Manifesto. For each value, give a practical example.',
    difficulty: 1,
    hints: [
      'Focus on what is valued MORE, not exclusively',
      'Consider customer collaboration',
      'Think about working software'
    ],
    solution: `**The Four Values:**

1. **Individuals and interactions** over processes and tools
   - Example: Face-to-face discussion vs lengthy documentation

2. **Working software** over comprehensive documentation
   - Example: Ship MVP quickly, document as needed

3. **Customer collaboration** over contract negotiation
   - Example: Regular demos and feedback sessions

4. **Responding to change** over following a plan
   - Example: Reprioritize backlog based on market changes

**Key:** Items on right still have value; items on left valued MORE.`
  },
  {
    id: 'cs204-t7-ex2',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Scrum Roles',
    description: 'Describe the three Scrum roles: Product Owner, Scrum Master, and Development Team. What are their responsibilities?',
    difficulty: 1,
    hints: [
      'Product Owner owns the what',
      'Scrum Master facilitates process',
      'Team owns the how'
    ],
    solution: `**Product Owner:**
- Owns product backlog and prioritization
- Represents stakeholders and customers
- Defines acceptance criteria
- Makes scope decisions

**Scrum Master:**
- Facilitates Scrum process and ceremonies
- Removes impediments for team
- Coaches team on Agile practices
- NOT a project manager

**Development Team:**
- Cross-functional, self-organizing
- Owns technical decisions (how to build)
- Commits to sprint work
- Delivers potentially shippable increment

**Key:** No hierarchy between roles; each has distinct accountability.`
  },
  {
    id: 'cs204-t7-ex3',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Scrum Ceremonies',
    description: 'Describe the five Scrum ceremonies. For each, explain its purpose, participants, and typical duration.',
    difficulty: 2,
    hints: [
      'Sprint Planning, Daily Standup, Sprint Review, Retrospective',
      'Consider timeboxing',
      'Who attends each ceremony?'
    ],
    solution: `**Sprint Planning** (2-4 hours for 2-week sprint)
- Purpose: Select backlog items, create sprint goal
- Participants: Entire Scrum team

**Daily Standup** (15 minutes)
- Purpose: Sync, identify blockers (yesterday/today/blockers)
- Participants: Development team (others observe)

**Sprint Review** (1-2 hours)
- Purpose: Demo completed work, gather feedback
- Participants: Scrum team + stakeholders

**Sprint Retrospective** (1-1.5 hours)
- Purpose: Improve process (what went well/poorly/actions)
- Participants: Scrum team only

**Backlog Refinement** (ongoing, ~10% of sprint)
- Purpose: Clarify, estimate, split stories
- Participants: Product Owner + team`
  },
  {
    id: 'cs204-t7-ex4',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'User Stories',
    description: 'Explain user story format and the INVEST criteria. Write a user story with acceptance criteria for a login feature.',
    difficulty: 2,
    hints: [
      'As a [user], I want [feature], so that [benefit]',
      'INVEST: Independent, Negotiable, Valuable...',
      'Acceptance criteria define "done"'
    ],
    solution: `**User Story Format:**
"As a [type of user], I want [feature], so that [benefit]"

**INVEST Criteria:**
- **I**ndependent: Can be developed separately
- **N**egotiable: Details can be discussed
- **V**aluable: Delivers user/business value
- **E**stimable: Team can size it
- **S**mall: Fits in one sprint
- **T**estable: Clear pass/fail criteria

**Example:**
"As a registered user, I want to log in with email and password, so that I can access my account."

**Acceptance Criteria:**
- Valid email + password → redirects to dashboard
- Invalid credentials → shows error, no details
- Account locked after 5 failures
- "Forgot password" link visible`
  },
  {
    id: 'cs204-t7-ex5',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Story Point Estimation',
    description: 'Explain story points and Planning Poker. Why use relative estimation instead of hours?',
    difficulty: 2,
    hints: [
      'Story points measure complexity/effort',
      'Relative sizing is easier than absolute',
      'Fibonacci sequence often used'
    ],
    solution: `**Story Points:** Relative measure of effort/complexity/uncertainty (not time).

**Why Relative Estimation:**
- Humans better at comparing than absolute estimates
- Accounts for complexity, not just hours
- More consistent across team members
- Velocity normalizes over time

**Planning Poker:**
1. Product Owner presents story
2. Team discusses and asks questions
3. Each member privately selects estimate (Fibonacci: 1,2,3,5,8,13...)
4. Reveal simultaneously
5. Discuss outliers, re-estimate until consensus

**Benefits:**
- Reveals misunderstandings early
- Avoids anchoring bias
- Promotes discussion`
  },
  {
    id: 'cs204-t7-ex6',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Kanban vs Scrum',
    description: 'Compare Kanban and Scrum methodologies. When would you choose one over the other?',
    difficulty: 3,
    hints: [
      'Scrum has fixed iterations',
      'Kanban is continuous flow',
      'Consider work predictability'
    ],
    solution: `**Scrum:**
- Fixed-length sprints (1-4 weeks)
- Defined roles (PO, SM, Team)
- Sprint planning, commitment
- Changes during sprint discouraged

**Kanban:**
- Continuous flow, no iterations
- Fewer prescribed roles
- Pull-based work (WIP limits)
- Changes anytime

**Choose Scrum when:**
- Work is plannable in chunks
- Need predictable delivery cycles
- Team new to Agile (more structure)

**Choose Kanban when:**
- Work is unpredictable (support, ops)
- Need continuous delivery
- Frequent priority changes
- Already have process, need improvement

**Hybrid (Scrumban):** Sprints + WIP limits`
  },
  {
    id: 'cs204-t7-ex7',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Code Smells',
    description: 'Define code smells and describe five common ones. For each, explain why it is problematic.',
    difficulty: 3,
    hints: [
      'Smells indicate potential problems',
      'Not bugs, but design issues',
      'Long methods, duplicate code...'
    ],
    solution: `**Code Smells:** Indicators of deeper design problems; not bugs but warning signs.

**Common Smells:**

1. **Long Method:** Hard to understand, test, reuse
   - Fix: Extract methods

2. **Duplicate Code:** Same logic in multiple places
   - Fix: Extract to shared function/class

3. **Large Class:** Too many responsibilities
   - Fix: Extract classes (SRP)

4. **Feature Envy:** Method uses another class's data more than its own
   - Fix: Move method to appropriate class

5. **Primitive Obsession:** Using primitives instead of small objects (Money, Email)
   - Fix: Introduce value objects

**Also:** Long parameter lists, switch statements, comments explaining bad code`
  },
  {
    id: 'cs204-t7-ex8',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Refactoring Techniques',
    description: 'Explain Extract Method and Rename refactorings. Demonstrate each with a before/after code example.',
    difficulty: 3,
    hints: [
      'Refactoring changes structure, not behavior',
      'Extract Method improves readability',
      'Good names are documentation'
    ],
    solution: `**Extract Method:** Pull code into new method with descriptive name.

// Before
function processOrder(order) {
  // validate
  if (!order.items.length) throw new Error("Empty");
  if (!order.customer) throw new Error("No customer");
  // calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.qty;
  }
  return total;
}

// After
function processOrder(order) {
  validateOrder(order);
  return calculateTotal(order.items);
}

**Rename:** Change name to reveal intent.

// Before: function calc(a, b) { return a * b * 0.0725; }
// After:  function calculateSalesTax(price, quantity) {...}

**Key:** Tests must pass before and after refactoring.`
  },
  {
    id: 'cs204-t7-ex9',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Technical Debt',
    description: 'Define technical debt. Explain intentional vs unintentional debt and strategies for managing it.',
    difficulty: 3,
    hints: [
      'Debt metaphor: interest compounds',
      'Not all debt is bad',
      'Balance speed vs quality'
    ],
    solution: `**Technical Debt:** Sub-optimal code/design choices that create future work. Like financial debt: quick benefit now, pay interest later.

**Types:**
- **Intentional/Deliberate:** Conscious shortcuts for speed
  - "We know this isn't ideal, but ship now, fix later"
- **Unintentional/Accidental:** Unknown best practices, evolving requirements
  - "We didn't know better" or "Requirements changed"

**Management Strategies:**
1. **Track it:** Document debt in backlog
2. **Make visible:** Show stakeholders the cost
3. **Pay regularly:** Allocate % of each sprint
4. **Boy Scout Rule:** Leave code better than found
5. **Refactor during feature work:** Opportunistic cleanup

**Balance:** Some debt is strategic (ship MVP fast); excessive debt slows all future work.`
  },
  {
    id: 'cs204-t7-ex10',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Code Review Best Practices',
    description: 'List five best practices for effective code reviews. Explain both reviewer and author responsibilities.',
    difficulty: 2,
    hints: [
      'Small PRs are easier to review',
      'Focus on code, not person',
      'Automate what can be automated'
    ],
    solution: `**For Authors:**
- Keep PRs small and focused (<400 lines ideal)
- Write clear description explaining WHY
- Self-review before requesting review
- Respond to feedback constructively
- Don't take criticism personally

**For Reviewers:**
- Review promptly (within hours, not days)
- Focus on logic, design, readability—not style (automate that)
- Ask questions rather than make demands
- Acknowledge good work, not just problems
- Approve when good enough, not perfect

**General:**
- Automate style checks (linting, formatting)
- Use PR templates for consistency
- Pair program for complex changes
- Limit review time (60 min max in one session)
- Establish team standards`
  },
  {
    id: 'cs204-t7-ex11',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Sprint Velocity',
    description: 'Explain sprint velocity. How is it calculated and used? What are common pitfalls in using velocity?',
    difficulty: 3,
    hints: [
      'Velocity = completed story points per sprint',
      'Used for planning, not performance',
      'Average over multiple sprints'
    ],
    solution: `**Velocity:** Average story points completed per sprint.

**Calculation:**
- Sum story points of DONE stories (not partial)
- Average over 3-5 sprints for stability
- Example: Sprints completed 20, 18, 22 → velocity ≈ 20

**Uses:**
- Sprint planning: Don't commit more than velocity
- Release planning: Estimate how many sprints for backlog
- Capacity planning: Adjust for holidays, team changes

**Pitfalls:**
- Using for individual performance (encourages gaming)
- Comparing across teams (points mean different things)
- Inflating points to look faster
- Counting incomplete work
- Changing point scale mid-project

**Key:** Velocity is a planning tool, not a performance metric.`
  },
  {
    id: 'cs204-t7-ex12',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Definition of Done',
    description: 'Explain what Definition of Done (DoD) is. Create a sample DoD checklist for a development team.',
    difficulty: 2,
    hints: [
      'Shared understanding of complete',
      'Quality gate for all work',
      'Team creates and owns it'
    ],
    solution: `**Definition of Done:** Shared checklist defining when a story is truly complete. Prevents "90% done" syndrome.

**Sample DoD Checklist:**

**Code:**
- [ ] Code reviewed and approved
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] No new linting warnings
- [ ] Code merged to main

**Quality:**
- [ ] Acceptance criteria verified
- [ ] No known defects
- [ ] Performance acceptable
- [ ] Security review (if applicable)

**Documentation:**
- [ ] API documentation updated
- [ ] README updated (if needed)

**Deployment:**
- [ ] Deployed to staging
- [ ] Smoke tests passing
- [ ] Product Owner accepted

**Note:** DoD applies to ALL stories; acceptance criteria are story-specific.`
  },
  {
    id: 'cs204-t7-ex13',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Pair Programming',
    description: 'Describe pair programming, including driver/navigator roles. What are the benefits and when is it most valuable?',
    difficulty: 2,
    hints: [
      'Two programmers, one computer',
      'Roles should switch frequently',
      'Knowledge sharing benefit'
    ],
    solution: `**Pair Programming:** Two developers working together at one workstation.

**Roles:**
- **Driver:** Types code, focuses on immediate task
- **Navigator:** Reviews, thinks ahead, spots issues
- Switch roles every 15-30 minutes

**Benefits:**
- Fewer bugs (real-time review)
- Knowledge sharing (no silos)
- Better design decisions
- Faster onboarding for new team members
- Focused work (less distraction)

**Most Valuable When:**
- Complex/critical code
- Onboarding new team members
- Learning new technologies
- Solving difficult problems
- High-risk changes

**Challenges:** Can be tiring, personalities may clash, requires scheduling. Not needed for all tasks.`
  },
  {
    id: 'cs204-t7-ex14',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Retrospective Formats',
    description: 'Describe two different retrospective formats. How do you ensure retrospectives lead to actionable improvements?',
    difficulty: 3,
    hints: [
      'Start/Stop/Continue is classic',
      'Keep it varied to stay fresh',
      'Action items are key'
    ],
    solution: `**Format 1: Start/Stop/Continue**
- What should we START doing?
- What should we STOP doing?
- What should we CONTINUE doing?

**Format 2: 4Ls**
- **Liked:** What went well?
- **Learned:** What did we learn?
- **Lacked:** What was missing?
- **Longed for:** What do we wish for?

**Ensuring Action:**
1. Limit to 1-3 actions per retro
2. Make actions SMART (Specific, Measurable, Assignable...)
3. Assign owner to each action
4. Review previous actions at next retro
5. Track completion rate

**Tips:**
- Rotate facilitator
- Vary format to keep engagement
- Create safe space (no blame)
- Time-box discussions`
  },
  {
    id: 'cs204-t7-ex15',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Agile Scaling Frameworks',
    description: 'Compare SAFe and LeSS as frameworks for scaling Agile to large organizations.',
    difficulty: 4,
    hints: [
      'SAFe is more prescriptive',
      'LeSS is lighter weight',
      'Consider organization size and culture'
    ],
    solution: `**SAFe (Scaled Agile Framework):**
- Very prescriptive, detailed practices
- Roles: Release Train Engineer, Product Manager, etc.
- Program Increment (PI) planning events
- Portfolio, program, team levels
- Best for: Large enterprises, regulated industries

**LeSS (Large-Scale Scrum):**
- Minimal additions to Scrum
- Single Product Owner for multiple teams
- Same sprint for all teams
- Keeps things simple, fewer new roles
- Best for: Organizations wanting to stay close to Scrum

**Key Differences:**
- SAFe adds more structure; LeSS extends Scrum directly
- SAFe has more ceremonies; LeSS keeps it minimal
- SAFe better for 50+ teams; LeSS for 2-8 teams

**Choice depends on:** Organization size, culture, existing processes, risk tolerance`
  },
  {
    id: 'cs204-t7-ex16',
    subjectId: 'cs204',
    topicId: 'cs204-topic-7',
    type: 'written' as const,
    title: 'Agile Transformation Challenges',
    description: 'Identify five common challenges when organizations adopt Agile. For each, suggest a mitigation strategy.',
    difficulty: 5,
    hints: [
      'Culture change is hardest',
      'Management buy-in crucial',
      'Agile is mindset, not just process'
    ],
    solution: `**1. Resistance to Change**
- Challenge: "We've always done it this way"
- Mitigation: Start small (pilot team), show results, involve skeptics

**2. Lack of Management Support**
- Challenge: Executives expect results without changing behavior
- Mitigation: Executive coaching, demonstrate ROI, align metrics

**3. Partial Adoption (Agile in Name Only)**
- Challenge: Cherry-picking practices without mindset shift
- Mitigation: Training, coaching, address root causes not symptoms

**4. Distributed Teams**
- Challenge: Time zones, communication barriers
- Mitigation: Overlap hours, good tooling, occasional in-person meetings

**5. Legacy Processes/Contracts**
- Challenge: Fixed-scope contracts, waterfall dependencies
- Mitigation: Renegotiate contracts, create buffers, incremental process change

**Key:** Agile transformation is organizational change, not just development process change.`
  }
];
