# Test Management

Test management encompasses the planning, design, execution, monitoring, and control of testing activities throughout the software development lifecycle. Effective test management ensures systematic quality assurance, efficient resource utilization, and clear communication of software quality to stakeholders.

## Test Planning

Test planning defines the scope, approach, resources, and schedule of testing activities. A comprehensive test plan serves as the blueprint for all testing efforts.

### Components of a Test Plan

**Test Objectives**
```markdown
## Test Objectives

1. Verify all functional requirements are implemented correctly
2. Validate system performance meets SLA requirements:
   - API response time < 200ms for 95th percentile
   - Support 1000 concurrent users
   - Database queries < 100ms average
3. Ensure security vulnerabilities are addressed
4. Confirm usability standards are met
5. Validate compatibility across target platforms
```

**Scope and Approach**
```markdown
## Test Scope

### In Scope
- User authentication and authorization
- Product catalog management
- Shopping cart functionality
- Order processing workflow
- Payment integration
- Email notifications

### Out of Scope
- Third-party payment gateway internals
- Email delivery infrastructure
- Content Delivery Network (CDN) performance

## Test Approach

### Test Levels
- **Unit Testing**: Developers, 80% code coverage minimum
- **Integration Testing**: QA team, API and database interactions
- **System Testing**: QA team, end-to-end workflows
- **UAT**: Product owner and selected users

### Test Types
- Functional testing (manual and automated)
- Performance testing (load, stress, endurance)
- Security testing (OWASP Top 10)
- Usability testing (5 representative users)
```

**Resource Planning**
```python
# test_resource_plan.py
class TestResourcePlan:
    """Resource allocation for testing activities."""

    TEAM = {
        'qa_engineers': 3,
        'automation_engineers': 2,
        'performance_testers': 1,
        'security_tester': 1
    }

    TOOLS = {
        'test_management': 'TestRail',
        'automation': ['pytest', 'Selenium', 'Playwright'],
        'performance': 'JMeter',
        'security': 'OWASP ZAP',
        'ci_cd': 'GitHub Actions',
        'bug_tracking': 'Jira'
    }

    SCHEDULE = {
        'unit_testing': 'Ongoing with development',
        'integration_testing': 'Sprint weeks 1-2',
        'system_testing': 'Sprint week 3',
        'performance_testing': 'Sprint week 3',
        'security_testing': 'Sprint week 3',
        'uat': 'Sprint week 4',
        'regression': 'Each sprint'
    }

    ENVIRONMENTS = {
        'development': 'Developer local machines',
        'testing': 'Dedicated QA environment',
        'staging': 'Production-like environment',
        'production': 'Live system (limited testing)'
    }
```

**Risk Assessment**
```markdown
## Test Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Test environment instability | High | High | Dedicated DevOps support, automated provisioning |
| Incomplete requirements | Medium | High | Regular requirement reviews, early testing involvement |
| Insufficient test data | Medium | Medium | Automated test data generation, production data masking |
| Limited UAT availability | High | Medium | Schedule UAT early, flexible testing windows |
| Tight deadlines | High | High | Prioritize critical paths, risk-based testing |
| Tool learning curve | Low | Medium | Training sessions, documentation |
```

## Test Coverage

Test coverage measures how thoroughly tests exercise the software. Multiple coverage metrics provide different perspectives on testing completeness.

### Code Coverage

```python
# Running pytest with coverage
# pytest --cov=src --cov-report=html --cov-report=term

class CoverageExample:
    def process_payment(self, amount, payment_method):
        """Process payment with different methods."""
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if payment_method == "credit_card":
            return self._process_credit_card(amount)
        elif payment_method == "paypal":
            return self._process_paypal(amount)
        elif payment_method == "bitcoin":
            return self._process_bitcoin(amount)
        else:
            raise ValueError(f"Unknown payment method: {payment_method}")

# Tests for coverage
def test_invalid_amount():
    processor = CoverageExample()
    with pytest.raises(ValueError, match="Amount must be positive"):
        processor.process_payment(-10, "credit_card")

def test_credit_card_payment():
    processor = CoverageExample()
    result = processor.process_payment(100, "credit_card")
    assert result.success

def test_paypal_payment():
    processor = CoverageExample()
    result = processor.process_payment(100, "paypal")
    assert result.success

def test_bitcoin_payment():
    processor = CoverageExample()
    result = processor.process_payment(100, "bitcoin")
    assert result.success

def test_unknown_payment_method():
    processor = CoverageExample()
    with pytest.raises(ValueError, match="Unknown payment method"):
        processor.process_payment(100, "unknown")

# This test suite achieves 100% coverage:
# - Line coverage: All lines executed
# - Branch coverage: All if/elif/else branches tested
# - Statement coverage: All statements executed
```

### Requirements Coverage

```python
class RequirementsCoverageTracker:
    """Track test coverage of requirements."""

    def __init__(self):
        self.requirements = {}
        self.tests = {}

    def add_requirement(self, req_id, description):
        """Add requirement to track."""
        self.requirements[req_id] = {
            'description': description,
            'tests': set(),
            'status': 'Not Tested'
        }

    def link_test_to_requirement(self, req_id, test_name):
        """Link test case to requirement."""
        if req_id in self.requirements:
            self.requirements[req_id]['tests'].add(test_name)

    def get_coverage_report(self):
        """Generate requirements coverage report."""
        total_reqs = len(self.requirements)
        tested_reqs = sum(
            1 for req in self.requirements.values()
            if len(req['tests']) > 0
        )

        return {
            'total_requirements': total_reqs,
            'tested_requirements': tested_reqs,
            'coverage_percentage': (tested_reqs / total_reqs * 100)
                if total_reqs > 0 else 0,
            'untested': [
                req_id for req_id, req in self.requirements.items()
                if len(req['tests']) == 0
            ]
        }

# Usage in tests
@pytest.mark.requirement("REQ-001")
def test_user_registration():
    """Test user can register with valid email and password.
    Requirements: REQ-001
    """
    user = register_user("alice@example.com", "SecurePass123!")
    assert user.is_active

@pytest.mark.requirement("REQ-002")
def test_user_login():
    """Test user can login with credentials.
    Requirements: REQ-002
    """
    session = login("alice@example.com", "SecurePass123!")
    assert session.is_authenticated
```

### Risk-Based Test Coverage

```python
class RiskBasedTestPrioritization:
    """Prioritize tests based on risk assessment."""

    def calculate_risk_score(self, probability, impact):
        """Calculate risk score (1-25)."""
        # Probability: 1-5 (1=rare, 5=certain)
        # Impact: 1-5 (1=negligible, 5=catastrophic)
        return probability * impact

    def prioritize_tests(self, test_cases):
        """Prioritize test cases by risk."""
        scored_tests = []

        for test in test_cases:
            risk_score = self.calculate_risk_score(
                test['failure_probability'],
                test['business_impact']
            )
            scored_tests.append({
                'test': test,
                'risk_score': risk_score,
                'priority': self._get_priority(risk_score)
            })

        # Sort by risk score (highest first)
        return sorted(
            scored_tests,
            key=lambda x: x['risk_score'],
            reverse=True
        )

    def _get_priority(self, risk_score):
        """Determine priority based on risk score."""
        if risk_score >= 15:
            return "Critical"
        elif risk_score >= 10:
            return "High"
        elif risk_score >= 5:
            return "Medium"
        else:
            return "Low"

# Example usage
test_cases = [
    {
        'name': 'Payment Processing',
        'failure_probability': 3,
        'business_impact': 5  # Critical business function
    },
    {
        'name': 'User Profile Update',
        'failure_probability': 2,
        'business_impact': 2  # Less critical
    },
    {
        'name': 'Shopping Cart',
        'failure_probability': 4,
        'business_impact': 4  # High risk
    }
]

prioritizer = RiskBasedTestPrioritization()
prioritized = prioritizer.prioritize_tests(test_cases)

# Result prioritizes: Shopping Cart, Payment Processing, User Profile
```

## Test Metrics

Metrics provide quantitative insight into testing effectiveness and software quality.

### Common Test Metrics

```python
class TestMetricsCollector:
    """Collect and calculate test metrics."""

    def __init__(self):
        self.test_results = []

    def add_test_result(self, test_name, status, duration, defects_found):
        """Record test execution result."""
        self.test_results.append({
            'name': test_name,
            'status': status,  # 'pass', 'fail', 'skip'
            'duration': duration,
            'defects_found': defects_found
        })

    def calculate_metrics(self):
        """Calculate comprehensive test metrics."""
        total_tests = len(self.test_results)
        passed = sum(1 for t in self.test_results if t['status'] == 'pass')
        failed = sum(1 for t in self.test_results if t['status'] == 'fail')
        skipped = sum(1 for t in self.test_results if t['status'] == 'skip')

        total_defects = sum(t['defects_found'] for t in self.test_results)
        total_duration = sum(t['duration'] for t in self.test_results)

        return {
            # Test Execution Metrics
            'total_tests': total_tests,
            'tests_passed': passed,
            'tests_failed': failed,
            'tests_skipped': skipped,
            'pass_rate': (passed / total_tests * 100) if total_tests > 0 else 0,

            # Defect Metrics
            'total_defects_found': total_defects,
            'defect_detection_rate': (total_defects / total_tests)
                if total_tests > 0 else 0,

            # Efficiency Metrics
            'total_execution_time': total_duration,
            'average_test_duration': (total_duration / total_tests)
                if total_tests > 0 else 0,

            # Quality Metrics
            'test_effectiveness': self._calculate_effectiveness(),
            'automation_rate': self._calculate_automation_rate()
        }

    def _calculate_effectiveness(self):
        """Calculate test effectiveness score."""
        # Tests that find defects are effective
        effective_tests = sum(
            1 for t in self.test_results
            if t['defects_found'] > 0
        )
        return (effective_tests / len(self.test_results) * 100) \
            if self.test_results else 0

    def _calculate_automation_rate(self):
        """Calculate percentage of automated tests."""
        # This would integrate with test management system
        # Simplified example:
        automated = sum(
            1 for t in self.test_results
            if t.get('automated', False)
        )
        return (automated / len(self.test_results) * 100) \
            if self.test_results else 0

# Metrics dashboard
class MetricsDashboard:
    def __init__(self, metrics):
        self.metrics = metrics

    def generate_report(self):
        """Generate human-readable metrics report."""
        return f"""
        Test Execution Summary
        =====================
        Total Tests: {self.metrics['total_tests']}
        Passed: {self.metrics['tests_passed']} ({self.metrics['pass_rate']:.1f}%)
        Failed: {self.metrics['tests_failed']}
        Skipped: {self.metrics['tests_skipped']}

        Defect Detection
        ================
        Total Defects Found: {self.metrics['total_defects_found']}
        Detection Rate: {self.metrics['defect_detection_rate']:.2f} defects/test

        Execution Efficiency
        ===================
        Total Time: {self.metrics['total_execution_time']:.2f}s
        Average Time: {self.metrics['average_test_duration']:.2f}s/test

        Quality Indicators
        ==================
        Test Effectiveness: {self.metrics['test_effectiveness']:.1f}%
        Automation Rate: {self.metrics['automation_rate']:.1f}%
        """
```

### Defect Metrics

```python
class DefectMetrics:
    """Track and analyze defect metrics."""

    def __init__(self):
        self.defects = []

    def log_defect(self, severity, phase_found, phase_injected):
        """Log a defect with metadata."""
        self.defects.append({
            'severity': severity,  # critical, high, medium, low
            'phase_found': phase_found,  # unit, integration, system, production
            'phase_injected': phase_injected,  # requirements, design, coding
            'timestamp': datetime.now()
        })

    def calculate_defect_density(self, lines_of_code):
        """Calculate defects per thousand lines of code."""
        return (len(self.defects) / lines_of_code * 1000) \
            if lines_of_code > 0 else 0

    def calculate_defect_removal_efficiency(self):
        """Calculate percentage of defects found before production."""
        pre_production = sum(
            1 for d in self.defects
            if d['phase_found'] != 'production'
        )
        return (pre_production / len(self.defects) * 100) \
            if self.defects else 0

    def get_severity_distribution(self):
        """Get distribution of defects by severity."""
        distribution = {
            'critical': 0,
            'high': 0,
            'medium': 0,
            'low': 0
        }

        for defect in self.defects:
            distribution[defect['severity']] += 1

        return distribution

    def get_escape_rate(self):
        """Calculate defect escape rate (defects reaching production)."""
        escaped = sum(
            1 for d in self.defects
            if d['phase_found'] == 'production'
        )
        return (escaped / len(self.defects) * 100) if self.defects else 0
```

## Bug Tracking and Management

### Bug Lifecycle

```python
from enum import Enum
from datetime import datetime

class BugStatus(Enum):
    NEW = "new"
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    VERIFIED = "verified"
    CLOSED = "closed"
    REOPENED = "reopened"

class BugSeverity(Enum):
    CRITICAL = 1  # System crash, data loss
    HIGH = 2      # Major feature broken
    MEDIUM = 3    # Feature partially broken
    LOW = 4       # Minor issue, cosmetic

class BugPriority(Enum):
    URGENT = 1    # Fix immediately
    HIGH = 2      # Fix in current sprint
    MEDIUM = 3    # Fix in next sprint
    LOW = 4       # Fix when time permits

class Bug:
    """Represents a software defect."""

    def __init__(self, title, description, severity, priority):
        self.id = None  # Assigned by tracking system
        self.title = title
        self.description = description
        self.severity = severity
        self.priority = priority
        self.status = BugStatus.NEW
        self.created_at = datetime.now()
        self.created_by = None
        self.assigned_to = None
        self.resolved_at = None
        self.comments = []
        self.attachments = []

    def assign(self, developer):
        """Assign bug to developer."""
        self.assigned_to = developer
        self.status = BugStatus.ASSIGNED
        self.add_comment(f"Assigned to {developer}")

    def start_work(self):
        """Mark bug as in progress."""
        self.status = BugStatus.IN_PROGRESS
        self.add_comment("Work started")

    def resolve(self, resolution):
        """Mark bug as resolved."""
        self.status = BugStatus.RESOLVED
        self.resolved_at = datetime.now()
        self.add_comment(f"Resolved: {resolution}")

    def verify(self, tester):
        """Verify bug fix."""
        self.status = BugStatus.VERIFIED
        self.add_comment(f"Verified by {tester}")

    def close(self):
        """Close bug."""
        self.status = BugStatus.CLOSED
        self.add_comment("Closed")

    def reopen(self, reason):
        """Reopen bug if fix didn't work."""
        self.status = BugStatus.REOPENED
        self.add_comment(f"Reopened: {reason}")

    def add_comment(self, comment):
        """Add comment to bug."""
        self.comments.append({
            'text': comment,
            'timestamp': datetime.now()
        })

    def get_age_in_days(self):
        """Calculate how long bug has been open."""
        end_time = self.resolved_at if self.resolved_at else datetime.now()
        return (end_time - self.created_at).days
```

### Bug Report Template

```python
class BugReport:
    """Structured bug report."""

    def __init__(self):
        self.title = ""
        self.environment = {}
        self.steps_to_reproduce = []
        self.expected_result = ""
        self.actual_result = ""
        self.severity = None
        self.priority = None
        self.attachments = []

    def generate_report(self):
        """Generate formatted bug report."""
        return f"""
Bug Report
==========

Title: {self.title}

Environment
-----------
Browser: {self.environment.get('browser', 'N/A')}
OS: {self.environment.get('os', 'N/A')}
Version: {self.environment.get('version', 'N/A')}

Steps to Reproduce
------------------
{self._format_steps()}

Expected Result
---------------
{self.expected_result}

Actual Result
-------------
{self.actual_result}

Severity: {self.severity.name if self.severity else 'N/A'}
Priority: {self.priority.name if self.priority else 'N/A'}

Attachments
-----------
{self._format_attachments()}
"""

    def _format_steps(self):
        return '\n'.join(
            f"{i+1}. {step}"
            for i, step in enumerate(self.steps_to_reproduce)
        )

    def _format_attachments(self):
        if not self.attachments:
            return "None"
        return '\n'.join(f"- {att}" for att in self.attachments)

# Example usage
bug = BugReport()
bug.title = "Shopping cart total calculation incorrect with discount"
bug.environment = {
    'browser': 'Chrome 118',
    'os': 'Windows 11',
    'version': '2.5.0'
}
bug.steps_to_reproduce = [
    "Add item priced at $100 to cart",
    "Apply 10% discount code 'SAVE10'",
    "Observe cart total"
]
bug.expected_result = "Cart total should be $90.00"
bug.actual_result = "Cart total shows $100.00 (discount not applied)"
bug.severity = BugSeverity.HIGH
bug.priority = BugPriority.URGENT
bug.attachments = ['screenshot_cart.png', 'console_errors.log']

print(bug.generate_report())
```

## Test Reporting

### Test Summary Report

```python
class TestSummaryReport:
    """Generate comprehensive test summary report."""

    def __init__(self, project_name, sprint, test_results, defects):
        self.project_name = project_name
        self.sprint = sprint
        self.test_results = test_results
        self.defects = defects
        self.generated_at = datetime.now()

    def generate(self):
        """Generate summary report."""
        return f"""
{self.project_name} - Test Summary Report
Sprint: {self.sprint}
Generated: {self.generated_at.strftime('%Y-%m-%d %H:%M')}

1. EXECUTIVE SUMMARY
{self._executive_summary()}

2. TEST EXECUTION SUMMARY
{self._test_execution_summary()}

3. DEFECT SUMMARY
{self._defect_summary()}

4. TEST COVERAGE
{self._coverage_summary()}

5. RISKS AND ISSUES
{self._risks_and_issues()}

6. RECOMMENDATIONS
{self._recommendations()}
"""

    def _executive_summary(self):
        pass_rate = self._calculate_pass_rate()
        critical_bugs = self._count_critical_bugs()

        status = "PASS" if pass_rate >= 95 and critical_bugs == 0 else "FAIL"

        return f"""
Overall Status: {status}
Pass Rate: {pass_rate:.1f}%
Critical Bugs: {critical_bugs}
Ready for Release: {'Yes' if status == 'PASS' else 'No'}
"""

    def _test_execution_summary(self):
        total = len(self.test_results)
        passed = sum(1 for t in self.test_results if t['status'] == 'pass')
        failed = sum(1 for t in self.test_results if t['status'] == 'fail')

        return f"""
Total Tests Executed: {total}
Passed: {passed}
Failed: {failed}
Pass Rate: {self._calculate_pass_rate():.1f}%
"""

    def _defect_summary(self):
        by_severity = {}
        for defect in self.defects:
            severity = defect['severity']
            by_severity[severity] = by_severity.get(severity, 0) + 1

        return f"""
Total Defects: {len(self.defects)}
Critical: {by_severity.get('critical', 0)}
High: {by_severity.get('high', 0)}
Medium: {by_severity.get('medium', 0)}
Low: {by_severity.get('low', 0)}
"""

    def _calculate_pass_rate(self):
        if not self.test_results:
            return 0
        passed = sum(1 for t in self.test_results if t['status'] == 'pass')
        return (passed / len(self.test_results)) * 100

    def _count_critical_bugs(self):
        return sum(1 for d in self.defects if d['severity'] == 'critical')

    def _coverage_summary(self):
        # Would pull from coverage tools
        return "Code Coverage: 85%\nRequirements Coverage: 92%"

    def _risks_and_issues(self):
        return "No blocking issues identified."

    def _recommendations(self):
        recommendations = []

        if self._calculate_pass_rate() < 95:
            recommendations.append(
                "- Improve pass rate before release"
            )

        if self._count_critical_bugs() > 0:
            recommendations.append(
                "- Resolve all critical bugs before release"
            )

        return '\n'.join(recommendations) if recommendations \
            else "System ready for release."
```

## Summary

Effective test management provides structure and visibility to testing activities. Through comprehensive test planning, teams define clear objectives, scope, and resource allocation. Test coverage metrics ensure thorough testing, while risk-based prioritization focuses effort where it matters most. Test metrics quantify quality and effectiveness, enabling data-driven decisions. Robust bug tracking ensures defects are systematically identified, tracked, and resolved. Finally, clear test reporting communicates quality status to stakeholders. Together, these practices create a systematic approach to quality assurance that supports successful software delivery.
