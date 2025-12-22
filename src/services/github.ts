import { UserProgress } from '../core/types';

const GIST_FILENAME = 'cs-degree-progress.json';
const GIST_DESCRIPTION = 'CS Degree Learning Platform Progress';

/**
 * Minimal type for GitHub Gist API response.
 * Only includes fields actually used by this service.
 * See: https://docs.github.com/en/rest/gists/gists
 */
interface GitHubGist {
  id: string;
  files: Record<string, { filename: string; content?: string }>;
}

export class GitHubService {
  /**
   * Validate the personal access token by fetching the user profile
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error validating GitHub token:', error);
      return false;
    }
  }

  /**
   * Find an existing gist for the app
   */
  async findGist(token: string): Promise<string | null> {
    try {
      const response = await fetch('https://api.github.com/gists', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) return null;

      const gists: GitHubGist[] = await response.json();
      const existingGist = gists.find((gist) =>
        gist.files && gist.files[GIST_FILENAME]
      );

      return existingGist ? existingGist.id : null;
    } catch (error) {
      console.error('Error finding gist:', error);
      return null;
    }
  }

  /**
   * Create a new gist with the current progress
   */
  async createGist(token: string, progress: UserProgress): Promise<string | null> {
    try {
      const { settings, ...progressToSave } = progress; // Exclude settings
      const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: GIST_DESCRIPTION,
          public: false, // Private gist
          files: {
            [GIST_FILENAME]: {
              content: JSON.stringify(progressToSave, null, 2),
            },
          },
        }),
      });

      if (!response.ok) return null;

      const gist = await response.json();
      return gist.id;
    } catch (error) {
      console.error('Error creating gist:', error);
      return null;
    }
  }

  /**
   * Update an existing gist
   */
  async updateGist(token: string, gistId: string, progress: UserProgress): Promise<boolean> {
    try {
      const { settings, ...progressToSave } = progress; // Exclude settings
      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: {
            [GIST_FILENAME]: {
              content: JSON.stringify(progressToSave, null, 2),
            },
          },
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating gist:', error);
      return false;
    }
  }

  /**
   * Load progress from gist
   */
  async loadGist(token: string, gistId: string): Promise<UserProgress | null> {
    try {
      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) return null;

      const gist = await response.json();
      const file = gist.files[GIST_FILENAME];

      if (!file || !file.content) return null;

      // Determine if content is truncated (GitHub API truncates large files)
      if (file.truncated) {
        // Fetch raw content
        const rawResponse = await fetch(file.raw_url);
        if (!rawResponse.ok) return null;
        return await rawResponse.json();
      }

      return JSON.parse(file.content);
    } catch (error) {
      console.error('Error loading gist:', error);
      return null;
    }
  }
}

export const githubService = new GitHubService();
