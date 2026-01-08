/**
 * Project Reference Validation Tests
 *
 * These tests ensure that all project references in the curriculum
 * are valid and correspond to actual project definitions.
 */

import { describe, it, expect } from 'vitest';
import { allProjects } from '../src/subjects';
import { curriculum } from '../src/data/curriculum';
import type { Project } from '../src/core/types';

// Create a lookup map for efficient project access
const projectById = new Map<string, Project>(allProjects.map(p => [p.id, p]));

describe('Project Reference Validation', () => {
  describe('curriculum project references', () => {
    it('all curriculum projectIds reference existing projects', () => {
      const missingProjects: { subjectId: string; projectId: string }[] = [];

      curriculum.forEach(subject => {
        (subject.projectIds || []).forEach(projectId => {
          if (!projectById.has(projectId)) {
            missingProjects.push({
              subjectId: subject.id,
              projectId,
            });
          }
        });
      });

      expect(
        missingProjects,
        `Found ${missingProjects.length} missing project references:\n${missingProjects
          .map(m => `  - ${m.subjectId}: ${m.projectId}`)
          .join('\n')}`
      ).toHaveLength(0);
    });

    it('all project subjectIds match their referenced subject', () => {
      const mismatches: { subjectId: string; projectId: string; projectSubjectId: string }[] = [];

      curriculum.forEach(subject => {
        (subject.projectIds || []).forEach(projectId => {
          const project = projectById.get(projectId);
          if (project && project.subjectId !== subject.id) {
            mismatches.push({
              subjectId: subject.id,
              projectId,
              projectSubjectId: project.subjectId,
            });
          }
        });
      });

      expect(
        mismatches,
        `Found ${mismatches.length} project subjectId mismatches:\n${mismatches
          .map(m => `  - ${m.subjectId} references ${m.projectId} but project.subjectId is ${m.projectSubjectId}`)
          .join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('project data integrity', () => {
    it('all projects have required fields', () => {
      const invalidProjects: string[] = [];

      allProjects.forEach(project => {
        const missing: string[] = [];
        if (!project.id) missing.push('id');
        if (!project.subjectId) missing.push('subjectId');
        if (!project.title) missing.push('title');
        if (!project.description) missing.push('description');

        if (missing.length > 0) {
          invalidProjects.push(`${project.id || 'unknown'}: missing ${missing.join(', ')}`);
        }
      });

      expect(
        invalidProjects,
        `Found projects with missing required fields:\n${invalidProjects.join('\n')}`
      ).toHaveLength(0);
    });

    it('all project IDs are unique', () => {
      const ids = allProjects.map(p => p.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

      expect(
        duplicates,
        `Found duplicate project IDs: ${duplicates.join(', ')}`
      ).toHaveLength(0);
    });

    it('all projects have requirements array', () => {
      const missingRequirements: string[] = [];

      allProjects.forEach(project => {
        if (!Array.isArray(project.requirements) || project.requirements.length === 0) {
          missingRequirements.push(project.id);
        }
      });

      expect(
        missingRequirements,
        `Projects missing requirements: ${missingRequirements.join(', ')}`
      ).toHaveLength(0);
    });

    it('all projects have valid rubric', () => {
      const invalidRubrics: string[] = [];

      allProjects.forEach(project => {
        if (!Array.isArray(project.rubric) || project.rubric.length === 0) {
          invalidRubrics.push(`${project.id}: missing or empty rubric`);
          return;
        }

        project.rubric.forEach((criterion, index) => {
          if (!criterion.name) {
            invalidRubrics.push(`${project.id}: rubric[${index}] missing name`);
          }
          if (typeof criterion.weight !== 'number' || criterion.weight <= 0) {
            invalidRubrics.push(`${project.id}: rubric[${index}] invalid weight`);
          }
          if (!Array.isArray(criterion.levels) || criterion.levels.length === 0) {
            invalidRubrics.push(`${project.id}: rubric[${index}] missing levels`);
          }
        });
      });

      expect(
        invalidRubrics,
        `Found invalid rubrics:\n${invalidRubrics.join('\n')}`
      ).toHaveLength(0);
    });

    it('all rubric weights sum to approximately 100 per project', () => {
      const invalidWeights: string[] = [];

      allProjects.forEach(project => {
        if (!Array.isArray(project.rubric)) return;

        const totalWeight = project.rubric.reduce((sum, criterion) => sum + (criterion.weight || 0), 0);
        // Allow some tolerance for rounding
        if (totalWeight < 95 || totalWeight > 105) {
          invalidWeights.push(`${project.id}: rubric weights sum to ${totalWeight} (expected ~100)`);
        }
      });

      expect(
        invalidWeights,
        `Found projects with invalid rubric weight totals:\n${invalidWeights.join('\n')}`
      ).toHaveLength(0);
    });
  });

  describe('allProjects aggregation', () => {
    it('includes projects from all subjects with project definitions', () => {
      // Count subjects that have projectIds in curriculum
      const subjectsWithProjects = curriculum.filter(
        s => s.projectIds && s.projectIds.length > 0
      );

      // Get unique subject IDs from allProjects
      const subjectIdsInAllProjects = new Set(allProjects.map(p => p.subjectId));

      // Every subject with project references should have projects in allProjects
      subjectsWithProjects.forEach(subject => {
        expect(
          subjectIdsInAllProjects.has(subject.id),
          `Subject ${subject.id} has projectIds but no projects in allProjects`
        ).toBe(true);
      });
    });

    it('allProjects is not empty', () => {
      expect(allProjects.length).toBeGreaterThan(0);
    });

    it('contains expected CS projects', () => {
      // Spot-check some expected projects
      expect(projectById.has('cs101-project-1')).toBe(true);
      expect(projectById.has('cs102-project-3')).toBe(true);
      expect(projectById.has('math102-p1')).toBe(true);
    });
  });

  describe('specific fixes validation', () => {
    it('cs102 projectIds match existing projects', () => {
      const cs102 = curriculum.find(s => s.id === 'cs102');
      expect(cs102).toBeDefined();
      expect(cs102!.projectIds).toEqual(['cs102-project-3']);
      expect(projectById.has('cs102-project-3')).toBe(true);
    });

    it('math102 project is properly included in allProjects', () => {
      const math102Project = projectById.get('math102-p1');
      expect(math102Project).toBeDefined();
      expect(math102Project!.subjectId).toBe('math102');
      expect(math102Project!.title).toBe('Graph Algorithm Visualizer');
    });

    it('cs304 projectIds match existing projects', () => {
      const cs304 = curriculum.find(s => s.id === 'cs304');
      expect(cs304).toBeDefined();
      expect(cs304!.projectIds).toEqual(['cs304-project-1', 'cs304-project-2']);
      expect(projectById.has('cs304-project-1')).toBe(true);
      expect(projectById.has('cs304-project-2')).toBe(true);
    });

    it('cs305 projectIds match existing projects', () => {
      const cs305 = curriculum.find(s => s.id === 'cs305');
      expect(cs305).toBeDefined();
      expect(cs305!.projectIds).toEqual([
        'cs305-proj1-portfolio',
        'cs305-proj2-todo-app',
        'cs305-proj3-weather-dashboard',
      ]);
      expect(projectById.has('cs305-proj1-portfolio')).toBe(true);
      expect(projectById.has('cs305-proj2-todo-app')).toBe(true);
      expect(projectById.has('cs305-proj3-weather-dashboard')).toBe(true);
    });
  });
});
