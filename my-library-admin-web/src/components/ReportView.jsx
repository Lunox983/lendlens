import { useState, useEffect, useRef } from "react";
import { FileText, Calendar, Filter, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";

export default function ReportView({ authFetch, formatThaiDate, STATUS_MAP }) {
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [statusFilter, setStatusFilter] = useState("all");
    const printRef = useRef(null);

    useEffect(() => {
        // Fetch up to 1000 latest records for reporting
        setIsLoading(true);
        authFetch('/api/admin/requests?limit=1000')
            .then(res => {
                if (res.success) {
                    setReportData(res.data);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch report data", err);
                setIsLoading(false);
            });
    }, [authFetch]);

    const filteredData = reportData.filter(r => {
        let pass = true;
        if (statusFilter !== "all" && r.status !== statusFilter) pass = false;
        
        if (dateRange.start) {
            const bDate = r.borrow_date ? r.borrow_date.split("T")[0] : "";
            if (bDate < dateRange.start) pass = false;
        }
        if (dateRange.end) {
            const bDate = r.borrow_date ? r.borrow_date.split("T")[0] : "";
            if (bDate > dateRange.end) pass = false;
        }
        return pass;
    });

    const exportToExcel = () => {
        const dataToExport = filteredData.map(r => ({
            "รหัสนักศึกษา": r.student_id,
            "ชื่อ-นามสกุล": r.student_name,
            "อุปกรณ์": r.equipment_name,
            "รหัสครุภัณฑ์": r.equipment_code,
            "วันที่ยืม": formatThaiDate(r.borrow_date),
            "วันที่คืน": r.return_date ? formatThaiDate(r.return_date) : "-",
            "สถานะ": STATUS_MAP[r.status]?.label || r.status,
            "ค่าปรับ (บาท)": r.fine_amount || 0
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        XLSX.writeFile(wb, "Library_Report.xlsx");
    };

    const exportToPDF = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Library_Report"
    });

    return (
        <>
            <div className="bg-white border-b border-purple-100 px-8 py-5 sticky top-0 z-10 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-semibold">รายงาน (Reports)</h1>
                    <p className="text-[12.5px] text-slate-400 mt-0.5">สรุปข้อมูลการยืม-คืนและส่งออกข้อมูลเป็น Excel หรือ PDF</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={exportToExcel} className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-green-700 transition">
                        <FileSpreadsheet size={16} /> Export Excel
                    </button>
                    <button onClick={() => exportToPDF()} className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-red-600 transition">
                        <FileText size={16} /> Export PDF
                    </button>
                </div>
            </div>
            <div className="p-8 pt-6">
                <div className="bg-white border border-purple-100 rounded-3xl shadow-sm p-6 mb-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                            <Calendar size={16} className="text-slate-400" />
                            <span className="text-[13px] font-semibold text-slate-600">ตั้งแต่:</span>
                            <input type="date" className="bg-transparent text-[13px] outline-none" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} />
                            <span className="text-[13px] font-semibold text-slate-600 ml-2">ถึง:</span>
                            <input type="date" className="bg-transparent text-[13px] outline-none" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} />
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                            <Filter size={16} className="text-slate-400" />
                            <select className="bg-transparent text-[13px] outline-none font-semibold text-slate-700" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                <option value="all">ทุกสถานะ</option>
                                <option value="pending">รออนุมัติ</option>
                                <option value="borrowed">กำลังยืม</option>
                                <option value="returned">คืนแล้ว</option>
                                <option value="overdue">เลยกำหนด</option>
                                <option value="damaged_lost">งดใช้ชั่วคราว/สูญหาย</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-purple-100 rounded-3xl shadow-sm p-6" ref={printRef} id="report-table-container">
                    <div className="mb-4 text-center">
                        <h2 className="text-lg font-bold text-slate-700">รายงานการยืม-คืนอุปกรณ์</h2>
                        <p className="text-sm text-slate-500">
                            {dateRange.start || dateRange.end ? `ช่วงวันที่ ${dateRange.start || '-'} ถึง ${dateRange.end || '-'}` : 'ข้อมูลทั้งหมดล่าสุด'}
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[800px]">
                            <thead>
                                <tr>
                                    {["รหัสนศ.", "ชื่อ-นามสกุล", "อุปกรณ์", "วันที่ยืม", "วันที่คืน", "สถานะ", "ค่าปรับ"].map((h) => (
                                        <th key={h} className="text-left text-[12px] uppercase tracking-wide text-slate-400 font-bold pb-4 border-b-2 border-purple-100 px-4 first:pl-2 whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="7" className="py-8 text-center text-slate-400 text-sm">กำลังโหลดข้อมูล...</td></tr>
                                ) : filteredData.length > 0 ? filteredData.map((r) => (
                                    <tr key={r.id} className="border-b border-purple-50 last:border-0">
                                        <td className="py-3 px-4 first:pl-2 text-[12px] font-medium text-slate-600">{r.student_id}</td>
                                        <td className="py-3 px-4 text-[12px] font-semibold text-slate-700">{r.student_name}</td>
                                        <td className="py-3 px-4">
                                            <div className="text-[12px] font-medium text-slate-700">{r.equipment_name}</div>
                                            <div className="text-[10px] text-slate-400">{r.equipment_code}</div>
                                        </td>
                                        <td className="py-3 px-4 text-[12px] text-slate-600">{formatThaiDate(r.borrow_date)}</td>
                                        <td className="py-3 px-4 text-[12px] text-slate-600">{r.return_date ? formatThaiDate(r.return_date) : '-'}</td>
                                        <td className="py-3 px-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_MAP[r.status]?.cls || 'bg-slate-100 text-slate-600'}`}>
                                                {STATUS_MAP[r.status]?.label || r.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-[12px] font-semibold text-red-500">
                                            {r.fine_amount > 0 ? `฿${r.fine_amount}` : '-'}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="7" className="py-8 text-center text-slate-400 text-sm">ไม่มีข้อมูล</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
