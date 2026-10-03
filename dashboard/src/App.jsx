import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Header } from "./components/Header";
import { ScenarioSelector } from "./components/ScenarioSelector";
import { KPICards } from "./components/KPICards";
import { PLReport } from "./components/PLReport";
import { OperationalRoadmap } from "./components/OperationalRoadmap";
import { ProfitSimulator } from "./components/ProfitSimulator";
import { FinancialCharts } from "./components/FinancialCharts";
import { CapexChecklist } from "./components/CapexChecklist";
import { ExecutiveSummary } from "./components/ExecutiveSummary";
import { GlossaryModal } from "./components/GlossaryModal";
import { Footer } from "./components/Footer";
import { LivingCostTab } from "./components/LivingCostTab";
import { ActionPlanTab } from "./components/ActionPlanTab";
import { PRESET_SCENARIOS } from "./data/farmData";
import { calculateFinancials } from "./utils/calculator";

export default function App() {
  const [activeTab, setActiveTab] = useState("financial"); // "financial", "action_plan", "living_cost"
  const [scenarioId, setScenarioId] = useState(130);
  const [chickenPrice, setChickenPrice] = useState(200000);
  const [pigPrice, setPigPrice] = useState(130000);
  const [feedSavingRate, setFeedSavingRate] = useState(0.40);
  const [chickenSurvRate, setChickenSurvRate] = useState(0.95);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const currentScenario = PRESET_SCENARIOS[scenarioId] || PRESET_SCENARIOS[130];

  const isCustomized =
    chickenPrice !== 200000 ||
    pigPrice !== 130000 ||
    feedSavingRate !== 0.40 ||
    chickenSurvRate !== 0.95;

  const data = calculateFinancials({
    scenario: currentScenario,
    chickenPrice,
    pigPrice,
    feedSavingRate,
    chickenSurvRate
  });

  const handleSelectScenario = (id) => {
    setScenarioId(id);
    if (id === 170) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleResetDefaults = () => {
    setChickenPrice(200000);
    setPigPrice(130000);
    setFeedSavingRate(0.40);
    setChickenSurvRate(0.95);
  };

  const handleFullReset = () => {
    setScenarioId(130);
    handleResetDefaults();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        onReset={handleFullReset}
        onPrint={handlePrint}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Main Navigation Tabs - Sticky On Top When Scrolling */}
      <nav aria-label="Chuyển đổi phân hệ" className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 overflow-x-auto py-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Tab 1 */}
            <button
              onClick={() => setActiveTab("financial")}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "financial"
                  ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === "financial" ? "bg-emerald-300 animate-pulse" : "bg-slate-400"}`}></span>
              <span>1. Kế Hoạch Đầu Tư & P&L</span>
            </button>

            {/* Tab 2: Action Plan */}
            <button
              onClick={() => setActiveTab("action_plan")}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "action_plan"
                  ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === "action_plan" ? "bg-blue-300 animate-pulse" : "bg-slate-400"}`}></span>
              <span>2. Kế Hoạch Hành Động (Từng Ngày/Tuần)</span>
              <span className="bg-blue-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full ml-0.5">
                Chi tiết
              </span>
            </button>

            {/* Tab 3: Living Cost */}
            <button
              onClick={() => setActiveTab("living_cost")}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "living_cost"
                  ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === "living_cost" ? "bg-amber-300 animate-pulse" : "bg-slate-400"}`}></span>
              <span>3. Bếp Ăn & Trực Tết (Tự Cấp)</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full ml-0.5">
                Tiết kiệm ~15M
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center text-xs text-slate-400 font-medium">
            <span>
              {activeTab === "financial"
                ? "Gói " + scenarioId + "M"
                : activeTab === "action_plan"
                ? "5 Giai đoạn • 14 Ngày vàng"
                : "4–5 Người • 100 ngày"}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 space-y-4 sm:space-y-6">
        {activeTab === "financial" && (
          <>
            {/* Ưu tiên 1: Chọn Kịch Bản Vốn Ban Đầu */}
            <ScenarioSelector
              currentScenarioId={scenarioId}
              onSelectScenario={handleSelectScenario}
              isCustomized={isCustomized}
              onResetCustom={handleResetDefaults}
            />

            {/* Ưu tiên 2: Với kịch bản vốn đó thì lợi nhuận thế nào */}
            <KPICards data={data} />

            {/* Ưu tiên 3: Với vốn đó thì chi phí cho từng hạng mục như thế nào */}
            <PLReport
              data={data}
              onOpenLivingCostTab={() => setActiveTab("living_cost")}
            />

            {/* Ưu tiên 4: Lộ trình triển khai */}
            <OperationalRoadmap
              onOpenActionPlanTab={() => setActiveTab("action_plan")}
            />

            {/* Ưu tiên 5: Mô phỏng và phân tích biểu đồ (đặt phía dưới) */}
            <section className="space-y-3 pt-2">
              <div className="border-t border-slate-200/80 pt-4 px-1">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  5. Công Cụ Mô Phỏng Nhạy Cảm & Đồ Thị Phân Tích
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Kéo thanh trượt để thử nghiệm kịch bản giá bán biến động và đối chiếu cơ cấu chi phí
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <ProfitSimulator
                  chickenPrice={chickenPrice}
                  onChickenPriceChange={setChickenPrice}
                  pigPrice={pigPrice}
                  onPigPriceChange={setPigPrice}
                  feedSavingRate={feedSavingRate}
                  onFeedSavingRateChange={setFeedSavingRate}
                  chickenSurvRate={chickenSurvRate}
                  onChickenSurvRateChange={setChickenSurvRate}
                  onResetDefaults={handleResetDefaults}
                  data={data}
                  basePreset={currentScenario}
                />

                <FinancialCharts
                  currentData={data}
                  chickenPrice={chickenPrice}
                  pigPrice={pigPrice}
                  feedSavingRate={feedSavingRate}
                  chickenSurvRate={chickenSurvRate}
                />
              </div>
            </section>

            {/* Thông tin bổ sung: Checklist 40M & Chiến lược điều hành */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start pt-2">
              <CapexChecklist />
              <ExecutiveSummary />
            </section>
          </>
        )}

        {/* Tab 2: Kế hoạch hành động chi tiết */}
        {activeTab === "action_plan" && (
          <ActionPlanTab
            onSwitchToFinancialTab={() => setActiveTab("financial")}
            onSwitchToLivingCostTab={() => setActiveTab("living_cost")}
          />
        )}

        {/* Tab 3: Bếp ăn, sinh hoạt & Lương trực Tết */}
        {activeTab === "living_cost" && (
          <LivingCostTab
            onSwitchToFinancialTab={() => setActiveTab("financial")}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Glossary & Terms Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}
