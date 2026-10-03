import React from "react";
import { Wallet, Check, Sparkles, AlertCircle } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/farmData";

export function ScenarioSelector({ currentScenarioId, onSelectScenario, isCustomized, onResetCustom }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 transition-all hover:shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                Chọn Kịch Bản Vốn Ban Đầu
                {isCustomized && (
                  <span className="text-xs bg-amber-100 text-amber-800 border border-amber-300 font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Đang điều chỉnh giả lập
                  </span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Lựa chọn quy mô vốn để xem ngay cơ cấu đàn nuôi, dòng tiền thu hồi và lợi nhuận kinh tế vụ Tết
              </p>
            </div>
          </div>
        </div>

        {isCustomized && (
          <button
            onClick={onResetCustom}
            className="self-start lg:self-auto text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer"
          >
            Quay lại thông số mặc định của gói
          </button>
        )}
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {Object.values(PRESET_SCENARIOS).map((preset) => {
          const isSelected = currentScenarioId === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectScenario(preset.id)}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20"
                  : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60"
              }`}
            >
              {/* Highlight ribbon if 130M */}
              {preset.id === 130 && (
                <div className="absolute -top-3 right-3">
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Khuyên Dùng
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Kịch bản đầu tư
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-slate-900">{preset.capital}</span>
                    <span className="text-sm font-bold text-slate-600">Triệu VNĐ</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                    isSelected
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Quy mô đàn:</span>
                  <span className="font-semibold text-slate-800">
                    {preset.chicken3mCount} gà 3T • {preset.pigsCount} lợn
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Gà gối đầu (1T):</span>
                  <span className="font-semibold text-amber-700">{preset.chicken1mCount} con</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Hạ tầng thiết bị:</span>
                  <span className="font-semibold text-slate-800">{preset.capex} tr</span>
                </div>
              </div>

              <p className="mt-2.5 text-[11px] text-slate-500 italic line-clamp-1">
                {preset.tagline}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
