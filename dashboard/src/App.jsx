import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Header } from "./components/Header";
import { ScenarioSelector } from "./components/ScenarioSelector";
import { KPICards } from "./components/KPICards";
import { FinancialCharts } from "./components/FinancialCharts";
import { ProfitSimulator } from "./components/ProfitSimulator";
import { PLReport } from "./components/PLReport";
import { OperationalRoadmap } from "./components/OperationalRoadmap";
import { CapexChecklist } from "./components/CapexChecklist";
import { ExecutiveSummary } from "./components/ExecutiveSummary";
import { GlossaryModal } from "./components/GlossaryModal";
import { Footer } from "./components/Footer";
import { PRESET_SCENARIOS } from "./data/farmData";
import { calculateFinancials } from "./utils/calculator";

export default function App() {
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

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. Scenario Selector */}
        <ScenarioSelector
          currentScenarioId={scenarioId}
          onSelectScenario={handleSelectScenario}
          isCustomized={isCustomized}
          onResetCustom={handleResetDefaults}
        />

        {/* 2. Top Metric Cards (KPIs) */}
        <KPICards data={data} />

        {/* 3. Charts & Profit Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
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

        {/* 4. Financial P&L Statement Report */}
        <PLReport
          data={data}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
        />

        {/* 5. Operations: Roadmap & Capex Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <OperationalRoadmap />
          <CapexChecklist />
        </div>

        {/* 6. Executive Strategic Insights & Golden Ratio Explainer */}
        <ExecutiveSummary />
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
