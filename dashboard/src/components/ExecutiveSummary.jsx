import React from "react";
import { Lightbulb, CheckCircle2, TrendingUp, ShieldAlert, Award, Star } from "lucide-react";
import { EXECUTIVE_INSIGHTS } from "../data/farmData";

export function ExecutiveSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-5">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800">
            <Lightbulb className="w-5 h-5" />
          </div>
          Phân Tích Chiến Lược & Luận Điểm Đầu Tư
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Giải trình chuyên sâu dành cho nhà đầu tư và đội ngũ quản lý điều hành trang trại
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {EXECUTIVE_INSIGHTS.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border space-y-2.5 transition ${
              index === 0
                ? "bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-400/20"
                : "bg-slate-50/70 border-slate-200"
            }`}
          >
            <div className="flex items-start gap-2">
              {index === 0 ? (
                <Star className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              )}
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>

      {/* 3 Core Pillars of Risk Mitigation */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Award className="w-4 h-4" /> 3 Trụ Cột Đảm Bảo Thu Hồi Vốn Vụ Đầu
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong className="text-emerald-300 block mb-1">1. Đa dạng hóa nguồn thu:</strong>
            Không đặt cược toàn bộ vào gà; kết hợp lợn bản cắp nách tạo dòng tiền lớn dịp 25-28 Tết.
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong className="text-emerald-300 block mb-1">2. Cắt giảm 40% chi phí cám:</strong>
            Ủ chua thân chuối vườn và thóc ngâm mầm men vi sinh biến thức ăn tự nhiên thành đạm cao cấp.
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong className="text-emerald-300 block mb-1">3. Giữ trọn đàn gà gối đầu:</strong>
            Đàn 1T trở thành tấm lá chắn tài sản vững chắc, tạo doanh thu gối sóng ngay Rằm tháng Giêng.
          </div>
        </div>
      </div>
    </div>
  );
}
