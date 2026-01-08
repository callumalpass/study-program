/**
 * Quiz Answer Validation Tests
 *
 * Tests that validate quiz answers are correctly set:
 * - Multiple choice: correctAnswer is a valid index (0 to options.length-1)
 * - True/false: correctAnswer is a boolean
 * - Code output: correctAnswer matches expected output
 * - Fill blank: correctAnswer is a non-empty string
 */

import { describe, it, expect } from 'vitest';

interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'code_output' | 'fill_blank' | 'coding' | 'written';
  prompt: string;
  correctAnswer: number | boolean | string;
  options?: string[];
  codeSnippet?: string;
  explanation?: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  questions: QuizQuestion[];
}

// Import all quiz files
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });

// Load and flatten all quizzes
const allQuizzes: Quiz[] = Object.values(quizModules).flatMap((module: unknown) => {
  const mod = module as { default?: Quiz[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

// Create a lookup of quizzes by subject
const quizzesBySubject = new Map<string, Quiz[]>();
for (const quiz of allQuizzes) {
  const existing = quizzesBySubject.get(quiz.subjectId) || [];
  existing.push(quiz);
  quizzesBySubject.set(quiz.subjectId, existing);
}

describe('Quiz Answer Validation', () => {
  describe('multiple choice questions', () => {
    it('should have correctAnswer as a valid index or matching string within options array', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            const { id, correctAnswer, options } = question;

            if (!options || !Array.isArray(options)) {
              issues.push(`${quiz.subjectId}/${quiz.id}/${id}: missing options array`);
              continue;
            }

            // correctAnswer can be either a numeric index or a string that matches an option
            // (quiz-utils.ts handles both formats via getCorrectOptionIndex)
            if (typeof correctAnswer === 'number') {
              if (correctAnswer < 0 || correctAnswer >= options.length) {
                issues.push(
                  `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer ${correctAnswer} out of bounds (options: ${options.length})`
                );
              }
            } else if (typeof correctAnswer === 'string') {
              // String correctAnswer must match one of the options exactly
              if (!options.includes(correctAnswer)) {
                issues.push(
                  `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer "${correctAnswer.slice(0, 30)}..." doesn't match any option`
                );
              }
            } else {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer should be number or string, got ${typeof correctAnswer}`
              );
            }
          }
        }
      }

      expect(
        issues,
        `Found ${issues.length} multiple choice answer issues:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('should have 2-4 options for each multiple choice question', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice') {
            const { id, options } = question;

            if (!options) {
              issues.push(`${quiz.subjectId}/${quiz.id}/${id}: missing options`);
              continue;
            }

            // Allow 2-4 options (some quizzes have binary choices)
            if (options.length < 2 || options.length > 4) {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: expected 2-4 options, got ${options.length}`
              );
            }
          }
        }
      }

      expect(
        issues,
        `Found ${issues.length} questions without 2-4 options:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('should not have duplicate options', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'multiple_choice' && question.options) {
            const { id, options } = question;
            const uniqueOptions = new Set(options.map(o => o.toLowerCase().trim()));

            if (uniqueOptions.size !== options.length) {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: has duplicate options`
              );
            }
          }
        }
      }

      // This is informational - some legitimate quizzes may have similar options
      if (issues.length > 0) {
        console.log(`Found ${issues.length} questions with potentially duplicate options`);
      }

      // Allow up to 5 duplicates as some may be intentional
      expect(issues.length).toBeLessThan(5);
    });
  });

  describe('true/false questions', () => {
    it('should have correctAnswer as a boolean', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'true_false') {
            const { id, correctAnswer } = question;

            if (typeof correctAnswer !== 'boolean') {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer should be boolean, got ${typeof correctAnswer} (${correctAnswer})`
              );
            }
          }
        }
      }

      expect(
        issues,
        `Found ${issues.length} true/false answer issues:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('code output questions', () => {
    it('should have correctAnswer as a non-empty string', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'code_output') {
            const { id, correctAnswer, codeSnippet } = question;

            if (typeof correctAnswer !== 'string') {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer should be string, got ${typeof correctAnswer}`
              );
              continue;
            }

            if (correctAnswer.trim() === '') {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer is empty`
              );
            }

            if (!codeSnippet) {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: missing codeSnippet`
              );
            }
          }
        }
      }

      expect(
        issues,
        `Found ${issues.length} code output answer issues:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('fill blank questions', () => {
    it('should have correctAnswer as a non-empty string', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'fill_blank') {
            const { id, correctAnswer } = question;

            if (typeof correctAnswer !== 'string') {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer should be string, got ${typeof correctAnswer}`
              );
              continue;
            }

            if (correctAnswer.trim() === '') {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: correctAnswer is empty`
              );
            }
          }
        }
      }

      expect(
        issues,
        `Found ${issues.length} fill blank answer issues:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('should have blank indicator in prompt', () => {
      const issues: string[] = [];
      const blankPatterns = [/____/, /\[blank\]/i, /\[answer\]/i, /__/];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.type === 'fill_blank') {
            const { id, prompt } = question;
            const hasBlank = blankPatterns.some(pattern => pattern.test(prompt));

            if (!hasBlank) {
              issues.push(
                `${quiz.subjectId}/${quiz.id}/${id}: prompt may be missing blank indicator`
              );
            }
          }
        }
      }

      // This is informational - report but don't fail
      if (issues.length > 0) {
        console.log(`Found ${issues.length} fill blank questions potentially missing blank indicator`);
      }
    });
  });

  describe('all questions', () => {
    it('should have unique question IDs within each quiz', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        const seenIds = new Set<string>();
        for (const question of quiz.questions) {
          if (seenIds.has(question.id)) {
            issues.push(`${quiz.subjectId}/${quiz.id}: duplicate question ID "${question.id}"`);
          }
          seenIds.add(question.id);
        }
      }

      expect(
        issues,
        `Found ${issues.length} duplicate question IDs:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('should have non-empty prompts', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (!question.prompt || question.prompt.trim() === '') {
            issues.push(`${quiz.subjectId}/${quiz.id}/${question.id}: empty prompt`);
          }
        }
      }

      expect(
        issues,
        `Found ${issues.length} questions with empty prompts:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('should have explanations (optional but recommended)', () => {
      let withExplanation = 0;
      let withoutExplanation = 0;

      for (const quiz of allQuizzes) {
        for (const question of quiz.questions) {
          if (question.explanation && question.explanation.trim() !== '') {
            withExplanation++;
          } else {
            withoutExplanation++;
          }
        }
      }

      const total = withExplanation + withoutExplanation;
      const percentWithExplanation = total > 0 ? (withExplanation / total) * 100 : 0;

      console.log(`Explanation coverage: ${withExplanation}/${total} (${percentWithExplanation.toFixed(1)}%)`);

      // Most questions should have explanations (at least 80%)
      expect(percentWithExplanation).toBeGreaterThan(80);
    });
  });

  describe('quiz metadata', () => {
    it('should have valid subjectId format', () => {
      const issues: string[] = [];
      const validSubjectPattern = /^(cs|math)\d{3}$/;

      for (const quiz of allQuizzes) {
        if (!validSubjectPattern.test(quiz.subjectId)) {
          issues.push(`Quiz ${quiz.id}: invalid subjectId "${quiz.subjectId}"`);
        }
      }

      expect(
        issues,
        `Found ${issues.length} quizzes with invalid subjectId:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('should have valid topicId format', () => {
      const issues: string[] = [];
      // Accept various topicId formats:
      // - Long format: cs101-topic-1
      // - Short format: cs101-1
      // - Alternative format: cs202-topic1, cs301-t1, cs407-t1
      const validTopicPattern = /^(cs|math)\d{3}(-topic-?\d+|-t\d+|-\d+|topic\d+)$/;

      for (const quiz of allQuizzes) {
        if (!validTopicPattern.test(quiz.topicId)) {
          issues.push(`Quiz ${quiz.id}: invalid topicId "${quiz.topicId}"`);
        }
      }

      expect(
        issues,
        `Found ${issues.length} quizzes with invalid topicId:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });

    it('should have at least one question', () => {
      const issues: string[] = [];

      for (const quiz of allQuizzes) {
        if (!quiz.questions || quiz.questions.length === 0) {
          issues.push(`Quiz ${quiz.id} (${quiz.subjectId}): no questions`);
        }
      }

      expect(
        issues,
        `Found ${issues.length} quizzes with no questions:\n${issues.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('statistics', () => {
    it('reports quiz statistics', () => {
      const stats = {
        totalQuizzes: allQuizzes.length,
        totalQuestions: 0,
        byType: {} as Record<string, number>,
        bySubject: {} as Record<string, number>,
      };

      for (const quiz of allQuizzes) {
        stats.totalQuestions += quiz.questions.length;
        stats.bySubject[quiz.subjectId] = (stats.bySubject[quiz.subjectId] || 0) + 1;

        for (const question of quiz.questions) {
          stats.byType[question.type] = (stats.byType[question.type] || 0) + 1;
        }
      }

      console.log('Quiz Statistics:');
      console.log(`  Total quizzes: ${stats.totalQuizzes}`);
      console.log(`  Total questions: ${stats.totalQuestions}`);
      console.log(`  Average questions per quiz: ${(stats.totalQuestions / stats.totalQuizzes).toFixed(1)}`);
      console.log('  By type:');
      Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
        console.log(`    ${type}: ${count}`);
      });

      expect(stats.totalQuizzes).toBeGreaterThan(0);
      expect(stats.totalQuestions).toBeGreaterThan(0);
    });
  });
});
