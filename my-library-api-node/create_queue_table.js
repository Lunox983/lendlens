const pool = require('./db');

async function createQueueTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS equipment_queue (
            id INT AUTO_INCREMENT PRIMARY KEY,
            equipment_id INT NOT NULL,
            student_id VARCHAR(20) NOT NULL,
            position INT NOT NULL,
            status ENUM('waiting', 'called', 'completed', 'cancelled', 'expired') DEFAULT 'waiting',
            queued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            called_at DATETIME NULL,
            expires_at DATETIME NULL
        );
    `;
    try {
        await pool.query(sql);
        console.log("Table 'equipment_queue' created successfully.");
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        process.exit();
    }
}

createQueueTable();
