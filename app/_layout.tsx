import { Stack } from "expo-router";
import 'expo-dev-client';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/register" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/forgotPassword/index" />
      <Stack.Screen name="auth/forgotPassword/otpScreen" />
      <Stack.Screen name="auth/otpScreen" />
      <Stack.Screen name="auth/createPassword" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
