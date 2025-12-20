import { Topic, Subtopic } from '../../core/types';
import topic1Content from './content/topic-1.md?raw';
import topic2Content from './content/topic-2.md?raw';
import topic3Content from './content/topic-3.md?raw';
import topic4Content from './content/topic-4.md?raw';
import topic5Content from './content/topic-5.md?raw';
import topic6Content from './content/topic-6.md?raw';
import topic7Content from './content/topic-7.md?raw';

// Topic 1 Subtopics: Relational Model and ER Diagrams
import t1RelationalFoundations from './content/topic-1/01-relational-model-foundations.md?raw';
import t1KeysConstraints from './content/topic-1/02-keys-and-constraints.md?raw';
import t1ERDiagrams from './content/topic-1/03-er-diagrams.md?raw';
import t1ERMapping from './content/topic-1/04-er-to-relational-mapping.md?raw';
import t1RelationalAlgebra from './content/topic-1/05-relational-algebra.md?raw';
import t1IntegrityConstraints from './content/topic-1/06-integrity-constraints.md?raw';
import t1DesignMethodology from './content/topic-1/07-database-design-methodology.md?raw';

// Topic 2 Subtopics: SQL Fundamentals
import t2DDLFundamentals from './content/topic-2/01-ddl-fundamentals.md?raw';
import t2SelectQueries from './content/topic-2/02-select-queries.md?raw';
import t2DataManipulation from './content/topic-2/03-data-manipulation.md?raw';
import t2AggregationGrouping from './content/topic-2/04-aggregation-grouping.md?raw';
import t2ViewsStoredProcs from './content/topic-2/05-views-stored-procedures.md?raw';
import t2ConstraintsTriggers from './content/topic-2/06-constraints-triggers.md?raw';
import t2FunctionsExpressions from './content/topic-2/07-sql-functions-expressions.md?raw';

// Topic 3 Subtopics: Advanced SQL Queries
import t3JoinOperations from './content/topic-3/01-join-operations.md?raw';
import t3Subqueries from './content/topic-3/02-subqueries.md?raw';
import t3SetOperations from './content/topic-3/03-set-operations.md?raw';
import t3WindowFunctions from './content/topic-3/04-window-functions.md?raw';
import t3CTEs from './content/topic-3/05-common-table-expressions.md?raw';
import t3AdvancedAggregation from './content/topic-3/06-advanced-aggregation.md?raw';
import t3QueryPatterns from './content/topic-3/07-query-patterns.md?raw';

// Topic 4 Subtopics: Normalization Theory
import t4FunctionalDeps from './content/topic-4/01-functional-dependencies.md?raw';
import t4NormalForms from './content/topic-4/02-normal-forms.md?raw';
import t4DecompositionAlgorithms from './content/topic-4/03-decomposition-algorithms.md?raw';
import t4Denormalization from './content/topic-4/04-denormalization.md?raw';
import t4NormalizationPractice from './content/topic-4/05-normalization-practice.md?raw';
import t4AdvancedNormalForms from './content/topic-4/06-advanced-normal-forms.md?raw';
import t4SchemaRefinement from './content/topic-4/07-schema-refinement.md?raw';

// Topic 5 Subtopics: Transactions and ACID
import t5ACIDProperties from './content/topic-5/01-acid-properties.md?raw';
import t5TransactionControl from './content/topic-5/02-transaction-control.md?raw';
import t5ConcurrencyProblems from './content/topic-5/03-concurrency-problems.md?raw';
import t5IsolationLevels from './content/topic-5/04-isolation-levels.md?raw';
import t5LockingDeadlocks from './content/topic-5/05-locking-deadlocks.md?raw';
import t5TransactionRecovery from './content/topic-5/06-transaction-recovery.md?raw';
import t5PracticalTransactions from './content/topic-5/07-practical-transaction-management.md?raw';

// Topic 6 Subtopics: Indexing and B-Trees
import t6IndexFundamentals from './content/topic-6/01-index-fundamentals.md?raw';
import t6BTreeStructure from './content/topic-6/02-btree-structure.md?raw';
import t6IndexTypes from './content/topic-6/03-index-types.md?raw';
import t6IndexSelection from './content/topic-6/04-index-selection.md?raw';
import t6IndexMaintenance from './content/topic-6/05-index-maintenance.md?raw';
import t6SpecializedIndexes from './content/topic-6/06-specialized-indexes.md?raw';
import t6IndexDesignStrategies from './content/topic-6/07-index-design-strategies.md?raw';

// Topic 7 Subtopics: Query Optimization
import t7QueryProcessing from './content/topic-7/01-query-processing.md?raw';
import t7ExecutionPlans from './content/topic-7/02-execution-plans.md?raw';
import t7CostEstimation from './content/topic-7/03-cost-estimation.md?raw';
import t7QueryRewriting from './content/topic-7/04-query-rewriting.md?raw';
import t7PerformanceTuning from './content/topic-7/05-performance-tuning.md?raw';
import t7JoinAlgorithms from './content/topic-7/06-join-algorithms.md?raw';
import t7OptimizerInternals from './content/topic-7/07-optimizer-internals.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'cs205-t1-foundations', slug: 'relational-model-foundations', title: 'Relational Model Foundations', content: t1RelationalFoundations, order: 1 },
  { id: 'cs205-t1-keys', slug: 'keys-and-constraints', title: 'Keys and Constraints', content: t1KeysConstraints, order: 2 },
  { id: 'cs205-t1-er', slug: 'er-diagrams', title: 'ER Diagrams', content: t1ERDiagrams, order: 3 },
  { id: 'cs205-t1-mapping', slug: 'er-to-relational-mapping', title: 'ER to Relational Mapping', content: t1ERMapping, order: 4 },
  { id: 'cs205-t1-algebra', slug: 'relational-algebra', title: 'Relational Algebra', content: t1RelationalAlgebra, order: 5 },
  { id: 'cs205-t1-integrity', slug: 'integrity-constraints', title: 'Integrity Constraints', content: t1IntegrityConstraints, order: 6 },
  { id: 'cs205-t1-methodology', slug: 'database-design-methodology', title: 'Database Design Methodology', content: t1DesignMethodology, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'cs205-t2-ddl', slug: 'ddl-fundamentals', title: 'DDL Fundamentals', content: t2DDLFundamentals, order: 1 },
  { id: 'cs205-t2-select', slug: 'select-queries', title: 'SELECT Queries', content: t2SelectQueries, order: 2 },
  { id: 'cs205-t2-dml', slug: 'data-manipulation', title: 'Data Manipulation', content: t2DataManipulation, order: 3 },
  { id: 'cs205-t2-aggregation', slug: 'aggregation-grouping', title: 'Aggregation and Grouping', content: t2AggregationGrouping, order: 4 },
  { id: 'cs205-t2-views', slug: 'views-stored-procedures', title: 'Views and Stored Procedures', content: t2ViewsStoredProcs, order: 5 },
  { id: 'cs205-t2-constraints', slug: 'constraints-triggers', title: 'Constraints and Triggers', content: t2ConstraintsTriggers, order: 6 },
  { id: 'cs205-t2-functions', slug: 'sql-functions-expressions', title: 'SQL Functions and Expressions', content: t2FunctionsExpressions, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'cs205-t3-joins', slug: 'join-operations', title: 'Join Operations', content: t3JoinOperations, order: 1 },
  { id: 'cs205-t3-subqueries', slug: 'subqueries', title: 'Subqueries', content: t3Subqueries, order: 2 },
  { id: 'cs205-t3-sets', slug: 'set-operations', title: 'Set Operations', content: t3SetOperations, order: 3 },
  { id: 'cs205-t3-window', slug: 'window-functions', title: 'Window Functions', content: t3WindowFunctions, order: 4 },
  { id: 'cs205-t3-cte', slug: 'common-table-expressions', title: 'Common Table Expressions', content: t3CTEs, order: 5 },
  { id: 'cs205-t3-aggregation', slug: 'advanced-aggregation', title: 'Advanced Aggregation', content: t3AdvancedAggregation, order: 6 },
  { id: 'cs205-t3-patterns', slug: 'query-patterns', title: 'Query Patterns', content: t3QueryPatterns, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'cs205-t4-fd', slug: 'functional-dependencies', title: 'Functional Dependencies', content: t4FunctionalDeps, order: 1 },
  { id: 'cs205-t4-nf', slug: 'normal-forms', title: 'Normal Forms', content: t4NormalForms, order: 2 },
  { id: 'cs205-t4-decomp', slug: 'decomposition-algorithms', title: 'Decomposition Algorithms', content: t4DecompositionAlgorithms, order: 3 },
  { id: 'cs205-t4-denorm', slug: 'denormalization', title: 'Denormalization', content: t4Denormalization, order: 4 },
  { id: 'cs205-t4-practice', slug: 'normalization-practice', title: 'Normalization Practice', content: t4NormalizationPractice, order: 5 },
  { id: 'cs205-t4-advanced', slug: 'advanced-normal-forms', title: 'Advanced Normal Forms', content: t4AdvancedNormalForms, order: 6 },
  { id: 'cs205-t4-refinement', slug: 'schema-refinement', title: 'Schema Refinement', content: t4SchemaRefinement, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'cs205-t5-acid', slug: 'acid-properties', title: 'ACID Properties', content: t5ACIDProperties, order: 1 },
  { id: 'cs205-t5-control', slug: 'transaction-control', title: 'Transaction Control', content: t5TransactionControl, order: 2 },
  { id: 'cs205-t5-concurrency', slug: 'concurrency-problems', title: 'Concurrency Problems', content: t5ConcurrencyProblems, order: 3 },
  { id: 'cs205-t5-isolation', slug: 'isolation-levels', title: 'Isolation Levels', content: t5IsolationLevels, order: 4 },
  { id: 'cs205-t5-locking', slug: 'locking-deadlocks', title: 'Locking and Deadlocks', content: t5LockingDeadlocks, order: 5 },
  { id: 'cs205-t5-recovery', slug: 'transaction-recovery', title: 'Transaction Recovery', content: t5TransactionRecovery, order: 6 },
  { id: 'cs205-t5-practical', slug: 'practical-transaction-management', title: 'Practical Transaction Management', content: t5PracticalTransactions, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'cs205-t6-fundamentals', slug: 'index-fundamentals', title: 'Index Fundamentals', content: t6IndexFundamentals, order: 1 },
  { id: 'cs205-t6-btree', slug: 'btree-structure', title: 'B-Tree Structure', content: t6BTreeStructure, order: 2 },
  { id: 'cs205-t6-types', slug: 'index-types', title: 'Index Types', content: t6IndexTypes, order: 3 },
  { id: 'cs205-t6-selection', slug: 'index-selection', title: 'Index Selection', content: t6IndexSelection, order: 4 },
  { id: 'cs205-t6-maintenance', slug: 'index-maintenance', title: 'Index Maintenance', content: t6IndexMaintenance, order: 5 },
  { id: 'cs205-t6-specialized', slug: 'specialized-indexes', title: 'Specialized Index Types', content: t6SpecializedIndexes, order: 6 },
  { id: 'cs205-t6-design', slug: 'index-design-strategies', title: 'Index Design Strategies', content: t6IndexDesignStrategies, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'cs205-t7-processing', slug: 'query-processing', title: 'Query Processing', content: t7QueryProcessing, order: 1 },
  { id: 'cs205-t7-plans', slug: 'execution-plans', title: 'Execution Plans', content: t7ExecutionPlans, order: 2 },
  { id: 'cs205-t7-cost', slug: 'cost-estimation', title: 'Cost Estimation', content: t7CostEstimation, order: 3 },
  { id: 'cs205-t7-rewriting', slug: 'query-rewriting', title: 'Query Rewriting', content: t7QueryRewriting, order: 4 },
  { id: 'cs205-t7-tuning', slug: 'performance-tuning', title: 'Performance Tuning', content: t7PerformanceTuning, order: 5 },
  { id: 'cs205-t7-joins', slug: 'join-algorithms', title: 'Join Algorithms and Optimization', content: t7JoinAlgorithms, order: 6 },
  { id: 'cs205-t7-optimizer', slug: 'optimizer-internals', title: 'Query Optimizer Internals', content: t7OptimizerInternals, order: 7 },
];

export const cs205Topics: Topic[] = [
  {
    id: 'cs205-1',
    title: 'Relational Model and ER Diagrams',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs205-quiz-1-1', 'cs205-quiz-1-2', 'cs205-quiz-1-3'],
    exerciseIds: ['cs205-ex-1-1', 'cs205-ex-1-2', 'cs205-ex-1-3', 'cs205-ex-1-4', 'cs205-ex-1-5', 'cs205-ex-1-6', 'cs205-ex-1-7', 'cs205-ex-1-8', 'cs205-ex-1-9', 'cs205-ex-1-10', 'cs205-ex-1-11', 'cs205-ex-1-12', 'cs205-ex-1-13', 'cs205-ex-1-14', 'cs205-ex-1-15', 'cs205-ex-1-16']
  },
  {
    id: 'cs205-2',
    title: 'SQL Fundamentals',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs205-quiz-2-1', 'cs205-quiz-2-2', 'cs205-quiz-2-3'],
    exerciseIds: ['cs205-ex-2-1', 'cs205-ex-2-2', 'cs205-ex-2-3', 'cs205-ex-2-4', 'cs205-ex-2-5', 'cs205-ex-2-6', 'cs205-ex-2-7', 'cs205-ex-2-8', 'cs205-ex-2-9', 'cs205-ex-2-10', 'cs205-ex-2-11', 'cs205-ex-2-12', 'cs205-ex-2-13', 'cs205-ex-2-14', 'cs205-ex-2-15', 'cs205-ex-2-16']
  },
  {
    id: 'cs205-3',
    title: 'Advanced SQL Queries',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs205-quiz-3-1', 'cs205-quiz-3-2', 'cs205-quiz-3-3'],
    exerciseIds: ['cs205-ex-3-1', 'cs205-ex-3-2', 'cs205-ex-3-3', 'cs205-ex-3-4', 'cs205-ex-3-5', 'cs205-ex-3-6', 'cs205-ex-3-7', 'cs205-ex-3-8', 'cs205-ex-3-9', 'cs205-ex-3-10', 'cs205-ex-3-11', 'cs205-ex-3-12', 'cs205-ex-3-13', 'cs205-ex-3-14', 'cs205-ex-3-15', 'cs205-ex-3-16']
  },
  {
    id: 'cs205-4',
    title: 'Normalization Theory',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs205-quiz-4-1', 'cs205-quiz-4-2', 'cs205-quiz-4-3'],
    exerciseIds: ['cs205-ex-4-1', 'cs205-ex-4-2', 'cs205-ex-4-3', 'cs205-ex-4-4', 'cs205-ex-4-5', 'cs205-ex-4-6', 'cs205-ex-4-7', 'cs205-ex-4-8', 'cs205-ex-4-9', 'cs205-ex-4-10', 'cs205-ex-4-11', 'cs205-ex-4-12', 'cs205-ex-4-13', 'cs205-ex-4-14', 'cs205-ex-4-15', 'cs205-ex-4-16']
  },
  {
    id: 'cs205-5',
    title: 'Transactions and ACID',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs205-quiz-5-1', 'cs205-quiz-5-2', 'cs205-quiz-5-3'],
    exerciseIds: ['cs205-ex-5-1', 'cs205-ex-5-2', 'cs205-ex-5-3', 'cs205-ex-5-4', 'cs205-ex-5-5', 'cs205-ex-5-6', 'cs205-ex-5-7', 'cs205-ex-5-8', 'cs205-ex-5-9', 'cs205-ex-5-10', 'cs205-ex-5-11', 'cs205-ex-5-12', 'cs205-ex-5-13', 'cs205-ex-5-14', 'cs205-ex-5-15', 'cs205-ex-5-16']
  },
  {
    id: 'cs205-6',
    title: 'Indexing and B-Trees',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs205-quiz-6-1', 'cs205-quiz-6-2', 'cs205-quiz-6-3'],
    exerciseIds: ['cs205-ex-6-1', 'cs205-ex-6-2', 'cs205-ex-6-3', 'cs205-ex-6-4', 'cs205-ex-6-5', 'cs205-ex-6-6', 'cs205-ex-6-7', 'cs205-ex-6-8', 'cs205-ex-6-9', 'cs205-ex-6-10', 'cs205-ex-6-11', 'cs205-ex-6-12', 'cs205-ex-6-13', 'cs205-ex-6-14', 'cs205-ex-6-15', 'cs205-ex-6-16']
  },
  {
    id: 'cs205-7',
    title: 'Query Optimization',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs205-quiz-7-1', 'cs205-quiz-7-2', 'cs205-quiz-7-3'],
    exerciseIds: ['cs205-ex-7-1', 'cs205-ex-7-2', 'cs205-ex-7-3', 'cs205-ex-7-4', 'cs205-ex-7-5', 'cs205-ex-7-6', 'cs205-ex-7-7', 'cs205-ex-7-8', 'cs205-ex-7-9', 'cs205-ex-7-10', 'cs205-ex-7-11', 'cs205-ex-7-12', 'cs205-ex-7-13', 'cs205-ex-7-14', 'cs205-ex-7-15', 'cs205-ex-7-16']
  }
];
