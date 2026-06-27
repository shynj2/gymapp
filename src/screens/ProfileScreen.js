import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function ProfileScreen({ onEditProfile }) {
  const { userData, bmi } = useApp();
  const bmiNum = parseFloat(bmi);

  let bmiStatus = 'وزن طبیعی ✓';
  let bmiPct = 45;
  if (bmiNum < 18.5) { bmiStatus = 'کم‌وزن'; bmiPct = 10; }
  else if (bmiNum < 25) { bmiStatus = 'طبیعی ✓'; bmiPct = 30 + (bmiNum - 18.5) / 6.5 * 28; }
  else if (bmiNum < 30) { bmiStatus = 'اضافه وزن'; bmiPct = 58 + (bmiNum - 25) / 5 * 20; }
  else { bmiStatus = 'چاقی'; bmiPct = 78 + (bmiNum - 30) / 10 * 15; }

  const settings = [
    { icon: '🔔', label: 'اعلان‌های تمرین' },
    { icon: '🎯', label: 'تغییر هدف' },
    { icon: '📊', label: 'گزارش پیشرفت' },
    { icon: '🔒', label: 'حریم خصوصی' },
    { icon: 'ℹ️', label: 'درباره اپ' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 34, color: '#fff' }}>👤</Text>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.goal}>هدف: {userData.goal}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { val: String(userData.weight), lbl: 'وزن (kg)' },
            { val: String(userData.height), lbl: 'قد (cm)' },
            { val: bmi, lbl: 'BMI' },
            { val: String(userData.age), lbl: 'سن' },
          ].map(s => (
            <View key={s.lbl} style={styles.statCard}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editBtn} onPress={onEditProfile}>
          <Text style={styles.editBtnTxt}>✏️ ویرایش پروفایل</Text>
        </TouchableOpacity>

        {/* BMI Card */}
        <View style={styles.bmiCard}>
          <Text style={styles.bmiTitle}>شاخص توده بدنی (BMI)</Text>
          <View style={styles.bmiRow}>
            <Text style={styles.bmiStatus}>{bmiStatus}</Text>
            <Text style={styles.bmiVal}>{bmi}</Text>
          </View>
          {/* BMI Bar */}
          <View style={styles.bmiBarWrap}>
            <View style={styles.bmiBar}>
              <View style={[styles.bmiMarker, { right: `${Math.min(93, Math.max(4, bmiPct))}%` }]} />
            </View>
          </View>
          <View style={styles.bmiLabels}>
            <Text style={styles.bmiLabel}>چاقی</Text>
            <Text style={styles.bmiLabel}>اضافه</Text>
            <Text style={styles.bmiLabel}>طبیعی</Text>
            <Text style={styles.bmiLabel}>کم</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsList}>
          {settings.map((s, i) => (
            <TouchableOpacity
              key={s.label}
              style={[styles.settingsItem, i === settings.length - 1 && { borderBottomWidth: 0 }]}
            >
              <Text style={styles.settingsArrow}>›</Text>
              <Text style={styles.settingsLabel}>{s.label}</Text>
              <View style={styles.settingsIcon}>
                <Text style={{ fontSize: 17 }}>{s.icon}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.gray100 },
  header: { backgroundColor: colors.orange, paddingTop: 20, paddingBottom: 56, paddingHorizontal: 20, alignItems: 'center' },
  avatar: {
    width: 70, height: 70,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  name: { fontSize: 20, fontWeight: '700', color: '#fff' },
  goal: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3, fontWeight: '500' },
  statsRow: {
    flexDirection: 'row-reverse',
    marginHorizontal: 20,
    marginTop: -30,
    marginBottom: 14,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 3,
  },
  statVal: { fontSize: 17, fontWeight: '700', color: colors.orange },
  statLbl: { fontSize: 10, color: colors.gray600, marginTop: 2, fontWeight: '600', textAlign: 'center' },
  editBtn: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: colors.orangeBg,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.orange,
  },
  editBtnTxt: { color: colors.orange, fontSize: 13, fontWeight: '700' },
  bmiCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  bmiTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10, textAlign: 'right' },
  bmiRow: { flexDirection: 'row-reverse', alignItems: 'baseline', gap: 8, marginBottom: 10 },
  bmiVal: { fontSize: 26, fontWeight: '700', color: colors.text },
  bmiStatus: { fontSize: 13, color: colors.gray600, fontWeight: '600' },
  bmiBarWrap: { marginBottom: 7 },
  bmiBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray200,
    position: 'relative',
    overflow: 'visible',
  },
  bmiMarker: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.text,
    borderWidth: 2.5,
    borderColor: '#fff',
    top: -3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  bmiLabels: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
  bmiLabel: { fontSize: 10, color: colors.gray600, fontWeight: '500' },
  settingsList: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 15,
    gap: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  settingsIcon: {
    width: 35, height: 35,
    backgroundColor: colors.orangeBg,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.text, textAlign: 'right' },
  settingsArrow: { fontSize: 20, color: colors.gray400 },
});
