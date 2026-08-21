import { Check, X } from "lucide-react";

export default function BorrowsView({
    filterStatus,
    setFilterStatus,
    requestFilterDate,
    setRequestFilterDate,
    isRequestsLoading,
    filteredRequests,
    formatThaiDate,
    STATUS_MAP,
    handleAction
}) {
    return (
        <>
            <div className="bg-white border-b border-purple-100 px-8 py-5 sticky top-0 z-10">
                <h1 className="text-xl font-semibold">รายการยืมและคำขอ</h1>
                <p className="text-[12.5px] text-slate-400 mt-0.5">จัดการคำขอยืม และติดตามสถานะอุปกรณ์ที่กำลังถูกยืม</p>
            </div>
            <div className="p-8 pt-6">
                <div className="bg-white border border-purple-100 rounded-3xl shadow-sm p-6">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mb-6 items-center pb-2">
                        <div className="flex gap-3 overflow-x-auto">
                            {[
                                { id: "all", label: "ทั้งหมด" },
                                { id: "pending", label: "รออนุมัติ" },
                                { id: "borrowed", label: "กำลังยืม" },
                                { id: "overdue", label: "เลยกำหนด" }
                            ].map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilterStatus(f.id)}
                                    className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition ${filterStatus === f.id ? "bg-purple-700 text-white shadow-md shadow-purple-200" : "bg-purple-50 text-purple-700 hover:bg-purple-100"}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <label className="text-[13px] font-semibold text-slate-500 whitespace-nowrap">ระบุวันที่:</label>
                            <input
                                type="date"
                                value={requestFilterDate}
                                onChange={(e) => setRequestFilterDate(e.target.value)}
                                className="border border-purple-100 rounded-lg px-3 py-1.5 text-[13px] text-slate-700 focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300"
                            />
                            {requestFilterDate && (
                                <button
                                    onClick={() => setRequestFilterDate("")}
                                    className="text-[12px] text-red-500 hover:text-red-700 font-semibold ml-1 whitespace-nowrap"
                                >
                                    ล้างค่า
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[800px]">
                            <thead>
                                <tr>
                                    {["รหัสนศ.", "ชื่อ-นามสกุล", "อุปกรณ์", "วันที่ขอ", "กำหนดคืน", "สถานะ", "การจัดการ"].map((h) => (
                                        <th key={h} className="text-left text-[11.5px] uppercase tracking-wide text-slate-400 font-bold pb-4 border-b-2 border-purple-100 whitespace-nowrap px-4 first:pl-2">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isRequestsLoading ? (
                                    <tr><td colSpan="8" className="py-8 text-center text-slate-400 text-sm">กำลังโหลดข้อมูล...</td></tr>
                                ) : filteredRequests.length > 0 ? filteredRequests.map((r) => (
                                    <tr key={r.id} className="hover:bg-purple-50 transition border-b border-purple-50 last:border-0">
                                        <td className="py-4 px-4 first:pl-2 text-[13px] font-medium">{r.student_id}</td>
                                        <td className="py-4 px-4 text-[13px] font-semibold">{r.student_name}</td>
                                        <td className="py-4 px-4">
                                            <div className="text-[13px] font-medium">{r.equipment_name}</div>
                                            <div className="text-[11px] text-slate-400">{r.equipment_code}</div>
                                        </td>
                                        <td className="py-4 px-4 text-[13px] text-slate-600">{formatThaiDate(r.borrow_date)}</td>
                                        <td className="py-4 px-4 text-[13px] text-slate-600">{formatThaiDate(r.return_date)}</td>
                                        <td className="py-4 px-4">
                                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_MAP[r.status]?.cls || 'bg-slate-100 text-slate-600'}`}>
                                                {STATUS_MAP[r.status]?.label || r.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {r.status === "pending" && (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleAction(r.id, 'approve')} className="w-8 h-8 rounded-lg border border-purple-200 text-purple-600 flex items-center justify-center hover:bg-purple-50 transition">
                                                        <Check size={16} />
                                                    </button>
                                                    <button onClick={() => handleAction(r.id, 'reject')} className="w-8 h-8 rounded-lg border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            )}
                                            {(r.status === "borrowed" || r.status === "overdue") && (
                                                <div className="flex flex-col gap-2 items-start">
                                                    <button onClick={() => handleAction(r.id, 'return', r.fine_amount)} className="text-[12px] font-semibold text-purple-700 hover:text-purple-900 transition">
                                                        ตรวจสอบ & บันทึกคืน
                                                    </button>
                                                    <button onClick={() => handleAction(r.id, 'lost', r.price)} className="text-[12px] font-semibold text-red-500 hover:text-red-700 transition">
                                                        แจ้งสูญหาย/เสียหาย
                                                    </button>
                                                </div>
                                            )}
                                            {r.status === "damaged_lost" && (
                                                <button onClick={() => handleAction(r.id, 'fine_paid')} className="text-[12px] font-semibold text-green-600 hover:text-green-800 transition">
                                                    ชำระค่าปรับแล้ว
                                                </button>
                                            )}
                                            {(r.status === "returned" || r.status === "rejected" || r.status === "fine_paid") && (
                                                <span className="text-slate-300">-</span>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="py-8 text-center text-slate-400 text-sm">ไม่พบข้อมูลคำขอ</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
