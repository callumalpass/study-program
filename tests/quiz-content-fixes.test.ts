/**
 * Tests for quiz content fixes
 *
 * Validates specific quiz questions that were identified as having ambiguous
 * prompts or answer formats, and ensures the fixes are correct.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
}

function loadQuizFile(subjectId: string, topicNum: number): Quiz[] {
  const filePath = join(SUBJECTS_DIR, subjectId, 'content', `topic-${topicNum}`, 'quizzes.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

describe('CS102 Topic 3 Quiz Fixes', () => {
  const quizzes = loadQuizFile('cs102', 3);

  describe('cs102-q3-b-2 Little Endian question', () => {
    const quiz = quizzes.find(q => q.id === 'cs102-quiz-3-b');
    const question = quiz?.questions.find(q => q.id === 'cs102-q3-b-2');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should be a fill_blank question', () => {
      expect(question?.type).toBe('fill_blank');
    });

    it('should have a clear prompt with explicit blank indicator', () => {
      expect(question?.prompt).toContain('____');
    });

    it('should show the first three bytes explicitly', () => {
      // The prompt should show 78 56 34 to avoid ambiguity
      expect(question?.prompt).toContain('78 56 34');
    });

    it('should mention MSB or most significant byte', () => {
      // The prompt should clarify what byte to fill
      expect(question?.prompt.toLowerCase()).toContain('most significant');
    });

    it('should have correct answer "12"', () => {
      expect(question?.correctAnswer).toBe('12');
    });

    it('should have explanation mentioning Little Endian byte order', () => {
      expect(question?.explanation.toLowerCase()).toContain('little endian');
    });
  });
});

describe('CS104 Topic 7 Quiz Fixes', () => {
  const quizzes = loadQuizFile('cs104', 7);

  describe('cs104-q7a-2 Heap child index question', () => {
    const quiz = quizzes.find(q => q.id === 'cs104-quiz-7a');
    const question = quiz?.questions.find(q => q.id === 'cs104-q7a-2');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should be a multiple_choice question (not fill_blank to avoid format ambiguity)', () => {
      expect(question?.type).toBe('multiple_choice');
    });

    it('should have exactly 4 options', () => {
      expect(question?.options).toHaveLength(4);
    });

    it('should mention 0-indexed in the prompt', () => {
      // Important to clarify if array is 0-indexed or 1-indexed
      expect(question?.prompt).toContain('0-indexed');
    });

    it('should have correct answer pointing to "2i + 1"', () => {
      expect(question?.correctAnswer).toBe(1);
      expect(question?.options?.[1]).toContain('2i + 1');
    });

    it('should include plausible distractor options', () => {
      // Options should include common misconceptions
      const optionTexts = question?.options?.join(' ') ?? '';
      expect(optionTexts).toContain('2i'); // For 1-indexed confusion
      expect(optionTexts).toContain('2i + 2'); // Right child formula
      expect(optionTexts).toContain('(i - 1)'); // Parent formula
    });
  });
});

describe('Fill Blank Questions with Clear Indicators', () => {
  function findQuizFiles(dir: string): string[] {
    const files: string[] = [];
    try {
      const subjects = readdirSync(dir);
      for (const subject of subjects) {
        const subjectPath = join(dir, subject);
        const contentPath = join(subjectPath, 'content');
        try {
          const topics = readdirSync(contentPath);
          for (const topic of topics) {
            const quizPath = join(contentPath, topic, 'quizzes.json');
            try {
              readFileSync(quizPath);
              files.push(quizPath);
            } catch {
              // No quizzes.json in this topic
            }
          }
        } catch {
          // No content directory
        }
      }
    } catch {
      // Can't read subjects directory
    }
    return files;
  }

  const quizFiles = findQuizFiles(SUBJECTS_DIR);

  it('should have quiz files to validate', () => {
    expect(quizFiles.length).toBeGreaterThan(0);
  });

  it('cs102-q3-b-2 should have blank indicator', () => {
    // Specifically verify the fixed question
    const cs102Quizzes = loadQuizFile('cs102', 3);
    const question = cs102Quizzes
      .flatMap(q => q.questions)
      .find(q => q.id === 'cs102-q3-b-2');

    expect(question).toBeDefined();
    expect(question?.prompt).toContain('____');
  });
});

describe('Multiple Choice Question Validity', () => {
  it('cs104-q7a-2 should have valid option indices', () => {
    const quizzes = loadQuizFile('cs104', 7);
    const question = quizzes
      .flatMap(q => q.questions)
      .find(q => q.id === 'cs104-q7a-2');

    expect(question).toBeDefined();
    expect(question?.type).toBe('multiple_choice');
    expect(typeof question?.correctAnswer).toBe('number');

    const correctIndex = question?.correctAnswer as number;
    const optionsLength = question?.options?.length ?? 0;

    expect(correctIndex).toBeGreaterThanOrEqual(0);
    expect(correctIndex).toBeLessThan(optionsLength);
  });

  it('should have no duplicate options in cs104-q7a-2', () => {
    const quizzes = loadQuizFile('cs104', 7);
    const question = quizzes
      .flatMap(q => q.questions)
      .find(q => q.id === 'cs104-q7a-2');

    const options = question?.options ?? [];
    const uniqueOptions = new Set(options.map(o => o.toLowerCase().trim()));

    expect(uniqueOptions.size).toBe(options.length);
  });
});
