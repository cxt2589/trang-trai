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

export function FinancialCharts({ currentData, chickenPrice, pigPrice, feedSavingRate, chickenSurvRate }) {
  const [activeTab, setActiveTab] = useState("flow");

  const flowData = [
    { name: "Vốn đầu tư", amount: Number(currentData.totalCapital.toFixed(1)), fill: "#475569" },
    { name: "Doanh thu", amount: Number(currentData.totalRevenue.toFixed(1)), fill: "#10b981" },
    {
      name: "Lãi tiền mặt",
      amount: Number(currentData.cashProfit.toFixed(1)),
      fill: currentData.cashProfit >= 0 ? "#2563eb" : "#d97706"
    },
    { name: "Tài sản sau Tết", amount: Number(currentData.totalPostTetAssets.toFixed(1)), fill: "#8b5cf6" },
    { name: "LỢI NHUẬN", amount: Number(currentData.totalNetProfit.toFixed(1)), fill: "#047857" }
  ];

  const costData = [
    { name: "Hạ tầng", value: Number(currentData.capex.toFixed(1)), color: "#047857" },
    { name: "Gà 3T", value: Number(currentData.chicken3mCost.toFixed(1)), color: "#10b981" },
    { name: "Gà 1T (12k)", value: Number(currentData.chicken1mCost.toFixed(1)), color: "#38bdf8" },
    { name: "Lợn giống", value: Number(currentData.pigCost.toFixed(1)), color: "#f59e0b" },
    { name: "Thức ăn & thú y", value: Number(currentData.feedCost.toFixed(1)), color: "#64748b" }
  ];

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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 sm:p-5 space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1 bg-emerald-100 rounded-md text-emerald-800">
              <BarChart3 className="w-4 h-4" />
            </div>
            Đồ Thị Phân Tích Tài Chính
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Trực quan hóa cấu trúc vốn, dòng tiền và so sánh 3 kịch bản
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-2 py-1 rounded transition cursor-pointer font-semibold ${
              activeTab === "flow" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600"
            }`}
          >
            Dòng tiền
          </button>
          <button
            onClick={() => setActiveTab("costs")}
            className={`px-2 py-1 rounded transition cursor-pointer font-semibold ${
              activeTab === "costs" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600"
            }`}
          >
            Cơ cấu
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-2 py-1 rounded transition cursor-pointer font-semibold ${
              activeTab === "comparison" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600"
            }`}
          >
            So sánh
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72 pt-1">
        {activeTab === "flow" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={flowData} margin={{ top: 10, right: 10, left: -20, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569" }} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `${val} tr`} />
              <Tooltip
                formatter={(val) => [`${val} Triệu VNĐ`, "Giá trị"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
              />
              <Bar dataKey="amount" radius={[5, 5, 0, 0]}>
                {flowData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === "costs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 h-full items-center gap-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-cost-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val} Triệu VNĐ`, "Chi phí"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-1 text-xs">
              {costData.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">
                    {item.value} tr <span className="text-slate-400 font-normal">({((item.value / currentData.totalCapital) * 100).toFixed(0)}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "comparison" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `${val} tr`} />
              <Tooltip
                formatter={(val, name) => [`${val} Triệu VNĐ`, name]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "5px" }} />
              <Bar dataKey="Vốn đầu tư" fill="#64748b" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Doanh thu Tết" fill="#10b981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Lợi nhuận ròng" fill="#047857" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
