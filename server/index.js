require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('LendLens API is running');
});

const db = require('./db');

// GET รายการอุปกรณ์ทั้งหมด
app.get('/api/equipments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM equipments');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลอุปกรณ์ได้' });
  }
});

// GET รายการคำขอยืม-คืนทั้งหมด (พร้อมชื่อนักศึกษาและชื่ออุปกรณ์)
app.get('/api/borrow-requests', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT br.*, sp.name_th AS student_name, e.name AS equipment_name
      FROM borrow_requests br
      JOIN student_profiles sp ON br.student_id = sp.student_id
      JOIN equipment_items ei ON br.item_id = ei.item_id
      JOIN equipments e ON ei.equipment_id = e.equipment_id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลคำขอยืม-คืนได้' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});