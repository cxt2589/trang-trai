import React, { useState } from "react";
import { FileSpreadsheet, ChevronDown, ChevronUp, Info, CheckCircle2, TrendingUp, Layers, Sparkles, ArrowRight } from "lucide-react";
import { formatCurrencyVND, formatVNDRaw, formatPercent } from "../utils/calculator";

export function PLReport({ data, onOpenLivingCostTab }) {
  const [showFullTable, setShowFullTable] = useState(false);

  // List of cost breakdown items for immediate mobile reading
  const costItems = [
    {
      index: 1,
      name: "Hạ tầng, 2km ống nước, 2 điều hòa, bơm, máy cắt cỏ",
      qty: "Gói chuẩn",
      unitPrice: "CAPEX cố định",
      amount: data.capex,
      note: "Tài sản máy móc sử dụng lâu dài nhiều năm",
      badge: "Cố định",
      badgeColor: "bg-slate-100 text-slate-700"
    },
    {
      index: 2,
      name: "Giống gà Lạc Sơn 3 tháng tuổi (vỗ béo bán Tết)",
      qty: `${data.chicken3mCount} con`,
      unitPrice: "75.000 đ/con",
      amount: data.chicken3mCost,
      note: "Vào chuồng thả đồi 100 ngày đạt trọng lượng xuất chuồng",
      badge: "Xuất Tết",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      index: 3,
      name: "Giống gà Lạc Sơn 1 tháng tuổi (gối đầu sau Tết)",
      qty: `${data.chicken1mCount} con`,
      unitPrice: "12.000 đ/con",
      amount: data.chicken1mCost,
      note: "Giá giống tối ưu 12k/con, nuôi gối sóng Rằm tháng Giêng",
      badge: "12.000đ/con",
      badgeColor: "bg-blue-100 text-blue-800 font-bold"
    },
    {
      index: 4,
      name: "Giống lợn bản nhỡ F1 (12 - 15kg/con)",
      qty: `${data.pigsCount} con`,
      unitPrice: "1.200.000 đ/con",
      amount: data.pigCost,
      note: "Thả thung lũng, nuôi 100 ngày đạt chuẩn 30kg thịt thơm",
      badge: "Xuất Tết",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      index: 5,
      name: "Thức ăn 100 ngày (thóc ngâm, ngô) + Vắc xin thú y",
      qty: "100 ngày",
      unitPrice: "Ủ men vi sinh",
      amount: data.feedCost,
      note: `Đã giảm ${Math.round(data.feedSavingRate * 100)}% nhờ băm thân chuối đồi ủ men (tiết kiệm ${formatCurrencyVND(data.feedSavings, 1)})`,
      badge: "Ủ chuối men",
      badgeColor: "bg-amber-100 text-amber-800"
    }
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            3. Với Vốn {data.totalCapital.toFixed(0)} Triệu: Chi Phí Cho Từng Hạng Mục Như Thế Nào?
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Chi tiết 5 danh mục đầu tư ban đầu & bảng cân đối lãi lỗ toàn diện
          </p>
        </div>

        <button
          onClick={() => setShowFullTable(!showFullTable)}
          className="self-start sm:self-auto text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>{showFullTable ? "Thu gọn bảng P&L" : "Xem bảng P&L chuẩn"}</span>
        </button>
      </div>

      {/* MOBILE-FIRST EXECUTIVE COST CARDS (Readable on all screen sizes) */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex justify-between items-center px-1">
          <span>Phân Bổ Chi Phí Vốn Ban Đầu:</span>
          <span className="text-emerald-800 font-extrabold">Tổng: {formatCurrencyVND(data.totalCapital, 1)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {costItems.map((item) => {
            const percent = ((item.amount / data.totalCapital) * 100).toFixed(1);
            return (
              <div
                key={item.index}
                className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between hover:bg-white hover:border-emerald-300 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-black text-[11px] flex items-center justify-center flex-shrink-0">
                        {item.index}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6">
                      {item.note}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm sm:text-base font-black text-slate-900 block">
                      {formatCurrencyVND(item.amount, 1)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      ({percent}%)
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600 pl-6">
                  <span>Số lượng: <strong className="text-slate-800">{item.qty}</strong></span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Cost Summary Bar */}
        <div className="bg-slate-900 text-white rounded-xl p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold">
              TỔNG VỐN ĐẦU TƯ TOÀN CHU KỲ (CAPEX + GIỐNG + THỨC ĂN):
            </span>
          </div>
          <span className="text-base sm:text-lg font-black text-emerald-300 whitespace-nowrap ml-2">
            {formatCurrencyVND(data.totalCapital, 1)}
          </span>
        </div>

        {/* Contextual Link to Living Costs Tab */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-950">
                Chưa tính tiền ăn ở 4–5 người và lương trực 5 ngày Tết?
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                Nhờ mô hình tự cung tự cấp rau xanh, đàn gà trứng và bếp củi, chi phí giảm từ 30M xuống chỉ còn ~14M (tiết kiệm ~15M).
              </p>
            </div>
          </div>
          {onOpenLivingCostTab && (
            <button
              onClick={onOpenLivingCostTab}
              className="self-start sm:self-auto px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span>Xem Dự Toán Bếp Ăn & Trực Tết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* FULL P&L STATEMENT TABLE (Expandable or toggled) */}
      {showFullTable && (
        <div className="pt-2 animate-fadeIn space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Bảng Cân Đối Lãi Lỗ Chuẩn (P&L Financial Statement):
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase bg-slate-100/80">
                  <th className="py-2.5 px-3">Hạng Mục</th>
                  <th className="py-2.5 px-2 text-center">Số Lượng</th>
                  <th className="py-2.5 px-2 text-right">Đơn Giá</th>
                  <th className="py-2.5 px-3 text-right">Thành Tiền (Tr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {/* DOANH THU */}
                <tr className="bg-emerald-50/70 font-bold text-emerald-900 text-xs">
                  <td colSpan={4} className="py-2 px-3 uppercase">A. Doanh Thu Xuất Bán Cận Tết</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">1. Gà Lạc Sơn 3T (xuất bán Tết)</td>
                  <td className="py-2 px-2 text-center">{data.chickenSold} con</td>
                  <td className="py-2 px-2 text-right">{formatVNDRaw(data.chickenPrice)}</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatCurrencyVND(data.chickenRevenue, 2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">2. Lợn bản F1 cắp nách (30kg/con)</td>
                  <td className="py-2 px-2 text-center">{data.pigsCount} con ({data.pigTotalWeight} kg)</td>
                  <td className="py-2 px-2 text-right">{formatVNDRaw(data.pigPrice)}/kg</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatCurrencyVND(data.pigRevenue, 2)}</td>
                </tr>
                <tr className="bg-emerald-100/60 font-bold">
                  <td colSpan={3} className="py-2 px-3 text-emerald-950">TỔNG DOANH THU THU TIỀN MẶT (A)</td>
                  <td className="py-2 px-3 text-right text-emerald-800 font-black">{formatCurrencyVND(data.totalRevenue, 2)}</td>
                </tr>

                {/* CHI PHÍ */}
                <tr className="bg-slate-100 font-bold text-slate-800 text-xs">
                  <td colSpan={4} className="py-2 px-3 uppercase">B. Chi Phí Đầu Tư (CAPEX + Giống + Thức ăn)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">1. CAPEX thiết bị hạ tầng</td>
                  <td className="py-2 px-2 text-center">Gói chuẩn</td>
                  <td className="py-2 px-2 text-right">-</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatCurrencyVND(data.capex, 2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">2. Giống gà 3 tháng tuổi</td>
                  <td className="py-2 px-2 text-center">{data.chicken3mCount} con</td>
                  <td className="py-2 px-2 text-right">75.000 đ</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatCurrencyVND(data.chicken3mCost, 2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5 font-semibold text-blue-900">
                    3. Giống gà 1 tháng tuổi (12.000đ/con)
                  </td>
                  <td className="py-2 px-2 text-center font-semibold">{data.chicken1mCount} con</td>
                  <td className="py-2 px-2 text-right font-semibold text-blue-700">12.000 đ</td>
                  <td className="py-2 px-3 text-right font-bold text-blue-900">{formatCurrencyVND(data.chicken1mCost, 2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">4. Giống lợn bản nhỡ F1</td>
                  <td className="py-2 px-2 text-center">{data.pigsCount} con</td>
                  <td className="py-2 px-2 text-right">1.200.000 đ</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatCurrencyVND(data.pigCost, 2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">5. Thức ăn 100 ngày + Vắc xin (đã giảm chuối men)</td>
                  <td className="py-2 px-2 text-center">100 ngày</td>
                  <td className="py-2 px-2 text-right">-</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatCurrencyVND(data.feedCost, 2)}</td>
                </tr>
                <tr className="bg-slate-200/70 font-bold">
                  <td colSpan={3} className="py-2 px-3 text-slate-900">TỔNG VỐN ĐẦU TƯ THỰC TẾ (B)</td>
                  <td className="py-2 px-3 text-right text-slate-900 font-black">{formatCurrencyVND(data.totalCapital, 2)}</td>
                </tr>

                {/* DÒNG TIỀN MẶT CẦM VỀ */}
                <tr className="bg-blue-50 font-bold text-blue-900">
                  <td colSpan={3} className="py-2.5 px-3">
                    C. LÃI DÒNG TIỀN MẶT CẦM VỀ 28 TẾT (C = A - B)
                  </td>
                  <td className="py-2.5 px-3 text-right text-blue-700 font-black">
                    {data.cashProfit >= 0 ? `+${formatCurrencyVND(data.cashProfit, 2)}` : formatCurrencyVND(data.cashProfit, 2)}
                  </td>
                </tr>

                {/* TÀI SẢN TỒN DƯ */}
                <tr className="bg-amber-50/80 font-bold text-amber-900 text-xs">
                  <td colSpan={4} className="py-2 px-3 uppercase">D. Tài Sản Tích Lũy Còn Lại Sau Tết</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">Đàn gà 1T nuôi 100 ngày thành gà giò 4.5T</td>
                  <td className="py-2 px-2 text-center">{data.chicken1mRemaining} con</td>
                  <td className="py-2 px-2 text-right">130.000 đ</td>
                  <td className="py-2 px-3 text-right font-bold text-amber-800">{formatCurrencyVND(data.chicken1mValue, 2)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 pl-5">Thiết bị & hạ tầng (khấu hao 20% vụ 1)</td>
                  <td className="py-2 px-2 text-center">80% giá trị</td>
                  <td className="py-2 px-2 text-right">-</td>
                  <td className="py-2 px-3 text-right font-bold text-amber-800">{formatCurrencyVND(data.equipmentResidual, 2)}</td>
                </tr>
                <tr className="bg-amber-100 font-bold">
                  <td colSpan={3} className="py-2 px-3 text-amber-950">TỔNG TÀI SẢN SAU TẾT (D)</td>
                  <td className="py-2 px-3 text-right text-amber-900 font-black">+{formatCurrencyVND(data.totalPostTetAssets, 2)}</td>
                </tr>

                {/* TỔNG LỢI NHUẬN RÒNG KINH TẾ */}
                <tr className="bg-emerald-900 text-white font-bold">
                  <td colSpan={3} className="py-3 px-3">
                    E. TỔNG LỢI NHUẬN RÒNG KINH TẾ (E = C + D)
                  </td>
                  <td className="py-3 px-3 text-right text-amber-300 font-black text-base">
                    +{formatCurrencyVND(data.totalNetProfit, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
