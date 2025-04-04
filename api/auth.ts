import { User } from '@/contexts/UserContext';
import { dateToString } from '@/helpers/common';
import { useMutation } from '@tanstack/react-query';

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

const catchError = (error: Error) => {
  console.error('API error:', error);
  return error;
};

export const useSignupMutation = () => {
  const signupUser = async (userData: SignupParams): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/add.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        model: 'users',
        last_login: dateToString(new Date()),
        jwt: '1234',
      }),
    });

    const value = await response.json().catch(catchError);

    if (!response.ok) {
      console.error('Signup error:', value);

      throw new Error(value.message || 'An error occurred during signup');
    }

    return value;
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
    const response = await fetch(`${API_URL}/confirm_account.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        model: 'users',
        jwt: '1234',
      }),
    });

    const value = await response.json().catch(catchError);

    if (!response.ok) {
      console.error('OTP confirmation error:', value);

      throw new Error(value.message || 'OTP confirmation failed');
    }

    return response.json();
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
    const response = await fetch(`${API_URL}/confirm_password.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const value = await response.json().catch(catchError);

    if (!response.ok) {
      console.error('Set password error:', value);

      throw new Error(value.message || 'Set password failed');
    }
    return response.json();
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
    const response = await fetch(`${API_URL}/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(catchError);
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      console.log('Login successful', data);
    },
  });
  return mutation;
};
