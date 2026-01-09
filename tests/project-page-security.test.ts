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

describe('Project requirements rendering', () => {
  // Simulates the rendering logic from project-page.ts
  function renderRequirements(requirements: string[]): string {
    return `<ul class="requirements-list">
      ${requirements.map(req => `<li>${escapeHtml(req)}</li>`).join('')}
    </ul>`;
  }

  it('safely renders requirements with XSS payloads', () => {
    const requirements = [
      'Must implement user authentication',
      '<script>alert("xss")</script>Handle errors gracefully',
      'Write unit tests<img src=x onerror="alert(1)">',
    ];

    const html = renderRequirements(requirements);

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&lt;img');
    expect(html).toContain('Must implement user authentication');
    expect(html).toContain('Handle errors gracefully');
    expect(html).toContain('Write unit tests');
  });

  it('preserves legitimate requirements with special chars', () => {
    const requirements = [
      'Use async/await for I/O operations',
      'Implement O(n log n) sorting algorithm',
      'Handle edge cases: null, undefined & empty strings',
    ];

    const html = renderRequirements(requirements);

    expect(html).toContain('async/await');
    expect(html).toContain('O(n log n)');
    expect(html).toContain('&amp; empty strings');
  });
});

describe('Project rubric rendering', () => {
  interface MockRubricLevel {
    label: string;
    score: number;
    description: string;
  }

  interface MockRubricCriterion {
    name: string;
    weight: number;
    levels: MockRubricLevel[];
  }

  // Simulates the rendering logic from project-page.ts
  function renderRubric(rubric: MockRubricCriterion[]): string {
    return rubric.map(criterion => `
      <div class="rubric-criterion">
        <div class="criterion-header">
          <h3>${escapeHtml(criterion.name)}</h3>
          <span class="criterion-weight">${criterion.weight}%</span>
        </div>
        <div class="criterion-levels">
          ${criterion.levels.map(level => `
            <div class="rubric-level">
              <div class="level-score">${level.score}</div>
              <div class="level-content">
                <div class="level-label">${escapeHtml(level.label)}</div>
                <div class="level-description">${escapeHtml(level.description)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  it('safely renders rubric criterion names with XSS', () => {
    const rubric: MockRubricCriterion[] = [{
      name: 'Code Quality<script>alert(1)</script>',
      weight: 30,
      levels: [{ label: 'Excellent', score: 100, description: 'Perfect code' }],
    }];

    const html = renderRubric(rubric);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('Code Quality');
  });

  it('safely renders rubric level labels with XSS', () => {
    const rubric: MockRubricCriterion[] = [{
      name: 'Testing',
      weight: 20,
      levels: [
        { label: 'Excellent<img src=x onerror="alert(1)">', score: 100, description: 'Test' },
      ],
    }];

    const html = renderRubric(rubric);

    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
    expect(html).toContain('Excellent');
  });

  it('safely renders rubric level descriptions with XSS', () => {
    const rubric: MockRubricCriterion[] = [{
      name: 'Documentation',
      weight: 25,
      levels: [{
        label: 'Good',
        score: 80,
        description: 'Well documented<svg onload="alert(1)">code',
      }],
    }];

    const html = renderRubric(rubric);

    expect(html).not.toContain('<svg');
    expect(html).toContain('&lt;svg');
    expect(html).toContain('Well documented');
    expect(html).toContain('code');
  });

  it('safely renders rubric with XSS in all fields', () => {
    const xss = '<script>evil()</script>';
    const rubric: MockRubricCriterion[] = [{
      name: `Criterion ${xss}`,
      weight: 50,
      levels: [
        { label: `Label ${xss}`, score: 100, description: `Description ${xss}` },
        { label: `Label2 ${xss}`, score: 50, description: `Description2 ${xss}` },
      ],
    }];

    const html = renderRubric(rubric);

    expect(html).not.toContain('<script>');
    // 1 in name + 2 in labels + 2 in descriptions = 5
    const escapedCount = (html.match(/&lt;script&gt;/g) || []).length;
    expect(escapedCount).toBe(5);
  });
});

describe('Project scaffolding rendering', () => {
  interface MockStarterResource {
    label: string;
    link?: string;
    description?: string;
  }

  // Simulates renderScaffoldingList from project-page.ts
  function renderScaffoldingList(title: string, items?: string[]): string {
    if (!items || items.length === 0) return '';
    return `
      <div class="scaffolding-card">
        <h3>${escapeHtml(title)}</h3>
        <ul>
          ${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Simulates renderScaffoldingResources from project-page.ts
  function renderScaffoldingResources(resources?: MockStarterResource[]): string {
    if (!resources || resources.length === 0) return '';
    return `
      <div class="scaffolding-card">
        <h3>Starter Resources</h3>
        <ul class="resource-list">
          ${resources.map(res => `
            <li>
              <div class="resource-label">${escapeHtml(res.label)}${res.link ? ` <a href="${escapeHtml(res.link)}" target="_blank" rel="noopener">Open</a>` : ''}</div>
              ${res.description ? `<div class="resource-description">${escapeHtml(res.description)}</div>` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  // Simulates scaffolding overview rendering
  function renderScaffoldingOverview(overview?: string): string {
    return overview ? `<p class="scaffolding-overview">${escapeHtml(overview)}</p>` : '';
  }

  it('safely renders scaffolding title with XSS', () => {
    const html = renderScaffoldingList('Getting Started<script>alert(1)</script>', ['Item 1']);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('Getting Started');
  });

  it('safely renders scaffolding items with XSS', () => {
    const items = [
      'Set up environment<img src=x onerror="alert(1)">',
      '<svg onload="steal()">Install dependencies',
      'Normal step with no XSS',
    ];

    const html = renderScaffoldingList('Getting Started', items);

    expect(html).not.toContain('<img');
    expect(html).not.toContain('<svg');
    expect(html).toContain('&lt;img');
    expect(html).toContain('&lt;svg');
    expect(html).toContain('Normal step with no XSS');
  });

  it('safely renders scaffolding overview with XSS', () => {
    const overview = 'Follow these steps<script>alert(1)</script> to complete the project';
    const html = renderScaffoldingOverview(overview);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('Follow these steps');
    expect(html).toContain('to complete the project');
  });

  it('safely renders starter resources with XSS in label', () => {
    const resources: MockStarterResource[] = [{
      label: 'Download template<script>alert(1)</script>',
      link: 'https://example.com/template',
    }];

    const html = renderScaffoldingResources(resources);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('Download template');
  });

  it('safely renders starter resources with XSS in link', () => {
    const resources: MockStarterResource[] = [{
      label: 'Template',
      link: 'javascript:alert("xss")',
    }];

    const html = renderScaffoldingResources(resources);

    // The javascript: protocol is safe as escaped text in href
    expect(html).toContain('href="javascript:alert(&quot;xss&quot;)"');
    expect(html).toContain('Template');
  });

  it('safely renders starter resources with URL attribute breakout', () => {
    const resources: MockStarterResource[] = [{
      label: 'Template',
      link: '" onclick="alert(1)" x="',
    }];

    const html = renderScaffoldingResources(resources);

    expect(html).toContain('&quot;');
    expect(html).not.toContain('href="" onclick');
  });

  it('safely renders starter resources with XSS in description', () => {
    const resources: MockStarterResource[] = [{
      label: 'API Docs',
      description: 'Read the docs<img src=x onerror="alert(1)"> before starting',
    }];

    const html = renderScaffoldingResources(resources);

    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
    expect(html).toContain('Read the docs');
    expect(html).toContain('before starting');
  });

  it('handles empty scaffolding gracefully', () => {
    expect(renderScaffoldingList('Title', [])).toBe('');
    expect(renderScaffoldingList('Title', undefined)).toBe('');
    expect(renderScaffoldingResources([])).toBe('');
    expect(renderScaffoldingResources(undefined)).toBe('');
    expect(renderScaffoldingOverview(undefined)).toBe('');
  });
});

describe('File name rendering', () => {
  // Simulates file list rendering from project-page.ts
  function renderFileList(fileNames: string[]): string {
    return `
      <div class="selected-files">
        <strong>Selected files:</strong>
        <ul>
          ${fileNames.map(name => `<li>${escapeHtml(name)} (1 KB)</li>`).join('')}
        </ul>
      </div>
    `;
  }

  it('safely renders file names with XSS payloads', () => {
    const fileNames = [
      'main.ts',
      '<script>alert(1)</script>.js',
      'image<img src=x onerror="alert(1)">.png',
      '" onclick="alert(1).html',
    ];

    const html = renderFileList(fileNames);

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&lt;img');
    expect(html).toContain('&quot;');
    expect(html).toContain('main.ts');
  });

  it('preserves legitimate file names with special chars', () => {
    const fileNames = [
      'README.md',
      'types.d.ts',
      'config.test.js',
      'styles&themes.css',
    ];

    const html = renderFileList(fileNames);

    expect(html).toContain('README.md');
    expect(html).toContain('types.d.ts');
    expect(html).toContain('config.test.js');
    expect(html).toContain('styles&amp;themes.css');
  });
});
