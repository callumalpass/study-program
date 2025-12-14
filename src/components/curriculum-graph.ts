import type { Subject } from '@/core/types';
import { arePrerequisitesMet } from '@/core/progress';
import { navigateToSubject } from '@/core/router';

interface Point {
  x: number;
  y: number;
}

interface Node extends Subject {
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
  status: 'locked' | 'not-started' | 'in-progress' | 'completed';
}

interface Edge {
  source: string;
  target: string;
  element: SVGPathElement;
}

export class CurriculumGraph {
  private container: HTMLElement;
  private subjects: Subject[];
  private userProgress: any;
  private nodes: Map<string, Node> = new Map();
  private svg: SVGSVGElement | null = null;
  
  // Storage for interactivity
  private nodeElements: Map<string, SVGGElement> = new Map();
  private edgeElements: Edge[] = [];
  
  // Configuration
  private readonly NODE_WIDTH = 180;
  private readonly NODE_HEIGHT = 60;
  private readonly LEVEL_SPACING = 250; // Horizontal spacing
  private readonly NODE_SPACING = 100; // Vertical spacing
  private readonly PADDING = 50;

  constructor(subjects: Subject[], userProgress: any) {
    this.subjects = subjects;
    this.userProgress = userProgress;
    this.container = document.createElement('div');
    this.container.className = 'curriculum-graph-container';
    this.container.style.overflow = 'auto';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    
    this.calculateLayout();
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    
    // Calculate SVG dimensions
    const maxX = Math.max(...Array.from(this.nodes.values()).map(n => n.x + n.width)) + this.PADDING;
    const maxY = Math.max(...Array.from(this.nodes.values()).map(n => n.y + n.height)) + this.PADDING;

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', `${maxX}`);
    this.svg.setAttribute('height', `${maxY}`);
    this.svg.style.minWidth = '100%';
    
    // Add definitions for arrow markers
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
      refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
      <marker id="arrowhead-met" markerWidth="10" markerHeight="7" 
      refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
      </marker>
      <marker id="arrowhead-highlight" markerWidth="10" markerHeight="7" 
      refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    `;
    this.svg.appendChild(defs);

    // Draw edges first (so they are behind nodes)
    this.drawEdges();
    
    // Draw nodes
    this.drawNodes();

    this.container.appendChild(this.svg);
    return this.container;
  }

  private calculateLayout(): void {
    // 1. Calculate levels (longest path from source)
    const levels = new Map<string, number>();
    const processing = new Set<string>();

    const getLevel = (subjectId: string): number => {
      if (levels.has(subjectId)) return levels.get(subjectId)!;
      if (processing.has(subjectId)) return 0; // Cycle detected
      
      processing.add(subjectId);
      
      const subject = this.subjects.find(s => s.id === subjectId);
      if (!subject || subject.prerequisites.length === 0) {
        levels.set(subjectId, 0);
        processing.delete(subjectId);
        return 0;
      }

      const maxPrereqLevel = Math.max(...subject.prerequisites.map(p => getLevel(p)));
      const level = maxPrereqLevel + 1;
      
      levels.set(subjectId, level);
      processing.delete(subjectId);
      return level;
    };

    this.subjects.forEach(s => getLevel(s.id));

    // 2. Group by level
    const levelGroups = new Map<number, Subject[]>();
    this.subjects.forEach(s => {
      const level = levels.get(s.id)!;
      if (!levelGroups.has(level)) levelGroups.set(level, []);
      levelGroups.get(level)!.push(s);
    });

    // 3. Assign coordinates
    levelGroups.forEach((subjectsInLevel, level) => {
      subjectsInLevel.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.semester - b.semester;
      });

      subjectsInLevel.forEach((subject, index) => {
        const x = this.PADDING + level * (this.NODE_WIDTH + this.LEVEL_SPACING);
        const y = this.PADDING + index * (this.NODE_HEIGHT + this.NODE_SPACING);

        const progress = this.userProgress.subjects[subject.id];
        let status: Node['status'] = 'locked';
        
        if (arePrerequisitesMet(subject, this.userProgress)) {
           status = 'not-started';
           if (progress) {
             status = progress.status === 'completed' ? 'completed' : 'in-progress';
           }
        }

        this.nodes.set(subject.id, {
          ...subject,
          x,
          y,
          width: this.NODE_WIDTH,
          height: this.NODE_HEIGHT,
          level,
          status
        });
      });
    });
  }

  private drawEdges(): void {
    this.edgeElements = [];

    this.subjects.forEach(subject => {
      const targetNode = this.nodes.get(subject.id)!;
      
      subject.prerequisites.forEach(prereqId => {
        const sourceNode = this.nodes.get(prereqId);
        if (!sourceNode) return;

        const start = { 
          x: sourceNode.x + sourceNode.width, 
          y: sourceNode.y + sourceNode.height / 2 
        };
        const end = { 
          x: targetNode.x, 
          y: targetNode.y + targetNode.height / 2 
        };

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Cubic Bezier Curve
        const controlPointOffset = (end.x - start.x) / 2;
        const cp1 = { x: start.x + controlPointOffset, y: start.y };
        const cp2 = { x: end.x - controlPointOffset, y: end.y };
        
        const d = `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
        
        const isMet = sourceNode.status === 'completed';
        const strokeColor = isMet ? '#10b981' : '#cbd5e1';

        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', strokeColor);
        path.setAttribute('stroke-width', '2');
        path.setAttribute('marker-end', isMet ? 'url(#arrowhead-met)' : 'url(#arrowhead)');
        path.dataset.originalStroke = strokeColor;
        path.dataset.originalMarker = isMet ? 'url(#arrowhead-met)' : 'url(#arrowhead)';
        
        // Styles for smooth transitions
        path.style.transition = 'opacity 0.2s ease, stroke-width 0.2s ease, stroke 0.2s ease';
        
        this.svg?.appendChild(path);
        
        this.edgeElements.push({
          source: prereqId,
          target: subject.id,
          element: path
        });
      });
    });
  }

  private drawNodes(): void {
    this.nodeElements.clear();

    this.nodes.forEach(node => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';
      g.style.transition = 'opacity 0.2s ease';
      
      // Determine colors based on status
      let strokeColor = '#cbd5e1';
      let fillColor = '#ffffff';
      let textColor = '#1e293b';

      if (node.status === 'completed') {
        strokeColor = '#10b981'; // Green
        fillColor = '#ecfdf5';
      } else if (node.status === 'in-progress') {
        strokeColor = '#3b82f6'; // Blue
        fillColor = '#eff6ff';
      } else if (node.status === 'locked') {
        strokeColor = '#e2e8f0';
        fillColor = '#f8fafc';
        textColor = '#94a3b8';
      } else {
        // Not started but available
        strokeColor = '#94a3b8';
      }

      // Rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', `${node.x}`);
      rect.setAttribute('y', `${node.y}`);
      rect.setAttribute('width', `${node.width}`);
      rect.setAttribute('height', `${node.height}`);
      rect.setAttribute('rx', '8');
      rect.setAttribute('fill', fillColor);
      rect.setAttribute('stroke', strokeColor);
      rect.setAttribute('stroke-width', '2');
      
      // Text (Title)
      const textTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textTitle.setAttribute('x', `${node.x + 10}`);
      textTitle.setAttribute('y', `${node.y + 25}`);
      textTitle.setAttribute('fill', textColor);
      textTitle.setAttribute('font-family', 'Inter, sans-serif');
      textTitle.setAttribute('font-weight', '600');
      textTitle.setAttribute('font-size', '14px');
      textTitle.textContent = this.truncate(node.title, 20);

      // Text (Code)
      const textCode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textCode.setAttribute('x', `${node.x + 10}`);
      textCode.setAttribute('y', `${node.y + 45}`);
      textCode.setAttribute('fill', textColor);
      textCode.setAttribute('font-family', 'JetBrains Mono, monospace');
      textCode.setAttribute('font-size', '12px');
      textCode.setAttribute('opacity', '0.8');
      textCode.textContent = node.code;
      
      g.appendChild(rect);
      g.appendChild(textTitle);
      g.appendChild(textCode);
      
      // Event Listeners
      g.addEventListener('click', () => {
         if (node.status !== 'locked') {
           navigateToSubject(node.id);
         }
      });
      
      g.addEventListener('mouseenter', () => this.highlightConnections(node.id));
      g.addEventListener('mouseleave', () => this.resetHighlights());

      this.nodeElements.set(node.id, g);
      this.svg?.appendChild(g);
    });
  }

  // --- Interaction Logic ---

  private highlightConnections(subjectId: string): void {
    const ancestors = this.getAncestors(subjectId);
    const descendants = this.getDescendants(subjectId);
    
    // The relevant set of nodes includes the subject itself plus all connected nodes
    const relevantNodes = new Set([...ancestors, ...descendants]);

    // Dim all nodes first
    this.nodeElements.forEach(el => el.style.opacity = '0.2');
    
    // Highlight relevant nodes
    relevantNodes.forEach(id => {
      const el = this.nodeElements.get(id);
      if (el) el.style.opacity = '1';
    });

    // Handle edges
    this.edgeElements.forEach(edge => {
      // An edge is relevant if both its source and target are in the relevant set
      if (relevantNodes.has(edge.source) && relevantNodes.has(edge.target)) {
        edge.element.style.opacity = '1';
        edge.element.setAttribute('stroke', '#3b82f6'); // Highlight blue
        edge.element.setAttribute('stroke-width', '3');
        edge.element.setAttribute('marker-end', 'url(#arrowhead-highlight)');
        // Ensure highlighted edges are on top
        if(edge.element.parentNode) {
            edge.element.parentNode.appendChild(edge.element);
        }
      } else {
        edge.element.style.opacity = '0.1';
        edge.element.setAttribute('stroke', edge.element.dataset.originalStroke || '#cbd5e1');
        edge.element.setAttribute('stroke-width', '2');
        edge.element.setAttribute('marker-end', edge.element.dataset.originalMarker || 'url(#arrowhead)');
      }
    });

    // Move highlighted nodes to front so they aren't obscured by faded edges
    relevantNodes.forEach(id => {
        const el = this.nodeElements.get(id);
        if (el && el.parentNode) {
            el.parentNode.appendChild(el);
        }
    });
  }

  private resetHighlights(): void {
    // Reset nodes
    this.nodeElements.forEach(el => {
        el.style.opacity = '1';
    });

    // Reset edges
    this.edgeElements.forEach(edge => {
      edge.element.style.opacity = '1';
      edge.element.setAttribute('stroke', edge.element.dataset.originalStroke || '#cbd5e1');
      edge.element.setAttribute('stroke-width', '2');
      edge.element.setAttribute('marker-end', edge.element.dataset.originalMarker || 'url(#arrowhead)');
    });
  }

  // Helper to get all prerequisite IDs recursively
  private getAncestors(id: string, visited = new Set<string>()): Set<string> {
    if (visited.has(id)) return visited;
    visited.add(id);
    
    this.edgeElements
      .filter(e => e.target === id)
      .forEach(e => this.getAncestors(e.source, visited));
      
    return visited;
  }

  // Helper to get all dependent IDs recursively
  private getDescendants(id: string, visited = new Set<string>()): Set<string> {
    if (visited.has(id)) return visited;
    visited.add(id);
    
    this.edgeElements
      .filter(e => e.source === id)
      .forEach(e => this.getDescendants(e.target, visited));
      
    return visited;
  }

  private truncate(str: string, n: number){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  }
}