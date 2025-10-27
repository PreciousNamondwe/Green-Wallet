import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          height: 60,
          backgroundColor:'#F0FDF4',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        },
        tabBarLabelStyle: {
          top:5,
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 15,
          color:'#222'
        },
        tabBarIconStyle:{
          top:5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={'#22C55E'} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={'#22C55E'} />,
        }}
      />
    </Tabs>
  );
}
