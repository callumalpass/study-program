# Frontend Development

## Introduction

Frontend development brings your capstone project to life in the browser, providing the interface through which users interact with your application. Modern frontend development with React, Vue, or similar frameworks emphasizes component-based architecture, declarative state management, and responsive design. While backend code runs in a controlled environment, frontend code executes in the unpredictable landscape of user browsers, devices, and network conditions.

For capstone projects, the frontend serves multiple purposes. It must be functional, allowing users to accomplish their goals efficiently. It should be usable, with intuitive navigation and clear feedback. And it must communicate effectively with your backend API, handling loading states, errors, and data synchronization. While visual polish matters, prioritize functionality and usability over pixel-perfect design. A working application with basic styling demonstrates more software engineering competency than a beautifully designed application with broken features. React has emerged as the industry standard for building interactive user interfaces, offering a component model that promotes reusability, a rich ecosystem of libraries, and strong TypeScript support.

## Component-Based Architecture

React applications are built from components—self-contained units that combine structure, behavior, and presentation. Well-designed components are reusable, composable, and maintainable. Here's how to structure components effectively:

```typescript
// src/components/TaskCard.tsx - Presentational component
import React from 'react';
import './TaskCard.css';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  status,
  priority,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const getPriorityClass = () => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className={`task-card ${getPriorityClass()}`}>
      <div className="task-header">
        <h3>{title}</h3>
        <span className={`status-badge status-${status}`}>
          {status}
        </span>
      </div>

      {description && (
        <p className="task-description">{description}</p>
      )}

      <div className="task-actions">
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={() => onEdit(id)} className="btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};
```

This component is purely presentational—it receives data through props and communicates user actions back through callback functions. This separation makes the component reusable and easy to test.

## State Management

State management determines how your application stores and updates data. React's built-in hooks provide sufficient state management for most capstone projects:

```typescript
// src/pages/TasksPage.tsx - Container component with state
import React, { useState, useEffect } from 'react';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { taskService } from '../services/task.service';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
}

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setEditingTask(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await handleUpdateTask(id, { status });
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>My Tasks</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Create Task
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Create your first task to get started!</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              {...task}
              onEdit={(id) => setEditingTask(tasks.find(t => t.id === id) || null)}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

This container component manages state and orchestrates data flow. It handles loading, error states, and coordinates between the API service and presentational components.

## Forms and User Input

Forms are critical for user interaction. Build forms that validate input, provide feedback, and handle submission gracefully:

```typescript
// src/components/TaskForm.tsx
import React, { useState } from 'react';

interface TaskFormProps {
  initialData?: {
    title: string;
    description?: string;
    priority: string;
  };
  onSubmit: (data: { title: string; description?: string; priority: string }) => Promise<void>;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium'
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority
      });
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={errors.title ? 'input-error' : ''}
          disabled={submitting}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className={errors.description ? 'input-error' : ''}
          disabled={submitting}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          disabled={submitting}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Saving...' : 'Save Task'}
        </button>
      </div>
    </form>
  );
};
```

This form handles validation, loading states, error display, and provides clear user feedback throughout the interaction.

## Key Takeaways

- Build components that are focused, reusable, and composable
- Separate presentational components (display data) from container components (manage state)
- Use TypeScript interfaces to define component props for type safety
- Handle loading, error, and empty states in your UI
- Validate user input on the client side for better UX, but always validate on the server too
- Provide clear feedback for user actions—buttons should show loading states, forms should show errors
- Keep state as local as possible—only lift state up when components need to share it
- Use semantic HTML elements for better accessibility
- Disable form controls during submission to prevent duplicate requests

## Common Mistakes

### Mistake 1: Prop Drilling Through Multiple Levels
**Problem:** Passing props through multiple component layers creates brittle, hard-to-maintain code.
**Solution:** Use React Context for data that many components need, or consider a state management library like Zustand for complex applications.

### Mistake 2: Not Handling Loading and Error States
**Problem:** Users see stale data or blank screens when API calls are in progress or fail.
**Solution:** Always track loading and error states. Show spinners during loads, error messages on failures, and empty states when there's no data.

### Mistake 3: Mutating State Directly
**Problem:** Directly modifying state objects causes React to miss updates: `tasks[0].title = 'New Title'`
**Solution:** Always create new objects or arrays when updating state: `setTasks(tasks.map(t => t.id === id ? { ...t, title: 'New Title' } : t))`

### Mistake 4: Missing Form Validation
**Problem:** Users submit invalid data, causing backend errors and poor user experience.
**Solution:** Implement client-side validation to catch errors early. Show validation errors inline next to the relevant fields.

## Summary

Frontend development for your capstone project requires balancing functionality, usability, and code quality. By building modular components, managing state effectively, handling user input carefully, and providing clear feedback, you create interfaces that are both functional and pleasant to use. Remember that frontend code is the user's first impression of your application—invest time in making it work reliably, even if the visual design is simple. A clean, functional interface demonstrates professional development practices and makes your entire project more impressive.
