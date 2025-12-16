import { WrittenExercise } from '../../../../core/types';

export const topic2Exercises: WrittenExercise[] = [
  {
    id: 'cs204-t2-ex1',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Stakeholder Identification',
    description: 'You are developing a hospital patient management system. Identify at least 8 different stakeholders who would have requirements for this system. For each stakeholder, describe their role and list 2-3 specific requirements they might have.',
    difficulty: 1,
    hints: [
      'Consider both direct users and indirect stakeholders',
      'Think about administrative, medical, and technical staff',
      'Don\'t forget patients and regulatory bodies'
    ],
    solution: `**Key Stakeholders and Their Requirements:**

1. **Doctors/Physicians**
   - View complete patient medical history
   - Prescribe medications with drug interaction checks
   - Access lab results and imaging reports

2. **Nurses**
   - Update patient vital signs in real-time
   - Receive medication administration alerts
   - Access care plans and nursing notes

3. **Patients**
   - View appointment schedules and test results
   - Request prescription refills online
   - Communicate with healthcare providers

4. **Hospital Administrators**
   - Generate occupancy and utilization reports
   - Track key performance indicators
   - Manage staff scheduling and resources

5. **Billing Department**
   - Generate accurate invoices from treatments
   - Process insurance claims automatically
   - Track payment status and outstanding balances

6. **IT Department**
   - System must integrate with existing infrastructure
   - Require comprehensive audit logging
   - Need disaster recovery capabilities

7. **Pharmacists**
   - Receive electronic prescriptions
   - Check drug interactions and allergies
   - Track medication inventory

8. **Regulatory Compliance Officers**
   - Ensure HIPAA compliance for data privacy
   - Generate compliance audit reports
   - Maintain proper access controls and audit trails`
  },
  {
    id: 'cs204-t2-ex2',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Functional vs Non-Functional Requirements',
    description: 'Given the following requirements for an e-commerce platform, classify each as functional (F) or non-functional (NF). For non-functional requirements, identify the quality attribute category (performance, security, usability, reliability, etc.).\n\n1. Users can add items to a shopping cart\n2. The system shall handle 10,000 concurrent users\n3. Product search results appear within 2 seconds\n4. Users can pay using credit cards and PayPal\n5. The system shall be available 99.9% of the time\n6. All passwords must be hashed using bcrypt\n7. Users can track their order delivery status\n8. The website must work on mobile devices\n9. Failed transactions must be logged for audit\n10. The checkout process requires no more than 4 steps',
    difficulty: 1,
    hints: [
      'Functional requirements describe WHAT the system does',
      'Non-functional requirements describe HOW WELL the system performs',
      'Quality attributes include performance, security, usability, reliability, maintainability'
    ],
    solution: `**Classification:**

1. **F** - Users can add items to a shopping cart
   - Describes a specific feature/function

2. **NF (Performance/Scalability)** - Handle 10,000 concurrent users
   - Specifies capacity constraint

3. **NF (Performance)** - Search results within 2 seconds
   - Response time requirement

4. **F** - Pay using credit cards and PayPal
   - Describes payment functionality

5. **NF (Reliability/Availability)** - 99.9% availability
   - Uptime requirement (allows ~8.76 hours downtime/year)

6. **NF (Security)** - Passwords hashed using bcrypt
   - Security implementation constraint

7. **F** - Track order delivery status
   - Describes tracking feature

8. **NF (Usability/Portability)** - Work on mobile devices
   - Accessibility and compatibility requirement

9. **NF (Security/Auditability)** - Log failed transactions
   - Audit and compliance requirement

10. **NF (Usability)** - Checkout in 4 steps or fewer
    - User experience constraint`
  },
  {
    id: 'cs204-t2-ex3',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Requirements Elicitation Techniques',
    description: 'You\'re gathering requirements for a new mobile banking app. For each of the following elicitation techniques, explain how you would apply it and what types of requirements it would help uncover:\n\n1. Interviews\n2. Surveys/Questionnaires\n3. Observation (Ethnography)\n4. Prototyping\n5. Document Analysis',
    difficulty: 2,
    hints: [
      'Consider the strengths and limitations of each technique',
      'Think about which stakeholders each technique works best with',
      'Consider combining techniques for comprehensive coverage'
    ],
    solution: `**Elicitation Technique Applications:**

**1. Interviews**
- **Application:** Conduct one-on-one sessions with bank managers, tellers, customer service reps, and select customers. Use open-ended questions to understand pain points with current systems.
- **Requirements Uncovered:** Core business rules, workflow requirements, exception handling needs, security policies, strategic priorities
- **Best For:** Deep understanding of complex processes, uncovering unstated needs

**2. Surveys/Questionnaires**
- **Application:** Distribute online surveys to thousands of existing banking customers asking about feature priorities, current app usage patterns, and satisfaction levels.
- **Requirements Uncovered:** User preferences, feature prioritization, demographics of user base, common pain points at scale
- **Best For:** Gathering quantitative data from large user populations

**3. Observation (Ethnography)**
- **Application:** Spend time in bank branches watching how customers and tellers interact. Observe customers using existing banking apps or competitor apps.
- **Requirements Uncovered:** Actual workflow patterns (vs. documented ones), usability issues, workarounds users employ, environmental constraints (lighting, noise affecting mobile use)
- **Best For:** Understanding real-world usage context, discovering implicit requirements

**4. Prototyping**
- **Application:** Create low-fidelity wireframes of key screens (login, transfer, balance check) and conduct usability testing sessions with representative users.
- **Requirements Uncovered:** UI/UX requirements, navigation preferences, feature discoverability issues, validation rules needed
- **Best For:** Validating requirements, discovering usability requirements, resolving ambiguities

**5. Document Analysis**
- **Application:** Review existing banking regulations (PCI-DSS, KYC), competitor app documentation, existing system documentation, customer complaint logs.
- **Requirements Uncovered:** Regulatory compliance requirements, industry standards, constraints from legacy systems, known issues to address
- **Best For:** Understanding constraints, compliance requirements, learning from existing solutions`
  },
  {
    id: 'cs204-t2-ex4',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Writing User Stories',
    description: 'Convert the following informal requirements into properly formatted user stories with acceptance criteria. Use the format: "As a [role], I want [feature] so that [benefit]."\n\n1. "We need login functionality"\n2. "The system should send notifications"\n3. "Users need to be able to search products"\n4. "There should be a reporting feature"',
    difficulty: 2,
    hints: [
      'Be specific about the user role',
      'Clearly state the business value/benefit',
      'Acceptance criteria should be testable'
    ],
    solution: `**User Stories with Acceptance Criteria:**

**1. Login Functionality**
*User Story:* As a registered customer, I want to log in using my email and password so that I can access my account securely.

*Acceptance Criteria:*
- Given valid credentials, user is redirected to dashboard
- Given invalid credentials, error message displays without revealing which field is wrong
- After 5 failed attempts, account is locked for 15 minutes
- "Remember me" option keeps user logged in for 30 days
- Password reset link is available on login page

---

**2. Notifications**
*User Story:* As a customer, I want to receive push notifications about my order status so that I stay informed without checking the app repeatedly.

*Acceptance Criteria:*
- Notification sent when order is confirmed
- Notification sent when order ships with tracking link
- Notification sent when order is delivered
- User can enable/disable notification types in settings
- Notifications include order number and brief status

---

**3. Product Search**
*User Story:* As a shopper, I want to search for products by name, category, or keyword so that I can quickly find items I want to purchase.

*Acceptance Criteria:*
- Search results display within 2 seconds
- Results can be filtered by price, rating, availability
- Results can be sorted by relevance, price, or rating
- Search suggestions appear after typing 3 characters
- "No results" page suggests alternative searches

---

**4. Reporting Feature**
*User Story:* As a store manager, I want to generate sales reports by date range so that I can analyze business performance and make informed decisions.

*Acceptance Criteria:*
- Reports available for daily, weekly, monthly, custom ranges
- Reports show total revenue, units sold, top products
- Reports can be exported to CSV and PDF formats
- Reports load within 5 seconds for up to 1 year of data
- Dashboard shows key metrics at a glance`
  },
  {
    id: 'cs204-t2-ex5',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Use Case Diagram Creation',
    description: 'Create a use case diagram description for a library management system. Identify the actors and at least 8 use cases. Show relationships including associations, <<include>>, and <<extend>> relationships where appropriate. Describe the diagram in text format suitable for conversion to UML.',
    difficulty: 3,
    hints: [
      'Identify all actors who interact with the system',
      'Use <<include>> for mandatory sub-behaviors',
      'Use <<extend>> for optional behaviors',
      'Consider both primary and secondary actors'
    ],
    solution: `**Library Management System - Use Case Diagram**

**Actors:**
- Librarian (Primary)
- Library Member (Primary)
- System Administrator (Secondary)
- External Book Database (Secondary System)

**Use Cases and Relationships:**

\`\`\`
[Library Member]
    |---> (Search Catalog)
    |---> (Borrow Book)
    |         |---<<include>>---> (Check Availability)
    |         |---<<extend>>---> (Place Reservation) [condition: book unavailable]
    |---> (Return Book)
    |---> (View Borrowing History)
    |---> (Pay Fines)
    |---> (Renew Book)
              |---<<include>>---> (Check Availability)

[Librarian]
    |---> (Search Catalog)
    |---> (Manage Books)
    |         |---<<include>>---> (Add Book)
    |         |---<<include>>---> (Update Book Details)
    |         |---<<include>>---> (Remove Book)
    |---> (Manage Members)
    |---> (Process Returns)
    |         |---<<extend>>---> (Calculate Fine) [condition: overdue]
    |---> (Generate Reports)

[System Administrator]
    |---> (Manage User Accounts)
    |---> (Configure System Settings)
    |---> (Backup Database)

[External Book Database]
    |<--- (Search Catalog) [for ISBN lookup]
    |<--- (Add Book) [for auto-fill metadata]
\`\`\`

**Use Case Descriptions:**

1. **Search Catalog** - Actor searches books by title, author, ISBN, or subject
2. **Borrow Book** - Member checks out a book, includes availability check
3. **Return Book** - Book is returned and checked back into inventory
4. **Renew Book** - Extend borrowing period if no reservations exist
5. **Place Reservation** - Reserve a book currently borrowed by another member
6. **Manage Books** - CRUD operations on book inventory
7. **Process Returns** - Librarian processes returned books, calculates fines if late
8. **Generate Reports** - Create reports on circulation, popular books, overdue items`
  },
  {
    id: 'cs204-t2-ex6',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Requirements Ambiguity Analysis',
    description: 'Analyze the following requirements for ambiguity, incompleteness, or inconsistency. Identify the problems and rewrite each requirement to be clear, complete, and testable.\n\n1. "The system should be fast"\n2. "Users will be able to easily navigate the interface"\n3. "The application must handle a large number of requests"\n4. "Data should be backed up regularly"\n5. "The system shall be secure"',
    difficulty: 2,
    hints: [
      'Look for vague adjectives like "fast", "easy", "large"',
      'Requirements should be measurable and testable',
      'Consider adding specific metrics and conditions'
    ],
    solution: `**Requirements Analysis and Improvements:**

**1. Original:** "The system should be fast"
- **Problems:** Vague ("fast" is subjective), no metrics, no context for what operations
- **Improved:** "The system shall display search results within 2 seconds for queries returning up to 1000 results. Page load times shall not exceed 3 seconds on a standard 4G connection."

**2. Original:** "Users will be able to easily navigate the interface"
- **Problems:** "Easily" is subjective, not measurable, no definition of success
- **Improved:** "New users shall be able to complete core tasks (create account, make purchase, track order) without external help within 5 minutes. The interface shall score at least 80 on the System Usability Scale (SUS)."

**3. Original:** "The application must handle a large number of requests"
- **Problems:** "Large" is undefined, no peak vs. sustained rate, no degradation criteria
- **Improved:** "The application shall handle 10,000 concurrent users with an average response time under 500ms. Under peak load of 50,000 concurrent users, response time shall not exceed 2 seconds and error rate shall remain below 0.1%."

**4. Original:** "Data should be backed up regularly"
- **Problems:** "Regularly" is vague, no retention policy, no recovery requirements
- **Improved:** "Production database shall be backed up incrementally every 4 hours and fully every 24 hours. Backups shall be retained for 30 days. Recovery Point Objective (RPO): 4 hours. Recovery Time Objective (RTO): 2 hours."

**5. Original:** "The system shall be secure"
- **Problems:** "Secure" is too broad, no specific measures, not testable
- **Improved:** "The system shall encrypt all data in transit using TLS 1.3+. Passwords shall be hashed using bcrypt with cost factor 12. The system shall pass OWASP Top 10 vulnerability scanning. Multi-factor authentication shall be required for administrative access."`
  },
  {
    id: 'cs204-t2-ex7',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Requirements Prioritization with MoSCoW',
    description: 'You\'re building a food delivery app with limited budget for the MVP. Prioritize the following requirements using the MoSCoW method (Must have, Should have, Could have, Won\'t have for MVP). Justify each prioritization.\n\nRequirements:\n1. User registration and login\n2. Browse restaurants and menus\n3. Place and pay for orders\n4. Real-time order tracking\n5. Customer ratings and reviews\n6. Loyalty rewards program\n7. Push notifications\n8. In-app chat with delivery driver\n9. Order history\n10. Multiple payment methods',
    difficulty: 2,
    hints: [
      'Must haves are essential for the product to function',
      'Should haves add significant value but app can launch without them',
      'Could haves are nice to have but clearly lower priority',
      'Won\'t haves are explicitly out of scope for MVP'
    ],
    solution: `**MoSCoW Prioritization for Food Delivery MVP:**

**MUST HAVE (Essential for MVP launch)**

1. **User registration and login** - Cannot process orders without user accounts
2. **Browse restaurants and menus** - Core discovery functionality
3. **Place and pay for orders** - Primary business transaction capability

*Justification:* These three features form the minimum viable product. Without any one of them, the app cannot fulfill its core purpose.

---

**SHOULD HAVE (Important, include if possible)**

7. **Push notifications** - Users expect order status updates; significantly improves experience
9. **Order history** - Users need to reorder favorites and track past purchases
10. **Multiple payment methods** - Credit card minimum, but adding alternatives (PayPal, Apple Pay) increases conversion

*Justification:* These features significantly improve user experience and conversion rates. They should be included if timeline permits, or added in first update.

---

**COULD HAVE (Desirable but not necessary)**

4. **Real-time order tracking** - Great feature but users can receive status notifications instead
5. **Customer ratings and reviews** - Valuable but can launch with curated restaurant list initially

*Justification:* These are differentiating features that can be added post-launch. The app functions without them, though user experience is enhanced with them.

---

**WON'T HAVE (Out of scope for MVP)**

6. **Loyalty rewards program** - Requires established user base to be valuable; complex to implement
8. **In-app chat with delivery driver** - Phone calls work; complex real-time feature

*Justification:* These are advanced features that require significant development effort and make more sense once the core product is proven. They add complexity without addressing core value proposition.`
  },
  {
    id: 'cs204-t2-ex8',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Use Case Specification',
    description: 'Write a detailed use case specification for "Process Online Order" in an e-commerce system. Include: Use Case Name, Primary Actor, Preconditions, Main Success Scenario (at least 8 steps), Alternative Flows (at least 2), Exception Flows (at least 2), and Postconditions.',
    difficulty: 3,
    hints: [
      'Main scenario should describe the "happy path"',
      'Alternative flows are valid variations of the main flow',
      'Exception flows handle error conditions',
      'Each step should be an observable action'
    ],
    solution: `**Use Case Specification: Process Online Order**

**Use Case ID:** UC-004
**Use Case Name:** Process Online Order
**Primary Actor:** Customer
**Secondary Actors:** Payment Gateway, Inventory System, Email Service
**Scope:** E-Commerce Platform

---

**Preconditions:**
- Customer is logged into their account
- Customer has at least one item in shopping cart
- Products in cart are marked as available in inventory

---

**Main Success Scenario:**

1. Customer clicks "Proceed to Checkout"
2. System displays order summary with items, quantities, and subtotal
3. Customer confirms or modifies delivery address
4. System calculates shipping cost based on address and displays updated total
5. Customer selects shipping method (standard/express)
6. Customer selects payment method and enters payment details
7. System validates payment information format
8. System sends payment request to Payment Gateway
9. Payment Gateway authorizes transaction and returns confirmation
10. System reserves inventory for ordered items
11. System creates order record with "Processing" status
12. System sends order confirmation email to customer
13. System displays order confirmation page with order number

---

**Alternative Flows:**

**AF1: Guest Checkout (branches from step 1)**
1a. Customer is not logged in
1b. Customer selects "Checkout as Guest"
1c. Customer enters email and shipping information
1d. System creates temporary session
1e. Continue from step 2

**AF2: Apply Discount Code (branches from step 2)**
2a. Customer enters promotional code
2b. System validates code is active and applicable
2c. System applies discount and updates total
2d. Continue from step 3

**AF3: Saved Payment Method (replaces step 6)**
6a. Customer selects previously saved payment method
6b. Customer enters CVV for verification
6c. Continue from step 7

---

**Exception Flows:**

**EF1: Payment Declined (branches from step 9)**
9a. Payment Gateway returns decline response
9b. System displays payment failure message with reason
9c. System prompts customer to try different payment method
9d. Return to step 6

**EF2: Item Out of Stock (branches from step 10)**
10a. Inventory system reports insufficient stock
10b. System releases payment authorization
10c. System displays out-of-stock message
10d. System offers alternatives: remove item, notify when available, or cancel order
10e. Customer makes selection
10f. If items remain, return to step 2; otherwise end

---

**Postconditions:**
- Order record exists with unique order number
- Payment is authorized/captured
- Inventory is reserved for order items
- Customer received confirmation email
- Order appears in customer's order history`
  },
  {
    id: 'cs204-t2-ex9',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Requirements Traceability Matrix',
    description: 'Create a requirements traceability matrix for a simple task management application. Include at least 6 requirements traced to their source, related design components, test cases, and current status. Explain why requirements traceability is important.',
    difficulty: 3,
    hints: [
      'Include requirement ID, description, source, and priority',
      'Show bidirectional tracing (forward and backward)',
      'Consider what happens when requirements change'
    ],
    solution: `**Requirements Traceability Matrix - Task Management App**

| Req ID | Requirement Description | Source | Priority | Design Component | Test Case(s) | Status |
|--------|------------------------|--------|----------|------------------|--------------|--------|
| REQ-001 | User can create a new task with title and description | User Interview #3 | Must | TaskService.create(), TaskForm component | TC-001, TC-002 | Implemented |
| REQ-002 | Tasks can be assigned a due date | Stakeholder Workshop | Must | Task model, DatePicker component | TC-003, TC-004 | Implemented |
| REQ-003 | Tasks can be marked as complete | User Interview #1, #3 | Must | TaskService.complete(), TaskCard component | TC-005 | Implemented |
| REQ-004 | System sends reminder 24 hours before due date | Product Manager | Should | NotificationService, TaskScheduler | TC-010, TC-011 | In Progress |
| REQ-005 | Tasks can be organized into projects | User Survey (67% requested) | Should | Project model, ProjectService | TC-015, TC-016 | Not Started |
| REQ-006 | User can filter tasks by status and due date | Usability Testing | Could | TaskFilter component, TaskService.filter() | TC-020, TC-021 | Not Started |

---

**Importance of Requirements Traceability:**

1. **Impact Analysis:** When a requirement changes, the matrix immediately shows which design components and test cases are affected. For example, if REQ-002 changes to support time (not just date), we know to update the Task model, DatePicker, and test cases TC-003/TC-004.

2. **Verification Coverage:** Ensures every requirement has associated test cases. The matrix reveals gaps—any requirement without test cases needs attention before release.

3. **Scope Management:** Links requirements to their original source, helping prioritize and justify features. If stakeholders question why REQ-005 exists, we can point to user survey data.

4. **Progress Tracking:** Status column provides quick visibility into implementation progress across all requirements.

5. **Compliance:** Many industries require proof that all requirements were implemented and tested. The matrix provides auditable evidence.

6. **Change Management:** When sources change (regulations update, stakeholder leaves), we can identify affected requirements and reassess priorities.`
  },
  {
    id: 'cs204-t2-ex10',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Requirements Validation Techniques',
    description: 'You\'ve completed the requirements specification for a flight booking system. Describe four different validation techniques you would use to ensure the requirements are correct, complete, and consistent. For each technique, explain the process and what types of issues it would catch.',
    difficulty: 3,
    hints: [
      'Consider both formal and informal techniques',
      'Think about involving different stakeholders',
      'Some techniques are better for certain types of issues'
    ],
    solution: `**Requirements Validation Techniques for Flight Booking System:**

**1. Requirements Review/Walkthrough**

*Process:*
- Schedule structured review meetings with stakeholders (business analysts, developers, testers, end users)
- Distribute requirements document in advance for preparation
- Walk through each requirement systematically
- Reviewers identify issues, ask questions, suggest improvements
- Document all findings and track resolution

*Issues Caught:*
- Ambiguous requirements ("flexible cancellation" means what exactly?)
- Missing requirements (no mention of seat selection?)
- Inconsistencies between requirements (REQ-12 says 30-minute hold, REQ-45 says 15-minute)
- Unrealistic requirements (real-time pricing updates every second is expensive)
- Stakeholder misunderstandings before development begins

---

**2. Prototyping**

*Process:*
- Create clickable wireframes/mockups of key user flows (search, booking, payment)
- Conduct usability testing sessions with representative users
- Observe users attempting to complete tasks
- Gather feedback on missing features, confusing flows, and preferences

*Issues Caught:*
- Usability problems (users can't find multi-city booking option)
- Missing UI requirements (need passenger count selector on search)
- Workflow issues (users expect to see total price before entering payment info)
- Discovered requirements users didn't think to mention (want to save traveler profiles)

---

**3. Requirements Inspection (Formal Review)**

*Process:*
- Apply checklist of quality criteria (complete, consistent, testable, traceable)
- Inspect each requirement against checklist criteria
- Use formal defect classification (missing, ambiguous, inconsistent, incorrect)
- Calculate metrics (defects per page, defect density)
- Requirement not approved until defects resolved

*Issues Caught:*
- Untestable requirements ("system shall be user-friendly")
- Missing acceptance criteria
- Requirements without traceability to source
- Technical impossibilities (guarantee 100% uptime)
- Incomplete exception handling (what if payment fails mid-transaction?)

---

**4. Model Validation / Simulation**

*Process:*
- Create formal models (state diagrams, sequence diagrams) from requirements
- Trace scenarios through models to verify completeness
- Use simulation tools to execute models if available
- Verify edge cases and exception paths
- Cross-reference model states with documented requirements

*Issues Caught:*
- Missing state transitions (booking expires but no documented behavior)
- Deadlock situations (payment pending + inventory released = inconsistent state)
- Race conditions (two users booking last seat simultaneously)
- Incomplete process flows (what triggers "booking confirmed" state?)
- Logical contradictions that aren't obvious in text form`
  },
  {
    id: 'cs204-t2-ex11',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Natural Language Requirements Analysis',
    description: 'Analyze the following natural language requirements document excerpt for a university registration system. Identify at least 8 specific problems (ambiguities, inconsistencies, omissions, etc.) and suggest how to fix each one.\n\n"Students should be able to register for classes quickly. The system will prevent overenrollment. Professors can see their class rosters. Prerequisites must be satisfied. The registration period opens in the second week of the semester. Students can drop classes without penalty during the first week. Administrative users have access to everything. The system should handle many concurrent users."',
    difficulty: 4,
    hints: [
      'Look for undefined terms and vague language',
      'Check for logical inconsistencies',
      'Identify missing stakeholder needs',
      'Consider operational requirements'
    ],
    solution: `**Requirements Analysis - Identified Problems:**

**1. Vague Performance Requirement**
- *Problem:* "register for classes quickly" - no measurable criteria
- *Fix:* "The registration process shall complete within 5 seconds from course selection to confirmation, measured at 95th percentile during peak load."

**2. Undefined Mechanism**
- *Problem:* "prevent overenrollment" - doesn't specify how or what happens when attempted
- *Fix:* "The system shall prevent registration when enrolled count equals course capacity. Users attempting to register for full courses shall be offered waitlist enrollment if available, or shown alternative sections."

**3. Missing Functionality**
- *Problem:* "Professors can see their class rosters" - view only? What actions can they take?
- *Fix:* "Professors can view class rosters, export to CSV/PDF, send mass emails to enrolled students, and view student photos if authorized."

**4. Incomplete Constraint**
- *Problem:* "Prerequisites must be satisfied" - who checks? What if override needed?
- *Fix:* "The system shall automatically verify prerequisite completion before allowing registration. Department advisors can grant prerequisite overrides with documented justification."

**5. Timeline Inconsistency**
- *Problem:* Registration opens "second week" but drop without penalty is "first week" - these conflict
- *Fix:* Clarify timeline: "Registration opens during Week 8 of the prior semester. Drop without penalty period extends through Week 2 of the current semester."

**6. Overly Broad Permission**
- *Problem:* "Administrative users have access to everything" - security risk, no role definition
- *Fix:* Define specific administrative roles: "Registrar staff can modify any enrollment. Department admins can modify enrollments within their department. System admins can manage user accounts and system configuration."

**7. Vague Scalability Requirement**
- *Problem:* "handle many concurrent users" - not measurable
- *Fix:* "The system shall support 5,000 concurrent users during registration periods while maintaining response times under 3 seconds."

**8. Missing Requirements - Omissions Identified:**
- *Problem:* No mention of: waitlists, credit hour limits, advisor holds, registration time windows, audit enrollment, cross-registration, accessibility requirements
- *Fix:* Add requirements for each: "Students may register for maximum 18 credit hours without advisor override. Students with registration holds cannot enroll until holds are cleared."`
  },
  {
    id: 'cs204-t2-ex12',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Acceptance Criteria with Gherkin',
    description: 'Write acceptance criteria in Gherkin format (Given-When-Then) for the following user story:\n\n"As an online shopper, I want to apply a discount code to my order so that I can save money on my purchase."\n\nWrite at least 5 scenarios covering the main success path and edge cases.',
    difficulty: 3,
    hints: [
      'Given establishes the context/preconditions',
      'When describes the action being tested',
      'Then describes the expected outcome',
      'Consider invalid codes, expired codes, and combination rules'
    ],
    solution: `**Feature: Apply Discount Code to Order**

\`\`\`gherkin
Feature: Apply Discount Code
  As an online shopper
  I want to apply a discount code to my order
  So that I can save money on my purchase

  Background:
    Given I am logged in as a registered customer
    And I have items totaling $100.00 in my cart
    And I am on the checkout page

  Scenario: Successfully apply a valid percentage discount code
    Given a valid discount code "SAVE20" exists for 20% off
    When I enter "SAVE20" in the discount code field
    And I click "Apply"
    Then I should see a success message "Discount applied: 20% off"
    And the order total should be reduced to $80.00
    And the discount should be displayed as "-$20.00"

  Scenario: Successfully apply a valid fixed amount discount code
    Given a valid discount code "FLAT15" exists for $15 off orders over $50
    When I enter "FLAT15" in the discount code field
    And I click "Apply"
    Then I should see a success message "Discount applied: $15.00 off"
    And the order total should be reduced to $85.00

  Scenario: Attempt to apply an invalid discount code
    When I enter "INVALIDCODE" in the discount code field
    And I click "Apply"
    Then I should see an error message "Invalid discount code"
    And the order total should remain $100.00
    And no discount should be applied

  Scenario: Attempt to apply an expired discount code
    Given a discount code "SUMMER23" expired on 2023-09-01
    When I enter "SUMMER23" in the discount code field
    And I click "Apply"
    Then I should see an error message "This discount code has expired"
    And the order total should remain $100.00

  Scenario: Attempt to apply code that doesn't meet minimum purchase
    Given a valid discount code "BIG50" exists for $50 off orders over $200
    And my cart total is $100.00
    When I enter "BIG50" in the discount code field
    And I click "Apply"
    Then I should see an error message "Minimum purchase of $200.00 required for this code"
    And the order total should remain $100.00

  Scenario: Replace existing discount code with a new one
    Given I have already applied discount code "SAVE10" for 10% off
    And the order total shows $90.00
    When I enter "SAVE20" in the discount code field
    And I click "Apply"
    Then I should see a confirmation "Replace existing discount?"
    When I confirm replacement
    Then the new discount "SAVE20" should be applied
    And the order total should be $80.00

  Scenario: Remove applied discount code
    Given I have already applied discount code "SAVE20" for 20% off
    When I click "Remove" next to the applied discount
    Then the discount should be removed
    And the order total should return to $100.00
    And the discount code field should be empty
\`\`\``
  },
  {
    id: 'cs204-t2-ex13',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Non-Functional Requirements Specification',
    description: 'Write detailed non-functional requirements for a healthcare patient portal. Cover these quality attributes with at least 2 specific, measurable requirements each:\n1. Performance\n2. Security\n3. Availability\n4. Usability\n5. Compliance',
    difficulty: 4,
    hints: [
      'NFRs should be measurable and testable',
      'Healthcare systems have strict compliance requirements',
      'Consider both normal and peak load scenarios',
      'Include specific standards and regulations'
    ],
    solution: `**Non-Functional Requirements - Healthcare Patient Portal**

---

**1. PERFORMANCE**

**NFR-PERF-001:** The system shall display patient dashboard within 2 seconds of login completion, measured at 95th percentile, when system is operating under normal load (up to 5,000 concurrent users).

**NFR-PERF-002:** Search queries against patient records shall return results within 3 seconds for datasets up to 10 years of patient history, including lab results, prescriptions, and visit summaries.

**NFR-PERF-003:** Document uploads (lab results, images) up to 25MB shall complete within 30 seconds on a standard broadband connection (10 Mbps upload).

---

**2. SECURITY**

**NFR-SEC-001:** All data transmission shall be encrypted using TLS 1.3 or higher. All data at rest shall be encrypted using AES-256 encryption.

**NFR-SEC-002:** User sessions shall automatically terminate after 15 minutes of inactivity. Re-authentication shall be required for any action involving PHI after session timeout.

**NFR-SEC-003:** Failed login attempts shall trigger account lockout after 5 consecutive failures. Lockout duration shall be 30 minutes, with option for administrator unlock.

**NFR-SEC-004:** All access to Protected Health Information (PHI) shall be logged with timestamp, user ID, patient ID, and action performed. Logs shall be immutable and retained for 7 years.

---

**3. AVAILABILITY**

**NFR-AVAIL-001:** The system shall maintain 99.9% uptime, measured monthly, excluding scheduled maintenance windows. This allows maximum 43.8 minutes of unplanned downtime per month.

**NFR-AVAIL-002:** Scheduled maintenance shall occur only during designated windows (Sundays 2:00-6:00 AM EST) with 72-hour advance notice to users.

**NFR-AVAIL-003:** In the event of primary data center failure, the system shall failover to secondary site within 15 minutes with Recovery Point Objective (RPO) of 5 minutes (maximum data loss).

---

**4. USABILITY**

**NFR-USE-001:** The portal shall comply with WCAG 2.1 Level AA accessibility guidelines, enabling use by patients with visual, auditory, and motor impairments.

**NFR-USE-002:** First-time users shall be able to complete core tasks (view appointments, access test results, send message to provider) without training, validated by usability testing achieving 85% task completion rate.

**NFR-USE-003:** The interface shall support English and Spanish languages. Text size shall be adjustable from 100% to 200% without loss of functionality.

**NFR-USE-004:** All pages shall be fully functional on mobile devices (iOS 14+, Android 10+) and tablets, with responsive design adapting to screen sizes from 320px to 2560px width.

---

**5. COMPLIANCE**

**NFR-COMP-001:** The system shall comply with HIPAA Security Rule (45 CFR Part 164) and Privacy Rule requirements, including access controls, audit controls, and transmission security.

**NFR-COMP-002:** Patient data handling shall comply with HITECH Act requirements, including breach notification capabilities within 60 days of discovery.

**NFR-COMP-003:** The system shall support patient rights under 21st Century Cures Act, including providing complete medical records export in FHIR R4 format within 5 business days of request.

**NFR-COMP-004:** Annual third-party security assessment (SOC 2 Type II) shall be conducted and passed, with results available to healthcare organization administrators.`
  },
  {
    id: 'cs204-t2-ex14',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Requirements Conflict Resolution',
    description: 'The following requirements have been gathered for a video streaming platform. Identify the conflicts between requirements and propose resolutions that balance stakeholder needs.\n\n1. Marketing: "Video quality should automatically adjust to highest available"\n2. Engineering: "Default to 720p to minimize server bandwidth costs"\n3. Users: "Remember my quality preference and never auto-adjust"\n4. Legal: "Content must stream at original quality for premium subscribers"\n5. Product: "New users should get best experience to improve conversion"',
    difficulty: 4,
    hints: [
      'Map each requirement to its stakeholder priority',
      'Look for ways to satisfy multiple constraints',
      'Consider user preferences as overrides',
      'Think about different user segments'
    ],
    solution: `**Requirements Conflict Analysis and Resolution**

---

**IDENTIFIED CONFLICTS:**

**Conflict A: Auto-adjust vs. User Preference (Marketing/Users)**
- Marketing wants automatic highest quality
- Users want their preference remembered, no auto-adjustment
- These directly contradict on adaptation behavior

**Conflict B: Highest Quality vs. Cost Optimization (Marketing/Engineering)**
- Marketing: maximize quality
- Engineering: minimize bandwidth costs with 720p default
- Direct conflict on default quality level

**Conflict C: Premium Quality vs. Adaptive (Legal/Marketing)**
- Legal requires original quality for premium subscribers
- Marketing wants adaptive streaming
- Conflict for premium tier behavior

**Conflict D: Bandwidth vs. Conversion (Engineering/Product)**
- Engineering wants to minimize bandwidth
- Product wants best experience for new users
- First-time user experience conflicts with cost goals

---

**PROPOSED RESOLUTION:**

**Unified Quality Strategy with User Segments:**

\`\`\`
Quality Setting Logic:

1. IF user is Premium Subscriber:
   - Default: Original/Source Quality (satisfies Legal)
   - Allow: Manual downgrade only
   - Rationale: Premium pays for best quality

2. IF user is Free/Standard AND has set preference:
   - Use: Saved preference (satisfies Users)
   - Adaptive: Only within user's maximum preference
   - Rationale: Respect returning user choices

3. IF user is New (first session):
   - Default: Auto-adaptive to highest stable quality (satisfies Product/Marketing)
   - Prompt: After first video, ask to save preference
   - Rationale: Best first impression, then capture preference

4. IF user is Free/Standard AND no preference saved:
   - Default: 720p (satisfies Engineering)
   - Show: "Upgrade quality" button prominently
   - Rationale: Balance cost with easy override
\`\`\`

---

**REQUIREMENTS REWRITE:**

**REQ-QOS-001 (Marketing + Product):** "For new users in their first session, video quality shall auto-adapt to the highest sustainable quality based on detected connection speed."

**REQ-QOS-002 (Users):** "After a user's first video completion, the system shall prompt to save quality preference. Saved preferences shall override automatic quality selection."

**REQ-QOS-003 (Engineering):** "For non-premium users without saved preferences, default quality shall be 720p. Adaptive streaming shall not exceed user's subscription tier maximum."

**REQ-QOS-004 (Legal):** "Premium subscribers shall receive content at original source quality by default. Premium users may manually select lower quality but shall not experience automatic downgrade."

**REQ-QOS-005 (All):** "Quality selection control shall be accessible within 2 clicks during playback for all user segments."

---

**STAKEHOLDER SIGN-OFF:**
- Marketing: New users get best experience ✓
- Engineering: Bandwidth controlled for majority of users ✓
- Users: Preferences respected once set ✓
- Legal: Premium requirements protected ✓
- Product: Conversion-focused first experience ✓`
  },
  {
    id: 'cs204-t2-ex15',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Domain Modeling from Requirements',
    description: 'Based on the following requirements for an online course platform, create a domain model. Identify key entities, their attributes, and relationships. Present as a textual description suitable for conversion to a UML class diagram.\n\nRequirements:\n- Students enroll in courses\n- Courses contain multiple modules\n- Modules have lessons (video, text, or quiz)\n- Instructors create and teach courses\n- Students track progress through courses\n- Courses have prerequisites\n- Students receive certificates upon completion',
    difficulty: 4,
    hints: [
      'Identify nouns as potential entities',
      'Identify verbs as potential relationships',
      'Consider cardinality (one-to-many, many-to-many)',
      'Think about what attributes each entity needs'
    ],
    solution: `**Domain Model - Online Course Platform**

---

**ENTITIES AND ATTRIBUTES:**

**User (Abstract)**
- userId: UUID
- email: String
- passwordHash: String
- firstName: String
- lastName: String
- createdAt: DateTime
- lastLoginAt: DateTime

**Student (extends User)**
- enrollmentDate: DateTime
- completedCourses: Integer

**Instructor (extends User)**
- bio: Text
- expertise: String[]
- rating: Decimal

**Course**
- courseId: UUID
- title: String
- description: Text
- price: Decimal
- status: Enum (Draft, Published, Archived)
- difficultyLevel: Enum (Beginner, Intermediate, Advanced)
- estimatedHours: Integer
- createdAt: DateTime
- publishedAt: DateTime

**Module**
- moduleId: UUID
- title: String
- description: Text
- orderIndex: Integer

**Lesson (Abstract)**
- lessonId: UUID
- title: String
- orderIndex: Integer
- estimatedMinutes: Integer

**VideoLesson (extends Lesson)**
- videoUrl: String
- duration: Integer
- transcript: Text

**TextLesson (extends Lesson)**
- content: Text

**QuizLesson (extends Lesson)**
- passingScore: Integer
- maxAttempts: Integer

**QuizQuestion**
- questionId: UUID
- questionText: Text
- questionType: Enum (MultipleChoice, TrueFalse)
- correctAnswer: String
- options: String[]

**Enrollment**
- enrollmentId: UUID
- enrolledAt: DateTime
- status: Enum (Active, Completed, Dropped)
- completedAt: DateTime (nullable)

**Progress**
- progressId: UUID
- completedAt: DateTime
- score: Integer (for quizzes)
- attempts: Integer (for quizzes)

**Certificate**
- certificateId: UUID
- issuedAt: DateTime
- certificateUrl: String
- verificationCode: String

---

**RELATIONSHIPS:**

\`\`\`
Student ----< Enrollment >---- Course
  "A student has many enrollments"
  "A course has many enrollments"
  (Many-to-Many through Enrollment)

Instructor ----< Course
  "An instructor teaches many courses"
  "A course has one primary instructor"
  (One-to-Many)

Course ----< Module
  "A course contains many modules"
  "A module belongs to one course"
  (One-to-Many, ordered)

Module ----< Lesson
  "A module contains many lessons"
  "A lesson belongs to one module"
  (One-to-Many, ordered)

QuizLesson ----< QuizQuestion
  "A quiz has many questions"
  "A question belongs to one quiz"
  (One-to-Many)

Course ----< Course (Prerequisites)
  "A course may require prerequisite courses"
  "A course may be prerequisite for other courses"
  (Many-to-Many, self-referential)

Enrollment ----< Progress >---- Lesson
  "Progress tracks lessons completed per enrollment"
  (Many-to-Many through Progress)

Enrollment ---- Certificate
  "A completed enrollment generates one certificate"
  (One-to-One, optional)
\`\`\`

---

**DOMAIN RULES:**

1. Student can only enroll in a course if all prerequisites are completed
2. Certificate is generated when all modules are completed with passing quiz scores
3. Progress percentage = (completed lessons / total lessons) × 100
4. Module is complete when all lessons are complete
5. Instructor must be verified before publishing courses`
  },
  {
    id: 'cs204-t2-ex16',
    subjectId: 'cs204',
    topicId: 'cs204-topic-2',
    type: 'written',
    title: 'Requirements Engineering Case Study',
    description: 'A startup is building a ride-sharing app to compete with Uber. The founder says: "I want exactly what Uber has." As a requirements engineer, explain why this is problematic and describe how you would approach gathering proper requirements. Include specific questions you would ask and elicitation techniques you would use.',
    difficulty: 5,
    hints: [
      'Consider why copying isn\'t sufficient',
      'Think about differentiation and market positioning',
      'Consider technical, legal, and resource constraints',
      'Plan a structured requirements elicitation process'
    ],
    solution: `**Requirements Engineering Analysis: Ride-Sharing Startup**

---

**WHY "COPY UBER" IS PROBLEMATIC:**

1. **No Differentiation:** If the product is identical, why would users switch? No competitive advantage or value proposition.

2. **Resource Reality:** Uber has thousands of engineers and billions in funding. A startup cannot replicate their feature set with limited resources.

3. **Hidden Complexity:** Visible features (app UI) are 10% of the system. The remaining 90% (fraud detection, surge pricing algorithms, driver incentives, regulatory compliance) isn't visible.

4. **Legal/Regulatory:** Uber's approach may include licensing, insurance structures, and regulatory relationships specific to their scale and history.

5. **Technical Debt vs. Innovation:** Uber carries years of legacy decisions. A new entrant can make better architectural choices.

6. **Unknown Requirements:** "What Uber has" doesn't capture the founder's actual vision, target market, or differentiators.

---

**ELICITATION APPROACH:**

**Phase 1: Stakeholder Interviews**

*Questions for Founder:*
- "What problem are you really trying to solve that isn't being solved?"
- "Who is your ideal first customer? What geographic market?"
- "What would make riders choose you over Uber specifically?"
- "What's your budget and timeline for MVP?"
- "What happens if you can't get drivers? Riders?"
- "What regulations exist in your target market?"

*Questions for Potential Users (Riders):*
- "What frustrates you about your current ride-sharing app?"
- "What would make you try a new ride-sharing service?"
- "How do you currently handle rides that apps don't serve well?"
- "What's most important: price, speed, safety, or something else?"

*Questions for Potential Drivers:*
- "What do you like/dislike about driving for current platforms?"
- "What would make you switch to a new platform?"
- "How do you decide when and where to drive?"

---

**Phase 2: Competitive Analysis (Document Analysis)**

- Analyze Uber, Lyft, and regional competitors
- Identify table-stakes features vs. differentiators
- Review public complaints and pain points
- Study regulatory requirements in target markets

---

**Phase 3: Market Positioning Workshop**

Facilitated session to define:
- Target market segment (e.g., college campuses, suburban areas, specific city)
- Unique value proposition (e.g., "rides for seniors," "eco-friendly rides only," "subscription-based")
- MVP feature set (what's essential for launch vs. later)
- Competitive positioning matrix

---

**Phase 4: Prototype and Validate**

- Create low-fidelity prototypes of key differentiating features
- Test with target users
- Validate assumptions about what users want
- Refine requirements based on feedback

---

**RECOMMENDED OUTPUT:**

Instead of "copy Uber," deliver:

1. **Vision Statement:** "A ride-sharing platform for [target market] that differentiates through [unique value]"

2. **Prioritized Feature List:** MoSCoW prioritized, with MVP clearly defined

3. **User Stories:** For each feature, tied to specific user personas

4. **Non-Functional Requirements:** Performance, security, and scalability appropriate to startup scale (not Uber scale)

5. **Regulatory Checklist:** Compliance requirements for target market

6. **Success Metrics:** How we measure if we're achieving goals

---

**KEY INSIGHT:**

The goal isn't to capture what Uber built—it's to discover what this startup should build. That requires understanding the market, the users, the competitive landscape, and the founder's actual vision and constraints.`
  }
];
