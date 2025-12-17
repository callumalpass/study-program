import { Project } from '../../../core/types';

export const cs402Projects: Project[] = [
  {
    id: 'cs402-project-1',
    subjectId: 'cs402',
    title: 'End-to-End ML Pipeline',
    description: `Build a complete machine learning pipeline from raw data to deployed model. This project encompasses the full ML lifecycle: data collection and cleaning, exploratory data analysis, feature engineering, model selection and training, hyperparameter tuning, evaluation with multiple metrics, and deployment as a REST API. You'll work with a real-world dataset to predict outcomes, implementing best practices for reproducibility, versioning, and monitoring. The project emphasizes production-ready code with proper logging, error handling, and documentation.`,
    requirements: [
      'Implement comprehensive data preprocessing pipeline with handling for missing values, outliers, and feature scaling',
      'Perform exploratory data analysis with statistical summaries and visualizations to guide feature engineering',
      'Train and compare at least 3 different ML algorithms (e.g., Random Forest, Gradient Boosting, Neural Network)',
      'Implement cross-validation and hyperparameter tuning using grid search or Bayesian optimization',
      'Evaluate models using multiple metrics appropriate to the problem (accuracy, precision, recall, F1, ROC-AUC)',
      'Deploy the best model as a REST API with input validation and proper error handling',
      'Create comprehensive documentation including data dictionary, model card, and API usage guide'
    ],
    rubric: [
      {
        name: 'Data Preprocessing',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive preprocessing with proper handling of missing values, outliers, encoding, and scaling. Includes data validation and reproducible pipeline.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Solid preprocessing covering major issues. Minor gaps in handling edge cases or reproducibility.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic preprocessing implemented but missing important steps or lacks proper validation.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal preprocessing with significant issues unaddressed. Data quality concerns remain.'
          }
        ]
      },
      {
        name: 'Feature Engineering & EDA',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Thorough EDA with insightful visualizations. Creative feature engineering backed by domain understanding and statistical analysis.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good exploration with relevant visualizations. Feature engineering shows understanding but could be more sophisticated.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic EDA performed. Limited feature engineering with standard transformations only.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal exploration. Little to no feature engineering beyond what was provided.'
          }
        ]
      },
      {
        name: 'Model Training & Optimization',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Multiple algorithms compared systematically. Sophisticated hyperparameter tuning with proper validation. Clear justification for final model choice.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Several algorithms tested with basic tuning. Reasonable model selection process with some justification.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Limited model comparison. Basic training with minimal hyperparameter tuning.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Single model with default parameters. No comparison or optimization performed.'
          }
        ]
      },
      {
        name: 'Model Evaluation',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive evaluation with multiple appropriate metrics, cross-validation, and analysis of errors. Includes bias/fairness considerations.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good evaluation with relevant metrics and cross-validation. Some analysis of model behavior.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic evaluation with standard metrics. Limited analysis beyond overall scores.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal evaluation with single metric. No validation strategy or error analysis.'
          }
        ]
      },
      {
        name: 'Deployment & API',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Production-ready API with proper validation, error handling, logging, and monitoring. Includes health checks and performance optimization.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Functional API with basic validation and error handling. Mostly ready for deployment.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic API that works for simple cases. Limited error handling or validation.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal API implementation with significant issues or missing core functionality.'
          }
        ]
      },
      {
        name: 'Code Quality & Documentation',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clean, well-organized code with comprehensive documentation. Includes model card, API docs, and setup instructions. Follows best practices.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good code structure with adequate documentation. Minor organizational issues or documentation gaps.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Functional code but lacks organization. Basic documentation present but incomplete.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poorly organized code with minimal documentation. Difficult to understand or reproduce.'
          }
        ]
      }
    ],
    estimatedHours: 30,
    scaffolding: {
      overview: 'This project guides you through building a production-ready ML system. Focus on creating a reproducible, well-documented pipeline that could be maintained and improved by other developers.',
      gettingStarted: [
        'Choose a real-world dataset (Kaggle, UCI ML Repository, or similar) appropriate for supervised learning',
        'Set up a virtual environment and install required libraries (pandas, scikit-learn, Flask/FastAPI)',
        'Create a project structure with separate modules for data processing, training, and deployment',
        'Initialize git repository and create .gitignore for data and model files'
      ],
      milestones: [
        'Complete EDA notebook with key insights and feature engineering ideas',
        'Implement and test preprocessing pipeline on sample data',
        'Train baseline models and establish performance benchmarks',
        'Complete hyperparameter tuning and select final model',
        'Deploy API locally and test with sample requests',
        'Finalize documentation and prepare submission'
      ],
      tips: [
        'Use sklearn pipelines to ensure preprocessing consistency between training and inference',
        'Save model artifacts and preprocessing objects with versioning',
        'Document all assumptions and design decisions in your code and notebooks',
        'Test your API with edge cases and invalid inputs',
        'Consider using tools like MLflow or Weights & Biases for experiment tracking'
      ]
    }
  },
  {
    id: 'cs402-project-2',
    subjectId: 'cs402',
    title: 'Deep Learning Image Classifier',
    description: `Develop a state-of-the-art image classification system using convolutional neural networks and transfer learning. This project explores modern deep learning techniques including data augmentation, transfer learning from pretrained models (ResNet, VGG, EfficientNet), fine-tuning strategies, and training optimization. You'll work with a custom image dataset, implement data augmentation pipelines, experiment with different architectures, and analyze model performance including attention visualization and error analysis. The final deliverable includes a trained model achieving competitive accuracy and a comprehensive analysis of its behavior.`,
    requirements: [
      'Collect or curate an image dataset with at least 3 classes and minimum 500 images per class',
      'Implement comprehensive data augmentation strategy (rotation, flip, color jitter, random crop, etc.)',
      'Build a CNN from scratch and compare with at least 2 transfer learning approaches using pretrained models',
      'Implement proper training loop with learning rate scheduling, early stopping, and checkpoint saving',
      'Fine-tune pretrained models with progressive unfreezing or discriminative learning rates',
      'Evaluate using confusion matrix, per-class metrics, and visualize model attention using GradCAM or similar',
      'Achieve validation accuracy of at least 85% or demonstrate significant improvement over baseline'
    ],
    rubric: [
      {
        name: 'Dataset & Preprocessing',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Well-curated dataset with proper train/val/test splits. Sophisticated augmentation strategy backed by experimentation. Proper normalization and batching.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good dataset with appropriate splits. Standard augmentation techniques applied correctly. Minor issues with balancing or preprocessing.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Adequate dataset but may have imbalance issues. Basic augmentation applied. Some preprocessing concerns.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Insufficient or poorly prepared dataset. Minimal augmentation. Significant preprocessing issues.'
          }
        ]
      },
      {
        name: 'CNN Architecture',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Well-designed CNN architecture from scratch with modern components (batch norm, residual connections, etc.). Clear design rationale based on problem requirements.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Solid CNN architecture with appropriate depth and complexity. Uses standard building blocks effectively.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic CNN implemented correctly but lacks sophistication. Simple sequential architecture without modern enhancements.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poorly designed architecture with structural issues or inappropriate for the task.'
          }
        ]
      },
      {
        name: 'Transfer Learning',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Sophisticated use of transfer learning with multiple pretrained models compared. Effective fine-tuning strategy with progressive unfreezing or discriminative learning rates.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good implementation of transfer learning with at least two models. Reasonable fine-tuning approach with some experimentation.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic transfer learning implemented. Limited experimentation with fine-tuning strategies.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal or incorrect use of transfer learning. No fine-tuning or poor adaptation to target dataset.'
          }
        ]
      },
      {
        name: 'Training & Optimization',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Sophisticated training setup with learning rate scheduling, early stopping, gradient clipping if needed. Thorough experimentation with optimizers and hyperparameters.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good training implementation with learning rate decay and early stopping. Some hyperparameter tuning performed.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic training loop with minimal optimization techniques. Limited hyperparameter exploration.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor training implementation with issues like overfitting, divergence, or no optimization strategy.'
          }
        ]
      },
      {
        name: 'Model Performance',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Achieves >90% validation accuracy with strong per-class performance. Models demonstrate good generalization and minimal overfitting.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Achieves 85-90% validation accuracy. Reasonable performance across most classes with some imbalance.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Achieves 75-85% validation accuracy or shows significant improvement over baseline. Some classes perform poorly.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor performance (<75% accuracy) with significant overfitting or underfitting issues.'
          }
        ]
      },
      {
        name: 'Analysis & Visualization',
        weight: 5,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive analysis with confusion matrix, per-class metrics, attention visualization (GradCAM), and insightful error analysis. Clear presentation of findings.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good evaluation with confusion matrix and class-wise metrics. Some visualization of model behavior and errors.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic evaluation metrics and simple visualizations. Limited analysis of model behavior.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal evaluation and visualization. No meaningful analysis of model performance or errors.'
          }
        ]
      }
    ],
    estimatedHours: 35,
    scaffolding: {
      overview: 'Build a modern image classification system leveraging transfer learning and advanced training techniques. This project emphasizes practical deep learning skills including data preparation, model selection, training optimization, and result analysis.',
      gettingStarted: [
        'Select an image dataset (consider Kaggle datasets, Stanford Dogs, Food-101, or create your own)',
        'Set up PyTorch or TensorFlow environment with GPU support if available',
        'Create data loaders with augmentation pipelines using torchvision or tf.keras.preprocessing',
        'Download and explore pretrained models (ResNet50, VGG16, EfficientNet) from model zoos'
      ],
      milestones: [
        'Complete dataset preparation and validate data loaders with sample batches',
        'Implement and train baseline CNN from scratch to establish performance floor',
        'Implement first transfer learning model with frozen backbone',
        'Experiment with fine-tuning strategies and optimize hyperparameters',
        'Achieve target accuracy and complete error analysis',
        'Generate visualizations (GradCAM, confusion matrix) and finalize report'
      ],
      tips: [
        'Start with small image sizes (224x224) and fewer epochs during experimentation to iterate quickly',
        'Use tensorboard or wandb to track training metrics and compare experiments',
        'For fine-tuning, unfreeze layers gradually from top to bottom and use smaller learning rates for deeper layers',
        'Analyze misclassified examples to understand model weaknesses and guide improvements',
        'Consider using mixed precision training (AMP) to speed up training and reduce memory usage',
        'Save checkpoints frequently and keep the best model based on validation performance'
      ],
      starterResources: [
        {
          label: 'PyTorch Transfer Learning Tutorial',
          description: 'Official tutorial on transfer learning with PyTorch',
          link: 'https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html'
        },
        {
          label: 'GradCAM Implementation',
          description: 'Understanding and visualizing CNN decisions',
          link: 'https://github.com/jacobgil/pytorch-grad-cam'
        },
        {
          label: 'Image Data Augmentation',
          description: 'Comprehensive guide to augmentation techniques',
          link: 'https://github.com/aleju/imgaug'
        }
      ]
    }
  }
];
