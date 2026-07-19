import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Search() {
  const navigation = useNavigation();
  
  // State สำหรับจัดการข้อมูล
  const [items, setItems] = useState([]); // เก็บข้อมูลทั้งหมดจาก API
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  
  // State สำหรับค้นหาและหมวดหมู่
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('ทั้งหมด');
  
  // หมวดหมู่ตามดีไซน์
  const categories = ["ทั้งหมด", "iPad", "หูฟัง", "ปลั๊กไฟ", "สายเชื่อมต่อ"];

  // ดึงข้อมูลเมื่อเปิดหน้านี้ขึ้นมา
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      // ใช้ 10.0.2.2 สำหรับ Android Emulator
      const response = await fetch('http://10.0.2.2/my_library_api/get_equipments.php');
      const data = await response.json();
      setItems(data); // นำข้อมูลไปเก็บใน State
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถดึงข้อมูลอุปกรณ์จากเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false); // ปิดสถานะกำลังโหลด
    }
  };

  // ฟังก์ชันสำหรับกรองข้อมูล (แสดงเฉพาะตัวที่ค้นหา หรือ หมวดหมู่ที่เลือก)
  const filteredItems = items.filter(item => {
    // 1. เช็คหมวดหมู่ (สมมติว่า API ส่งค่า category มาด้วย)
    const matchCategory = activeTab === 'ทั้งหมด' || item.category === activeTab;
    
    // 2. เช็คคำค้นหา (ค้นจากชื่อ หรือ รหัส)
    const matchSearch = item.name?.toLowerCase().includes(searchText.toLowerCase()) || 
                        item.code?.toLowerCase().includes(searchText.toLowerCase());
                        
    return matchCategory && matchSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>ค้นหาและแสดงรายการ</Text>
      <Text style={styles.header}>อุปกรณ์อิเล็กทรอนิกส์</Text>

      {/* ช่องค้นหา */}
      <TextInput 
        style={styles.searchInput} 
        placeholder="🔍 ค้นหาชื่ออุปกรณ์ เช่น iPad, กล้อง..." 
        value={searchText}
        onChangeText={setSearchText} // อัปเดตค่าเมื่อพิมพ์
      />

      {/* แถบเมนูหมวดหมู่ */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.tab, activeTab === cat && styles.activeTab]}
              onPress={() => setActiveTab(cat)} // เปลี่ยนหมวดหมู่เมื่อกด
            >
              <Text style={[styles.tabText, activeTab === cat && styles.activeTabText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* แสดงรายการอุปกรณ์ */}
      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#483D8B" />
          <Text style={{ marginTop: 10, color: '#666' }}>กำลังโหลดข้อมูล...</Text>
        </View>
      ) : (
        <ScrollView style={styles.listContainer}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.card}
                // ส่ง id ไปหน้า Detail
                onPress={() => navigation.navigate('Detail', { id: item.id })}
              >
                <View style={styles.cardIcon}>
                  <Text style={{textAlign: 'center', lineHeight: 40}}>📱</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {/* ปรับแก้ Key (เช่น item.code, item.available) ให้ตรงกับฐานข้อมูลของคุณ */}
                  <Text style={styles.cardDesc}>
                    {item.category || 'ทั่วไป'} · รหัส {item.code || '-'} · คงเหลือ {item.available || 0}/{item.total || 0} ชิ้น
                  </Text>
                  <Text style={styles.cardLimit}>ยืมได้ 1 สิทธิ์ต่อ 1 ชิ้น</Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.centerContent}>
              <Text style={{ color: '#888' }}>ไม่พบอุปกรณ์ที่ค้นหา</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

// สไตล์ CSS แบบ React Native
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 40 },
  subHeader: { color: '#6A5ACD', fontSize: 14, fontWeight: 'bold' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1A1A24', marginBottom: 20 },
  searchInput: { backgroundColor: '#F0EFF5', padding: 12, borderRadius: 10, fontSize: 16, marginBottom: 20 },
  tabContainer: { marginBottom: 20 },
  tab: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#F0EFF5', marginRight: 10 },
  activeTab: { backgroundColor: '#483D8B' },
  tabText: { color: '#666', fontWeight: 'bold' },
  activeTabText: { color: '#FFF' },
  listContainer: { flex: 1 },
  card: { flexDirection: 'row', backgroundColor: '#F9F8FD', padding: 15, borderRadius: 15, marginBottom: 15, alignItems: 'center', borderColor: '#EBE9F5', borderWidth: 1 },
  cardIcon: { width: 40, height: 40, backgroundColor: '#E3E0F3', borderRadius: 8, marginRight: 15, borderColor: '#483D8B', borderWidth: 1 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardDesc: { fontSize: 12, color: '#888', marginTop: 2 },
  cardLimit: { fontSize: 12, color: '#6A5ACD', marginTop: 2, fontWeight: 'bold' },
  arrow: { fontSize: 20, color: '#888' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }
});

export default Search;