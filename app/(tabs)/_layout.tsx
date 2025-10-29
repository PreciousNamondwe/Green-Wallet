import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
          borderRadius:20,
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
          color:'#22C55E',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={25} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: 'wallet',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="wallet-bifold-outline" size={25} color={color} />,
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <Feather size={25} name="pie-chart" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
