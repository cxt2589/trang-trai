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
  HelpCircle,
  Sparkles
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

export function CashFlow12MTab({
  selectedCapital = 130,
  onSelectCapital,
  onSwitchToFinancialTab,
  onSwitchToActionPlanTab
}) {
  // Local state for custom capital slider
  const [customEquity, setCustomEquity] = useState(selectedCapital * 1000000);
  const [isCustomCapital, setIsCustomCapital] = useState(false);

  // State năng suất nhân công (người dùng yêu cầu 2.000 vs 3.000 con/người)
  const [birdsPerWorker, setBirdsPerWorker] = useState(3000); // 3000 = công nghiệp, 2000 = truyền thống
  const [workerSalary, setWorkerSalary] = useState(7000000);

  // State các biến số thị trường (What-If sensitivity) - Hỗ trợ giá gà đến 250k, giảm cám đến 70%
  const [sellingPrice, setSellingPrice] = useState(180000); // 150.000 - 250.000 VNĐ/kg
  const [chickPrice, setChickPrice] = useState(14000); // 10.000 - 20.000 VNĐ/con 1 ngày tuổi
  const [feedPrice, setFeedPrice] = useState(10000); // 8.000 - 13.000 VNĐ/kg cám
  const [feedSavingRate, setFeedSavingRate] = useState(0.0); // 0% - 70%

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

  // Xác định số vốn ban đầu đang áp dụng (đồng bộ với toàn hệ thống)
  const effectiveInitialEquity = useMemo(() => {
    if (isCustomCapital) return customEquity;
    return selectedCapital * 1000000;
  }, [isCustomCapital, customEquity, selectedCapital]);

  // Chạy lõi tính toán tài chính 12 tháng (useMemo tối ưu)
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

  // Format tiền tệ VNĐ
  const fmtVND = (num) => new Intl.NumberFormat("vi-VN").format(Math.round(num));
  const fmtM = (num) => (num / 1000000).toFixed(1) + "M";

  // Xử lý chọn kịch bản vốn nhanh đồng bộ
  const handleSelectPreset = (presetId) => {
    setIsCustomCapital(false);
    setCustomEquity(presetId * 1000000);
    if (onSelectCapital) {
      onSelectCapital(presetId);
    }
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
      `Dong_Tien_12_Thang_Trang_Trai_Lac_Son_${selectedCapital}M.csv`
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
              <span className="bg-indigo-600/60 text-white border border-indigo-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Đồng bộ vốn: Gói {selectedCapital} Triệu
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

      {/* 2. COMPONENT 1: BỘ CHỌN KỊCH BẢN VỐN BAN ĐẦU (ĐỒNG BỘ 1 CHẠM VỚI TOÀN HỆ THỐNG) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              1. Chọn Kịch Bản Vốn Ban Đầu (Đồng Bộ 1 Lần Duy Nhất)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Chọn mức vốn tại đây sẽ tự động cập nhật sang cả Tab 1 (Vụ Tết) và Tab 4 (12 Tháng). Bạn không cần chọn lại lần thứ 2!
            </p>
          </div>
          {isCustomCapital && (
            <span className="text-[11px] bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              Đang tùy chỉnh: {fmtVND(effectiveInitialEquity)} đ
            </span>
          )}
        </div>

        {/* Preset Cards Grid - Đồng bộ 6 mốc vốn */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {CAPITAL_PRESETS.map((p) => {
            const isSelected = !isCustomCapital && selectedCapital === p.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between select-none ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-700">{p.name}</span>
                    {p.id === 130 && (
                      <span className="text-[9px] bg-emerald-600 text-white font-black px-1 rounded">
                        ★
                      </span>
                    )}
                  </div>
                  <div className="text-base font-black text-slate-900 leading-tight">
                    {p.id} Tr
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border inline-block mt-1 ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? "text-emerald-700 font-bold" : "text-slate-400"}>
                    {isSelected ? "Đang chọn" : "Chọn gói"}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
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
              Hoặc tùy chỉnh vốn linh hoạt:
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
                const val = Number(e.target.value);
                setCustomEquity(val);
                setIsCustomCapital(true);
                if (onSelectCapital) {
                  onSelectCapital(Math.round(val / 1000000));
                }
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-xs font-black text-slate-900 min-w-[85px] text-right bg-white px-2 py-1 rounded border border-slate-200">
              {fmtM(effectiveInitialEquity)}
            </span>
          </div>
        </div>
      </section>

      {/* 3. COMPONENT 2: BỘ ĐIỀU CHỈNH NĂNG SUẤT NHÂN CÔNG */}
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
          {/* Chọn chế độ 2000 vs 3000 */}
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

          {/* Lương và Slider chi tiết */}
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

            <p className="text-[11px] text-indigo-900 bg-indigo-50/80 p-2 rounded border border-indigo-100 leading-relaxed">
              💡 <strong>Lưu ý 2 tháng đầu (T10 & T11/2026):</strong> Cố định <strong>4 nhân công</strong> (3 người chặt tre làm chuồng: 1 chặt 2 khiêng; 1 người lo trồng rau tự chủ sinh hoạt & điện nước ăn uống) để hoàn thiện 4–6 chuồng nhỏ 300m² trước mùa đông rét buốt. Từ tháng thứ 3 trở đi, nhân sự tự động co giãn theo quy mô đàn ({birdsPerWorker.toLocaleString()} con/người).
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMPONENT 3: BỘ MÔ PHỎNG ĐỘ NHẠY THỊ TRƯỜNG ("WHAT-IF") - ĐÃ ĐƯA LÊN TRÊN THEO YÊU CẦU */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              3. Bộ Mô Phỏng Độ Nhạy Thị Trường ("What-If" Sensitivity Simulator)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Thử nghiệm kịch bản giá bán gà (lên tới 250k) và giảm chi phí cám nhờ chuối men/rau cỏ (lên tới 70%)
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
            className="text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold transition self-start sm:self-auto cursor-pointer"
          >
            Đặt lại thông số chuẩn
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Slider 1: Giá bán gà (lên tới 250.000đ/kg) */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Giá bán gà thịt:</span>
              <span className="font-black text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {sellingPrice.toLocaleString()} đ/kg
              </span>
            </div>
            <input
              type="range"
              min="150000"
              max="250000"
              step="5000"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>150k</span>
              <span>180k (Chuẩn)</span>
              <span>220k</span>
              <span className="font-bold text-emerald-600">250k</span>
            </div>
          </div>

          {/* Slider 2: Tự chủ thức ăn / Giảm cám (lên tới 70%) */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Tự chủ thức ăn / Giảm cám:</span>
              <span className="font-black text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {Math.round(feedSavingRate * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="0.70"
              step="0.05"
              value={feedSavingRate}
              onChange={(e) => setFeedSavingRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (Mua 100% cám)</span>
              <span className="font-bold text-emerald-700">30% (Chuẩn xả cám)</span>
              <span>50%</span>
              <span className="font-bold text-emerald-600">70%</span>
            </div>
          </div>

          {/* Slider 3: Giá cám */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Giá cám công nghiệp:</span>
              <span className="font-black text-rose-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {feedPrice.toLocaleString()} đ/kg
              </span>
            </div>
            <input
              type="range"
              min="8000"
              max="15000"
              step="500"
              value={feedPrice}
              onChange={(e) => setFeedPrice(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>8k</span>
              <span>10k</span>
              <span className="font-bold text-rose-700">13k (Chuẩn TT)</span>
              <span>15k</span>
            </div>
          </div>

          {/* Slider 4: Giá giống */}
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
        </div>

        {/* Chú thích thực tế xả cám về 0 cho gà đặc sản */}
        <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-950">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-emerald-900">Chiến lược chăn nuôi gà đặc sản ("Xả cám về 0%"):</span>
              <span className="bg-emerald-200 text-emerald-900 font-extrabold text-[10px] px-1.5 py-0.2 rounded">
                Định mức chuẩn: 4,2 kg thức ăn / con
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Nuôi 4 tháng đạt trọng lượng xuất chuồng bình quân <strong>1,15 kg</strong> với tổng định mức <strong>4,2 kg thức ăn/con</strong> (FCR ~ 3.65). Trong 2 tháng đầu dùng cám công nghiệp tạo khung xương, từ tháng 3 giảm dần và tháng 4 cắt hoàn toàn 100% cám — thay bằng <strong>Ngô hạt (8k) + Thóc mầm (6k) + Chuối men & rau đồi</strong>. Chi phí thức ăn giảm từ ~54.600 đ xuống chỉ còn <strong>~38.100 đ/con</strong> (tiết kiệm ~16.500 đ/con, tương ứng mức giảm cám bình quân <strong>30%</strong>). Thịt thơm giòn, thớ săn chắc, da vàng giòn, bán được giá đặc sản <strong>180.000 – 250.000 đ/kg</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. COMPONENT 4: TOP KPI CARDS HEADER (ĐỘNG THEO THÔNG SỐ VỪA ĐIỀU CHỈNH) */}
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
            Két an toàn: <span className="font-bold text-slate-700">20.0M</span>
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

      {/* 6. COMPONENT 5: INTERACTIVE CHARTS VIEW */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              5. Phân Tích Biểu Đồ Dòng Tiền & Chu Trình Nợ Vay
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
              Thác Nợ Lũy Kế
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

      {/* 7. COMPONENT 6: BẢNG DÒNG TIỀN 12 THÁNG - SỬA LỖI STICKY VÀ ĐỤC 100% TRÁNH MỜ/CHỒNG CHỮ */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              6. Bảng Kế Hoạch Dòng Tiền 12 Tháng Chi Tiết (VNĐ)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Cột Khoản mục được khóa cố định 100% trên điện thoại và máy tính, nền màu đặc che kín nội dung cuộn bên dưới
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
        <div className="overflow-x-auto border border-slate-300 rounded-xl max-h-[550px] shadow-2xs relative">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-20 shadow-2xs">
              <tr>
                <th className="p-2.5 sm:p-3 sticky left-0 bg-slate-200 text-slate-900 z-30 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  Khoản Mục Dòng Tiền
                </th>
                {monthlyResults.map((m) => (
                  <th key={m.key} className="p-2 sm:p-2.5 text-right whitespace-nowrap min-w-[95px] border-r border-slate-200 font-black">
                    {m.key}
                  </th>
                ))}
                <th className="p-2.5 sm:p-3 text-right whitespace-nowrap min-w-[110px] bg-emerald-100 text-emerald-950 font-black">
                  Tổng Cả Năm
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {/* 1. Tiền mặt đầu kỳ */}
              <tr className="bg-slate-50 font-semibold">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-slate-100 text-slate-900 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  1. Tiền mặt đầu kỳ
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-slate-700">
                    {fmtVND(m.startingCash)}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-emerald-50 font-mono font-bold text-slate-800">
                  {fmtVND(monthlyResults[0].startingCash)}
                </td>
              </tr>

              {/* 2. Doanh thu bán gà */}
              <tr className="bg-emerald-50/50 font-bold text-emerald-950">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-emerald-100 text-emerald-950 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center justify-between">
                    <span>2. Doanh thu bán gà</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-black">Vào</span>
                  </div>
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-emerald-700">
                    {m.revenue > 0 ? fmtVND(m.revenue) : "-"}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-emerald-100 font-mono font-black text-emerald-800">
                  {fmtVND(annualTotal.revenue)}
                </td>
              </tr>

              {/* 3. OPEX Header */}
              <tr className="bg-rose-50/50 font-bold text-rose-950">
                <td
                  onClick={() => toggleGroup("opex")}
                  className="p-2.5 sm:p-3 sticky left-0 bg-rose-100 text-rose-950 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)] cursor-pointer hover:bg-rose-200 transition select-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      {collapsedGroups.opex ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                      3. Chi phí vận hành (OPEX)
                    </span>
                    <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-bold">Chi</span>
                  </div>
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-rose-700">
                    ({fmtVND(m.opexCost)})
                  </td>
                ))}
                <td className="p-2.5 text-right bg-rose-100 font-mono font-black text-rose-800">
                  ({fmtVND(annualTotal.opexCost)})
                </td>
              </tr>

              {/* OPEX Sub-rows */}
              {!collapsedGroups.opex && (
                <>
                  <tr className="text-[11px] text-slate-700 bg-white">
                    <td className="p-2 pl-6 sticky left-0 bg-white text-slate-700 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                      • Con giống nhập đàn
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono">
                        {fmtVND(m.chickCost)}
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono font-semibold">{fmtVND(annualTotal.chickCost)}</td>
                  </tr>

                  <tr className="text-[11px] text-slate-700 bg-white">
                    <td className="p-2 pl-6 sticky left-0 bg-white text-slate-700 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                      • Thức ăn & cám ({feedPrice.toLocaleString()}đ/kg)
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono">
                        {fmtVND(m.feedCost)}
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono font-semibold">{fmtVND(annualTotal.feedCost)}</td>
                  </tr>

                  <tr className="text-[11px] text-slate-700 bg-white">
                    <td className="p-2 pl-6 sticky left-0 bg-white text-slate-700 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                      • Lương nhân sự ({birdsPerWorker.toLocaleString()} con/người)
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono">
                        {fmtVND(m.laborCost)} <span className="text-[10px] text-slate-400">({m.headcount}ng)</span>
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono font-semibold">{fmtVND(annualTotal.laborCost)}</td>
                  </tr>

                  <tr className="text-[11px] text-slate-700 bg-white">
                    <td className="p-2 pl-6 sticky left-0 bg-white text-slate-700 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                      • Thú y, vắc-xin, điện nước
                    </td>
                    {monthlyResults.map((m) => (
                      <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono">
                        {fmtVND(m.vetOpCost)}
                      </td>
                    ))}
                    <td className="p-2 text-right bg-slate-50 font-mono font-semibold">{fmtVND(annualTotal.vetOpCost)}</td>
                  </tr>
                </>
              )}

              {/* 4. CAPEX Header */}
              <tr className="bg-amber-50/50 font-bold text-amber-950">
                <td
                  onClick={() => toggleGroup("capex")}
                  className="p-2.5 sm:p-3 sticky left-0 bg-amber-100 text-amber-950 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)] cursor-pointer hover:bg-amber-200 transition select-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      {collapsedGroups.capex ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                      4. Đầu tư chuồng trại (CAPEX)
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">Cơ bản</span>
                  </div>
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-amber-800">
                    {m.capexCost > 0 ? `(${fmtVND(m.capexCost)})` : "-"}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-amber-100 font-mono font-black text-amber-900">
                  ({fmtVND(annualTotal.capexCost)})
                </td>
              </tr>

              {/* 5. Cân đối Dòng Tiền */}
              <tr className="bg-indigo-50/60 font-bold text-indigo-950">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-indigo-100 text-indigo-950 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  5. Dòng tiền thuần hoạt động
                </td>
                {monthlyResults.map((m) => (
                  <td
                    key={m.key}
                    className={`p-2 text-right border-r border-slate-200 font-mono font-bold ${
                      m.netOperatingFlow >= 0 ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {fmtVND(m.netOperatingFlow)}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-indigo-100 font-mono font-black text-indigo-950">
                  {fmtVND(annualTotal.netOperatingFlow)}
                </td>
              </tr>

              {/* Vay mới */}
              <tr className="text-amber-900 font-semibold bg-white">
                <td className="p-2 pl-6 sticky left-0 bg-white text-amber-900 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  + Nhu cầu vay mới trong tháng
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-amber-700">
                    {m.borrowNeed > 0 ? `+${fmtVND(m.borrowNeed)}` : "-"}
                  </td>
                ))}
                <td className="p-2 text-right bg-slate-50 font-mono font-bold text-amber-800">
                  +{fmtVND(annualTotal.borrowNeed)}
                </td>
              </tr>

              {/* Trả nợ */}
              <tr className="text-emerald-900 font-semibold bg-white">
                <td className="p-2 pl-6 sticky left-0 bg-white text-emerald-900 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  - Trả nợ gốc trong tháng
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-emerald-700">
                    {m.repayment > 0 ? `-${fmtVND(m.repayment)}` : "-"}
                  </td>
                ))}
                <td className="p-2 text-right bg-slate-50 font-mono font-bold text-emerald-800">
                  -{fmtVND(annualTotal.repayment)}
                </td>
              </tr>

              {/* 6. Tiền tồn két cuối kỳ */}
              <tr className="bg-blue-50 font-bold text-blue-950 border-t-2 border-slate-300">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-blue-100 text-blue-950 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  6. Tiền mặt tồn két cuối kỳ
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-blue-800">
                    {fmtVND(m.endingCash)}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-blue-100 font-mono font-black text-blue-900">
                  {fmtVND(kpis.lastEndingCash)}
                </td>
              </tr>

              {/* 7. Dư nợ vay còn lại */}
              <tr className="bg-red-50 font-bold text-red-950">
                <td className="p-2.5 sm:p-3 sticky left-0 bg-red-100 text-red-950 z-10 min-w-[210px] sm:min-w-[240px] border-r-2 border-slate-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.12)]">
                  7. Dư nợ vay lũy kế còn lại
                </td>
                {monthlyResults.map((m) => (
                  <td key={m.key} className="p-2 text-right border-r border-slate-200 font-mono text-red-700">
                    {m.debtBalance > 0 ? fmtVND(m.debtBalance) : "0 đ (Sạch nợ)"}
                  </td>
                ))}
                <td className="p-2.5 text-right bg-red-100 font-mono font-black text-red-900">
                  {fmtVND(monthlyResults[monthlyResults.length - 1].debtBalance)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. COMPONENT 7: SƠ ĐỒ QUY HOẠCH 4 PHÂN KHU (3.7 HA) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              7. Quy Hoạch Chuồng Trại Nhỏ 300m² & Xoay Vòng All-In All-Out (3.7 ha)
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Mô hình chuồng nhỏ 300m² (mái fibro 30m², 150 con/chuồng) giúp cách ly dịch bệnh và dễ nâng cấp. Tháng 11 xong 4–6 chuồng.
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
