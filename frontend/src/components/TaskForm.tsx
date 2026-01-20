'use client';

import { useState } from 'react';
import { apiClient } from '../services/api';
import { Task } from '../types/task';
import { useTheme } from '../contexts/ThemeContext';

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post<{data: {task: Task}} >('/tasks', {
        title,
        description,
        completed: false
      });

      onTaskCreated(response.data.task);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        borderRadius: '8px',
        backgroundColor: darkMode ? '#2d3748' : '#e3f2fd', // Changed background color - light blue in light mode, dark gray in dark mode
        boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ color: darkMode ? '#e2e8f0' : '#2d3748' }}>Create New Task</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', color: darkMode ? '#e2e8f0' : '#2d3748' }}>Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: `1px solid ${darkMode ? '#4a5568' : '#cbd5e0'}`,
              borderRadius: '4px',
              backgroundColor: darkMode ? '#4a5568' : 'white',
              color: darkMode ? 'white' : 'black',
            }}
            placeholder="Enter task title"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', color: darkMode ? '#e2e8f0' : '#2d3748' }}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: `1px solid ${darkMode ? '#4a5568' : '#cbd5e0'}`,
              borderRadius: '4px',
              backgroundColor: darkMode ? '#4a5568' : 'white',
              color: darkMode ? 'white' : 'black',
            }}
            placeholder="Enter task description"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: loading ? (darkMode ? '#718096' : '#a0aec0') : (darkMode ? '#38a169' : '#28a745'),
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}