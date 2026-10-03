import React, { useState } from "react";
import { Route, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { ROADMAP_STEPS } from "../data/farmData";

export function OperationalRoadmap() {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            4. Lộ Trình Triển Khai Thần Tốc (3 Tháng - 100 Ngày)
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Kế hoạch hành động tuần tự theo mốc thời gian từ dọn cỏ đến thu tiền mặt cận Tết
          </p>
        </div>

        <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-1 rounded-full self-start sm:self-auto flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> 5 Giai Đoạn Then Chốt
        </span>
      </div>

      {/* Timeline Steps Header Pills - Mobile Horizontal Scroll/Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
        {ROADMAP_STEPS.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer touch-manipulation ${
                isSelected
                  ? "bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/20"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-[10px] font-black ${isSelected ? "text-emerald-200" : "text-slate-400"}`}>
                  {step.week}
                </span>
                <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-amber-400" : "bg-slate-300"}`} />
              </div>
              <div className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-slate-800"}`}>
                {step.phase}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detailed View Card */}
      {ROADMAP_STEPS[selectedStepIndex] && (
        <div className="bg-gradient-to-br from-slate-50/80 to-white rounded-xl border border-emerald-600/30 p-4 sm:p-5 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-200/80 pb-2.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black bg-emerald-700 text-white px-2 py-0.5 rounded-full">
                  {ROADMAP_STEPS[selectedStepIndex].week}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {ROADMAP_STEPS[selectedStepIndex].title}
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Phân kỳ: {ROADMAP_STEPS[selectedStepIndex].phase}
              </span>
            </div>

            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border self-start sm:self-auto ${ROADMAP_STEPS[selectedStepIndex].tagColor}`}>
              {ROADMAP_STEPS[selectedStepIndex].tag}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Nhiệm Vụ Thực Chiến Bắt Buộc:
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {ROADMAP_STEPS[selectedStepIndex].highlights.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Alert / Pro Tip Box */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-2.5 sm:p-3 text-[11px] sm:text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Lưu ý kỹ thuật:</strong> {ROADMAP_STEPS[selectedStepIndex].riskTip}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
