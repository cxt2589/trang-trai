import React, { useState } from "react";
import confetti from "canvas-confetti";
import { DollarSign, Calendar, Utensils, Layers, Users } from "lucide-react";
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
import { CashFlow12MTab } from "./components/CashFlow12MTab";
import { EquityGovernanceSection } from "./components/EquityGovernanceSection";
import { PRESET_SCENARIOS } from "./data/farmData";
import { calculateFinancials } from "./utils/calculator";

export default function App() {
  const [activeTab, setActiveTab] = useState("financial"); // "financial", "action_plan", "living_cost", "cash_flow_12m", "equity_governance"
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

      {/* Main Navigation Tabs - Segmented Control 5 Cột Vừa Khít Mọi Màn Hình */}
      <nav aria-label="Chuyển đổi phân hệ" className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-1.5 sm:px-6 lg:px-8 py-1.5 sm:py-2">
          <div className="grid grid-cols-5 gap-1 sm:gap-2 bg-slate-100/90 p-1 rounded-xl sm:rounded-2xl border border-slate-200/80">
            {/* Tab 1: Vốn & P&L Vụ Tết */}
            <button
              onClick={() => setActiveTab("financial")}
              className={`py-1.5 sm:py-2 px-0.5 sm:px-2 rounded-lg sm:rounded-xl text-center transition flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 cursor-pointer select-none ${
                activeTab === "financial"
                  ? "bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
              }`}
            >
              <DollarSign className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${activeTab === "financial" ? "text-emerald-600" : "text-slate-400"}`} />
              <div className="leading-tight">
                <span className="block sm:hidden text-[9px]">1. P&L</span>
                <span className="hidden sm:inline text-xs sm:text-sm">1. Vốn & P&L</span>
              </div>
            </button>

            {/* Tab 2: Kế hoạch tác chiến */}
            <button
              onClick={() => setActiveTab("action_plan")}
              className={`py-1.5 sm:py-2 px-0.5 sm:px-2 rounded-lg sm:rounded-xl text-center transition flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 cursor-pointer select-none ${
                activeTab === "action_plan"
                  ? "bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${activeTab === "action_plan" ? "text-blue-600" : "text-slate-400"}`} />
              <div className="leading-tight">
                <span className="block sm:hidden text-[9px]">2. Tuần</span>
                <span className="hidden sm:inline text-xs sm:text-sm">2. Kế Hoạch Tuần</span>
              </div>
            </button>

            {/* Tab 3: Bếp ăn & Trực Tết */}
            <button
              onClick={() => setActiveTab("living_cost")}
              className={`py-1.5 sm:py-2 px-0.5 sm:px-2 rounded-lg sm:rounded-xl text-center transition flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 cursor-pointer select-none ${
                activeTab === "living_cost"
                  ? "bg-white text-amber-800 shadow-xs ring-1 ring-amber-500/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
              }`}
            >
              <Utensils className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${activeTab === "living_cost" ? "text-amber-600" : "text-slate-400"}`} />
              <div className="leading-tight">
                <span className="block sm:hidden text-[9px]">3. Bếp Ăn</span>
                <span className="hidden sm:inline text-xs sm:text-sm">3. Bếp & Trực Tết</span>
              </div>
            </button>

            {/* Tab 4: Dòng tiền 12 tháng */}
            <button
              onClick={() => setActiveTab("cash_flow_12m")}
              className={`py-1.5 sm:py-2 px-0.5 sm:px-2 rounded-lg sm:rounded-xl text-center transition flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 cursor-pointer select-none relative ${
                activeTab === "cash_flow_12m"
                  ? "bg-white text-indigo-800 shadow-xs ring-1 ring-indigo-500/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
              }`}
            >
              <Layers className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${activeTab === "cash_flow_12m" ? "text-indigo-600" : "text-slate-400"}`} />
              <div className="leading-tight flex items-center justify-center gap-1">
                <span className="block sm:hidden text-[9px]">4. Dòng Tiền</span>
                <span className="hidden sm:inline text-xs sm:text-sm">4. Dòng Tiền 12T</span>
                <span className="hidden xl:inline bg-indigo-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  2.0ha
                </span>
              </div>
            </button>

            {/* Tab 5: Cổ phần & Quản trị 3 bên */}
            <button
              onClick={() => setActiveTab("equity_governance")}
              className={`py-1.5 sm:py-2 px-0.5 sm:px-2 rounded-lg sm:rounded-xl text-center transition flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 cursor-pointer select-none relative ${
                activeTab === "equity_governance"
                  ? "bg-white text-purple-800 shadow-xs ring-1 ring-purple-500/30 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
              }`}
            >
              <Users className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${activeTab === "equity_governance" ? "text-purple-600" : "text-slate-400"}`} />
              <div className="leading-tight flex items-center justify-center gap-1">
                <span className="block sm:hidden text-[9px]">5. Cổ Phần</span>
                <span className="hidden sm:inline text-xs sm:text-sm">5. Cổ Phần & Quản Trị</span>
                <span className="hidden xl:inline bg-purple-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  T-TA-H
                </span>
              </div>
            </button>
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

        {/* Tab 4: Dòng tiền 12 tháng & Mô phỏng nợ vay 2.0 ha */}
        {activeTab === "cash_flow_12m" && (
          <CashFlow12MTab
            selectedCapital={scenarioId}
            onSelectCapital={handleSelectScenario}
            onSwitchToFinancialTab={() => setActiveTab("financial")}
            onSwitchToActionPlanTab={() => setActiveTab("action_plan")}
            onSwitchToEquityTab={() => setActiveTab("equity_governance")}
          />
        )}

        {/* Tab 5: Cơ cấu cổ phần & Quản trị 3 bên (T, TA, H) */}
        {activeTab === "equity_governance" && (
          <EquityGovernanceSection
            onSwitchToCashFlowTab={() => setActiveTab("cash_flow_12m")}
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
