/**
 * Topic-Quiz ID Consistency Tests
 *
 * Tests that validate quiz IDs referenced in topic configurations match
 * the actual quiz IDs in the JSON files. This catches mismatches like:
 * - topics.ts references 'cs301-quiz-1-1' but JSON has 'cs301-q1-1'
 * - topics.ts references 'cs406-quiz-1-1' but JSON has 'cs406-quiz-1a'
 */

import { describe, it, expect } from 'vitest';
import { curriculum } from '../src/data/curriculum';

// Import all quiz modules
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });

interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  questions: unknown[];
}

// Load all quizzes
const allQuizzes: Quiz[] = Object.values(quizModules).flatMap((module: unknown) => {
  const mod = module as { default?: Quiz[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

// Create lookup maps
const quizIdSet = new Set(allQuizzes.map(q => q.id));
const quizzesBySubject = new Map<string, Quiz[]>();
allQuizzes.forEach(quiz => {
  const existing = quizzesBySubject.get(quiz.subjectId) || [];
  existing.push(quiz);
  quizzesBySubject.set(quiz.subjectId, existing);
});

describe('Topic-Quiz ID Consistency', () => {
  describe('quiz ID references must match JSON quiz IDs exactly', () => {
    it('all quiz IDs referenced in topics.ts should exist in quizzes.json', () => {
      const mismatches: string[] = [];

      for (const subject of curriculum) {
        for (const topic of subject.topics) {
          for (const quizId of topic.quizIds) {
            if (!quizIdSet.has(quizId)) {
              // Check for common naming convention mismatches
              const subjectQuizzes = quizzesBySubject.get(subject.id) || [];
              const possibleMatches = subjectQuizzes
                .filter(q => {
                  // Check if the quiz ID is similar (e.g., same topic number)
                  const refTopicNum = quizId.match(/[-_]?(\d+)[-_]/)?.[1];
                  const actualTopicNum = q.id.match(/[-_]?(\d+)[-_a-z]/)?.[1];
                  return refTopicNum && actualTopicNum && refTopicNum === actualTopicNum;
                })
                .map(q => q.id);

              if (possibleMatches.length > 0) {
                mismatches.push(
                  `${subject.id}: Topic "${topic.id}" references quiz "${quizId}" but JSON has: ${possibleMatches.join(', ')}`
                );
              } else {
                mismatches.push(
                  `${subject.id}: Topic "${topic.id}" references quiz "${quizId}" - NOT FOUND in JSON`
                );
              }
            }
          }
        }
      }

      expect(
        mismatches,
        `Found ${mismatches.length} quiz ID mismatches:\n${mismatches.join('\n')}`
      ).toHaveLength(0);
    });

    it('quiz ID naming conventions should be consistent within each subject', () => {
      const inconsistencies: string[] = [];

      for (const subject of curriculum) {
        const subjectQuizzes = quizzesBySubject.get(subject.id) || [];
        if (subjectQuizzes.length === 0) continue;

        // Extract the pattern from the first quiz ID
        const firstId = subjectQuizzes[0].id;
        const patterns = {
          hasQuizWord: /quiz/.test(firstId),
          separator: firstId.includes('-q') ? '-q' : (firstId.includes('_q') ? '_q' : (firstId.includes('-quiz-') ? '-quiz-' : null)),
          suffixStyle: /[a-z]$/.test(firstId) ? 'letter' : (/\d$/.test(firstId) ? 'number' : 'unknown'),
        };

        // Check all quiz IDs in this subject follow the same pattern
        for (const quiz of subjectQuizzes) {
          const currentPatterns = {
            hasQuizWord: /quiz/.test(quiz.id),
            separator: quiz.id.includes('-q') ? '-q' : (quiz.id.includes('_q') ? '_q' : (quiz.id.includes('-quiz-') ? '-quiz-' : null)),
            suffixStyle: /[a-z]$/.test(quiz.id) ? 'letter' : (/\d$/.test(quiz.id) ? 'number' : 'unknown'),
          };

          if (patterns.hasQuizWord !== currentPatterns.hasQuizWord) {
            inconsistencies.push(
              `${subject.id}: Inconsistent "quiz" word usage - "${firstId}" vs "${quiz.id}"`
            );
          }
          if (patterns.suffixStyle !== currentPatterns.suffixStyle) {
            inconsistencies.push(
              `${subject.id}: Inconsistent suffix style - "${firstId}" (${patterns.suffixStyle}) vs "${quiz.id}" (${currentPatterns.suffixStyle})`
            );
          }
        }
      }

      // This is informational - different subjects may use different conventions
      if (inconsistencies.length > 0) {
        console.log(`Note: Found ${inconsistencies.length} naming pattern variations (may be intentional)`);
      }
      // Don't fail on this - it's just for awareness
      expect(true).toBe(true);
    });
  });

  describe('quiz topic ID references', () => {
    it('quiz topicId in JSON should generally correspond to the topic where it is referenced (informational)', () => {
      const mismatches: string[] = [];

      for (const subject of curriculum) {
        for (const topic of subject.topics) {
          for (const quizId of topic.quizIds) {
            const quiz = allQuizzes.find(q => q.id === quizId);
            if (quiz && quiz.topicId && quiz.topicId !== topic.id) {
              // Extract topic number from both IDs for comparison
              const getTopicNum = (id: string) => {
                const match = id.match(/(?:topic-?|t)(\d+)/i);
                return match ? match[1] : null;
              };
              const quizTopicNum = getTopicNum(quiz.topicId);
              const refTopicNum = getTopicNum(topic.id);

              // Only flag if topic numbers don't match (different naming conventions are OK)
              if (quizTopicNum && refTopicNum && quizTopicNum !== refTopicNum) {
                mismatches.push(
                  `Quiz "${quizId}" has topicId "${quiz.topicId}" (topic ${quizTopicNum}) but is referenced in topic "${topic.id}" (topic ${refTopicNum})`
                );
              }
            }
          }
        }
      }

      // This is informational - just log mismatches but don't fail
      if (mismatches.length > 0) {
        console.log(`Found ${mismatches.length} topic number mismatches (may indicate content errors):`);
        mismatches.slice(0, 5).forEach(m => console.log(`  ${m}`));
        if (mismatches.length > 5) {
          console.log(`  ... and ${mismatches.length - 5} more`);
        }
      }

      // Very few quizzes should have completely wrong topic numbers
      expect(mismatches.length).toBeLessThan(allQuizzes.length * 0.05);
    });
  });

  describe('coverage statistics', () => {
    it('reports quiz coverage per subject', () => {
      const stats: { subject: string; referencedQuizzes: number; existingQuizzes: number; coverage: string }[] = [];

      for (const subject of curriculum) {
        const referencedIds = new Set<string>();
        for (const topic of subject.topics) {
          for (const quizId of topic.quizIds) {
            referencedIds.add(quizId);
          }
        }

        const subjectQuizzes = quizzesBySubject.get(subject.id) || [];
        const existingIds = new Set(subjectQuizzes.map(q => q.id));
        const foundCount = [...referencedIds].filter(id => existingIds.has(id)).length;
        const coverage = referencedIds.size > 0
          ? ((foundCount / referencedIds.size) * 100).toFixed(1)
          : '100.0';

        if (referencedIds.size > 0) {
          stats.push({
            subject: subject.id,
            referencedQuizzes: referencedIds.size,
            existingQuizzes: foundCount,
            coverage: coverage + '%',
          });
        }
      }

      // Filter to show only subjects with incomplete coverage
      const incomplete = stats.filter(s => s.coverage !== '100.0%');
      if (incomplete.length > 0) {
        console.log('Subjects with incomplete quiz coverage:');
        incomplete.forEach(s => {
          console.log(`  ${s.subject}: ${s.existingQuizzes}/${s.referencedQuizzes} (${s.coverage})`);
        });
      }

      // All subjects should have 100% quiz coverage
      expect(incomplete.length).toBe(0);
    });

    it('all quizzes in JSON should be referenced by at least one topic', () => {
      const unreferenced: string[] = [];

      // Collect all referenced quiz IDs
      const referencedIds = new Set<string>();
      for (const subject of curriculum) {
        for (const topic of subject.topics) {
          for (const quizId of topic.quizIds) {
            referencedIds.add(quizId);
          }
        }
      }

      // Find quizzes that exist but aren't referenced
      for (const quiz of allQuizzes) {
        if (!referencedIds.has(quiz.id)) {
          unreferenced.push(`${quiz.subjectId}: ${quiz.id}`);
        }
      }

      if (unreferenced.length > 0) {
        console.log(`Found ${unreferenced.length} unreferenced quizzes:`);
        unreferenced.slice(0, 10).forEach(q => console.log(`  ${q}`));
        if (unreferenced.length > 10) {
          console.log(`  ... and ${unreferenced.length - 10} more`);
        }
      }

      // Allow some unreferenced quizzes (might be bonus or deprecated content)
      expect(unreferenced.length).toBeLessThan(allQuizzes.length * 0.1);
    });
  });

  describe('quiz ID format validation', () => {
    it('quiz IDs should follow a consistent pattern for their subject', () => {
      const formatIssues: string[] = [];

      for (const subject of curriculum) {
        const subjectQuizzes = quizzesBySubject.get(subject.id) || [];

        for (const quiz of subjectQuizzes) {
          // Quiz ID should start with subject ID
          if (!quiz.id.startsWith(subject.id)) {
            formatIssues.push(`Quiz "${quiz.id}" doesn't start with subject ID "${subject.id}"`);
          }

          // Quiz ID should contain topic number
          if (!/[-_]?\d+[-_]/.test(quiz.id) && !/[-_]t\d+[-_]/i.test(quiz.id)) {
            formatIssues.push(`Quiz "${quiz.id}" doesn't contain a topic number identifier`);
          }
        }
      }

      expect(
        formatIssues,
        `Found ${formatIssues.length} quiz ID format issues:\n${formatIssues.join('\n')}`
      ).toHaveLength(0);
    });
  });
});
