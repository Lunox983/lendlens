import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Settings() {
  const navigation = useNavigation();

  // State สำหรับควบคุมการเปิด-ปิด Popup (Modals)
  const [modalVisible, setModalVisible] = useState(''); // 'personal', 'history', 'receipt', 'calendar', or ''
  
  // State สำหรับ Switches การแจ้งเตือน
  const [notifyDue, setNotifyDue] = useState(true);
  const [notifyNew, setNotifyNew] = useState(false);

  // State สำหรับปฏิทิน
  const [selectedDate, setSelectedDate] = useState('16'); // ค่าเริ่มต้นคือวันที่ 16 ตามเวลาปัจจุบัน

  // โครงสร้างปฏิทิน กรกฎาคม 2569
  const calendarWeeks = [
    ['28', '29', '30', '1', '2', '3', '4'],
    ['5', '6', '7', '8', '9', '10', '11'],
    ['12', '13', '14', '15', '16', '17', '18'],
    ['19', '20', '21', '22', '23', '24', '25'],
    ['26', '27', '28', '29', '30', '31', '1'],
  ];

  // ฟังก์ชันเช็คสีของวันในปฏิทิน (ช่วงสอบ / วันหยุด)
  const getDateStyle = (day, rowIndex) => {
    // ซ่อนวันของเดือนอื่นให้เป็นสีเทาอ่อน
    if ((rowIndex === 0 && parseInt(day) > 20) || (rowIndex === 4 && parseInt(day) < 10)) {
      return { color: '#CCC' };
    }
    return { color: '#333' };
  };

  const getDayBackground = (day, rowIndex) => {
    if ((rowIndex === 0 && parseInt(day) > 20) || (rowIndex === 4 && parseInt(day) < 10)) return 'transparent';
    // ช่วงสอบ 27-31
    if (rowIndex === 4 && parseInt(day) >= 27 && parseInt(day) <= 31) return '#FEF3C7'; // สีเหลืองอ่อน
    return 'transparent';
  };

  const closeModal = () => setModalVisible('');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subHeader}>ตั้งค่า</Text>
        <Text style={styles.headerTitle}>บัญชีของฉัน</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Saksit</Text>
          <Text style={styles.profileId}>รหัสนักศึกษา B6501234</Text>
        </View>
      </View>

      {/* Section 1: บัญชีผู้ใช้ */}
      <Text style={styles.sectionTitle}>บัญชีผู้ใช้</Text>
      <View style={styles.menuGroup}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible('personal')}>
          <Text style={styles.menuIcon}>👤</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>ข้อมูลส่วนตัว</Text>
            <Text style={styles.menuDesc}>ดูอีเมลและเบอร์โทรศัพท์</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible('history')}>
          <Text style={styles.menuIcon}>💼</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>ประวัติการยืม-คืน</Text>
            <Text style={styles.menuDesc}>ดูรายการทั้งหมดย้อนหลัง</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.menuDivider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible('receipt')}>
          <Text style={styles.menuIcon}>📄</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>ใบเสร็จการยืม</Text>
            <Text style={styles.menuDesc}>ดูสลิปรายละเอียดการทำรายการยืม</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.menuDivider} />

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🔒</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>ความปลอดภัย</Text>
            <Text style={styles.menuDesc}>จัดการรหัสยืนยันตัวตน</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Section 2: ข้อมูลห้องสมุด */}
      <Text style={styles.sectionTitle}>ข้อมูลห้องสมุด</Text>
      <View style={styles.menuGroup}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible('calendar')}>
          <Text style={styles.menuIcon}>📅</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>ปฏิทินและเวลาทำการ</Text>
            <Text style={styles.menuDesc}>ดูวันเปิด-ปิดของห้องสมุด</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Section 3: การแจ้งเตือน */}
      <Text style={styles.sectionTitle}>การแจ้งเตือน</Text>
      <View style={styles.menuGroup}>
        <View style={styles.menuItem}>
          <Text style={styles.menuIcon}>🔔</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>แจ้งเตือนก่อนครบกำหนดคืน</Text>
            <Text style={styles.menuDesc}>แจ้งล่วงหน้า 1 วัน</Text>
          </View>
          <Switch value={notifyDue} onValueChange={setNotifyDue} trackColor={{ true: '#5E4B8B', false: '#CCC' }} />
        </View>
        <View style={styles.menuDivider} />
        
        <View style={styles.menuItem}>
          <Text style={styles.menuIcon}>📦</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>แจ้งเตือนอุปกรณ์ใหม่</Text>
            <Text style={styles.menuDesc}>อัปเดตของเข้าใหม่ในระบบ</Text>
          </View>
          <Switch value={notifyNew} onValueChange={setNotifyNew} trackColor={{ true: '#5E4B8B', false: '#CCC' }} />
        </View>
      </View>

      {/* Section 4: ทั่วไป */}
      <Text style={styles.sectionTitle}>ทั่วไป</Text>
      <View style={styles.menuGroup}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.logoutText}>ออกจากระบบ</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={{height: 40}} /> {/* Spacer */}

      {/* ================= MODALS (Popups) ================= */}
      
      {/* 1. Modal: ข้อมูลส่วนตัว */}
      <Modal visible={modalVisible === 'personal'} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>ข้อมูลส่วนตัว</Text>
              <TouchableOpacity onPress={closeModal}><Text style={styles.closeBtn}>✕</Text></TouchableOpacity>
            </View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>ชื่อ</Text><Text style={styles.infoValue}>Saksit</Text></View>
            <View style={styles.menuDivider} />
            <View style={styles.infoRow}><Text style={styles.infoLabel}>รหัสนักศึกษา</Text><Text style={styles.infoValue}>B6501234</Text></View>
            <View style={styles.menuDivider} />
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Email</Text><Text style={styles.infoValue}>student@library.ac.th</Text></View>
            <View style={styles.menuDivider} />
            <View style={styles.infoRow}><Text style={styles.infoLabel}>เบอร์โทร</Text><Text style={styles.infoValue}>081-234-5678</Text></View>
          </View>
        </View>
      </Modal>

      {/* 2. Modal: ประวัติการยืม-คืน */}
      <Modal visible={modalVisible === 'history'} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>ประวัติการยืม-คืน</Text>
              <TouchableOpacity onPress={closeModal}><Text style={styles.closeBtn}>✕</Text></TouchableOpacity>
            </View>
            <View style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyName}>เมาส์ไร้สาย Logitech M350</Text>
                <View style={styles.badgeActive}><Text style={styles.badgeTextActive}>กำลังยืม</Text></View>
              </View>
              <Text style={styles.historyDate}>ยืมเมื่อ 13 ก.ค. 69 • กำหนดคืน 17 ก.ค. 69</Text>
            </View>
            <View style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyName}>พาวเวอร์แบงค์ 10000mAh</Text>
                <View style={styles.badgeDone}><Text style={styles.badgeTextDone}>คืนแล้ว</Text></View>
              </View>
              <Text style={styles.historyDate}>ยืมเมื่อ 3 ก.ค. 69 • กำหนดคืน 6 ก.ค. 69</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* 3. Modal: ใบเสร็จ */}
      <Modal visible={modalVisible === 'receipt'} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>ประวัติใบเสร็จ</Text>
              <TouchableOpacity onPress={closeModal}><Text style={styles.closeBtn}>✕</Text></TouchableOpacity>
            </View>
            <View style={styles.emptyReceipt}>
              <Text style={styles.emptyReceiptTitle}>ยังไม่มีใบเสร็จ</Text>
              <Text style={styles.emptyReceiptDesc}>คุณยังไม่ได้ทำรายการยืมอุปกรณ์</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* 4. Modal: ปฏิทินและเวลาทำการ (Full Screen Modal) */}
      <Modal visible={modalVisible === 'calendar'} animationType="slide">
        <View style={styles.calendarScreen}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.backBtn}>
              <Text style={styles.backBtnText}>{'<'}</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.calSubHeader}>เวลาทำการห้องสมุด</Text>
              <Text style={styles.calHeaderTitle}>ปฏิทินและเวลาเปิด-ปิด</Text>
            </View>
          </View>
          
          <View style={styles.monthSelector}>
            <Text style={styles.monthNav}>{'<'}</Text>
            <Text style={styles.monthTitle}>กรกฎาคม 2569</Text>
            <Text style={styles.monthNav}>{'>'}</Text>
          </View>

          {/* ตารางปฏิทิน */}
          <View style={styles.calendarGrid}>
            <View style={styles.calRow}>
              {['อา','จ','อ','พ','พฤ','ศ','ส'].map((d, i) => <Text key={i} style={styles.calDayName}>{d}</Text>)}
            </View>
            {calendarWeeks.map((week, rowIndex) => (
              <View key={rowIndex} style={styles.calRow}>
                {week.map((day, colIndex) => {
                  const isSelected = selectedDate === day && rowIndex > 1 && rowIndex < 4;
                  const hasDot = day === '28' && rowIndex === 4; // วันหยุด (จุดแดง)
                  return (
                    <TouchableOpacity 
                      key={colIndex} 
                      onPress={() => setSelectedDate(day)}
                      style={[
                        styles.calDayBox, 
                        { backgroundColor: getDayBackground(day, rowIndex) },
                        isSelected && styles.calDaySelected
                      ]}
                    >
                      <Text style={[styles.calDayText, getDateStyle(day, rowIndex)]}>{day}</Text>
                      <View style={[styles.dot, hasDot ? {backgroundColor: '#FF3B30'} : {backgroundColor: 'transparent'}]} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* รายละเอียดเวลาทำการของวันที่เลือก */}
          <View style={styles.timeDetailCard}>
            <Text style={styles.timeDetailDate}>วันพฤหัสบดีที่ {selectedDate} กรกฎาคม 2569</Text>
            <Text style={styles.timeDetailHours}>08:30 - 20:00 น.</Text>
            <Text style={styles.timeDetailDesc}>เวลาทำการวันจันทร์-ศุกร์ปกติ</Text>
          </View>

          {/* คำอธิบายสี */}
          <View style={styles.legendContainer}>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, {backgroundColor: '#F0EFF5'}]} /><Text style={styles.legendText}>วันทำการปกติ</Text>
              <View style={[styles.legendColor, {backgroundColor: '#EBE9F5'}]} /><Text style={styles.legendText}>เสาร์-อาทิตย์</Text>
              <View style={[styles.legendColor, {backgroundColor: '#FFEBEE'}]} /><Text style={styles.legendText}>วันหยุดนักขัตฤกษ์</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendColor, {backgroundColor: '#FEF3C7'}]} /><Text style={styles.legendText}>ช่วงสอบ (2 สัปดาห์ก่อนสอบ)</Text>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8FD' },
  header: { padding: 25, paddingTop: 50 },
  subHeader: { color: '#6A5ACD', fontSize: 14, fontWeight: 'bold' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1A1A24', marginTop: 5 },
  
  profileCard: { backgroundColor: '#3D2B56', marginHorizontal: 20, borderRadius: 20, padding: 25, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  profileAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#6A5ACD', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  profileName: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  profileId: { color: '#D1C4E9', fontSize: 14, marginTop: 4 },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#666', marginTop: 25, marginBottom: 10, paddingHorizontal: 25 },
  
  menuGroup: { backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 15, paddingVertical: 5 },
  menuItem: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  menuIcon: { fontSize: 24, width: 40, textAlign: 'center', color: '#6A5ACD' },
  logoutIcon: { fontSize: 24, width: 40, textAlign: 'center', color: '#FF3B30' },
  menuTextContainer: { flex: 1, marginLeft: 10 },
  menuTitle: { fontSize: 16, color: '#333', fontWeight: '500' },
  menuDesc: { fontSize: 12, color: '#888', marginTop: 2 },
  logoutText: { fontSize: 16, color: '#FF3B30', fontWeight: 'bold' },
  menuDivider: { height: 1, backgroundColor: '#F0EFF5', marginHorizontal: 15 },

  // Styles สำหรับ Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FFF', width: '85%', borderRadius: 20, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  closeBtn: { fontSize: 20, color: '#888', fontWeight: 'bold', padding: 5 },
  
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 },
  infoLabel: { color: '#888', fontSize: 15 },
  infoValue: { color: '#333', fontSize: 15, fontWeight: '500' },

  historyCard: { borderWidth: 1, borderColor: '#F0EFF5', borderRadius: 12, padding: 15, marginBottom: 15 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  historyName: { fontSize: 15, fontWeight: 'bold', color: '#333', flex: 1 },
  historyDate: { fontSize: 12, color: '#888' },
  badgeActive: { backgroundColor: '#F3E8FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeTextActive: { color: '#6A5ACD', fontSize: 12, fontWeight: 'bold' },
  badgeDone: { backgroundColor: '#E6F4EA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeTextDone: { color: '#28A745', fontSize: 12, fontWeight: 'bold' },

  emptyReceipt: { alignItems: 'center', paddingVertical: 40 },
  emptyReceiptTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  emptyReceiptDesc: { fontSize: 14, color: '#888' },

  // Styles สำหรับหน้าปฏิทิน
  calendarScreen: { flex: 1, backgroundColor: '#FFF', paddingTop: 50 },
  calendarHeader: { flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', marginBottom: 20 },
  backBtn: { backgroundColor: '#F9F8FD', width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  backBtnText: { fontSize: 18, color: '#3D2B56', fontWeight: 'bold' },
  calSubHeader: { color: '#6A5ACD', fontSize: 12, fontWeight: 'bold' },
  calHeaderTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A24' },
  
  monthSelector: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, alignItems: 'center', marginBottom: 20 },
  monthTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  monthNav: { fontSize: 18, color: '#6A5ACD', fontWeight: 'bold', padding: 10 },
  
  calendarGrid: { paddingHorizontal: 15, marginBottom: 20 },
  calRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  calDayName: { width: 40, textAlign: 'center', color: '#888', fontWeight: 'bold' },
  calDayBox: { width: 42, height: 42, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  calDaySelected: { borderWidth: 2, borderColor: '#3D2B56' },
  calDayText: { fontSize: 16, fontWeight: '500' },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },
  
  timeDetailCard: { backgroundColor: '#F9F8FD', marginHorizontal: 20, padding: 20, borderRadius: 15, marginBottom: 20 },
  timeDetailDate: { color: '#888', fontSize: 14, marginBottom: 5 },
  timeDetailHours: { color: '#3D2B56', fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  timeDetailDesc: { color: '#666', fontSize: 14 },
  
  legendContainer: { paddingHorizontal: 20 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  legendColor: { width: 14, height: 14, borderRadius: 7, marginRight: 8, marginLeft: 10 },
  legendText: { fontSize: 12, color: '#888' },
});

export default Settings;