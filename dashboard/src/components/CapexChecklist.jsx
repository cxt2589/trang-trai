import React, { useState } from "react";
import { Wrench, CheckSquare, Square, AlertCircle, Info, Sparkles } from "lucide-react";
import { INITIAL_CAPEX_ITEMS } from "../data/farmData";
import { formatCurrencyVND } from "../utils/calculator";

export function CapexChecklist() {
  const [items, setItems] = useState(INITIAL_CAPEX_ITEMS);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const totalCost = items.reduce((acc, curr) => acc + curr.cost, 0);
  const completedCost = items
    .filter((item) => item.completed)
    .reduce((acc, curr) => acc + curr.cost, 0);
  const completedCount = items.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <Wrench className="w-5 h-5" />
            </div>
            Checklist Danh Mục Hạ Tầng & Thiết Bị (~40 Triệu)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Hạng mục cơ sở vật chất bắt buộc nghiệm thu và hoàn thiện trong tuần đầu tiên
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500">Tiến độ mua sắm & lắp đặt</div>
          <div className="text-sm font-bold text-emerald-700">
            {completedCount}/{items.length} hạng mục ({progressPercent}%)
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Capex Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              item.completed
                ? "bg-slate-50/70 border-slate-200 hover:border-emerald-300"
                : "bg-white border-amber-200 shadow-sm"
            }`}
          >
            <button className="mt-0.5 text-emerald-700 flex-shrink-0 cursor-pointer">
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-600" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs sm:text-sm font-bold ${item.completed ? "text-slate-800" : "text-slate-900"}`}>
                  {item.name}
                </span>
                <span className="text-xs font-black text-emerald-700 whitespace-nowrap bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {formatCurrencyVND(item.cost, 1)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                {item.note}
              </p>
              <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Bamboo Architecture Note */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Đã giải ngân: <strong>{formatCurrencyVND(completedCost, 1)}</strong> / Dự toán: <strong>{formatCurrencyVND(totalCost, 1)}</strong>
          </span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Ưu điểm chi phí:</strong> Chuồng trại làm 100% bằng tre nứa tại chỗ, tiết kiệm hàng chục triệu chi phí vật tư sắt thép.
          </span>
        </div>
      </div>
    </div>
  );
}
