# CS Degree

A browser-based self-study platform covering a 4-year undergraduate computer science curriculum.

## Overview

The curriculum includes 28 subjects (CS and math courses) organized by year and semester with prerequisite tracking. Each subject contains topic lessons, quizzes, coding/written exercises, projects, and practice exams.

**Subjects with full content:**
- CS101: Introduction to Programming (Python)
- CS102: Computer Systems Fundamentals
- CS103: Object-Oriented Programming
- CS104: Data Structures
- CS105: Introduction to C Programming
- MATH101: Discrete Mathematics I
- MATH102: Discrete Mathematics II
- MATH203: Calculus I

The other 20 subjects have curriculum outlines (learning objectives, topic titles) but no lesson content yet.

## Features

- **Lessons**: Markdown content with code examples, rendered with syntax highlighting and LaTeX math
- **Quizzes**: Multiple choice, true/false, fill-in-the-blank, and code output prediction questions
- **Coding exercises**: Python code runs in the browser via Pyodide. Test cases validate submissions
- **Written exercises**: For math/theory subjects. Optional AI grading via Gemini API
- **Projects**: Longer assignments with requirements and grading rubrics
- **Practice exams**: Timed assessments combining multiple question types
- **Progress tracking**: Stored in localStorage. Can sync to a GitHub Gist for backup
- **PDF export**: Download subject content for offline use
- **Code editor**: Monaco editor with adjustable font size

## Running locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Building

```bash
npm run build
```

Output goes to `dist/`. The project deploys to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

## Project structure

```
src/
  components/   # Sidebar, code runner, icons
  content/      # Markdown lesson files by subject
  core/         # Types, router, storage, progress calculations
  data/         # Curriculum definition, quizzes, exercises, projects, exams
  pages/        # Page renderers (home, subject, quiz, exercise, etc.)
  services/     # GitHub Gist sync, PDF export
  styles/       # CSS variables and component styles
  utils/        # Gemini AI evaluation, helpers
```

## Content structure

Each subject lives in `src/data/subjects/[subject-id]/`:
- `index.ts` - Re-exports
- `topics.ts` - Topic metadata and content file references
- `quizzes.ts` - Quiz questions
- `exercises/` - Coding exercises (Python) or written exercises (math)
- `projects.ts` - Project definitions with rubrics
- `exams.ts` - Practice exam questions

Lesson markdown goes in `src/content/subjects/[subject-id]/`.

## Dependencies

- Vite (build)
- TypeScript
- Monaco Editor (code editing)
- Pyodide (Python in browser)
- KaTeX (math rendering)
- Marked (markdown)
- jsPDF (PDF export)
- Prism.js (syntax highlighting)

## Progress storage

Progress saves to `localStorage` under key `cs_degree_progress`. Settings page lets you connect a GitHub personal access token to sync progress to a private Gist.

The Gemini API key (for AI grading of written exercises) is also stored in settings and kept in localStorage only.
