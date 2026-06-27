import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import BottomNav from './src/components/BottomNav';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import EquipmentScreen from './src/screens/EquipmentScreen';
import ProgramScreen from './src/screens/ProgramScreen';
import DietScreen from './src/screens/DietScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { colors } from './src/theme/colors';

function AppContent() {
  const [screen, setScreen] = useState('onboarding');
  const [activeTab, setActiveTab] = useState('home');

  const handleOnboardingDone = () => setScreen('main');
  const handleEditProfile = () => setScreen('onboarding');

  const handleNavigate = (tab) => {
    setActiveTab(tab);
  };

  if (screen === 'onboarding') {
    return <OnboardingScreen onDone={handleOnboardingDone} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={handleNavigate} />;
      case 'equipment': return <EquipmentScreen />;
      case 'program': return <ProgramScreen />;
      case 'diet': return <DietScreen />;
      case 'profile': return <ProfileScreen onEditProfile={handleEditProfile} />;
      default: return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.orange} />
      <View style={styles.screenWrap}>
        {renderScreen()}
      </View>
      <BottomNav active={activeTab} onSelect={setActiveTab} />
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  screenWrap: { flex: 1 },
});
