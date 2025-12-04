import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Info, Loader } from 'lucide-react';
import { publicAPI } from '../../api/axios';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';

const PublicHealthInfoPage = () => {
  const [healthTopics, setHealthTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealthInfo();
  }, []);

  const fetchHealthInfo = async () => {
    try {
      setLoading(true);
      const response = await publicAPI.getHealthInfo();
      setHealthTopics(response.data.data);
    } catch (err) {
      console.error('Error fetching health info:', err);
      setError('Failed to load health information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Heart size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Health Information Center</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Explore evidence-based health topics and learn how to maintain a healthy lifestyle
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" text="Loading health information..." />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchHealthInfo}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {healthTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-5xl">{topic.icon}</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {topic.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{topic.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {topic.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                        <BookOpen size={18} className="text-teal-600" />
                        Key Tips:
                      </div>
                      <ul className="space-y-2">
                        {topic.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="inline-block w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Additional Info Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Info size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Important Notice</h3>
                <p className="text-gray-600 leading-relaxed">
                  The information provided here is for educational purposes only and should not replace professional medical advice.
                  Always consult with a qualified healthcare provider for personalized medical guidance and treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Your health data is protected. Read our{' '}
              <a href="#" className="text-teal-600 hover:text-teal-700 font-medium underline">
                Privacy Policy
              </a>
              {' '}to learn more.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicHealthInfoPage;
