import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const userProfile = {
    name: 'Precious Namondwe',
    phone: '+265 991 234 567',
    email: 'precious@farmer-greenWallet.mw',
    memberSince: 'March 2024',
    farmerId: 'FARM-MW-2847',
    farmSize: '50 acres',
    location: 'Lilongwe, Malawi',
    mainCrops: ['Maize', 'Soybeans', 'Groundnuts'],
    cooperative: 'Lilongwe Farmers Co-op'
  };

  const farmStats = {
    totalValue: '142,800.00',
    activeLoans: '12,500.00',
    insuranceCoverage: '85,000.00',
    sustainabilityScore: 78
  };

  const menuItems = [
    {
      icon: 'user',
      label: 'Personal Information',
      description: 'Update your profile details',
      color: '#059669',
      screen: 'PersonalInfo'
    },
    {
      icon: 'farm',
      label: 'Farm Details',
      description: 'Manage farm information',
      color: '#D97706',
      screen: 'FarmDetails'
    },
    {
      icon: 'shield-check',
      label: 'Insurance',
      description: 'View coverage and claims',
      color: '#3B82F6',
      screen: 'Insurance'
    },
    {
      icon: 'hand-holding-usd',
      label: 'Loans & Credit',
      description: 'Manage loans and applications',
      color: '#8B5CF6',
      screen: 'Loans'
    },
    {
      icon: 'chart-line',
      label: 'Analytics',
      description: 'Farm performance insights',
      color: '#06B6D4',
      screen: 'Analytics'
    },
    {
      icon: 'cog',
      label: 'Settings',
      description: 'App preferences and security',
      color: '#64748B',
      screen: 'Settings'
    },
    {
      icon: 'headset',
      label: 'Support',
      description: 'Get help and contact us',
      color: '#EC4899',
      screen: 'Support'
    },
    {
      icon: 'file-document',
      label: 'Documents',
      description: 'Contracts and statements',
      color: '#10B981',
      screen: 'Documents'
    }
  ];

  const quickActions = [
    {
      icon: 'qrcode',
      label: 'My QR Code',
      color: '#059669'
    },
    {
      icon: 'share',
      label: 'Invite Friends',
      color: '#3B82F6'
    },
    {
      icon: 'download',
      label: 'Export Data',
      color: '#8B5CF6'
    },
    {
      icon: 'lock',
      label: 'Privacy',
      color: '#EF4444'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#065F46" />
      
      {/* Header */}
      <LinearGradient
        colors={['#065F46', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Feather name="check" size={12} color="#FFF" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.userName}>{userProfile.name}</ThemedText>
              <ThemedText style={styles.userRole}>Smallholder Farmer</ThemedText>
              <View style={styles.memberSince}>
                <Feather name="calendar" size={12} color="#A7F3D0" />
                <ThemedText style={styles.memberSinceText}>
                  Member since {userProfile.memberSince}
                </ThemedText>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-3" size={18} color="#059669" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionItem}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                  <MaterialCommunityIcons name={action.icon} size={24} color={action.color} />
                </View>
                <ThemedText style={styles.actionLabel}>{action.label}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account & Services</ThemedText>
          <View style={styles.menuList}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                    <FontAwesome5 name={item.icon} size={18} color={item.color} />
                  </View>
                </View>
                <View style={styles.menuContent}>
                  <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
                  <ThemedText style={styles.menuDescription}>{item.description}</ThemedText>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Security & Privacy</ThemedText>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons name="bell-outline" size={20} color="#059669" />
                <View style={styles.settingDetails}>
                  <ThemedText style={styles.settingLabel}>Push Notifications</ThemedText>
                  <ThemedText style={styles.settingDescription}>
                    Receive important updates
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity 
                style={[
                  styles.toggle,
                  notificationsEnabled && styles.toggleActive
                ]}
                onPress={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <View style={[
                  styles.toggleThumb,
                  notificationsEnabled && styles.toggleThumbActive
                ]} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons name="fingerprint" size={20} color="#059669" />
                <View style={styles.settingDetails}>
                  <ThemedText style={styles.settingLabel}>Biometric Login</ThemedText>
                  <ThemedText style={styles.settingDescription}>
                    Use fingerprint or face ID
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity 
                style={[
                  styles.toggle,
                  biometricEnabled && styles.toggleActive
                ]}
                onPress={() => setBiometricEnabled(!biometricEnabled)}
              >
                <View style={[
                  styles.toggleThumb,
                  biometricEnabled && styles.toggleThumbActive
                ]} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.securityButton}>
              <MaterialCommunityIcons name="shield-account" size={20} color="#059669" />
              <ThemedText style={styles.securityButtonText}>Change Password</ThemedText>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#DCFCE7', '#BBF7D0']}
            style={styles.supportCard}
          >
            <View style={styles.supportContent}>
              <View style={styles.supportIcon}>
                <Feather name="headphones" size={24} color="#059669" />
              </View>
              <View style={styles.supportInfo}>
                <ThemedText style={styles.supportTitle}>Need Help?</ThemedText>
                <ThemedText style={styles.supportDescription}>
                  Our support team is here to assist you with any questions
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.supportButton}>
              <ThemedText style={styles.supportButtonText}>Contact Support</ThemedText>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Feather name="log-out" size={20} color="#EF4444" />
            <ThemedText style={styles.logoutButtonText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userRole: {
    color: '#A7F3D0',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberSinceText: {
    color: '#A7F3D0',
    fontSize: 12,
    marginLeft: 6,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  scrollView: {
    flex: 1,
    marginTop: 15,
    marginBottom:20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#064E3B',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#064E3B',
    textAlign: 'center',
  },
  cropsSection: {
    marginTop: 8,
  },
  cropsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 12,
  },
  cropsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cropTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  cropText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  menuList: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconContainer: {
    marginRight: 12,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#64748B',
  },
  settingsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingDetails: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#64748B',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#059669',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  securityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  securityButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
  },
  supportCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  supportIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  supportButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});