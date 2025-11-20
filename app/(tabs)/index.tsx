import { ThemedText } from '@/components/themed-text';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeCard, setActiveCard] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const balanceVisible = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  const cards = [
    { 
      id: 1, 
      number: 'xxxx xxxx 7812', 
      balance: 'MKW 10000', 
      type: 'operating', 
      currency: 'MWK',
      crop: 'Corn Harvest'
    },
    { 
      id: 2, 
      number: 'xxxx xxxx 4523', 
      balance: 'MKW 10000', 
      type: 'savings', 
      currency: 'MWK',
      crop: 'Soybean Fund'
    },
    { 
      id: 3, 
      number: 'xxxx xxxx 1897', 
      balance: 'MKW 10000', 
      type: 'loan', 
      currency: 'MWK',
      crop: 'Equipment Loan'
    },
  ];

  const agriculturalFeatures = [
    { 
      icon: 'wallet', 
      label: 'Loans', 
      color: '#22C55E', 
      description: 'Input & finacial',
      iconLib: FontAwesome5,
      onPress: () => router.push('./services/loans')
    },
    { 
      icon: 'shopping-cart', 
      label: 'Market', 
      color: '#06B6D4', 
      description: 'Online market',
      iconLib: FontAwesome5,
      onPress: () => router.push('./services/loans')
    },
    { 
      icon: 'cloud-rain', 
      label: 'Weather', 
      color: '#8B5CF6', 
      description: 'monitoring',
      iconLib: FontAwesome5,
      onPress: () => router.push('./services/loans')
    },
    { 
      icon: 'map', 
      label: 'Roadmap', 
      color: '#10B981', 
      description: 'crop Roadmap',
      iconLib: FontAwesome5
    },
    { 
      icon: 'shield-alt', 
      label: 'Insurance', 
      color: '#EF4444', 
      description: 'Risk Protection',
      iconLib: FontAwesome5,
      onPress: () => router.push('./services/loans')
    },
  ];

  const toggleBalanceVisibility = () => {
    Animated.spring(balanceVisible, {
      toValue: balanceVisible._value === 1 ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const renderCard = (card, index) => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });

    const getCardColors = (type) => {
      switch(type) {
        case 'operating':
          return ['#70c991ff', '#3bb969ff'];
        case 'savings':
          return ['#72d8b8ff', '#09e098ff'];
        case 'loan':
          return ['#5ee08cff', '#4ece7bff'];
        default:
          return ['#16A34A', '#22C55E'];
      }
    };

    return (
      <Animated.View
        key={card.id}
        style={[
          styles.card,
          { transform: [{ scale }], opacity }
        ]}
      >
        <LinearGradient
          colors={getCardColors(card.type)}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View>
              <ThemedText style={styles.cardType}>
                {card.type === 'operating' ? 'Operating Account' : 
                 card.type === 'savings' ? 'Crop Savings' : 'Equipment Loan'}
              </ThemedText>
              <ThemedText style={styles.cardCrop}>{card.crop}</ThemedText>
            </View>
            <MaterialCommunityIcons 
              name="integrated-circuit-chip" 
              size={28} 
              color="rgba(255,255,255,0.9)" 
            />
          </View>
          
          <View style={styles.cardBalance}>
            <ThemedText style={styles.cardBalanceLabel}>Available Balance</ThemedText>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Animated.View style={{ opacity: balanceVisible }}>
                <ThemedText style={styles.cardBalanceAmount}>
                  {card.balance}
                </ThemedText>
              </Animated.View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.cardFooter}>
            <ThemedText style={styles.cardNumber}>{card.number}</ThemedText>
            <View style={styles.cardStatus}>
              <View style={styles.statusDot} />
              <ThemedText style={styles.cardStatusText}>Active</ThemedText>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const renderFeatureIcon = (feature) => {
    const IconComponent = feature.iconLib || Feather;
    return <IconComponent name={feature.icon} size={20} color={feature.color} />;
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
            <ThemedText style={styles.greeting}>Good morning, Farmer</ThemedText>
            <ThemedText style={styles.userName}>Precious</ThemedText>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={20} color="#D1FAE5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={20} color="#D1FAE5" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Cards Carousel */}
        <View style={styles.cardsSection}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {cards.map((card, index) => renderCard(card, index))}
          </Animated.ScrollView>
          <View style={styles.cardIndicators}>
            {cards.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.cardIndicator,
                  activeCard === index && styles.cardIndicatorActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* Farm Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Wallet Services</ThemedText>
          <View style={styles.featuresGrid}>
            {agriculturalFeatures.map((item, index) => (
              <TouchableOpacity key={index} style={styles.featureItem} onPress={item.onPress}>
                <LinearGradient
                  colors={[`${item.color}15`, `${item.color}08`]}
                  style={[styles.featureIconContainer, { borderColor: `${item.color}20` }]}
                >
                  {renderFeatureIcon(item)}
                </LinearGradient>
                <ThemedText style={styles.featureLabel}>{item.label}</ThemedText>
                <ThemedText style={styles.featureDescription}>{item.description}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>


          {/* Cooperative Feature */}
        <View style={styles.section}>
          <View style={styles.coopCard}>
            <View style={styles.coopContent}>
              <FontAwesome5 name="users" size={24} color="#059669" />
              <View style={styles.coopText}>
                <ThemedText style={styles.coopTitle}>Cooperative Group Wallets</ThemedText>
                <ThemedText style={styles.coopDescription}>
                  Join farmer groups for collective savings, loans, and better rates
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.coopButton}>
              <ThemedText style={styles.coopButtonText}>Join Group</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomRightRadius:50,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greeting: {
    color: '#A7F3D0',
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  cardsSection: {
    top:-20,
    paddingVertical: 20,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: 200,
    marginHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardType: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
  cardCrop: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  cardBalance: {
    alignItems: 'center',
  },
  cardBalanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 8,
  },
  cardBalanceAmount: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '600',
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#BBF7D0',
    marginRight: 6,
  },
  cardStatusText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  cardIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  cardIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  cardIndicatorActive: {
    backgroundColor: '#059669',
    width: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
    top:-30,
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
    fontSize: 14,
    fontWeight: '600',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    width: (SCREEN_WIDTH - 64) / 3.0,
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  positiveAmount: {
    color: '#059669',
  },
  negativeAmount: {
    color: '#D97706',
  },
  transactionDate: {
    fontSize: 11,
    color: '#94A3B8',
  },
  investmentsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  investmentCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  investmentName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  investmentValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 4,
  },
  investmentChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  positiveChange: {
    color: '#059669',
  },
  coopCard: {
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
    marginBottom:50,
  },
  coopContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coopText: {
    marginLeft: 12,
    flex: 1,
  },
  coopTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 4,
  },
  coopDescription: {
    fontSize: 12,
    color: '#64748B',
  },
  coopButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  coopButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});