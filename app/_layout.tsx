import { Stack } from 'expo-router';
import 'expo-dev-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvier } from '@/contexts/UserContext';
export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvier>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/register" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/forgotPassword/index" />
          <Stack.Screen name="auth/forgotPassword/otpScreen" />
          <Stack.Screen name="auth/otpScreen" />
          <Stack.Screen name="auth/createPassword" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </UserProvier>
    </QueryClientProvider>
  );
}
