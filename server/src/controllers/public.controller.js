// @desc    Get general health information topics
// @route   GET /api/v1/public/health-info
// @access  Public
exports.getHealthInfo = async (req, res) => {
    try {
        // In a real application, this would come from a database
        const healthTopics = [
            {
                id: 1,
                category: 'Nutrition',
                title: 'Balanced Diet Essentials',
                description: 'A balanced diet includes fruits, vegetables, whole grains, lean proteins, and healthy fats.',
                tips: [
                    'Eat at least 5 servings of fruits and vegetables daily',
                    'Choose whole grains over refined grains',
                    'Include lean proteins like fish, chicken, and legumes',
                    'Limit processed foods and added sugars'
                ],
                icon: '🥗'
            },
            {
                id: 2,
                category: 'Exercise',
                title: 'Physical Activity Guidelines',
                description: 'Regular physical activity is crucial for maintaining good health and preventing chronic diseases.',
                tips: [
                    'Aim for 150 minutes of moderate aerobic activity per week',
                    'Include strength training exercises twice a week',
                    'Take breaks from sitting every 30 minutes',
                    'Find activities you enjoy to stay motivated'
                ],
                icon: '🏃'
            },
            {
                id: 3,
                category: 'Sleep',
                title: 'Importance of Quality Sleep',
                description: 'Quality sleep is essential for physical health, mental well-being, and overall quality of life.',
                tips: [
                    'Aim for 7-9 hours of sleep per night',
                    'Maintain a consistent sleep schedule',
                    'Create a relaxing bedtime routine',
                    'Avoid screens 1 hour before bedtime'
                ],
                icon: '😴'
            },
            {
                id: 4,
                category: 'Hydration',
                title: 'Staying Hydrated',
                description: 'Proper hydration is vital for body temperature regulation, nutrient transport, and waste removal.',
                tips: [
                    'Drink 8-10 glasses of water daily',
                    'Increase intake during exercise or hot weather',
                    'Monitor urine color (pale yellow is ideal)',
                    'Eat water-rich foods like fruits and vegetables'
                ],
                icon: '💧'
            },
            {
                id: 5,
                category: 'Mental Health',
                title: 'Mental Wellness Practices',
                description: 'Mental health is just as important as physical health for overall well-being.',
                tips: [
                    'Practice mindfulness or meditation daily',
                    'Stay connected with friends and family',
                    'Seek professional help when needed',
                    'Engage in hobbies and activities you enjoy'
                ],
                icon: '🧠'
            },
            {
                id: 6,
                category: 'Preventive Care',
                title: 'Regular Health Checkups',
                description: 'Preventive care helps detect health issues early when they are easier to treat.',
                tips: [
                    'Schedule annual physical examinations',
                    'Get age-appropriate screenings (blood pressure, cholesterol, etc.)',
                    'Stay up-to-date with vaccinations',
                    'Discuss family health history with your doctor'
                ],
                icon: '🏥'
            }
        ];

        res.status(200).json({
            success: true,
            count: healthTopics.length,
            data: healthTopics
        });
    } catch (error) {
        console.error('Get health info error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get health tip of the day
// @route   GET /api/v1/public/tip
// @access  Public
exports.getHealthTip = async (req, res) => {
    try {
        // Array of health tips
        const healthTips = [
            {
                category: 'Hydration',
                tip: 'Drink a glass of water first thing in the morning to kickstart your metabolism and rehydrate after sleep.',
                icon: '💧'
            },
            {
                category: 'Exercise',
                tip: 'Take a 10-minute walk after meals to aid digestion and help regulate blood sugar levels.',
                icon: '🚶'
            },
            {
                category: 'Nutrition',
                tip: 'Add colorful vegetables to your meals - different colors provide different nutrients and antioxidants.',
                icon: '🥗'
            },
            {
                category: 'Sleep',
                tip: 'Keep your bedroom cool (60-67°F) for optimal sleep quality and deeper rest.',
                icon: '😴'
            },
            {
                category: 'Mental Health',
                tip: 'Practice deep breathing for 5 minutes daily to reduce stress and improve focus.',
                icon: '🧘'
            },
            {
                category: 'Posture',
                tip: 'Set a reminder to check your posture every hour - sit up straight with shoulders back.',
                icon: '🪑'
            },
            {
                category: 'Eye Health',
                tip: 'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.',
                icon: '👁️'
            },
            {
                category: 'Nutrition',
                tip: 'Eat mindfully - chew slowly and put your fork down between bites to improve digestion.',
                icon: '🍽️'
            },
            {
                category: 'Exercise',
                tip: 'Take the stairs instead of the elevator to add more movement to your daily routine.',
                icon: '🪜'
            },
            {
                category: 'Hydration',
                tip: 'Keep a water bottle with you throughout the day as a visual reminder to stay hydrated.',
                icon: '🚰'
            },
            {
                category: 'Sleep',
                tip: 'Avoid caffeine 6 hours before bedtime to ensure better sleep quality.',
                icon: '☕'
            },
            {
                category: 'Mental Health',
                tip: 'Write down 3 things you\'re grateful for each day to boost your mood and mental well-being.',
                icon: '📝'
            },
            {
                category: 'Nutrition',
                tip: 'Include protein in your breakfast to stay fuller longer and maintain steady energy levels.',
                icon: '🥚'
            },
            {
                category: 'Exercise',
                tip: 'Stretch for 5-10 minutes in the morning to improve flexibility and reduce muscle tension.',
                icon: '🤸'
            },
            {
                category: 'Hygiene',
                tip: 'Wash your hands for at least 20 seconds with soap and water to prevent illness.',
                icon: '🧼'
            }
        ];

        // Get tip based on current day of year (so it changes daily)
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const tipIndex = dayOfYear % healthTips.length;
        const todaysTip = healthTips[tipIndex];

        res.status(200).json({
            success: true,
            data: {
                ...todaysTip,
                date: new Date().toISOString().split('T')[0]
            }
        });
    } catch (error) {
        console.error('Get health tip error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
