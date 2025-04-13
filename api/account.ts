import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const useAddAccount = (onSuccess, onError) => {
  const requestFn = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${API_URL}/add.php`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: requestFn,
    onSuccess: (data) => {
      console.log("Account added successfully:", data);
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.error("Error adding account:", error);
      if (onError) onError(error);
    },
  });
  return mutation;
};

export const useGetBankList = (options = {}) => {
  const queryKey = ["bankList"];

  const fetchBankList = async () => {
    const response = await fetch(`${API_URL}/get_bank_list_paystack.php`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  const query = useQuery({
    queryKey,
    queryFn: fetchBankList,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
  return query;
};
