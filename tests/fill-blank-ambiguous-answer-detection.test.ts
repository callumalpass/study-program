/**
 * Fill Blank Ambiguous Answer Detection Tests
 *
 * These tests detect fill_blank questions where the explanation suggests
 * multiple valid answers (e.g., "Procedure/Function/Subroutine") but only
 * one answer is accepted. This helps identify questions that should either:
 * 1. Be converted to multiple choice
 * 2. Have the question made more specific
 * 3. Accept multiple correct answers
 *
 * This test was created after finding cs102-fin-20 which accepted only "Procedure"
 * but the explanation stated "Procedure/Function/Subroutine" were all valid.
 */

import { describe, expect, it } from 'vitest';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  questions: QuizQuestion[];
}

interface Exam {
  id: string;
  subjectId: string;
  questions: QuizQuestion[];
}

// Import all exam and quiz data
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });

// Get all fill_blank questions from exams
const examFillBlankQuestions: { source: string; question: QuizQuestion }[] = Object.values(examModules)
  .flatMap((module: unknown) => {
    const mod = module as { default?: Exam[] };
    return Array.isArray(mod.default) ? mod.default : [];
  })
  .flatMap(exam => exam.questions
    .filter(q => q.type === 'fill_blank')
    .map(q => ({ source: `${exam.id}/${q.id}`, question: q }))
  );

// Get all fill_blank questions from quizzes
const quizFillBlankQuestions: { source: string; question: QuizQuestion }[] = Object.values(quizModules)
  .flatMap((module: unknown) => {
    const mod = module as { default?: Quiz[] };
    return Array.isArray(mod.default) ? mod.default : [];
  })
  .flatMap(quiz => quiz.questions
    .filter(q => q.type === 'fill_blank')
    .map(q => ({ source: `${quiz.id}/${q.id}`, question: q }))
  );

/**
 * Detects if an explanation suggests multiple valid answers.
 * Common patterns include:
 * - "answer1/answer2/answer3" (slash-separated alternatives)
 * - "answer1 or answer2" (or-separated alternatives)
 * - "answer1, answer2, or answer3" (comma-separated with or)
 */
function detectAmbiguousExplanation(explanation: string | undefined, correctAnswer: string): {
  isAmbiguous: boolean;
  alternatives: string[];
  reason?: string;
} {
  if (!explanation) {
    return { isAmbiguous: false, alternatives: [] };
  }

  const normalizedAnswer = String(correctAnswer).toLowerCase().trim();
  const normalizedExplanation = explanation.toLowerCase();

  // Pattern 1: Slash-separated alternatives at the start of explanation
  // e.g., "Procedure/Function/Subroutine." or "True/False."
  const slashPattern = /^([a-z]+(?:\/[a-z]+)+)\.?$/i;
  const slashMatch = explanation.match(slashPattern);
  if (slashMatch) {
    const alternatives = slashMatch[1].split('/').map(s => s.toLowerCase().trim());
    if (alternatives.length > 1 && alternatives.includes(normalizedAnswer)) {
      // Check if other alternatives are NOT the correct answer
      const otherAlternatives = alternatives.filter(a => a !== normalizedAnswer);
      if (otherAlternatives.length > 0) {
        return {
          isAmbiguous: true,
          alternatives,
          reason: `Explanation "${explanation}" suggests alternatives: ${alternatives.join(', ')}`
        };
      }
    }
  }

  // Pattern 2: "X or Y" in explanation where both could be valid
  // Be careful to avoid false positives like "X is used for Y or Z operations"
  const orPattern = /\b([a-z]+)\s+or\s+([a-z]+)\b/gi;
  const orMatches = [...explanation.matchAll(orPattern)];
  for (const match of orMatches) {
    const alt1 = match[1].toLowerCase();
    const alt2 = match[2].toLowerCase();
    if (alt1 === normalizedAnswer || alt2 === normalizedAnswer) {
      // Only flag if the context suggests these are equivalent alternatives
      // Check if the match appears near the start of the explanation
      if (match.index !== undefined && match.index < 30) {
        const alternatives = [alt1, alt2];
        return {
          isAmbiguous: true,
          alternatives,
          reason: `Explanation contains "or" suggesting alternatives: ${alt1}, ${alt2}`
        };
      }
    }
  }

  return { isAmbiguous: false, alternatives: [] };
}

describe('Fill Blank Ambiguous Answer Detection', () => {
  describe('Detection function', () => {
    it('detects slash-separated alternatives', () => {
      const result = detectAmbiguousExplanation('Procedure/Function/Subroutine.', 'Procedure');
      expect(result.isAmbiguous).toBe(true);
      expect(result.alternatives).toContain('procedure');
      expect(result.alternatives).toContain('function');
      expect(result.alternatives).toContain('subroutine');
    });

    it('does not flag non-ambiguous explanations', () => {
      const result = detectAmbiguousExplanation(
        'The RET instruction returns from a procedure call.',
        'procedure'
      );
      expect(result.isAmbiguous).toBe(false);
    });

    it('does not flag when answer is the only alternative', () => {
      const result = detectAmbiguousExplanation('Procedure.', 'Procedure');
      expect(result.isAmbiguous).toBe(false);
    });

    it('handles undefined explanation', () => {
      const result = detectAmbiguousExplanation(undefined, 'answer');
      expect(result.isAmbiguous).toBe(false);
    });

    it('handles empty explanation', () => {
      const result = detectAmbiguousExplanation('', 'answer');
      expect(result.isAmbiguous).toBe(false);
    });
  });

  describe('Exam fill_blank questions', () => {
    it('should have fill_blank questions to validate', () => {
      expect(examFillBlankQuestions.length).toBeGreaterThan(0);
    });

    it('should not have ambiguous answers (slash-separated alternatives in explanation)', () => {
      const ambiguousQuestions: { source: string; reason: string }[] = [];

      for (const { source, question } of examFillBlankQuestions) {
        const result = detectAmbiguousExplanation(
          question.explanation,
          String(question.correctAnswer)
        );
        if (result.isAmbiguous) {
          ambiguousQuestions.push({ source, reason: result.reason ?? 'Unknown' });
        }
      }

      if (ambiguousQuestions.length > 0) {
        console.log('\nAmbiguous fill_blank questions found:');
        ambiguousQuestions.forEach(({ source, reason }) => {
          console.log(`  ${source}: ${reason}`);
        });
      }

      expect(
        ambiguousQuestions,
        `Found ${ambiguousQuestions.length} potentially ambiguous fill_blank questions:\n` +
        ambiguousQuestions.map(q => `  ${q.source}: ${q.reason}`).join('\n')
      ).toHaveLength(0);
    });
  });

  describe('Quiz fill_blank questions', () => {
    it('should have fill_blank questions to validate', () => {
      expect(quizFillBlankQuestions.length).toBeGreaterThan(0);
    });

    it('should not have ambiguous answers (slash-separated alternatives in explanation)', () => {
      const ambiguousQuestions: { source: string; reason: string }[] = [];

      for (const { source, question } of quizFillBlankQuestions) {
        const result = detectAmbiguousExplanation(
          question.explanation,
          String(question.correctAnswer)
        );
        if (result.isAmbiguous) {
          ambiguousQuestions.push({ source, reason: result.reason ?? 'Unknown' });
        }
      }

      if (ambiguousQuestions.length > 0) {
        console.log('\nAmbiguous fill_blank questions found in quizzes:');
        ambiguousQuestions.forEach(({ source, reason }) => {
          console.log(`  ${source}: ${reason}`);
        });
      }

      expect(
        ambiguousQuestions,
        `Found ${ambiguousQuestions.length} potentially ambiguous fill_blank questions:\n` +
        ambiguousQuestions.map(q => `  ${q.source}: ${q.reason}`).join('\n')
      ).toHaveLength(0);
    });
  });

  describe('Statistics', () => {
    it('reports fill_blank question counts', () => {
      console.log(`\nFill_blank statistics:`);
      console.log(`  Exam fill_blank questions: ${examFillBlankQuestions.length}`);
      console.log(`  Quiz fill_blank questions: ${quizFillBlankQuestions.length}`);
      console.log(`  Total: ${examFillBlankQuestions.length + quizFillBlankQuestions.length}`);

      expect(examFillBlankQuestions.length + quizFillBlankQuestions.length).toBeGreaterThan(0);
    });
  });
});

describe('Regression Tests', () => {
  describe('cs102-fin-20 regression', () => {
    it('cs102-fin-20 should no longer be a fill_blank with ambiguous answer', () => {
      // This test ensures the fix for cs102-fin-20 is maintained
      // The question was changed from fill_blank to multiple_choice
      const cs102Exams = Object.values(examModules)
        .flatMap((module: unknown) => {
          const mod = module as { default?: Exam[] };
          return Array.isArray(mod.default) ? mod.default : [];
        })
        .filter(exam => exam.subjectId === 'cs102');

      const question = cs102Exams
        .flatMap(exam => exam.questions)
        .find(q => q.id === 'cs102-fin-20');

      expect(question).toBeDefined();
      // After the fix, this should be multiple_choice, not fill_blank
      expect(question?.type).toBe('multiple_choice');
    });
  });
});
