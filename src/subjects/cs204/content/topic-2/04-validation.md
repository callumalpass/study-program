---
id: cs204-t2-validation
title: "Requirements Validation"
order: 4
---

# Requirements Validation and Verification

Requirements validation and verification are critical quality assurance activities that ensure requirements are correct, complete, and suitable for guiding development. Despite their similar-sounding names, these are distinct processes: verification asks "Are we building the requirements right?" while validation asks "Are we building the right requirements?" Both are essential for project success.

## Understanding Validation vs. Verification

**Verification** checks that requirements documents meet quality standards and follow proper specification practices. It ensures requirements are well-formed, consistent, complete, and unambiguous. Verification is about the quality of the requirements documentation itself.

**Validation** ensures requirements accurately reflect stakeholder needs and that the proposed system will actually solve the intended problems. It confirms that when implemented, these requirements will result in a system that meets business objectives and user needs.

Think of it this way: Verification ensures the requirements are documented correctly. Validation ensures they're the correct requirements to document.

## Requirements Validation Techniques

### Stakeholder Reviews

The most fundamental validation technique is having stakeholders review and approve requirements. This direct confirmation ensures the documented requirements match stakeholder expectations.

**Structured Walkthroughs**: Present requirements to stakeholders in organized sessions. Walk through each requirement or use case, explaining what it means and how it will work. Encourage stakeholders to ask questions, raise concerns, and suggest modifications.

**Review Meetings**: Schedule dedicated sessions where stakeholders examine requirements documents and provide feedback. Distribute materials in advance so participants can prepare. Use a formal sign-off process where stakeholders explicitly approve requirements they've reviewed.

**Individual Reviews**: For detailed technical reviews, one-on-one sessions with subject matter experts often work better than large group meetings. These allow deep dives into specific areas without consuming everyone's time.

**Best Practices for Stakeholder Reviews**: Use concrete examples and scenarios rather than abstract descriptions. Avoid technical jargon when communicating with non-technical stakeholders. Focus on one requirement area at a time to prevent overwhelm. Document all feedback and decisions made during reviews. Follow up with written summaries confirming what was agreed.

### Prototyping and Simulation

Building working prototypes or simulations allows stakeholders to interact with a representation of the proposed system, validating requirements through direct experience rather than abstract documentation.

**Throwaway Prototypes**: Create quick, simple prototypes focused on key features or uncertain requirements. Show these to users and observe their reactions. A user saying "No, that's not what I meant" when seeing a prototype catches misunderstandings before they're coded into the real system.

**Pilot Systems**: For large-scale systems, implement a small pilot with limited scope or users. This validates requirements in real-world conditions and often reveals unstated or misunderstood requirements.

**Simulations**: For systems involving complex processes or calculations, simulations can demonstrate whether requirements produce expected outcomes. For example, simulating a month's worth of transactions can validate that a proposed reporting system will produce correct results.

### Scenarios and Test Cases

Developing concrete scenarios and test cases early reveals whether requirements are sufficient to support real-world usage.

**Scenario Walkthroughs**: Create realistic scenarios representing typical system usage. Walk through these scenarios using the documented requirements to see if they fully support each step. Gaps in the scenarios indicate missing requirements.

**Use Case Analysis**: Examine use cases to ensure all necessary alternative and exception flows are captured. Ask "What if?" questions: "What if the network fails?" "What if two users try to update the same record simultaneously?" These questions often reveal missing requirements.

**Test Case Development**: Write detailed test cases based on requirements before implementation begins. If you can't devise tests to verify a requirement, it's likely too vague or incomplete. This "testability check" improves requirement quality.

### Model Validation

Creating various models of the system can reveal inconsistencies and gaps in requirements.

**Data Flow Diagrams**: Model how data moves through the system. Ensure all required data transformations, storage, and retrieval are supported by requirements.

**State Diagrams**: For systems with complex state management, model valid states and transitions. Verify that requirements cover all necessary state changes and guard conditions.

**Entity-Relationship Diagrams**: Model data structures and relationships. Ensure requirements capture all necessary data entities, attributes, and relationships.

**Process Models**: Create models of business processes the system will support. Validate that requirements enable all steps in these processes.

## Requirements Verification Techniques

### Inspections and Reviews

Formal inspections systematically examine requirements documents to find defects before they propagate to design and implementation.

**Fagan Inspections**: A rigorous, role-based review process. Participants include a moderator who facilitates the process, readers who present the requirements, reviewers who examine them, and the author. The inspection follows defined stages: planning, overview, preparation, inspection meeting, rework, and follow-up. Research shows Fagan inspections catch 60-90% of defects.

**Peer Reviews**: Less formal than Fagan inspections but still structured. Team members review requirements documents looking for defects. Use checklists to ensure comprehensive coverage of potential issues.

**Inspection Focus Areas**: Look for ambiguity (terms with multiple interpretations), inconsistency (contradictory requirements), incompleteness (missing requirements or information), incorrect facts (wrong assumptions or data), and unrealistic requirements (impossible to implement or test).

### Checklist-Based Verification

Checklists ensure systematic coverage of quality criteria. A good requirements verification checklist includes:

**Completeness Checks**:
- Are all stakeholder needs represented?
- Are all required features documented?
- Are all interfaces to external systems specified?
- Are all non-functional requirements captured?
- Are all error conditions and exception handling specified?

**Correctness Checks**:
- Do requirements accurately reflect stakeholder needs?
- Are all technical facts accurate?
- Are calculations and algorithms correct?
- Are references to standards and regulations accurate?

**Consistency Checks**:
- Do any requirements contradict each other?
- Are terms used consistently throughout the document?
- Do different sections use compatible assumptions?
- Are requirement priorities consistent with business goals?

**Clarity Checks**:
- Can each requirement be interpreted in only one way?
- Are all terms clearly defined?
- Are acronyms and abbreviations explained?
- Would someone unfamiliar with the project understand the requirements?

**Verifiability Checks**:
- Can each requirement be tested?
- Are acceptance criteria clear and measurable?
- Are quantitative criteria specified where appropriate?
- Can you determine when the requirement is satisfied?

**Traceability Checks**:
- Is each requirement traced to its source?
- Can you identify which design elements address each requirement?
- Can you trace from requirements to test cases?

### Automated Analysis

Tools can automatically check certain aspects of requirements quality.

**Natural Language Analysis**: Tools like QuARS or ARM can analyze requirements text for quality issues. They detect ambiguous words ("fast," "user-friendly," "efficient"), vague terms ("several," "some," "appropriate"), weak phrases ("adequate," "as much as possible"), and subjective language.

**Consistency Checking**: Requirements management tools can flag duplicate requirements, contradictory specifications, and inconsistent terminology. They can also verify that all references to other requirements are valid.

**Completeness Analysis**: Tools can check that all required sections of an SRS are present, all requirements have assigned priorities, all requirements have acceptance criteria, and all dependencies are documented.

**Metrics Analysis**: Tools can calculate metrics like requirements volatility (how often requirements change), requirements size and complexity, and traceability coverage (percentage of requirements traced to design and tests).

## Quality Criteria for Requirements

Effective validation and verification check requirements against these quality criteria:

**Necessary**: Every requirement should document something genuinely needed. Avoid "gold plating" - features that sound nice but don't address real stakeholder needs.

**Unambiguous**: Requirements should have exactly one interpretation. Terms like "fast," "user-friendly," "flexible," and "robust" are red flags indicating ambiguity.

**Complete**: Requirements should contain all necessary information. Don't make readers guess or assume. Specify preconditions, inputs, processing, outputs, and postconditions.

**Consistent**: Requirements shouldn't contradict each other. Watch for conflicts in timing (one requirement says "immediate," another says "batch processing nightly"), priority (two requirements claim to be highest priority but can't both be), or functionality (one says "publicly accessible," another says "requires authentication").

**Verifiable**: You must be able to devise a cost-effective test to determine whether the requirement is satisfied. "The system shall be easy to use" is not verifiable. "First-time users shall complete their initial transaction within 5 minutes without assistance" is verifiable.

**Feasible**: Requirements should be achievable within project constraints. Requiring "zero downtime" or "instantaneous response" may be impossible given technical and budgetary constraints.

**Traceable**: You should be able to trace requirements backward to their source (stakeholder, regulation, business goal) and forward to design, implementation, and test artifacts.

**Ranked**: Requirements should have priorities indicating their relative importance. Not everything can be highest priority. Common schemes include MoSCoW (Must/Should/Could/Won't), High/Medium/Low, or numerical ranking.

## Common Validation and Verification Challenges

**Stakeholder Availability**: Stakeholders may be too busy to participate in thorough reviews. Mitigate this by scheduling reviews well in advance, keeping sessions focused and time-bound, and providing clear agendas.

**Tacit Knowledge**: Stakeholders may not realize they haven't communicated crucial information because it's "obvious" to them. Use prototyping and scenarios to surface this tacit knowledge.

**Changing Requirements**: Requirements may change during validation as stakeholders gain better understanding. This is normal and valuable - it's better to discover changes during validation than during testing.

**Technical Complexity**: Some requirements involve complex technical details that stakeholders don't fully understand. Bridge this gap with visualizations, analogies, and prototypes that make technical concepts accessible.

## Validation and Verification in Different Methodologies

**Traditional/Waterfall**: Conduct formal validation and verification before moving to design phase. Use comprehensive reviews, inspections, and formal sign-offs. The high cost of late changes makes thorough V&V essential.

**Agile**: Validation and verification happen continuously. Acceptance criteria serve as verification checks. Sprint reviews validate stories with stakeholders. Automated testing verifies requirements are correctly implemented.

**Hybrid Approaches**: Many organizations use staged V&V, conducting thorough validation early for high-level requirements, then validating detailed requirements iteratively as they're refined.

## Conclusion

Requirements validation and verification are not optional niceties - they're essential quality assurance activities. The cost of finding and fixing requirements defects increases exponentially as the project progresses. A defect caught during requirements validation might cost hours to fix; the same defect found during system testing might cost weeks; discovered after deployment, it might cost months or prove unfixable within budget.

Effective V&V uses multiple techniques: stakeholder reviews to validate against real needs, inspections to verify documentation quality, prototyping to make abstract requirements concrete, and automated analysis to catch common errors. By investing in thorough validation and verification, you ensure requirements are both correct and correctly documented, establishing a solid foundation for successful development.
