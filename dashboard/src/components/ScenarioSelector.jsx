import React from "react";
import { Wallet, Check, Sparkles, AlertCircle } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/farmData";

export function ScenarioSelector({ currentScenarioId, onSelectScenario, isCustomized, onResetCustom }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-3.5 sm:p-5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5 sm:mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5 flex-wrap">
                <span>1. Chọn Kịch Bản Vốn Ban Đầu</span>
                {isCustomized && (
                  <span className="text-[10px] sm:text-xs bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Tùy chỉnh
                  </span>
                )}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Nhấp chọn quy mô vốn để xem ngay lợi nhuận và chi phí tương ứng
              </p>
            </div>
          </div>
        </div>

        {isCustomized && (
          <button
            onClick={onResetCustom}
            className="self-start sm:self-auto text-[11px] sm:text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer"
          >
            Quay lại thông số gốc của gói
          </button>
        )}
      </div>

      {/* Preset Cards Grid - Fully Mobile Friendly */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        {Object.values(PRESET_SCENARIOS).map((preset) => {
          const isSelected = currentScenarioId === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectScenario(preset.id)}
              className={`relative cursor-pointer rounded-xl border-2 p-3 sm:p-4 transition-all touch-manipulation active:scale-[0.99] ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20"
                  : "border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-white"
              }`}
            >
              {/* Highlight ribbon for 130M */}
              {preset.id === 130 && (
                <div className="absolute -top-2.5 right-3">
                  <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Khuyên Dùng
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Gói đầu tư
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {preset.capital}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-600">Triệu VNĐ</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition flex-shrink-0 ${
                    isSelected
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Xuất bán Tết:</span>
                  <span className="font-bold text-slate-900">
                    {preset.chicken3mCount} gà 3T • {preset.pigsCount} lợn
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Gà gối đầu (1T @ 12k):</span>
                  <span className="font-bold text-amber-700">{preset.chicken1mCount} con</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Hạ tầng thiết bị:</span>
                  <span className="font-bold text-slate-900">{preset.capex} tr</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 truncate pr-1">{preset.tagline}</span>
                <span className={`px-1.5 py-0.2 rounded font-bold whitespace-nowrap text-[10px] ${
                  isSelected ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                }`}>
                  {preset.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
