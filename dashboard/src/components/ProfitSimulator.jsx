import React, { useState } from "react";
import { Sliders, Sparkles, RotateCcw, ArrowRight, ShieldAlert, Award, ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrencyVND, formatVNDRaw, formatPercent } from "../utils/calculator";

export function ProfitSimulator({
  chickenPrice,
  onChickenPriceChange,
  pigPrice,
  onPigPriceChange,
  feedSavingRate,
  onFeedSavingRateChange,
  chickenSurvRate,
  onChickenSurvRateChange,
  onResetDefaults,
  data,
  basePreset
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Compare with base preset at default values
  const defaultRevenue =
    (Math.floor(basePreset.chicken3mCount * 0.95) * 200000 +
      basePreset.pigsCount * basePreset.pigWeight * 130000) /
    1000000;
  const revDiff = data.totalRevenue - defaultRevenue;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <Sliders className="w-5 h-5" />
            </div>
            Mô Phỏng Giá Bán & Độ Nhạy Lợi Nhuận
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Kéo trượt các thanh giá và tỷ lệ tiết kiệm để kiểm tra khả năng chịu tải của trang trại
          </p>
        </div>

        <button
          onClick={onResetDefaults}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Về giá gốc</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slider 1: Giá Gà Lạc Sơn */}
        <div className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              🐔 Giá bán gà Lạc Sơn / con:
            </span>
            <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {formatVNDRaw(chickenPrice)}
            </span>
          </div>

          <input
            type="range"
            min={160000}
            max={250000}
            step={5000}
            value={chickenPrice}
            onChange={(e) => onChickenPriceChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />

          <div className="flex justify-between text-[11px] text-slate-500">
            <span className="cursor-pointer hover:text-emerald-700" onClick={() => onChickenPriceChange(160000)}>160k (Sỉ)</span>
            <span className="cursor-pointer hover:text-emerald-700 font-semibold" onClick={() => onChickenPriceChange(200000)}>200k (Lẻ chuẩn)</span>
            <span className="cursor-pointer hover:text-emerald-700" onClick={() => onChickenPriceChange(250000)}>250k (Biếu Tết)</span>
          </div>
        </div>

        {/* Slider 2: Giá Lợn Bản Hơi */}
        <div className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              🐷 Giá bán lợn hơi / kg:
            </span>
            <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {formatVNDRaw(pigPrice)}
            </span>
          </div>

          <input
            type="range"
            min={100000}
            max={160000}
            step={5000}
            value={pigPrice}
            onChange={(e) => onPigPriceChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />

          <div className="flex justify-between text-[11px] text-slate-500">
            <span className="cursor-pointer hover:text-emerald-700" onClick={() => onPigPriceChange(100000)}>100k/kg (Thấp)</span>
            <span className="cursor-pointer hover:text-emerald-700 font-semibold" onClick={() => onPigPriceChange(130000)}>130k/kg (Trung bình)</span>
            <span className="cursor-pointer hover:text-emerald-700" onClick={() => onPigPriceChange(160000)}>160k/kg (Tết sốt)</span>
          </div>
        </div>

        {/* Slider 3: Tiết Kiệm Thức Ăn Chuối */}
        <div className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              🌱 Tận dụng chuối & men ủ:
            </span>
            <span className="text-amber-700 font-bold text-sm bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {Math.round(feedSavingRate * 100)}% chi phí
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={0.60}
            step={0.05}
            value={feedSavingRate}
            onChange={(e) => onFeedSavingRateChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />

          <div className="flex justify-between text-[11px] text-slate-500">
            <span className="cursor-pointer hover:text-amber-700" onClick={() => onFeedSavingRateChange(0)}>0% (Cám 100%)</span>
            <span className="cursor-pointer hover:text-amber-700 font-semibold" onClick={() => onFeedSavingRateChange(0.40)}>40% (Chuẩn men)</span>
            <span className="cursor-pointer hover:text-amber-700" onClick={() => onFeedSavingRateChange(0.60)}>60% (Tối đa)</span>
          </div>
        </div>
      </div>

      {/* Advanced Toggle (Survival Rate) */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{showAdvanced ? "Thu gọn tùy chọn nâng cao" : "Mở rộng: Tỷ lệ sống đàn gà nuôi (Survival Rate)"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Tỷ lệ sống đàn gà (hao hụt 100 ngày):</span>
              <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                {formatPercent(chickenSurvRate * 100, 0)}
              </span>
            </div>
            <input
              type="range"
              min={0.85}
              max={0.98}
              step={0.01}
              value={chickenSurvRate}
              onChange={(e) => onChickenSurvRateChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>85% (Rét khắc nghiệt)</span>
              <span className="font-semibold text-emerald-700">95% (Quy chuẩn thực tế)</span>
              <span>98% (Chăm sóc tối ưu)</span>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Dynamic Simulation Bar */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-xl p-4 sm:p-5 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Kết Quả Mô Phỏng Thị Trường Real-Time
          </div>
          <div className="text-xs text-emerald-800">
            Doanh thu Tết: <strong className="text-slate-900 font-bold">{formatCurrencyVND(data.totalRevenue, 1)}</strong>
            {" • "}
            Lãi tiền mặt:{" "}
            <strong className={data.cashProfit >= 0 ? "text-blue-700 font-bold" : "text-amber-700 font-bold"}>
              {data.cashProfit >= 0 ? `+${formatCurrencyVND(data.cashProfit, 1)}` : formatCurrencyVND(data.cashProfit, 1)}
            </strong>
            {" • "}
            Tiết kiệm nhờ chuối & men: <strong className="text-emerald-700 font-bold">{formatCurrencyVND(data.feedSavings, 1)}</strong>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="bg-white px-3.5 py-2 rounded-lg border border-emerald-200 shadow-sm">
            <span className="text-[11px] text-slate-500 block">Lợi nhuận ròng mô phỏng</span>
            <span className="text-lg font-black text-emerald-700">
              +{formatCurrencyVND(data.totalNetProfit, 1)}
            </span>
          </div>

          <div className="bg-white px-3.5 py-2 rounded-lg border border-emerald-200 shadow-sm">
            <span className="text-[11px] text-slate-500 block">Tỷ suất ROI</span>
            <span className="text-lg font-black text-amber-600">
              {formatPercent(data.roi, 1)}
            </span>
          </div>

          {revDiff !== 0 && (
            <div className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
              revDiff > 0
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : "bg-amber-100 text-amber-800 border-amber-300"
            }`}>
              {revDiff > 0 ? `+${formatCurrencyVND(revDiff, 1)}` : `${formatCurrencyVND(revDiff, 1)}`} so với giá chuẩn
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
