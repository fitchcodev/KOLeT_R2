import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const fetchAPI = async (endpoint, method = 'GET', data = null) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error: HTTP status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Unknown error occurred');
  }
};

export const useAddAccount = (onSuccess, onError) => {
  const requestFn = async (data) => {
    try {
      return await fetchAPI('/add1.php', 'POST', data);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
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
      return await fetchAPI('/add2.php', 'POST', data);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
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
      return await fetchAPI('https://api.paystack.co/bank', 'GET');
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.message || 'Failed to fetch bank list');
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
