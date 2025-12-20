---
id: cs204-t2-management
title: "Requirements Management"
order: 5
---

# Requirements Management

Requirements management encompasses the activities needed to maintain requirements throughout the project lifecycle. Even the best initial requirements will change as stakeholders gain understanding, business conditions evolve, and technical constraints become clear. Effective requirements management ensures these changes are handled systematically, maintaining project coherence while accommodating necessary evolution.

## The Challenge of Change

Research consistently shows that requirements changes are inevitable. Studies indicate that typical projects experience 25-40% requirements volatility (changes to initial requirements) over their lifecycle. Some changes reflect genuine evolution of stakeholder needs. Others result from improved understanding - requirements that were initially misunderstood or incompletely specified.

The challenge isn't preventing change - attempting to freeze requirements often leads to building the wrong system. Instead, the challenge is managing change in a controlled, systematic way that maintains project integrity while accommodating legitimate evolution.

**Uncontrolled Change Problems**: Requirements added without impact analysis can blow budgets and schedules. Inconsistent requirements (some updated, others not) create confusion and defects. Lost traceability makes it impossible to assess change impacts. Undocumented changes create discrepancies between specifications and implementation.

**Benefits of Good Change Management**: Controlled evaluation of proposed changes ensures only valuable changes are accepted. Impact analysis reveals the full cost of changes before commitment. Maintained traceability enables accurate impact assessment. Documentation keeps all stakeholders synchronized. Audit trails show what changed, when, why, and who approved it.

## Requirements Traceability

Traceability is the ability to follow a requirement through all phases of development. It works in two directions: backward traceability links requirements to their sources (stakeholder needs, regulations, business goals), while forward traceability links requirements to design elements, code modules, and test cases.

### Why Traceability Matters

**Impact Analysis**: When a requirement changes, traceability reveals everything affected - which design elements must be revised, which code must be modified, which tests must be updated. Without traceability, impact analysis becomes guesswork.

**Coverage Verification**: Forward traceability shows whether all requirements are implemented and tested. Backward traceability shows whether all design and code traces to actual requirements (preventing gold plating).

**Change Management**: Traceability enables accurate effort estimates for proposed changes and helps prioritize change requests by showing their ripple effects.

**Compliance**: Regulated industries often require demonstrating that all regulatory requirements are implemented and tested. Traceability provides this evidence.

**Maintenance**: Years after development, traceability helps maintainers understand why particular design decisions were made and which requirements justify specific implementation choices.

### Traceability Matrix

A traceability matrix documents relationships between requirements and other artifacts. A simple matrix might show:

```
Requirement ID | Source | Design Element | Code Module | Test Case
REQ-1.2.3 | Stakeholder Interview #5 | UserAuth module | auth.js | TC-45, TC-46
REQ-1.2.4 | GDPR Article 17 | DataDeletion service | data-mgmt.js | TC-47, TC-48, TC-49
REQ-2.1.1 | Business Rule BR-15 | PricingEngine | pricing.js | TC-67, TC-68
```

**Matrix Types**: Requirements-to-source matrix documents where each requirement came from. Requirements-to-design matrix shows which design elements address each requirement. Requirements-to-code matrix links requirements to implementation modules. Requirements-to-test matrix shows test coverage for each requirement.

### Maintaining Traceability

**Tool Support**: Manual traceability maintenance is tedious and error-prone. Requirements management tools like Jama, Helix RM, or even well-structured spreadsheets help maintain traceability links. Modern tools can parse code comments or test annotations to automatically establish some traceability links.

**Process Integration**: Build traceability maintenance into development processes. Require developers to reference requirement IDs in code comments and commit messages. Require testers to link test cases to requirements. Review traceability coverage in code reviews and during sprints.

**Bidirectional Links**: Maintain links in both directions. Not only should requirements point to tests, but tests should reference requirements. This redundancy catches broken links and makes navigation easier.

**Regular Audits**: Periodically verify that traceability is complete and current. Check that all requirements trace forward to implementation and tests. Verify that all code and tests trace back to requirements. Identify and remedy gaps.

## Change Management Process

A systematic change management process balances the need for flexibility with the need for control. The process typically involves these steps:

### Change Request Submission

Anyone should be able to propose changes - stakeholders, developers, testers, or customers. Provide a standard change request form capturing:

- **Description**: Clear explanation of the proposed change
- **Justification**: Why the change is needed
- **Priority**: Urgency and importance
- **Type**: New feature, modification, defect fix, clarification
- **Requester**: Who's asking for the change
- **Date**: When the request was submitted

Encourage detailed change requests. Vague requests like "make it faster" require multiple rounds of clarification, slowing the process.

### Initial Assessment

A designated person or team performs initial triage:

- **Validity Check**: Is this truly a change request or a misunderstanding of existing requirements?
- **Duplication Check**: Has this change already been requested or implemented?
- **Preliminary Classification**: Estimate size (minor, moderate, major) and urgency (critical, important, nice-to-have)
- **Routing**: Assign to appropriate reviewers based on technical domain

Reject invalid or duplicate requests quickly to avoid wasting review effort. For valid requests, gather any additional information needed for impact analysis.

### Impact Analysis

This is the most critical step. Thoroughly analyze the proposed change's effects:

**Technical Impact**: Which requirements will be added, deleted, or modified? Which design elements must change? Which code modules must be modified? Which interfaces are affected? Are new technologies or tools required?

**Schedule Impact**: How many person-hours of effort are required? Will this delay planned releases? Does it affect critical path activities? Can it be done in parallel with ongoing work or does it require serialization?

**Cost Impact**: Direct costs (development, testing, documentation). Indirect costs (delayed features, opportunity costs). Cost of not making the change (workarounds, lost business, user dissatisfaction).

**Risk Impact**: Does the change introduce new risks? Does it affect safety, security, or compliance? How well is the change understood? What's the probability of implementation issues?

**Stakeholder Impact**: Who benefits from the change? Who might be negatively affected? Are there training implications? Does it affect existing users' workflows?

**Quality Impact**: Does the change improve or potentially degrade quality? Are testing resources adequate? Does it introduce technical debt?

Use traceability information to ensure comprehensive impact analysis. A change to one requirement might cascade to many dependent requirements.

### Change Evaluation and Decision

Present impact analysis to decision-makers - typically a Change Control Board (CCB) comprising stakeholders, technical leads, project managers, and quality assurance representatives.

**Decision Criteria**: Value delivered versus cost and risk. Alignment with project goals and strategy. Impact on schedule and budget. Availability of resources. Dependencies on other changes or external factors.

**Decision Options**: Approve immediately for high-value, low-risk changes. Defer to a future release for valuable but costly changes. Reject if costs and risks outweigh benefits. Request more information if impact analysis is insufficient.

**Prioritization**: When multiple changes are approved, prioritize based on value, dependencies, and resource availability. Use frameworks like MoSCoW or weighted scoring models.

### Implementation and Verification

Once approved, treat the change request like any other work item:

- Update requirements documentation with the change
- Update traceability matrices
- Assign development resources
- Track progress against estimates
- Review and test implementations
- Update all affected artifacts (design docs, user guides, training materials)
- Verify that the change delivers expected benefits

### Communication and Closure

Communicate changes to all affected parties. Update stakeholders on status and closure. Document lessons learned, especially for changes that encountered unexpected issues. Conduct post-implementation reviews for major changes to verify they delivered expected value.

## Requirements Baseline and Versioning

A baseline is a set of requirements that has been formally reviewed and approved, serving as the foundation for development. Baselines provide stability while allowing controlled evolution.

### Creating Baselines

Initial baseline typically occurs after requirements validation, before design begins. Subsequent baselines occur at major milestones (end of design, before testing, at release). Each baseline represents a snapshot of requirements at a point in time.

**Baseline Contents**: All requirements documents. Traceability matrices. Supporting models and prototypes. Acceptance criteria and test plans. Known issues and deferred features.

**Baseline Approval**: Formal sign-off from stakeholders. Technical review by development and QA. Risk assessment by project management. Documented approval decisions and any conditions.

### Version Control

Treat requirements like code - use version control systems:

**Document Versioning**: Maintain version numbers (e.g., 1.0, 1.1, 2.0). Use semantic versioning: major versions for significant restructuring, minor versions for changes affecting functionality, patch versions for clarifications and corrections.

**Requirement-Level Versioning**: Track individual requirement changes. Maintain change history showing what changed, when, why, and who approved it. Use requirement IDs that remain stable across versions.

**Branch Management**: For complex projects, use branches for different releases or variants. Merge changes systematically with appropriate reviews.

**Audit Trails**: Maintain complete history of all changes. Ensure ability to recreate any previous baseline. Document rationale for all major changes.

## Requirements Management Tools

While small projects can manage requirements in documents and spreadsheets, larger projects benefit from dedicated tools.

**Document-Based Tools**: Microsoft Word or Google Docs with structured templates and version control. Good for small teams and simple projects. Limited traceability and reporting capabilities.

**Spreadsheet-Based**: Excel or Google Sheets can manage requirements with one row per requirement. Can include columns for priority, status, owner, traceability. Good for small to medium projects. Version control and concurrent editing can be challenging.

**Specialized Requirements Management Tools**: Tools like Jama Connect, IBM DOORS, Helix RM, or Modern Requirements offer sophisticated capabilities: automated traceability, change impact analysis, requirements reuse, integration with development and testing tools, workflow management, and comprehensive reporting.

**Integrated ALM Platforms**: Application Lifecycle Management tools like Jira, Azure DevOps, or Polarion integrate requirements management with project management, development, and testing. Good for teams wanting unified tooling across the lifecycle.

**Wiki-Based Approaches**: Confluence, Notion, or other wikis can organize requirements with good collaboration and version history. Flexibility is both strength and weakness - requires discipline to maintain structure.

### Tool Selection Criteria

Consider project size and complexity, team size and distribution, integration needs with existing tools, budget constraints, learning curve and training requirements, and vendor support and longevity.

## Metrics for Requirements Management

Track metrics to assess requirements management effectiveness:

**Requirements Volatility**: Percentage of requirements changed after baselining. High volatility might indicate poor initial elicitation or unstable business environment.

**Change Request Volume**: Number of change requests over time. Trends help predict future change rates.

**Change Request Cycle Time**: Time from submission to decision and implementation. Long cycles indicate process bottlenecks.

**Requirements Defect Density**: Number of defects traced to requirements errors. High density suggests inadequate validation.

**Traceability Coverage**: Percentage of requirements traced to design, code, and tests. Should approach 100%.

**Requirements Implementation Rate**: Percentage of baselined requirements implemented. Tracks progress and helps identify scope creep.

## Conclusion

Requirements management is not a one-time activity but an ongoing discipline spanning the entire project lifecycle. Effective requirements management balances stability with flexibility, maintaining project coherence while accommodating inevitable change. By establishing clear traceability, systematic change processes, formal baselining, and appropriate tools, you create a foundation for successful software development even in the face of evolving requirements. The investment in good requirements management pays dividends through reduced rework, better stakeholder satisfaction, and more successful project outcomes.
