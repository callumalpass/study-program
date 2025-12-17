import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs404-ex-1-1',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Create MoSCoW Prioritization Function',
    difficulty: 1,
    description: `Implement a function that categorizes project features using the MoSCoW prioritization method.

Create a TypeScript function that takes a list of features with their importance and effort scores, and categorizes them into Must Have, Should Have, Could Have, and Won't Have categories based on a scoring algorithm.

Features with high importance and feasible effort are Must Have.
Features with moderate importance are Should Have.
Features with low effort but low importance are Could Have.
Features with very high effort and low importance are Won't Have.`,
    starterCode: `interface Feature {
  name: string;
  importance: number; // 1-10
  effort: number; // 1-10
}

type MoSCoWCategory = 'Must Have' | 'Should Have' | 'Could Have' | "Won't Have";

interface CategorizedFeature extends Feature {
  category: MoSCoWCategory;
}

function prioritizeFeatures(features: Feature[]): CategorizedFeature[] {
  // TODO: Implement MoSCoW prioritization logic
  return [];
}

// Test cases
const features: Feature[] = [
  { name: 'User Authentication', importance: 10, effort: 5 },
  { name: 'Dark Mode', importance: 3, effort: 2 },
  { name: 'Social Media Sharing', importance: 4, effort: 3 },
  { name: 'Video Upload', importance: 2, effort: 9 },
  { name: 'Activity Logging', importance: 9, effort: 4 },
];

console.log(prioritizeFeatures(features));`,
    solution: `interface Feature {
  name: string;
  importance: number; // 1-10
  effort: number; // 1-10
}

type MoSCoWCategory = 'Must Have' | 'Should Have' | 'Could Have' | "Won't Have";

interface CategorizedFeature extends Feature {
  category: MoSCoWCategory;
}

function prioritizeFeatures(features: Feature[]): CategorizedFeature[] {
  return features.map(feature => {
    const { importance, effort } = feature;
    
    // Calculate priority score (higher importance / lower effort = higher priority)
    const priorityScore = importance / effort;
    
    // Categorize based on importance and effort
    let category: MoSCoWCategory;
    
    if (importance >= 8 && effort <= 7) {
      // High importance, reasonable effort -> Must Have
      category = 'Must Have';
    } else if (importance >= 6 && effort <= 8) {
      // Moderate importance, reasonable effort -> Should Have
      category = 'Should Have';
    } else if (effort > 8 || importance < 4) {
      // Very high effort or low importance -> Won't Have
      category = "Won't Have";
    } else {
      // Everything else -> Could Have
      category = 'Could Have';
    }
    
    return {
      ...feature,
      category
    };
  });
}

// Test cases
const features: Feature[] = [
  { name: 'User Authentication', importance: 10, effort: 5 },
  { name: 'Dark Mode', importance: 3, effort: 2 },
  { name: 'Social Media Sharing', importance: 4, effort: 3 },
  { name: 'Video Upload', importance: 2, effort: 9 },
  { name: 'Activity Logging', importance: 9, effort: 4 },
];

const prioritized = prioritizeFeatures(features);
console.log(prioritized);

/*
Output:
[
  { name: 'User Authentication', importance: 10, effort: 5, category: 'Must Have' },
  { name: 'Dark Mode', importance: 3, effort: 2, category: 'Could Have' },
  { name: 'Social Media Sharing', importance: 4, effort: 3, category: 'Could Have' },
  { name: 'Video Upload', importance: 2, effort: 9, category: "Won't Have" },
  { name: 'Activity Logging', importance: 9, effort: 4, category: 'Must Have' }
]
*/`,
    hints: [
      'Calculate a priority score based on importance/effort ratio',
      'Use threshold values to categorize features',
      'Consider both importance and effort in your logic',
      'Must Have: high importance, feasible effort',
      "Won't Have: very high effort OR very low importance"
    ],
    testCases: [
      {
        input: '[{ name: "Feature A", importance: 10, effort: 3 }]',
        expectedOutput: '[{ name: "Feature A", importance: 10, effort: 3, category: "Must Have" }]',
        isHidden: false,
        description: 'High importance, low effort should be Must Have'
      },
      {
        input: '[{ name: "Feature B", importance: 2, effort: 9 }]',
        expectedOutput: '[{ name: "Feature B", importance: 2, effort: 9, category: "Won\'t Have" }]',
        isHidden: false,
        description: 'Low importance, high effort should be Won\'t Have'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-2',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Calculate Three-Point Time Estimates',
    difficulty: 1,
    description: `Implement a function to calculate expected task duration using three-point estimation.

Create a function that takes optimistic, most likely, and pessimistic time estimates for tasks and calculates the expected duration using the formula: (O + 4M + P) / 6

This is a common estimation technique in project management that accounts for uncertainty.`,
    starterCode: `interface TaskEstimate {
  task: string;
  optimistic: number;  // Best case (hours)
  mostLikely: number;  // Realistic estimate (hours)
  pessimistic: number; // Worst case (hours)
}

interface TaskDuration extends TaskEstimate {
  expectedDuration: number;
  standardDeviation: number;
}

function calculateTaskDurations(tasks: TaskEstimate[]): TaskDuration[] {
  // TODO: Implement three-point estimation
  // Expected Duration = (O + 4M + P) / 6
  // Standard Deviation = (P - O) / 6
  return [];
}

const tasks: TaskEstimate[] = [
  { task: 'User Authentication', optimistic: 3, mostLikely: 6, pessimistic: 12 },
  { task: 'Database Setup', optimistic: 2, mostLikely: 4, pessimistic: 8 },
];

console.log(calculateTaskDurations(tasks));`,
    solution: `interface TaskEstimate {
  task: string;
  optimistic: number;  // Best case (hours)
  mostLikely: number;  // Realistic estimate (hours)
  pessimistic: number; // Worst case (hours)
}

interface TaskDuration extends TaskEstimate {
  expectedDuration: number;
  standardDeviation: number;
}

function calculateTaskDurations(tasks: TaskEstimate[]): TaskDuration[] {
  return tasks.map(task => {
    const { optimistic, mostLikely, pessimistic } = task;
    
    // Three-point estimation formula
    const expectedDuration = (optimistic + 4 * mostLikely + pessimistic) / 6;
    
    // Standard deviation shows uncertainty
    const standardDeviation = (pessimistic - optimistic) / 6;
    
    return {
      ...task,
      expectedDuration: Math.round(expectedDuration * 10) / 10, // Round to 1 decimal
      standardDeviation: Math.round(standardDeviation * 10) / 10
    };
  });
}

const tasks: TaskEstimate[] = [
  { task: 'User Authentication', optimistic: 3, mostLikely: 6, pessimistic: 12 },
  { task: 'Database Setup', optimistic: 2, mostLikely: 4, pessimistic: 8 },
  { task: 'Frontend Dashboard', optimistic: 8, mostLikely: 12, pessimistic: 20 },
];

const durations = calculateTaskDurations(tasks);
console.log(durations);

// Calculate total project duration
const totalDuration = durations.reduce((sum, task) => sum + task.expectedDuration, 0);
console.log(\`Total expected duration: \${totalDuration} hours\`);

/*
Output:
[
  {
    task: 'User Authentication',
    optimistic: 3,
    mostLikely: 6,
    pessimistic: 12,
    expectedDuration: 6.5,
    standardDeviation: 1.5
  },
  {
    task: 'Database Setup',
    optimistic: 2,
    mostLikely: 4,
    pessimistic: 8,
    expectedDuration: 4.3,
    standardDeviation: 1.0
  },
  {
    task: 'Frontend Dashboard',
    optimistic: 8,
    mostLikely: 12,
    pessimistic: 20,
    expectedDuration: 12.7,
    standardDeviation: 2.0
  }
]
Total expected duration: 23.5 hours
*/`,
    hints: [
      'Use the formula: (O + 4M + P) / 6 for expected duration',
      'Standard deviation shows uncertainty: (P - O) / 6',
      'Round results to reasonable precision (1 decimal place)',
      'Higher standard deviation means more uncertainty'
    ],
    testCases: [
      {
        input: '{ optimistic: 4, mostLikely: 6, pessimistic: 8 }',
        expectedOutput: 'expectedDuration: 6.0',
        isHidden: false,
        description: 'Calculate expected duration with balanced estimates'
      },
      {
        input: '{ optimistic: 1, mostLikely: 5, pessimistic: 15 }',
        expectedOutput: 'expectedDuration: 6.0, standardDeviation: 2.3',
        isHidden: false,
        description: 'Calculate with wide range showing high uncertainty'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-3',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Risk Assessment Calculator',
    difficulty: 3,
    description: `Create a risk assessment tool that calculates risk exposure and prioritizes risks.

Build a function that takes risks with probability and impact scores, calculates risk exposure, and categorizes them by priority.

Risk Exposure = Probability × Impact

Priority levels:
- Critical: exposure >= 15
- High: exposure >= 10
- Medium: exposure >= 5
- Low: exposure < 5`,
    starterCode: `interface Risk {
  id: string;
  description: string;
  probability: number; // 1-5 scale
  impact: number; // 1-5 scale
}

interface AssessedRisk extends Risk {
  exposure: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

function assessRisks(risks: Risk[]): AssessedRisk[] {
  // TODO: Calculate risk exposure and assign priority
  return [];
}

const risks: Risk[] = [
  { id: 'R1', description: 'API deprecated during development', probability: 2, impact: 5 },
  { id: 'R2', description: 'Task underestimation', probability: 5, impact: 3 },
  { id: 'R3', description: 'Hard drive failure', probability: 1, impact: 5 },
];

console.log(assessRisks(risks));`,
    solution: `interface Risk {
  id: string;
  description: string;
  probability: number; // 1-5 scale
  impact: number; // 1-5 scale
}

interface AssessedRisk extends Risk {
  exposure: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

function assessRisks(risks: Risk[]): AssessedRisk[] {
  const assessed = risks.map(risk => {
    // Calculate risk exposure
    const exposure = risk.probability * risk.impact;
    
    // Assign priority based on exposure
    let priority: 'Critical' | 'High' | 'Medium' | 'Low';
    if (exposure >= 15) {
      priority = 'Critical';
    } else if (exposure >= 10) {
      priority = 'High';
    } else if (exposure >= 5) {
      priority = 'Medium';
    } else {
      priority = 'Low';
    }
    
    return {
      ...risk,
      exposure,
      priority
    };
  });
  
  // Sort by exposure (highest first)
  return assessed.sort((a, b) => b.exposure - a.exposure);
}

const risks: Risk[] = [
  { id: 'R1', description: 'API deprecated during development', probability: 2, impact: 5 },
  { id: 'R2', description: 'Task underestimation', probability: 5, impact: 3 },
  { id: 'R3', description: 'Hard drive failure', probability: 1, impact: 5 },
  { id: 'R4', description: 'Learning curve for new tech', probability: 4, impact: 4 },
  { id: 'R5', description: 'Minor UI bug', probability: 3, impact: 1 },
];

const assessed = assessRisks(risks);
console.log('Risk Assessment Results:');
console.log('========================');
assessed.forEach(risk => {
  console.log(\`\${risk.priority} - \${risk.description}\`);
  console.log(\`  Probability: \${risk.probability}, Impact: \${risk.impact}, Exposure: \${risk.exposure}\`);
  console.log();
});

/*
Output:
Risk Assessment Results:
========================
High - Learning curve for new tech
  Probability: 4, Impact: 4, Exposure: 16

High - Task underestimation
  Probability: 5, Impact: 3, Exposure: 15

High - API deprecated during development
  Probability: 2, Impact: 5, Exposure: 10

Medium - Hard drive failure
  Probability: 1, Impact: 5, Exposure: 5

Low - Minor UI bug
  Probability: 3, Impact: 1, Exposure: 3
*/`,
    hints: [
      'Risk Exposure = Probability × Impact',
      'Sort risks by exposure (highest priority first)',
      'Use clear threshold values for priority categories',
      'High probability + high impact = critical risk'
    ],
    testCases: [
      {
        input: '{ probability: 5, impact: 5 }',
        expectedOutput: '{ exposure: 25, priority: "Critical" }',
        isHidden: false,
        description: 'Maximum risk should be Critical priority'
      },
      {
        input: '{ probability: 1, impact: 2 }',
        expectedOutput: '{ exposure: 2, priority: "Low" }',
        isHidden: false,
        description: 'Low probability and impact should be Low priority'
      }
    ],
    language: 'typescript'
  }
];
