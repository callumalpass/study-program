import { h } from 'preact';
import { useState, useMemo, useCallback } from 'preact/hooks';
import type { Subject, SubjectProgress, Quiz, Exercise } from '@/core/types';
import { SubjectItem } from './SubjectItem';

interface SubjectListProps {
  subjects: Subject[];
  userProgress: Record<string, SubjectProgress>;
  currentPath: string;
  quizzes: Quiz[];
  exercises: Exercise[];
}

interface GroupedSubjects {
  [key: string]: Subject[];
}

export function SubjectList({
  subjects,
  userProgress,
  currentPath,
  quizzes,
  exercises,
}: SubjectListProps) {
  const [collapsedYears, setCollapsedYears] = useState<Set<string>>(new Set());

  const groupedSubjects = useMemo((): GroupedSubjects => {
    return subjects.reduce((acc, subject) => {
      const key = `Year ${subject.year} - Semester ${subject.semester}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(subject);
      return acc;
    }, {} as GroupedSubjects);
  }, [subjects]);

  const toggleYearCollapse = useCallback((yearKey: string) => {
    setCollapsedYears((prev) => {
      const next = new Set(prev);
      if (next.has(yearKey)) {
        next.delete(yearKey);
      } else {
        next.add(yearKey);
      }
      return next;
    });
  }, []);

  const isSubjectActive = (subjectId: string): boolean => {
    return currentPath.includes(`/subject/${subjectId}`);
  };

  return (
    <div class="subject-list-container">
      {/* Subject Groups */}
      <div class="subjects-list-new">
        {Object.entries(groupedSubjects).length === 0 ? (
          <div class="no-subjects-message">
            No subjects available.
          </div>
        ) : (
          Object.entries(groupedSubjects).map(([groupName, groupSubjects]) => {
            const isCollapsed = collapsedYears.has(groupName);

            return (
              <div key={groupName} class="subject-group">
                <button
                  class={`subject-group-header-new ${isCollapsed ? 'collapsed' : ''}`}
                  onClick={() => toggleYearCollapse(groupName)}
                >
                  <span class="group-title">{groupName}</span>
                  <span class="group-count">{groupSubjects.length}</span>
                  <span class={`group-chevron ${isCollapsed ? 'collapsed' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                <div class={`subject-group-content ${isCollapsed ? 'collapsed' : ''}`}>
                  {!isCollapsed &&
                    groupSubjects.map((subject) => (
                      <SubjectItem
                        key={subject.id}
                        subject={subject}
                        progress={userProgress[subject.id]}
                        isActive={isSubjectActive(subject.id)}
                        quizzes={quizzes}
                        exercises={exercises}
                      />
                    ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
