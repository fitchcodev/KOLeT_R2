import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAddAccount = (onSuccess, onError) => {
  const requestFn = async (data) => {
    try {
      const response = await api.post('/add1.php', data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError | Error | any;
      console.error('API Error:', error);
      throw new Error(
        error.response?.data?.message ||
          `Error: ${error.message || 'Unknown error occurred'}`
      );
    }
  };

  const mutation = useMutation({
    mutationFn: requestFn,
    onSuccess: (data) => {
      console.log('Account added successfully:', data);
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.error('Error adding account:', error);
      if (onError) onError(error);
    },
  });
  return mutation;
};

export const useGetAccountName = () => {
  const requestFn = async (data) => {
    try {
      const response = await api.post('/add2.php', data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError | Error | any;
      console.error('API Error:', error);
      throw new Error(
        error.response?.data?.message ||
          `Error: ${error.message || 'Unknown error occurred'}`
      );
    }
  };

  const mutation = useMutation({
    mutationFn: requestFn,
    onSuccess: (data) => {
      console.log('Account found successfully', data);
    },
    onError: (error) => {
      console.error('Error finding account:', error);
    },
  });

  return mutation;
};

export const useGetBankList = (options = {}) => {
  const queryKey = ['bankList'];

  const fetchBankList = async () => {
    try {
      const response = await axios.get('https://api.paystack.co/bank');

      return response.data;
    } catch (err) {
      const error = err as AxiosError | Error | any;
      console.error('API Error:', error);
      throw new Error(
        error.response?.data?.message ||
          `Error: ${error.message || 'Failed to fetch bank list'}`
      );
    }
  };

  const query = useQuery({
    queryKey,
    queryFn: fetchBankList,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    ...options,
  });
  return query;
};
