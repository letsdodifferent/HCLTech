import React, { useState } from "react";

// Hardcoded data for now – replace with API later
const SAMPLE_PATIENTS = [
  {
    id: "p1",
    name: "Aarav Sharma",
    age: 32,
    condition: "General Wellness",
    complianceStatus: "Goal Met",
    lastCheckup: "2025-11-20",
    annualBloodTest: "2025-12-25",
    goals: {
      stepsGoal: 8000,
      stepsAvg: 8500,
      sleepGoal: 7,
      sleepAvg: 7.3,
      waterGoal: 3,
      waterAvg: 3.1,
    },
  },
  {
    id: "p2",
    name: "Priya Verma",
    age: 28,
    condition: "PCOS Management",
    complianceStatus: "Missed Preventive Checkup",
    lastCheckup: "2025-07-02",
    annualBloodTest: "2025-10-10",
    goals: {
      stepsGoal: 7000,
      stepsAvg: 5200,
      sleepGoal: 7,
      sleepAvg: 6.1,
      waterGoal: 2.5,
      waterAvg: 2.0,
    },
  },
  {
    id: "p3",
    name: "Rahul Singh",
    age: 45,
    condition: "Hypertension",
    complianceStatus: "Pending",
    lastCheckup: "2025-09-15",
    annualBloodTest: "2026-01-05",
    goals: {
      stepsGoal: 6000,
      stepsAvg: 5800,
      sleepGoal: 7,
      sleepAvg: 6.9,
      waterGoal: 2.5,
      waterAvg: 2.4,
    },
  },
];

const ProviderDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(SAMPLE_PATIENTS[0]);

  const totalPatients = SAMPLE_PATIENTS.length;
  const goalMetCount = SAMPLE_PATIENTS.filter(
    (p) => p.complianceStatus === "Goal Met"
  ).length;
  const missedCheckupCount = SAMPLE_PATIENTS.filter(
    (p) => p.complianceStatus === "Missed Preventive Checkup"
  ).length;

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const getStatusClass = (status) => {
    if (status === "Goal Met") return "badge badge-success";
    if (status === "Missed Preventive Checkup") return "badge badge-danger";
    return "badge badge-warning";
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Healthcare Provider View</h1>
          <p>
            View assigned patients and their compliance status. Click a patient
            to see detailed goals and compliance.
          </p>
        </div>
      </header>

      {/* Summary cards */}
      <section className="grid">
        <div className="card">
          <h3>Total Patients</h3>
          <p className="big-number">{totalPatients}</p>
        </div>
        <div className="card">
          <h3>Goal Met</h3>
          <p className="big-number">{goalMetCount}</p>
        </div>
        <div className="card">
          <h3>Missed Preventive Checkup</h3>
          <p className="big-number warning">{missedCheckupCount}</p>
        </div>
      </section>

      <div className="layout-two-columns">
        {/* Left: patient list */}
        <section className="card big-card">
          <h2>Assigned Patients</h2>
          <table className="patient-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Condition</th>
                <th>Compliance Status</th>
                <th>Last Checkup</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_PATIENTS.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  className={
                    selectedPatient?.id === patient.id ? "row-selected" : ""
                  }
                >
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.condition}</td>
                  <td>
                    <span className={getStatusClass(patient.complianceStatus)}>
                      {patient.complianceStatus}
                    </span>
                  </td>
                  <td>
                    {new Date(patient.lastCheckup).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="helper-text">
            Tip: later this table will come from{" "}
            <code>/api/provider/patients</code>.
          </p>
        </section>

        {/* Right: selected patient details */}
        {selectedPatient && (
          <section className="card big-card">
            <h2>Patient Details</h2>
            <h3>{selectedPatient.name}</h3>
            <p>
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p>
              <strong>Condition:</strong> {selectedPatient.condition}
            </p>
            <p>
              <strong>Annual Blood Test:</strong>{" "}
              {new Date(
                selectedPatient.annualBloodTest
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Compliance Status:</strong>{" "}
              <span className={getStatusClass(selectedPatient.complianceStatus)}>
                {selectedPatient.complianceStatus}
              </span>
            </p>

            <hr style={{ margin: "16px 0" }} />

            <h3>Goals & Progress (Hardcoded Summary)</h3>
            <ul className="detail-list">
              <li>
                Steps: {selectedPatient.goals.stepsAvg} /{" "}
                {selectedPatient.goals.stepsGoal} per day (avg)
              </li>
              <li>
                Sleep: {selectedPatient.goals.sleepAvg} /{" "}
                {selectedPatient.goals.sleepGoal} hours (avg)
              </li>
              <li>
                Water: {selectedPatient.goals.waterAvg} /{" "}
                {selectedPatient.goals.waterGoal} L per day
              </li>
            </ul>

            <p className="helper-text">
              Later this panel can use{" "}
              <code>/api/provider/patients/:id</code> to show real data.
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
