import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { ensureLearnerHome } from './learner-core.js';

export function activePlanPath(learnerHome) {
  return path.join(learnerHome, 'plans', 'active.yaml');
}

function fullTrack(graph) {
  return graph.tracks.find((track) => track.id === 'full-cs-degree') || graph.tracks[0] || null;
}

export function defaultActivePlan(graph) {
  const track = fullTrack(graph);
  return {
    id: track ? `${track.id}-plan` : 'default-plan',
    title: track ? track.title : 'Default Plan',
    extends: track ? [track.id] : [],
    enabledPacks: graph.packs.map((pack) => pack.id),
    insertions: [],
    focus: {
      conceptTags: [],
    },
    generatedBy: 'stup',
  };
}

export function loadActivePlan(learnerHome, graph, options = {}) {
  ensureLearnerHome(learnerHome);
  const filePath = activePlanPath(learnerHome);
  if (fs.existsSync(filePath)) {
    const parsed = parseYaml(fs.readFileSync(filePath, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : defaultActivePlan(graph);
  }

  const plan = defaultActivePlan(graph);
  if (options.writeDefault) {
    saveActivePlan(learnerHome, plan);
  }
  return plan;
}

export function saveActivePlan(learnerHome, plan) {
  ensureLearnerHome(learnerHome);
  fs.writeFileSync(activePlanPath(learnerHome), stringifyYaml(plan), 'utf8');
  return plan;
}

function issue(severity, code, message, id) {
  return { severity, code, message, id };
}

export function validatePlan(plan, graph) {
  const issues = [];
  if (!plan || typeof plan !== 'object') {
    issues.push(issue('error', 'plan.invalid', 'Plan must be a YAML object'));
  } else {
    if (!plan.id) issues.push(issue('error', 'plan.missing_id', 'Plan must define id'));
    if (!plan.title) issues.push(issue('error', 'plan.missing_title', 'Plan must define title', plan.id));

    const packIds = new Set(graph.packs.map((pack) => pack.id));
    for (const packId of Array.isArray(plan.enabledPacks) ? plan.enabledPacks : []) {
      if (!packIds.has(packId)) {
        issues.push(issue('error', 'plan.missing_pack', `Plan references missing enabled pack ${packId}`, plan.id));
      }
    }

    const trackIds = new Set(graph.tracks.map((track) => track.id));
    for (const trackId of Array.isArray(plan.extends) ? plan.extends : []) {
      if (!trackIds.has(trackId)) {
        issues.push(issue('error', 'plan.missing_track', `Plan extends missing track ${trackId}`, plan.id));
      }
    }

    const subjectIds = new Set(graph.subjects.map((subject) => subject.id));
    for (const insertion of Array.isArray(plan.insertions) ? plan.insertions : []) {
      if (insertion.subject && !subjectIds.has(insertion.subject)) {
        issues.push(issue('error', 'plan.missing_subject', `Plan inserts missing subject ${insertion.subject}`, plan.id));
      }
      if (insertion.before && !subjectIds.has(insertion.before)) {
        issues.push(issue('error', 'plan.missing_before_subject', `Plan insertion references missing target ${insertion.before}`, plan.id));
      }
    }

    const conceptIds = new Set(Object.keys(graph.concepts || {}));
    if (conceptIds.size > 0) {
      for (const conceptId of Array.isArray(plan.focus?.conceptTags) ? plan.focus.conceptTags : []) {
        if (!conceptIds.has(conceptId)) {
          issues.push(issue('error', 'plan.missing_concept', `Plan focuses missing concept ${conceptId}`, plan.id));
        }
      }
    }
  }

  const errors = issues.filter((item) => item.severity === 'error');
  return {
    ok: errors.length === 0,
    errors,
    warnings: issues.filter((item) => item.severity === 'warning'),
    issues,
  };
}

export function setActivePlanFromTrack(learnerHome, graph, trackOrPlanId) {
  const track = graph.tracks.find((item) => item.id === trackOrPlanId);
  if (!track) {
    throw new Error(`track or plan not found: ${trackOrPlanId}`);
  }
  return saveActivePlan(learnerHome, {
    id: `${track.id}-plan`,
    title: `${track.title} Plan`,
    extends: [track.id],
    enabledPacks: graph.packs.map((pack) => pack.id),
    insertions: [],
    focus: {
      conceptTags: [],
    },
    generatedBy: 'stup',
  });
}
