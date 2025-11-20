import { ThemedText } from '@/components/themed-text';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ActivityScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const activityStats = {
    income: 15240.75,
    expenses: 8430.25,
    savings: 4120.50,
    investments: 12800.00
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'income', label: 'Income' },
    { key: 'expenses', label: 'Expenses' },
    { key: 'transfers', label: 'Transfers' },
    { key: 'farm', label: 'Farm' }
  ];

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' }
  ];

  const transactions = [
    {
      id: 1,
      type: 'income',
      title: 'Corn Harvest Sale',
      description: 'Market sales - Field A',
      amount: 8450.00,
      date: 'Today',
      time: '14:30',
      icon: 'wheat-awn',
      status: 'completed',
      category: 'Crop Sales'
    },
    {
      id: 2,
      type: 'expense',
      title: 'Seed Purchase',
      description: 'Seed Co-op - Premium seeds',
      amount: -1250.00,
      date: 'Yesterday',
      time: '09:15',
      icon: 'seedling',
      status: 'completed',
      category: 'Inputs'
    },
    {
      id: 3,
      type: 'farm',
      title: 'Equipment Maintenance',
      description: 'Tractor service and parts',
      amount: -320.75,
      date: 'Oct 28',
      time: '11:45',
      icon: 'tools',
      status: 'completed',
      category: 'Machinery'
    },
    {
      id: 4,
      type: 'income',
      title: 'Soybean Advance',
      description: 'Buyer advance payment',
      amount: 4500.00,
      date: 'Oct 27',
      time: '16:20',
      icon: 'sack',
      status: 'pending',
      category: 'Crop Sales'
    },
    {
      id: 5,
      type: 'expense',
      title: 'Organic Fertilizer',
      description: 'Sustainable farming inputs',
      amount: -890.50,
      date: 'Oct 26',
      time: '13:10',
      icon: 'leaf',
      status: 'completed',
      category: 'Fertilizer'
    },
    {
      id: 6,
      type: 'transfer',
      title: 'Insurance Premium',
      description: 'Crop insurance payment',
      amount: -450.00,
      date: 'Oct 25',
      time: '08:30',
      icon: 'shield-check',
      status: 'completed',
      category: 'Insurance'
    }
  ];

  const financialHealth = {
    score: 78,
    level: 'Good',
    trend: 'up',
    recommendations: [
      'Increase emergency fund by 15%',
      'Consider crop diversification',
      'Review insurance coverage'
    ]
  };

  const getFilteredTransactions = () => {
    if (activeFilter === 'all') return transactions;
    return transactions.filter(tx => tx.type === activeFilter);
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? '#10B981' : '#F59E0B';
  };

  const getStatusIcon = (status: string) => {
    return status === 'completed' ? 'check-circle' : 'clock';
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
            <ThemedText style={styles.greeting}>Activity & Analytics</ThemedText>
            <ThemedText style={styles.userName}>Financial Overview</ThemedText>
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.activePeriodButton
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <ThemedText style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.activePeriodButtonText
              ]}>
                {period.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Financial Health Score */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#DCFCE7', '#BBF7D0']}
            style={styles.healthCard}
          >
            <View style={styles.healthHeader}>
              <View style={styles.healthInfo}>
                <ThemedText style={styles.healthLabel}>Farm Financial Health</ThemedText>
                <ThemedText style={styles.healthScore}>{financialHealth.score}/100</ThemedText>
                <ThemedText style={styles.healthLevel}>{financialHealth.level}</ThemedText>
              </View>
              <View style={styles.scoreCircle}>
                <ThemedText style={styles.scoreText}>{financialHealth.score}</ThemedText>
                <Feather name="trending-up" size={16} color="#059669" />
              </View>
            </View>
            
            <View style={styles.recommendations}>
              <ThemedText style={styles.recommendationsTitle}>Recommendations</ThemedText>
              {financialHealth.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Feather name="check-circle" size={14} color="#059669" />
                  <ThemedText style={styles.recommendationText}>{rec}</ThemedText>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Financial Summary</ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#DCFCE7' }]}>
                <Feather name="arrow-down-circle" size={20} color="#059669" />
              </View>
              <ThemedText style={styles.statValue}>MK {activityStats.income.toLocaleString()}</ThemedText>
              <ThemedText style={styles.statLabel}>Income</ThemedText>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                <Feather name="arrow-up-circle" size={20} color="#D97706" />
              </View>
              <ThemedText style={styles.statValue}>MK {activityStats.expenses.toLocaleString()}</ThemedText>
              <ThemedText style={styles.statLabel}>Expenses</ThemedText>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
                <Feather name="dollar-sign" size={20} color="#3B82F6" />
              </View>
              <ThemedText style={styles.statValue}>MK {activityStats.savings.toLocaleString()}</ThemedText>
              <ThemedText style={styles.statLabel}>Savings</ThemedText>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#E0E7FF' }]}>
                <Feather name="trending-up" size={20} color="#8B5CF6" />
              </View>
              <ThemedText style={styles.statValue}>MK {activityStats.investments.toLocaleString()}</ThemedText>
              <ThemedText style={styles.statLabel}>Investments</ThemedText>
            </View>
          </View>
        </View>

        {/* Export Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.exportButton}>
            <MaterialCommunityIcons name="file-export-outline" size={24} color="#059669" />
            <ThemedText style={styles.exportButtonText}>Export Statement</ThemedText>
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
    paddingBottom: 20,
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
    fontSize: 12,
    fontWeight: '500',
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  iconButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodButton: {
    backgroundColor: '#FFF',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A7F3D0',
  },
  activePeriodButtonText: {
    color: '#059669',
  },
  scrollView: {
    flex: 1,
    marginTop: -10,
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
    marginBottom: 16,
  },
  viewAllText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
  },
  healthCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  healthInfo: {
    flex: 1,
  },
  healthLabel: {
    color: '#64748B',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  healthScore: {
    color: '#064E3B',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  healthLevel: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  scoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#BBF7D0',
    marginLeft: 10,
  },
  scoreText: {
    color: '#064E3B',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  recommendations: {
    borderTopWidth: 1,
    borderTopColor: '#BBF7D0',
    paddingTop: 16,
  },
  recommendationsTitle: {
    color: '#064E3B',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  recommendationText: {
    color: '#64748B',
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    color: '#064E3B',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  exportButton: {
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
  exportButtonText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '600',
  },
});