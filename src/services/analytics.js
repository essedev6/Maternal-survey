import api from './api';

// Named exports for specific functions
export const getAdvancedAnalytics = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/v1/adv/advanced?${params.toString()}`
);
    return response.data;
    
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch advanced analytics.';
  }
};

export const getBasicAnalytics = async () => {
  try {
    const response = await api.get('/v1/analytics/basic');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch basic analytics.';
  }
};

// Default export for all methods
const analyticsService = {
  getDemographicData: async () => {
    try {
      const response = await api.get('/v1/analytics/demographics');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch demographic data.';
    }
  },
  // ... other analytics methods
};

export default analyticsService;