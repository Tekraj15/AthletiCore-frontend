import React from 'react';
import { useRouter } from 'expo-router';

import ProfileScreen from '../../screens/ProfileScreen';
import { useLogout } from '@/hooks/useLogout';

export default function ProfileTab() {
  const router = useRouter();
  const { mutate: logoutMutation, isPending } = useLogout();

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        router.replace('/(auth)');
      },
    });
  };

  return <ProfileScreen onLogout={handleLogout} logoutLoading={isPending} />;
}
