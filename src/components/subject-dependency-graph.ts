// Mini dependency graph for subject page - shows prerequisites and dependents
import type { Subject, UserProgress } from '@/core/types';
import { navigateToSubject } from '@/core/router';

// Get theme-aware colors from CSS variables
function getThemeColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    bgSurface: style.getPropertyValue('--color-bg-surface').trim() || '#161b22',
    bgElevated: style.getPropertyValue('--color-bg-elevated').trim() || '#21262d',
    textPrimary: style.getPropertyValue('--color-text-primary').trim() || '#f0f3f6',
    textMuted: style.getPropertyValue('--color-text-muted').trim() || '#6e7681',
    borderDefault: style.getPropertyValue('--color-border-default').trim() || '#30363d',
    success: style.getPropertyValue('--color-success').trim() || '#56d364',
    accentPrimary: style.getPropertyValue('--color-accent-primary').trim() || '#58a6ff',
  };
}

interface NodeData {
  subject: Subject;
  x: number;
  y: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'current';
}

const NODE_WIDTH = 160;
const NODE_HEIGHT = 50;
const COLUMN_SPACING = 220;
const ROW_SPACING = 70;
const PADDING = 20;

export function renderSubjectDependencyGraph(
  prerequisites: Subject[],
  current: Subject,
  dependents: Subject[],
  userProgress: UserProgress
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'subject-dependency-graph';

  // Calculate layout
  const maxRows = Math.max(prerequisites.length, 1, dependents.length);
  const height = PADDING * 2 + maxRows * NODE_HEIGHT + (maxRows - 1) * (ROW_SPACING - NODE_HEIGHT);
  const width = PADDING * 2 + 3 * NODE_WIDTH + 2 * (COLUMN_SPACING - NODE_WIDTH);

  // Create nodes
  const nodes: NodeData[] = [];

  // Prerequisites (left column)
  prerequisites.forEach((subject, index) => {
    const totalHeight = prerequisites.length * NODE_HEIGHT + (prerequisites.length - 1) * (ROW_SPACING - NODE_HEIGHT);
    const startY = (height - totalHeight) / 2;
    nodes.push({
      subject,
      x: PADDING,
      y: startY + index * ROW_SPACING,
      status: getNodeStatus(subject, userProgress),
    });
  });

  // Current subject (center)
  nodes.push({
    subject: current,
    x: PADDING + COLUMN_SPACING,
    y: (height - NODE_HEIGHT) / 2,
    status: 'current',
  });

  // Dependents (right column)
  dependents.forEach((subject, index) => {
    const totalHeight = dependents.length * NODE_HEIGHT + (dependents.length - 1) * (ROW_SPACING - NODE_HEIGHT);
    const startY = (height - totalHeight) / 2;
    nodes.push({
      subject,
      x: PADDING + COLUMN_SPACING * 2,
      y: startY + index * ROW_SPACING,
      status: getNodeStatus(subject, userProgress),
    });
  });

  // Get theme colors
  const colors = getThemeColors();

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.style.display = 'block';
  svg.style.margin = '0 auto';

  // Add arrow marker definitions (theme-aware)
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <marker id="dep-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.textMuted}" />
    </marker>
    <marker id="dep-arrow-met" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="${colors.success}" />
    </marker>
  `;
  svg.appendChild(defs);

  // Draw edges first (behind nodes)
  const currentNode = nodes.find(n => n.status === 'current')!;

  // Edges from prerequisites to current
  prerequisites.forEach((prereq, index) => {
    const prereqNode = nodes[index];
    const isMet = userProgress.subjects[prereq.id]?.status === 'completed';
    drawEdge(svg, prereqNode, currentNode, isMet, colors);
  });

  // Edges from current to dependents
  dependents.forEach((dep, index) => {
    const depNode = nodes[prerequisites.length + 1 + index];
    const currentCompleted = userProgress.subjects[current.id]?.status === 'completed';
    drawEdge(svg, currentNode, depNode, currentCompleted, colors);
  });

  // Draw nodes
  nodes.forEach(node => {
    drawNode(svg, node, colors);
  });

  container.appendChild(svg);

  return container;
}

function getNodeStatus(subject: Subject, userProgress: UserProgress): NodeData['status'] {
  const progress = userProgress.subjects[subject.id];
  if (progress?.status === 'completed') return 'completed';
  if (progress?.status === 'in_progress') return 'in-progress';
  return 'not-started';
}

function drawEdge(svg: SVGSVGElement, from: NodeData, to: NodeData, isMet: boolean, colors: ReturnType<typeof getThemeColors>): void {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  const startX = from.x + NODE_WIDTH;
  const startY = from.y + NODE_HEIGHT / 2;
  const endX = to.x;
  const endY = to.y + NODE_HEIGHT / 2;

  // Bezier curve
  const controlOffset = (endX - startX) / 2;
  const d = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;

  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', isMet ? colors.success : colors.borderDefault);
  path.setAttribute('stroke-width', '2');
  path.setAttribute('marker-end', isMet ? 'url(#dep-arrow-met)' : 'url(#dep-arrow)');

  svg.appendChild(path);
}

function drawNode(svg: SVGSVGElement, node: NodeData, colors: ReturnType<typeof getThemeColors>): void {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.style.cursor = node.status !== 'current' ? 'pointer' : 'default';

  // Determine colors based on status (theme-aware)
  let strokeColor = colors.borderDefault;
  let fillColor = colors.bgSurface;
  let textColor = colors.textPrimary;

  switch (node.status) {
    case 'current':
      strokeColor = '#8b5cf6'; // Purple for current
      fillColor = colors.bgElevated;
      break;
    case 'completed':
      strokeColor = colors.success;
      fillColor = colors.bgElevated;
      break;
    case 'in-progress':
      strokeColor = colors.accentPrimary;
      fillColor = colors.bgElevated;
      break;
    case 'not-started':
      strokeColor = colors.textMuted;
      fillColor = colors.bgSurface;
      break;
  }

  // Rectangle
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', `${node.x}`);
  rect.setAttribute('y', `${node.y}`);
  rect.setAttribute('width', `${NODE_WIDTH}`);
  rect.setAttribute('height', `${NODE_HEIGHT}`);
  rect.setAttribute('rx', '12');
  rect.setAttribute('fill', fillColor);
  rect.setAttribute('stroke', strokeColor);
  rect.setAttribute('stroke-width', node.status === 'current' ? '3' : '2');

  // Subject code
  const textCode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textCode.setAttribute('x', `${node.x + NODE_WIDTH / 2}`);
  textCode.setAttribute('y', `${node.y + 22}`);
  textCode.setAttribute('fill', textColor);
  textCode.setAttribute('font-family', 'JetBrains Mono, monospace');
  textCode.setAttribute('font-size', '12px');
  textCode.setAttribute('font-weight', '600');
  textCode.setAttribute('text-anchor', 'middle');
  textCode.textContent = node.subject.code;

  // Subject title (truncated)
  const textTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textTitle.setAttribute('x', `${node.x + NODE_WIDTH / 2}`);
  textTitle.setAttribute('y', `${node.y + 38}`);
  textTitle.setAttribute('fill', textColor);
  textTitle.setAttribute('font-family', 'Inter, sans-serif');
  textTitle.setAttribute('font-size', '11px');
  textTitle.setAttribute('text-anchor', 'middle');
  textTitle.setAttribute('opacity', '0.8');
  textTitle.textContent = truncate(node.subject.title, 18);

  g.appendChild(rect);
  g.appendChild(textCode);
  g.appendChild(textTitle);

  // Click handler (all nodes except current)
  if (node.status !== 'current') {
    g.style.cursor = 'pointer';
    g.addEventListener('click', () => navigateToSubject(node.subject.id));
    g.addEventListener('mouseenter', () => {
      rect.setAttribute('stroke-width', '3');
    });
    g.addEventListener('mouseleave', () => {
      rect.setAttribute('stroke-width', node.status === 'current' ? '3' : '2');
    });
  }

  svg.appendChild(g);
}

function truncate(str: string, n: number): string {
  return str.length > n ? str.substring(0, n - 1) + '…' : str;
}
