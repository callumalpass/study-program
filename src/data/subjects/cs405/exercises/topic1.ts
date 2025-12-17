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
  }
];
