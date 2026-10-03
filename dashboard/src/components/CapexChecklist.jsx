import React, { useState } from "react";
import { Wrench, CheckSquare, Square, Info, Sparkles } from "lucide-react";
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 sm:p-5 space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1 bg-emerald-100 rounded-md text-emerald-800">
              <Wrench className="w-4 h-4" />
            </div>
            Checklist Nghiệm Thu Hạ Tầng Ban Đầu (~40 Triệu)
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Hạng mục cơ sở vật chất bắt buộc hoàn tất trong tuần đầu tiên
          </p>
        </div>

        <div className="text-left sm:text-right text-xs">
          <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
            {completedCount}/{items.length} hạng mục ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-emerald-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 touch-manipulation ${
              item.completed
                ? "bg-slate-50/70 border-slate-200"
                : "bg-white border-amber-200 shadow-sm"
            }`}
          >
            <button className="mt-0.5 text-emerald-700 flex-shrink-0 cursor-pointer">
              {item.completed ? (
                <CheckSquare className="w-4 h-4 text-emerald-600" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className={`text-xs font-bold leading-tight ${item.completed ? "text-slate-800" : "text-slate-900"}`}>
                  {item.name}
                </span>
                <span className="text-xs font-black text-emerald-700 whitespace-nowrap bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {formatCurrencyVND(item.cost, 1)}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                {item.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Lợi thế tre nứa:</strong> Chuồng gà làm bằng tre nứa tại chỗ, tiết kiệm 100% tiền mua sắt hộp/gỗ công nghiệp.
        </span>
      </div>
    </div>
  );
}
