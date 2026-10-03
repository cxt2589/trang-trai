import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { BarChart3, PieChart as PieIcon, Layers, TrendingUp } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/farmData";
import { calculateFinancials, formatCurrencyVND } from "../utils/calculator";

const COLORS = ["#047857", "#10b981", "#3b82f6", "#f59e0b", "#64748b"];

export function FinancialCharts({ currentData, chickenPrice, pigPrice, feedSavingRate, chickenSurvRate }) {
  const [activeTab, setActiveTab] = useState("flow"); // "flow" | "costs" | "comparison"

  // 1. Dữ liệu dòng tài chính hiện tại
  const flowData = [
    { name: "Vốn ban đầu", amount: Number(currentData.totalCapital.toFixed(1)), fill: "#475569" },
    { name: "Doanh thu Tết", amount: Number(currentData.totalRevenue.toFixed(1)), fill: "#10b981" },
    {
      name: "Lãi tiền mặt",
      amount: Number(currentData.cashProfit.toFixed(1)),
      fill: currentData.cashProfit >= 0 ? "#2563eb" : "#d97706"
    },
    { name: "Tài sản sau Tết", amount: Number(currentData.totalPostTetAssets.toFixed(1)), fill: "#8b5cf6" },
    { name: "LỢI NHUẬN RÒNG", amount: Number(currentData.totalNetProfit.toFixed(1)), fill: "#047857" }
  ];

  // 2. Dữ liệu cơ cấu chi phí (Donut)
  const costData = [
    { name: "CAPEX Hạ tầng", value: Number(currentData.capex.toFixed(1)), color: "#047857" },
    { name: "Giống gà 3T", value: Number(currentData.chicken3mCost.toFixed(1)), color: "#10b981" },
    { name: "Giống gà 1T", value: Number(currentData.chicken1mCost.toFixed(1)), color: "#38bdf8" },
    { name: "Giống lợn nhỡ", value: Number(currentData.pigCost.toFixed(1)), color: "#f59e0b" },
    { name: "Thức ăn & Thú y", value: Number(currentData.feedCost.toFixed(1)), color: "#64748b" }
  ];

  // 3. So sánh 3 kịch bản vốn 100M - 130M - 170M
  const comparisonData = Object.values(PRESET_SCENARIOS).map((preset) => {
    const calc = calculateFinancials({
      scenario: preset,
      chickenPrice,
      pigPrice,
      feedSavingRate,
      chickenSurvRate
    });
    return {
      name: preset.name,
      "Vốn đầu tư": Number(calc.totalCapital.toFixed(1)),
      "Doanh thu Tết": Number(calc.totalRevenue.toFixed(1)),
      "Lợi nhuận ròng": Number(calc.totalNetProfit.toFixed(1))
    };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-4">
      {/* Header and View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <BarChart3 className="w-5 h-5" />
            </div>
            Phân Tích Đồ Thị Tài Chính & Dòng Tiền
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Trực quan hóa cấu trúc chi phí, tỷ trọng dòng tiền và so sánh giữa các gói đầu tư
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              activeTab === "flow"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Dòng tiền & Lãi
          </button>
          <button
            onClick={() => setActiveTab("costs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              activeTab === "costs"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            Cơ cấu chi phí
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
              activeTab === "comparison"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            So sánh 3 gói
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="w-full h-72 sm:h-80 pt-2">
        {activeTab === "flow" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={flowData} margin={{ top: 15, right: 15, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} interval={0} />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(val) => `${val} tr`}
              />
              <Tooltip
                formatter={(val) => [`${val} Triệu VNĐ`, "Giá trị"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {flowData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === "costs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-cost-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val} Triệu VNĐ`, "Chi phí"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-700 pb-1 border-b border-slate-100">
                Tổng chi phí đầu tư: <span className="text-emerald-700 font-bold">{formatCurrencyVND(currentData.totalCapital, 1)}</span>
              </div>
              {costData.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {formatCurrencyVND(item.value, 1)}
                    <span className="text-slate-400 font-normal ml-1">
                      ({((item.value / currentData.totalCapital) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "comparison" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 15, right: 15, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickFormatter={(val) => `${val} tr`} />
              <Tooltip
                formatter={(val, name) => [`${val} Triệu VNĐ`, name]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Bar dataKey="Vốn đầu tư" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Doanh thu Tết" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Lợi nhuận ròng" fill="#047857" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="text-[11px] text-slate-400 italic pt-1 text-center sm:text-left">
        * Lợi nhuận ròng = Dòng tiền mặt thuần + Giá trị đàn gà gối đầu (4.5 tháng) + Giá trị hạ tầng còn lại (32M sau khấu hao vụ 1).
      </div>
    </div>
  );
}
