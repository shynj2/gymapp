import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { days } from '../data';

const todayExercises = days[0].exercises.slice(0, 5);

export default function HomeScreen({ onNavigate }) {
  const { userData, completedExercises, toggleExercise } = useApp();

  const date = new Date().toLocaleDateString('fa-IR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const workoutCards = [
    { icon: '🏋️', name: 'پوش دی', sets: '5 تمرین · 4 ست' },
    { icon: '💪', name: 'پول دی', sets: '5 تمرین · 4 ست' },
    { icon: '🦵', name: 'لگ دی', sets: '5 تمرین · 4 ست' },
    { icon: '🏃', name: 'کاردیو', sets: '4 تمرین · مدار' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>سلام 👋</Text>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.date}>امروز — {date}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { val: '4', lbl: 'جلسه هفته' },
            { val: '12', lbl: 'روز پیوسته' },
            { val: '2.3k', lbl: 'کالری سوزی' },
          ].map(s => (
            <View key={s.lbl} style={styles.statCard}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Quick Access */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity onPress={() => onNavigate('program')}>
            <Text style={styles.sectionLink}>همه ←</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>برنامه‌های تمرینی</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollX}
          style={{ direction: 'rtl' }}
        >
          {workoutCards.map(w => (
            <TouchableOpacity key={w.name} style={styles.workoutCard} onPress={() => onNavigate('program')}>
              <View style={styles.wcIcon}>
                <Text style={{ fontSize: 20 }}>{w.icon}</Text>
              </View>
              <Text style={styles.wcName}>{w.name}</Text>
              <Text style={styles.wcSets}>{w.sets}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Today Plan */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity onPress={() => onNavigate('program')}>
            <Text style={styles.sectionLink}>همه ←</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>برنامه امروز</Text>
        </View>

        <View style={styles.todayPlan}>
          <View style={styles.todayTop}>
            <View style={styles.todayTag}><Text style={styles.todayTagTxt}>۵ تمرین</Text></View>
            <Text style={styles.todayPlanName}>روز A — سینه و سرشانه</Text>
          </View>
          {todayExercises.map((ex, i) => {
            const key = `home-${i}`;
            const done = completedExercises.has(key);
            return (
              <TouchableOpacity key={key} style={styles.exRow} onPress={() => toggleExercise(key)}>
                <View style={[styles.exCheck, done && styles.exCheckDone]}>
                  {done && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
                </View>
                <View style={styles.exInfo}>
                  <Text style={styles.exName}>{ex.name}</Text>
                  <Text style={styles.exDetail}>{ex.sets} ست × {ex.reps} تکرار</Text>
                </View>
                <View style={styles.exNum}>
                  <Text style={styles.exNumTxt}>{i + 1}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.gray100 },
  header: { backgroundColor: colors.orange, padding: 20, paddingBottom: 28 },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'right' },
  userName: { fontSize: 21, fontWeight: '700', color: '#fff', textAlign: 'right' },
  date: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2, textAlign: 'right' },
  statsRow: {
    flexDirection: 'row-reverse',
    marginHorizontal: 20,
    marginTop: -18,
    marginBottom: 14,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  statVal: { fontSize: 20, fontWeight: '700', color: colors.orange },
  statLbl: { fontSize: 10, color: colors.gray600, marginTop: 2, fontWeight: '600', textAlign: 'center' },
  sectionHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  sectionLink: { fontSize: 12, color: colors.orange, fontWeight: '600' },
  scrollX: { paddingHorizontal: 20, paddingBottom: 4, gap: 12 },
  workoutCard: {
    minWidth: 148,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  wcIcon: { width: 40, height: 40, backgroundColor: colors.orangeBg, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  wcName: { fontSize: 13, fontWeight: '700', color: colors.text, textAlign: 'right' },
  wcSets: { fontSize: 11, color: colors.gray600, marginTop: 3, textAlign: 'right' },
  todayPlan: { backgroundColor: colors.white, marginHorizontal: 20, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
  todayTop: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  todayPlanName: { fontSize: 14, fontWeight: '700', color: colors.text },
  todayTag: { backgroundColor: colors.orangeBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  todayTagTxt: { color: colors.orangeDark, fontSize: 11, fontWeight: '700' },
  exRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.gray200 },
  exNum: { width: 28, height: 28, backgroundColor: colors.orangeBg, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  exNumTxt: { fontSize: 12, fontWeight: '700', color: colors.orangeDark },
  exInfo: { flex: 1 },
  exName: { fontSize: 13, fontWeight: '600', color: colors.text, textAlign: 'right' },
  exDetail: { fontSize: 11, color: colors.gray600, marginTop: 2, textAlign: 'right' },
  exCheck: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.gray200, alignItems: 'center', justifyContent: 'center' },
  exCheckDone: { backgroundColor: colors.orange, borderColor: colors.orange },
});
