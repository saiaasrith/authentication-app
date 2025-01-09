import axios from 'axios';

const API_BASE_URL = 'https://bffapi.biztel.ai:8080';

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  inviteCode: string;
}

export interface LoginData {
  username: string;
  password: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (data: SignUpData) => {
  try {
    const response = await api.post('/api/auth/signup', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { errorMessage: 'Network error occurred' };
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await api.post('/api/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { errorMessage: 'Network error occurred' };
  }
};
