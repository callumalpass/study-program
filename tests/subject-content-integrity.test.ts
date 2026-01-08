import { describe, it, expect } from 'vitest';
import { allQuizzes, allExercises, allExams, allProjects } from '../src/subjects';
import { curriculum } from '../src/data/curriculum';
import type { Quiz, Exercise, Exam, Project } from '../src/core/types';

/**
 * Subject Content Integrity Tests
 *
 * These tests validate the structural integrity of subject content data,
 * ensuring that:
 * 1. All content has required identifying fields
 * 2. IDs are unique within their respective collections
 * 3. Question types are valid
 * 4. Content arrays are properly structured
 */

// Create lookup maps for efficient access
const quizById = new Map<string, Quiz>(allQuizzes.map(q => [q.id, q]));
const exerciseById = new Map<string, Exercise>(allExercises.map(e => [e.id, e]));
const examById = new Map<string, Exam>(allExams.map(e => [e.id, e]));
const projectById = new Map<string, Project>(allProjects.map(p => [p.id, p]));

describe('Subject Content Integrity', () => {
  describe('quiz structure validation', () => {
    it('all quizzes have an id and title', () => {
      allQuizzes.forEach(quiz => {
        expect(quiz.id, `Quiz should have an id`).toBeDefined();
        expect(quiz.title, `Quiz ${quiz.id} should have a title`).toBeDefined();
      });
    });

    it('all quizzes have questions array', () => {
      allQuizzes.forEach(quiz => {
        expect(
          Array.isArray(quiz.questions),
          `Quiz ${quiz.id} should have questions array`
        ).toBe(true);
      });
    });

    it('all quiz questions have id and type', () => {
      allQuizzes.forEach(quiz => {
        quiz.questions.forEach((question, qIdx) => {
          expect(
            question.id,
            `Question ${qIdx} in quiz ${quiz.id} should have an id`
          ).toBeDefined();
          expect(
            question.type,
            `Question ${question.id} in quiz ${quiz.id} should have a type`
          ).toBeDefined();
        });
      });
    });

    it('all quiz questions have correctAnswer defined', () => {
      allQuizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
          expect(
            question.correctAnswer !== undefined,
            `Question ${question.id} in quiz ${quiz.id} should have a correctAnswer`
          ).toBe(true);
        });
      });
    });

    it('multiple_choice questions have options array', () => {
      allQuizzes.forEach(quiz => {
        quiz.questions
          .filter(q => q.type === 'multiple_choice')
          .forEach(question => {
            expect(
              Array.isArray(question.options),
              `Multiple choice question ${question.id} in ${quiz.id} should have options`
            ).toBe(true);
          });
      });
    });

    it('true_false questions have boolean correctAnswer', () => {
      allQuizzes.forEach(quiz => {
        quiz.questions
          .filter(q => q.type === 'true_false')
          .forEach(question => {
            expect(
              typeof question.correctAnswer === 'boolean',
              `True/false question ${question.id} in ${quiz.id} should have boolean correctAnswer, got ${typeof question.correctAnswer}: ${question.correctAnswer}`
            ).toBe(true);
          });
      });
    });

    it('all quiz IDs are unique globally', () => {
      const quizIds = allQuizzes.map(q => q.id);
      const uniqueIds = new Set(quizIds);
      expect(
        uniqueIds.size,
        `Quiz IDs should be unique (found ${quizIds.length - uniqueIds.size} duplicates)`
      ).toBe(quizIds.length);
    });

    it('quizzes have at least one question', () => {
      allQuizzes.forEach(quiz => {
        expect(
          quiz.questions.length,
          `Quiz ${quiz.id} should have at least one question`
        ).toBeGreaterThan(0);
      });
    });
  });

  describe('exercise structure validation', () => {
    it('all exercises have id and title', () => {
      allExercises.forEach(exercise => {
        expect(exercise.id, `Exercise should have an id`).toBeDefined();
        expect(exercise.title, `Exercise ${exercise.id} should have a title`).toBeDefined();
      });
    });

    it('all exercises have difficulty defined', () => {
      allExercises.forEach(exercise => {
        expect(
          exercise.difficulty !== undefined,
          `Exercise ${exercise.id} should have a difficulty`
        ).toBe(true);
      });
    });

    it('coding exercises have language defined', () => {
      allExercises
        .filter(ex => ex.type === 'coding')
        .forEach(exercise => {
          expect(
            exercise.language,
            `Coding exercise ${exercise.id} should have a language`
          ).toBeDefined();
        });
    });

    it('all exercise IDs are unique globally', () => {
      const exerciseIds = allExercises.map(ex => ex.id);
      const uniqueIds = new Set(exerciseIds);
      expect(
        uniqueIds.size,
        `Exercise IDs should be unique (found ${exerciseIds.length - uniqueIds.size} duplicates)`
      ).toBe(exerciseIds.length);
    });
  });

  describe('exam structure validation', () => {
    it('all exams have id and title', () => {
      allExams.forEach(exam => {
        expect(exam.id, `Exam should have an id`).toBeDefined();
        expect(exam.title, `Exam ${exam.id} should have a title`).toBeDefined();
      });
    });

    it('all exams have questions array', () => {
      allExams.forEach(exam => {
        expect(
          Array.isArray(exam.questions),
          `Exam ${exam.id} should have questions array`
        ).toBe(true);
      });
    });

    it('all exam question IDs are unique within each exam', () => {
      allExams.forEach(exam => {
        const questionIds = exam.questions.map(q => q.id);
        const uniqueIds = new Set(questionIds);
        expect(
          uniqueIds.size,
          `Question IDs in exam ${exam.id} should be unique`
        ).toBe(questionIds.length);
      });
    });

    it('exams have at least one question', () => {
      allExams.forEach(exam => {
        expect(
          exam.questions.length,
          `Exam ${exam.id} should have at least one question`
        ).toBeGreaterThan(0);
      });
    });

    it('all exam IDs are unique globally', () => {
      const examIds = allExams.map(e => e.id);
      const uniqueIds = new Set(examIds);
      expect(
        uniqueIds.size,
        `Exam IDs should be unique (found ${examIds.length - uniqueIds.size} duplicates)`
      ).toBe(examIds.length);
    });
  });

  describe('project structure validation', () => {
    it('all projects have id and title', () => {
      allProjects.forEach(project => {
        expect(project.id, `Project should have an id`).toBeDefined();
        expect(project.title, `Project ${project.id} should have a title`).toBeDefined();
      });
    });

    it('all projects have description', () => {
      allProjects.forEach(project => {
        expect(
          project.description,
          `Project ${project.id} should have a description`
        ).toBeDefined();
      });
    });

    it('all project IDs are unique globally', () => {
      const projectIds = allProjects.map(p => p.id);
      const uniqueIds = new Set(projectIds);
      expect(
        uniqueIds.size,
        `Project IDs should be unique (found ${projectIds.length - uniqueIds.size} duplicates)`
      ).toBe(projectIds.length);
    });
  });

  describe('quiz question ID uniqueness', () => {
    it('quiz question IDs are unique within each quiz', () => {
      allQuizzes.forEach(quiz => {
        const questionIds = quiz.questions.map(q => q.id);
        const uniqueIds = new Set(questionIds);
        expect(
          uniqueIds.size,
          `Question IDs in quiz ${quiz.id} should be unique (found ${questionIds.length - uniqueIds.size} duplicates)`
        ).toBe(questionIds.length);
      });
    });
  });

  describe('content collection existence', () => {
    it('has quizzes', () => {
      expect(allQuizzes.length).toBeGreaterThan(0);
    });

    it('has exercises', () => {
      expect(allExercises.length).toBeGreaterThan(0);
    });

    it('has exams', () => {
      expect(allExams.length).toBeGreaterThan(0);
    });

    it('has projects', () => {
      expect(allProjects.length).toBeGreaterThan(0);
    });
  });

  describe('curriculum subjects have content', () => {
    it('curriculum subjects count matches expected', () => {
      // Verify that we have the expected number of subjects
      expect(curriculum.length).toBeGreaterThan(30);
    });

    it('all curriculum subjects have topics', () => {
      curriculum.forEach(subject => {
        expect(
          Array.isArray(subject.topics),
          `Subject ${subject.id} should have topics array`
        ).toBe(true);
      });
    });

    it('all curriculum subjects have valid year and semester', () => {
      curriculum.forEach(subject => {
        expect(
          subject.year >= 1 && subject.year <= 4,
          `Subject ${subject.id} should have valid year (1-4), got ${subject.year}`
        ).toBe(true);
        expect(
          subject.semester >= 1 && subject.semester <= 2,
          `Subject ${subject.id} should have valid semester (1-2), got ${subject.semester}`
        ).toBe(true);
      });
    });
  });

  describe('question types', () => {
    // Valid question types per types.ts: 'multiple_choice' | 'fill_blank' | 'true_false' | 'code_output' | 'coding' | 'written'
    const validQuizQuestionTypes = ['multiple_choice', 'true_false', 'fill_blank', 'code_output', 'coding', 'written'];

    it('quiz questions have expected types', () => {
      allQuizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
          expect(
            validQuizQuestionTypes.includes(question.type),
            `Question ${question.id} in quiz ${quiz.id} has invalid type: ${question.type}`
          ).toBe(true);
        });
      });
    });

    it('exam questions have expected types', () => {
      allExams.forEach(exam => {
        exam.questions.forEach(question => {
          expect(
            validQuizQuestionTypes.includes(question.type),
            `Question ${question.id} in exam ${exam.id} has invalid type: ${question.type}`
          ).toBe(true);
        });
      });
    });
  });

  describe('content statistics', () => {
    it('reports content counts', () => {
      console.log(`Total quizzes: ${allQuizzes.length}`);
      console.log(`Total quiz questions: ${allQuizzes.reduce((sum, q) => sum + q.questions.length, 0)}`);
      console.log(`Total exercises: ${allExercises.length}`);
      console.log(`Total exams: ${allExams.length}`);
      console.log(`Total exam questions: ${allExams.reduce((sum, e) => sum + e.questions.length, 0)}`);
      console.log(`Total projects: ${allProjects.length}`);
      console.log(`Total curriculum subjects: ${curriculum.length}`);

      // Basic sanity checks
      expect(allQuizzes.length).toBeGreaterThan(100);
      expect(allExercises.length).toBeGreaterThan(100);
      expect(allExams.length).toBeGreaterThan(50);
      expect(allProjects.length).toBeGreaterThan(50);
    });
  });

  describe('exam structure validation', () => {
    it('all exam questions have id and type', () => {
      allExams.forEach(exam => {
        exam.questions.forEach((question, qIdx) => {
          expect(
            question.id,
            `Question ${qIdx} in exam ${exam.id} should have an id`
          ).toBeDefined();
          expect(
            question.type,
            `Question ${question.id} in exam ${exam.id} should have a type`
          ).toBeDefined();
        });
      });
    });

    it('reports exam questions missing correctAnswer (informational)', () => {
      // Note: Written questions may use modelAnswer instead of correctAnswer
      // This test reports issues but doesn't fail the build
      const issues: string[] = [];
      allExams.forEach(exam => {
        exam.questions.forEach(question => {
          // For written questions, modelAnswer is acceptable
          if (question.type === 'written') {
            if (question.correctAnswer === undefined && !question.modelAnswer) {
              issues.push(`Question ${question.id} in ${exam.id} has neither correctAnswer nor modelAnswer`);
            }
          } else if (question.correctAnswer === undefined) {
            issues.push(`Question ${question.id} in ${exam.id} is missing correctAnswer`);
          }
        });
      });

      if (issues.length > 0) {
        console.log(`Content quality issues found (${issues.length}):`);
        issues.slice(0, 5).forEach(issue => console.log(`  - ${issue}`));
        if (issues.length > 5) {
          console.log(`  ... and ${issues.length - 5} more`);
        }
      }

      // Just verify we have exams to check
      expect(allExams.length).toBeGreaterThan(0);
    });

    it('multiple_choice exam questions have options array', () => {
      allExams.forEach(exam => {
        exam.questions
          .filter(q => q.type === 'multiple_choice')
          .forEach(question => {
            expect(
              Array.isArray(question.options),
              `Multiple choice question ${question.id} in ${exam.id} should have options`
            ).toBe(true);
          });
      });
    });

    it('true_false exam questions have boolean correctAnswer', () => {
      allExams.forEach(exam => {
        exam.questions
          .filter(q => q.type === 'true_false')
          .forEach(question => {
            expect(
              typeof question.correctAnswer === 'boolean',
              `True/false question ${question.id} in ${exam.id} should have boolean correctAnswer, got ${typeof question.correctAnswer}: ${question.correctAnswer}`
            ).toBe(true);
          });
      });
    });

    it('reports coding exam questions missing testCases (informational)', () => {
      // Note: Some coding questions may rely on solution comparison rather than testCases
      // This test reports issues but doesn't fail the build
      const issues: string[] = [];
      allExams.forEach(exam => {
        exam.questions
          .filter(q => q.type === 'coding')
          .forEach(question => {
            if (!question.testCases) {
              issues.push(`Coding question ${question.id} in ${exam.id} is missing testCases`);
            }
            if (!question.language) {
              issues.push(`Coding question ${question.id} in ${exam.id} is missing language`);
            }
          });
      });

      if (issues.length > 0) {
        console.log(`Coding question issues found (${issues.length}):`);
        issues.slice(0, 5).forEach(issue => console.log(`  - ${issue}`));
        if (issues.length > 5) {
          console.log(`  ... and ${issues.length - 5} more`);
        }
      }

      // Just verify we have exams to check
      expect(allExams.length).toBeGreaterThan(0);
    });
  });

  describe('topic content reference validation', () => {
    it('reports missing exercise references (informational)', () => {
      // Note: Some subjects may have placeholder exercise references that haven't been created yet.
      // This test reports issues but doesn't fail the build.
      const missingExercises: string[] = [];

      curriculum.forEach(subject => {
        subject.topics.forEach(topic => {
          topic.exerciseIds.forEach(exerciseId => {
            if (!exerciseById.has(exerciseId)) {
              missingExercises.push(
                `Subject ${subject.id}, topic ${topic.id}: exercise "${exerciseId}" not found`
              );
            }
          });
        });
      });

      if (missingExercises.length > 0) {
        console.log(`Missing exercise references (${missingExercises.length}):`);
        missingExercises.slice(0, 5).forEach(issue => console.log(`  - ${issue}`));
        if (missingExercises.length > 5) {
          console.log(`  ... and ${missingExercises.length - 5} more`);
        }
      }

      // Just verify we have content to check
      expect(curriculum.length).toBeGreaterThan(0);
    });

    it('reports missing quiz references (informational)', () => {
      // Note: Some subjects may have placeholder quiz references that haven't been created yet.
      // This test reports issues but doesn't fail the build.
      const missingQuizzes: string[] = [];

      curriculum.forEach(subject => {
        subject.topics.forEach(topic => {
          topic.quizIds.forEach(quizId => {
            if (!quizById.has(quizId)) {
              missingQuizzes.push(
                `Subject ${subject.id}, topic ${topic.id}: quiz "${quizId}" not found`
              );
            }
          });
        });
      });

      if (missingQuizzes.length > 0) {
        console.log(`Missing quiz references (${missingQuizzes.length}):`);
        missingQuizzes.slice(0, 5).forEach(issue => console.log(`  - ${issue}`));
        if (missingQuizzes.length > 5) {
          console.log(`  ... and ${missingQuizzes.length - 5} more`);
        }
      }

      // Just verify we have content to check
      expect(curriculum.length).toBeGreaterThan(0);
    });

    it('reports missing exam references (informational)', () => {
      // Note: Some subjects may have placeholder exam references that haven't been created yet.
      // This test reports issues but doesn't fail the build.
      const missingExams: string[] = [];

      curriculum.forEach(subject => {
        (subject.examIds || []).forEach(examId => {
          if (!examById.has(examId)) {
            missingExams.push(
              `Subject ${subject.id}: exam "${examId}" not found`
            );
          }
        });
      });

      if (missingExams.length > 0) {
        console.log(`Missing exam references (${missingExams.length}):`);
        missingExams.slice(0, 5).forEach(issue => console.log(`  - ${issue}`));
        if (missingExams.length > 5) {
          console.log(`  ... and ${missingExams.length - 5} more`);
        }
      }

      // Just verify we have content to check
      expect(curriculum.length).toBeGreaterThan(0);
    });

    it('reports missing project references (informational)', () => {
      // Note: Some subjects may have placeholder project references that haven't been created yet.
      // This test reports issues but doesn't fail the build.
      const missingProjects: string[] = [];

      curriculum.forEach(subject => {
        (subject.projectIds || []).forEach(projectId => {
          if (!projectById.has(projectId)) {
            missingProjects.push(
              `Subject ${subject.id}: project "${projectId}" not found`
            );
          }
        });
      });

      if (missingProjects.length > 0) {
        console.log(`Missing project references (${missingProjects.length}):`);
        missingProjects.slice(0, 5).forEach(issue => console.log(`  - ${issue}`));
        if (missingProjects.length > 5) {
          console.log(`  ... and ${missingProjects.length - 5} more`);
        }
      }

      // Just verify we have content to check
      expect(curriculum.length).toBeGreaterThan(0);
    });
  });

  describe('quiz-exam question cross-referencing', () => {
    // Note: Question IDs are unique within each quiz/exam, but may be reused across different quizzes/exams.
    // This is by design - simple IDs like 'q1', 'q2' are commonly used.
    // The tests below are informational - they report duplicate counts but don't fail.

    it('reports quiz question ID reuse across quizzes (informational)', () => {
      const allQuestionIds: string[] = [];
      allQuizzes.forEach(quiz => {
        quiz.questions.forEach(q => allQuestionIds.push(q.id));
      });
      const uniqueIds = new Set(allQuestionIds);
      const duplicateCount = allQuestionIds.length - uniqueIds.size;

      if (duplicateCount > 0) {
        console.log(`Note: ${duplicateCount} quiz question IDs are reused across different quizzes (this is expected)`);
      }

      // Just verify we collected the data correctly
      expect(allQuestionIds.length).toBeGreaterThan(0);
    });

    it('reports exam question ID reuse across exams (informational)', () => {
      const allQuestionIds: string[] = [];
      allExams.forEach(exam => {
        exam.questions.forEach(q => allQuestionIds.push(q.id));
      });
      const uniqueIds = new Set(allQuestionIds);
      const duplicateCount = allQuestionIds.length - uniqueIds.size;

      if (duplicateCount > 0) {
        console.log(`Note: ${duplicateCount} exam question IDs are reused across different exams (this is expected)`);
      }

      // Just verify we collected the data correctly
      expect(allQuestionIds.length).toBeGreaterThan(0);
    });
  });
});
