import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const TABS = [
  { key: 'home', icon: '🏠', label: 'خانه' },
  { key: 'equipment', icon: '🏋️', label: 'تجهیزات' },
  { key: 'program', icon: '📋', label: 'برنامه' },
  { key: 'diet', icon: '🥗', label: 'رژیم' },
  { key: 'profile', icon: '👤', label: 'پروفایل' },
];

export default function BottomNav({ active, onSelect }) {
  return (
    <View style={styles.nav}>
      {TABS.map(tab => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.item}
            onPress={() => onSelect(tab.key)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            {isActive && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    borderTopWidth: 1.5,
    borderTopColor: '#EBEBEB',
    paddingTop: 10,
    paddingBottom: 14,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  icon: { fontSize: 22, opacity: 0.4 },
  iconActive: { opacity: 1 },
  label: { fontSize: 10, fontWeight: '600', color: colors.gray400 },
  labelActive: { color: colors.orange },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.orange, marginTop: -2 },
});
