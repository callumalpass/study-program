/**
 * Tests for fill_blank to multiple_choice conversion fixes
 *
 * Validates that ambiguous fill_blank questions have been converted to
 * multiple_choice format to improve answer clarity and user experience.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
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

interface ExamQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  questions: ExamQuestion[];
}

function loadQuizFile(subjectId: string, topicNum: number): Quiz[] {
  const filePath = join(SUBJECTS_DIR, subjectId, 'content', `topic-${topicNum}`, 'quizzes.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function loadExamFile(subjectId: string): Exam[] {
  const filePath = join(SUBJECTS_DIR, subjectId, 'exams.json');
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

describe('CS104 Exam mid-q5 Fix - Tortoise and Hare Algorithm', () => {
  const exams = loadExamFile('cs104');
  const midterm = exams.find(e => e.id === 'cs104-exam-midterm');
  const question = midterm?.questions.find(q => q.id === 'mid-q5');

  it('should exist', () => {
    expect(question).toBeDefined();
  });

  it('should be a multiple_choice question (converted from fill_blank)', () => {
    // Previously was fill_blank with two blanks "____ and ____" which was confusing
    expect(question?.type).toBe('multiple_choice');
  });

  it('should have exactly 4 options', () => {
    expect(question?.options).toHaveLength(4);
  });

  it('should have the correct answer pointing to "Tortoise and hare algorithm"', () => {
    expect(typeof question?.correctAnswer).toBe('number');
    const correctIndex = question?.correctAnswer as number;
    expect(question?.options?.[correctIndex]?.toLowerCase()).toContain('tortoise');
    expect(question?.options?.[correctIndex]?.toLowerCase()).toContain('hare');
  });

  it('should include plausible distractor options', () => {
    const optionTexts = question?.options?.join(' ').toLowerCase() ?? '';
    // Should include other well-known algorithms as distractors
    expect(optionTexts).toContain('binary search');
    expect(optionTexts).toContain('sliding window');
    expect(optionTexts).toContain('divide and conquer');
  });

  it('should have explanation mentioning Floyd', () => {
    // The algorithm is also known as Floyd's cycle detection
    expect(question?.explanation.toLowerCase()).toContain('floyd');
  });

  it('should mention slow and fast pointers in prompt', () => {
    expect(question?.prompt.toLowerCase()).toContain('slow');
    expect(question?.prompt.toLowerCase()).toContain('fast');
  });

  it('should have valid correctAnswer index within options bounds', () => {
    const correctIndex = question?.correctAnswer as number;
    const optionsLength = question?.options?.length ?? 0;
    expect(correctIndex).toBeGreaterThanOrEqual(0);
    expect(correctIndex).toBeLessThan(optionsLength);
  });
});

describe('CS201 Quiz 1-3 q5 Fix - Master Theorem Complexity', () => {
  const quizzes = loadQuizFile('cs201', 1);
  const quiz = quizzes.find(q => q.id === 'cs201-quiz-1-3');
  const question = quiz?.questions.find(q => q.id === 'q5');

  it('should exist', () => {
    expect(question).toBeDefined();
  });

  it('should be a multiple_choice question (converted from fill_blank)', () => {
    // Previously was fill_blank expecting "n log n" which had format ambiguity
    // (could be "n*log(n)", "nlogn", "O(n log n)", etc.)
    expect(question?.type).toBe('multiple_choice');
  });

  it('should have exactly 4 options', () => {
    expect(question?.options).toHaveLength(4);
  });

  it('should have the correct answer pointing to O(n log n)', () => {
    expect(typeof question?.correctAnswer).toBe('number');
    const correctIndex = question?.correctAnswer as number;
    const correctOption = question?.options?.[correctIndex]?.toLowerCase() ?? '';
    expect(correctOption).toContain('n log n');
  });

  it('should include plausible complexity options as distractors', () => {
    const optionTexts = question?.options?.join(' ').toLowerCase() ?? '';
    // Should include other common complexities
    expect(optionTexts).toContain('o(n)');
    expect(optionTexts).toContain('o(log n)');
  });

  it('should mention Master Theorem in prompt', () => {
    expect(question?.prompt).toContain('Master Theorem');
  });

  it('should include the recurrence relation T(n) = 2T(n/2) + O(n)', () => {
    expect(question?.prompt).toContain('T(n) = 2T(n/2)');
  });

  it('should have explanation mentioning Master Theorem or Merge Sort', () => {
    const explanation = question?.explanation.toLowerCase() ?? '';
    expect(
      explanation.includes('master theorem') || explanation.includes('merge sort')
    ).toBe(true);
  });

  it('should have valid correctAnswer index within options bounds', () => {
    const correctIndex = question?.correctAnswer as number;
    const optionsLength = question?.options?.length ?? 0;
    expect(correctIndex).toBeGreaterThanOrEqual(0);
    expect(correctIndex).toBeLessThan(optionsLength);
  });
});

describe('Fill Blank Conversion Quality Checks', () => {
  it('cs104 mid-q5 should not have multiple blank indicators anymore', () => {
    const exams = loadExamFile('cs104');
    const midterm = exams.find(e => e.id === 'cs104-exam-midterm');
    const question = midterm?.questions.find(q => q.id === 'mid-q5');

    // The old prompt had "____ and ____" which was confusing
    // Now it should be a multiple choice without blanks
    expect(question?.prompt).not.toContain('____');
  });

  it('cs201 quiz-1-3 q5 should not have blank indicators anymore', () => {
    const quizzes = loadQuizFile('cs201', 1);
    const quiz = quizzes.find(q => q.id === 'cs201-quiz-1-3');
    const question = quiz?.questions.find(q => q.id === 'q5');

    // The old prompt had "O(_______)" which required specific formatting
    // Now it should be a multiple choice without blanks
    expect(question?.prompt).not.toContain('____');
  });

  it('converted questions should have no duplicate options', () => {
    // Check cs104 mid-q5
    const exams = loadExamFile('cs104');
    const midterm = exams.find(e => e.id === 'cs104-exam-midterm');
    const q1 = midterm?.questions.find(q => q.id === 'mid-q5');

    const options1 = q1?.options ?? [];
    const uniqueOptions1 = new Set(options1.map(o => o.toLowerCase().trim()));
    expect(uniqueOptions1.size).toBe(options1.length);

    // Check cs201 quiz-1-3 q5
    const quizzes = loadQuizFile('cs201', 1);
    const quiz = quizzes.find(q => q.id === 'cs201-quiz-1-3');
    const q2 = quiz?.questions.find(q => q.id === 'q5');

    const options2 = q2?.options ?? [];
    const uniqueOptions2 = new Set(options2.map(o => o.toLowerCase().trim()));
    expect(uniqueOptions2.size).toBe(options2.length);
  });
});
