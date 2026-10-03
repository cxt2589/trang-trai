import React from "react";
import { X, BookOpen, Check, TrendingUp, HelpCircle, AlertCircle } from "lucide-react";

export function GlossaryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const terms = [
    {
      term: "Dòng Tiền Mặt Cầm Về (Cash Profit)",
      definition: "Số tiền mặt thực tế cầm tay sau khi xuất bán hết sản phẩm ngày Tết trừ đi toàn bộ tổng vốn đầu tư ban đầu.",
      formula: "Dòng tiền mặt = Tổng doanh thu bán Tết - Tổng vốn đầu tư",
      note: "Nếu chỉ số này dương (ví dụ: +17 tr ở gói 130M), bạn đã hoàn trả 100% gốc đầu tư và rút được tiền mặt về túi ngay trước giao thừa."
    },
    {
      term: "Lợi Nhuận Ròng Kinh Tế (Net Economic Profit)",
      definition: "Tổng mức gia tăng tài sản thực tế của bạn sau chu kỳ 100 ngày, bao gồm cả tiền mặt và toàn bộ tài sản hiện vật còn lại tại trang trại.",
      formula: "Lợi nhuận ròng = Dòng tiền mặt thuần + Giá trị tài sản sau Tết",
      note: "Đây là thước đo chuẩn xác nhất hiệu quả đầu tư vì sau Tết bạn không hề trắng tay mà còn nguyên vẹn đàn gà giò và toàn bộ hệ thống máy móc, đường ống nước."
    },
    {
      term: "Tài Sản Tích Lũy Sau Tết (Post-Tet Asset Equity)",
      definition: "Giá trị của các tài sản còn nguyên vẹn sau khi bán đợt Tết.",
      formula: "Tài sản sau Tết = (Số gà 1T × 95% × 130.000đ) + 32.000.000đ (80% giá trị thiết bị)",
      note: "Đàn gà 1 tháng tuổi sau 100 ngày đã lớn thành gà giò 4.5 tháng, có giá trị thị trường cao hơn nhiều lần so với lúc mua giống."
    },
    {
      term: "CAPEX (Chi Phí Cố Định Ban Đầu)",
      definition: "Khoản đầu tư vào cơ sở vật chất dùng lâu dài: 2 điều hòa, máy bơm nước công suất lớn, 2km đường ống PE phi 25, máy cắt cỏ, bạt chắn gió.",
      formula: "Dự toán chuẩn: ~40 Triệu VNĐ",
      note: "Không bao gồm chi phí sắt hộp hay gỗ vì toàn bộ chuồng trại làm bằng tre nứa khai thác trực tiếp tại chỗ."
    },
    {
      term: "Tỷ Suất Hoàn Vốn ROI (%)",
      definition: "Tỷ lệ sinh lời trên mỗi đồng vốn đầu tư ban đầu.",
      formula: "ROI = (Lợi nhuận ròng kinh tế / Tổng vốn ban đầu) × 100%",
      note: "Gói 100M: ROI 44.4% • Gói 130M: ROI 66.1% • Gói 170M: ROI 82.5%."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Giải Thích Thuật Ngữ & Công Thức Tài Chính</h3>
              <p className="text-xs text-slate-500">Cơ chế xác định lợi nhuận và phương pháp định giá nông nghiệp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {terms.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {item.term}
              </div>
              <p className="text-slate-700">{item.definition}</p>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 font-mono text-xs">
                📐 {item.formula}
              </div>
              <p className="text-[11px] text-slate-500 italic">💡 {item.note}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            Đã Hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
