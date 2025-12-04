import React, { useEffect, useState } from "react";

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [tip, setTip] = useState("");

  useEffect(() => {
    // In real app, get token from context/localStorage
    const token = localStorage.getItem("token");

    const fetchDashboard = async () => {
      try {
        const [metricsRes, remindersRes, tipRes] = await Promise.all([
          fetch("/api/patient/wellness", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/patient/reminders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/public/tip"),
        ]);

        const metricsData = await metricsRes.json();
        const remindersData = await remindersRes.json();
        const tipData = await tipRes.json();

        setMetrics(metricsData);          // { stepsToday, stepsGoal, sleepHours, sleepGoal, activeMinutes, activeGoal, waterIntake, waterGoal }
        setReminders(remindersData);      // [{_id, title, dueDate}]
        setTip(tipData.tip);              // "Drink enough water..."
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading || !metrics) {
    return <div className="dashboard-container">Loading dashboard...</div>;
  }

  const ProgressCard = ({ label, value, goal, unit }) => {
    const percent = Math.min(100, Math.round((value / goal) * 100 || 0));

    return (
      <div className="card">
        <div className="card-header">
          <h3>{label}</h3>
          <span>{value}{unit} / {goal}{unit}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="percent-text">{percent}% of today’s goal</p>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Top section */}
      <header className="dashboard-header">
        <div>
          <h1>Patient Dashboard</h1>
          <p>Track your wellness, reminders and daily health tips.</p>
        </div>
      </header>

      {/* Metrics cards */}
      <section className="grid">
        <ProgressCard
          label="Steps"
          value={metrics.stepsToday}
          goal={metrics.stepsGoal}
          unit=""
        />
        <ProgressCard
          label="Sleep"
          value={metrics.sleepHours}
          goal={metrics.sleepGoal}
          unit="h"
        />
        <ProgressCard
          label="Active Time"
          value={metrics.activeMinutes}
          goal={metrics.activeGoal}
          unit=" min"
        />
        <ProgressCard
          label="Water Intake"
          value={metrics.waterIntake}
          goal={metrics.waterGoal}
          unit=" L"
        />
      </section>

      <div className="layout-two-columns">
        {/* Reminders */}
        <section className="card big-card">
          <h2>Preventive Care Reminders</h2>
          {reminders.length === 0 && <p>No upcoming reminders.</p>}
          <ul className="reminder-list">
            {reminders.map((r) => (
              <li key={r._id} className="reminder-item">
                <div>
                  <strong>{r.title}</strong>
                  <p>
                    Due on{" "}
                    {new Date(r.dueDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {!r.completed && <span className="badge">Upcoming</span>}
              </li>
            ))}
          </ul>
        </section>

        {/* Health tip */}
        <section className="card big-card tip-card">
          <h2>Health Tip of the Day</h2>
          <p>{tip}</p>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;
