// Settings page
import type { Theme, UserSettings } from '@/core/types';
import { progressStorage, resetProgress, importProgress } from '@/core/storage';
import { githubService } from '@/services/github';
import { Icons } from '@/components/icons';
import { validateGeminiApiKey } from '@/utils/gemini-eval';

/**
 * Render the settings page
 */
export function renderSettingsPage(container: HTMLElement): void {
  const settings = progressStorage.getSettings();
  const userProgress = progressStorage.getProgress();

  // Calculate some stats for the reset confirmation
  const totalSubjects = Object.keys(userProgress.subjects).length;
  const hasProgress = totalSubjects > 0;

  container.innerHTML = `
    <div class="settings-page">
      <header class="settings-header">
        <h1>Settings</h1>
        <p class="subtitle">Customize your learning experience</p>
      </header>

      <section class="settings-section">
        <h2>Appearance</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Theme</h3>
              <p>Choose your preferred color theme</p>
            </div>
            <div class="setting-control">
              <div class="theme-selector">
                <button
                  class="theme-option ${settings.theme === 'light' ? 'active' : ''}"
                  data-theme="light"
                >
                  <span class="theme-icon">${Icons.Sun}</span>
                  <span class="theme-label">Light</span>
                </button>
                <button
                  class="theme-option ${settings.theme === 'dark' ? 'active' : ''}"
                  data-theme="dark"
                >
                  <span class="theme-icon">${Icons.Moon}</span>
                  <span class="theme-label">Dark</span>
                </button>
                <button
                  class="theme-option ${settings.theme === 'auto' ? 'active' : ''}"
                  data-theme="auto"
                >
                  <span class="theme-icon">${Icons.Monitor}</span>
                  <span class="theme-label">Auto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <h2>Code Editor</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Font Size</h3>
              <p>Adjust the code editor font size</p>
            </div>
            <div class="setting-control">
              <div class="font-size-control">
                <button class="btn btn-small" id="decrease-font-btn">−</button>
                <span class="font-size-value" id="font-size-value">${settings.codeEditorFontSize}px</span>
                <button class="btn btn-small" id="increase-font-btn">+</button>
                <input
                  type="range"
                  id="font-size-slider"
                  min="10"
                  max="24"
                  value="${settings.codeEditorFontSize}"
                  class="font-size-slider"
                >
              </div>
              <div class="font-preview">
                <pre><code style="font-size: ${settings.codeEditorFontSize}px;">function example() {
  console.log("Preview");
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <h2>Display</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Show Completed Items</h3>
              <p>Display completed subjects and assessments in lists</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  id="show-completed-toggle"
                  ${settings.showCompletedItems ? 'checked' : ''}
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <h2>Cloud Sync</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>GitHub Gist Sync</h3>
              <p>Sync your progress across devices using a GitHub Gist.</p>
              <div class="help-text">
                <small>
                  1. <a href="https://github.com/settings/tokens/new?scopes=gist&description=CS+Degree+Progress" target="_blank" rel="noopener noreferrer">Generate a Personal Access Token</a> with 'gist' scope.<br>
                  2. Paste it below and click Connect.
                </small>
              </div>
            </div>
            <div class="setting-control vertical">
               <div class="input-group" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <input 
                    type="password" 
                    id="github-token-input" 
                    class="text-input" 
                    placeholder="ghp_..." 
                    value="${settings.githubToken || ''}"
                    style="flex: 1; padding: 0.5rem; border: 1px solid var(--color-border-default); border-radius: 4px; background: var(--color-bg-surface); color: var(--color-text-primary);"
                  >
                  <button id="connect-github-btn" class="btn btn-primary">
                    ${settings.githubToken ? 'Update' : 'Connect'}
                  </button>
               </div>
               <div id="github-status" class="status-message ${settings.gistId ? 'success' : ''}" style="font-size: 0.9em; color: var(--text-secondary);">
                 ${settings.gistId 
                   ? `${Icons.Check} Connected to Gist ID: ${settings.gistId.substring(0, 8)}...` 
                   : `${Icons.StatusNotStarted} Not connected`}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <h2>AI Features</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Gemini API Key</h3>
              <p>Enable AI-powered evaluation for written exercises.</p>
              <div class="help-text">
                <small>
                  1. <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Get an API key from Google AI Studio</a><br>
                  2. Paste it below and click Save.
                </small>
              </div>
            </div>
            <div class="setting-control vertical">
               <div class="input-group" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <input
                    type="password"
                    id="gemini-api-key-input"
                    class="text-input"
                    placeholder="AI..."
                    value="${settings.geminiApiKey || ''}"
                    style="flex: 1; padding: 0.5rem; border: 1px solid var(--color-border-default); border-radius: 4px; background: var(--color-bg-surface); color: var(--color-text-primary);"
                  >
                  <button id="save-gemini-key-btn" class="btn btn-primary">
                    ${settings.geminiApiKey ? 'Update' : 'Save'}
                  </button>
               </div>
               <div id="gemini-status" class="status-message ${settings.geminiApiKey ? 'success' : ''}" style="font-size: 0.9em; color: var(--text-secondary);">
                 ${settings.geminiApiKey
                   ? `${Icons.Check} API key configured`
                   : `${Icons.StatusNotStarted} Not configured`}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <h2>Progress Data</h2>
        <div class="settings-group">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Account Information</h3>
              <p>Your progress data is stored locally in your browser</p>
            </div>
            <div class="setting-stats">
              <div class="stat-row">
                <span class="stat-label">Started:</span>
                <span class="stat-value">${formatDate(userProgress.startedAt)}</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Subjects in Progress:</span>
                <span class="stat-value">${totalSubjects}</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Data Version:</span>
                <span class="stat-value">v${userProgress.version}</span>
              </div>
            </div>
          </div>

          <div class="setting-item danger-zone">
            <div class="setting-info">
              <h3>Reset Progress</h3>
              <p>Permanently delete all your progress data. This action cannot be undone.</p>
              ${hasProgress ? `
                <div class="warning-message">
                  <span class="warning-icon">${Icons.Alert}</span>
                  <span>You have progress in ${totalSubjects} subject${totalSubjects > 1 ? 's' : ''}. Consider exporting your data first.</span>
                </div>
              ` : ''}
            </div>
            <div class="setting-control">
              <button class="btn btn-danger" id="reset-progress-btn">
                Reset All Progress
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <h2>About</h2>
        <div class="settings-group">
          <div class="about-info">
            <h3>CS Degree Learning Platform</h3>
            <p>A comprehensive platform for tracking your progress through a computer science degree curriculum.</p>
            <div class="version-info">
              <span>Version 1.0.0</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="confirmation-modal" id="reset-modal" style="display: none;">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Reset All Progress?</h3>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to reset all your progress? This will permanently delete:</p>
          <ul class="reset-warning-list">
            <li>All subject progress and completions</li>
            <li>All quiz attempts and scores</li>
            <li>All exercise submissions</li>
            <li>All project submissions</li>
          </ul>
          <p class="warning-text">This action cannot be undone. Consider exporting your progress first.</p>
          <div class="confirmation-input">
            <label for="reset-confirmation">Type <strong>RESET</strong> to confirm:</label>
            <input type="text" id="reset-confirmation" placeholder="RESET" autocomplete="off">
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" id="cancel-reset-btn">Cancel</button>
          <button class="btn btn-danger" id="confirm-reset-btn" disabled>
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  `;

  attachEventListeners(container);
}

/**
 * Apply theme to the document
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  if (theme === 'auto') {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

/**
 * Update font size in the preview
 */
function updateFontSizePreview(container: HTMLElement, fontSize: number): void {
  const preview = container.querySelector('.font-preview code') as HTMLElement;
  if (preview) {
    preview.style.fontSize = `${fontSize}px`;
  }
}

/**
 * Format date for display
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Show reset confirmation modal
 */
function showResetModal(container: HTMLElement): void {
  const modal = container.querySelector('#reset-modal') as HTMLElement;
  if (modal) {
    modal.style.display = 'flex';

    // Focus the confirmation input
    const input = modal.querySelector('#reset-confirmation') as HTMLInputElement;
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }
}

/**
 * Hide reset confirmation modal
 */
function hideResetModal(container: HTMLElement): void {
  const modal = container.querySelector('#reset-modal') as HTMLElement;
  if (modal) {
    modal.style.display = 'none';

    // Clear the input
    const input = modal.querySelector('#reset-confirmation') as HTMLInputElement;
    if (input) {
      input.value = '';
    }

    // Disable confirm button
    const confirmBtn = modal.querySelector('#confirm-reset-btn') as HTMLButtonElement;
    if (confirmBtn) {
      confirmBtn.disabled = true;
    }
  }
}

/**
 * Handle reset confirmation
 */
function handleResetProgress(container: HTMLElement): void {
  resetProgress();
  hideResetModal(container);
  alert('All progress has been reset successfully.');

  // Refresh the page
  renderSettingsPage(container);
}

/**
 * Attach event listeners
 */
function attachEventListeners(container: HTMLElement): void {
  const settings = progressStorage.getSettings();

  // GitHub Sync Handlers
  const githubTokenInput = container.querySelector('#github-token-input') as HTMLInputElement;
  const connectGithubBtn = container.querySelector('#connect-github-btn') as HTMLButtonElement;
  const githubStatus = container.querySelector('#github-status') as HTMLElement;

  if (connectGithubBtn && githubTokenInput) {
    connectGithubBtn.addEventListener('click', async () => {
      const token = githubTokenInput.value.trim();
      if (!token) return;

      connectGithubBtn.disabled = true;
      const originalBtnText = connectGithubBtn.textContent;
      connectGithubBtn.textContent = 'Connecting...';
      githubStatus.textContent = 'Validating token...';
      githubStatus.style.color = 'var(--text-secondary)';

      try {
        const isValid = await githubService.validateToken(token);
        if (!isValid) {
          throw new Error('Invalid token');
        }

        githubStatus.textContent = 'Searching for existing gist...';
        let gistId = await githubService.findGist(token);
        
        if (gistId) {
           githubStatus.textContent = 'Found gist! Syncing...';
           // Load remote data
           const remoteProgress = await githubService.loadGist(token, gistId);
           if (remoteProgress) {
             // Merge remote progress with current local settings (including the token we just verified).
             // This ensures we don't accidentally pull a stale/revoked token or empty settings from the gist.
             const currentSettings = progressStorage.getSettings();
             const progressToImport = {
               ...remoteProgress,
               settings: {
                 ...currentSettings,
                 githubToken: token,
                 gistId: gistId
               }
             };

             // Import (this saves to local storage)
             importProgress(JSON.stringify(progressToImport));
             githubStatus.innerHTML = `${Icons.Check} Synced with Gist: ${gistId.substring(0, 8)}...`;
             githubStatus.style.color = 'var(--color-success)';
             
             // Refresh page to show new data/settings
             setTimeout(() => renderSettingsPage(container), 1000);
             return; 
           }
        } else {
           githubStatus.textContent = 'Creating new gist...';
           // Create new gist with current data
           // First update local settings to include token (so it's saved in the gist)
           progressStorage.updateSettings({ githubToken: token });
           const currentProgress = progressStorage.getProgress();
           
           gistId = await githubService.createGist(token, currentProgress);
           if (gistId) {
             progressStorage.updateSettings({ gistId });
             githubStatus.innerHTML = `${Icons.Check} Created Gist: ${gistId.substring(0, 8)}...`;
             githubStatus.style.color = 'var(--color-success)';
           } else {
             throw new Error('Failed to create Gist');
           }
        }
      } catch (error) {
        console.error(error);
        githubStatus.innerHTML = `${Icons.Cross} Error: ` + (error instanceof Error ? error.message : 'Unknown error');
        githubStatus.style.color = 'var(--color-error)';
      } finally {
        connectGithubBtn.disabled = false;
        connectGithubBtn.textContent = originalBtnText === 'Connect' ? 'Update' : originalBtnText;
      }
    });
  }

  // Gemini API Key Handler
  const geminiApiKeyInput = container.querySelector('#gemini-api-key-input') as HTMLInputElement;
  const saveGeminiKeyBtn = container.querySelector('#save-gemini-key-btn') as HTMLButtonElement;
  const geminiStatus = container.querySelector('#gemini-status') as HTMLElement;

  if (saveGeminiKeyBtn && geminiApiKeyInput) {
    saveGeminiKeyBtn.addEventListener('click', async () => {
      const apiKey = geminiApiKeyInput.value.trim();

      if (!apiKey) {
        // Clear the key
        progressStorage.updateSettings({ geminiApiKey: undefined });
        geminiStatus.innerHTML = `${Icons.StatusNotStarted} Not configured`;
        geminiStatus.style.color = 'var(--text-secondary)';
        saveGeminiKeyBtn.textContent = 'Save';
        return;
      }

      saveGeminiKeyBtn.disabled = true;
      const originalBtnText = saveGeminiKeyBtn.textContent;
      saveGeminiKeyBtn.textContent = 'Validating...';
      geminiStatus.textContent = 'Checking API key...';
      geminiStatus.style.color = 'var(--text-secondary)';

      try {
        const isValid = await validateGeminiApiKey(apiKey);
        if (!isValid) {
          throw new Error('Invalid API key');
        }

        progressStorage.updateSettings({ geminiApiKey: apiKey });
        geminiStatus.innerHTML = `${Icons.Check} API key configured`;
        geminiStatus.style.color = 'var(--color-success)';
        saveGeminiKeyBtn.textContent = 'Update';
      } catch (error) {
        console.error(error);
        geminiStatus.innerHTML = `${Icons.Cross} Error: ` + (error instanceof Error ? error.message : 'Invalid key');
        geminiStatus.style.color = 'var(--color-error)';
        saveGeminiKeyBtn.textContent = originalBtnText || 'Save';
      } finally {
        saveGeminiKeyBtn.disabled = false;
      }
    });
  }

  // Theme selection
  container.querySelectorAll('.theme-option').forEach(button => {
    button.addEventListener('click', () => {
      const theme = (button as HTMLElement).dataset.theme as Theme;

      // Update UI
      container.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');

      // Save setting
      progressStorage.updateSettings({ theme });

      // Apply theme
      applyTheme(theme);
    });
  });

  // Font size controls
  const fontSizeSlider = container.querySelector('#font-size-slider') as HTMLInputElement;
  const fontSizeValue = container.querySelector('#font-size-value') as HTMLElement;
  const decreaseBtn = container.querySelector('#decrease-font-btn');
  const increaseBtn = container.querySelector('#increase-font-btn');

  const updateFontSize = (size: number) => {
    const clampedSize = Math.max(10, Math.min(24, size));
    if (fontSizeSlider) fontSizeSlider.value = clampedSize.toString();
    if (fontSizeValue) fontSizeValue.textContent = `${clampedSize}px`;
    updateFontSizePreview(container, clampedSize);
    progressStorage.updateSettings({ codeEditorFontSize: clampedSize });
  };

  if (fontSizeSlider) {
    fontSizeSlider.addEventListener('input', (e) => {
      const size = parseInt((e.target as HTMLInputElement).value);
      updateFontSize(size);
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', () => {
      updateFontSize(settings.codeEditorFontSize - 1);
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener('click', () => {
      updateFontSize(settings.codeEditorFontSize + 1);
    });
  }

  // Show completed toggle
  const showCompletedToggle = container.querySelector('#show-completed-toggle') as HTMLInputElement;
  if (showCompletedToggle) {
    showCompletedToggle.addEventListener('change', (e) => {
      const checked = (e.target as HTMLInputElement).checked;
      progressStorage.updateSettings({ showCompletedItems: checked });
    });
  }

  // Reset progress button
  const resetBtn = container.querySelector('#reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      showResetModal(container);
    });
  }

  // Reset modal handlers
  const cancelResetBtn = container.querySelector('#cancel-reset-btn');
  const confirmResetBtn = container.querySelector('#confirm-reset-btn') as HTMLButtonElement;
  const resetConfirmationInput = container.querySelector('#reset-confirmation') as HTMLInputElement;
  const modalOverlay = container.querySelector('.modal-overlay');

  if (cancelResetBtn) {
    cancelResetBtn.addEventListener('click', () => {
      hideResetModal(container);
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      hideResetModal(container);
    });
  }

  if (resetConfirmationInput && confirmResetBtn) {
    resetConfirmationInput.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;
      confirmResetBtn.disabled = value !== 'RESET';
    });

    confirmResetBtn.addEventListener('click', () => {
      handleResetProgress(container);
    });
  }

  // Apply current theme on load
  applyTheme(settings.theme);
}
