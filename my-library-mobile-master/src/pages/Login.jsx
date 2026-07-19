import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [studentId, setStudentId] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      // ใช้ 10.0.2.2 สำหรับ Android Emulator แทน localhost
      const response = await fetch('http://10.0.2.2/my_library_api/login.php', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, citizenId })
      });
      const data = await response.json();
      
      if(data.success) {
        navigation.replace('Home'); // เข้าสู่ระบบแล้วไปหน้า Home
      } else {
        Alert.alert("แจ้งเตือน", "รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Libraries</Text>
      <Text style={styles.subTitle}>ระบบยืม–คืนอุปกรณ์บรรณสาร สำหรับนักศึกษา</Text>
      
      <Text style={styles.label}>รหัสนักศึกษา</Text>
      <TextInput 
        style={styles.input}
        placeholder="เช่น B1234567" 
        value={studentId} 
        onChangeText={setStudentId}
      />

      <Text style={styles.label}>เลขบัตรประชาชน</Text>
      <TextInput 
        style={styles.input}
        placeholder="เลข 13 หลัก" 
        secureTextEntry={true} 
        value={citizenId} 
        onChangeText={setCitizenId} 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ยืนยันตัวตน</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F8F9FA' },
  headerTitle: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' },
  subTitle: { fontSize: 14, textAlign: 'center', marginBottom: 30, color: '#666' },
  label: { fontSize: 14, marginBottom: 8, color: '#333', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 20, backgroundColor: '#FFF' },
  button: { backgroundColor: '#3D2B56', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default Login;