/**
 * Project Page Security Tests
 *
 * Tests for XSS prevention in project page rendering.
 * Ensures that user-submitted content and AI evaluation content
 * are properly escaped to prevent cross-site scripting attacks.
 */

import { describe, expect, it, beforeEach, vi } from 'vitest';
import { escapeHtml } from '../src/utils/html';

// Mock types to match actual project structures
interface MockProjectSubmission {
  submissionId: string;
  timestamp: string;
  description: string;
  repositoryUrl?: string;
  demoUrl?: string;
  notes?: string;
  aiEvaluation?: MockProjectAiEvaluation;
}

interface MockProjectAiEvaluation {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  rubricScores: Record<string, { score: number; level: string; justification: string }>;
}

describe('Project Page XSS Prevention', () => {
  describe('user-submitted content escaping', () => {
    it('escapes HTML in submission description', () => {
      const xssDescription = '<script>alert("xss")</script>Legitimate description';
      const escaped = escapeHtml(xssDescription);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
      expect(escaped).toContain('Legitimate description');
    });

    it('escapes HTML in submission notes', () => {
      const xssNotes = '<img src=x onerror="alert(1)">Some notes';
      const escaped = escapeHtml(xssNotes);

      expect(escaped).not.toContain('<img');
      expect(escaped).toContain('&lt;img');
      expect(escaped).toContain('Some notes');
    });

    it('escapes malicious repository URL', () => {
      const xssUrl = 'javascript:alert("xss")';
      const escaped = escapeHtml(xssUrl);

      // The javascript: protocol text is preserved but safe as escaped text
      expect(escaped).toBe('javascript:alert(&quot;xss&quot;)');
    });

    it('escapes repository URL with embedded HTML', () => {
      const xssUrl = 'https://github.com/user/repo" onclick="alert(1)';
      const escaped = escapeHtml(xssUrl);

      expect(escaped).not.toContain('" onclick');
      expect(escaped).toContain('&quot;');
    });

    it('escapes demo URL with XSS payload', () => {
      const xssUrl = '"><script>alert(1)</script><a href="';
      const escaped = escapeHtml(xssUrl);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('preserves legitimate URLs', () => {
      const legitimateUrl = 'https://github.com/user/repo';
      const escaped = escapeHtml(legitimateUrl);

      expect(escaped).toBe(legitimateUrl);
    });

    it('preserves legitimate description with special chars', () => {
      const description = 'Built a REST API using Node.js & Express. Performance improved by 50%!';
      const escaped = escapeHtml(description);

      expect(escaped).toBe('Built a REST API using Node.js &amp; Express. Performance improved by 50%!');
    });
  });

  describe('AI evaluation content escaping', () => {
    it('escapes HTML in AI feedback', () => {
      const xssFeedback = '<div onclick="alert(1)">Great work!</div>';
      const escaped = escapeHtml(xssFeedback);

      expect(escaped).not.toContain('<div');
      expect(escaped).toContain('&lt;div');
      expect(escaped).toContain('Great work!');
    });

    it('escapes HTML in AI strengths', () => {
      const xssStrength = '<script>steal_cookies()</script>Good code organization';
      const escaped = escapeHtml(xssStrength);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('Good code organization');
    });

    it('escapes HTML in AI improvements', () => {
      const xssImprovement = '<img src=x onerror="alert(1)">Add more tests';
      const escaped = escapeHtml(xssImprovement);

      expect(escaped).not.toContain('<img');
      expect(escaped).toContain('Add more tests');
    });

    it('escapes HTML in rubric score level', () => {
      const xssLevel = '<a href="javascript:alert(1)">Excellent</a>';
      const escaped = escapeHtml(xssLevel);

      expect(escaped).not.toContain('<a');
      expect(escaped).toContain('Excellent');
    });

    it('escapes HTML in rubric justification', () => {
      const xssJustification = 'Code is clean<script>alert(1)</script> and well-documented';
      const escaped = escapeHtml(xssJustification);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('Code is clean');
      expect(escaped).toContain('well-documented');
    });

    it('escapes HTML in criterion name', () => {
      const xssCriterion = 'Code Quality<script>alert(1)</script>';
      const escaped = escapeHtml(xssCriterion);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('Code Quality');
    });

    it('preserves legitimate AI feedback', () => {
      const feedback = 'Good implementation. Consider using TypeScript for better type safety.';
      const escaped = escapeHtml(feedback);

      expect(escaped).toBe(feedback);
    });
  });

  describe('complex XSS payloads', () => {
    it('handles polyglot XSS in description', () => {
      const polyglot = "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcLiCk=alert() )//";
      const escaped = escapeHtml(polyglot);

      // Should escape quotes, safe otherwise
      expect(escaped).toContain('&quot;');
      expect(escaped).toContain('&#39;');
    });

    it('handles SVG-based XSS in notes', () => {
      const svgXss = '<svg onload="alert(1)">';
      const escaped = escapeHtml(svgXss);

      expect(escaped).not.toContain('<svg');
      expect(escaped).toContain('&lt;svg');
    });

    it('handles event handler injection in URL', () => {
      const eventXss = '" onmouseover="alert(1)" x="';
      const escaped = escapeHtml(eventXss);

      expect(escaped).not.toContain('" onmouseover');
      expect(escaped).toContain('&quot;');
    });

    it('handles nested script tags', () => {
      const nestedXss = '<script><script>alert(1)</script></script>';
      const escaped = escapeHtml(nestedXss);

      expect(escaped).not.toContain('<script>');
      expect(escaped.match(/&lt;script&gt;/g)?.length).toBe(2);
    });

    it('handles base64 encoded payloads in text', () => {
      const base64Xss = 'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==';
      const escaped = escapeHtml(base64Xss);

      // This is just text, should be preserved
      expect(escaped).toBe(base64Xss);
    });
  });

  describe('edge cases', () => {
    it('handles empty strings', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('handles strings with only special characters', () => {
      const specialChars = '<>&"\'';
      const escaped = escapeHtml(specialChars);

      expect(escaped).toBe('&lt;&gt;&amp;&quot;&#39;');
    });

    it('handles very long malicious strings', () => {
      const longXss = '<script>'.repeat(1000) + 'alert(1)' + '</script>'.repeat(1000);
      const escaped = escapeHtml(longXss);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('handles mixed safe and unsafe content', () => {
      const mixed = 'Hello <script>alert(1)</script> World & Friends';
      const escaped = escapeHtml(mixed);

      expect(escaped).toBe('Hello &lt;script&gt;alert(1)&lt;/script&gt; World &amp; Friends');
    });

    it('handles unicode with XSS', () => {
      const unicodeXss = '你好<script>alert(1)</script>世界';
      const escaped = escapeHtml(unicodeXss);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('你好');
      expect(escaped).toContain('世界');
    });
  });
});

describe('Submission content rendering', () => {
  // Simulates the rendering logic from project-page.ts
  function renderSubmissionContent(submission: MockProjectSubmission): string {
    let html = '';

    if (submission.repositoryUrl) {
      html += `<a href="${escapeHtml(submission.repositoryUrl)}">${escapeHtml(submission.repositoryUrl)}</a>`;
    }

    if (submission.demoUrl) {
      html += `<a href="${escapeHtml(submission.demoUrl)}">${escapeHtml(submission.demoUrl)}</a>`;
    }

    html += `<p>${escapeHtml(submission.description)}</p>`;

    if (submission.notes) {
      html += `<p>${escapeHtml(submission.notes)}</p>`;
    }

    return html;
  }

  it('renders submission with safe URLs', () => {
    const submission: MockProjectSubmission = {
      submissionId: 'test-1',
      timestamp: new Date().toISOString(),
      description: 'A test project',
      repositoryUrl: 'https://github.com/user/repo',
      demoUrl: 'https://myapp.vercel.app',
      notes: 'Some notes',
    };

    const html = renderSubmissionContent(submission);

    expect(html).toContain('href="https://github.com/user/repo"');
    expect(html).toContain('href="https://myapp.vercel.app"');
    expect(html).toContain('A test project');
    expect(html).toContain('Some notes');
  });

  it('safely renders submission with XSS in all fields', () => {
    const xssPayload = '<script>alert(1)</script>';
    const submission: MockProjectSubmission = {
      submissionId: 'test-2',
      timestamp: new Date().toISOString(),
      description: `Description ${xssPayload}`,
      repositoryUrl: `https://example.com/${xssPayload}`,
      demoUrl: `https://demo.com/${xssPayload}`,
      notes: `Notes ${xssPayload}`,
    };

    const html = renderSubmissionContent(submission);

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('</script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&lt;/script&gt;');
  });

  it('safely renders submission with URL attribute breakout attempt', () => {
    const submission: MockProjectSubmission = {
      submissionId: 'test-3',
      timestamp: new Date().toISOString(),
      description: 'Test',
      repositoryUrl: '" onclick="alert(1)" data-x="',
    };

    const html = renderSubmissionContent(submission);

    // The quote should be escaped, preventing attribute breakout
    // The text 'onclick=' appears but the quotes are escaped so it's safe
    expect(html).toContain('&quot;');
    // Critical: verify the href doesn't have unescaped quotes that could break out
    expect(html).not.toContain('href="" onclick');
    // The escaped version should be present
    expect(html).toContain('href="&quot;');
  });
});

describe('AI Evaluation content rendering', () => {
  // Simulates the rendering logic from project-page.ts
  function renderAiEvaluation(evaluation: MockProjectAiEvaluation): string {
    let html = `<p>${escapeHtml(evaluation.feedback)}</p>`;

    html += '<ul>';
    for (const strength of evaluation.strengths) {
      html += `<li>${escapeHtml(strength)}</li>`;
    }
    html += '</ul>';

    html += '<ul>';
    for (const improvement of evaluation.improvements) {
      html += `<li>${escapeHtml(improvement)}</li>`;
    }
    html += '</ul>';

    for (const [name, score] of Object.entries(evaluation.rubricScores)) {
      html += `<span>${escapeHtml(name)}</span>`;
      html += `<span>${score.score} - ${escapeHtml(score.level)}</span>`;
      html += `<p>${escapeHtml(score.justification)}</p>`;
    }

    return html;
  }

  it('safely renders AI evaluation with all safe content', () => {
    const evaluation: MockProjectAiEvaluation = {
      score: 85,
      feedback: 'Great work on this project!',
      strengths: ['Good code organization', 'Well documented'],
      improvements: ['Add more tests', 'Improve error handling'],
      rubricScores: {
        'Code Quality': {
          score: 90,
          level: 'Excellent',
          justification: 'Clean and well-structured code',
        },
      },
    };

    const html = renderAiEvaluation(evaluation);

    expect(html).toContain('Great work on this project!');
    expect(html).toContain('Good code organization');
    expect(html).toContain('Add more tests');
    expect(html).toContain('Excellent');
  });

  it('safely renders AI evaluation with XSS in all fields', () => {
    const xssPayload = '<script>alert(1)</script>';
    const evaluation: MockProjectAiEvaluation = {
      score: 85,
      feedback: `Feedback ${xssPayload}`,
      strengths: [`Strength ${xssPayload}`],
      improvements: [`Improvement ${xssPayload}`],
      rubricScores: {
        [`Criterion ${xssPayload}`]: {
          score: 90,
          level: `Level ${xssPayload}`,
          justification: `Justification ${xssPayload}`,
        },
      },
    };

    const html = renderAiEvaluation(evaluation);

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('</script>');
    // All instances should be escaped: feedback, strength, improvement, criterion name, level, justification
    const escapedCount = (html.match(/&lt;script&gt;/g) || []).length;
    expect(escapedCount).toBe(6);
  });
});
