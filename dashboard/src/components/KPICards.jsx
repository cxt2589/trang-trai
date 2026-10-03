import React from "react";
import { DollarSign, TrendingUp, Landmark, ShieldCheck, ArrowUpRight, Layers, Coins } from "lucide-react";
import { formatCurrencyVND, formatPercent } from "../utils/calculator";

export function KPICards({ data }) {
  const isPositiveCash = data.cashProfit >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Vốn Đầu Tư Ban Đầu */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Vốn Đầu Tư Ban Đầu
          </span>
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <Landmark className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-1">
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {formatCurrencyVND(data.totalCapital, 1)}
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            Đã gồm CAPEX thiết bị & thức ăn 100 ngày
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Hạ tầng: <strong>{data.capex} tr</strong></span>
          <span>•</span>
          <span>Giống: <strong>{data.totalSeedCost.toFixed(1)} tr</strong></span>
          <span>•</span>
          <span>Thức ăn: <strong>{data.feedCost.toFixed(1)} tr</strong></span>
        </div>
      </div>

      {/* Card 2: Doanh Thu Bán Tết */}
      <div className="bg-gradient-to-br from-emerald-50/60 to-white rounded-2xl p-5 border border-emerald-200/90 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-emerald-700 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Doanh Thu Thu Về Tết
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Coins className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-1">
          <div className="text-3xl font-black text-emerald-700 tracking-tight">
            {formatCurrencyVND(data.totalRevenue, 1)}
          </div>
          <span className="text-xs text-emerald-800/80 block mt-1 font-medium">
            Xuất bán ngày 15 - 28 Chạp
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900">
          <span>Gà 3T: <strong>{formatCurrencyVND(data.chickenRevenue, 1)}</strong> ({data.chickenSold} con)</span>
          <span>•</span>
          <span>Lợn: <strong>{formatCurrencyVND(data.pigRevenue, 1)}</strong> ({data.pigsCount} con)</span>
        </div>
      </div>

      {/* Card 3: Lãi Ròng Dòng Tiền Mặt (Cash Profit) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Lãi Dòng Tiền Mặt
          </span>
          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
            Cầm về ngày 28 Tết
          </span>
        </div>

        <div className="mt-1">
          <div
            className={`text-3xl font-black tracking-tight ${
              isPositiveCash ? "text-blue-700" : "text-amber-600"
            }`}
          >
            {isPositiveCash ? `+${formatCurrencyVND(data.cashProfit, 1)}` : `${formatCurrencyVND(data.cashProfit, 1)}`}
          </div>
          <span className="text-xs text-slate-500 block mt-1">
            = Doanh thu ({formatCurrencyVND(data.totalRevenue, 1)}) - Vốn ({formatCurrencyVND(data.totalCapital, 1)})
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Tỷ lệ thu hồi tiền mặt:</span>
          <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
            {formatPercent(data.cashRecoveryRate, 1)}
          </span>
        </div>
      </div>

      {/* Card 4: LỢI NHUẬN RÒNG KINH TẾ (Net Economic Profit & ROI) */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-5 border-2 border-emerald-400/40 shadow-xl shadow-emerald-950/20 relative overflow-hidden transition-all hover:scale-[1.01]">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-400/20 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between text-emerald-200 mb-2 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Lợi Nhuận Ròng Kinh Tế
          </span>
          <div className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3 stroke-[3]" />
            ROI {formatPercent(data.roi, 1)}
          </div>
        </div>

        <div className="mt-1 relative z-10">
          <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight flex items-baseline gap-1">
            +{formatCurrencyVND(data.totalNetProfit, 1)}
          </div>
          <span className="text-xs text-emerald-100/90 block mt-1 font-medium">
            Gồm tiền mặt + {formatCurrencyVND(data.totalPostTetAssets, 1)} tài sản tích lũy
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-xs text-emerald-100 relative z-10">
          <span>Gà giò 1T: <strong>{formatCurrencyVND(data.chicken1mValue, 1)}</strong> ({data.chicken1mRemaining} con)</span>
          <span>•</span>
          <span>Thiết bị còn lại: <strong>{data.equipmentResidual} tr</strong></span>
        </div>
      </div>
    </div>
  );
}
