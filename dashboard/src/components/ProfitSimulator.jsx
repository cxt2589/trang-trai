import React, { useState } from "react";
import { Sliders, Sparkles, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
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

  const defaultRevenue =
    (Math.floor(basePreset.chicken3mCount * 0.95) * 200000 +
      basePreset.pigsCount * basePreset.pigWeight * 130000) /
    1000000;
  const revDiff = data.totalRevenue - defaultRevenue;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1 bg-emerald-100 rounded-md text-emerald-800">
              <Sliders className="w-4 h-4" />
            </div>
            Mô Phỏng Độ Nhạy Giá Bán & Tiết Kiệm Thức Ăn
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Kéo trượt để kiểm tra lợi nhuận thay đổi theo giá thị trường cận Tết
          </p>
        </div>

        <button
          onClick={onResetDefaults}
          className="self-start sm:self-auto text-[11px] sm:text-xs text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Về giá gốc</span>
        </button>
      </div>

      <div className="space-y-3">
        {/* Slider 1: Giá Gà */}
        <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span>🐔 Giá bán gà Lạc Sơn / con:</span>
            <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
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
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>160k (Sỉ)</span>
            <span className="font-semibold text-slate-600">200k (Lẻ chuẩn)</span>
            <span>250k (Biếu Tết)</span>
          </div>
        </div>

        {/* Slider 2: Giá Lợn */}
        <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span>🐷 Giá bán lợn hơi / kg:</span>
            <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
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
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>100k/kg (Thấp)</span>
            <span className="font-semibold text-slate-600">130k/kg (Trung bình)</span>
            <span>160k/kg (Sốt Tết)</span>
          </div>
        </div>

        {/* Slider 3: Chuối Men Vi Sinh */}
        <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span>🌱 Tận dụng chuối & men ủ:</span>
            <span className="text-amber-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
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
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0% (Cám 100%)</span>
            <span className="font-semibold text-amber-700">40% (Chuẩn men)</span>
            <span>60% (Tối đa)</span>
          </div>
        </div>
      </div>

      {/* Advanced Toggle */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-[11px] text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          <span>{showAdvanced ? "Thu gọn tùy chọn nâng cao" : "Mở rộng: Tỷ lệ sống đàn nuôi (hao hụt rét)"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Tỷ lệ sống đàn gà:</span>
              <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border text-xs">
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>85% (Rét đậm)</span>
              <span className="font-semibold text-emerald-700">95% (Chuẩn thực tế)</span>
              <span>98% (Tối ưu)</span>
            </div>
          </div>
        )}
      </div>

      {/* Output Summary Banner */}
      <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/90 text-xs space-y-1.5">
        <div className="flex justify-between items-center font-bold text-slate-900">
          <span>Doanh thu mô phỏng:</span>
          <span className="text-emerald-700 font-extrabold">{formatCurrencyVND(data.totalRevenue, 1)}</span>
        </div>
        <div className="flex justify-between items-center font-bold text-slate-900">
          <span>Lợi nhuận ròng kinh tế:</span>
          <span className="text-emerald-700 font-extrabold">+{formatCurrencyVND(data.totalNetProfit, 1)} (ROI {roi.toFixed(1)}%)</span>
        </div>
        <div className="text-[10px] text-slate-500 pt-1 border-t border-emerald-200/60">
          Tiết kiệm được <strong>{formatCurrencyVND(data.feedSavings, 1)}</strong> nhờ ủ chua thân chuối vườn và thóc ngâm mầm.
        </div>
      </div>
    </div>
  );
}
