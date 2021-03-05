import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  baseURL: 'http://7f26583bd07e.ngrok.io',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
