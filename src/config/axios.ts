import axios from 'axios';
import deviceStorage from '~/services/storage';


// Default config options
const defaultOptions = {
  baseURL: 'https://api.github.com',
  headers: {
    'Access-Control-Allow-Headers': 'x-access-token',
    'Content-Type': 'application/json',
    timeout: 1000,
  },
};

// Create Instance
const axiosInstance = axios.create(defaultOptions);

// Set the auth token for any request
axiosInstance.interceptors.request.use((axioscfg) => {
  // Get token from session
  const accessToken = deviceStorage.state.token;
  axioscfg.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  return axioscfg;
});

// Last step: handle request error general case
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      const autorization = response.headers.authorization.replace(
        'Bearer ',
        '',
      );
      deviceStorage.setToken(autorization);
    }
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 422) {
      console.log('error');
    }

    throw error;
  },
);

export default axiosInstance;
