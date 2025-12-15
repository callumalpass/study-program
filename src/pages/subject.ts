// Subject detail page
import { h, render } from 'preact';
import type { Subject, Project, UserProgress, Exam, Quiz, Exercise } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  arePrerequisitesMet,
  startSubject,
  getSubjectProgressDetails,
} from '@/core/progress';
import {
  navigateToCurriculum,
  navigateToSubtopic,
} from '@/core/router';
import { Icons } from '../components/icons';
import { ContentNavigator } from '../components/preact/ContentNavigator';

/**
 * Render the subject detail page
 */
export function renderSubjectPage(
  container: HTMLElement,
  subjects: Subject[],
  subjectId: string,
  topicId?: string,
  projects?: Project[],
  exams?: Exam[],
  subtopicSlug?: string,
  quizzes?: Quiz[],
  exercises?: Exercise[]
): void {
  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    container.innerHTML = `
      <div class="error-page">
        <h1>Subject Not Found</h1>
        <p>The subject you're looking for doesn't exist.</p>
        <button class="btn btn-primary" id="back-to-curriculum">Back to Curriculum</button>
      </div>
    `;

    const backBtn = container.querySelector('#back-to-curriculum');
    if (backBtn) {
      backBtn.addEventListener('click', () => navigateToCurriculum());
    }
    return;
  }

  const userProgress = progressStorage.getProgress();
  const prerequisitesMet = arePrerequisitesMet(subject, userProgress);
  const progressDetails = getSubjectProgressDetails(subject);

  // Auto-start subject if viewing it and prerequisites are met
  if (prerequisitesMet && progressDetails.status === 'not_started') {
    startSubject(subjectId);
  }

  // Handle auto-redirect to first subtopic when topic has subtopics
  if (topicId && !subtopicSlug) {
    const topic = subject.topics.find(t => t.id === topicId);
    if (topic?.subtopics?.length) {
      navigateToSubtopic(subjectId, topicId, topic.subtopics[0].slug);
      return;
    }
  }

  const subjectProgress = userProgress.subjects[subjectId];
  const prerequisiteSubjects = subject.prerequisites.map(prereqId =>
    subjects.find(s => s.id === prereqId)
  ).filter(Boolean) as Subject[];

  // Minimal page shell - header moved into ContentNavigator
  container.innerHTML = `
    <div class="subject-page">
      ${!prerequisitesMet ? `
        <section class="prerequisites-warning">
          <h3>Prerequisites Required</h3>
          <p>Complete these subjects first:</p>
          <ul class="prerequisite-list">
            ${prerequisiteSubjects.map(prereq => {
              const prereqProgress = userProgress.subjects[prereq.id];
              const isCompleted = prereqProgress?.status === 'completed';
              return `
                <li class="${isCompleted ? 'completed' : ''}">
                  <span class="checkbox">${isCompleted ? Icons.Check : Icons.StatusNotStarted}</span>
                  ${prereq.title} (${prereq.code})
                </li>
              `;
            }).join('')}
          </ul>
        </section>
      ` : ''}

      <div id="content-navigator-root"></div>
    </div>
  `;

  // Mount ContentNavigator Preact component
  const navigatorRoot = container.querySelector('#content-navigator-root');
  if (navigatorRoot) {
    render(
      h(ContentNavigator, {
        subject,
        currentTopicId: topicId,
        currentSubtopicSlug: subtopicSlug,
        progress: subjectProgress,
        progressStatus: progressDetails.status,
        quizzes: quizzes || [],
        exercises: exercises || [],
        exams: exams || [],
        projects: projects || [],
        onSubtopicView: (subtopicId: string) => {
          progressStorage.recordSubtopicView(subjectId, subtopicId);
        }
      }),
      navigatorRoot
    );
  }
}
