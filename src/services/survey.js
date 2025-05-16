import api from './api';

// Submit a survey
export const submitSurvey = async (surveyData) => {
  try {
    const response = await api.post('/v1/responses', surveyData);
    return response.data;
  } catch (error) {
    console.error('Backend error response:', error.response?.data || error);
    throw error.response?.data?.message || 'Failed to submit survey. Please try again.';
  }
};

// Get survey analytics (admin only)
export const getSurveyAnalytics = async () => {
  try {
    const token = localStorage.getItem('adminToken');
   

    const response = await api.get(`/v1/analytics`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, );

    return response.data;
  } catch (error) {
    console.error('Analytics fetch error:', error.response?.data || error);
    throw error.response?.data?.message || 'Failed to fetch survey analytics.';
  }
};

// Default export with reusable service methods
const surveyService = {
  getSurveyResponses: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = new URLSearchParams({ page, limit, ...filters });

      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('No admin token found.');

      const response = await api.get(`/v1/surveys?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Survey responses error:', error.response?.data || error);
      throw error.response?.data?.message || 'Failed to fetch survey responses.';
    }
  },

  // You can add more methods here later if needed
};

export default surveyService;
