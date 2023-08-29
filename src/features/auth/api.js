import axios from 'axios';

const API_BASE_URL = 'https://demo-react-ugyr.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = (userData) => {
  api.post('/user/sign_up', userData);
};

// export const loginUser = async (userData) => {
//   await api.post('/user/login', userData);
// };
