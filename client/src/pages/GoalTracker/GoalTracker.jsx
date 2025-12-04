import React, { useState } from "react";

// 🔹 Hardcoded initial data – later replace with GET /api/patient/logs
const INITIAL_LOGS = [
  {
    id: 1,
    date: "2025-12-01",
    steps: 7500,
    waterLitres: 2.5,
    sleepHours: 7,
    activeMinutes: 35,
    goalsMet: true,
  },
  {
    id: 2,
    date: "2025-12-02",
    steps: 5200,
    waterLitres: 1.8,
    sleepHours: 6,
    activeMinutes: 20,
    goalsMet: false,
  },
];

const GoalTracker = () => {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    steps: "",
    waterLitres: "",
    sleepHours: "",
    activeMinutes: "",
    goalsMet: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLog = {
      id: logs.length + 1,
      ...form,
      steps: Number(form.steps || 0),
      waterLitres: Number(form.waterLitres || 0),
      sleepHours: Number(form.sleepHours || 0),
      activeMinutes: Number(form.activeMinutes || 0),
    };

    // 🔹 In real app, POST to /api/patient/logs instead of local push
    setLogs((prev) => [newLog, ...prev]);

    // reset but keep date
    setForm((prev) => ({
      ...prev,
      steps: "",
      waterLitres: "",
      sleepHours: "",
      activeMinutes: "",
      goalsMet: false,
    }));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Goal Tracker</h1>
          <p>Log your daily wellness goals like steps, water intake and sleep.</p>
        </div>
      </header>

      {/* Form to log daily goals */}
      <section className="card big-card">
        <h2>Log Today&apos;s Goals</h2>
        <form className="goal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Steps
              <input
                type="number"
                name="steps"
                value={form.steps}
                onChange={handleChange}
                placeholder="e.g. 8000"
                min="0"
              />
            </label>
            <label>
              Water (L)
              <input
                type="number"
                step="0.1"
                name="waterLitres"
                value={form.waterLitres}
                onChange={handleChange}
                placeholder="e.g. 2.5"
                min="0"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Sleep (hours)
              <input
                type="number"
                step="0.1"
                name="sleepHours"
                value={form.sleepHours}
                onChange={handleChange}
                placeholder="e.g. 7"
                min="0"
              />
            </label>
            <label>
              Active Minutes
              <input
                type="number"
                name="activeMinutes"
                value={form.activeMinutes}
                onChange={handleChange}
                placeholder="e.g. 30"
                min="0"
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="goalsMet"
                checked={form.goalsMet}
                onChange={handleChange}
              />
              Goals met today
            </label>
          </div>

          <button type="submit" className="primary-btn">
            Save Daily Log
          </button>
        </form>
        <p className="helper-text">
          Later this form will call <code>POST /api/patient/logs</code>.
        </p>
      </section>

      {/* History of logs */}
      <section className="card big-card" style={{ marginTop: 20 }}>
        <h2>Recent Logs</h2>
        {logs.length === 0 ? (
          <p>No logs yet. Start by adding today&apos;s goals above.</p>
        ) : (
          <table className="patient-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Steps</th>
                <th>Water (L)</th>
                <th>Sleep (h)</th>
                <th>Active (min)</th>
                <th>Goals Met</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    {new Date(log.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{log.steps}</td>
                  <td>{log.waterLitres}</td>
                  <td>{log.sleepHours}</td>
                  <td>{log.activeMinutes}</td>
                  <td>
                    <span
                      className={
                        log.goalsMet ? "badge badge-success" : "badge badge-warning"
                      }
                    >
                      {log.goalsMet ? "Yes" : "Not fully"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="helper-text">
          Later this table will use <code>GET /api/patient/logs</code>.
        </p>
      </section>
    </div>
  );
};

export default GoalTracker;
