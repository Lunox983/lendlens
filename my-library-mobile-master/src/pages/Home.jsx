import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Home() {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  // สำหรับ physical device บน LAN: เปลี่ยน IP เป็น IP ของเซิร์ฟเวอร์ API (เช่น 192.168.x.x)
  // สำหรับ Android Emulator: ใช้ 10.0.2.2
  const API_URL = 'http://10.0.2.2/my_library_api/get_equipments.php'; // แก้ไข IP ที่นี่

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setItems(data.slice(0, 3))) // แสดงแค่ 3 ชิ้น
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <ScrollView style={styles.homeScreen}>
      <View style={styles.appHeader}>
        <Text style={styles.headerText}>ข้อมูลนักศึกษา</Text>
      </View>
      
      <View style={styles.content}>
        {/* ส่วนแสดงข้อมูลโปรไฟล์ */}
        <View style={styles.profileHero}>
          <Text style={styles.profileName}>ณัฐวุฒิ ศรีสุข</Text>
          <Text style={styles.profileId}>รหัสนศ. B6501234</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>กำลังยืม</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>คืนแล้ว</Text>
            </View>
          </View>
        </View>
        
        {/* ส่วนหัวข้ออุปกรณ์แนะนำ */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>อุปกรณ์แนะนำสำหรับคุณ</Text>
          {/* เปลี่ยน onClick เป็น onPress และเปลี่ยนวิธี Navigate */}
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.linkText}>ดูทั้งหมด</Text>
          </TouchableOpacity>
        </View>
        
        {/* ส่วน Carousel แสดงรายการอุปกรณ์ (เลื่อนแนวนอนได้) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {items.map(item => (
            <View key={item.id} style={styles.recCard}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemAvailable}>เหลือ {item.available} ชิ้น</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

// ชุดตกแต่ง (Styles)
const styles = StyleSheet.create({
  homeScreen: { 
    flex: 1, 
    backgroundColor: '#F0EFF5' 
  },
  appHeader: { 
    padding: 20, 
    backgroundColor: '#FFF', 
    alignItems: 'center',
    paddingTop: 40 // เผื่อระยะขอบจอด้านบนของมือถือ
  },
  headerText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  content: { 
    padding: 20 
  },
  profileHero: { 
    backgroundColor: '#3D2B56', 
    padding: 25, 
    borderRadius: 20, 
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4
  },
  profileName: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  profileId: { 
    color: '#D1C4E9', 
    fontSize: 14, 
    marginBottom: 20 
  },
  statsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    padding: 15, 
    borderRadius: 15 
  },
  statBox: { 
    alignItems: 'center' 
  },
  statNumber: { 
    color: '#FFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  statLabel: { 
    color: '#D1C4E9', 
    fontSize: 12,
    marginTop: 4
  },
  sectionTitleContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1A1A24' 
  },
  linkText: { 
    color: '#6A5ACD', 
    fontSize: 14,
    fontWeight: 'bold'
  },
  carousel: { 
    flexDirection: 'row',
    paddingBottom: 10
  },
  recCard: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 15, 
    marginRight: 15, 
    width: 160, 
    borderColor: '#EBE9F5',
    borderWidth: 1
  },
  itemName: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 8 
  },
  itemAvailable: { 
    fontSize: 12, 
    color: '#28a745' 
  }
});

export default Home;