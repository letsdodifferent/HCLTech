import React, { useState, useEffect } from "react";
import { Activity, Droplets, Moon, Clock, TrendingUp, Calendar, CheckCircle, XCircle, Target, Plus, AlertCircle } from "lucide-react";
import { patientAPI } from "../../api/axios";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";

const GoalTracker = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    steps: "",
    waterLitres: "",
    sleepHours: "",
    activeMinutes: "",
    goalsMet: false,
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await patientAPI.getLogs();
      setLogs(response.data.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setSubmitting(true);

      const logData = {
        date: form.date,
        steps: Number(form.steps || 0),
        waterLitres: Number(form.waterLitres || 0),
        sleepHours: Number(form.sleepHours || 0),
        activeMinutes: Number(form.activeMinutes || 0),
        goalsMet: form.goalsMet,
      };

      await patientAPI.createLog(logData);

      // Refresh logs
      await fetchLogs();

      // Reset form but keep date
      setForm((prev) => ({
        ...prev,
        steps: "",
        waterLitres: "",
        sleepHours: "",
        activeMinutes: "",
        goalsMet: false,
      }));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error creating log:", err);
      setError(err.response?.data?.message || "Failed to save daily log");
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate statistics
  const avgSteps = logs.length > 0 ? Math.round(logs.reduce((sum, log) => sum + log.steps, 0) / logs.length) : 0;
  const avgWater = logs.length > 0 ? (logs.reduce((sum, log) => sum + log.waterLitres, 0) / logs.length).toFixed(1) : 0;
  const goalsMetCount = logs.filter(log => log.goalsMet).length;
  const goalsMetPercentage = logs.length > 0 ? Math.round((goalsMetCount / logs.length) * 100) : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg">
                <Target size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Goal Tracker</h1>
                <p className="mt-1 text-gray-600">Track your daily wellness goals and build healthy habits</p>
              </div>
            </div>
          </header>

          {loading ? (
            <LoadingSpinner size="lg" text="Loading your activity logs..." />
          ) : (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg Steps</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{avgSteps}</h3>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Activity size={24} className="text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg Water</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{avgWater}L</h3>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Droplets size={24} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Logs</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{logs.length}</h3>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Calendar size={24} className="text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Goals Met</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{goalsMetPercentage}%</h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp size={24} className="text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form to log daily goals */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Plus size={24} className="text-white" />
                    <h2 className="text-xl font-bold text-white">Log Today's Goals</h2>
                  </div>
                </div>

                <form className="p-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-600">Daily log saved successfully!</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={16} className="inline mr-1" />
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Activity size={16} className="inline mr-1" />
                        Steps
                      </label>
                      <input
                        type="number"
                        name="steps"
                        value={form.steps}
                        onChange={handleChange}
                        placeholder="e.g. 8000"
                        min="0"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Droplets size={16} className="inline mr-1" />
                        Water (Litres)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="waterLitres"
                        value={form.waterLitres}
                        onChange={handleChange}
                        placeholder="e.g. 2.5"
                        min="0"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Moon size={16} className="inline mr-1" />
                        Sleep (Hours)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="sleepHours"
                        value={form.sleepHours}
                        onChange={handleChange}
                        placeholder="e.g. 7"
                        min="0"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock size={16} className="inline mr-1" />
                        Active Minutes
                      </label>
                      <input
                        type="number"
                        name="activeMinutes"
                        value={form.activeMinutes}
                        onChange={handleChange}
                        placeholder="e.g. 30"
                        min="0"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors w-full">
                        <input
                          type="checkbox"
                          name="goalsMet"
                          checked={form.goalsMet}
                          onChange={handleChange}
                          className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Goals met today</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Save Daily Log
                      </>
                    )}
                  </button>
                </form>
              </section>

              {/* History of logs */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp size={20} className="text-teal-600" />
                    Recent Activity Logs
                  </h2>
                </div>

                <div className="p-6">
                  {logs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Calendar size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-lg">No logs yet. Start by adding today's goals above.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              <Activity size={16} className="inline mr-1" />
                              Steps
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              <Droplets size={16} className="inline mr-1" />
                              Water (L)
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              <Moon size={16} className="inline mr-1" />
                              Sleep (h)
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              <Clock size={16} className="inline mr-1" />
                              Active (min)
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Goals Met</th>
                          </tr>
                        </thead>
                        <tbody>
                          {logs.map((log, index) => (
                            <tr
                              key={log._id}
                              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Calendar size={16} className="text-gray-400" />
                                  <span className="font-medium text-gray-900">
                                    {new Date(log.date).toLocaleDateString("en-IN", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-700 font-medium">{log.steps.toLocaleString()}</td>
                              <td className="py-4 px-4 text-gray-700 font-medium">{log.waterLitres}</td>
                              <td className="py-4 px-4 text-gray-700 font-medium">{log.sleepHours}</td>
                              <td className="py-4 px-4 text-gray-700 font-medium">{log.activeMinutes}</td>
                              <td className="py-4 px-4">
                                {log.goalsMet ? (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    <CheckCircle size={16} />
                                    Yes
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                    <XCircle size={16} />
                                    Not fully
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GoalTracker;
