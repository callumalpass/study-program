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
  },
  {
    id: 'cs404-ex-1-4',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'User Story Validator',
    difficulty: 2,
    description: `Create a function that validates user stories follow the correct format.

A valid user story must:
- Start with "As a"
- Contain "I want to" or "I want"
- Contain "so that" or "so"
- Be between 20 and 200 characters

Return validation results with specific error messages.`,
    starterCode: `interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateUserStory(story: string): ValidationResult {
  // TODO: Implement user story validation
  return { isValid: false, errors: [] };
}

// Test cases
console.log(validateUserStory('As a user, I want to log in so that I can access my account'));
console.log(validateUserStory('Add login feature'));
console.log(validateUserStory('As a user'));`,
    solution: `interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateUserStory(story: string): ValidationResult {
  const errors: string[] = [];

  // Check length
  if (story.length < 20) {
    errors.push('Story is too short (minimum 20 characters)');
  }
  if (story.length > 200) {
    errors.push('Story is too long (maximum 200 characters)');
  }

  // Check format components
  if (!story.toLowerCase().startsWith('as a')) {
    errors.push('Story must start with "As a"');
  }

  if (!story.toLowerCase().includes('i want')) {
    errors.push('Story must contain "I want to" or "I want"');
  }

  if (!story.toLowerCase().includes('so that') && !story.toLowerCase().includes('so ')) {
    errors.push('Story must contain "so that" or "so" to explain the benefit');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Test cases
console.log(validateUserStory('As a user, I want to log in so that I can access my account'));
// { isValid: true, errors: [] }

console.log(validateUserStory('Add login feature'));
// { isValid: false, errors: [...] }

console.log(validateUserStory('As a user'));
// { isValid: false, errors: ['Story is too short...', 'Story must contain "I want"', ...] }`,
    hints: [
      'Use toLowerCase() for case-insensitive matching',
      'Check each component separately and collect errors',
      'Return isValid: true only if errors array is empty',
      'Use includes() to check for required phrases'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-5',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Milestone Tracker',
    difficulty: 2,
    description: `Build a milestone tracking system that calculates completion percentage and identifies overdue milestones.

Each milestone has a title, target date, completion status, and weight (importance).
Calculate overall project completion and list overdue milestones.`,
    starterCode: `interface Milestone {
  title: string;
  targetDate: Date;
  completed: boolean;
  weight: number; // 1-10
}

interface ProjectStatus {
  completionPercentage: number;
  overdueMilestones: string[];
  onTrack: boolean;
}

function trackMilestones(milestones: Milestone[], currentDate: Date): ProjectStatus {
  // TODO: Calculate completion and identify overdue milestones
  return { completionPercentage: 0, overdueMilestones: [], onTrack: true };
}`,
    solution: `interface Milestone {
  title: string;
  targetDate: Date;
  completed: boolean;
  weight: number; // 1-10
}

interface ProjectStatus {
  completionPercentage: number;
  overdueMilestones: string[];
  onTrack: boolean;
}

function trackMilestones(milestones: Milestone[], currentDate: Date): ProjectStatus {
  const totalWeight = milestones.reduce((sum, m) => sum + m.weight, 0);
  const completedWeight = milestones
    .filter(m => m.completed)
    .reduce((sum, m) => sum + m.weight, 0);

  const completionPercentage = totalWeight > 0
    ? Math.round((completedWeight / totalWeight) * 100)
    : 0;

  const overdueMilestones = milestones
    .filter(m => !m.completed && m.targetDate < currentDate)
    .map(m => m.title);

  const onTrack = overdueMilestones.length === 0;

  return {
    completionPercentage,
    overdueMilestones,
    onTrack
  };
}

// Example usage
const milestones: Milestone[] = [
  { title: 'Project Proposal', targetDate: new Date('2024-01-15'), completed: true, weight: 5 },
  { title: 'Database Design', targetDate: new Date('2024-02-01'), completed: true, weight: 8 },
  { title: 'API Implementation', targetDate: new Date('2024-02-15'), completed: false, weight: 10 },
  { title: 'Frontend MVP', targetDate: new Date('2024-03-01'), completed: false, weight: 10 },
];

const status = trackMilestones(milestones, new Date('2024-02-20'));
console.log(status);
// { completionPercentage: 39, overdueMilestones: ['API Implementation'], onTrack: false }`,
    hints: [
      'Use weighted completion: completed weight / total weight',
      'Filter for incomplete milestones with past target dates',
      'onTrack is true when no overdue milestones exist',
      'Use reduce() to sum milestone weights'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-6',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Sprint Capacity Calculator',
    difficulty: 2,
    description: `Calculate sprint capacity based on team availability and task complexity.

Given team members with their available hours per week and tasks with estimated hours,
determine if the sprint is over-capacity and calculate utilization percentage.`,
    starterCode: `interface TeamMember {
  name: string;
  hoursPerWeek: number;
}

interface Task {
  title: string;
  estimatedHours: number;
}

interface SprintCapacity {
  totalCapacity: number;
  plannedWork: number;
  utilization: number; // percentage
  overCapacity: boolean;
}

function calculateSprintCapacity(
  team: TeamMember[],
  tasks: Task[],
  sprintWeeks: number
): SprintCapacity {
  // TODO: Calculate sprint capacity and utilization
  return { totalCapacity: 0, plannedWork: 0, utilization: 0, overCapacity: false };
}`,
    solution: `interface TeamMember {
  name: string;
  hoursPerWeek: number;
}

interface Task {
  title: string;
  estimatedHours: number;
}

interface SprintCapacity {
  totalCapacity: number;
  plannedWork: number;
  utilization: number; // percentage
  overCapacity: boolean;
}

function calculateSprintCapacity(
  team: TeamMember[],
  tasks: Task[],
  sprintWeeks: number
): SprintCapacity {
  // Calculate total team capacity
  const totalCapacity = team.reduce((sum, member) => {
    return sum + (member.hoursPerWeek * sprintWeeks);
  }, 0);

  // Calculate total planned work
  const plannedWork = tasks.reduce((sum, task) => {
    return sum + task.estimatedHours;
  }, 0);

  // Calculate utilization percentage
  const utilization = totalCapacity > 0
    ? Math.round((plannedWork / totalCapacity) * 100)
    : 0;

  // Check if over capacity (>85% is considered risky)
  const overCapacity = utilization > 85;

  return {
    totalCapacity,
    plannedWork,
    utilization,
    overCapacity
  };
}

// Example usage
const team: TeamMember[] = [
  { name: 'Alice', hoursPerWeek: 40 },
  { name: 'Bob', hoursPerWeek: 30 }, // Part-time
  { name: 'Carol', hoursPerWeek: 40 }
];

const tasks: Task[] = [
  { title: 'User Authentication', estimatedHours: 20 },
  { title: 'Database Setup', estimatedHours: 15 },
  { title: 'API Endpoints', estimatedHours: 30 },
  { title: 'Frontend Components', estimatedHours: 40 },
];

const sprint = calculateSprintCapacity(team, tasks, 2);
console.log(sprint);
// { totalCapacity: 220, plannedWork: 105, utilization: 48, overCapacity: false }`,
    hints: [
      'Total capacity = sum of (member hours/week × sprint weeks)',
      'Planned work = sum of all task estimated hours',
      'Utilization = (planned work / total capacity) × 100',
      'Over 85% utilization is risky and considered over-capacity'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-7',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Dependency Chain Analyzer',
    difficulty: 3,
    description: `Analyze task dependencies to find the critical path and identify potential bottlenecks.

Given tasks with dependencies and durations, calculate the minimum project duration
and identify which tasks are on the critical path (any delay will delay the project).`,
    starterCode: `interface Task {
  id: string;
  name: string;
  duration: number; // days
  dependencies: string[]; // task IDs that must complete first
}

interface CriticalPath {
  minimumDuration: number;
  criticalTasks: string[];
  bottlenecks: string[]; // tasks with many dependencies on them
}

function analyzeDependencies(tasks: Task[]): CriticalPath {
  // TODO: Find critical path and bottlenecks
  return { minimumDuration: 0, criticalTasks: [], bottlenecks: [] };
}`,
    solution: `interface Task {
  id: string;
  name: string;
  duration: number; // days
  dependencies: string[]; // task IDs that must complete first
}

interface CriticalPath {
  minimumDuration: number;
  criticalTasks: string[];
  bottlenecks: string[]; // tasks with many dependencies on them
}

function analyzeDependencies(tasks: Task[]): CriticalPath {
  // Create a map for quick task lookup
  const taskMap = new Map(tasks.map(t => [t.id, t]));

  // Calculate earliest start time for each task
  const earliestStart = new Map<string, number>();

  function calculateEarliestStart(taskId: string): number {
    if (earliestStart.has(taskId)) {
      return earliestStart.get(taskId)!;
    }

    const task = taskMap.get(taskId)!;
    let maxDependencyEnd = 0;

    for (const depId of task.dependencies) {
      const depStart = calculateEarliestStart(depId);
      const depTask = taskMap.get(depId)!;
      maxDependencyEnd = Math.max(maxDependencyEnd, depStart + depTask.duration);
    }

    earliestStart.set(taskId, maxDependencyEnd);
    return maxDependencyEnd;
  }

  // Calculate for all tasks
  tasks.forEach(task => calculateEarliestStart(task.id));

  // Find minimum duration (max end time)
  let minimumDuration = 0;
  let lastTask = '';

  for (const task of tasks) {
    const endTime = earliestStart.get(task.id)! + task.duration;
    if (endTime > minimumDuration) {
      minimumDuration = endTime;
      lastTask = task.id;
    }
  }

  // Find critical path by backtracking
  const criticalTasks: string[] = [];
  const visited = new Set<string>();

  function findCriticalPath(taskId: string, targetEnd: number) {
    if (visited.has(taskId)) return;
    visited.add(taskId);

    const task = taskMap.get(taskId)!;
    const start = earliestStart.get(taskId)!;

    if (start + task.duration === targetEnd) {
      criticalTasks.push(taskId);

      for (const depId of task.dependencies) {
        findCriticalPath(depId, start);
      }
    }
  }

  findCriticalPath(lastTask, minimumDuration);

  // Find bottlenecks (tasks that many others depend on)
  const dependencyCount = new Map<string, number>();
  tasks.forEach(task => dependencyCount.set(task.id, 0));

  tasks.forEach(task => {
    task.dependencies.forEach(depId => {
      dependencyCount.set(depId, (dependencyCount.get(depId) || 0) + 1);
    });
  });

  const bottlenecks = Array.from(dependencyCount.entries())
    .filter(([_, count]) => count >= 2)
    .map(([id, _]) => id);

  return {
    minimumDuration,
    criticalTasks: criticalTasks.reverse(),
    bottlenecks
  };
}

// Example
const tasks: Task[] = [
  { id: 'A', name: 'Requirements', duration: 5, dependencies: [] },
  { id: 'B', name: 'Design', duration: 7, dependencies: ['A'] },
  { id: 'C', name: 'Database Setup', duration: 3, dependencies: ['A'] },
  { id: 'D', name: 'Backend', duration: 10, dependencies: ['B', 'C'] },
  { id: 'E', name: 'Frontend', duration: 8, dependencies: ['B'] },
  { id: 'F', name: 'Testing', duration: 5, dependencies: ['D', 'E'] },
];

console.log(analyzeDependencies(tasks));`,
    hints: [
      'Use recursion to calculate earliest start times',
      'Critical path = longest chain of dependencies',
      'Backtrack from the last task to find critical tasks',
      'Bottlenecks are tasks that multiple others depend on'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-8',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Requirements Prioritization Matrix',
    difficulty: 2,
    description: `Create a prioritization matrix based on value vs. complexity scores.

Plot requirements on a 2x2 matrix: Quick Wins (high value, low complexity),
Big Bets (high value, high complexity), Fill-ins (low value, low complexity),
and Money Pits (low value, high complexity).`,
    starterCode: `interface Requirement {
  id: string;
  title: string;
  value: number; // 1-10
  complexity: number; // 1-10
}

type Quadrant = 'Quick Win' | 'Big Bet' | 'Fill-in' | 'Money Pit';

interface CategorizedRequirement extends Requirement {
  quadrant: Quadrant;
  priority: number; // 1-4 (1=highest)
}

function prioritizeRequirements(requirements: Requirement[]): CategorizedRequirement[] {
  // TODO: Categorize and prioritize requirements
  return [];
}`,
    solution: `interface Requirement {
  id: string;
  title: string;
  value: number; // 1-10
  complexity: number; // 1-10
}

type Quadrant = 'Quick Win' | 'Big Bet' | 'Fill-in' | 'Money Pit';

interface CategorizedRequirement extends Requirement {
  quadrant: Quadrant;
  priority: number; // 1-4 (1=highest)
}

function prioritizeRequirements(requirements: Requirement[]): CategorizedRequirement[] {
  return requirements.map(req => {
    const { value, complexity } = req;

    // Determine quadrant based on value and complexity
    let quadrant: Quadrant;
    let priority: number;

    if (value >= 6 && complexity <= 5) {
      // High value, low complexity
      quadrant = 'Quick Win';
      priority = 1; // Highest priority
    } else if (value >= 6 && complexity > 5) {
      // High value, high complexity
      quadrant = 'Big Bet';
      priority = 2; // Second priority
    } else if (value < 6 && complexity <= 5) {
      // Low value, low complexity
      quadrant = 'Fill-in';
      priority = 3; // Third priority
    } else {
      // Low value, high complexity
      quadrant = 'Money Pit';
      priority = 4; // Lowest priority (avoid)
    }

    return {
      ...req,
      quadrant,
      priority
    };
  }).sort((a, b) => {
    // Sort by priority, then by value (descending)
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return b.value - a.value;
  });
}

// Example
const requirements: Requirement[] = [
  { id: 'R1', title: 'User Login', value: 9, complexity: 4 },
  { id: 'R2', title: 'Social Sharing', value: 3, complexity: 7 },
  { id: 'R3', title: 'Email Notifications', value: 7, complexity: 3 },
  { id: 'R4', title: 'Advanced Analytics', value: 8, complexity: 9 },
  { id: 'R5', title: 'Dark Mode', value: 4, complexity: 2 },
];

console.log(prioritizeRequirements(requirements));
/*
Output shows requirements sorted by priority:
1. Quick Wins first (R1, R3)
2. Big Bets second (R4)
3. Fill-ins third (R5)
4. Money Pits last (R2)
*/`,
    hints: [
      'Use thresholds to categorize: value >= 6 is high, complexity > 5 is high',
      'Quick Wins should be done first (priority 1)',
      'Avoid Money Pits (low value, high complexity)',
      'Sort by priority, then by value within same priority'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-9',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Project Scope Validator',
    difficulty: 2,
    description: `Validate that a project scope is realistic for a capstone timeframe.

Check if the scope meets criteria: reasonable feature count, realistic timeline,
clear MVP definition, and manageable technical complexity.`,
    starterCode: `interface ProjectScope {
  features: string[];
  weeksDuration: number;
  mvpFeatures: string[];
  technicalComplexity: 'low' | 'medium' | 'high' | 'very high';
  teamSize: number;
}

interface ScopeValidation {
  isRealistic: boolean;
  warnings: string[];
  recommendations: string[];
}

function validateProjectScope(scope: ProjectScope): ScopeValidation {
  // TODO: Validate scope realism
  return { isRealistic: true, warnings: [], recommendations: [] };
}`,
    solution: `interface ProjectScope {
  features: string[];
  weeksDuration: number;
  mvpFeatures: string[];
  technicalComplexity: 'low' | 'medium' | 'high' | 'very high';
  teamSize: number;
}

interface ScopeValidation {
  isRealistic: boolean;
  warnings: string[];
  recommendations: string[];
}

function validateProjectScope(scope: ProjectScope): ScopeValidation {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check feature count
  const featuresPerWeek = scope.features.length / scope.weeksDuration;
  if (featuresPerWeek > 2) {
    warnings.push(\`Planning \${featuresPerWeek.toFixed(1)} features/week is aggressive\`);
    recommendations.push('Consider reducing scope or extending timeline');
  }

  // Check MVP ratio
  const mvpRatio = scope.mvpFeatures.length / scope.features.length;
  if (mvpRatio > 0.8) {
    warnings.push('MVP contains most features - may not be truly minimal');
    recommendations.push('Identify and defer non-essential MVP features');
  }
  if (mvpRatio < 0.3) {
    warnings.push('MVP is very small - may not demonstrate sufficient functionality');
  }

  // Check complexity vs. timeline
  const weeksNeeded = {
    'low': 8,
    'medium': 12,
    'high': 16,
    'very high': 20
  };

  if (scope.weeksDuration < weeksNeeded[scope.technicalComplexity]) {
    warnings.push(\`\${scope.technicalComplexity} complexity typically needs \${weeksNeeded[scope.technicalComplexity]}+ weeks\`);
    recommendations.push('Simplify technical approach or extend timeline');
  }

  // Check team size consideration
  if (scope.teamSize === 1 && scope.features.length > 10) {
    warnings.push('Large scope for solo developer');
    recommendations.push('Consider reducing features or finding a partner');
  }

  // Determine if realistic
  const isRealistic = warnings.length <= 2;

  if (isRealistic && warnings.length === 0) {
    recommendations.push('Scope appears realistic - proceed with planning');
  }

  return {
    isRealistic,
    warnings,
    recommendations
  };
}

// Example
const scope: ProjectScope = {
  features: ['User Auth', 'Dashboard', 'Data Entry', 'Reports', 'Export', 'API'],
  weeksDuration: 10,
  mvpFeatures: ['User Auth', 'Dashboard', 'Data Entry'],
  technicalComplexity: 'medium',
  teamSize: 1
};

console.log(validateProjectScope(scope));`,
    hints: [
      'More than 2 features/week is aggressive for capstone',
      'MVP should be 30-60% of total features',
      'Match complexity to timeline: high complexity needs more time',
      'Solo developers should limit scope'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-10',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Burndown Chart Calculator',
    difficulty: 2,
    description: `Calculate burndown data for sprint progress tracking.

Given total story points, days remaining, and completed points per day,
calculate ideal burndown, actual progress, and whether the sprint is on track.`,
    starterCode: `interface DailyProgress {
  day: number;
  completedPoints: number;
}

interface BurndownData {
  day: number;
  idealRemaining: number;
  actualRemaining: number;
  onTrack: boolean;
}

function calculateBurndown(
  totalPoints: number,
  sprintDays: number,
  progress: DailyProgress[]
): BurndownData[] {
  // TODO: Calculate burndown chart data
  return [];
}`,
    solution: `interface DailyProgress {
  day: number;
  completedPoints: number;
}

interface BurndownData {
  day: number;
  idealRemaining: number;
  actualRemaining: number;
  onTrack: boolean;
}

function calculateBurndown(
  totalPoints: number,
  sprintDays: number,
  progress: DailyProgress[]
): BurndownData[] {
  const idealBurnRate = totalPoints / sprintDays;
  const burndown: BurndownData[] = [];

  let actualRemaining = totalPoints;

  for (let day = 0; day <= sprintDays; day++) {
    // Calculate ideal remaining (linear burndown)
    const idealRemaining = Math.max(0, totalPoints - (idealBurnRate * day));

    // Find actual progress for this day
    const dayProgress = progress.find(p => p.day === day);
    if (dayProgress) {
      actualRemaining -= dayProgress.completedPoints;
    }

    // On track if actual <= ideal (or within 10% tolerance)
    const tolerance = totalPoints * 0.1;
    const onTrack = actualRemaining <= idealRemaining + tolerance;

    burndown.push({
      day,
      idealRemaining: Math.round(idealRemaining * 10) / 10,
      actualRemaining: Math.max(0, actualRemaining),
      onTrack
    });
  }

  return burndown;
}

// Example
const progress: DailyProgress[] = [
  { day: 1, completedPoints: 5 },
  { day: 2, completedPoints: 3 },
  { day: 3, completedPoints: 8 },
  { day: 4, completedPoints: 4 },
  { day: 5, completedPoints: 6 },
];

const burndown = calculateBurndown(50, 10, progress);
console.log(burndown);
/*
Shows daily: ideal vs. actual remaining points
and whether sprint is on track
*/`,
    hints: [
      'Ideal burn rate = total points / sprint days',
      'Ideal remaining decreases linearly each day',
      'Actual remaining = previous - completed that day',
      'Allow 10% tolerance for "on track" determination'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-11',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Feature Estimation Confidence',
    difficulty: 2,
    description: `Calculate confidence levels for feature estimates based on familiarity and complexity.

Features you've built before have high confidence. New technologies or complex
features have lower confidence and should include larger buffers.`,
    starterCode: `interface FeatureEstimate {
  name: string;
  baseEstimate: number; // hours
  familiarity: 'high' | 'medium' | 'low'; // have you done this before?
  complexity: 'simple' | 'moderate' | 'complex';
  dependencies: number; // number of dependencies
}

interface ConfidentEstimate extends FeatureEstimate {
  confidence: number; // 0-100%
  bufferedEstimate: number; // with appropriate buffer
  riskLevel: 'low' | 'medium' | 'high';
}

function calculateEstimateConfidence(features: FeatureEstimate[]): ConfidentEstimate[] {
  // TODO: Calculate confidence and buffered estimates
  return [];
}`,
    solution: `interface FeatureEstimate {
  name: string;
  baseEstimate: number; // hours
  familiarity: 'high' | 'medium' | 'low';
  complexity: 'simple' | 'moderate' | 'complex';
  dependencies: number;
}

interface ConfidentEstimate extends FeatureEstimate {
  confidence: number; // 0-100%
  bufferedEstimate: number;
  riskLevel: 'low' | 'medium' | 'high';
}

function calculateEstimateConfidence(features: FeatureEstimate[]): ConfidentEstimate[] {
  return features.map(feature => {
    // Base confidence from familiarity
    const familiarityScore = {
      'high': 85,
      'medium': 60,
      'low': 40
    }[feature.familiarity];

    // Complexity penalty
    const complexityPenalty = {
      'simple': 0,
      'moderate': 10,
      'complex': 20
    }[feature.complexity];

    // Dependency penalty (5% per dependency)
    const dependencyPenalty = Math.min(feature.dependencies * 5, 20);

    // Calculate final confidence
    const confidence = Math.max(20, familiarityScore - complexityPenalty - dependencyPenalty);

    // Calculate buffer multiplier based on confidence
    const bufferMultiplier = confidence >= 70 ? 1.2 :
                            confidence >= 50 ? 1.5 :
                            confidence >= 30 ? 2.0 : 2.5;

    const bufferedEstimate = Math.round(feature.baseEstimate * bufferMultiplier);

    // Determine risk level
    const riskLevel = confidence >= 60 ? 'low' :
                     confidence >= 40 ? 'medium' : 'high';

    return {
      ...feature,
      confidence,
      bufferedEstimate,
      riskLevel
    };
  });
}

// Example
const features: FeatureEstimate[] = [
  { name: 'User Registration', baseEstimate: 8, familiarity: 'high', complexity: 'simple', dependencies: 1 },
  { name: 'Real-time Chat', baseEstimate: 16, familiarity: 'low', complexity: 'complex', dependencies: 3 },
  { name: 'Dashboard', baseEstimate: 12, familiarity: 'medium', complexity: 'moderate', dependencies: 2 },
];

console.log(calculateEstimateConfidence(features));`,
    hints: [
      'High familiarity = 85% base confidence, low = 40%',
      'Reduce confidence for complexity and dependencies',
      'Low confidence needs larger buffer (2-2.5x)',
      'High confidence can use smaller buffer (1.2x)'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-12',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Project Risk Mitigation Planner',
    difficulty: 3,
    description: `Create a risk mitigation planning system that suggests strategies for each risk.

Based on risk type and exposure, recommend appropriate mitigation strategies:
accept, monitor, mitigate, or avoid.`,
    starterCode: `interface Risk {
  id: string;
  description: string;
  type: 'technical' | 'schedule' | 'resource' | 'external';
  probability: number; // 1-5
  impact: number; // 1-5
}

type MitigationStrategy = 'accept' | 'monitor' | 'mitigate' | 'avoid';

interface RiskMitigation extends Risk {
  exposure: number;
  strategy: MitigationStrategy;
  actions: string[];
}

function planRiskMitigation(risks: Risk[]): RiskMitigation[] {
  // TODO: Determine mitigation strategies and actions
  return [];
}`,
    solution: `interface Risk {
  id: string;
  description: string;
  type: 'technical' | 'schedule' | 'resource' | 'external';
  probability: number; // 1-5
  impact: number; // 1-5
}

type MitigationStrategy = 'accept' | 'monitor' | 'monitor' | 'mitigate' | 'avoid';

interface RiskMitigation extends Risk {
  exposure: number;
  strategy: MitigationStrategy;
  actions: string[];
}

function planRiskMitigation(risks: Risk[]): RiskMitigation[] {
  return risks.map(risk => {
    const exposure = risk.probability * risk.impact;

    // Determine strategy based on exposure
    let strategy: MitigationStrategy;
    let actions: string[] = [];

    if (exposure >= 20) {
      // Critical risk - avoid or heavily mitigate
      strategy = 'avoid';
      actions = getAvoidanceActions(risk);
    } else if (exposure >= 12) {
      // High risk - mitigate
      strategy = 'mitigate';
      actions = getMitigationActions(risk);
    } else if (exposure >= 6) {
      // Medium risk - monitor closely
      strategy = 'monitor';
      actions = getMonitoringActions(risk);
    } else {
      // Low risk - accept
      strategy = 'accept';
      actions = ['Document risk', 'Review periodically'];
    }

    return {
      ...risk,
      exposure,
      strategy,
      actions
    };
  }).sort((a, b) => b.exposure - a.exposure);
}

function getAvoidanceActions(risk: Risk): string[] {
  const actions: string[] = [];

  switch (risk.type) {
    case 'technical':
      actions.push('Choose proven technology instead');
      actions.push('Build prototype to validate approach');
      actions.push('Have backup technology ready');
      break;
    case 'schedule':
      actions.push('Reduce scope significantly');
      actions.push('Add buffer to timeline');
      actions.push('Increase team size if possible');
      break;
    case 'resource':
      actions.push('Identify alternative resources early');
      actions.push('Cross-train team members');
      break;
    case 'external':
      actions.push('Have contingency plan');
      actions.push('Reduce dependency on external factors');
      break;
  }

  return actions;
}

function getMitigationActions(risk: Risk): string[] {
  const actions: string[] = [];

  switch (risk.type) {
    case 'technical':
      actions.push('Conduct spike/proof-of-concept');
      actions.push('Allocate extra time for learning');
      actions.push('Seek expert consultation');
      break;
    case 'schedule':
      actions.push('Add 20-30% buffer to estimates');
      actions.push('Identify tasks that can be parallelized');
      actions.push('Define clear MVP to enable scope cuts');
      break;
    case 'resource':
      actions.push('Document critical knowledge');
      actions.push('Have backup team members identified');
      break;
    case 'external':
      actions.push('Maintain regular communication');
      actions.push('Document dependencies clearly');
      break;
  }

  return actions;
}

function getMonitoringActions(risk: Risk): string[] {
  return [
    'Check status weekly',
    'Define clear trigger conditions for escalation',
    'Document risk in project status reports',
    'Prepare mitigation plan in advance'
  ];
}

// Example
const risks: Risk[] = [
  { id: 'R1', description: 'Learning new framework', type: 'technical', probability: 4, impact: 4 },
  { id: 'R2', description: 'Tight deadline', type: 'schedule', probability: 3, impact: 5 },
  { id: 'R3', description: 'API might change', type: 'external', probability: 2, impact: 3 },
];

console.log(planRiskMitigation(risks));`,
    hints: [
      'Exposure >= 20: avoid the risk entirely',
      'Exposure 12-19: actively mitigate',
      'Exposure 6-11: monitor closely',
      'Exposure < 6: accept and document',
      'Different risk types need different mitigation actions'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-13',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Stakeholder Communication Matrix',
    difficulty: 2,
    description: `Create a stakeholder communication plan based on interest and influence levels.

Categorize stakeholders and determine appropriate communication frequency and detail level.`,
    starterCode: `interface Stakeholder {
  name: string;
  role: string;
  interest: 'low' | 'medium' | 'high';
  influence: 'low' | 'medium' | 'high';
}

interface CommunicationPlan extends Stakeholder {
  category: 'Monitor' | 'Keep Informed' | 'Keep Satisfied' | 'Manage Closely';
  frequency: string;
  detailLevel: 'summary' | 'moderate' | 'detailed';
  channels: string[];
}

function createCommunicationPlan(stakeholders: Stakeholder[]): CommunicationPlan[] {
  // TODO: Categorize and plan communication
  return [];
}`,
    solution: `interface Stakeholder {
  name: string;
  role: string;
  interest: 'low' | 'medium' | 'high';
  influence: 'low' | 'medium' | 'high';
}

interface CommunicationPlan extends Stakeholder {
  category: 'Monitor' | 'Keep Informed' | 'Keep Satisfied' | 'Manage Closely';
  frequency: string;
  detailLevel: 'summary' | 'moderate' | 'detailed';
  channels: string[];
}

function createCommunicationPlan(stakeholders: Stakeholder[]): CommunicationPlan[] {
  return stakeholders.map(stakeholder => {
    const { interest, influence } = stakeholder;

    // Determine category based on interest/influence matrix
    let category: CommunicationPlan['category'];
    let frequency: string;
    let detailLevel: 'summary' | 'moderate' | 'detailed';
    let channels: string[];

    if (influence === 'high' && interest === 'high') {
      // Key players - manage closely
      category = 'Manage Closely';
      frequency = 'Weekly updates + ad-hoc';
      detailLevel = 'detailed';
      channels = ['One-on-one meetings', 'Email', 'Demo sessions'];
    } else if (influence === 'high' && interest !== 'high') {
      // Important but not engaged - keep satisfied
      category = 'Keep Satisfied';
      frequency = 'Bi-weekly summaries';
      detailLevel = 'moderate';
      channels = ['Email updates', 'Monthly meetings'];
    } else if (influence !== 'high' && interest === 'high') {
      // Engaged but less influential - keep informed
      category = 'Keep Informed';
      frequency = 'Weekly updates';
      detailLevel = 'moderate';
      channels = ['Email', 'Slack', 'Demo sessions'];
    } else {
      // Low priority - monitor
      category = 'Monitor';
      frequency = 'Monthly summaries';
      detailLevel = 'summary';
      channels = ['Email newsletter'];
    }

    return {
      ...stakeholder,
      category,
      frequency,
      detailLevel,
      channels
    };
  });
}

// Example
const stakeholders: Stakeholder[] = [
  { name: 'Dr. Smith', role: 'Advisor', interest: 'high', influence: 'high' },
  { name: 'John Doe', role: 'Department Head', interest: 'low', influence: 'high' },
  { name: 'Jane User', role: 'Beta Tester', interest: 'high', influence: 'low' },
  { name: 'Bob', role: 'Peer Reviewer', interest: 'medium', influence: 'low' },
];

console.log(createCommunicationPlan(stakeholders));`,
    hints: [
      'High influence + high interest = Manage Closely',
      'High influence + low interest = Keep Satisfied',
      'Low influence + high interest = Keep Informed',
      'Low influence + low interest = Monitor',
      'Tailor frequency and detail level to category'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-14',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Project Timeline Optimizer',
    difficulty: 3,
    description: `Optimize project timeline by identifying tasks that can be parallelized.

Given tasks with dependencies and durations, reorganize them to minimize total
duration by running independent tasks in parallel.`,
    starterCode: `interface Task {
  id: string;
  name: string;
  duration: number;
  dependencies: string[];
  assignee?: string;
}

interface OptimizedSchedule {
  phases: {
    phaseNumber: number;
    tasks: string[];
    duration: number;
  }[];
  totalDuration: number;
  parallelizationGain: number; // days saved vs. sequential
}

function optimizeTimeline(tasks: Task[]): OptimizedSchedule {
  // TODO: Optimize schedule by parallelizing independent tasks
  return { phases: [], totalDuration: 0, parallelizationGain: 0 };
}`,
    solution: `interface Task {
  id: string;
  name: string;
  duration: number;
  dependencies: string[];
  assignee?: string;
}

interface OptimizedSchedule {
  phases: {
    phaseNumber: number;
    tasks: string[];
    duration: number;
  }[];
  totalDuration: number;
  parallelizationGain: number;
}

function optimizeTimeline(tasks: Task[]): OptimizedSchedule {
  const taskMap = new Map(tasks.map(t => [t.id, t]));
  const completed = new Set<string>();
  const phases: OptimizedSchedule['phases'] = [];

  let phaseNumber = 1;

  // Assign tasks to phases
  while (completed.size < tasks.length) {
    // Find tasks that can run in this phase
    const availableTasks = tasks.filter(task => {
      if (completed.has(task.id)) return false;
      return task.dependencies.every(dep => completed.has(dep));
    });

    if (availableTasks.length === 0) break; // Circular dependency or error

    // Group by assignee if specified (can't parallelize same person's tasks)
    const assigneeGroups = new Map<string, Task[]>();
    availableTasks.forEach(task => {
      const assignee = task.assignee || 'unassigned';
      if (!assigneeGroups.has(assignee)) {
        assigneeGroups.set(assignee, []);
      }
      assigneeGroups.get(assignee)!.push(task);
    });

    // For simplicity, take one task per assignee per phase
    const phaseTasks = Array.from(assigneeGroups.values())
      .map(group => group[0])
      .slice(0, 3); // Limit parallelization

    const phaseDuration = Math.max(...phaseTasks.map(t => t.duration));

    phases.push({
      phaseNumber,
      tasks: phaseTasks.map(t => t.id),
      duration: phaseDuration
    });

    phaseTasks.forEach(t => completed.add(t.id));
    phaseNumber++;
  }

  // Calculate total duration
  const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);

  // Calculate sequential duration for comparison
  const sequentialDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
  const parallelizationGain = sequentialDuration - totalDuration;

  return {
    phases,
    totalDuration,
    parallelizationGain
  };
}

// Example
const tasks: Task[] = [
  { id: 'A', name: 'Requirements', duration: 5, dependencies: [], assignee: 'Alice' },
  { id: 'B', name: 'Database Design', duration: 3, dependencies: ['A'], assignee: 'Bob' },
  { id: 'C', name: 'UI Design', duration: 4, dependencies: ['A'], assignee: 'Carol' },
  { id: 'D', name: 'Backend API', duration: 8, dependencies: ['B'], assignee: 'Bob' },
  { id: 'E', name: 'Frontend', duration: 6, dependencies: ['C'], assignee: 'Carol' },
  { id: 'F', name: 'Integration', duration: 3, dependencies: ['D', 'E'], assignee: 'Alice' },
];

console.log(optimizeTimeline(tasks));`,
    hints: [
      'Tasks can run in parallel if dependencies are met',
      'Group tasks by phase based on dependency completion',
      'Phase duration = longest task in that phase',
      'Compare to sequential duration to show gain'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-15',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Acceptance Criteria Generator',
    difficulty: 2,
    description: `Generate acceptance criteria from user stories using best practices.

For each user story, generate specific, measurable, testable acceptance criteria
that cover happy path, edge cases, and error scenarios.`,
    starterCode: `interface UserStory {
  id: string;
  role: string;
  action: string;
  benefit: string;
}

interface AcceptanceCriteria {
  storyId: string;
  criteria: {
    scenario: string;
    given: string;
    when: string;
    then: string;
  }[];
}

function generateAcceptanceCriteria(story: UserStory): AcceptanceCriteria {
  // TODO: Generate acceptance criteria
  return { storyId: story.id, criteria: [] };
}`,
    solution: `interface UserStory {
  id: string;
  role: string;
  action: string;
  benefit: string;
}

interface AcceptanceCriteria {
  storyId: string;
  criteria: {
    scenario: string;
    given: string;
    when: string;
    then: string;
  }[];
}

function generateAcceptanceCriteria(story: UserStory): AcceptanceCriteria {
  const criteria: AcceptanceCriteria['criteria'] = [];

  // Detect story type and generate appropriate criteria
  const action = story.action.toLowerCase();

  if (action.includes('log in') || action.includes('sign in')) {
    criteria.push(
      {
        scenario: 'Successful login',
        given: 'I have a valid account',
        when: 'I enter correct username and password',
        then: 'I should be logged in and redirected to dashboard'
      },
      {
        scenario: 'Invalid credentials',
        given: 'I have an account',
        when: 'I enter incorrect password',
        then: 'I should see "Invalid credentials" error and remain on login page'
      },
      {
        scenario: 'Account lockout',
        given: 'I have failed login 5 times',
        when: 'I try to log in again',
        then: 'I should see "Account temporarily locked" message'
      }
    );
  } else if (action.includes('create') || action.includes('add')) {
    criteria.push(
      {
        scenario: 'Successful creation',
        given: 'I am authenticated',
        when: 'I submit valid data',
        then: 'The item should be created and I should see confirmation'
      },
      {
        scenario: 'Invalid data',
        given: 'I am authenticated',
        when: 'I submit incomplete data',
        then: 'I should see validation errors for each field'
      },
      {
        scenario: 'Duplicate prevention',
        given: 'An item with same identifier exists',
        when: 'I try to create a duplicate',
        then: 'I should see "Already exists" error'
      }
    );
  } else if (action.includes('edit') || action.includes('update')) {
    criteria.push(
      {
        scenario: 'Successful update',
        given: 'I own the item',
        when: 'I submit valid changes',
        then: 'The item should be updated and I should see confirmation'
      },
      {
        scenario: 'Unauthorized edit',
        given: 'I do not own the item',
        when: 'I try to edit it',
        then: 'I should see "Access denied" error'
      },
      {
        scenario: 'Validation on edit',
        given: 'I am editing an item',
        when: 'I clear required fields',
        then: 'I should see validation errors'
      }
    );
  } else if (action.includes('delete') || action.includes('remove')) {
    criteria.push(
      {
        scenario: 'Successful deletion',
        given: 'I own the item',
        when: 'I confirm deletion',
        then: 'The item should be deleted and I should see confirmation'
      },
      {
        scenario: 'Deletion confirmation',
        given: 'I click delete',
        when: 'The confirmation dialog appears',
        then: 'I should be able to cancel or confirm'
      },
      {
        scenario: 'Unauthorized deletion',
        given: 'I do not own the item',
        when: 'I try to delete it',
        then: 'I should see "Access denied" error'
      }
    );
  } else {
    // Generic criteria for other actions
    criteria.push(
      {
        scenario: 'Happy path',
        given: \`I am a \${story.role}\`,
        when: \`I \${story.action}\`,
        then: \`I should achieve: \${story.benefit}\`
      },
      {
        scenario: 'Error handling',
        given: 'An error occurs',
        when: \`I attempt to \${story.action}\`,
        then: 'I should see a helpful error message'
      },
      {
        scenario: 'Authorization check',
        given: 'I am not authorized',
        when: \`I try to \${story.action}\`,
        then: 'I should see "Access denied" message'
      }
    );
  }

  return {
    storyId: story.id,
    criteria
  };
}

// Example
const story: UserStory = {
  id: 'US-101',
  role: 'registered user',
  action: 'log in with my email and password',
  benefit: 'I can access my personal dashboard'
};

console.log(generateAcceptanceCriteria(story));`,
    hints: [
      'Use Given-When-Then format for each criterion',
      'Always include: happy path, validation, and authorization',
      'Pattern match common actions (login, create, edit, delete)',
      'Generate 3-5 criteria per story'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-1-16',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Project Health Score Calculator',
    difficulty: 3,
    description: `Calculate overall project health score based on multiple metrics.

Consider: schedule adherence, scope changes, risk status, team morale indicators,
and technical debt. Generate an overall health score and recommendations.`,
    starterCode: `interface ProjectMetrics {
  scheduleVariance: number; // percentage: negative is behind, positive is ahead
  scopeChanges: number; // number of approved scope changes
  openHighRisks: number; // count of high/critical risks
  codeQualityScore: number; // 0-100
  testCoverage: number; // percentage
  teamVelocityTrend: 'increasing' | 'stable' | 'decreasing';
}

interface HealthReport {
  overallScore: number; // 0-100
  status: 'healthy' | 'at-risk' | 'critical';
  concerns: string[];
  recommendations: string[];
}

function calculateProjectHealth(metrics: ProjectMetrics): HealthReport {
  // TODO: Calculate health score and generate report
  return { overallScore: 0, status: 'healthy', concerns: [], recommendations: [] };
}`,
    solution: `interface ProjectMetrics {
  scheduleVariance: number;
  scopeChanges: number;
  openHighRisks: number;
  codeQualityScore: number;
  testCoverage: number;
  teamVelocityTrend: 'increasing' | 'stable' | 'decreasing';
}

interface HealthReport {
  overallScore: number;
  status: 'healthy' | 'at-risk' | 'critical';
  concerns: string[];
  recommendations: string[];
}

function calculateProjectHealth(metrics: ProjectMetrics): HealthReport {
  const concerns: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Schedule adherence (weight: 25 points)
  if (metrics.scheduleVariance < -20) {
    score -= 25;
    concerns.push('Significantly behind schedule');
    recommendations.push('Review and adjust timeline or reduce scope');
  } else if (metrics.scheduleVariance < -10) {
    score -= 15;
    concerns.push('Moderately behind schedule');
    recommendations.push('Identify and address bottlenecks');
  } else if (metrics.scheduleVariance < -5) {
    score -= 5;
  }

  // Scope stability (weight: 15 points)
  if (metrics.scopeChanges > 5) {
    score -= 15;
    concerns.push('Frequent scope changes');
    recommendations.push('Lock down scope and defer new requests');
  } else if (metrics.scopeChanges > 3) {
    score -= 8;
    concerns.push('Some scope volatility');
  }

  // Risk management (weight: 20 points)
  if (metrics.openHighRisks > 3) {
    score -= 20;
    concerns.push('Multiple high-priority risks open');
    recommendations.push('Address critical risks immediately');
  } else if (metrics.openHighRisks > 1) {
    score -= 10;
    concerns.push('High-priority risks need attention');
    recommendations.push('Develop mitigation plans for open risks');
  }

  // Code quality (weight: 20 points)
  if (metrics.codeQualityScore < 60) {
    score -= 20;
    concerns.push('Low code quality score');
    recommendations.push('Allocate time for refactoring and code review');
  } else if (metrics.codeQualityScore < 75) {
    score -= 10;
    concerns.push('Code quality needs improvement');
    recommendations.push('Increase code review rigor');
  }

  // Test coverage (weight: 10 points)
  if (metrics.testCoverage < 50) {
    score -= 10;
    concerns.push('Insufficient test coverage');
    recommendations.push('Prioritize writing tests for critical paths');
  } else if (metrics.testCoverage < 70) {
    score -= 5;
    recommendations.push('Continue increasing test coverage');
  }

  // Team velocity (weight: 10 points)
  if (metrics.teamVelocityTrend === 'decreasing') {
    score -= 10;
    concerns.push('Team velocity is declining');
    recommendations.push('Investigate team blockers and morale issues');
  } else if (metrics.teamVelocityTrend === 'stable') {
    // No penalty, stable is okay
  } else {
    score += 5; // Bonus for increasing velocity
  }

  // Ensure score stays in valid range
  score = Math.max(0, Math.min(100, score));

  // Determine status
  const status: HealthReport['status'] =
    score >= 75 ? 'healthy' :
    score >= 50 ? 'at-risk' : 'critical';

  // Add positive notes if healthy
  if (status === 'healthy' && concerns.length === 0) {
    recommendations.push('Project is on track - maintain current practices');
  }

  return {
    overallScore: score,
    status,
    concerns,
    recommendations
  };
}

// Example
const metrics: ProjectMetrics = {
  scheduleVariance: -15,
  scopeChanges: 2,
  openHighRisks: 1,
  codeQualityScore: 78,
  testCoverage: 68,
  teamVelocityTrend: 'stable'
};

console.log(calculateProjectHealth(metrics));`,
    hints: [
      'Weight different metrics by importance',
      'Schedule and risks are most critical (25 + 20 points)',
      'Generate specific concerns and actionable recommendations',
      'Status: healthy (75+), at-risk (50-74), critical (<50)'
    ],
    testCases: [],
    language: 'typescript'
  }
];
