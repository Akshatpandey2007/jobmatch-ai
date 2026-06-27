const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth API calls
export const authAPI = {
  registerCandidate: (data) => apiCall('/auth/register/candidate', 'POST', data),
  registerCompany: (data) => apiCall('/auth/register/company', 'POST', data),
  login: (data) => apiCall('/auth/login', 'POST', data),
  getMe: (token) => apiCall('/auth/me', 'GET', null, token)
};

// Jobs API calls
export const jobsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/jobs${params ? '?' + params : ''}`);
  },
  getById: (id) => apiCall(`/jobs/${id}`),
  create: (data, token) => apiCall('/jobs', 'POST', data, token),
  getCompanyJobs: (token) => apiCall('/jobs/company/myjobs', 'GET', null, token)
};

// Applications API calls
export const applicationsAPI = {
  apply: (jobId, token) => apiCall('/applications', 'POST', { jobId }, token),
  getMyApplications: (token) => apiCall('/applications/my', 'GET', null, token),
  updateStatus: (id, status, token) => apiCall(`/applications/${id}/status`, 'PATCH', { status }, token),
  withdraw: (id, token) => apiCall(`/applications/${id}`, 'DELETE', null, token)
};