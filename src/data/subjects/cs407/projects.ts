import { Project } from '../../../core/types';

export const cs407Projects: Project[] = [
  {
    id: 'cs407-project-1',
    subjectId: 'cs407',
    title: 'End-to-End Data Analysis Pipeline',
    description: 'Build a complete data analysis pipeline from collection to visualization. This project integrates data collection, cleaning, exploratory analysis, and visualization techniques to analyze a real-world dataset.',
    requirements: [
      'Collect data from at least 2 different source types (API, database, CSV files, web scraping)',
      'Clean and preprocess the data to handle missing values, outliers, and inconsistencies',
      'Perform comprehensive exploratory data analysis with statistical tests',
      'Create insightful and well-designed visualizations',
      'Document findings in a professional report (5-10 pages)',
      'Submit: Jupyter notebook with code and analysis, cleaned dataset, visualization dashboard, written report, presentation slides'
    ],
    rubric: [
      {
        name: 'Data Collection',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Collects data from 3+ different source types with robust error handling' },
          { score: 3, label: 'Good', description: 'Collects data from 2+ source types successfully' },
          { score: 2, label: 'Satisfactory', description: 'Collects data from at least 1 source with some issues' },
          { score: 1, label: 'Needs Improvement', description: 'Data collection incomplete or not working' }
        ]
      },
      {
        name: 'Data Cleaning',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'Comprehensive handling of missing data, outliers, duplicates with justification' },
          { score: 3, label: 'Good', description: 'Properly handles major data quality issues' },
          { score: 2, label: 'Satisfactory', description: 'Basic cleaning performed but missing some issues' },
          { score: 1, label: 'Needs Improvement', description: 'Minimal or incorrect data cleaning' }
        ]
      },
      {
        name: 'EDA',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'Thorough analysis with statistical tests, correlations, and insights' },
          { score: 3, label: 'Good', description: 'Good exploratory analysis with key statistics' },
          { score: 2, label: 'Satisfactory', description: 'Basic descriptive statistics provided' },
          { score: 1, label: 'Needs Improvement', description: 'Minimal or superficial analysis' }
        ]
      },
      {
        name: 'Visualization',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Professional, insightful visualizations with proper labels and design' },
          { score: 3, label: 'Good', description: 'Clear and appropriate visualizations' },
          { score: 2, label: 'Satisfactory', description: 'Basic visualizations that convey information' },
          { score: 1, label: 'Needs Improvement', description: 'Poor or missing visualizations' }
        ]
      },
      {
        name: 'Documentation',
        weight: 10,
        levels: [
          { score: 4, label: 'Excellent', description: 'Comprehensive documentation with clear explanations and well-written report' },
          { score: 3, label: 'Good', description: 'Good documentation and readable report' },
          { score: 2, label: 'Satisfactory', description: 'Basic documentation present' },
          { score: 1, label: 'Needs Improvement', description: 'Poor or missing documentation' }
        ]
      }
    ],
    estimatedHours: 8
  },
  {
    id: 'cs407-project-2',
    subjectId: 'cs407',
    title: 'Big Data Analytics System',
    description: 'Design and implement a big data analytics solution that can handle large-scale data processing. This project focuses on building a scalable, efficient data pipeline with real-time analytics capabilities.',
    requirements: [
      'Design a scalable data architecture for big data processing',
      'Implement an ETL pipeline using appropriate big data technologies',
      'Process large datasets efficiently with proper optimization',
      'Create a real-time analytics dashboard',
      'Ensure data quality and implement governance practices',
      'Submit: System architecture diagram, ETL pipeline code, data processing scripts, real-time dashboard, comprehensive technical documentation'
    ],
    rubric: [
      {
        name: 'Architecture Design',
        weight: 30,
        levels: [
          { score: 4, label: 'Excellent', description: 'Highly scalable, well-documented architecture with proper technology choices' },
          { score: 3, label: 'Good', description: 'Good architecture design that addresses scalability' },
          { score: 2, label: 'Satisfactory', description: 'Basic architecture that works but limited scalability' },
          { score: 1, label: 'Needs Improvement', description: 'Poor architecture design or major flaws' }
        ]
      },
      {
        name: 'Implementation',
        weight: 35,
        levels: [
          { score: 4, label: 'Excellent', description: 'Robust ETL pipeline with error handling and data validation' },
          { score: 3, label: 'Good', description: 'Working ETL pipeline that processes data correctly' },
          { score: 2, label: 'Satisfactory', description: 'Basic pipeline with some functionality' },
          { score: 1, label: 'Needs Improvement', description: 'Pipeline incomplete or not working' }
        ]
      },
      {
        name: 'Performance',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Optimized for large datasets with demonstrable performance metrics' },
          { score: 3, label: 'Good', description: 'Handles moderate data volumes efficiently' },
          { score: 2, label: 'Satisfactory', description: 'Works but has performance limitations' },
          { score: 1, label: 'Needs Improvement', description: 'Significant performance issues' }
        ]
      },
      {
        name: 'Documentation',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Comprehensive technical documentation with architecture diagrams and API docs' },
          { score: 3, label: 'Good', description: 'Good documentation covering key aspects' },
          { score: 2, label: 'Satisfactory', description: 'Basic documentation present' },
          { score: 1, label: 'Needs Improvement', description: 'Poor or missing documentation' }
        ]
      }
    ],
    estimatedHours: 10
  }
];
