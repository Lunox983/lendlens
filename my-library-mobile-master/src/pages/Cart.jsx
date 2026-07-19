import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Cart() {
  const navigation = useNavigation();
  
  // จำลองข้อมูลในตะกร้า
  // ลองเอาคอมเมนต์ (//) หน้าปีกกาออก เพื่อดูหน้าตาตอนที่ "มีอุปกรณ์ในตะกร้า" ครับ
  const [cartItems, setCartItems] = useState([
    // { id: 1, name: 'ปลั๊กไฟ USB-C 20W', code: 'ACC-1001' },
    // { id: 2, name: 'ไอแพดปากกา Apple Pencil', code: 'ACC-1002' }
  ]);

  return (
    <View style={styles.container}>
      {/* ส่วนหัวของหน้าจอ */}
      <View style={styles.headerContainer}>
        <Text style={styles.subHeader}>ตะกร้า</Text>
        <Text style={styles.headerTitle}>รายการที่เลือกจะยืม</Text>
      </View>
      
      {/* เส้นแบ่ง */}
      <View style={styles.divider} />

      {cartItems.length === 0 ? (
        /* =========================================
           สถานะที่ 1: ตะกร้าว่างเปล่า (เหมือนในรูปภาพ)
           ========================================= */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            {/* คุณสามารถเปลี่ยนเป็นรูปภาพ (Image) หรือ Vector Icon ได้ในภายหลัง */}
            <Text style={styles.emptyIconText}>💼</Text> 
          </View>
          <Text style={styles.emptyTitle}>ตะกร้าว่างเปล่า</Text>
          <Text style={styles.emptySubtitle}>
            ไปที่เมนู “ค้นหา” เพื่อเลือกอุปกรณ์ที่ต้องการยืมใส่ตะกร้า
          </Text>
        </View>
      ) : (
        /* =========================================
           สถานะที่ 2: มีรายการอุปกรณ์ที่เลือกมาแล้ว
           ========================================= */
        <View style={styles.fullContainer}>
          <ScrollView style={styles.itemList}>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.cartCard}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDesc}>รหัส {item.code}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteText}>ลบ</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>ยืนยันการยืมอุปกรณ์</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 40,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  subHeader: {
    color: '#6A5ACD', // สีม่วงอ่อน
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A24',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EFF5',
    marginBottom: 20,
  },
  
  // สไตล์สำหรับตะกร้าว่างเปล่า (ตามรูป)
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#C9B6E4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },

  // สไตล์สำหรับตอนที่มีรายการในตะกร้า
  fullContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemList: {
    flex: 1,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F8FD',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#EBE9F5',
    borderWidth: 1,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#3D2B56',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Cart;