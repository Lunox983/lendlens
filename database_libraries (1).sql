-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 16, 2026 at 06:41 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_libraries`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrow_requests`
--

CREATE TABLE `borrow_requests` (
  `request_id` int NOT NULL,
  `student_id` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_id` int NOT NULL,
  `request_date` datetime NOT NULL,
  `due_date` date NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `status` enum('pending','approved','rejected','borrowed','returned','overdue') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `condition_on_return` enum('normal','damaged','lost') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fine_amount` decimal(10,2) DEFAULT '0.00',
  `approved_by` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `borrow_requests`
--

INSERT INTO `borrow_requests` (`request_id`, `student_id`, `item_id`, `request_date`, `due_date`, `return_date`, `status`, `condition_on_return`, `fine_amount`, `approved_by`, `note`) VALUES
(1, 'B6900001', 1, '2026-07-14 09:00:00', '2026-07-21', NULL, 'borrowed', NULL, 0.00, '100001', NULL),
(2, 'B6900002', 11, '2026-07-15 10:30:00', '2026-07-22', NULL, 'pending', NULL, 0.00, NULL, NULL),
(3, 'B6800001', 60, '2026-07-08 13:00:00', '2026-07-15', NULL, 'overdue', NULL, 0.00, '100002', NULL),
(4, 'B6700001', 100, '2026-07-05 11:00:00', '2026-07-12', '2026-07-11 16:20:00', 'returned', 'damaged', 350.00, '100001', 'หูฟังชำรุด มีรอยแตก'),
(5, 'B6600001', 192, '2026-07-16 08:45:00', '2026-07-23', NULL, 'pending', NULL, 0.00, NULL, NULL),
(6, 'B6900001', 4, '2026-07-01 09:00:00', '2026-07-08', '2026-07-07 10:00:00', 'returned', 'normal', 0.00, '100003', NULL),
(7, 'B6800002', 6, '2026-07-16 09:15:00', '2026-07-23', NULL, 'approved', NULL, 0.00, '100002', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `emp_id` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'รหัสพนักงาน 6 หลัก',
  `citizen_id` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'เลขบัตรประชาชน',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'รหัสผ่าน (เริ่มต้นคือเลขบัตรประชาชน ควรเข้ารหัสก่อนบันทึก)',
  `name_th` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ชื่อ-นามสกุล (ภาษาไทย)',
  `name_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ชื่อ-นามสกุล (ภาษาอังกฤษ)',
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'อีเมล (@sut.ac.th)',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'เบอร์โทรศัพท์',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่สร้างข้อมูล',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่แก้ไขข้อมูลล่าสุด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`emp_id`, `citizen_id`, `password`, `name_th`, `name_en`, `email`, `phone`, `created_at`, `updated_at`) VALUES
('100001', '1309900000001', '1309900000001', 'สมชาย ใจดี', 'Somchai Jaidee', 'somchai.j@sut.ac.th', '081-111-1111', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100002', '1309900000002', '1309900000002', 'สมหญิง รักเรียน', 'Somying Rakrian', 'somying.r@sut.ac.th', '081-222-2222', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100003', '1309900000003', '1309900000003', 'มานะ อดทน', 'Mana Odton', 'mana.o@sut.ac.th', '081-333-3333', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100004', '1309900000004', '1309900000004', 'ปิติ ยินดี', 'Piti Yindee', 'piti.y@sut.ac.th', '081-444-4444', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100005', '1309900000005', '1309900000005', 'ชูใจ มั่นคง', 'Chujai Mankong', 'chujai.m@sut.ac.th', '081-555-5555', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100006', '1309900000006', '1309900000006', 'วีระ เก่งกล้า', 'Weera Kengkla', 'weera.k@sut.ac.th', '081-666-6666', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100007', '1309900000007', '1309900000007', 'นารี สวยสม', 'Naree Suaysom', 'naree.s@sut.ac.th', '081-777-7777', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100008', '1309900000008', '1309900000008', 'ธนา เงินทอง', 'Thana Ngenthong', 'thana.n@sut.ac.th', '081-888-8888', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100009', '1309900000009', '1309900000009', 'อรุณ สว่าง', 'Arun Sawang', 'arun.s@sut.ac.th', '081-999-9999', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100010', '1309900000010', '1309900000010', 'รัตนา งามตา', 'Rattana Ngamta', 'rattana.n@sut.ac.th', '082-111-2222', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100011', '1309900000011', '1309900000011', 'กิตติ ประเสริฐ', 'Kitti Prasert', 'kitti.p@sut.ac.th', '082-333-4444', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100012', '1309900000012', '1309900000012', 'สุดา พรหมจรรย์', 'Suda Promjan', 'suda.p@sut.ac.th', '082-555-6666', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100013', '1309900000013', '1309900000013', 'สุรพล พลเยี่ยม', 'Surapon Polyeam', 'surapon.p@sut.ac.th', '082-777-8888', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100014', '1309900000014', '1309900000014', 'วิภาวี ดีเลิศ', 'Wipawee Deelert', 'wipawee.d@sut.ac.th', '082-999-0000', '2026-07-15 14:24:05', '2026-07-15 14:24:05'),
('100015', '1309900000015', '1309900000015', 'ชาญชัย ใจสู้', 'Chanchai Jaisoo', 'chanchai.j@sut.ac.th', '083-123-4567', '2026-07-15 14:24:05', '2026-07-15 14:24:05');

-- --------------------------------------------------------

--
-- Table structure for table `equipments`
--

CREATE TABLE `equipments` (
  `equipment_id` int NOT NULL,
  `kit_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `equipment_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_quantity` int NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `usage_type` enum('internal','external') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'internal',
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipments`
--

INSERT INTO `equipments` (`equipment_id`, `kit_code`, `name`, `category`, `equipment_img`, `total_quantity`, `description`, `usage_type`, `price`) VALUES
(1, 'Kit 01', 'iPad [kit] : 5th generation รุ่น Wi-Fi 32 GB', NULL, 'uploads/equipments/kit01.webp', 10, 'California, C.A. : Apple, c2018. จัดซื้อในปีงบประมาณ พ.ศ. 2561', 'external', 12900.00),
(2, 'Kit 02', 'Quicktionary II professional [kit] : scan and translate text in seconds', NULL, 'uploads/equipments/kit02.jpg', 7, 'วิทย์ เที่ยงบูรณธรรม. กรุงเทพฯ : บริษัท WizCom Technologies, c2548', 'external', 4500.00),
(3, 'Kit 04', 'iPod classic [kit]', NULL, 'uploads/equipments/kit04.jpg', 8, 'Cupertino, C.A. : Apple, c2007. Mac or PC, USB 2.0, Mac OS X v10.4.8, Windows Vista or Windows XP Home or Professional (SP2), iTunes 7.4, Internet access', 'external', 3500.00),
(4, 'Kit 11', 'กระเป๋าใส่หนังสือ [kit]', NULL, 'uploads/equipments/bagpsck.webp', 24, 'พิมพลักษณ์: 2552', 'external', 500.00),
(5, 'Kit 10', 'โคมไฟอ่านหนังสือ ยี่ห้อ Panasonic [kit]', NULL, 'uploads/equipments/OIP.webp', 10, 'พิมพลักษณ์: 2552', 'internal', 350.00),
(6, 'Kit 13', 'ปลั๊กพ่วงสายไฟ [kit]', NULL, 'uploads/equipments/toshimo.webp', 40, 'พิมพลักษณ์: 2552', 'internal', 250.00),
(7, 'Kit 16', 'หูฟังไร้สาย [headphones]', NULL, 'uploads/equipments/headphone.webp', 32, 'พิมพลักษณ์: 2554', 'internal', 890.00),
(8, 'Kit 17', 'CyberDict 8 plus [kit]', NULL, 'uploads/equipments/Read.jpg', 20, 'พจนานุกรมหลายภาษา -- อุปกรณ์อิเล็กทรอนิกส์. กรุงเทพฯ : บริษัทไซเบอร์ดิก เทคโนโลยี, 2554', 'external', 2500.00),
(9, 'Kit 20', 'iPad 2 [kit]', NULL, 'uploads/equipments/ipad.jpeg', 7, 'Cupertino, C.A. : Apple, c2012. Wi-Fi 32GB Black, เชื่อมต่อกับ iTunes บน Mac หรือ PC ต้องการ iTunes 10.5 หรือใหม่กว่า จัดซื้อในปีงบประมาณ พ.ศ. 2555', 'external', 12900.00),
(10, 'Kit 21', 'Lightning to digital AV adapter [adapter] / Apple.', NULL, 'uploads/equipments/USB-C.jpeg', 7, 'China : Apple, c2017.', 'internal', 1500.00),
(11, 'Kit 22', 'Acer projector [projector]', NULL, 'uploads/equipments/acer.jpeg', 1, '[ไต้หวัน : เอเซอร์, ม.ป.ป.]', 'external', 5000.00),
(12, 'Kit 35', 'iPad air [kit]', NULL, 'uploads/equipments/ipad_air.webp', 10, 'California, C.A. : Apple, c2014. สายจ่ายไฟ USB รองรับ Wi-Fi และบลูทูธ จัดซื้อในปีงบประมาณ พ.ศ. 2557', 'external', 15000.00),
(13, 'Kit 38', 'iPad [kit] : 7th generation รุ่น Wi-Fi 32 GB Silver.', NULL, 'uploads/equipments/ipad_old.webp', 3, 'California, C.A. : Apple, c2019.', 'external', 10900.00),
(14, 'Kit 39', 'USB-C to digital AV : multiport adapter [adapter] / Apple.', NULL, 'uploads/equipments/AV.jpg', 8, 'อะแดปเตอร์. Cupertino, CA : Apple, 2019.', 'internal', 2500.00),
(15, 'Kit 40', 'USB-C to HDMI adapter [adapter]', NULL, 'uploads/equipments/HDMI.webp', 4, 'Adapters. China : Ugreen Group, [n.d.]', 'internal', 800.00),
(16, 'Kit 41', 'Light-weight headphones [headphones]', NULL, 'uploads/equipments/ReadImage.jpeg', 3, 'Headphones. [Thailand] : [Synchro], [n.d.]', 'internal', 300.00),
(17, 'Kit 43', 'สายชาร์จโทรศัพท์ (Lightning) [adapter] / Apple.', NULL, 'uploads/equipments/lightning.jpeg', 1, 'Adapters. China : Apple, [n.d.] สามารถใช้งานได้กับ Apple Watch, iPhone, หรือ iPod ทุกรุ่น', 'internal', 500.00),
(18, 'Kit 47', 'สายชาร์จโทรศัพท์ (Lightning) [adapter] / Apple.', NULL, 'uploads/equipments/lightning_1.jpeg', 1, 'Adapters. China : Apple, [n.d.]', 'internal', 500.00),
(19, 'Kit 15', 'NEC projector [projector]', NULL, 'uploads/equipments/NEC.webp', 3, 'Overhead projection. Motion picture projectors. Illinois : NEC Display Solutions, 2015.', 'external', 6000.00),
(20, 'Kit 45', 'สายชาร์จโทรศัพท์ (Type C) [adapter] / Apple.', NULL, 'uploads/equipments/type_c.webp', 1, 'Adapters. China : Apple, [n.d.]', 'internal', 500.00),
(21, 'Kit 46', 'สายชาร์จโทรศัพท์ (Type C) [adapter] / Apple.', NULL, 'uploads/equipments/type_c1.jpeg', 5, 'Adapters. China : Apple, [n.d.]', 'internal', 500.00),
(22, 'Kit 48', 'สายชาร์จโทรศัพท์ (Lightning) [adapter] / Apple.', NULL, 'uploads/equipments/lightning_3.jpeg', 2, 'Adapters. China : Apple, [n.d.]', 'internal', 500.00),
(23, 'Kit 49', 'หูฟังแบบมีสาย : Hyperx cloud stinger 2 core [headphones]', NULL, 'uploads/equipments/headphones_2.jpeg', 12, 'จีน ;นนทบุรี : บริษัทเอสเซนตี้ รีซอร์สเซส, 2023 [2566]', 'internal', 1590.00),
(24, 'Kit 42', 'เครื่องคิดเลข CASIO fx-350MS [calculator]', NULL, 'uploads/equipments/calculator.jpeg', 5, 'เครื่องคำนวณเลข คาสิโอ. [S.I.] : [S.n.], [n.d.]', 'external', 450.00),
(25, 'Kit 50', 'ปลั๊กพวง USB + Type C [kit]', NULL, 'uploads/equipments/USB_TYPEC.jpeg', 5, 'จีน ;กรุงเทพฯ : โตชิโน ซัพพลาย, 2567. แรงดันไฟฟ้าสูงสุด (Max voltage): 250 v., ค่ากระแสไฟฟ้าสูงสุด (Max current): 10 amp., กำลังไฟฟ้าสูงสุด (Max wattage): 2300 วัตต์', 'internal', 690.00),
(26, 'Kit 51', 'Stylus pen [kit]', NULL, 'uploads/equipments/pen.jpeg', 3, 'ปากกา. จีน ;นนทบุรี : Remax (Thailand), [ม.ป.ป.]', 'internal', 590.00),
(27, 'Kit 52', 'Wireless mouse [kit]', NULL, 'uploads/equipments/mouse.jpeg', 5, 'เวียดนาม : Logitech Asia Pacific, 2025. ข้อกำหนดของระบบ พอร์ต USB ใช้ได้กับ Windows 10, 11 หรือใหม่กว่า macOS 11 หรือใหม่กว่า ChromeOS Linux', 'internal', 490.00),
(28, 'Kit 53', 'เสื้อพับ [kit]', NULL, 'uploads/equipments/no.1.jpeg', 6, '[ม.ป.ท. : ม.ป.พ., ม.ป.ป.]', 'internal', 0.00),
(29, 'Kit 44', 'สายชาร์จโทรศัพท์ (Lightning) [adapter] / Apple.', NULL, 'uploads/equipments/kit44.jpeg', 2, 'Adapters. China : Apple, [n.d.] สามารถใช้งานได้กับ iPhone, iPad, iPod', 'internal', 500.00);

-- --------------------------------------------------------

--
-- Table structure for table `equipment_items`
--

CREATE TABLE `equipment_items` (
  `item_id` int NOT NULL,
  `equipment_id` int NOT NULL,
  `sequence_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_asset_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('available','borrowed','damaged','maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipment_items`
--

INSERT INTO `equipment_items` (`item_id`, `equipment_id`, `sequence_code`, `full_asset_code`, `status`) VALUES
(1, 1, 'c.1', '31051002219398', 'available'),
(2, 1, 'c.2', '31051002219372', 'available'),
(3, 1, 'c.3', '31051002219356', 'available'),
(4, 1, 'c.4', '31051002219331', 'available'),
(5, 1, 'c.5', '31051002219315', 'available'),
(6, 1, 'c.6', '31051002219406', 'maintenance'),
(7, 1, 'c.7', '31051002219380', 'available'),
(8, 1, 'c.8', '31051002219364', 'maintenance'),
(9, 1, 'c.9', '31051002219349', 'available'),
(10, 1, 'c.10', '31051002219323', 'available'),
(11, 2, 'c.1', '31051001288691', 'available'),
(12, 2, 'c.4', '31051001288634', 'available'),
(13, 2, 'c.5', '31051001288618', 'available'),
(14, 2, 'c.6', '31051001288709', 'available'),
(15, 2, 'c.7', '31051001288683', 'available'),
(16, 2, 'c.8', '31051001288667', 'available'),
(17, 2, 'c.10', '31051001288626', 'available'),
(18, 3, 'c.1', '31051001853643', 'available'),
(19, 3, 'c.2', '31051001288576', 'available'),
(20, 3, 'c.3', '31051001288550', 'available'),
(21, 3, 'c.4', '31051001959739', 'available'),
(22, 3, 'c.5', '31051001288519', 'available'),
(23, 3, 'c.6', '31051001959721', 'available'),
(24, 3, 'c.7', '31051001288584', 'available'),
(25, 3, 'c.8', '31051001972344', 'available'),
(26, 4, 'c.1', '31051001287701', 'available'),
(27, 4, 'c.2', '31051001287685', 'available'),
(28, 4, 'c.3', '31051001287669', 'available'),
(29, 4, 'c.4', '31051001287644', 'available'),
(30, 4, 'c.5', '31051001287628', 'available'),
(31, 4, 'c.6', '31051001287602', 'available'),
(32, 4, 'c.7', '31051001287586', 'available'),
(33, 4, 'c.8', '31051001287560', 'available'),
(34, 4, 'c.9', '31051001287545', 'available'),
(35, 4, 'c.11', '31051002219224', 'available'),
(36, 4, 'c.16', '31051001287594', 'available'),
(37, 4, 'c.17', '31051001768049', 'available'),
(38, 4, 'c.18', '31051001287552', 'available'),
(39, 4, 'c.21', '31051001287222', 'available'),
(40, 4, 'c.23', '31051001287180', 'available'),
(41, 4, 'c.25', '31051001287149', 'available'),
(42, 4, 'c.26', '31051001287123', 'available'),
(43, 4, 'c.28', '31051001287081', 'available'),
(44, 4, 'c.29', '31051001287065', 'available'),
(45, 4, 'c.30', '31051001287040', 'maintenance'),
(46, 4, 'c.31', '31051001287024', 'available'),
(47, 4, 'c.32', '31051001971148', 'maintenance'),
(48, 4, 'c.33', '31051002167829', 'available'),
(49, 4, 'c.37', '31051001287198', 'available'),
(50, 5, 'c.1', '31051001287800', 'available'),
(51, 5, 'c.2', '31051001287792', 'available'),
(52, 5, 'c.3', '31051001287784', 'available'),
(53, 5, 'c.4', '31051001287776', 'available'),
(54, 5, 'c.5', '31051001287768', 'available'),
(55, 5, 'c.6', '31051001287750', 'available'),
(56, 5, 'c.7', '31051001287743', 'available'),
(57, 5, 'c.8', '31051001287735', 'available'),
(58, 5, 'c.9', '31051001287727', 'available'),
(59, 5, 'c.10', '31051001287719', 'available'),
(60, 6, 'c.1', '31051002170864', 'available'),
(61, 6, 'c.2', '31051002078331', 'available'),
(62, 6, 'c.3', '31051001287396', 'available'),
(63, 6, 'c.4', '31051001659693', 'available'),
(64, 6, 'c.5', '31051001659677', 'available'),
(65, 6, 'c.6', '31051002291660', 'available'),
(66, 6, 'c.7', '31051001659636', 'available'),
(67, 6, 'c.8', '31051001659610', 'available'),
(68, 6, 'c.9', '31051002170849', 'available'),
(69, 6, 'c.10', '31051001659701', 'available'),
(70, 6, 'c.11', '31051002291652', 'available'),
(71, 6, 'c.12', '31051002170831', 'available'),
(72, 6, 'c.13', '31051002096275', 'available'),
(73, 6, 'c.14', '31051002096259', 'available'),
(74, 6, 'c.15', '31051002096234', 'available'),
(75, 6, 'c.16', '31051002096218', 'available'),
(76, 6, 'c.17', '31051002096119', 'available'),
(77, 6, 'c.18', '31051002096101', 'available'),
(78, 6, 'c.19', '31051002096093', 'available'),
(79, 6, 'c.20', '31051002096374', 'available'),
(80, 6, 'c.21', '31051002167845', 'available'),
(81, 6, 'c.22', '31051002167837', 'available'),
(82, 6, 'c.23', '31051002167811', 'available'),
(83, 6, 'c.24', '31051002167795', 'available'),
(84, 6, 'c.25', '31051002167779', 'available'),
(85, 6, 'c.26', '31051002167753', 'available'),
(86, 6, 'c.27', '31051002171250', 'available'),
(87, 6, 'c.28', '31051002171268', 'available'),
(88, 6, 'c.29', '31051002171235', 'available'),
(89, 6, 'c.30', '31051002171243', 'available'),
(90, 6, 'c.31', '31051001957931', 'available'),
(91, 6, 'c.32', '31051001957923', 'available'),
(92, 6, 'c.33', '31051001957915', 'available'),
(93, 6, 'c.34', '31051001957907', 'available'),
(94, 6, 'c.35', '31051001957899', 'available'),
(95, 6, 'c.36', '31051001957881', 'available'),
(96, 6, 'c.37', '31051001957873', 'available'),
(97, 6, 'c.38', '31051001958103', 'available'),
(98, 6, 'c.39', '31051001957857', 'available'),
(99, 6, 'c.40', '31051001957840', 'available'),
(100, 7, 'v.6', '31051001524756', 'available'),
(101, 7, 'v.7', '31051001762992', 'maintenance'),
(102, 7, 'v.8', '31051001524749', 'available'),
(103, 7, 'v.9', '31051001960315', 'available'),
(104, 7, 'v.15', '31051001524723', 'available'),
(105, 7, 'v.19', '31051001524681', 'available'),
(106, 7, 'v.20', '31051001524731', 'available'),
(107, 7, 'v.22', '31051001524665', 'available'),
(108, 7, 'v.23', '31051001524632', 'available'),
(109, 7, 'v.24', '31051001524574', 'available'),
(110, 7, 'v.25', '31051001524640', 'available'),
(111, 7, 'v.26', '31051001524616', 'available'),
(112, 7, 'v.27', '31051001524541', 'available'),
(113, 7, 'v.30', '31051001524566', 'available'),
(114, 7, 'v.31', '31051001524517', 'available'),
(115, 7, 'v.33', '31051001524855', 'available'),
(116, 7, 'v.34', '31051001524558', 'available'),
(117, 7, 'v.35', '31051001524491', 'available'),
(118, 7, 'v.40', '31051001960307', 'available'),
(119, 7, 'v.43', '31051001960299', 'available'),
(120, 7, 'v.46', '31051001777115', 'maintenance'),
(121, 7, 'v.56', '31051001960281', 'available'),
(122, 7, 'v.61', '31051001762935', 'available'),
(123, 7, 'v.62', '31051001762984', 'available'),
(124, 7, 'v.63', '31051001762968', 'available'),
(125, 7, 'v.64', '31051001762943', 'available'),
(126, 7, 'v.65', '31051001960273', 'available'),
(127, 7, 'v.66', '31051001960265', 'available'),
(128, 7, 'v.67', '31051001960257', 'available'),
(129, 7, 'v.68', '31051001960240', 'available'),
(130, 7, 'v.69', '31051002374656', 'available'),
(131, 7, 'v.70', '31051001960224', 'available'),
(132, 8, 'c.1', '31051001795158', 'available'),
(133, 8, 'c.2', '31051001795174', 'available'),
(134, 8, 'c.3', '31051001795208', 'available'),
(135, 8, 'c.4', '31051001795257', 'available'),
(136, 8, 'c.5', '31051001795265', 'available'),
(137, 8, 'c.6', '31051001795240', 'available'),
(138, 8, 'c.7', '31051001795190', 'available'),
(139, 8, 'c.8', '31051001795232', 'available'),
(140, 8, 'c.9', '31051001795216', 'available'),
(141, 8, 'c.10', '31051001795224', 'available'),
(142, 8, 'c.11', '31051001795182', 'available'),
(143, 8, 'c.12', '31051001795323', 'available'),
(144, 8, 'c.13', '31051001795349', 'available'),
(145, 8, 'c.14', '31051001795315', 'available'),
(146, 8, 'c.15', '31051001795273', 'available'),
(147, 8, 'c.16', '31051001795281', 'available'),
(148, 8, 'c.17', '31051001795331', 'available'),
(149, 8, 'c.18', '31051001795364', 'available'),
(150, 8, 'c.19', '31051001795299', 'available'),
(151, 8, 'c.20', '31051001795307', 'available'),
(152, 9, 'c.2', '31051001760947', 'available'),
(153, 9, 'c.4', '31051001760905', 'available'),
(154, 9, 'c.5', '31051001760889', 'available'),
(155, 9, 'c.6', '31051001760871', 'available'),
(156, 9, 'c.7', '31051001760897', 'available'),
(157, 9, 'c.9', '31051001760939', 'maintenance'),
(158, 9, 'c.10', '31051001760954', 'maintenance'),
(159, 10, 'c.1', '31051001922224', 'available'),
(160, 10, 'c.2', '31051001924022', 'available'),
(161, 10, 'c.3', '31051001924048', 'available'),
(162, 10, 'c.4', '31051001916911', 'available'),
(163, 10, 'c.5', '31051001916903', 'available'),
(164, 10, 'c.6', '31051001916895', 'available'),
(165, 10, 'c.7', '31051001916887', 'available'),
(166, 11, 'c.1', '31051001822093', 'available'),
(167, 12, 'c.1', '31051002131858', 'available'),
(168, 12, 'c.2', '31051002131833', 'available'),
(169, 12, 'c.3', '31051002131817', 'available'),
(170, 12, 'c.4', '31051002131791', 'available'),
(171, 12, 'c.5', '31051002131775', 'available'),
(172, 12, 'c.6', '31051002131866', 'available'),
(173, 12, 'c.7', '31051002131841', 'available'),
(174, 12, 'c.8', '31051002131825', 'available'),
(175, 12, 'c.9', '31051002131809', 'available'),
(176, 12, 'c.10', '31051002131783', 'available'),
(177, 13, 'c.2', '31051001916101', 'available'),
(178, 13, 'c.3', '31051001916093', 'maintenance'),
(179, 13, 'c.1', '31051001916119', 'available'),
(180, 14, 'c.1', '31051002295919', 'available'),
(181, 14, 'c.2', '31051002295901', 'available'),
(182, 14, 'c.3', '31051002396287', 'available'),
(183, 14, 'c.4', '31051002396279', 'available'),
(184, 14, 'c.5', '31051002590855', 'available'),
(185, 14, 'c.6', '31051002590848', 'available'),
(186, 14, 'c.7', '31051002590830', 'available'),
(187, 14, 'c.8', '31051002590822', 'available'),
(188, 15, 'c.1', '31051002430490', 'available'),
(189, 15, 'c.2', '31051002430482', 'available'),
(190, 15, 'c.3', '31051002430474', 'available'),
(191, 15, 'c.4', '31051002577837', 'available'),
(192, 16, 'c.1', '31051002433387', 'available'),
(193, 16, 'c.2', '31051002433379', 'available'),
(194, 16, 'c.3', '31051002433361', 'available'),
(195, 17, 'c.1', '31051002447890', 'available'),
(196, 18, 'c.1', '31051002404313', 'available'),
(197, 19, 'c.1', '31051001948096', 'available'),
(198, 19, 'c.2', '31051001948104', 'available'),
(199, 19, 'c.3', '31051001948112', 'available'),
(200, 20, 'c.1', '31051002447866', 'available'),
(201, 21, 'c.1', '31051002399208', 'available'),
(202, 21, 'c.2', '31051002590806', 'available'),
(203, 21, 'c.3', '31051002590798', 'available'),
(204, 21, 'c.4', '31051002486740', 'available'),
(205, 21, 'c.5', '31051002486732', 'available'),
(206, 22, 'c.1', '31051002404297', 'available'),
(207, 22, 'c.2', '31051002404305', 'available'),
(208, 23, 'c.1', '31051002588222', 'available'),
(209, 23, 'c.2', '31051002588214', 'available'),
(210, 23, 'c.3', '31051002588123', 'available'),
(211, 23, 'c.4', '31051002588115', 'available'),
(212, 23, 'c.5', '31051002588107', 'available'),
(213, 23, 'c.6', '31051002588099', 'available'),
(214, 23, 'c.7', '31051002588081', 'available'),
(215, 23, 'c.8', '31051002588073', 'available'),
(216, 23, 'c.9', '31051002588065', 'available'),
(217, 23, 'c.10', '31051002588057', 'available'),
(218, 23, 'c.11', '31051002588040', 'available'),
(219, 23, 'c.12', '31051002588032', 'available'),
(220, 24, 'c.1', '31051002395537', 'available'),
(221, 24, 'c.2', '31051002395529', 'available'),
(222, 24, 'c.3', '31051002404263', 'available'),
(223, 24, 'c.4', '31051002404289', 'available'),
(224, 24, 'c.5', '31051002106793', 'available'),
(225, 25, 'c.1', '31051002590731', 'available'),
(226, 25, 'c.2', '31051002590723', 'available'),
(227, 25, 'c.3', '31051002590715', 'available'),
(228, 25, 'c.4', '31051002590707', 'available'),
(229, 25, 'c.5', '31051002590699', 'available'),
(230, 26, 'c.1', '31051002590640', 'available'),
(231, 26, 'c.2', '31051002590632', 'available'),
(232, 26, 'c.3', '31051002590624', 'available'),
(233, 27, 'c.1', '31051002590780', 'available'),
(234, 27, 'c.2', '31051002590772', 'available'),
(235, 27, 'c.3', '31051002590764', 'available'),
(236, 27, 'c.4', '31051002590756', 'available'),
(237, 27, 'c.5', '31051002590749', 'available'),
(238, 28, 'c.1', '31051002488605', 'available'),
(239, 28, 'c.2', '31051002488597', 'available'),
(240, 28, 'c.3', '31051002488589', 'available'),
(241, 28, 'c.4', '31051002488571', 'available'),
(242, 28, 'c.5', '31051002488563', 'available'),
(243, 28, 'c.6', '31051002488555', 'available'),
(244, 29, 'c.1', '31051002447882', 'available'),
(245, 29, 'c.2', '31051002399216', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notify_id` int NOT NULL,
  `target_type` enum('all','specific') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_student_id` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ถ้าเป็น all ก็ปล่อยว่าง',
  `title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sent_by` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notify_id`, `target_type`, `target_student_id`, `title`, `message`, `sent_by`, `sent_at`) VALUES
(1, 'all', NULL, 'ปิดปรับปรุงระบบชั่วคราว', 'ระบบจะปิดปรับปรุงวันที่ 20 ก.ค. 69 เวลา 22:00-24:00 น.', '100001', '2026-07-15 02:00:00'),
(2, 'specific', 'B6800001', 'แจ้งเตือนเกินกำหนดคืน', 'กรุณานำอุปกรณ์มาคืนโดยด่วน เกินกำหนดคืนแล้ว 1 วัน', '100002', '2026-07-16 03:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `student_profiles`
--

CREATE TABLE `student_profiles` (
  `student_id` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `student_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_th` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_level` int NOT NULL,
  `education_status` enum('active','suspended','graduated') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `birth_date` date NOT NULL,
  `citizen_id` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_profiles`
--

INSERT INTO `student_profiles` (`student_id`, `user_id`, `student_img`, `name_th`, `name_en`, `department`, `year_level`, `education_status`, `birth_date`, `citizen_id`, `phone_number`, `email`) VALUES
('B6600001', 116, 'uploads/students/student1.png', 'เอกราช ภักดี', 'Ekarat Pakdee', 'วิศวกรรมซอฟต์แวร์', 4, 'active', '2004-04-16', '1100100000016', '0811111116', 'ekarat.p@gmail.com'),
('B6600002', 117, 'uploads/students/student1.png', 'กัญญารัตน์ รุ่งเรือง', 'Kanyarat Rungruang', 'วิทยาการคอมพิวเตอร์', 4, 'active', '2004-05-08', '1100100000017', '0811111117', 'kanyarat.r@gmail.com'),
('B6600003', 118, 'uploads/students/student1.png', 'ตรีภพ ชาญชัย', 'Treephop Chanchai', 'เทคโนโลยีสารสนเทศ', 4, 'active', '2004-06-21', '1100100000018', '0811111118', 'treephop.c@gmail.com'),
('B6600004', 119, 'uploads/students/student1.png', 'นันทนา สุวรรณ', 'Nantana Suwan', 'วิศวกรรมซอฟต์แวร์', 4, 'active', '2004-07-07', '1100100000019', '0811111119', 'nantana.s@gmail.com'),
('B6600005', 120, 'uploads/students/student.png', 'วิทยา นามสมมติ', 'Wittaya Namsommot', 'วิทยาการคอมพิวเตอร์', 4, 'active', '2004-08-19', '1100100000020', '0811111120', 'wittaya.n@gmail.com'),
('B6700001', 111, 'uploads/students/student.png', 'รัชชานนท์ ทองดี', 'Ratchanon Thongdee', 'วิทยาการคอมพิวเตอร์', 3, 'active', '2005-11-25', '1100100000011', '0811111111', 'ratchanon.t@gmail.com'),
('B6700002', 112, 'uploads/students/student.png', 'วรรณิภา ศรีสุข', 'Wannipa Srisuk', 'เทคโนโลยีสารสนเทศ', 3, 'active', '2005-12-01', '1100100000012', '0811111112', 'wannipa.s@gmail.com'),
('B6700003', 113, 'uploads/students/student.png', 'ศิริพร ปัญญา', 'Siriporn Panya', 'วิศวกรรมซอฟต์แวร์', 3, 'active', '2005-01-11', '1100100000013', '0811111113', 'siriporn.p@gmail.com'),
('B6700004', 114, 'uploads/students/student.png', 'สมศักดิ์ เกียรติภูมิ', 'Somsak Kiatipoom', 'วิทยาการคอมพิวเตอร์', 3, 'active', '2005-02-14', '1100100000014', '0811111114', 'somsak.k@gmail.com'),
('B6700005', 115, 'uploads/students/student1.png', 'อรวรรณ ใจมั่น', 'Orawan Jaiman', 'เทคโนโลยีสารสนเทศ', 3, 'active', '2005-03-29', '1100100000015', '0811111115', 'orawan.j@gmail.com'),
('B6800001', 106, 'uploads/students/student1.png', 'นพดล แสงสว่าง', 'Nopadon Saengsawang', 'เทคโนโลยีสารสนเทศ', 2, 'active', '2006-06-18', '1100100000006', '0811111106', 'nopadon.s@gmail.com'),
('B6800002', 107, 'uploads/students/student.png', 'ปิยะธิดา พรหมจรรย์', 'Piyatida Promjan', 'วิศวกรรมซอฟต์แวร์', 2, 'active', '2006-07-22', '1100100000007', '0811111107', 'piyatida.p@gmail.com'),
('B6800003', 108, 'uploads/students/student.png', 'พงศกร เจริญยิ่ง', 'Pongsakorn Charoenying', 'วิทยาการคอมพิวเตอร์', 2, 'active', '2006-08-30', '1100100000008', '0811111108', 'pongsakorn.c@gmail.com'),
('B6800004', 109, 'uploads/students/student.png', 'ภัทรพล ทวีทรัพย์', 'Pattarapon Taweesap', 'เทคโนโลยีสารสนเทศ', 2, 'active', '2006-09-14', '1100100000009', '0811111109', 'pattarapon.t@gmail.com'),
('B6800005', 110, 'uploads/students/student.png', 'มณีรัตน์ วงศ์สุวรรณ', 'Maneerat Wongsuwan', 'วิศวกรรมซอฟต์แวร์', 2, 'active', '2006-10-09', '1100100000010', '0811111110', 'maneerat.w@gmail.com'),
('B6900001', 101, 'uploads/students/student.png', 'กิตติพงษ์ รักเรียน', 'Kittipong Rakrian', 'วิศวกรรมซอฟต์แวร์', 1, 'active', '2007-01-15', '1100100000001', '0811111101', 'kittipong.r@gmail.com'),
('B6900002', 102, 'uploads/students/student1.png', 'จิราพร สุขเกษม', 'Jiraporn Sukkasem', 'วิทยาการคอมพิวเตอร์', 1, 'active', '2007-02-20', '1100100000002', '0811111102', 'jiraporn.s@gmail.com'),
('B6900003', 103, 'uploads/students/student1.png', 'ชัยวัฒน์ มั่นคง', 'Chaiwat Mankong', 'เทคโนโลยีสารสนเทศ', 1, 'active', '2007-03-10', '1100100000003', '0811111103', 'chaiwat.m@gmail.com'),
('B6900004', 104, 'uploads/students/student1.png', 'ณัฐวุฒิ ยอดเยี่ยม', 'Nattawut Yodyiam', 'วิศวกรรมซอฟต์แวร์', 1, 'active', '2007-04-05', '1100100000004', '0811111104', 'nattawut.y@gmail.com'),
('B6900005', 105, 'uploads/students/student1.png', 'ธิดารัตน์ งามตา', 'Thidarat Ngamta', 'วิทยาการคอมพิวเตอร์', 1, 'active', '2007-05-12', '1100100000005', '0811111105', 'thidarat.n@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('student','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `created_at`) VALUES
(101, 'B6900001', '1100100000001', 'student', '2026-07-13 18:41:48'),
(102, 'B6900002', '1100100000002', 'student', '2026-07-13 18:41:48'),
(103, 'B6900003', '1100100000003', 'student', '2026-07-13 18:41:48'),
(104, 'B6900004', '1100100000004', 'student', '2026-07-13 18:41:48'),
(105, 'B6900005', '1100100000005', 'student', '2026-07-13 18:41:48'),
(106, 'B6800001', '1100100000006', 'student', '2026-07-13 18:41:48'),
(107, 'B6800002', '1100100000007', 'student', '2026-07-13 18:41:48'),
(108, 'B6800003', '1100100000008', 'student', '2026-07-13 18:41:48'),
(109, 'B6800004', '1100100000009', 'student', '2026-07-13 18:41:48'),
(110, 'B6800005', '1100100000010', 'student', '2026-07-13 18:41:48'),
(111, 'B6700001', '1100100000011', 'student', '2026-07-13 18:41:48'),
(112, 'B6700002', '1100100000012', 'student', '2026-07-13 18:41:48'),
(113, 'B6700003', '1100100000013', 'student', '2026-07-13 18:41:48'),
(114, 'B6700004', '1100100000014', 'student', '2026-07-13 18:41:48'),
(115, 'B6700005', '1100100000015', 'student', '2026-07-13 18:41:48'),
(116, 'B6600001', '1100100000016', 'student', '2026-07-13 18:41:48'),
(117, 'B6600002', '1100100000017', 'student', '2026-07-13 18:41:48'),
(118, 'B6600003', '1100100000018', 'student', '2026-07-13 18:41:48'),
(119, 'B6600004', '1100100000019', 'student', '2026-07-13 18:41:48'),
(120, 'B6600005', '1100100000020', 'student', '2026-07-13 18:41:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow_requests`
--
ALTER TABLE `borrow_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `fk_br_student` (`student_id`),
  ADD KEY `fk_br_item` (`item_id`),
  ADD KEY `fk_br_emp` (`approved_by`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `citizen_id` (`citizen_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`equipment_id`),
  ADD UNIQUE KEY `kit_code` (`kit_code`);

--
-- Indexes for table `equipment_items`
--
ALTER TABLE `equipment_items`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `full_asset_code` (`full_asset_code`),
  ADD KEY `equipment_id` (`equipment_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notify_id`),
  ADD KEY `fk_notify_student` (`target_student_id`),
  ADD KEY `fk_notify_emp` (`sent_by`);

--
-- Indexes for table `student_profiles`
--
ALTER TABLE `student_profiles`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `citizen_id` (`citizen_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borrow_requests`
--
ALTER TABLE `borrow_requests`
  MODIFY `request_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `equipments`
--
ALTER TABLE `equipments`
  MODIFY `equipment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `equipment_items`
--
ALTER TABLE `equipment_items`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notify_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `borrow_requests`
--
ALTER TABLE `borrow_requests`
  ADD CONSTRAINT `borrow_requests_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `borrow_requests_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `equipment_items` (`item_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `borrow_requests_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `employees` (`emp_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_br_emp` FOREIGN KEY (`approved_by`) REFERENCES `employees` (`emp_id`),
  ADD CONSTRAINT `fk_br_item` FOREIGN KEY (`item_id`) REFERENCES `equipment_items` (`item_id`),
  ADD CONSTRAINT `fk_br_student` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`student_id`);

--
-- Constraints for table `equipment_items`
--
ALTER TABLE `equipment_items`
  ADD CONSTRAINT `equipment_items_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`equipment_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notify_emp` FOREIGN KEY (`sent_by`) REFERENCES `employees` (`emp_id`),
  ADD CONSTRAINT `fk_notify_student` FOREIGN KEY (`target_student_id`) REFERENCES `student_profiles` (`student_id`),
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`target_student_id`) REFERENCES `student_profiles` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`sent_by`) REFERENCES `employees` (`emp_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_profiles`
--
ALTER TABLE `student_profiles`
  ADD CONSTRAINT `student_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
