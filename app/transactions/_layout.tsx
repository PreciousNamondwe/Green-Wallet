import { Stack } from 'expo-router';

export default function TransactionsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="transfer" />
      <Stack.Screen name="withdraw" />
    </Stack>
  );
}