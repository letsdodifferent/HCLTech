import React, { useState, useEffect } from "react";
import { Activity, Moon, Droplets, Clock, Calendar, Info } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { patientAPI, publicAPI } from "../../api/axios";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [wellness, setWellness] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [tip, setTip] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch wellness data, reminders, and health tip in parallel
      const [wellnessRes, remindersRes, tipRes] = await Promise.all([
        patientAPI.getWellness(),
        patientAPI.getReminders(),
        publicAPI.getHealthTip(),
      ]);

      setWellness(wellnessRes.data.data);
      setReminders(remindersRes.data.data);
      setTip(tipRes.data.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ProgressCard = ({ label, value, goal, unit, icon: Icon, color }) => {
    const percent = Math.min(100, Math.round((value / goal) * 100 || 0));

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {value}
              <span className="text-sm text-gray-500 font-normal ml-1">{unit}</span>
            </h3>
          </div>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
          <div
            className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{percent}% of goal</span>
          <span>Goal: {goal}{unit}</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading your dashboard..." />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="mt-2 text-gray-600">Here's your daily health overview.</p>
          </header>

          {/* Metrics Grid */}
          {wellness && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <ProgressCard
                label="Steps"
                value={wellness.recentActivity.avgSteps}
                goal={wellness.goals.stepsGoal}
                unit=""
                icon={Activity}
                color="bg-orange-500"
              />
              <ProgressCard
                label="Sleep"
                value={wellness.recentActivity.avgSleep}
                goal={wellness.goals.sleepGoal}
                unit="h"
                icon={Moon}
                color="bg-indigo-500"
              />
              <ProgressCard
                label="Active Time"
                value={wellness.recentActivity.avgActive}
                goal={wellness.goals.activeTimeGoal}
                unit="m"
                icon={Clock}
                color="bg-green-500"
              />
              <ProgressCard
                label="Water Intake"
                value={wellness.recentActivity.avgWater}
                goal={wellness.goals.waterGoal}
                unit="L"
                icon={Droplets}
                color="bg-blue-500"
              />
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reminders Section */}
            <section className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calendar size={20} className="text-teal-600" />
                  Preventive Care Reminders
                </h2>
              </div>
              <div className="p-6">
                {reminders.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No upcoming reminders.</p>
                ) : (
                  <div className="space-y-4">
                    {reminders.map((r) => (
                      <div key={r._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-teal-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                            {new Date(r.dueDate).getDate()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{r.title}</h4>
                            <p className="text-sm text-gray-500">
                              Due: {new Date(r.dueDate).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        {!r.completed && (
                          <span className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Health Tip Section */}
            {tip && (
              <section className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl shadow-sm text-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info size={24} className="text-teal-100" />
                  <h2 className="text-lg font-bold">Health Tip of the Day</h2>
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-teal-500/30 rounded-full text-sm font-medium mb-3">
                    {tip.category}
                  </span>
                </div>
                <p className="text-teal-50 text-lg leading-relaxed">
                  "{tip.tip}"
                </p>
                <div className="mt-6 pt-6 border-t border-teal-500/30">
                  <p className="text-sm text-teal-200">
                    Daily tips to help you maintain a healthy lifestyle.
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
