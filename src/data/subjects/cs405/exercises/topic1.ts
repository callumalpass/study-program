import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs405-ex-1-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Cloud Cost Calculator',
    difficulty: 2,
    description: 'Create a Python script that calculates monthly cloud costs based on resource usage. Input: instance type, hours running, storage GB, data transfer GB. Calculate costs using simplified pricing.',
    starterCode: `# Cloud Cost Calculator
def calculate_monthly_cost(instance_type, hours, storage_gb, transfer_gb):
    """
    Calculate estimated monthly cloud costs
    
    Args:
        instance_type: string ('small', 'medium', 'large')
        hours: hours running per month
        storage_gb: storage in gigabytes
        transfer_gb: data transfer in gigabytes
    
    Returns:
        float: total monthly cost in dollars
    """
    # Pricing (simplified)
    # Instance: small=$0.05/hr, medium=$0.10/hr, large=$0.20/hr
    # Storage: $0.10/GB-month
    # Transfer: $0.09/GB
    
    # TODO: Implement cost calculation
    pass

# Test cases
print(calculate_monthly_cost('small', 730, 100, 50))  # Should return ~97.0
print(calculate_monthly_cost('medium', 730, 200, 100))  # Should return ~102.0`,
    solution: `def calculate_monthly_cost(instance_type, hours, storage_gb, transfer_gb):
    # Instance pricing
    instance_prices = {
        'small': 0.05,
        'medium': 0.10,
        'large': 0.20
    }
    
    # Calculate costs
    instance_cost = instance_prices[instance_type] * hours
    storage_cost = storage_gb * 0.10
    transfer_cost = transfer_gb * 0.09
    
    total_cost = instance_cost + storage_cost + transfer_cost
    return round(total_cost, 2)

print(calculate_monthly_cost('small', 730, 100, 50))  # 36.5 + 10 + 4.5 = 51.0
print(calculate_monthly_cost('medium', 730, 200, 100))  # 73 + 20 + 9 = 102.0`,
    testCases: [
      {
        input: "calculate_monthly_cost('small', 730, 100, 50)",
        expectedOutput: '51.0',
        isHidden: false,
        description: 'Small instance full month'
      },
      {
        input: "calculate_monthly_cost('medium', 730, 200, 100)",
        expectedOutput: '102.0',
        isHidden: false,
        description: 'Medium instance full month'
      },
      {
        input: "calculate_monthly_cost('large', 365, 500, 200)",
        expectedOutput: '141.0',
        isHidden: true,
        description: 'Large instance half month'
      }
    ],
    hints: [
      'Create a dictionary for instance type pricing',
      'Multiply instance price by hours for compute cost',
      'Add storage cost (GB * price per GB)',
      'Add transfer cost (GB * price per GB)'
    ],
    language: 'python'
  },
  {
    id: 'cs405-ex-1-2',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'SLA Uptime Calculator',
    difficulty: 2,
    description: 'Build a Python script that calculates allowed downtime for different SLA percentages (monthly and yearly). Input an SLA percentage and output: minutes/month, hours/month, hours/year.',
    starterCode: `# SLA Uptime Calculator
def calculate_downtime(sla_percentage):
    """
    Calculate allowed downtime for given SLA

    Args:
        sla_percentage: float (e.g., 99.9 for 99.9%)

    Returns:
        dict: downtime in different units
    """
    # Constants
    # Month: 30 days = 43,200 minutes = 720 hours
    # Year: 365 days = 525,600 minutes = 8,760 hours

    # TODO: Calculate downtime
    pass

# Test cases
print(calculate_downtime(99.9))   # {'min_month': 43.2, 'hrs_month': 0.72, 'hrs_year': 8.76}
print(calculate_downtime(99.99))  # {'min_month': 4.32, 'hrs_month': 0.07, 'hrs_year': 0.88}`,
    solution: `def calculate_downtime(sla_percentage):
    """Calculate allowed downtime for given SLA"""
    # Constants
    MINUTES_PER_MONTH = 43200  # 30 days
    HOURS_PER_MONTH = 720
    HOURS_PER_YEAR = 8760  # 365 days

    # Calculate downtime percentage
    downtime_pct = (100 - sla_percentage) / 100

    # Calculate downtime in different units
    minutes_per_month = MINUTES_PER_MONTH * downtime_pct
    hours_per_month = HOURS_PER_MONTH * downtime_pct
    hours_per_year = HOURS_PER_YEAR * downtime_pct

    return {
        'min_month': round(minutes_per_month, 2),
        'hrs_month': round(hours_per_month, 2),
        'hrs_year': round(hours_per_year, 2)
    }

# Test cases
print(calculate_downtime(99.9))   # 43.2 min/month
print(calculate_downtime(99.99))  # 4.32 min/month
print(calculate_downtime(99.999)) # 0.43 min/month`,
    testCases: [
      {
        input: "calculate_downtime(99.9)",
        expectedOutput: "{'min_month': 43.2, 'hrs_month': 0.72, 'hrs_year': 8.76}",
        isHidden: false,
        description: '99.9% SLA downtime calculation'
      },
      {
        input: "calculate_downtime(99.99)",
        expectedOutput: "{'min_month': 4.32, 'hrs_month': 0.07, 'hrs_year': 0.88}",
        isHidden: false,
        description: '99.99% SLA downtime calculation'
      },
      {
        input: "calculate_downtime(99.999)",
        expectedOutput: "{'min_month': 0.43, 'hrs_month': 0.01, 'hrs_year': 0.09}",
        isHidden: true,
        description: '99.999% SLA downtime calculation'
      }
    ],
    hints: [
      'Calculate downtime percentage as (100 - SLA) / 100',
      'Month = 30 days = 43,200 minutes',
      'Year = 365 days = 8,760 hours',
      'Multiply time periods by downtime percentage'
    ],
    language: 'python'
  },
  {
    id: 'cs405-ex-1-3',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Cloud Service Model Classifier',
    difficulty: 3,
    description: 'Create a Python program that classifies cloud services into IaaS, PaaS, or SaaS based on characteristics. Given service features, determine the service model and explain why.',
    starterCode: `# Cloud Service Model Classifier
def classify_service(features):
    """
    Classify cloud service into IaaS, PaaS, or SaaS

    Args:
        features: dict with boolean keys:
            - manages_infrastructure: Provider manages infrastructure
            - manages_os: Provider manages OS
            - manages_runtime: Provider manages runtime/middleware
            - manages_application: Provider manages application

    Returns:
        tuple: (service_model, explanation)
    """
    # TODO: Implement classification logic
    pass

# Test case
features1 = {
    'manages_infrastructure': True,
    'manages_os': False,
    'manages_runtime': False,
    'manages_application': False
}
print(classify_service(features1))  # Should return ('IaaS', explanation)`,
    solution: `def classify_service(features):
    """Classify cloud service into IaaS, PaaS, or SaaS"""

    manages_infra = features['manages_infrastructure']
    manages_os = features['manages_os']
    manages_runtime = features['manages_runtime']
    manages_app = features['manages_application']

    # SaaS: Provider manages everything
    if manages_infra and manages_os and manages_runtime and manages_app:
        return ('SaaS', 'Provider manages entire stack including application. '
                'User only configures and uses the software.')

    # PaaS: Provider manages up to runtime, user manages app
    elif manages_infra and manages_os and manages_runtime and not manages_app:
        return ('PaaS', 'Provider manages infrastructure, OS, and runtime. '
                'User deploys and manages applications.')

    # IaaS: Provider manages only infrastructure
    elif manages_infra and not manages_os and not manages_runtime and not manages_app:
        return ('IaaS', 'Provider manages only infrastructure (compute, storage, network). '
                'User manages OS, runtime, and applications.')

    else:
        return ('Unknown', 'Service does not fit standard IaaS/PaaS/SaaS model')

# Test cases
iaas = {'manages_infrastructure': True, 'manages_os': False,
        'manages_runtime': False, 'manages_application': False}
print("IaaS example (EC2):", classify_service(iaas))

paas = {'manages_infrastructure': True, 'manages_os': True,
        'manages_runtime': True, 'manages_application': False}
print("PaaS example (Heroku):", classify_service(paas))

saas = {'manages_infrastructure': True, 'manages_os': True,
        'manages_runtime': True, 'manages_application': True}
print("SaaS example (Gmail):", classify_service(saas))`,
    testCases: [
      {
        input: "classify_service({'manages_infrastructure': True, 'manages_os': False, 'manages_runtime': False, 'manages_application': False})",
        expectedOutput: "('IaaS', explanation)",
        isHidden: false,
        description: 'Classify IaaS service'
      },
      {
        input: "classify_service({'manages_infrastructure': True, 'manages_os': True, 'manages_runtime': True, 'manages_application': False})",
        expectedOutput: "('PaaS', explanation)",
        isHidden: false,
        description: 'Classify PaaS service'
      },
      {
        input: "classify_service({'manages_infrastructure': True, 'manages_os': True, 'manages_runtime': True, 'manages_application': True})",
        expectedOutput: "('SaaS', explanation)",
        isHidden: false,
        description: 'Classify SaaS service'
      }
    ],
    hints: [
      'SaaS: Provider manages everything',
      'PaaS: Provider manages infrastructure + OS + runtime',
      'IaaS: Provider manages only infrastructure',
      'Use conditional logic to check combinations'
    ],
    language: 'python'
  },
  {
    id: 'cs405-ex-1-4',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Multi-Cloud Cost Comparison',
    difficulty: 3,
    description: 'Build a tool that compares costs across AWS, Azure, and GCP for identical workloads. Calculate monthly costs for compute, storage, and data transfer across providers.',
    starterCode: `# Multi-Cloud Cost Comparison
def compare_cloud_costs(compute_hours, storage_gb, transfer_gb):
    """
    Compare costs across AWS, Azure, and GCP

    Args:
        compute_hours: hours of t2.medium equivalent
        storage_gb: GB of block storage
        transfer_gb: GB of data transfer out

    Returns:
        dict: costs per provider
    """
    # Simplified pricing (per month)
    pricing = {
        'AWS': {'compute': 0.0464, 'storage': 0.10, 'transfer': 0.09},
        'Azure': {'compute': 0.0496, 'storage': 0.12, 'transfer': 0.087},
        'GCP': {'compute': 0.0475, 'storage': 0.10, 'transfer': 0.085}
    }

    # TODO: Calculate costs for each provider
    pass

# Test
print(compare_cloud_costs(730, 100, 50))`,
    solution: `def compare_cloud_costs(compute_hours, storage_gb, transfer_gb):
    """Compare costs across AWS, Azure, and GCP"""

    # Simplified pricing (per hour for compute, per GB-month for storage/transfer)
    pricing = {
        'AWS': {'compute': 0.0464, 'storage': 0.10, 'transfer': 0.09},
        'Azure': {'compute': 0.0496, 'storage': 0.12, 'transfer': 0.087},
        'GCP': {'compute': 0.0475, 'storage': 0.10, 'transfer': 0.085}
    }

    results = {}

    for provider, prices in pricing.items():
        compute_cost = compute_hours * prices['compute']
        storage_cost = storage_gb * prices['storage']
        transfer_cost = transfer_gb * prices['transfer']

        total = compute_cost + storage_cost + transfer_cost

        results[provider] = {
            'compute': round(compute_cost, 2),
            'storage': round(storage_cost, 2),
            'transfer': round(transfer_cost, 2),
            'total': round(total, 2)
        }

    # Find cheapest
    cheapest = min(results.items(), key=lambda x: x[1]['total'])
    results['recommendation'] = cheapest[0]

    return results

# Test with full month (730 hours)
costs = compare_cloud_costs(730, 100, 50)
for provider, breakdown in costs.items():
    if provider != 'recommendation':
        print(f"{provider}: ${breakdown['total']:.2f}")
print(f"\\nRecommendation: {costs['recommendation']}")`,
    testCases: [
      {
        input: "compare_cloud_costs(730, 100, 50)",
        expectedOutput: "Cost comparison with recommendation",
        isHidden: false,
        description: 'Full month comparison'
      },
      {
        input: "compare_cloud_costs(365, 500, 100)",
        expectedOutput: "Half month with higher storage",
        isHidden: false,
        description: 'Different workload comparison'
      }
    ],
    hints: [
      'Calculate each cost component separately',
      'Sum all components for total cost',
      'Use min() to find cheapest provider',
      'Return detailed breakdown per provider'
    ],
    language: 'python'
  },
  {
    id: 'cs405-ex-1-5',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Reserved Instance Savings Calculator',
    difficulty: 2,
    description: 'Calculate potential savings from using Reserved Instances vs On-Demand. Compare 1-year and 3-year commitments with different payment options.',
    starterCode: `# Reserved Instance Savings Calculator
def calculate_ri_savings(on_demand_monthly_cost, commitment_years=1):
    """
    Calculate RI savings vs on-demand

    Args:
        on_demand_monthly_cost: monthly on-demand cost
        commitment_years: 1 or 3

    Returns:
        dict: savings breakdown
    """
    # RI discounts (approximate)
    # 1-year: 40% off, 3-year: 60% off

    # TODO: Calculate savings
    pass

print(calculate_ri_savings(1000, 1))
print(calculate_ri_savings(1000, 3))`,
    solution: `def calculate_ri_savings(on_demand_monthly_cost, commitment_years=1):
    """Calculate RI savings vs on-demand"""

    # RI discounts
    discounts = {
        1: 0.40,  # 40% off for 1-year
        3: 0.60   # 60% off for 3-year
    }

    if commitment_years not in discounts:
        raise ValueError("Commitment must be 1 or 3 years")

    discount = discounts[commitment_years]

    # Calculate costs
    months = commitment_years * 12
    total_on_demand = on_demand_monthly_cost * months

    ri_monthly_cost = on_demand_monthly_cost * (1 - discount)
    total_ri_cost = ri_monthly_cost * months

    total_savings = total_on_demand - total_ri_cost
    savings_percentage = (total_savings / total_on_demand) * 100

    return {
        'commitment_years': commitment_years,
        'on_demand_monthly': round(on_demand_monthly_cost, 2),
        'ri_monthly': round(ri_monthly_cost, 2),
        'total_on_demand': round(total_on_demand, 2),
        'total_ri': round(total_ri_cost, 2),
        'total_savings': round(total_savings, 2),
        'savings_pct': round(savings_percentage, 2)
    }

# Examples
print("1-Year RI Savings:")
result = calculate_ri_savings(1000, 1)
print(f"  Monthly: ${result['ri_monthly']} (was ${result['on_demand_monthly']})")
print(f"  Total savings: ${result['total_savings']} ({result['savings_pct']}%)")

print("\\n3-Year RI Savings:")
result = calculate_ri_savings(1000, 3)
print(f"  Monthly: ${result['ri_monthly']} (was ${result['on_demand_monthly']})")
print(f"  Total savings: ${result['total_savings']} ({result['savings_pct']}%)"),`,
    testCases: [
      {
        input: "calculate_ri_savings(1000, 1)['total_savings']",
        expectedOutput: "4800.0",
        isHidden: false,
        description: '1-year RI savings'
      },
      {
        input: "calculate_ri_savings(1000, 3)['total_savings']",
        expectedOutput: "21600.0",
        isHidden: false,
        description: '3-year RI savings'
      }
    ],
    hints: [
      '1-year RI: ~40% discount',
      '3-year RI: ~60% discount',
      'Total savings = on-demand cost - RI cost',
      'Calculate over entire commitment period'
    ],
    language: 'python'
  },
  {
    id: 'cs405-ex-1-6',
    subjectId: 'cs405',
    topicId: 'cs405-topic-1',
    title: 'Deployment Model Selector',
    difficulty: 2,
    description: 'Create a decision tree tool that recommends cloud deployment model (Public, Private, Hybrid, Multi-cloud) based on organization requirements.',
    starterCode: `# Deployment Model Selector
def recommend_deployment_model(requirements):
    """
    Recommend deployment model based on requirements

    Args:
        requirements: dict with:
            - data_sensitivity: 'low', 'medium', 'high'
            - budget: 'low', 'medium', 'high'
            - has_legacy_systems: bool
            - requires_multiple_providers: bool
            - compliance_strict: bool

    Returns:
        tuple: (model, reasoning)
    """
    # TODO: Implement decision logic
    pass

# Test cases
req1 = {
    'data_sensitivity': 'low',
    'budget': 'low',
    'has_legacy_systems': False,
    'requires_multiple_providers': False,
    'compliance_strict': False
}
print(recommend_deployment_model(req1))`,
    solution: `def recommend_deployment_model(requirements):
    """Recommend deployment model based on requirements"""

    sensitivity = requirements['data_sensitivity']
    budget = requirements['budget']
    has_legacy = requirements['has_legacy_systems']
    multi_provider = requirements['requires_multiple_providers']
    strict_compliance = requirements['compliance_strict']

    # Multi-cloud: Explicitly needs multiple providers
    if multi_provider:
        return (
            'Multi-Cloud',
            'Organization requires multiple cloud providers for redundancy, '
            'vendor lock-in avoidance, or specific service needs.'
        )

    # Private Cloud: High sensitivity or strict compliance
    if sensitivity == 'high' or strict_compliance:
        return (
            'Private Cloud',
            'High data sensitivity or strict compliance requirements necessitate '
            'dedicated infrastructure with maximum control and security.'
        )

    # Hybrid Cloud: Has legacy systems or medium sensitivity with budget
    if has_legacy or (sensitivity == 'medium' and budget in ['medium', 'high']):
        return (
            'Hybrid Cloud',
            'Combination of on-premises systems (legacy or sensitive data) '
            'with public cloud for scalability and flexibility.'
        )

    # Public Cloud: Default for low sensitivity and cost efficiency
    return (
        'Public Cloud',
        'Public cloud offers best cost-efficiency, scalability, and ease of use '
        'for workloads without special security or compliance requirements.'
    )

# Test cases
scenarios = [
    {
        'name': 'Startup',
        'reqs': {
            'data_sensitivity': 'low',
            'budget': 'low',
            'has_legacy_systems': False,
            'requires_multiple_providers': False,
            'compliance_strict': False
        }
    },
    {
        'name': 'Healthcare',
        'reqs': {
            'data_sensitivity': 'high',
            'budget': 'high',
            'has_legacy_systems': True,
            'requires_multiple_providers': False,
            'compliance_strict': True
        }
    },
    {
        'name': 'Enterprise Migration',
        'reqs': {
            'data_sensitivity': 'medium',
            'budget': 'high',
            'has_legacy_systems': True,
            'requires_multiple_providers': False,
            'compliance_strict': False
        }
    },
    {
        'name': 'Global Company',
        'reqs': {
            'data_sensitivity': 'medium',
            'budget': 'high',
            'has_legacy_systems': False,
            'requires_multiple_providers': True,
            'compliance_strict': False
        }
    }
]

for scenario in scenarios:
    model, reason = recommend_deployment_model(scenario['reqs'])
    print(f"{scenario['name']}: {model}")
    print(f"  Reason: {reason}\\n")`,
    testCases: [
      {
        input: "recommend_deployment_model({'data_sensitivity': 'low', 'budget': 'low', 'has_legacy_systems': False, 'requires_multiple_providers': False, 'compliance_strict': False})[0]",
        expectedOutput: "'Public Cloud'",
        isHidden: false,
        description: 'Simple startup scenario'
      },
      {
        input: "recommend_deployment_model({'data_sensitivity': 'high', 'budget': 'high', 'has_legacy_systems': False, 'requires_multiple_providers': False, 'compliance_strict': True})[0]",
        expectedOutput: "'Private Cloud'",
        isHidden: false,
        description: 'Strict compliance scenario'
      },
      {
        input: "recommend_deployment_model({'data_sensitivity': 'medium', 'budget': 'high', 'has_legacy_systems': True, 'requires_multiple_providers': False, 'compliance_strict': False})[0]",
        expectedOutput: "'Hybrid Cloud'",
        isHidden: false,
        description: 'Legacy systems scenario'
      }
    ],
    hints: [
      'Multi-cloud: multiple providers needed',
      'Private: high sensitivity or strict compliance',
      'Hybrid: legacy systems or medium sensitivity',
      'Public: default for standard workloads'
    ],
    language: 'python'
  }
];
