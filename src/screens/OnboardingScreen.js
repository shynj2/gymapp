import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const GOALS = [
  { key: 'کاهش وزن', icon: '🔥' },
  { key: 'عضله‌سازی', icon: '💪' },
  { key: 'افزایش استقامت', icon: '🏃' },
  { key: 'سلامت عمومی', icon: '❤️' },
];

export default function OnboardingScreen({ onDone }) {
  const { userData, setUserData } = useApp();
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(String(userData.age));
  const [weight, setWeight] = useState(String(userData.weight));
  const [height, setHeight] = useState(String(userData.height));
  const [gender, setGender] = useState(userData.gender);
  const [goal, setGoal] = useState(userData.goal);

  const handleStart = () => {
    setUserData({
      name: name || 'کاربر',
      age: parseInt(age) || 25,
      weight: parseFloat(weight) || 75,
      height: parseFloat(height) || 178,
      gender,
      goal,
    });
    onDone();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>🏋️</Text>
          </View>
          <Text style={styles.appName}>shynj2</Text>
          <Text style={styles.appSub}>باشگاه هوشمند شما</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>پروفایل خود را بسازید</Text>
          <Text style={styles.formSub}>اطلاعات برای تنظیم برنامه و رژیم استفاده می‌شه</Text>

          {/* Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>نام</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="نام شما"
              placeholderTextColor={colors.gray400}
              textAlign="right"
            />
          </View>

          {/* Age + Gender */}
          <View style={styles.fieldGroup}>
            <View style={styles.row}>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.label}>سن</Text>
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  placeholder="۲۵"
                  placeholderTextColor={colors.gray400}
                  textAlign="right"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>جنسیت</Text>
                <View style={styles.segRow}>
                  {['مرد', 'زن'].map(g => (
                    <TouchableOpacity
                      key={g}
                      style={[styles.segBtn, gender === g && styles.segBtnActive]}
                      onPress={() => setGender(g)}
                    >
                      <Text style={[styles.segTxt, gender === g && styles.segTxtActive]}>{g}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Weight + Height */}
          <View style={styles.fieldGroup}>
            <View style={styles.row}>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.label}>وزن (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="۷۵"
                  placeholderTextColor={colors.gray400}
                  textAlign="right"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>قد (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  placeholder="۱۷۸"
                  placeholderTextColor={colors.gray400}
                  textAlign="right"
                />
              </View>
            </View>
          </View>

          {/* Goal */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>هدف شما</Text>
            <View style={styles.goalGrid}>
              {GOALS.map(g => (
                <TouchableOpacity
                  key={g.key}
                  style={[styles.goalBtn, goal === g.key && styles.goalBtnActive]}
                  onPress={() => setGoal(g.key)}
                >
                  <Text style={styles.goalIcon}>{g.icon}</Text>
                  <Text style={[styles.goalTxt, goal === g.key && styles.goalTxtActive]}>{g.key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleStart}>
            <Text style={styles.primaryBtnTxt}>شروع کن ←</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  hero: {
    backgroundColor: colors.orange,
    paddingTop: 40,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 4,
  },
  logoBox: {
    width: 72,
    height: 72,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoIcon: { fontSize: 36 },
  appName: { fontSize: 26, fontWeight: '700', color: '#fff' },
  appSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  form: { padding: 20 },
  formTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 3, textAlign: 'right' },
  formSub: { fontSize: 13, color: colors.gray600, marginBottom: 18, textAlign: 'right' },
  fieldGroup: { marginBottom: 14 },
  label: { fontSize: 11, fontWeight: '700', color: colors.gray800, marginBottom: 5, textAlign: 'right', textTransform: 'uppercase', letterSpacing: 0.4 },
  input: {
    backgroundColor: colors.gray100,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 13,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'System',
  },
  row: { flexDirection: 'row-reverse' },
  segRow: { flexDirection: 'row-reverse', gap: 6 },
  segBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 10,
    backgroundColor: colors.gray100,
    alignItems: 'center',
  },
  segBtnActive: { backgroundColor: colors.orangeBg, borderColor: colors.orange },
  segTxt: { fontSize: 13, fontWeight: '600', color: colors.gray600 },
  segTxtActive: { color: colors.orangeDark },
  goalGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 },
  goalBtn: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    borderRadius: 10,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    gap: 5,
  },
  goalBtnActive: { backgroundColor: colors.orangeBg, borderColor: colors.orange },
  goalIcon: { fontSize: 20 },
  goalTxt: { fontSize: 12, fontWeight: '600', color: colors.gray800 },
  goalTxtActive: { color: colors.orangeDark },
  primaryBtn: {
    backgroundColor: colors.orange,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
