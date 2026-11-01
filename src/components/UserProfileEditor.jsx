import React, { useState } from 'react';

/**
 * Task 1: User Profile Editor
 * Location: src/components/UserProfileEditor.jsx
 * Theme & Context: VoltSense AI - EV Battery Platform Operator Profile
 */
export default function UserProfileEditor() {
  const initialValues = {
    name: '',
    age: '',
    email: '',
  };

  const [formData, setFormData] = useState(initialValues);
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form fields to initial values
  const handleReset = () => {
    setFormData(initialValues);
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.container}>
      {/* Header & Controls */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>⚡ Operator Profile Editor</h2>
          <p style={styles.subtitle}>
            VoltSense AI Fleet Management & Technician Identity
          </p>
        </div>
        <button
          type="button"
          onClick={toggleFormVisibility}
          style={styles.btnSecondary}
        >
          {isFormVisible ? 'Hide Form' : 'Show Form'}
        </button>
      </div>

      {/* 1 & 3: Form with toggleable visibility */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Alex Mercer"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="age">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="e.g. 32"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
              min="1"
              max="120"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. alex.mercer@voltsense.io"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* 4: Reset Button */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleReset}
              style={styles.btnReset}
            >
              Reset Form Fields
            </button>
          </div>
        </form>
      )}

      {/* 2: Display entered information below the form */}
      <div style={styles.displayCard}>
        <h3 style={styles.displayTitle}>📋 Entered Profile Information</h3>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Name:</span>
            <span style={styles.infoValue}>
              {formData.name.trim() ? formData.name : <em style={styles.placeholder}>Not entered</em>}
            </span>
          </div>

          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Age:</span>
            <span style={styles.infoValue}>
              {formData.age !== '' ? `${formData.age} years` : <em style={styles.placeholder}>Not entered</em>}
            </span>
          </div>

          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Email:</span>
            <span style={styles.infoValue}>
              {formData.email.trim() ? formData.email : <em style={styles.placeholder}>Not entered</em>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// VoltSense AI themed styling
const styles = {
  container: {
    maxWidth: '650px',
    margin: '30px auto',
    padding: '24px',
    backgroundColor: '#0a0f1d',
    color: '#e2e8f0',
    borderRadius: '12px',
    border: '1px solid #1e293b',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    fontFamily: "'Poppins', sans-serif",
  },
  headerRow: {
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
  formCard: {
    backgroundColor: '#111827',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #1f2937',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#cbd5e1',
  },
  input: {
    padding: '10px 14px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px',
  },
  btnSecondary: {
    padding: '8px 16px',
    backgroundColor: '#1e293b',
    border: '1px solid #4facfe',
    color: '#00f2fe',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.88rem',
  },
  btnReset: {
    padding: '10px 18px',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #ef4444',
    color: '#fca5a5',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  displayCard: {
    backgroundColor: '#111827',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #1f2937',
  },
  displayTitle: {
    margin: '0 0 14px',
    fontSize: '1.1rem',
    color: '#4facfe',
    fontWeight: 600,
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 12px',
    backgroundColor: '#1e293b',
    borderRadius: '6px',
  },
  infoLabel: {
    fontWeight: 500,
    color: '#94a3b8',
    fontSize: '0.9rem',
  },
  infoValue: {
    fontWeight: 600,
    color: '#f8fafc',
    fontSize: '0.9rem',
  },
  placeholder: {
    color: '#64748b',
    fontStyle: 'italic',
  },
};
