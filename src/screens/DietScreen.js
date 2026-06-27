import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { meals } from '../data';

export default function DietScreen() {
  const { waterFilled, toggleWater, getCalories, userData } = useApp();
  const cal = getCalories();

  const macros = [
    { name: 'پروتئین', val: '165g', dot: '#FF6B2B', pct: 33 },
    { name: 'کربوهیدرات', val: '280g', dot: '#4A90D9', pct: 45 },
    { name: 'چربی', val: '65g', dot: '#57C87A', pct: 22 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>رژیم غذایی</Text>
          <Text style={styles.sub}>برنامه تغذیه بر اساس هدف: {userData.goal}</Text>
        </View>

        {/* Macro Card */}
        <View style={styles.macroCard}>
          {/* Macros List */}
          <View style={styles.macroLeft}>
            {macros.map(m => (
              <View key={m.name} style={styles.macroRow}>
                <Text style={styles.macroVal}>{m.val}</Text>
                <Text style={styles.macroName}>{m.name}</Text>
                <View style={[styles.macroDot, { backgroundColor: m.dot }]} />
              </View>
            ))}
          </View>

          {/* Calorie Circle */}
          <View style={styles.macroRight}>
            <View style={styles.calCircle}>
              <Text style={styles.calBig}>{cal.toLocaleString()}</Text>
              <Text style={styles.calLbl}>کالری روزانه</Text>
            </View>
          </View>
        </View>

        {/* Goal Tag */}
        <View style={styles.goalTagRow}>
          <View style={styles.goalTag}>
            <Text style={styles.goalTagTxt}>🎯 هدف: {userData.goal}</Text>
          </View>
        </View>

        {/* Water Card */}
        <View style={styles.waterCard}>
          <View style={styles.waterHeader}>
            <Text style={styles.waterGoal}>{waterFilled}/۸ لیوان</Text>
            <View style={styles.waterTitleRow}>
              <Text style={styles.waterTitle}>آب روزانه</Text>
              <Text style={{ fontSize: 17, color: colors.blue }}>💧</Text>
            </View>
          </View>
          <View style={styles.cupsRow}>
            {Array.from({ length: 8 }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.cup, i < waterFilled && styles.cupFilled]}
                onPress={() => toggleWater(i)}
              >
                <Text style={[styles.cupIcon, i < waterFilled && styles.cupIconFilled]}>💧</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Meal Plan */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {meals.map(m => (
            <View key={m.time} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View style={styles.mealBadge}>
                  <Text style={styles.mealBadgeTxt}>{m.kcal} کالری</Text>
                </View>
                <Text style={styles.mealName}>{m.time}</Text>
              </View>
              <View style={styles.mealItems}>
                {m.items.map(item => (
                  <View key={item.name} style={styles.mealItem}>
                    <Text style={styles.mealMacro}>{item.macro}</Text>
                    <Text style={styles.mealItemName}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.gray100 },
  header: { backgroundColor: colors.orange, padding: 20, paddingBottom: 38 },
  title: { fontSize: 19, fontWeight: '700', color: '#fff', textAlign: 'right' },
  sub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3, textAlign: 'right' },
  macroCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: -22,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  macroLeft: { flex: 1, gap: 9 },
  macroRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 7 },
  macroDot: { width: 10, height: 10, borderRadius: 5 },
  macroName: { fontSize: 12, color: colors.gray600, flex: 1, textAlign: 'right', fontWeight: '500' },
  macroVal: { fontSize: 13, fontWeight: '700', color: colors.text },
  macroRight: { alignItems: 'center' },
  calCircle: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 8,
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calBig: { fontSize: 16, fontWeight: '700', color: colors.text },
  calLbl: { fontSize: 9, color: colors.gray600, textAlign: 'center', fontWeight: '500' },
  goalTagRow: { paddingHorizontal: 20, marginTop: 12, marginBottom: 2, alignItems: 'flex-end' },
  goalTag: { backgroundColor: colors.orangeBg, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  goalTagTxt: { color: colors.orangeDark, fontSize: 12, fontWeight: '700' },
  waterCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  waterHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 },
  waterTitleRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  waterTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  waterGoal: { fontSize: 12, color: colors.gray600, fontWeight: '500' },
  cupsRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 7 },
  cup: {
    width: 34, height: 34,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray200,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cupFilled: { backgroundColor: colors.blueBg, borderColor: colors.blue },
  cupIcon: { fontSize: 16, opacity: 0.2 },
  cupIconFilled: { opacity: 1 },
  mealCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  mealHeader: { flexDirection: 'row-reverse', alignItems: 'center', padding: 13, gap: 10 },
  mealName: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1, textAlign: 'right' },
  mealBadge: { backgroundColor: colors.orangeBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  mealBadgeTxt: { color: colors.orangeDark, fontSize: 11, fontWeight: '700' },
  mealItems: { paddingHorizontal: 15, paddingBottom: 13 },
  mealItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    gap: 8,
  },
  mealItemName: { fontSize: 13, color: colors.text, fontWeight: '500', flex: 1, textAlign: 'right' },
  mealMacro: { fontSize: 11, color: colors.gray600, fontWeight: '500' },
});
