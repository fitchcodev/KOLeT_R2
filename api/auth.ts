import { User } from '@/contexts/UserContext';
import { dateToString } from '@/helpers/common';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SignupParams {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  username: string;
  password: string;
}

interface LoginParams {
  phone: string;
  password: string;
}

interface ConfirmOTPSignupParams {
  phone: string;
  otp: string;
}

interface SetPasswordParams {
  phone: string;
  password: string;
}

interface AuthResponse {
  token: string;
  data: User;
}

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global error handler
const catchError = (error: any) => {
  console.error('API error:', error);

  if (error.response) {
    throw new Error(
      error.response.responseMessage ||
        error.response.data?.message ||
        'Server error occurred'
    );
  } else if (error.request) {
    throw new Error('No response from server. Please check your connection.');
  } else {
    throw new Error(error.message || 'An error occurred during the request');
  }
};

export const useSignupMutation = () => {
  const signupUser = async (userData: SignupParams): Promise<AuthResponse> => {
    try {
      const response = await api.post('/add.php', {
        ...userData,
        model: 'users',
        last_login: dateToString(new Date()),
        jwt: '1234',
      });

      return response.data;
    } catch (error) {
      return catchError(error);
    }
  };

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: data => {
      console.log('Signup successful', data);
    },
  });
  return mutation;
};

export const useConfirmOTPMutation = () => {
  const confirmOTPSignup = async (
    params: ConfirmOTPSignupParams
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post('/confirm_account.php', {
        ...params,
        model: 'users',
        jwt: '1234',
      });

      return response.data;
    } catch (error) {
      return catchError(error);
    }
  };

  const mutation = useMutation({
    mutationFn: confirmOTPSignup,
    onSuccess: data => {
      console.log('OTP confirmation successful', data);
    },
  });
  return mutation;
};

export const useSetPasswordMutation = () => {
  const setPassword = async (
    params: SetPasswordParams
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post('/confirm_password.php', params);
      return response.data;
    } catch (error) {
      return catchError(error);
    }
  };

  const mutation = useMutation({
    mutationFn: setPassword,
    onSuccess: data => {
      console.log('Set password successful', data);
    },
  });
  return mutation;
};

export const useLoginMutation = () => {
  const loginUser = async (credentials: LoginParams): Promise<AuthResponse> => {
    try {
      const response = await api.post('/login.php', credentials);
      return response.data;
    } catch (error) {
      return catchError(error);
    }
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      console.log('Login successful', data);
    },
  });
  return mutation;
};
