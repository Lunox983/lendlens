import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

function Status() {
  const [activeTab, setActiveTab] = useState('ทั้งหมด');
  const tabs = ['ทั้งหมด', 'กำลังยืม', 'คืนแล้ว'];

  // ข้อมูลจำลองสถานะการยืม
  const [borrowedItems, setBorrowedItems] = useState([
    {
      id: 1,
      name: 'เมาส์ไร้สาย Logitech M350',
      code: 'ACC-1004',
      borrowDate: '13 ก.ค. 69',
      returnDate: '17 ก.ค. 69',
      daysLeft: 'อีก 2 วัน',
      progress: 60, // เปอร์เซ็นต์ของหลอดเวลา (0-100)
      status: 'กำลังยืม'
    },
    // สามารถเพิ่มข้อมูลสถานะ "คืนแล้ว" เพื่อทดสอบ Tab ได้
    // {
    //   id: 2,
    //   name: 'สายชาร์จ iPhone',
    //   code: 'ACC-1005',
    //   borrowDate: '1 ก.ค. 69',
    //   returnDate: '5 ก.ค. 69',
    //   daysLeft: 'คืนแล้ว',
    //   progress: 100,
    //   status: 'คืนแล้ว'
    // }
  ]);

  // กรองข้อมูลตาม Tab ที่เลือก
  const filteredItems = borrowedItems.filter(item => {
    if (activeTab === 'ทั้งหมด') return true;
    return item.status === activeTab;
  });

  return (
    <View style={styles.container}>
      {/* ส่วนหัว */}
      <View style={styles.headerContainer}>
        <Text style={styles.subHeader}>ติดตามสถานะ</Text>
        <Text style={styles.headerTitle}>รายการยืมของฉัน</Text>
      </View>
      
      <View style={styles.divider} />

      {/* เมนูตัวกรอง (Tabs) */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* รายการอุปกรณ์ */}
      <ScrollView style={styles.listContainer}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                {/* ป้ายเตือนจำนวนวัน (เปลี่ยนสีตามสถานะได้) */}
                <View style={[styles.badge, item.status === 'คืนแล้ว' && styles.badgeReturned]}>
                  <Text style={[styles.badgeText, item.status === 'คืนแล้ว' && styles.badgeTextReturned]}>
                    {item.daysLeft}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.cardCode}>รหัส {item.code}</Text>
              
              {/* หลอด Progress Bar */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${item.progress}%` }]} />
              </View>
              
              <View style={styles.cardFooterRow}>
                <Text style={styles.dateText}>ยืมเมื่อ <Text style={styles.dateTextBold}>{item.borrowDate}</Text></Text>
                <Text style={styles.dateText}>กำหนดคืน <Text style={styles.dateTextBold}>{item.returnDate}</Text></Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>ไม่มีรายการ{activeTab !== 'ทั้งหมด' ? activeTab : ''}</Text>
          </View>
        )}
      </ScrollView>
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
    color: '#6A5ACD',
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
    marginBottom: 15,
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F9F8FD',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#5E4B8B', // สีม่วงเข้มตามดีไซน์
  },
  tabText: {
    color: '#5E4B8B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeTabText: {
    color: '#FFF',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0EFF5',
    // เพิ่มเงาเบาๆ ให้ดูมีมิติเหมือนในรูป
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, 
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#FEF3C7', // สีพื้นหลังเหลืองอ่อน
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeReturned: {
    backgroundColor: '#E1F5FE', // เปลี่ยนเป็นสีฟ้าถ้ายกเลิก/คืนแล้ว (ปรับได้ตามต้องการ)
  },
  badgeText: {
    color: '#D97706', // สีส้มเข้ม
    fontWeight: 'bold',
    fontSize: 12,
  },
  badgeTextReturned: {
    color: '#0288D1',
  },
  cardCode: {
    fontSize: 14,
    color: '#9E9E9E', // สีเทา
    marginBottom: 15,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F0EFF5',
    borderRadius: 3,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#D97706', // สีส้มอมน้ำตาล
    borderRadius: 3,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  dateTextBold: {
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  }
});

export default Status;