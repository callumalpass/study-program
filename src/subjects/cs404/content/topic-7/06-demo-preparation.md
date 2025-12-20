---
id: cs404-t7-demo-preparation
title: "Demo Preparation"
order: 6
---

# Demo Preparation

Live demonstrations showcase your working software to stakeholders, evaluators, or potential employers. A well-prepared demo makes a powerful impression, while a fumbled demonstration can undermine months of solid work. Thorough preparation, practiced delivery, and fallback plans transform potentially nerve-wracking presentations into confident showcases of your capabilities.

## Why Demo Preparation Matters

Your capstone demo is often the culminating moment of the project. Evaluators may have limited time—perhaps 15 to 30 minutes—to understand what you built and assess its quality. A smooth, well-paced demo allows them to focus on your technical accomplishments rather than being distracted by technical difficulties or confused navigation.

Beyond academic settings, demo skills transfer directly to professional contexts. Product demonstrations to clients, engineering showcases to stakeholders, and interview presentations all require the same core skills: clear communication, technical preparation, and graceful handling of the unexpected.

## Structuring Your Demo

A effective demo follows a clear narrative arc:

### Opening (2-3 minutes)

Begin with context. Briefly explain the problem your project solves and who would use it. Avoid diving straight into features—evaluators need to understand why the software exists before they can appreciate how it works.

```
"Our project addresses the challenge of [problem].
Target users are [audience], who currently struggle with [pain point].
Our solution provides [key value proposition]."
```

### Core Demo (10-15 minutes)

Demonstrate the primary user journeys. Choose two or three flows that showcase the most important functionality. For each flow:

1. State what you are about to show
2. Perform the actions while narrating
3. Highlight what makes this feature valuable

Prioritize showing working software over explaining architecture. Evaluators want to see the application in action. Save detailed technical explanations for Q&A.

### Technical Highlights (3-5 minutes)

After showing the user experience, briefly highlight technical aspects worth noting. This might include:

- Interesting architectural decisions
- Challenging problems you solved
- Performance optimizations
- Security measures implemented

Keep this section brief and avoid reading code unless specifically asked.

### Closing (2-3 minutes)

Summarize what you demonstrated and mention any features you did not have time to show. Invite questions and be ready to dive deeper into any area.

## Demo Environment Preparation

Never demo on a development environment with live data or incomplete features. Set up a dedicated demo environment:

### Demo Data

Create realistic but non-sensitive demo data. Pre-populate the database with enough data to show features meaningfully but not so much that it is overwhelming.

```typescript
// Demo data seeding script
async function seedDemoData() {
  // Create demo user
  await createUser({
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'demo123'
  });

  // Create sample projects
  await createProjects([
    { name: 'Website Redesign', status: 'active', progress: 75 },
    { name: 'Mobile App v2', status: 'planning', progress: 10 },
    { name: 'API Integration', status: 'completed', progress: 100 }
  ]);

  // Add sample activities for timeline
  await createRecentActivities(10);
}
```

### Pre-Login State

Log in to relevant accounts before the demo starts. Nobody wants to watch you type passwords or wait for two-factor authentication.

### Browser Setup

Use a clean browser profile with no personal bookmarks, extensions, or notifications that could distract. Increase font size and zoom level so the audience can read the screen. Hide browser toolbars if possible.

### Network Independence

If possible, demo from a local environment that does not depend on external services. If you need internet access, have a mobile hotspot as backup. Never rely solely on conference room WiFi.

## Practicing Your Demo

Practice the demo multiple times, ideally to different audiences:

### Timed Rehearsal

Run through the entire demo with a timer. If you are allotted 20 minutes, practice completing in 15 to leave buffer for questions and unexpected issues.

### Script Development

Write a rough script for what you will say and do. You do not need to memorize it word-for-word, but having a planned flow prevents rambling and ensures you cover everything important.

```markdown
## Demo Script

### Login and Dashboard
- Log in as demo user
- Point out: Real-time updates, project summary cards
- Click into active project

### Project Detail View
- Show task list and filtering
- Demonstrate drag-and-drop reordering
- Open a task to show detail view

### Collaboration Features
- Show comment thread on task
- Demonstrate @mention notification
- Show activity timeline

### Settings and Admin
- Briefly show settings page
- Mention: Role-based access control
- Skip deep dive (save for Q&A)
```

### Failure Rehearsal

Practice what you will do when something goes wrong. Know how to restart the demo from any point. Have alternative paths if a feature fails.

## Fallback Plans

Despite preparation, things go wrong during demos. Plan for common failures:

### Feature Failure

If a feature does not work during the demo, acknowledge it briefly and move on: "This occasionally happens with [reason]—let me show you an alternative." Do not spend demo time debugging.

### Screenshots and Videos

Record a video of your demo flow before the presentation. If live demo fails completely, you can show the recording: "Let me show you a recording of this feature from earlier."

### Static Fallbacks

Prepare screenshots of key screens. If the entire application fails to load, you can walk through screenshots while explaining.

### Recovery Points

Know how to reset the demo data quickly if you need to restart. A simple script that clears and re-seeds the database can save a failed demo:

```bash
# Quick demo reset
npm run demo:reset  # Drops and recreates demo data
npm run demo:login  # Opens browser logged in as demo user
```

## Handling Questions

During Q&A, listen carefully before answering. It is acceptable to say "I don't know" or "That's beyond the current scope, but here's how I would approach it."

Common question types and how to handle them:

**Technical Deep-Dive**: Be ready to show code or architecture diagrams. Have your IDE open in the background with key files ready to display.

**Scalability Questions**: Explain current limitations honestly and describe how you would address them in a production context.

**Alternative Approaches**: Discuss tradeoffs. "We considered X but chose Y because..."

**Bug Discovery**: If someone finds a bug during the demo, acknowledge it gracefully. "Good catch—I'll add that to our issue tracker."

## Demo Day Checklist

Before your demo presentation:

- [ ] Demo environment deployed and tested
- [ ] Demo data seeded and verified
- [ ] Accounts logged in, sessions active
- [ ] Browser profile clean, zoomed appropriately
- [ ] Backup video recorded
- [ ] Screenshots prepared as fallback
- [ ] Script reviewed, timing practiced
- [ ] Questions anticipated, answers prepared
- [ ] Backup laptop available (if possible)
- [ ] Contact info for technical support (if presenting remotely)

## Summary

Demo preparation transforms a source of anxiety into an opportunity to showcase your work confidently. Structure your demo with a clear narrative: problem, solution, technical highlights, closing. Set up a dedicated demo environment with realistic data and pre-authenticated accounts. Practice with a timer and prepare fallback plans for when things go wrong. The goal is not perfection but smooth, professional handling of whatever happens. With thorough preparation, you can focus on communicating your accomplishments rather than worrying about technical mishaps.
