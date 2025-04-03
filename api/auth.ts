import { useMutation } from '@tanstack/react-query';

interface SignupParams {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string; 
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const useSignupMutation = () => {
  const signupUser = async (userData: any): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/add.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Signup failed');
    }
    
    return response.json();
  };

  const mutation =  useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log('Signup successful', data);
    },
  });
  return mutation
};

export const useLoginMutation = () => {
  const loginUser = async (credentials: LoginParams): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }
    
    return response.json();
  };

  const mutation =  useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful', data);
    },
  });
  return mutation
};