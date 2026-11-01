import React, { useState } from 'react';

/**
 * Task 2: Task Manager
 * Location: src/components/TaskManager.jsx
 * Theme & Context: VoltSense AI - EV Battery Diagnostics & Maintenance Task Manager
 */
export default function TaskManager() {
  const initialTasks = [
    { id: 1, text: 'Inspect cell temperature sensors on Pack #EV-8842', completed: false },
    { id: 2, text: 'Perform coolant pump flow rate calibration', completed: true },
    { id: 3, text: 'Run automated high-voltage isolation test', completed: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [taskInput, setTaskInput] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  // 1. Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmed = taskInput.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskInput('');
  };

  // 3. Mark task as complete / toggle completion
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 4. Toggle visibility of completed tasks
  const handleToggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  // 5. Reset the task list
  const handleResetTasks = () => {
    setTasks([]);
  };

  // Filter tasks based on completed visibility
  const displayedTasks = tasks.filter((task) => {
    if (!showCompleted && task.completed) return false;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>⚡ Battery Diagnostic Task Manager</h2>
          <p style={styles.subtitle}>
            VoltSense AI Pack Maintenance & Telemetry Action Items
          </p>
        </div>
        <div style={styles.badge}>
          {completedCount} / {tasks.length} Completed
        </div>
      </div>

      {/* 1. Input field to add a new task */}
      <form onSubmit={handleAddTask} style={styles.formRow}>
        <input
          type="text"
          placeholder="e.g. Calibrate thermal runaway sensor #4..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.btnAdd}>
          Add Task
        </button>
      </form>

      {/* Control Buttons (4: Toggle visibility of completed tasks, 5: Reset task list) */}
      <div style={styles.controlsRow}>
        <button
          type="button"
          onClick={handleToggleShowCompleted}
          style={styles.btnToggle}
        >
          {showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
        </button>

        <button
          type="button"
          onClick={handleResetTasks}
          style={styles.btnReset}
        >
          Reset Task List
        </button>
      </div>

      {/* 2. List to display added tasks */}
      <div style={styles.taskList}>
        {displayedTasks.length === 0 ? (
          <div style={styles.emptyState}>
            {tasks.length === 0
              ? 'No diagnostic tasks active. Add a new task above!'
              : 'All completed tasks are currently hidden.'}
          </div>
        ) : (
          displayedTasks.map((task) => (
            <div
              key={task.id}
              style={{
                ...styles.taskCard,
                ...(task.completed ? styles.taskCardCompleted : {}),
              }}
            >
              <div style={styles.taskTextWrapper}>
                <span
                  style={{
                    ...styles.taskText,
                    ...(task.completed ? styles.taskTextCompleted : {}),
                  }}
                >
                  {task.text}
                </span>
                {task.completed && (
                  <span style={styles.completedTag}>COMPLETED</span>
                )}
              </div>

              {/* 3. Button to mark tasks as complete */}
              <button
                type="button"
                onClick={() => handleToggleComplete(task.id)}
                style={task.completed ? styles.btnUndo : styles.btnComplete}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// VoltSense AI themed styles
const styles = {
  container: {
    maxWidth: '680px',
    margin: '30px auto',
    padding: '24px',
    backgroundColor: '#0a0f1d',
    color: '#e2e8f0',
    borderRadius: '12px',
    border: '1px solid #1e293b',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: {
    margin: 0,
    fontSize: '1.4rem',
    color: '#00f2fe',
    fontWeight: 600,
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  badge: {
    padding: '6px 14px',
    borderRadius: '20px',
    backgroundColor: '#1e293b',
    border: '1px solid #4facfe',
    color: '#00f2fe',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  formRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
  },
  input: {
    flex: 1,
    padding: '11px 16px',
    backgroundColor: '#111827',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btnAdd: {
    padding: '11px 22px',
    backgroundColor: '#00f2fe',
    backgroundImage: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#0a0f1d',
    fontWeight: 600,
    fontSize: '0.92rem',
    cursor: 'pointer',
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  btnToggle: {
    padding: '8px 16px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    color: '#cbd5e1',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  btnReset: {
    padding: '8px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #ef4444',
    color: '#fca5a5',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  taskCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    backgroundColor: '#111827',
    border: '1px solid #1f2937',
    borderRadius: '8px',
    gap: '12px',
  },
  taskCardCompleted: {
    backgroundColor: '#0d1322',
    border: '1px solid #1e293b',
    opacity: 0.75,
  },
  taskTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    flexWrap: 'wrap',
  },
  taskText: {
    fontSize: '0.95rem',
    color: '#f1f5f9',
  },
  taskTextCompleted: {
    textDecoration: 'line-through',
    color: '#64748b',
  },
  completedTag: {
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#34d399',
    border: '1px solid #10b981',
  },
  btnComplete: {
    padding: '7px 14px',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid #10b981',
    color: '#34d399',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.82rem',
    whiteSpace: 'nowrap',
  },
  btnUndo: {
    padding: '7px 14px',
    backgroundColor: '#1e293b',
    border: '1px solid #64748b',
    color: '#94a3b8',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.82rem',
    whiteSpace: 'nowrap',
  },
  emptyState: {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#111827',
    borderRadius: '8px',
    border: '1px dashed #334155',
    color: '#64748b',
    fontSize: '0.92rem',
  },
};
