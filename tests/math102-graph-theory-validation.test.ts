/**
 * Math102 (Discrete Mathematics II) Graph Theory Quiz Validation Tests
 *
 * Tests to ensure graph theory quiz content is mathematically correct.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
}

// Load Math102 topic-3 quizzes (graph theory)
function loadGraphTheoryQuizzes(): Quiz[] {
  const quizPath = path.join(__dirname, '../src/subjects/math102/content/topic-3/quizzes.json');
  const content = fs.readFileSync(quizPath, 'utf-8');
  return JSON.parse(content) as Quiz[];
}

describe('Math102 Graph Theory Quiz Validation', () => {
  let quizzes: Quiz[];
  let questions: QuizQuestion[];

  beforeAll(() => {
    quizzes = loadGraphTheoryQuizzes();
    questions = quizzes.flatMap(q => q.questions);
  });

  describe('Complete Graph Formulas', () => {
    it('complete graph edge count formula should be correct', () => {
      const edgeQuestion = questions.find(q =>
        q.id === 'math102-q3-1' &&
        q.prompt.includes('K₆') &&
        q.prompt.includes('edges')
      );

      expect(edgeQuestion).toBeDefined();
      if (edgeQuestion && edgeQuestion.type === 'multiple_choice') {
        const correctIdx = edgeQuestion.correctAnswer as number;
        const correctAnswer = edgeQuestion.options![correctIdx];
        // K_6 has 6*5/2 = 15 edges
        expect(correctAnswer).toBe('15');
      }
    });

    it('chromatic number of K_n should be n', () => {
      const chromaticQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('chromatic number') &&
        q.prompt.includes('K_n')
      );

      expect(chromaticQuestion).toBeDefined();
      if (chromaticQuestion && chromaticQuestion.type === 'multiple_choice') {
        const correctIdx = chromaticQuestion.correctAnswer as number;
        const correctAnswer = chromaticQuestion.options![correctIdx];
        expect(correctAnswer).toBe('n');
      }
    });
  });

  describe('Cayley Formula', () => {
    it('should have a question about spanning trees using Cayley formula', () => {
      const cayleyQuestion = questions.find(q =>
        q.explanation.toLowerCase().includes('cayley')
      );
      expect(cayleyQuestion).toBeDefined();
    });

    it('Cayley formula K_4 spanning trees should be 16', () => {
      const spanningTreeQuestion = questions.find(q =>
        q.id === 'math102-q3c-4' &&
        q.prompt.includes('K_4') &&
        q.prompt.toLowerCase().includes('spanning tree')
      );

      expect(spanningTreeQuestion).toBeDefined();
      if (spanningTreeQuestion) {
        // Cayley's formula: n^(n-2) spanning trees
        // K_4: 4^(4-2) = 4^2 = 16
        expect(spanningTreeQuestion.correctAnswer).toBe('16');
      }
    });

    it('Cayley formula explanation should show proper formula application', () => {
      const cayleyQuestion = questions.find(q =>
        q.id === 'math102-q3c-4'
      );

      expect(cayleyQuestion).toBeDefined();
      if (cayleyQuestion) {
        // Explanation should show n^(n-2) formula clearly
        expect(cayleyQuestion.explanation).toMatch(/n\^\(n-2\)|n\^{n-2}/);
        // For K_4, should show 4^(4-2) = 4^2 = 16
        expect(cayleyQuestion.explanation).toMatch(/4\^\(4-2\)|4\^2/);
      }
    });
  });

  describe('Tree Properties', () => {
    it('tree edge count should be n-1', () => {
      const treeQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('tree') &&
        q.prompt.toLowerCase().includes('edges') &&
        q.type === 'fill_blank'
      );

      expect(treeQuestion).toBeDefined();
      if (treeQuestion) {
        expect(treeQuestion.correctAnswer).toBe('n-1');
      }
    });

    it('minimum connected graph edges should be n-1', () => {
      const connectedQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('minimum') &&
        q.prompt.toLowerCase().includes('connected') &&
        q.prompt.includes('10 vertices')
      );

      expect(connectedQuestion).toBeDefined();
      if (connectedQuestion && connectedQuestion.type === 'multiple_choice') {
        const correctIdx = connectedQuestion.correctAnswer as number;
        const correctAnswer = connectedQuestion.options![correctIdx];
        // 10 vertices need at least 9 edges
        expect(correctAnswer).toBe('9');
      }
    });
  });

  describe('Bipartite Graphs', () => {
    it('bipartite graph characterization should mention odd cycles', () => {
      const bipartiteQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('bipartite')
      );

      expect(bipartiteQuestion).toBeDefined();
      if (bipartiteQuestion && bipartiteQuestion.type === 'multiple_choice') {
        const correctIdx = bipartiteQuestion.correctAnswer as number;
        const correctAnswer = bipartiteQuestion.options![correctIdx];
        expect(correctAnswer.toLowerCase()).toContain('odd');
      }
    });

    it('complete bipartite graph K_3,4 should have 12 edges', () => {
      const bipartiteEdgeQuestion = questions.find(q =>
        q.prompt.includes('K_{3,4}') &&
        q.prompt.toLowerCase().includes('edges')
      );

      expect(bipartiteEdgeQuestion).toBeDefined();
      if (bipartiteEdgeQuestion) {
        // K_{m,n} has m*n edges: 3*4 = 12
        expect(bipartiteEdgeQuestion.correctAnswer).toBe('12');
      }
    });
  });

  describe('Eulerian and Hamiltonian Paths', () => {
    it('Eulerian circuit requires all even degrees', () => {
      const eulerianQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('eulerian circuit')
      );

      expect(eulerianQuestion).toBeDefined();
      if (eulerianQuestion && eulerianQuestion.type === 'multiple_choice') {
        const correctIdx = eulerianQuestion.correctAnswer as number;
        const correctAnswer = eulerianQuestion.options![correctIdx];
        expect(correctAnswer.toLowerCase()).toContain('even');
      }
    });

    it('Hamiltonian path existence is NP-complete', () => {
      const npQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('np-complete')
      );

      expect(npQuestion).toBeDefined();
      if (npQuestion && npQuestion.type === 'multiple_choice') {
        const correctIdx = npQuestion.correctAnswer as number;
        const correctAnswer = npQuestion.options![correctIdx];
        expect(correctAnswer.toLowerCase()).toContain('hamiltonian');
      }
    });
  });

  describe('Handshaking Lemma', () => {
    it('sum of degrees equals twice edges', () => {
      const handshakingQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('handshaking')
      );

      expect(handshakingQuestion).toBeDefined();
      if (handshakingQuestion && handshakingQuestion.type === 'true_false') {
        expect(handshakingQuestion.correctAnswer).toBe(true);
      }
    });

    it('impossible degree sequence should be detected', () => {
      const impossibleQuestion = questions.find(q =>
        q.prompt.includes('5 vertices') &&
        q.prompt.includes('degree 3') &&
        q.prompt.toLowerCase().includes('possible')
      );

      expect(impossibleQuestion).toBeDefined();
      if (impossibleQuestion) {
        // 5 vertices with degree 3 each: sum = 15 (odd), impossible
        expect(impossibleQuestion.correctAnswer).toBe('no');
      }
    });
  });

  describe('Planar Graphs', () => {
    it('planar graph edge bound should be 3n-6', () => {
      const planarQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('planar') &&
        q.prompt.toLowerCase().includes('edges')
      );

      expect(planarQuestion).toBeDefined();
      if (planarQuestion && planarQuestion.type === 'fill_blank') {
        expect(planarQuestion.correctAnswer).toBe('3n-6');
      }
    });
  });

  describe('Graph Isomorphism', () => {
    it('isomorphism requires more than just vertex/edge counts', () => {
      const isoQuestion = questions.find(q =>
        q.prompt.toLowerCase().includes('isomorphic')
      );

      expect(isoQuestion).toBeDefined();
      if (isoQuestion && isoQuestion.type === 'true_false') {
        // Having same vertex and edge counts is NOT sufficient for isomorphism
        expect(isoQuestion.correctAnswer).toBe(false);
      }
    });
  });
});
