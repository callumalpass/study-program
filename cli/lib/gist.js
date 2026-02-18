import { GIST_DESCRIPTION, GIST_FILENAME } from './constants.js';

function authHeaders(token) {
  return {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };
}

function jsonHeaders(token) {
  return {
    ...authHeaders(token),
    'Content-Type': 'application/json',
  };
}

export async function validateToken(token) {
  const response = await fetch('https://api.github.com/user', {
    headers: authHeaders(token),
  });
  return response.ok;
}

export async function findProgressGist(token) {
  const response = await fetch('https://api.github.com/gists', {
    headers: authHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error (${response.status}) while listing gists`);
  }

  const gists = await response.json();
  const existing = Array.isArray(gists)
    ? gists.find((gist) => gist?.files && gist.files[GIST_FILENAME])
    : null;

  return existing ? existing.id : null;
}

export async function createProgressGist(token, progress) {
  const response = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify({
      description: GIST_DESCRIPTION,
      public: false,
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(progress, null, 2),
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error (${response.status}) while creating gist`);
  }

  const gist = await response.json();
  return gist.id;
}

export async function updateProgressGist(token, gistId, progress) {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: 'PATCH',
    headers: jsonHeaders(token),
    body: JSON.stringify({
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(progress, null, 2),
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error (${response.status}) while updating gist ${gistId}`);
  }

  return true;
}

export async function loadProgressGist(token, gistId) {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: authHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error (${response.status}) while loading gist ${gistId}`);
  }

  const gist = await response.json();
  const file = gist?.files?.[GIST_FILENAME];
  if (!file) {
    throw new Error(`gist ${gistId} does not contain ${GIST_FILENAME}`);
  }

  if (file.truncated && file.raw_url) {
    const rawResponse = await fetch(file.raw_url);
    if (!rawResponse.ok) {
      throw new Error(`failed to fetch raw gist content (${rawResponse.status})`);
    }
    return await rawResponse.json();
  }

  if (!file.content) {
    throw new Error('gist content is empty');
  }

  return JSON.parse(file.content);
}
