import { h } from 'preact';
import { useState, useMemo, useCallback } from 'preact/hooks';
import type { Subject, SubjectProgress, Quiz, Exercise, Exam, Project } from '@/core/types';
import { SubjectItem } from './SubjectItem';

type FilterType = 'all' | 'in_progress' | 'completed';

interface SubjectListProps {
  subjects: Subject[];
  userProgress: Record<string, SubjectProgress>;
  currentPath: string;
  expandedSubjectId: string | null;
  onExpandSubject: (subjectId: string | null) => void;
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
}

interface GroupedSubjects {
  [key: string]: Subject[];
}

export function SubjectList({
  subjects,
  userProgress,
  currentPath,
  expandedSubjectId,
  onExpandSubject,
  quizzes,
  exercises,
  exams,
  projects,
}: SubjectListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [collapsedYears, setCollapsedYears] = useState<Set<string>>(new Set());

  const filteredSubjects = useMemo(() => {
    let result = subjects;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((subject) => {
        const matchesTitle = subject.title.toLowerCase().includes(query);
        const matchesCode = subject.code.toLowerCase().includes(query);
        const matchesTopic = subject.topics.some((topic) =>
          topic.title.toLowerCase().includes(query)
        );
        return matchesTitle || matchesCode || matchesTopic;
      });
    }

    // Filter by status
    if (filter !== 'all') {
      result = result.filter((subject) => {
        const progress = userProgress[subject.id];
        const status = progress?.status || 'not_started';
        if (filter === 'in_progress') {
          return status === 'in_progress';
        }
        if (filter === 'completed') {
          return status === 'completed';
        }
        return true;
      });
    }

    return result;
  }, [subjects, searchQuery, filter, userProgress]);

  const groupedSubjects = useMemo((): GroupedSubjects => {
    return filteredSubjects.reduce((acc, subject) => {
      const key = `Year ${subject.year} - Semester ${subject.semester}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(subject);
      return acc;
    }, {} as GroupedSubjects);
  }, [filteredSubjects]);

  const handleSearchChange = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement;
    setSearchQuery(target.value);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

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

  const handleToggleSubject = useCallback((subjectId: string) => {
    if (expandedSubjectId === subjectId) {
      onExpandSubject(null);
    } else {
      onExpandSubject(subjectId);
    }
  }, [expandedSubjectId, onExpandSubject]);

  const isSubjectActive = (subjectId: string): boolean => {
    return currentPath.includes(`/subject/${subjectId}`);
  };

  const filterCounts = useMemo(() => {
    const all = subjects.length;
    const inProgress = subjects.filter(
      (s) => userProgress[s.id]?.status === 'in_progress'
    ).length;
    const completed = subjects.filter(
      (s) => userProgress[s.id]?.status === 'completed'
    ).length;
    return { all, inProgress, completed };
  }, [subjects, userProgress]);

  return (
    <div class="subject-list-container">
      {/* Search */}
      <div class="sidebar-search-container">
        <input
          type="search"
          placeholder="Search subjects..."
          class="sidebar-search"
          value={searchQuery}
          onInput={handleSearchChange}
        />
      </div>

      {/* Filters */}
      <div class="sidebar-filters">
        <button
          class={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All ({filterCounts.all})
        </button>
        <button
          class={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
          onClick={() => handleFilterChange('in_progress')}
        >
          In Progress ({filterCounts.inProgress})
        </button>
        <button
          class={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          Complete ({filterCounts.completed})
        </button>
      </div>

      {/* Subject Groups */}
      <div class="subjects-list-new">
        {Object.entries(groupedSubjects).length === 0 ? (
          <div class="no-subjects-message">
            {searchQuery || filter !== 'all'
              ? 'No subjects match your search or filter.'
              : 'No subjects available.'}
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
                        isExpanded={expandedSubjectId === subject.id}
                        onToggle={() => handleToggleSubject(subject.id)}
                        quizzes={quizzes}
                        exercises={exercises}
                        exams={exams}
                        projects={projects}
                        currentPath={currentPath}
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
