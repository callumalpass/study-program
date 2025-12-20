---
id: cs404-t5-qa-process
title: "QA Process"
order: 7
---

# QA Process

Quality Assurance encompasses more than automated testing. A comprehensive QA process includes systematic manual testing, user acceptance testing, and structured verification procedures that ensure your application works correctly in real-world scenarios. For capstone projects, establishing a QA process demonstrates professional software development practices and helps catch issues that automated tests might miss.

## Beyond Automated Testing

While automated tests are essential, they have limitations. Automated tests verify that code behaves as programmed, but they cannot assess whether the behavior is actually what users need. They cannot evaluate subjective qualities like usability, visual design, or whether error messages are helpful. They struggle with exploratory scenarios where unexpected user behavior might reveal bugs.

Quality assurance bridges these gaps through complementary testing approaches. A complete QA strategy combines automated tests (for regression prevention and fast feedback) with manual testing (for exploratory testing and user experience) and user acceptance testing (for validating requirements).

## Manual Testing Strategies

Manual testing is not about randomly clicking through your application. Effective manual testing follows structured approaches:

### Exploratory Testing

Exploratory testing combines test design and execution simultaneously. The tester actively explores the application, designing tests based on what they learn. This approach excels at finding unexpected issues.

Run exploratory sessions with a specific charter:

```
Charter: Explore the checkout flow for edge cases
Time: 30 minutes
Focus: Error handling when payment fails
Questions: What happens if the user navigates away mid-transaction?
           How does the system handle network interruptions?
```

During the session, take notes on what you tried, what worked, and what failed. After the session, convert important findings into bug reports or automated test cases.

### Scenario-Based Testing

Create realistic user scenarios and walk through them end-to-end. Unlike unit tests that verify isolated functions, scenario testing validates complete user journeys.

Example scenario for an e-commerce application:

```
Scenario: First-time customer completes purchase
Given: User has never used the site before
Steps:
1. Browse product catalog without logging in
2. Add items to cart
3. Proceed to checkout
4. Create account during checkout (not before)
5. Enter shipping address with autocomplete
6. Select express shipping
7. Enter payment information
8. Apply a discount code
9. Review and confirm order
10. Verify confirmation email received
Expected: Order confirmed, email received within 2 minutes,
          order appears in account history
```

### Regression Testing

Before each release, run through critical paths to verify nothing is broken. Create a regression test checklist:

```markdown
## Pre-Release Regression Checklist

### Authentication
- [ ] New user can register with valid email
- [ ] Login works with correct credentials
- [ ] Login fails gracefully with wrong password
- [ ] Password reset flow completes successfully

### Core Features
- [ ] Main dashboard loads within 3 seconds
- [ ] Data displays correctly after refresh
- [ ] Search returns relevant results
- [ ] Filters work in combination

### Critical Paths
- [ ] Complete purchase flow (guest checkout)
- [ ] Complete purchase flow (logged-in user)
- [ ] Order cancellation works
- [ ] Refund request submits correctly
```

## User Acceptance Testing

User Acceptance Testing (UAT) validates that the software meets business requirements and is acceptable to end users. For capstone projects, this typically involves having actual users (classmates, stakeholders, or target audience members) test your application.

### Planning UAT

Define clear acceptance criteria before UAT begins:

```markdown
Feature: Shopping Cart

Acceptance Criteria:
1. Users can add items to cart from product page
2. Cart persists across browser sessions (if logged in)
3. Users can modify quantities or remove items
4. Cart total updates automatically
5. Shipping estimate shows before checkout
```

### Conducting UAT Sessions

Structure UAT sessions to gather useful feedback:

1. **Brief the tester**: Explain what the application does without telling them how to use it
2. **Assign tasks**: Give specific goals ("Add two items to your cart and check out")
3. **Observe silently**: Watch how they interact without interrupting
4. **Ask questions**: After they complete (or struggle), ask about their experience
5. **Document findings**: Note both bugs and usability issues

Create a simple feedback form:

```markdown
## UAT Feedback Form

Task attempted: ______________________________
Completed successfully: Yes / No / Partial

Difficulty level: Easy | Moderate | Difficult | Could not complete

What was confusing? ______________________________

What would you improve? ______________________________

Bugs encountered: ______________________________
```

### Incorporating Feedback

Triage UAT feedback systematically:

- **Bugs**: File in issue tracker, prioritize by severity
- **Usability issues**: Evaluate effort vs. impact, schedule for improvement
- **Feature requests**: Document for potential future work
- **Out of scope**: Acknowledge but defer

## Bug Tracking and Triage

A structured bug tracking process prevents issues from falling through cracks:

### Writing Good Bug Reports

Every bug report should include:

```markdown
## Bug Report Template

**Title**: Clear, specific summary

**Environment**: Browser, OS, device

**Steps to Reproduce**:
1. Specific step one
2. Specific step two
3. ...

**Expected Result**: What should happen

**Actual Result**: What actually happens

**Severity**: Critical / High / Medium / Low

**Screenshots/Recordings**: Attach evidence
```

### Bug Triage

Regularly review and prioritize bugs:

- **Critical**: Application crashes, data loss, security vulnerabilities. Fix immediately.
- **High**: Major features broken, significant user impact. Fix before release.
- **Medium**: Features work but with issues. Schedule for upcoming sprint.
- **Low**: Minor issues, cosmetic problems. Fix when convenient.

## QA Process for Capstone Projects

For your capstone, implement a lightweight but effective QA process:

1. **Weekly exploratory session**: Spend 30 minutes each week exploring your application looking for issues
2. **Pre-commit checklist**: Before merging major features, manually verify basic functionality
3. **UAT milestone**: Schedule at least one formal UAT session mid-project with real users
4. **Regression suite**: Maintain a list of critical paths to test before each release
5. **Bug tracking**: Use GitHub Issues or a simple spreadsheet to track all bugs

Document your QA activities. In your capstone report, include:

- Summary of testing approaches used
- UAT session outcomes and how feedback was incorporated
- Bug statistics (found vs. fixed)
- Lessons learned about quality assurance

## Summary

Quality assurance extends beyond automated testing to include manual testing, exploratory testing, and user acceptance testing. A structured QA process catches issues that automated tests miss and validates that the software truly meets user needs. For capstone projects, implementing even a lightweight QA process demonstrates professional development practices. The key elements are: structured exploratory testing, realistic scenario testing, user acceptance testing with real users, and systematic bug tracking. These practices, combined with automated testing, create a comprehensive quality strategy.
