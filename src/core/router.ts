// Hash-based client-side router

import type { Route, RouteParams } from './types';

type RouteHandler = (route: Route) => void;

export interface RouteDefinition {
  pattern: RegExp;
  paramNames: string[];
  template: string; // Path template like '/subject/:id/topic/:topicId'
}

export class Router {
  private handlers: RouteHandler[] = [];
  private currentRoute: Route | null = null;

  // Route patterns - template is the single source of truth for path structure
  private routes: Record<string, RouteDefinition> = {
    home: {
      pattern: /^#?\/$/,
      paramNames: [],
      template: '/',
    },
    curriculum: {
      pattern: /^#?\/curriculum$/,
      paramNames: [],
      template: '/curriculum',
    },
    subject: {
      pattern: /^#?\/subject\/([^\/]+)$/,
      paramNames: ['id'],
      template: '/subject/:id',
    },
    topic: {
      pattern: /^#?\/subject\/([^\/]+)\/topic\/([^\/]+)$/,
      paramNames: ['id', 'topicId'],
      template: '/subject/:id/topic/:topicId',
    },
    subtopic: {
      pattern: /^#?\/subject\/([^\/]+)\/topic\/([^\/]+)\/subtopic\/([^\/]+)$/,
      paramNames: ['id', 'topicId', 'subtopicSlug'],
      template: '/subject/:id/topic/:topicId/subtopic/:subtopicSlug',
    },
    quiz: {
      pattern: /^#?\/subject\/([^\/]+)\/quiz\/([^\/]+)$/,
      paramNames: ['id', 'quizId'],
      template: '/subject/:id/quiz/:quizId',
    },
    exam: {
      pattern: /^#?\/subject\/([^\/]+)\/exam\/([^\/]+)$/,
      paramNames: ['id', 'examId'],
      template: '/subject/:id/exam/:examId',
    },
    exercise: {
      pattern: /^#?\/subject\/([^\/]+)\/exercise\/([^\/]+)$/,
      paramNames: ['id', 'exId'],
      template: '/subject/:id/exercise/:exId',
    },
    project: {
      pattern: /^#?\/subject\/([^\/]+)\/project\/([^\/]+)$/,
      paramNames: ['id', 'projId'],
      template: '/subject/:id/project/:projId',
    },
    progress: {
      pattern: /^#?\/progress$/,
      paramNames: [],
      template: '/progress',
    },
    settings: {
      pattern: /^#?\/settings$/,
      paramNames: [],
      template: '/settings',
    },
    export: {
      pattern: /^#?\/export$/,
      paramNames: [],
      template: '/export',
    },
    timeline: {
      pattern: /^#?\/timeline$/,
      paramNames: [],
      template: '/timeline',
    },
    courseBuilder: {
      pattern: /^#?\/course-builder$/,
      paramNames: [],
      template: '/course-builder',
    },
  };

  constructor() {
    this.init();
  }

  /**
   * Initialize the router
   */
  private init(): void {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRouteChange());

    // Handle initial route
    this.handleRouteChange();
  }

  /**
   * Parse the current hash into a route
   */
  private parseRoute(hash: string): Route | null {
    // Default to home if no hash
    if (!hash || hash === '#' || hash === '#/') {
      return { path: '/', params: {} };
    }

    // Try to match against defined routes
    for (const [name, definition] of Object.entries(this.routes)) {
      const match = hash.match(definition.pattern);
      if (match) {
        const params: RouteParams = {};

        // Extract parameters
        definition.paramNames.forEach((paramName, index) => {
          params[paramName] = decodeURIComponent(match[index + 1]);
        });

        return {
          path: this.reconstructPath(name, params),
          params,
        };
      }
    }

    // Unknown route - redirect to home
    console.warn(`Unknown route: ${hash}`);
    return { path: '/', params: {} };
  }

  /**
   * Reconstruct the path from route name and params using the template
   */
  private reconstructPath(name: string, params: RouteParams): string {
    const route = this.routes[name];
    if (!route) {
      return '/';
    }

    // Replace :param placeholders with actual values
    return route.template.replace(/:([^/]+)/g, (_, paramName) => {
      return encodeURIComponent(params[paramName] || '');
    });
  }

  /**
   * Handle route change
   */
  private handleRouteChange(): void {
    const hash = window.location.hash;
    const route = this.parseRoute(hash);

    if (!route) return;

    this.currentRoute = route;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on route change

    // Notify all handlers
    this.handlers.forEach(handler => handler(route));
  }

  /**
   * Register a route change handler
   */
  onRouteChange(handler: RouteHandler): () => void {
    this.handlers.push(handler);

    // Call handler immediately with current route
    if (this.currentRoute) {
      handler(this.currentRoute);
    }

    // Return unsubscribe function
    return () => {
      const index = this.handlers.indexOf(handler);
      if (index > -1) {
        this.handlers.splice(index, 1);
      }
    };
  }

  /**
   * Navigate to a new route
   */
  navigate(path: string): void {
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = `#${normalizedPath}`;
  }

  /**
   * Get the current route
   */
  getCurrentRoute(): Route | null {
    return this.currentRoute;
  }

  /**
   * Check if a path matches the current route
   */
  isCurrentPath(path: string): boolean {
    return this.currentRoute?.path === path;
  }

  /**
   * Navigate back in history
   */
  back(): void {
    window.history.back();
  }

  /**
   * Navigate forward in history
   */
  forward(): void {
    window.history.forward();
  }
}

// Singleton instance
export const router = new Router();

// Convenience navigation functions
export const navigate = (path: string) => router.navigate(path);

// Helper to encode URL path segments
const encodePathSegment = (segment: string): string => encodeURIComponent(segment);

export const navigateToHome = () => navigate('/');
export const navigateToCurriculum = () => navigate('/curriculum');
export const navigateToSubject = (id: string) =>
  navigate(`/subject/${encodePathSegment(id)}`);
export const navigateToTopic = (subjectId: string, topicId: string) =>
  navigate(`/subject/${encodePathSegment(subjectId)}/topic/${encodePathSegment(topicId)}`);
export const navigateToSubtopic = (subjectId: string, topicId: string, subtopicSlug: string) =>
  navigate(`/subject/${encodePathSegment(subjectId)}/topic/${encodePathSegment(topicId)}/subtopic/${encodePathSegment(subtopicSlug)}`);
export const navigateToQuiz = (subjectId: string, quizId: string) =>
  navigate(`/subject/${encodePathSegment(subjectId)}/quiz/${encodePathSegment(quizId)}`);
export const navigateToExam = (subjectId: string, examId: string) =>
  navigate(`/subject/${encodePathSegment(subjectId)}/exam/${encodePathSegment(examId)}`);
export const navigateToExercise = (subjectId: string, exId: string) =>
  navigate(`/subject/${encodePathSegment(subjectId)}/exercise/${encodePathSegment(exId)}`);
export const navigateToProject = (subjectId: string, projId: string) =>
  navigate(`/subject/${encodePathSegment(subjectId)}/project/${encodePathSegment(projId)}`);
export const navigateToProgress = () => navigate('/progress');
export const navigateToSettings = () => navigate('/settings');
export const navigateToExport = () => navigate('/export');
export const navigateToTimeline = () => navigate('/timeline');
export const navigateToCourseBuilder = () => navigate('/course-builder');

// Export route matching utilities
export const onRouteChange = (handler: RouteHandler) => router.onRouteChange(handler);
export const getCurrentRoute = () => router.getCurrentRoute();
export const isCurrentPath = (path: string) => router.isCurrentPath(path);
