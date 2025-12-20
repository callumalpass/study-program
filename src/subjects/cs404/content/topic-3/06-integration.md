# Frontend-Backend Integration

## Introduction

Integration is the critical phase where your frontend and backend components unite into a cohesive, functional application. This involves establishing communication protocols, managing data flow, handling asynchronous operations, and ensuring seamless interaction between the client and server. While frontend and backend development can proceed somewhat independently, integration reveals whether your API design is practical, whether your error handling is comprehensive, and whether your application actually works as a complete system.

Proper integration transforms separate codebases into a unified application. It requires careful attention to API communication patterns, state synchronization, error propagation, loading states, and data consistency. Many seemingly minor issues—CORS configurations, authentication token handling, request/response formatting—become apparent only during integration. For capstone projects, integration often consumes more time than anticipated, making it essential to start early and test frequently. A well-integrated application feels responsive and reliable, while poor integration results in inconsistent behavior, confusing error messages, and frustrated users.

## Setting Up API Communication

Modern frontend applications communicate with backends through HTTP APIs. Organize your API calls into service modules that encapsulate communication logic:

```typescript
// src/services/api.client.ts - Base API client configuration
import axios, { AxiosInstance, AxiosError } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor - add auth token to requests
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle common errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }

        if (error.response?.status === 403) {
          console.error('Forbidden: You do not have permission to access this resource');
        }

        if (error.response?.status >= 500) {
          console.error('Server error:', error.response.data);
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();
```

This centralized API client handles authentication, error handling, and provides a consistent interface for all API calls.

## Implementing Feature-Specific Services

Build service modules for each feature domain that use the API client:

```typescript
// src/services/task.service.ts
import { apiClient } from './api.client';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

class TaskService {
  private basePath = '/tasks';

  async getTasks(): Promise<Task[]> {
    try {
      const response = await apiClient.get<{ tasks: Task[] }>(this.basePath);
      return response.tasks;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw new Error('Unable to load tasks. Please try again later.');
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await apiClient.get<{ task: Task }>(`${this.basePath}/${id}`);
      return response.task;
    } catch (error) {
      console.error(`Failed to fetch task ${id}:`, error);
      throw new Error('Unable to load task. Please try again later.');
    }
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    try {
      const response = await apiClient.post<{ task: Task }>(this.basePath, data);
      return response.task;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to create task. Please try again.';
      throw new Error(message);
    }
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    try {
      const response = await apiClient.patch<{ task: Task }>(`${this.basePath}/${id}`, data);
      return response.task;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to update task. Please try again.';
      throw new Error(message);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.basePath}/${id}`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to delete task. Please try again.';
      throw new Error(message);
    }
  }

  async getTaskStats(): Promise<TaskStats> {
    try {
      const response = await apiClient.get<{ stats: TaskStats }>(`${this.basePath}/stats`);
      return response.stats;
    } catch (error) {
      console.error('Failed to fetch task statistics:', error);
      throw new Error('Unable to load statistics. Please try again later.');
    }
  }
}

export const taskService = new TaskService();
```

This service layer provides a clean, type-safe interface for components to interact with the API. It handles errors gracefully and provides meaningful error messages.

## Managing Data Flow and State Synchronization

Complex components need to coordinate multiple API calls and synchronize state:

```typescript
// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { taskService, Task, TaskStats } from '../services/task.service';
import { TaskList } from '../components/TaskList';
import { StatsCard } from '../components/StatsCard';

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load initial data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load tasks and stats in parallel
      const [tasksData, statsData] = await Promise.all([
        taskService.getTasks(),
        taskService.getTaskStats()
      ]);

      setTasks(tasksData);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleTaskUpdate = async (id: string, updates: any) => {
    try {
      // Optimistic update - update UI immediately
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, ...updates } : task
        )
      );

      // Make API call
      const updatedTask = await taskService.updateTask(id, updates);

      // Update with server response
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? updatedTask : task
        )
      );

      // Refresh stats
      const newStats = await taskService.getTaskStats();
      setStats(newStats);
    } catch (err: any) {
      // Revert optimistic update on error
      await loadDashboardData();
      setError(err.message);
    }
  };

  const handleTaskDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      // Optimistic delete
      const taskToDelete = tasks.find(t => t.id === id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

      await taskService.deleteTask(id);

      // Refresh stats
      const newStats = await taskService.getTaskStats();
      setStats(newStats);
    } catch (err: any) {
      // Revert on error
      await loadDashboardData();
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <button onClick={loadDashboardData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="btn-refresh"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {stats && (
        <div className="stats-grid">
          <StatsCard label="Total Tasks" value={stats.total} />
          <StatsCard label="Pending" value={stats.pending} color="yellow" />
          <StatsCard label="In Progress" value={stats.inProgress} color="blue" />
          <StatsCard label="Completed" value={stats.completed} color="green" />
        </div>
      )}

      <TaskList
        tasks={tasks}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
      />
    </div>
  );
};
```

This component demonstrates several integration patterns: parallel API calls for efficiency, optimistic updates for responsive UX, error recovery, and state synchronization across multiple data sources.

## Handling CORS and Environment Configuration

Cross-Origin Resource Sharing (CORS) issues are common during integration. Configure your backend to allow frontend requests:

```typescript
// Backend: CORS configuration in Express
import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

```typescript
// Frontend: Environment configuration (.env.development)
VITE_API_URL=http://localhost:3000/api

// Frontend: Environment configuration (.env.production)
VITE_API_URL=https://api.yourapp.com/api
```

Use environment variables to configure different API endpoints for development and production.

## Key Takeaways

- Centralize API communication in a base client with interceptors for authentication and error handling
- Create feature-specific service modules that provide clean, type-safe APIs for components
- Handle loading states, errors, and empty states consistently across your application
- Use optimistic updates for better perceived performance, but revert on errors
- Load data in parallel when operations are independent to reduce latency
- Configure CORS properly on your backend to allow frontend requests
- Use environment variables to manage different configurations for development and production
- Implement retry logic for transient failures
- Provide meaningful error messages to users, not raw error details

## Common Mistakes

### Mistake 1: Hardcoding API URLs
**Problem:** Hardcoded URLs make it difficult to switch between development, staging, and production environments.
**Solution:** Use environment variables to configure API URLs. Access them through `import.meta.env` in Vite or `process.env` in Create React App.

### Mistake 2: Not Handling Network Failures
**Problem:** Network issues cause the application to hang or crash with unhelpful error messages.
**Solution:** Implement timeout configurations, retry logic for transient failures, and clear error messages that guide users on next steps.

### Mistake 3: Exposing Sensitive Data in Frontend
**Problem:** Including API keys, secrets, or sensitive business logic in frontend code exposes them to users.
**Solution:** All sensitive operations must happen on the backend. Frontend code is public—treat it accordingly.

### Mistake 4: Inconsistent Error Handling
**Problem:** Different API calls handle errors differently, creating unpredictable user experiences.
**Solution:** Use interceptors to handle common error scenarios centrally. Create consistent error handling patterns in service modules.

## Summary

Frontend-backend integration transforms independent components into a unified application. By establishing clean communication patterns, handling errors gracefully, managing state synchronization carefully, and configuring environments properly, you create an application that feels cohesive and reliable. Integration reveals design flaws early—embrace this feedback and refine your approach. Remember that integration isn't a one-time task; it's an ongoing process throughout development. Test integration frequently, handle edge cases thoughtfully, and provide clear feedback to users when things go wrong. A well-integrated application is greater than the sum of its parts.
