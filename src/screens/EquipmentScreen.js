import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, Modal, FlatList,
} from 'react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { equipment, allCats } from '../data';

export default function EquipmentScreen() {
  const { addedEq, toggleEquipment } = useApp();
  const [search, setSearch] = useState('');
  const [currentCat, setCurrentCat] = useState('همه');
  const [selectedEq, setSelectedEq] = useState(null);

  const filtered = equipment.filter(e => {
    const matchCat = currentCat === 'همه' || e.cat === currentCat;
    const matchSearch = !search ||
      e.name.includes(search) ||
      e.group.includes(search) ||
      e.muscles.some(m => m.includes(search));
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>تجهیزات باشگاه</Text>
        <Text style={styles.sub}>{equipment.length} دستگاه موجود · {addedEq.size} انتخاب شده</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Text style={{ fontSize: 18, color: colors.gray400 }}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="جستجو دستگاه یا عضله..."
          placeholderTextColor={colors.gray400}
          textAlign="right"
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catsBar}
      >
        {allCats.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, currentCat === cat && styles.catBtnActive]}
            onPress={() => setCurrentCat(cat)}
          >
            <Text style={[styles.catTxt, currentCat === cat && styles.catTxtActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Count */}
      <Text style={styles.countLabel}>{filtered.length} دستگاه</Text>

      {/* Grid */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: 11, flexDirection: 'row-reverse' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const added = addedEq.has(item.id);
          return (
            <TouchableOpacity
              style={[styles.eqCard, added && styles.eqCardAdded]}
              onPress={() => setSelectedEq(item)}
            >
              {added && (
                <View style={styles.addedBadge}>
                  <Text style={{ color: '#fff', fontSize: 10 }}>✓</Text>
                </View>
              )}
              <Text style={styles.eqIcon}>{item.icon}</Text>
              <Text style={styles.eqName}>{item.name}</Text>
              <Text style={styles.eqGroup}>{item.group}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Detail Modal */}
      <Modal
        visible={!!selectedEq}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedEq(null)}
      >
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setSelectedEq(null)} />
        {selectedEq && (
          <View style={styles.panel}>
            <View style={styles.panelHandle} />
            <Text style={styles.panelIcon}>{selectedEq.icon}</Text>
            <Text style={styles.panelName}>{selectedEq.name}</Text>
            <Text style={styles.panelGroup}>{selectedEq.group}</Text>
            <Text style={styles.panelLabel}>توضیحات</Text>
            <Text style={styles.panelDesc}>{selectedEq.desc}</Text>
            <Text style={styles.panelLabel}>عضلات درگیر</Text>
            <View style={styles.musclesRow}>
              {selectedEq.muscles.map(m => (
                <View key={m} style={styles.muscleTag}>
                  <Text style={styles.muscleTxt}>{m}</Text>
                </View>
              ))}
            </View>
            <View style={styles.panelBtns}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedEq(null)}>
                <Text style={styles.closeBtnTxt}>بستن</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addBtn, addedEq.has(selectedEq.id) && styles.addBtnAdded]}
                onPress={() => { toggleEquipment(selectedEq.id); setSelectedEq(null); }}
              >
                <Text style={styles.addBtnTxt}>
                  {addedEq.has(selectedEq.id) ? '✓ اضافه شده — حذف' : '+ اضافه به برنامه'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.gray100 },
  header: { backgroundColor: colors.orange, padding: 20, paddingBottom: 18 },
  title: { fontSize: 19, fontWeight: '700', color: '#fff', textAlign: 'right' },
  sub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3, textAlign: 'right' },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    margin: 12,
    marginBottom: 4,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    paddingHorizontal: 13,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },
  catsBar: { paddingHorizontal: 20, paddingVertical: 10, gap: 8, flexDirection: 'row-reverse' },
  catBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5, borderColor: colors.gray200, backgroundColor: colors.white },
  catBtnActive: { backgroundColor: colors.orange, borderColor: colors.orange },
  catTxt: { fontSize: 12, fontWeight: '600', color: colors.gray600 },
  catTxtActive: { color: '#fff' },
  countLabel: { fontSize: 12, color: colors.gray600, paddingHorizontal: 20, marginBottom: 4, textAlign: 'right', fontWeight: '600' },
  grid: { padding: 20, paddingTop: 4, gap: 11 },
  eqCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  eqCardAdded: { borderColor: colors.orange, backgroundColor: colors.orangeBg },
  addedBadge: { position: 'absolute', top: 8, left: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  eqIcon: { fontSize: 30, marginBottom: 7 },
  eqName: { fontSize: 12, fontWeight: '700', color: colors.text, textAlign: 'right' },
  eqGroup: { fontSize: 11, color: colors.gray600, marginTop: 3, textAlign: 'right', fontWeight: '500' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  panel: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 20,
  },
  panelHandle: { width: 40, height: 4, backgroundColor: colors.gray200, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  panelIcon: { fontSize: 44, textAlign: 'center', marginBottom: 6 },
  panelName: { fontSize: 18, fontWeight: '700', color: colors.text, textAlign: 'center' },
  panelGroup: { fontSize: 12, color: colors.gray600, textAlign: 'center', marginTop: 2, marginBottom: 12, fontWeight: '600' },
  panelLabel: { fontSize: 11, fontWeight: '700', color: colors.gray800, marginBottom: 6, textAlign: 'right', textTransform: 'uppercase', letterSpacing: 0.4 },
  panelDesc: { fontSize: 13, color: colors.gray800, lineHeight: 22, marginBottom: 12, backgroundColor: colors.gray100, padding: 12, borderRadius: 10, textAlign: 'right' },
  musclesRow: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  muscleTag: { backgroundColor: colors.orangeBg, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  muscleTxt: { color: colors.orangeDark, fontSize: 11, fontWeight: '700' },
  panelBtns: { flexDirection: 'row-reverse', gap: 10 },
  closeBtn: { flex: 1, padding: 13, borderWidth: 1.5, borderColor: colors.gray200, borderRadius: 10, backgroundColor: colors.gray100, alignItems: 'center' },
  closeBtnTxt: { fontSize: 14, fontWeight: '700', color: colors.gray800 },
  addBtn: { flex: 2, padding: 13, backgroundColor: colors.orange, borderRadius: 10, alignItems: 'center' },
  addBtnAdded: { backgroundColor: colors.green },
  addBtnTxt: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
