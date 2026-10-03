import React, { useState } from "react";
import { Route, Calendar, CheckCircle, AlertTriangle, Sparkles, Clock } from "lucide-react";
import { ROADMAP_STEPS } from "../data/farmData";

export function OperationalRoadmap() {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <Route className="w-5 h-5" />
            </div>
            Lộ Trình Triển Khai Thần Tốc (3 Tháng - 100 Ngày)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Kế hoạch hành động tuần tự theo từng mốc thời gian từ dọn cỏ đến thu tiền mặt cận Tết
          </p>
        </div>

        <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-2.5 py-1 rounded-full self-start sm:self-auto flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> 5 Giai Đoạn Then Chốt
        </span>
      </div>

      {/* Timeline Steps Header Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ROADMAP_STEPS.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/20"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-bold ${isSelected ? "text-emerald-200" : "text-slate-400"}`}>
                  {step.week}
                </span>
                <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-amber-400" : "bg-slate-300"}`} />
              </div>
              <div className={`text-xs font-bold line-clamp-1 ${isSelected ? "text-white" : "text-slate-800"}`}>
                {step.phase}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detailed View Card */}
      {ROADMAP_STEPS[selectedStepIndex] && (
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-emerald-600/30 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-emerald-700 text-white px-2.5 py-0.5 rounded-full">
                  {ROADMAP_STEPS[selectedStepIndex].week}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {ROADMAP_STEPS[selectedStepIndex].title}
                </h4>
              </div>
              <span className="text-xs text-slate-500 mt-0.5 block">
                Phân kỳ: {ROADMAP_STEPS[selectedStepIndex].phase}
              </span>
            </div>

            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border self-start sm:self-auto ${ROADMAP_STEPS[selectedStepIndex].tagColor}`}>
              {ROADMAP_STEPS[selectedStepIndex].tag}
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nhiệm Vụ Thực Chiến Bắt Buộc Hoàn Thành:
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {ROADMAP_STEPS[selectedStepIndex].highlights.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Alert / Pro Tip Box */}
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Lưu ý kỹ thuật & quản trị rủi ro:</strong> {ROADMAP_STEPS[selectedStepIndex].riskTip}
            </div>
          </div>
        </div>
      )}

      {/* Timeline Quick Overview All Steps */}
      <div className="pt-2 border-t border-slate-100">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Toàn Cảnh Tiến Trình 100 Ngày:
        </h5>
        <div className="space-y-3 border-l-2 border-emerald-300 ml-3 pl-4">
          {ROADMAP_STEPS.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedStepIndex(idx)}
              className="cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full -ml-[23px] border-2 border-white transition-all ${
                  selectedStepIndex === idx ? "bg-emerald-600 ring-4 ring-emerald-200" : "bg-slate-400 group-hover:bg-emerald-500"
                }`} />
                <span className="text-xs font-bold text-emerald-800">{step.week}:</span>
                <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition">
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
