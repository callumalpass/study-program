# Subject Review Prompt Template

You are reviewing the subject **{SUBJECT_CODE}: {SUBJECT_TITLE}** in a comprehensive Computer Science degree curriculum platform.

## Your Task
Perform a thorough quality review of this subject's content and **write your report to a file**.

**IMPORTANT: Write your final report to:** `/home/calluma/projects/comp_sci_degree/reviews/{SUBJECT_ID}_review.md`

## Subject Location

All subject content is colocated in a single directory:
- Subject directory: `/home/calluma/projects/comp_sci_degree/src/subjects/{SUBJECT_ID}/`

## Files to Review
1. **topics.ts** - Topic definitions (uses glob imports and buildTopicsFromGlob)
2. **quizzes.json** - Quiz questions for each topic
3. **exams.json** - Midterm and final exam questions
4. **exercises.json** - Coding or written exercises for each topic
5. **projects.json** - Project definitions (CS subjects only)
6. **content/** - Markdown lesson files with frontmatter (content/topic-N/*.md)

## Required Quantities
- **16 exercises per topic** (minimum)
- **15 quiz questions per topic** (3 quizzes × 5 questions each)
- **800 words minimum per subtopic**
- **Midterm and Final exams** for each subject

## Review Criteria

### 1. Content Thoroughness (Rate 1-10)
- Does the content cover all essential concepts for this subject at university level?
- Is the depth appropriate for the course year?
- Are there any major topics missing?
- Is there sufficient explanation with examples, diagrams, and code samples?
- **Count words in each subtopic - must be 800+ words each**

### 2. Exercise Quality (Rate 1-10)
- **Count exercises per topic - must be 16 per topic**
- Do exercises progress in difficulty (1-5 scale)?
- Are starter code, test cases, and solutions provided and correct?
- Do exercises reinforce the key concepts from the content?

### 3. Quiz Quality (Rate 1-10)
- **Count quiz questions per topic - must be 15 per topic (3 quizzes × 5 questions)**
- Is there a good mix of question types (multiple_choice, true_false, code_output, fill_blank)?
- Are explanations provided for all answers?
- Do questions test understanding, not just memorization?

### 4. Exam Quality (Rate 1-10)
- Are midterm and final exams present?
- Do exams comprehensively cover the subject material?
- Is difficulty appropriate for university-level assessment?
- Are there varied question types?

### 5. Project Quality (Rate 1-10, CS subjects only, N/A for MATH)
- Are projects substantial enough to demonstrate mastery?
- Do rubrics have clear criteria and scoring levels?
- Is scaffolding provided to help students get started?

### 6. Technical Correctness (Rate 1-10)
- Are code examples syntactically correct?
- Are solutions to exercises correct?
- Are quiz/exam answers accurate?
- Is mathematical notation correct (using LaTeX/KaTeX where appropriate)?

## Output Format

Write a markdown file with this exact structure:

```markdown
# {SUBJECT_CODE}: {SUBJECT_TITLE} - Review Report

**Review Date:** {TODAY'S DATE}
**Reviewer:** Automated Quality Review

## Overall Status: [COMPLETE/NEEDS WORK/INCOMPLETE/EMPTY]

## Scores Summary

| Category | Score | Notes |
|----------|-------|-------|
| Content Thoroughness | X/10 | |
| Exercise Quality | X/10 | |
| Quiz Quality | X/10 | |
| Exam Quality | X/10 | |
| Project Quality | X/10 or N/A | |
| Technical Correctness | X/10 | |
| **Overall** | X/10 | |

## Executive Summary
[2-3 sentence summary of the subject's current state]

## Strengths
- [List what's done well]

## Critical Issues (Must Fix)
- [List any blocking problems - missing content, incorrect answers, etc.]

## Improvements Needed
- [List recommended improvements in priority order]

## Detailed Topic-by-Topic Assessment

### Topic 1: {Title}
- **Content Status:** [Complete/Partial/Empty]
- **Subtopics:** X subtopics
- **Word Counts:** [List each subtopic with approximate word count]
- **Exercises:** X/16 present
- **Quizzes:** X/15 questions present
- **Issues:** [Any specific issues]

### Topic 2: {Title}
[Repeat for each topic...]

## Missing Content Checklist

### Exercises Needed
- [ ] Topic 1: Need X more exercises
- [ ] Topic 2: Need X more exercises
[etc.]

### Quiz Questions Needed
- [ ] Topic 1: Need X more questions
- [ ] Topic 2: Need X more questions
[etc.]

### Content Gaps
- [ ] [List any missing subtopics or concepts]

## Technical Issues Found
- [List any code errors, incorrect solutions, wrong answers]

## Recommendations
1. [Prioritized list of actions to improve this subject]
```

## Process

1. First, read the subject's index.ts to understand the structure
2. Read topics.ts to get the list of topics (uses glob imports via buildTopicsFromGlob)
3. For each topic:
   - Count and list subtopics from content/topic-N/*.md files
   - Verify each markdown file has frontmatter (id, title, order)
   - Estimate word count for each subtopic content
   - Count exercises in exercises.json
   - Count quiz questions in quizzes.json
4. Check exams.json for midterm and final
5. Check projects.json if it exists
6. Compile findings into the report format above
7. **Write the report to the specified file path**

Be thorough and accurate in your counts. The goal is to identify exactly what work remains to complete each subject.

### Frontmatter Check

Each subtopic markdown file should have YAML frontmatter at the top:

```yaml
---
id: cs101-t1-intro
title: "Introduction to Variables"
order: 1
---
```

Report any files missing frontmatter as a technical issue.
