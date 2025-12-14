# AI-Based Project Evaluation

Implementation plan for automated project evaluation using Gemini 3.

## Overview

Allow students to submit GitHub repository URLs for their projects and receive automated feedback scored against the project rubric.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Project Page   │────▶│  GitHub Service  │────▶│  Gemini Service │
│  (UI)           │     │  (fetch files)   │     │  (evaluate)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  Evaluation     │
                                                 │  Results UI     │
                                                 └─────────────────┘
```

## API Details

### Gemini 3 Pro

- **Model ID**: `gemini-3-pro-preview`
- **Context window**: 1M tokens input / 64k output
- **Pricing**: $2/1M input tokens, $12/1M output tokens
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent`

### Request Format

```typescript
const response = await fetch(
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        thinkingConfig: { thinkingLevel: 'high' },
        responseMimeType: 'application/json'
      }
    })
  }
);
```

## Implementation Components

### 1. GitHub File Fetcher (`src/utils/github.ts`)

```typescript
interface GitHubFile {
  path: string;
  content: string;
}

// Fetch all files from a repo (or subdirectory)
async function fetchRepoFiles(
  owner: string,
  repo: string,
  path?: string
): Promise<GitHubFile[]>

// Uses GitHub API: GET /repos/{owner}/{repo}/contents/{path}
// Recursively fetches directories
// Filters to relevant file extensions (.py, .js, .ts, etc.)
// Returns array of {path, content} objects
```

### 2. Evaluation Service (`src/utils/gemini-eval.ts`)

```typescript
interface RubricScore {
  category: string;
  weight: number;
  level: 'Excellent' | 'Good' | 'Satisfactory' | 'Needs Improvement';
  score: number;  // 25, 50, 75, or 100
  justification: string;
}

interface EvaluationResult {
  scores: RubricScore[];
  overallScore: number;  // weighted average
  summary: string;
  strengths: string[];
  improvements: string[];
}

async function evaluateProject(
  project: Project,
  files: GitHubFile[],
  apiKey: string
): Promise<EvaluationResult>
```

### 3. Prompt Template

```
You are evaluating a student programming project. Assess the submitted code against the provided rubric.

## Project: {title}

### Description
{description}

### Requirements
{requirements as numbered list}

### Rubric
{for each category:}
**{name}** (Weight: {weight}%)
- Excellent (100): {description}
- Good (75): {description}
- Satisfactory (50): {description}
- Needs Improvement (25): {description}

## Submitted Code

{for each file:}
=== FILE: {path} ===
{content}

## Instructions

Evaluate the project against each rubric category. For each category:
1. Determine which level best describes the submission
2. Provide specific justification referencing the code

Return JSON in this exact format:
{
  "scores": [
    {
      "category": "Category Name",
      "weight": 40,
      "level": "Good",
      "score": 75,
      "justification": "Specific feedback..."
    }
  ],
  "summary": "Overall assessment...",
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Suggestion 1", "Suggestion 2"]
}
```

### 4. UI Components

**Project Page Updates** (`src/pages/project-page.ts`):
- Add "Submit for Evaluation" section
- Input field for GitHub repo URL (e.g., `username/repo` or full URL)
- Optional: path within repo if project is in subdirectory
- Submit button triggers evaluation
- Loading state while fetching/evaluating

**Evaluation Results Display**:
- Overall score with visual indicator (progress bar or grade)
- Per-category breakdown showing:
  - Category name and weight
  - Achieved level with color coding
  - Score contribution
  - Expandable justification
- Summary section with strengths and improvements
- Option to re-evaluate with different submission

### 5. API Key Management

For personal use, simple localStorage approach:
- Settings page or modal to enter Gemini API key
- Store in localStorage (acceptable for personal use)
- Key retrieved by evaluation service when needed

```typescript
// src/utils/api-keys.ts
export function getGeminiApiKey(): string | null {
  return localStorage.getItem('gemini-api-key');
}

export function setGeminiApiKey(key: string): void {
  localStorage.setItem('gemini-api-key', key);
}
```

## File Structure

```
src/
├── utils/
│   ├── github.ts         # GitHub API file fetching
│   ├── gemini-eval.ts    # Gemini evaluation service
│   └── api-keys.ts       # API key management
├── components/
│   └── evaluation-result.ts  # Results display component
└── pages/
    └── project-page.ts   # Updated with submission UI
```

## Type Additions (`src/core/types.ts`)

```typescript
interface ProjectEvaluation {
  projectId: string;
  timestamp: number;
  repoUrl: string;
  scores: RubricScore[];
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
}
```

## Error Handling

- Invalid GitHub URL: Show format hint
- Repo not found / private: Clear error message
- Rate limiting (GitHub): Suggest waiting or using token
- Gemini API errors: Display error, allow retry
- Empty repo / no code files: Prompt user to check URL

## Future Enhancements

- Save evaluation history to progress system
- Compare multiple submissions over time
- Support for private repos (GitHub personal access token)
- Batch evaluation of multiple projects
- Export evaluation as PDF report
