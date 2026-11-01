import React, { useState, useEffect } from 'react';

/**
 * Task 3: User Profile Manager
 * Location: src/components/UserProfileManager.jsx
 * Theme & Context: VoltSense AI - EV Battery Diagnostics & Operator Profile Manager
 */
export default function UserProfileManager() {
  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
  });

  // Stored / confirmed profile state displayed below the form
  const [savedProfile, setSavedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  // 2. Fetch initial profile data when the component mounts
  useEffect(() => {
    const fetchInitialProfile = async () => {
      setIsLoading(true);
      try {
        // Simulating async API call to retrieve operator profile
        await new Promise((resolve) => setTimeout(resolve, 800));

        const initialData = {
          name: 'Elena Rostova',
          age: 34,
          email: 'elena.rostova@voltsense.io',
        };

        // 3. Display the fetched profile data in the form fields
        setFormData(initialData);
        setSavedProfile(initialData);
        setStatusMessage('Initial operator profile loaded successfully.');
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialProfile();
  }, []);

  // 6. Log a message to the console whenever the profile data is updated
  useEffect(() => {
    if (savedProfile) {
      console.log('[VoltSense AI] Profile data updated:', savedProfile);
    }
  }, [savedProfile]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 4. Allow the user to update their profile information
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name.trim(),
      age: Number(formData.age),
      email: formData.email.trim(),
      lastUpdated: new Date().toLocaleTimeString(),
    };

    setSavedProfile(updatedData);
    setStatusMessage('Profile updated successfully!');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>⚡ Chief Battery Engineer Profile Manager</h2>
          <p style={styles.subtitle}>
            VoltSense AI Pack Health Authority & Telemetry Credentials
          </p>
        </div>
        <div style={styles.badge}>
          {isLoading ? 'Fetching Data...' : 'Synchronized'}
        </div>
      </div>

      {statusMessage && (
        <div style={styles.statusBar}>
          <span>ℹ️ {statusMessage}</span>
        </div>
      )}

      {/* 1 & 3: Form with fields for name, age, email with fetched values */}
      <div style={styles.formCard}>
        <h3 style={styles.cardHeader}>Edit Operator Profile</h3>
        {isLoading ? (
          <div style={styles.loadingBox}>
            <div style={styles.spinner}></div>
            <p style={{ margin: 0, color: '#94a3b8' }}>
              Retrieving profile from VoltSense secure gateway...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter operator name"
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
                placeholder="Enter operator age"
                value={formData.age}
                onChange={handleChange}
                style={styles.input}
                min="18"
                max="100"
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
                placeholder="Enter operator email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* 4. Update Button */}
            <button type="submit" style={styles.btnUpdate}>
              Update Profile Information
            </button>
          </form>
        )}
      </div>

      {/* 5. Display the updated profile information below the form */}
      <div style={styles.displayCard}>
        <div style={styles.displayHeaderRow}>
          <h3 style={styles.displayTitle}>📋 Active Profile Snapshot</h3>
          {savedProfile?.lastUpdated && (
            <span style={styles.timestampBadge}>
              Last Updated: {savedProfile.lastUpdated}
            </span>
          )}
        </div>

        {savedProfile ? (
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Operator Name:</span>
              <span style={styles.infoValue}>{savedProfile.name}</span>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Age:</span>
              <span style={styles.infoValue}>{savedProfile.age} yrs</span>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email:</span>
              <span style={styles.infoValue}>{savedProfile.email}</span>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Security Role:</span>
              <span style={{ ...styles.infoValue, color: '#38bdf8' }}>
                Lead Thermal Diagnostics Analyst
              </span>
            </div>
          </div>
        ) : (
          <div style={styles.emptyDisplay}>
            {isLoading ? 'Loading profile details...' : 'No profile data recorded.'}
          </div>
        )}
      </div>
    </div>
  );
}

// VoltSense AI themed styling
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
    fontSize: '0.82rem',
    fontWeight: 600,
  },
  statusBar: {
    padding: '10px 14px',
    backgroundColor: 'rgba(0, 242, 254, 0.08)',
    border: '1px solid rgba(0, 242, 254, 0.3)',
    borderRadius: '8px',
    color: '#38bdf8',
    fontSize: '0.85rem',
    marginBottom: '16px',
  },
  formCard: {
    backgroundColor: '#111827',
    padding: '22px',
    borderRadius: '10px',
    border: '1px solid #1f2937',
    marginBottom: '20px',
  },
  cardHeader: {
    margin: '0 0 16px',
    fontSize: '1.1rem',
    color: '#f8fafc',
    fontWeight: 600,
  },
  formGroup: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.88rem',
    fontWeight: 500,
    color: '#cbd5e1',
  },
  input: {
    padding: '11px 14px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btnUpdate: {
    width: '100%',
    padding: '12px',
    marginTop: '6px',
    backgroundColor: '#00f2fe',
    backgroundImage: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    border: 'none',
    borderRadius: '6px',
    color: '#0a0f1d',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  displayCard: {
    backgroundColor: '#111827',
    padding: '22px',
    borderRadius: '10px',
    border: '1px solid #1f2937',
  },
  displayHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  displayTitle: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#4facfe',
    fontWeight: 600,
  },
  timestampBadge: {
    fontSize: '0.78rem',
    color: '#94a3b8',
    backgroundColor: '#1e293b',
    padding: '4px 10px',
    borderRadius: '6px',
    border: '1px solid #334155',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 14px',
    backgroundColor: '#1e293b',
    borderRadius: '6px',
    alignItems: 'center',
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
  emptyDisplay: {
    padding: '20px',
    textAlign: 'center',
    color: '#64748b',
    fontSize: '0.9rem',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '30px',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #1e293b',
    borderTop: '3px solid #00f2fe',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};
