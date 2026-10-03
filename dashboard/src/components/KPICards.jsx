import React from "react";
import { TrendingUp, ShieldCheck, Coins, Sparkles, CheckCircle2 } from "lucide-react";
import { formatCurrencyVND, formatPercent } from "../utils/calculator";

export function KPICards({ data }) {
  const isPositiveCash = data.cashProfit >= 0;

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            2. Với Vốn {data.totalCapital.toFixed(0)} Triệu: Dự Kiến Lợi Nhuận Thế Nào?
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Minh bạch giữa số tiền mặt rút về ngày 28 Tết và tổng lợi nhuận kinh tế
          </p>
        </div>
      </div>

      {/* Main Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: LỢI NHUẬN RÒNG KINH TẾ (Crown Card - Primary Focus) */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-400/50 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between text-emerald-200 mb-1.5 relative z-10">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Lợi Nhuận Ròng Kinh Tế
              </span>
              <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full shadow flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 stroke-[3]" />
                ROI {formatPercent(data.roi, 1)}
              </span>
            </div>

            <div className="mt-1 relative z-10">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                +{formatCurrencyVND(data.totalNetProfit, 1)}
              </div>
              <span className="text-[11px] text-emerald-100/90 block mt-1 font-medium leading-relaxed">
                = Lãi tiền mặt ({formatCurrencyVND(data.cashProfit, 1)}) + {formatCurrencyVND(data.totalPostTetAssets, 1)} tài sản tồn
              </span>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-emerald-800/80 text-[11px] text-emerald-200 flex justify-between items-center relative z-10">
            <span>Biên lãi ròng: <strong>{formatPercent(data.netMargin, 1)}</strong></span>
            <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[10px] text-emerald-100 font-semibold">
              Toàn chu kỳ 100 ngày
            </span>
          </div>
        </div>

        {/* Card 2: LÃI DÒNG TIỀN MẶT (Cash Profit) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                Tiền Mặt Cầm Về 28 Tết
              </span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Dòng tiền tươi
              </span>
            </div>

            <div className="mt-1">
              <div
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isPositiveCash ? "text-blue-700" : "text-amber-600"
                }`}
              >
                {isPositiveCash ? `+${formatCurrencyVND(data.cashProfit, 1)}` : `${formatCurrencyVND(data.cashProfit, 1)}`}
              </div>
              <span className="text-[11px] text-slate-500 block mt-1 leading-relaxed">
                {isPositiveCash
                  ? "Đã hoàn trả 100% vốn gốc, dôi dư tiền mặt cầm tay"
                  : `Thu hồi ${formatPercent(data.cashRecoveryRate, 1)} vốn tiền mặt (còn lại nằm ở tài sản)`}
              </span>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between items-center">
            <span>Thu hồi vốn gốc:</span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              {formatPercent(data.cashRecoveryRate, 1)}
            </span>
          </div>
        </div>

        {/* Card 3: TỔNG DOANH THU THU VỀ TẾT */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-white rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-emerald-800 mb-1.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Doanh Thu Bán Tết
              </span>
              <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Coins className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-1">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                {formatCurrencyVND(data.totalRevenue, 1)}
              </div>
              <span className="text-[11px] text-emerald-800/80 block mt-1 font-medium leading-relaxed">
                Xuất bán đợt cao điểm 15 - 28 Tháng Chạp
              </span>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-emerald-200/60 text-[11px] text-emerald-900 flex justify-between items-center">
            <span>Gà: <strong>{formatCurrencyVND(data.chickenRevenue, 1)}</strong></span>
            <span>•</span>
            <span>Lợn: <strong>{formatCurrencyVND(data.pigRevenue, 1)}</strong></span>
          </div>
        </div>

        {/* Card 4: TÀI SẢN TỒN DƯ SAU TẾT */}
        <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-amber-900 mb-1.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Tài Sản Sau Tết Còn Lại
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                Gối đầu vụ sau
              </span>
            </div>

            <div className="mt-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-800 tracking-tight">
                +{formatCurrencyVND(data.totalPostTetAssets, 1)}
              </div>
              <span className="text-[11px] text-amber-900/80 block mt-1 font-medium leading-relaxed">
                Đàn gà giò 4.5 tháng + Thiết bị hạ tầng còn nguyên
              </span>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-amber-200/60 text-[11px] text-amber-950 flex justify-between items-center">
            <span>Gà giò: <strong>{data.chicken1mRemaining} con</strong></span>
            <span>•</span>
            <span>Thiết bị: <strong>{data.equipmentResidual} tr</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
