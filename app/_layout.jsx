import { StyleSheet, Text, View } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

const RootLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, []);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
