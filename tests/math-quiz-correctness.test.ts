/**
 * Math Quiz Mathematical Correctness Tests
 *
 * Tests to validate the mathematical correctness of answers in math quizzes.
 * These tests verify specific mathematical facts to catch content errors.
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion } from '../src/core/types';

// Load all math quizzes for validation
const mathTopicQuizModules = import.meta.glob(
  '../src/subjects/math*/content/topic-*/quizzes.json',
  { eager: true }
);

const mathQuizzes: Array<{
  id: string;
  questions: QuizQuestion[];
}> = Object.values(mathTopicQuizModules).flatMap(
  (module: unknown) => (module as { default: Array<{ id: string; questions: QuizQuestion[] }> }).default
);

// Helper to find a question by ID
function findQuestion(id: string): QuizQuestion | undefined {
  return mathQuizzes.flatMap(q => q.questions).find(q => q.id === id);
}

// Helper to get the correct answer text for a multiple choice question
function getCorrectAnswerText(question: QuizQuestion): string | undefined {
  if (question.type !== 'multiple_choice' || !question.options) return undefined;
  const index = typeof question.correctAnswer === 'number'
    ? question.correctAnswer
    : question.options.indexOf(question.correctAnswer as string);
  return index >= 0 && index < question.options.length ? question.options[index] : undefined;
}

describe('Math Quiz Mathematical Correctness', () => {
  describe('Permutation Group Questions (Math304)', () => {
    it('math304-q35: disjoint cycles are defined by having no common elements', () => {
      const question = findQuestion('math304-q35');
      expect(question).toBeDefined();

      if (question) {
        // The definition of disjoint cycles is that they share no elements
        // "They commute" is a consequence, not the definition
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('They have no common elements');
        expect(question.correctAnswer).toBe(0);
      }
    });

    it('math304-q32: order of S₅ is 5! = 120', () => {
      const question = findQuestion('math304-q32');
      expect(question).toBeDefined();

      if (question) {
        // |Sₙ| = n!
        // |S₅| = 5! = 120
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('120');
      }
    });

    it('math304-q34: order of (1 2 3)(4 5) is lcm(3,2) = 6', () => {
      const question = findQuestion('math304-q34');
      expect(question).toBeDefined();

      if (question) {
        // Order of disjoint cycles product is lcm of cycle lengths
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('6');
      }
    });

    it('math304-q37: 5-cycle (1 2 3 4 5) is even', () => {
      const question = findQuestion('math304-q37');
      expect(question).toBeDefined();

      if (question) {
        // An n-cycle is even iff n is odd
        // 5-cycle = 4 transpositions = even
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('Even');
      }
    });

    it('math304-q39: |A₄| = 4!/2 = 12', () => {
      const question = findQuestion('math304-q39');
      expect(question).toBeDefined();

      if (question) {
        // |Aₙ| = n!/2
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('12');
      }
    });

    it('math304-q42: |D₄| = 2*4 = 8', () => {
      const question = findQuestion('math304-q42');
      expect(question).toBeDefined();

      if (question) {
        // |Dₙ| = 2n
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('8');
      }
    });
  });

  describe('Cyclic Group Questions (Math304)', () => {
    it('math304-q18: φ(12) = 4 generators for Z₁₂', () => {
      const question = findQuestion('math304-q18');
      expect(question).toBeDefined();

      if (question) {
        // φ(12) = 12(1-1/2)(1-1/3) = 12 * 1/2 * 2/3 = 4
        // Generators are 1, 5, 7, 11
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('4');
      }
    });

    it('math304-q28: order of (1,1) in Z₄ × Z₆ is lcm(4,6) = 12', () => {
      const question = findQuestion('math304-q28');
      expect(question).toBeDefined();

      if (question) {
        // |(a,b)| = lcm(|a|, |b|)
        // In Z₄, |1| = 4; in Z₆, |1| = 6
        // lcm(4,6) = 12
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('12');
      }
    });

    it('math304-q29: Z₂ × Z₂ has 3 elements of order 2', () => {
      const question = findQuestion('math304-q29');
      expect(question).toBeDefined();

      if (question) {
        // Z₂ × Z₂ = {(0,0), (0,1), (1,0), (1,1)}
        // Order 2 elements: (0,1), (1,0), (1,1) - three total
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('3');
      }
    });

    it('math304-q30: |U(20)| = φ(20) = 8', () => {
      const question = findQuestion('math304-q30');
      expect(question).toBeDefined();

      if (question) {
        // φ(20) = φ(4)φ(5) = 2 * 4 = 8
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('8');
      }
    });
  });

  describe('Direct Product Cyclicity (Math304)', () => {
    it('math304-q26: Z₂ × Z₃ ≅ Z₆ (coprime orders)', () => {
      const question = findQuestion('math304-q26');
      expect(question).toBeDefined();

      if (question) {
        // gcd(2,3) = 1, so Z₂ × Z₃ ≅ Z₆
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toBe('Z₆');
      }
    });

    it('math304-q27: Z₄ × Z₆ is not cyclic (gcd(4,6) ≠ 1)', () => {
      const question = findQuestion('math304-q27');
      expect(question).toBeDefined();

      if (question) {
        // gcd(4,6) = 2 ≠ 1, so not cyclic
        const correctText = getCorrectAnswerText(question);
        expect(correctText?.toLowerCase()).toContain('no');
      }
    });
  });

  describe('Subgroup Questions (Math304)', () => {
    it('math304-q25: unique subgroup of order 4 in Z₂₀ is ⟨5⟩', () => {
      const question = findQuestion('math304-q25');
      expect(question).toBeDefined();

      if (question) {
        // In Z_n, the unique subgroup of order d is ⟨n/d⟩
        // Order 4 in Z₂₀: generator is 20/4 = 5
        const correctText = getCorrectAnswerText(question);
        expect(correctText).toContain('⟨5⟩');
      }
    });
  });

  describe('Question Answer Index Validity', () => {
    it('all multiple choice questions have valid correctAnswer indices', () => {
      const mcQuestions = mathQuizzes
        .flatMap(q => q.questions)
        .filter(q => q.type === 'multiple_choice');

      mcQuestions.forEach(question => {
        const answer = question.correctAnswer;
        const options = question.options || [];

        if (typeof answer === 'number') {
          expect(answer, `Question ${question.id} has out-of-bounds correctAnswer ${answer}`)
            .toBeGreaterThanOrEqual(0);
          expect(answer, `Question ${question.id} has correctAnswer ${answer} but only ${options.length} options`)
            .toBeLessThan(options.length);
        } else if (typeof answer === 'string') {
          expect(options, `Question ${question.id} has string answer but options not found`)
            .toContain(answer);
        }
      });
    });

    it('all true_false questions have boolean correctAnswer', () => {
      const tfQuestions = mathQuizzes
        .flatMap(q => q.questions)
        .filter(q => q.type === 'true_false');

      tfQuestions.forEach(question => {
        expect(typeof question.correctAnswer, `Question ${question.id} should have boolean correctAnswer`)
          .toBe('boolean');
      });
    });
  });

  describe('Mathematical Notation Consistency', () => {
    it('questions about Zₙ should use consistent subscript notation', () => {
      const zNotationQuestions = mathQuizzes
        .flatMap(q => q.questions)
        .filter(q => q.prompt.includes('Z₁') || q.prompt.includes('Z₂') || q.prompt.includes('Z₃'));

      // Just verify we have questions using this notation
      expect(zNotationQuestions.length).toBeGreaterThan(0);

      // Check that all options in these questions use consistent notation
      zNotationQuestions.forEach(question => {
        if (question.options) {
          question.options.forEach(option => {
            // If option mentions Z with a number, it should use subscript
            if (option.match(/Z\d/)) {
              // This would catch Z2 instead of Z₂
              expect(option, `Question ${question.id} has inconsistent notation: ${option}`)
                .not.toMatch(/Z\d(?![₀-₉])/);
            }
          });
        }
      });
    });
  });
});

describe('Exam Mathematical Correctness', () => {
  // Load math exams
  const mathExamModules = import.meta.glob(
    '../src/subjects/math*/exams.json',
    { eager: true }
  );

  const mathExams: Array<{
    id: string;
    questions: QuizQuestion[];
  }> = Object.values(mathExamModules).flatMap(
    (module: unknown) => (module as { default: Array<{ id: string; questions: QuizQuestion[] }> }).default
  );

  function findExamQuestion(id: string): QuizQuestion | undefined {
    return mathExams.flatMap(e => e.questions).find(q => q.id === id);
  }

  describe('Math304 Midterm', () => {
    it('math304-mid-q8: order of 10 in Z₁₅ is 3', () => {
      const question = findExamQuestion('math304-mid-q8');
      expect(question).toBeDefined();

      if (question) {
        // |10| in Z₁₅ = 15/gcd(10,15) = 15/5 = 3
        // Verify: 10*1=10, 10*2=20≡5, 10*3=30≡0
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('3');
      }
    });

    it('math304-mid-q13: order of ⟨12⟩ in Z₃₀ is 30/gcd(12,30) = 5', () => {
      const question = findExamQuestion('math304-mid-q13');
      expect(question).toBeDefined();

      if (question) {
        // |⟨k⟩| = n/gcd(k,n)
        // |⟨12⟩| in Z₃₀ = 30/gcd(12,30) = 30/6 = 5
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('5');
      }
    });

    it('math304-mid-q15: cyclic group of order 60 has 12 subgroups', () => {
      const question = findExamQuestion('math304-mid-q15');
      expect(question).toBeDefined();

      if (question) {
        // Number of subgroups = number of divisors of 60
        // 60 = 2² × 3 × 5
        // τ(60) = (2+1)(1+1)(1+1) = 12
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('12');
      }
    });

    it('math304-mid-q18: number of 3-cycles in S₄ is 8', () => {
      const question = findExamQuestion('math304-mid-q18');
      expect(question).toBeDefined();

      if (question) {
        // Number of 3-cycles in Sₙ = C(n,3) × 2 = (n choose 3) × 2!
        // In S₄: C(4,3) × 2 = 4 × 2 = 8
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('8');
      }
    });
  });

  describe('Math304 Final', () => {
    it('math304-final-q6: order of 8 in Z₂₀ is 5', () => {
      const question = findExamQuestion('math304-final-q6');
      expect(question).toBeDefined();

      if (question) {
        // |8| in Z₂₀ = 20/gcd(8,20) = 20/4 = 5
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('5');
      }
    });

    it('math304-final-q11: order of (4,6) in Z₈ × Z₉ is lcm(2,3) = 6', () => {
      const question = findExamQuestion('math304-final-q11');
      expect(question).toBeDefined();

      if (question) {
        // In Z₈: |4| = 8/gcd(4,8) = 8/4 = 2
        // In Z₉: |6| = 9/gcd(6,9) = 9/3 = 3
        // |(4,6)| = lcm(2,3) = 6
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('6');
      }
    });

    it('math304-final-q16: elements of order 2 in S₄ is 9', () => {
      const question = findExamQuestion('math304-final-q16');
      expect(question).toBeDefined();

      if (question) {
        // Transpositions: C(4,2) = 6
        // Products of 2 disjoint transpositions: C(4,2)/2 = 3
        // Total: 6 + 3 = 9
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('9');
      }
    });

    it('math304-final-q21: |Z₁₈/⟨6⟩| = 18/|⟨6⟩| = 18/3 = 6', () => {
      const question = findExamQuestion('math304-final-q21');
      expect(question).toBeDefined();

      if (question) {
        // |⟨6⟩| in Z₁₈ = 18/gcd(6,18) = 18/6 = 3
        // |Z₁₈/⟨6⟩| = 18/3 = 6
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('6');
      }
    });

    it('math304-final-q40: φ(36) = 12', () => {
      const question = findExamQuestion('math304-final-q40');
      expect(question).toBeDefined();

      if (question) {
        // φ(36) = φ(4)φ(9) = 2 × 6 = 12
        // Or: 36(1-1/2)(1-1/3) = 36 × 1/2 × 2/3 = 12
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('12');
      }
    });

    it('math304-final-q42: RSA with n=55, e=3 gives d=27', () => {
      const question = findExamQuestion('math304-final-q42');
      expect(question).toBeDefined();

      if (question) {
        // n = 55 = 5 × 11
        // φ(55) = 4 × 10 = 40
        // ed ≡ 1 (mod 40)
        // 3d ≡ 1 (mod 40)
        // d = 27 (since 3 × 27 = 81 = 2 × 40 + 1)
        const correctText = question.options?.[question.correctAnswer as number];
        expect(correctText).toBe('27');
      }
    });
  });
});
