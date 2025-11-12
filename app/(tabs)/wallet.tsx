import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WalletScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('accounts');
  const router = useRouter();

  const walletData = {
    totalBalance: '25,760.50',
    availableBalance: '18,450.75',
    reservedBalance: '7,309.75',
    farmValue: '142,800.00'
  };

  const accounts = [
    {
      id: 1,
      name: 'Operating Account',
      balance: '8,450.75',
      number: '•••• 7812',
      type: 'primary',
      color: '#22C55E'
    },
    {
      id: 2,
      name: 'Crop Savings',
      balance: '12,920.30',
      number: '•••• 4523',
      type: 'savings',
      color: '#10B981'
    },
    {
      id: 3,
      name: 'Insurance Fund',
      balance: '4,389.45',
      number: '•••• 1897',
      type: 'insurance',
      color: '#06B6D4'
    }
  ];

 const walletActions = [
  { icon: 'arrow-down-circle', label: 'Deposit', color: '#22C55E', action: 'deposit' },
  { icon: 'arrow-up-circle', label: 'Withdraw', color: '#EF4444', action: 'withdraw' },
  { icon: 'send', label: 'Transfer', color: '#3B82F6', action: 'transfer' },
  { icon: 'plus-circle', label: 'Top Up', color: '#8B5CF6', action: 'topup' }
];

  const quickTransfers = [
    { 
      name: 'Seed Co-op', 
      icon: 'seedling', 
      iconLib: FontAwesome5,
      color: '#22C55E',
      lastUsed: '2 days ago' 
    },
    { 
      name: 'Fertilizer Ltd', 
      icon: 'flask', 
      iconLib: FontAwesome5,
      color: '#F59E0B',
      lastUsed: '1 week ago' 
    },
    { 
      name: 'Equipment Rent', 
      icon: 'tractor', 
      iconLib: FontAwesome5,
      color: '#EF4444',
      lastUsed: '3 days ago' 
    },
    { 
      name: 'Market Sales', 
      icon: 'chart-line', 
      iconLib: FontAwesome5,
      color: '#3B82F6',
      lastUsed: '1 day ago' 
    },
    { 
      name: 'Water Co-op', 
      icon: 'water', 
      iconLib: FontAwesome5,
      color: '#06B6D4',
      lastUsed: '4 days ago' 
    }
  ];

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const renderTransferIcon = (transfer: any) => {
    const IconComponent = transfer.iconLib || Feather;
    return <IconComponent name={transfer.icon} size={24} color={transfer.color} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#065F46" />
      
      {/* Header */}
      <LinearGradient
        colors={['#065F46', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <ThemedText style={styles.greeting}>My Wallet</ThemedText>
          </View>
        </View>

        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <ThemedText style={styles.balanceLabel}>Total Balance</ThemedText>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Feather 
                name={balanceVisible ? 'eye' : 'eye-off'} 
                size={20} 
                color="#059669" 
              />
            </TouchableOpacity>
          </View>
          
          <ThemedText style={styles.totalBalance}>
            {balanceVisible ? `MKW${walletData.totalBalance}` : '••••••'}
          </ThemedText>
          
          <View style={styles.balanceBreakdown}>
            <View style={styles.balanceItem}>
              <ThemedText style={styles.balanceItemLabel}>Available</ThemedText>
              <ThemedText style={styles.balanceItemValue}>
                MKW{balanceVisible ? walletData.availableBalance : '••••••'}
              </ThemedText>
            </View>
            <View style={styles.balanceItem}>
              <ThemedText style={styles.balanceItemLabel}>Reserved</ThemedText>
              <ThemedText style={styles.balanceItemValue}>
                MKW{balanceVisible ? walletData.reservedBalance : '••••••'}
              </ThemedText>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.actionsGrid}>
            {walletActions.map((action, index) => (
  <TouchableOpacity 
    key={index} 
    style={styles.actionItem}
    onPress={() => {
      if (action.action === 'transfer') {
        router.push('/transactions/transfer');
      }
      if (action.action === 'withdraw') {
        router.push('/transactions/withdraw');
      }
    }}
  >
    <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
      <Feather name={action.icon} size={24} color={action.color} />
    </View>
    <ThemedText style={styles.actionLabel}>{action.label}</ThemedText>
  </TouchableOpacity>
))}
          </View>
        </View>

        {/* Account Tabs */}
        <View style={styles.section}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'accounts' && styles.activeTab]}
              onPress={() => setActiveTab('accounts')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'accounts' && styles.activeTabText]}>
                My Accounts
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'cards' && styles.activeTab]}
              onPress={() => setActiveTab('cards')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'cards' && styles.activeTabText]}>
                Cards
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Accounts List */}
          {activeTab === 'accounts' && (
            <View style={styles.accountsList}>
              {accounts.map((account) => (
                <TouchableOpacity key={account.id} style={styles.accountCard}>
                  <View style={styles.accountHeader}>
                    <View style={[styles.accountIcon, { backgroundColor: `${account.color}15` }]}>
                      <MaterialCommunityIcons 
                        name="wallet-outline" 
                        size={20} 
                        color={account.color} 
                      />
                    </View>
                    <View style={styles.accountInfo}>
                      <ThemedText style={styles.accountName}>{account.name}</ThemedText>
                      <ThemedText style={styles.accountNumber}>{account.number}</ThemedText>
                    </View>
                  </View>
                  <ThemedText style={styles.accountBalance}>
                    MKW{balanceVisible ? account.balance : '••••••'}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Cards View */}
          {activeTab === 'cards' && (
            <View style={styles.cardsSection}>
              <TouchableOpacity style={styles.addCardButton}>
                <View style={styles.addCardIcon}>
                  <Feather name="plus" size={24} color="#059669" />
                </View>
                <ThemedText style={styles.addCardText}>Add New Card</ThemedText>
              </TouchableOpacity>
            </View>
          )}
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
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    color: '#A7F3D0',
    fontSize: 16,
    fontWeight: '500',
  },
  userName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  iconButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  balanceCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  balanceLabel: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  totalBalance: {
    color: '#064E3B',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  balanceBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  balanceItemLabel: {
    color: '#64748B',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  balanceItemValue: {
    color: '#064E3B',
    fontSize: 14,
    fontWeight: '600',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
  },
  viewAllText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsGrid: {
    top:10,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#064E3B',
  },
  accountsList: {
    gap: 12,
  },
  accountCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 2,
  },
  accountNumber: {
    fontSize: 12,
    color: '#64748B',
  },
  accountBalance: {
    fontSize: 14,
    fontWeight: '700',
    color: '#064E3B',
    marginLeft: 12,
  },
  cardsSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  addCardButton: {
    alignItems: 'center',
    padding: 20,
  },
  addCardIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#059669',
    borderStyle: 'dashed',
  },
  addCardText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  transfersContainer: {
    paddingRight: 20,
    gap: 16,
  },
  transferContact: {
    alignItems: 'center',
    paddingHorizontal: 12,
    width: 80,
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 2,
    textAlign: 'center',
  },
  contactLastUsed: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  farmValueCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  farmValueContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  farmValueIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  farmValueInfo: {
    flex: 1,
  },
  farmValueLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
    fontWeight: '500',
  },
  farmValueAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
  },
});