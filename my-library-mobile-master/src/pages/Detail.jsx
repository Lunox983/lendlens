import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // รับค่า ID ที่ส่งมาจากหน้า Search
  // (สมมติว่าตอนกดเข้ามาจาก Search ส่งมาชื่อ 'itemId' หรือ 'id')
  const id = route.params?.id || route.params?.itemId; 
  
  const [item, setItem] = useState(null);

  useEffect(() => {
    // เปลี่ยน localhost เป็น 10.0.2.2 สำหรับ Android Emulator
    fetch(`http://10.0.2.2/my_library_api/get_detail.php?id=${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://10.0.2.2/my_library_api/checkout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: 'B6501234', // ในอนาคตควรดึงจาก State/Context ที่เก็บข้อมูลตอน Login
          equipment_id: id
        })
      });
      const result = await response.json();
      
      // ใช้ Alert ของ React Native แทน alert() ของเว็บ
      Alert.alert(
        "แจ้งเตือนการยืม",
        result.message,
        [
          { 
            text: "ตกลง", 
            onPress: () => {
              if (result.message === "ยืมอุปกรณ์สำเร็จ") {
                navigation.navigate('Status'); // เปลี่ยนไปหน้าสถานะถ้ายืมสำเร็จ
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  // แสดงตัวโหลดระหว่างรอข้อมูล API
  if (!item) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3D2B56" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ปุ่มย้อนกลับ */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{'< ย้อนกลับ'}</Text>
      </TouchableOpacity>

      {/* ส่วนหัวแสดงชื่ออุปกรณ์ */}
      <View style={styles.detailHero}>
        <Text style={styles.heroTitle}>{item.name}</Text>
      </View>

      {/* ส่วนรายละเอียด */}
      <View style={styles.detailInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>รหัสครุภัณฑ์:</Text>
          <Text style={styles.infoValue}>{item.code}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ประเภท:</Text>
          <Text style={styles.infoValue}>{item.category}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>คงเหลือ:</Text>
          <Text style={styles.infoValue}>{item.available} / {item.total} ชิ้น</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>รายละเอียด:</Text>
          <Text style={styles.infoValue}>{item.desc}</Text>
        </View>
      </View>

      {/* ปุ่มกดทำรายการ */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>ยืมอุปกรณ์นี้</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0EFF5', 
    padding: 20 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: { 
    marginTop: 10, 
    color: '#666' 
  },
  backButton: { 
    paddingVertical: 10, 
    marginBottom: 10,
    marginTop: 20 // เผื่อขอบหน้าจอมือถือ
  },
  backText: { 
    color: '#6A5ACD', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  detailHero: { 
    backgroundColor: '#3D2B56', 
    padding: 25, 
    borderRadius: 15, 
    marginBottom: 20,
    alignItems: 'center'
  },
  heroTitle: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  detailInfo: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  infoRow: { 
    flexDirection: 'row', 
    marginBottom: 15 
  },
  infoLabel: { 
    flex: 1, 
    fontSize: 15, 
    color: '#666', 
    fontWeight: 'bold' 
  },
  infoValue: { 
    flex: 2, 
    fontSize: 15, 
    color: '#333' 
  },
  checkoutButton: { 
    backgroundColor: '#28a745', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  checkoutButtonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});

export default Detail;