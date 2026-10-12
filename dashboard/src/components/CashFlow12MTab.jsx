import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  Users,
  Wheat,
  Download,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  HelpCircle
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { CAPITAL_PRESETS, FARM_MODULES_INFO } from "../data/cashFlow12mData";
import { calculate12MonthCashFlow } from "../utils/cashFlow12mEngine";

export function CashFlow12MTab({ onSwitchToFinancialTab, onSwitchToActionPlanTab }) {
  // State kịch bản vốn
  const [selectedCapitalPreset, setSelectedCapitalPreset] = useState(100);
  const [customEquity, setCustomEquity] = useState(100000000);
  const [isCustomCapital, setIsCustomCapital] = useState(false);

  // State năng suất nhân công (người dùng yêu cầu 2.000 vs 3.000 con/người)
  const [birdsPerWorker, setBirdsPerWorker] = useState(3000); // 3000 = công nghiệp, 2000 = truyền thống
  const [workerSalary, setWorkerSalary] = useState(7000000);

  // State các biến số thị trường (What-If sensitivity)
  const [sellingPrice, setSellingPrice] = useState(180000); // VNĐ/kg
  const [chickPrice, setChickPrice] = useState(14000); // VNĐ/con 1 ngày tuổi
  const [feedPrice, setFeedPrice] = useState(10000); // VNĐ/kg cám
  const [feedSavingRate, setFeedSavingRate] = useState(0.0); // 0% - 30%

  // Tab biểu đồ
  const [activeChartTab, setActiveChartTab] = useState("cash_flow"); // "cash_flow", "debt_waterfall", "flock_labor"

  // Đóng/mở các nhóm dòng trong bảng
  const [collapsedGroups, setCollapsedGroups] = useState({
    opex: false,
    capex: false,
    financing: false
  });

  const toggleGroup = (groupKey) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  // Xác định số vốn ban đầu đang áp dụng
  const effectiveInitialEquity = useMemo(() => {
    if (isCustomCapital) return customEquity;
    const preset = CAPITAL_PRESETS.find((p) => p.id === selectedCapitalPreset);
    return preset ? preset.equity : 100000000;
  }, [isCustomCapital, customEquity, selectedCapitalPreset]);

  // Chạy lõi tính toán tài chính 12 tháng (tối ưu hóa bằng useMemo)
  const financialData = useMemo(() => {
    return calculate12MonthCashFlow({
      initialEquity: effectiveInitialEquity,
      birdsPerWorker,
      workerSalary,
      sellingPrice,
      chickPrice,
      feedPrice,
      feedSavingRate,
      minCashReserve: 20000000
    });
  }, [
    effectiveInitialEquity,
    birdsPerWorker,
    workerSalary,
    sellingPrice,
    chickPrice,
    feedPrice,
    feedSavingRate
  ]);

  const { monthlyResults, annualTotal, kpis } = financialData;

  // Format tiền tệ VNĐ (triệu đồng hoặc đầy đủ)
  const fmtVND = (num) => new Intl.NumberFormat("vi-VN").format(Math.round(num));
  const fmtM = (num) => (num / 1000000).toFixed(1) + "M";

  // Xử lý chọn kịch bản vốn nhanh
  const handleSelectPreset = (presetId) => {
    setSelectedCapitalPreset(presetId);
    setIsCustomCapital(false);
    const p = CAPITAL_PRESETS.find((item) => item.id === presetId);
    if (p) setCustomEquity(p.equity);
  };

  // Xuất file CSV báo cáo dòng tiền chuẩn UTF-8
  const handleExportCSV = () => {
    const headers = [
      "Khoản mục",
      ...monthlyResults.map((m) => m.label),
      "Tổng Cả Năm (VNĐ)"
    ];

    const rows = [
      [
        "1. Tiền mặt đầu kỳ",
        ...monthlyResults.map((m) => fmtVND(m.startingCash)),
        fmtVND(monthlyResults[0].startingCash)
      ],
      [
        "2. Doanh thu bán gà",
        ...monthlyResults.map((m) => fmtVND(m.revenue)),
        fmtVND(annualTotal.revenue)
      ],
      [
        "3. Chi phí vận hành (OPEX)",
        ...monthlyResults.map((m) => fmtVND(m.opexCost)),
        fmtVND(annualTotal.opexCost)
      ],
      [
        "   - Tiền con giống",
        ...monthlyResults.map((m) => fmtVND(m.chickCost)),
        fmtVND(annualTotal.chickCost)
      ],
      [
        "   - Tiền thức ăn & cám",
        ...monthlyResults.map((m) => fmtVND(m.feedCost)),
        fmtVND(annualTotal.feedCost)
      ],
      [
        "   - Tiền lương nhân công",
        ...monthlyResults.map((m) => fmtVND(m.laborCost)),
        fmtVND(annualTotal.laborCost)
      ],
      [
        "   - Thú y, vắc-xin, điện nước",
        ...monthlyResults.map((m) => fmtVND(m.vetOpCost)),
        fmtVND(annualTotal.vetOpCost)
      ],
      [
        "4. Chi phí đầu tư chuồng trại (CAPEX)",
        ...monthlyResults.map((m) => fmtVND(m.capexCost)),
        fmtVND(annualTotal.capexCost)
      ],
      [
        "5. Dòng tiền thuần hoạt động",
        ...monthlyResults.map((m) => fmtVND(m.netOperatingFlow)),
        fmtVND(annualTotal.netOperatingFlow)
      ],
      [
        "6. Nhu cầu vay bổ sung trong tháng",
        ...monthlyResults.map((m) => fmtVND(m.borrowNeed)),
        fmtVND(annualTotal.borrowNeed)
      ],
      [
        "7. Trả nợ gốc trong tháng",
        ...monthlyResults.map((m) => fmtVND(m.repayment)),
        fmtVND(annualTotal.repayment)
      ],
      [
        "8. Tiền mặt tồn két cuối kỳ",
        ...monthlyResults.map((m) => fmtVND(m.endingCash)),
        fmtVND(kpis.lastEndingCash)
      ],
      [
        "9. Dư nợ vay lũy kế cuối kỳ",
        ...monthlyResults.map((m) => fmtVND(m.debtBalance)),
        fmtVND(monthlyResults[monthlyResults.length - 1].debtBalance)
      ]
    ];

    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join(
        "\r\n"
      );

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Dong_Tien_12_Thang_Trang_Trai_Lac_Son_${selectedCapitalPreset}M.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dữ liệu cho biểu đồ Recharts
  const chartData = useMemo(() => {
    return monthlyResults.map((m) => ({
      name: m.key,
      label: m.label,
      "Doanh Thu": Math.round(m.revenue / 1000000),
      "Tổng Chi (OPEX+CAPEX)": Math.round(m.totalOutflow / 1000000),
      "Tiền Tồn Két": Math.round(m.endingCash / 1000000),
      "Dư Nợ Vay": Math.round(m.debtBalance / 1000000),
      "Quy Mô Đàn (con)": m.activeFlockCount,
      "Nhân Sự Thực Tế": m.headcount,
      "Nhân Sự Mức 2k": m.benchmarkHeadcount
    }));
  }, [monthlyResults]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-indigo-800/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-500 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Zap className="w-3.5 h-3.5" />
                Mô Hình 12 Tháng Chuẩn Hoá
              </span>
              <span className="text-indigo-300 text-xs font-semibold">
                Chu kỳ 10/2026 – 09/2027 • Quy mô 3.7 ha
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              Quản Lý Dòng Tiền & Mô Phỏng Vay Nợ (Xoay Vòng 4 Phân Khu)
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              Mô phỏng động toàn bộ dòng tiền vào/ra, nhu cầu vay vốn theo vốn ban đầu, tối ưu hóa năng suất nhân công 
              <strong> 3.000 con/người</strong> và xác định chính xác thời điểm sạch nợ.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất CSV (Excel)</span>
            </button>
            <button
              onClick={onSwitchToFinancialTab}
              className="px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Về Vụ Tết (Tab 1)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. COMPONENT 0: BỘ CHỌN KỊCH BẢN VỐN BAN ĐẦU */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              1. Chọn Kịch Bản Vốn Tự Có Ban Đầu (Tháng 10/2026)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Số vốn này được rót vào tháng đầu tiên. Toàn bộ áp lực vay vốn, đỉnh nợ và tháng sạch nợ sẽ tự động tính lại.
            </p>
          </div>
          {isCustomCapital && (
            <span className="text-[11px] bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-full self-start sm:self-auto">
              Đang tùy chỉnh: {fmtVND(effectiveInitialEquity)} đ
            </span>
          )}
        </div>

        {/* 4 Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAPITAL_PRESETS.map((p) => {
            const isSelected = !isCustomCapital && selectedCapitalPreset === p.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-slate-900">{p.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>
                  <div className="text-base font-black text-emerald-700">
                    {fmtVND(p.equity)} đ
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{p.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? "text-emerald-700 font-bold" : "text-slate-400"}>
                    {isSelected ? "Đang áp dụng" : "Nhấp để chọn"}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Slider tùy chỉnh số vốn bất kỳ */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-800">
              Tùy chỉnh vốn theo thực tế:
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <input
              type="range"
              min="30000000"
              max="250000000"
              step="5000000"
              value={customEquity}
              onChange={(e) => {
                setCustomEquity(Number(e.target.value));
                setIsCustomCapital(true);
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-xs font-black text-slate-900 min-w-[85px] text-right bg-white px-2 py-1 rounded border border-slate-200">
              {fmtM(effectiveInitialEquity)}
            </span>
          </div>
        </div>
      </section>

      {/* 3. BỘ ĐIỀU CHỈNH NĂNG SUẤT NHÂN CÔNG (THEO YÊU CẦU CỦA NGƯỜI DÙNG) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              2. Định Mức Nhân Công & Năng Suất Chăm Sóc (1 Người / Bao Nhiêu Con?)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Áp dụng máng ăn và núm uống tự động để nâng định mức lên mức bán công nghiệp (3.000 con/người)
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 px-2.5 py-1 rounded-xl text-xs font-bold">
            <span>Tiết kiệm năm:</span>
            <span className="text-emerald-700 font-black">+{fmtM(kpis.laborSavingsAnnual)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Card 1: Chọn chế độ 2000 vs 3000 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Chế độ vận hành lao động:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBirdsPerWorker(2000)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  birdsPerWorker === 2000
                    ? "border-amber-500 bg-amber-50/70 shadow-xs ring-1 ring-amber-400"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div>
                  <div className="text-xs font-black text-slate-900">2.000 con / người</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Thả đồi truyền thống</div>
                </div>
                <div className="text-[10px] text-amber-800 font-bold mt-2 pt-1 border-t border-slate-200">
                  Đỉnh: {kpis.peakBenchmarkHeadcount} nhân công ({fmtM(kpis.peakBenchmarkHeadcount * workerSalary)}/th)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBirdsPerWorker(3000)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  birdsPerWorker === 3000
                    ? "border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/30"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-950">3.000 con / người</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 font-black px-1 rounded">Khuyên Dùng</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Bán công nghiệp hóa</div>
                </div>
                <div className="text-[10px] text-emerald-800 font-bold mt-2 pt-1 border-t border-slate-200">
                  Đỉnh: {kpis.peakHeadcount} nhân công ({fmtM(kpis.peakHeadcount * workerSalary)}/th)
                </div>
              </button>
            </div>
          </div>

          {/* Card 2: Lương và Slider chi tiết */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Mức lương bình quân:</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {fmtM(workerSalary)} / người / tháng
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Tinh chỉnh năng suất:</span>
                <span className="font-bold text-slate-800">{fmtVND(birdsPerWorker)} con/người</span>
              </div>
              <input
                type="range"
                min="1500"
                max="3500"
                step="250"
                value={birdsPerWorker}
                onChange={(e) => setBirdsPerWorker(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <p className="text-[11px] text-indigo-900 bg-indigo-50/80 p-2 rounded border border-indigo-100">
              💡 <strong>Lợi thế:</strong> Khi đàn đạt 15.820 con, mức 3.000 con/người chỉ cần 6 thợ (thay vì 8 thợ), giúp giảm 14M/tháng chi phí vận hành.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMPONENT 1: TOP KPI CARDS HEADER (ĐỘNG 100%) */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
        {/* KPI 1 */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Vốn Đầu Kỳ & Két
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-base sm:text-xl font-black text-slate-900">
            {fmtM(effectiveInitialEquity)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Két tối thiểu: <span className="font-bold text-slate-700">20.0M</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Vay Trước Tết (01/27)
            </span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-base sm:text-xl font-black text-amber-600">
            {fmtVND(kpis.preTetBorrowNeed)} đ
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {kpis.preTetBorrowNeed > 0 ? "Áp lực vay giáp hạt" : "Không cần vay trước Tết"}
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Đỉnh Nợ Lũy Kế
            </span>
            <TrendingUp className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-base sm:text-xl font-black text-red-600">
            {fmtVND(kpis.peakDebt)} đ
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Đạt đỉnh vào: <span className="font-bold text-slate-800">{kpis.peakDebtMonth || "N/A"}</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Thời Điểm Sạch Nợ
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-base sm:text-xl font-black text-emerald-700">
            {kpis.debtFreeMonth}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Thặng dư két: <span className="font-bold text-emerald-700">+{fmtM(kpis.endingCashSurplus)}</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="col-span-2 lg:col-span-1 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Thặng Dư Ổn Định
            </span>
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-base sm:text-xl font-black text-blue-700">
            +{fmtVND(kpis.steadyMonthlySurplus)} đ
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Mỗi tháng từ 08/2027 (bán 3.002 con)
          </div>
        </div>
      </section>

      {/* 5. COMPONENT 2: INTERACTIVE CHARTS VIEW (TOGGLE TABS) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              3. Phân Tích Biểu Đồ Dòng Tiền & Chu Trình Nợ Vay
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Trực quan hóa lộ trình tài chính qua 12 tháng xoay vòng đàn
            </p>
          </div>

          {/* Toggle 3 Tab Biểu Đồ */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveChartTab("cash_flow")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeChartTab === "cash_flow"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dòng Tiền Vào / Ra
            </button>
            <button
              onClick={() => setActiveChartTab("debt_waterfall")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeChartTab === "debt_waterfall"
                  ? "bg-white text-red-700 shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Thác Nợ Lũy Kế (Debt Waterfall)
            </button>
            <button
              onClick={() => setActiveChartTab("flock_labor")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeChartTab === "flock_labor"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Quy Mô Đàn & Nhân Sự
            </button>
          </div>
        </div>

        {/* Tab A: Dòng Tiền Vào / Ra */}
        {activeChartTab === "cash_flow" && (
          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="M" />
                <Tooltip
                  formatter={(val, name) => [`${fmtVND(val)} Triệu`, name]}
                  contentStyle={{ backgroundColor: "#0F172A", color: "#fff", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Doanh Thu" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Tổng Chi (OPEX+CAPEX)" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="Tiền Tồn Két" stroke="#3B82F6" strokeWidth={3} dot={{ r: 3 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tab B: Thác Nợ Lũy Kế */}
        {activeChartTab === "debt_waterfall" && (
          <div className="space-y-2">
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="debtGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="M" />
                  <Tooltip
                    formatter={(val) => [`${fmtVND(val)} Triệu`, "Dư Nợ Vay"]}
                    contentStyle={{ backgroundColor: "#0F172A", color: "#fff", borderRadius: 8, fontSize: 12 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Dư Nợ Vay"
                    stroke="#DC2626"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#debtGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 text-center italic">
              Đỉnh nợ {fmtVND(kpis.peakDebt)} đ đạt tại {kpis.peakDebtMonth}, sau đó giảm dốc đứng khi xuất bán gà thương phẩm liên tục từ Tháng 07/2027.
            </p>
          </div>
        )}

        {/* Tab C: Quy Mô Đàn & Nhân Sự */}
        {activeChartTab === "flock_labor" && (
          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} unit=" con" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} unit=" người" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F172A", color: "#fff", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Quy Mô Đàn (con)"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
                <Line
                  yAxisId="right"
                  type="stepAfter"
                  dataKey="Nhân Sự Thực Tế"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                />
                <Line
                  yAxisId="right"
                  type="stepAfter"
                  dataKey="Nhân Sự Mức 2k"
                  stroke="#94A3B8"
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* 6. COMPONENT 3: CHI TIẾT BẢNG DÒNG TIỀN 12 THÁNG (COLLAPSIBLE & STICKY HORIZONTAL) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              4. Bảng Kế Hoạch Dòng Tiền 12 Tháng Chi Tiết (VNĐ)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Có thể cuộn ngang trên điện thoại (cố định cột chỉ tiêu). Bấm vào các mục để mở rộng/thu gọn.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Excel</span>
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-[550px] shadow-2xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-20 shadow-2xs">
              <tr>
                <th className="p-2.5 sm:p-3 sticky left-0 bg-slate-100 z-30 min-w-[200px] border-r border-slate-200">
                  Khoản Mục Dòng Tiền
                </th>
                {monthlyResults.map((m) => (
                  <th key={m.key} className="p-2 sm:p-2.5 text-right whitespace-nowrap min-w-[95px] border-r border-slate-200/60 font-black">
                    {m.key}
                  </th>
                ))}
                <th className="p-2.5 sm:p-3 text-right whitespace-nowrap min-w-[110px] bg-emerald-100/70 text-emerald-950 font-black">
                  Tổng Cả Năm
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* 1. Tiền mặt đầu kỳ */}
              <tr className="bg-slate-50/70 font-semibold">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-slate-50 border-r border-slate-200 text-slate-900">
                  1. Tiền mặt đầu kỳ
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/50 font-mono text-slate-700">
                    {fmtVND(m.startingCash)}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-emerald-50/40 font-mono font-bold text-slate-800">
                  {fmtVND(monthlyResults[0].startingCash)}
                </td>
              </tr>

              {/* 2. Doanh thu bán gà */}
              <tr className="bg-emerald-50/40 font-bold text-emerald-950">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-emerald-50 border-r border-emerald-200 flex items-center justify-between">
                  <span>2. Doanh thu bán gà</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1 py-0.2 rounded font-black">Vào</span>
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/50 font-mono text-emerald-700">
                    {m.revenue > 0 ? fmtVND(m.revenue) : "-"}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-emerald-100/50 font-mono font-black text-emerald-800">
                  {fmtVND(annualTotal.revenue)}
                </td>
              </tr>

              {/* 3. OPEX Header */}
              <tr className="bg-rose-50/30 font-bold text-rose-950">
                <td
                  onClick={() => toggleGroup("opex")}
                  className="p-2.5 sm:p-3 sticky left-0 bg-rose-50/80 border-r border-slate-200 cursor-pointer flex items-center justify-between hover:bg-rose-100/80 transition"
                >
                  <span className="flex items-center gap-1">
                    {collapsedGroups.opex ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    3. Chi phí vận hành (OPEX)
                  </span>
                  <span className="text-[10px] text-rose-700">Chi</span>
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/50 font-mono text-rose-700">
                    ({fmtVND(m.opexCost)})
                  </td>
                ))}
                <td className="p-2.5 text-right bg-rose-100/40 font-mono font-black text-rose-800">
                  ({fmtVND(annualTotal.opexCost)})
                </td>
              </tr>

              {/* OPEX Sub-rows */}
              {!collapsedGroups.opex && (
                <>
                  <tr className="text-[11px] text-slate-600">
                    <td className="p-2 pl-6 sticky left-0 bg-white border-r border-slate-200">
                      • Con giống nhập đàn
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200/40 font-mono">
                        {fmtVND(m.chickCost)}
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono">{fmtVND(annualTotal.chickCost)}</td>
                  </tr>

                  <tr className="text-[11px] text-slate-600">
                    <td className="p-2 pl-6 sticky left-0 bg-white border-r border-slate-200">
                      • Thức ăn & cám ({feedPrice.toLocaleString()}đ/kg)
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200/40 font-mono">
                        {fmtVND(m.feedCost)}
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono">{fmtVND(annualTotal.feedCost)}</td>
                  </tr>

                  <tr className="text-[11px] text-slate-600">
                    <td className="p-2 pl-6 sticky left-0 bg-white border-r border-slate-200">
                      • Lương nhân sự ({birdsPerWorker.toLocaleString()} con/người)
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200/40 font-mono">
                        {fmtVND(m.laborCost)} <span className="text-[10px] text-slate-400">({m.headcount}ng)</span>
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono">{fmtVND(annualTotal.laborCost)}</td>
                  </tr>

                  <tr className="text-[11px] text-slate-600">
                    <td className="p-2 pl-6 sticky left-0 bg-white border-r border-slate-200">
                      • Thú y, vắc-xin, điện nước
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200/40 font-mono">
                        {fmtVND(m.vetOpCost)}
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono">{fmtVND(annualTotal.vetOpCost)}</td>
                  </tr>
                </>
              )}

              {/* 4. CAPEX Header */}
              <tr className="bg-amber-50/30 font-bold text-amber-950">
                <td
                  onClick={() => toggleGroup("capex")}
                  className="p-2.5 sm:p-3 sticky left-0 bg-amber-50/80 border-r border-slate-200 cursor-pointer flex items-center justify-between hover:bg-amber-100/80 transition"
                >
                  <span className="flex items-center gap-1">
                    {collapsedGroups.capex ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    4. Đầu tư chuồng trại (CAPEX)
                  </span>
                  <span className="text-[10px] text-amber-700">Cơ bản</span>
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/50 font-mono text-amber-800">
                    {m.capexCost > 0 ? `(${fmtVND(m.capexCost)})` : "-"}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-amber-100/40 font-mono font-black text-amber-900">
                  ({fmtVND(annualTotal.capexCost)})
                </td>
              </tr>

              {/* 5. Cân đối Dòng Tiền & Vay Nợ */}
              <tr className="bg-indigo-50/40 font-bold text-indigo-950">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-indigo-50 border-r border-slate-200">
                  5. Dòng tiền thuần hoạt động
                </td>
                {monthlyResults.map((m) => (
                  <td
                    key={m.key}
                    className={`p-2 text-right border-r border-slate-200/50 font-mono ${
                      m.netOperatingFlow >= 0 ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {fmtVND(m.netOperatingFlow)}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-indigo-100/40 font-mono font-black text-indigo-950">
                  {fmtVND(annualTotal.netOperatingFlow)}
                </td>
              </tr>

              {/* Vay mới */}
              <tr className="text-amber-800 font-semibold bg-white">
                <td className="p-2 pl-6 sticky left-0 bg-white border-r border-slate-200">
                  + Nhu cầu vay mới trong tháng
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/40 font-mono text-amber-700">
                    {m.borrowNeed > 0 ? `+${fmtVND(m.borrowNeed)}` : "-"}
                  </td>
                ))}
                <td className="p-2 text-right bg-slate-50 font-mono font-bold text-amber-800">
                  +{fmtVND(annualTotal.borrowNeed)}
                </td>
              </tr>

              {/* Trả nợ */}
              <tr className="text-emerald-800 font-semibold bg-white">
                <td className="p-2 pl-6 sticky left-0 bg-white border-r border-slate-200">
                  - Trả nợ gốc trong tháng
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/40 font-mono text-emerald-700">
                    {m.repayment > 0 ? `-${fmtVND(m.repayment)}` : "-"}
                  </td>
                ))}
                <td className="p-2 text-right bg-slate-50 font-mono font-bold text-emerald-800">
                  -{fmtVND(annualTotal.repayment)}
                </td>
              </tr>

              {/* 6. Tiền tồn két cuối kỳ */}
              <tr className="bg-blue-50/50 font-bold text-blue-950 border-t-2 border-slate-300">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-blue-50 border-r border-slate-200">
                  6. Tiền mặt tồn két cuối kỳ
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/50 font-mono text-blue-800">
                    {fmtVND(m.endingCash)}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-blue-100/60 font-mono font-black text-blue-900">
                  {fmtVND(kpis.lastEndingCash)}
                </td>
              </tr>

              {/* 7. Dư nợ vay còn lại */}
              <tr className="bg-red-50/50 font-bold text-red-950">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-red-50 border-r border-slate-200">
                  7. Dư nợ vay lũy kế còn lại
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200/50 font-mono text-red-700">
                    {m.debtBalance > 0 ? fmtVND(m.debtBalance) : "0 đ (Sạch nợ)"}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-red-100/60 font-mono font-black text-red-900">
                  {fmtVND(monthlyResults[monthlyResults.length - 1].debtBalance)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMPONENT 4: BỘ MÔ PHỎNG ĐỘ NHẠY THỊ TRƯỜNG ("WHAT-IF") */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              5. Bộ Mô Phỏng Độ Nhạy Thị Trường ("What-If" Sensitivity Simulator)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Kiểm tra khả năng chịu tải của trang trại khi giá gà, giá cám biến động ngoài dự kiến
            </p>
          </div>
          <button
            onClick={() => {
              setSellingPrice(180000);
              setChickPrice(14000);
              setFeedPrice(10000);
              setFeedSavingRate(0.0);
              setBirdsPerWorker(3000);
            }}
            className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Đặt lại mặc định
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Slider 1: Giá bán */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Giá bán gà:</span>
              <span className="font-black text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {sellingPrice.toLocaleString()} đ/kg
              </span>
            </div>
            <input
              type="range"
              min="150000"
              max="200000"
              step="5000"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>150k</span>
              <span>180k (Chuẩn)</span>
              <span>200k</span>
            </div>
          </div>

          {/* Slider 2: Giá giống */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Giá giống (1 ngày):</span>
              <span className="font-black text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {chickPrice.toLocaleString()} đ/con
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="20000"
              step="1000"
              value={chickPrice}
              onChange={(e) => setChickPrice(Number(e.target.value))}
              className="w-full accent-slate-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10k</span>
              <span>14k (Chuẩn)</span>
              <span>20k</span>
            </div>
          </div>

          {/* Slider 3: Giá cám */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Giá thức ăn:</span>
              <span className="font-black text-rose-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {feedPrice.toLocaleString()} đ/kg
              </span>
            </div>
            <input
              type="range"
              min="8000"
              max="13000"
              step="500"
              value={feedPrice}
              onChange={(e) => setFeedPrice(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>8k</span>
              <span>10k (Chuẩn)</span>
              <span>13k</span>
            </div>
          </div>

          {/* Slider 4: Tiết kiệm cám nhờ chuối men */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Giảm cám (Chuối men):</span>
              <span className="font-black text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {Math.round(feedSavingRate * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="0.30"
              step="0.05"
              value={feedSavingRate}
              onChange={(e) => setFeedSavingRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (Cám 100%)</span>
              <span>15%</span>
              <span>30% (Ủ chuối)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPONENT 5: SƠ ĐỒ QUY HOẠCH 4 PHÂN KHU (3.7 HA) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              6. Quy Hoạch 4 Phân Khu Chuồng Trại & Xoay Vòng All-In All-Out (3.7 ha)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Tận dụng 3.7 ha rào B40 có sẵn (0đ) và phân kỳ chuồng tre nứa sàn đậu để tránh áp lực vốn
            </p>
          </div>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold hidden sm:inline-block">
            Tổng CAPEX: 141.4 Triệu
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FARM_MODULES_INFO.map((mod) => (
            <div
              key={mod.id}
              className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 uppercase">{mod.name}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-1.5 py-0.2 rounded">
                    {mod.capacity}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-emerald-700 mt-1">{mod.phase}</div>
                <div className="text-[11px] text-slate-600 mt-1.5 space-y-0.5">
                  <div>Chuồng: <strong>{mod.shelterArea}</strong></div>
                  <div>Sân đồi: <strong>{mod.yardArea}</strong></div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{mod.purpose}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[10px] font-bold text-slate-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{mod.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bio-security banner */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Nguyên tắc xoay vòng All-in All-out:</strong> Mỗi phân khu sau khi xuất bán hết lứa gà được để trống, rắc vôi bột và phun sát trùng 20–30 ngày. Điều này giúp cắt đứt hoàn toàn mầm bệnh, giữ tỷ lệ sống ổn định 95% mà không lo dịch bệnh lây lan chéo.
          </div>
        </div>
      </section>
    </div>
  );
}
