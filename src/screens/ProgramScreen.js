import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { days } from '../data';

function ExerciseCard({ ex }) {
  const [expanded, setExpanded] = useState(false);
  const [sets, setSets] = useState(
    Array.from({ length: ex.sets }, () => ({ reps: String(ex.reps), weight: String(ex.weight) }))
  );

  const updateSet = (i, field, val) => {
    setSets(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardHeader} onPress={() => setExpanded(!expanded)}>
        <Text style={[styles.expandIcon, expanded && { transform: [{ rotate: '180deg' }] }]}>⌄</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{ex.name}</Text>
          <Text style={styles.cardSets}>{ex.sets} ست × {ex.reps} تکرار · {ex.weight}kg</Text>
        </View>
        <View style={styles.cardIcon}>
          <Text style={{ fontSize: 19 }}>🏋️</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.cardBody}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 1 }]}>وزن (kg)</Text>
            <Text style={[styles.th, { flex: 1 }]}>تکرار</Text>
            <Text style={[styles.th, { width: 40 }]}>ست</Text>
          </View>
          {sets.map((s, i) => (
            <View key={i} style={styles.tableRow}>
              <TextInput
                style={styles.setInput}
                value={s.weight}
                onChangeText={v => updateSet(i, 'weight', v)}
                keyboardType="numeric"
                textAlign="center"
              />
              <TextInput
                style={styles.setInput}
                value={s.reps}
                onChangeText={v => updateSet(i, 'reps', v)}
                keyboardType="numeric"
                textAlign="center"
              />
              <Text style={styles.setNum}>{i + 1}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function ProgramScreen() {
  const [currentDay, setCurrentDay] = useState(0);
  const day = days[currentDay];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>برنامه تمرینی</Text>
        <Text style={styles.sub}>برنامه هفتگی شخصی‌سازی شده</Text>
      </View>

      {/* Day Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsBar}
      >
        {days.map((d, i) => (
          <TouchableOpacity
            key={d.label}
            style={[styles.tab, currentDay === i && styles.tabActive]}
            onPress={() => setCurrentDay(i)}
          >
            <Text style={[styles.tabTxt, currentDay === i && styles.tabTxtActive]}>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {day.type === 'rest' ? (
          <View style={styles.restDay}>
            <Text style={{ fontSize: 52, marginBottom: 12 }}>🌙</Text>
            <Text style={styles.restTitle}>روز استراحت</Text>
            <Text style={styles.restSub}>بدنت به ریکاوری نیاز داره</Text>
          </View>
        ) : (
          <>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeTxt}>{day.name}</Text>
            </View>
            {day.exercises.map((ex, i) => (
              <ExerciseCard key={i} ex={ex} />
            ))}
            <View style={styles.addBtn}>
              <Text style={styles.addBtnTxt}>+ افزودن تمرین جدید</Text>
            </View>
          </>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.gray100 },
  header: { backgroundColor: colors.orange, padding: 20, paddingBottom: 18 },
  title: { fontSize: 19, fontWeight: '700', color: '#fff', textAlign: 'right' },
  sub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3, textAlign: 'right' },
  tabsBar: { paddingHorizontal: 20, paddingTop: 12, gap: 0, flexDirection: 'row-reverse' },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: colors.orange },
  tabTxt: { fontSize: 12, fontWeight: '700', color: colors.gray600 },
  tabTxtActive: { color: colors.orange },
  content: { flex: 1, padding: 14, paddingTop: 14 },
  dayBadge: { backgroundColor: colors.orangeBg, padding: 8, paddingHorizontal: 12, borderRadius: 8, marginBottom: 10 },
  dayBadgeTxt: { fontSize: 12, fontWeight: '700', color: colors.orange, textAlign: 'right' },
  card: {
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
  cardHeader: { flexDirection: 'row-reverse', alignItems: 'center', padding: 13, gap: 11 },
  cardIcon: { width: 38, height: 38, backgroundColor: colors.orangeBg, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 13, fontWeight: '700', color: colors.text, textAlign: 'right' },
  cardSets: { fontSize: 11, color: colors.gray600, marginTop: 2, textAlign: 'right', fontWeight: '500' },
  expandIcon: { fontSize: 20, color: colors.gray400 },
  cardBody: { padding: 15, paddingTop: 0, borderTopWidth: 1, borderTopColor: colors.gray200 },
  tableHeader: { flexDirection: 'row-reverse', paddingVertical: 6 },
  th: { fontSize: 11, fontWeight: '700', color: colors.gray600, textAlign: 'center' },
  tableRow: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: colors.gray200 },
  setNum: { width: 40, fontSize: 13, fontWeight: '700', color: colors.orange, textAlign: 'center' },
  setInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 6,
    fontSize: 13,
    backgroundColor: colors.gray100,
    color: colors.text,
    marginHorizontal: 4,
  },
  restDay: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  restTitle: { fontSize: 18, fontWeight: '700', color: colors.gray600, marginBottom: 8 },
  restSub: { fontSize: 13, color: colors.gray400, fontWeight: '500' },
  addBtn: {
    borderWidth: 2,
    borderColor: colors.gray200,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  addBtnTxt: { fontSize: 13, fontWeight: '600', color: colors.gray600 },
});
