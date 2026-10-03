import React, { useState } from "react";
import { FileSpreadsheet, ChevronDown, ChevronUp, Info, CheckCircle2, TrendingUp, HelpCircle } from "lucide-react";
import { formatCurrencyVND, formatVNDRaw, formatPercent } from "../utils/calculator";

export function PLReport({ data, onOpenGlossary }) {
  const [showFormulas, setShowFormulas] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            Bảng Cân Đối Lãi Lỗ Chi Tiết (P&L Financial Statement)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Minh bạch từng dòng mục doanh thu, chi phí biến đổi, CAPEX cố định và tài sản tích lũy
          </p>
        </div>

        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer self-start sm:self-auto flex items-center gap-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showFormulas ? "Ẩn công thức tính" : "Xem công thức tính toán"}</span>
        </button>
      </div>

      {showFormulas && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2 animate-fadeIn">
          <div className="font-bold text-slate-900 flex items-center gap-1 text-emerald-800">
            <TrendingUp className="w-4 h-4" /> Nguyên tắc tài chính chuẩn mực:
          </div>
          <p>
            • <strong>Dòng tiền mặt cầm về (Cash Flow)</strong> = Tổng doanh thu bán Tết - Tổng vốn đầu tư ban đầu (thể hiện số tiền mặt rút về sau khi hoàn 100% gốc).
          </p>
          <p>
            • <strong>Tài sản sau Tết</strong> = (Đàn gà 1T nuôi 100 ngày thành gà giò 4.5 tháng × 130.000đ) + Giá trị tài sản thiết bị còn lại sau khấu hao 20% (~32.000.000đ).
          </p>
          <p>
            • <strong>Lợi nhuận ròng kinh tế</strong> = Dòng tiền mặt thuần + Giá trị tài sản tích lũy sau Tết.
          </p>
          <p>
            • <strong>Tỷ suất ROI</strong> = (Lợi nhuận ròng kinh tế / Tổng vốn đầu tư ban đầu) × 100%.
          </p>
        </div>
      )}

      {/* Financial Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-500 text-xs uppercase bg-slate-50/80">
              <th className="py-3 px-3">Hạng Mục Tài Chính</th>
              <th className="py-3 px-2 text-center">Số Lượng</th>
              <th className="py-3 px-3 text-right">Đơn Giá Dự Kiến</th>
              <th className="py-3 px-3 text-right">Thành Tiền (VNĐ)</th>
              <th className="py-3 px-3 text-right">Quy Đổi (Tr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {/* PHẦN A: DOANH THU */}
            <tr className="bg-emerald-50/60 font-bold text-emerald-900">
              <td colSpan={5} className="py-2.5 px-3 uppercase tracking-wider text-xs">
                A. Doanh Thu Xuất Bán Cận Tết (15 - 28 Tháng Chạp)
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                1. Gà đồi Lạc Sơn 3 tháng tuổi (vỗ béo bán Tết)
                <span className="block text-[11px] text-slate-400 font-normal">Hao hụt 5%, tỷ lệ sống 95%</span>
              </td>
              <td className="py-2.5 px-2 text-center font-semibold">{data.chickenSold} con</td>
              <td className="py-2.5 px-3 text-right">{formatVNDRaw(data.chickenPrice)}</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.chickenRevenue * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                {formatCurrencyVND(data.chickenRevenue, 2)}
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                2. Lợn bản F1 cắp nách xuất chuồng
                <span className="block text-[11px] text-slate-400 font-normal">Nuôi 100 ngày đạt trọng lượng chuẩn 30kg/con</span>
              </td>
              <td className="py-2.5 px-2 text-center font-semibold">
                {data.pigsCount} con ({data.pigTotalWeight} kg)
              </td>
              <td className="py-2.5 px-3 text-right">{formatVNDRaw(data.pigPrice)}/kg</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.pigRevenue * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                {formatCurrencyVND(data.pigRevenue, 2)}
              </td>
            </tr>
            <tr className="bg-emerald-100/50 font-bold border-t border-emerald-200">
              <td className="py-3 px-3 text-emerald-950" colSpan={4}>
                TỔNG DOANH THU THU TIỀN MẶT VỤ TẾT (A)
              </td>
              <td className="py-3 px-3 text-right text-emerald-700 font-black text-base">
                {formatCurrencyVND(data.totalRevenue, 2)}
              </td>
            </tr>

            {/* PHẦN B: CHI PHÍ ĐẦU TƯ */}
            <tr className="bg-slate-100 font-bold text-slate-800">
              <td colSpan={5} className="py-2.5 px-3 uppercase tracking-wider text-xs">
                B. Chi Phí Đầu Tư Ban Đầu & Vận Hành 100 Ngày (CAPEX + OPEX)
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                1. CAPEX: Hạ tầng, 2km ống nước, 2 điều hòa, bơm, máy cắt cỏ
                <span className="block text-[11px] text-slate-400 font-normal">Tài sản cố định dùng nhiều năm</span>
              </td>
              <td className="py-2.5 px-2 text-center">Gói chuẩn</td>
              <td className="py-2.5 px-3 text-right">-</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.capex * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                {formatCurrencyVND(data.capex, 2)}
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                2. Giống gà Lạc Sơn 3 tháng tuổi (vào vỗ béo ngay)
              </td>
              <td className="py-2.5 px-2 text-center font-semibold">{data.chicken3mCount} con</td>
              <td className="py-2.5 px-3 text-right">{formatVNDRaw(75000)}</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.chicken3mCost * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                {formatCurrencyVND(data.chicken3mCost, 2)}
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                3. Giống gà Lạc Sơn 1 tháng tuổi (nuôi gối đầu sau Tết)
              </td>
              <td className="py-2.5 px-2 text-center font-semibold">{data.chicken1mCount} con</td>
              <td className="py-2.5 px-3 text-right">{formatVNDRaw(35000)}</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.chicken1mCost * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                {formatCurrencyVND(data.chicken1mCost, 2)}
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                4. Giống lợn bản nhỡ F1 (12 - 15kg/con)
              </td>
              <td className="py-2.5 px-2 text-center font-semibold">{data.pigsCount} con</td>
              <td className="py-2.5 px-3 text-right">{formatVNDRaw(1200000)}</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.pigCost * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                {formatCurrencyVND(data.pigCost, 2)}
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                5. Thức ăn 100 ngày (thóc ngâm mầm, ngô) + Thú y vắc xin
                <span className="block text-[11px] text-emerald-700 font-semibold">
                  Đã giảm {Math.round(data.feedSavingRate * 100)}% nhờ băm thân chuối đồi ủ men vi sinh (tiết kiệm {formatCurrencyVND(data.feedSavings, 1)})
                </span>
              </td>
              <td className="py-2.5 px-2 text-center">100 ngày</td>
              <td className="py-2.5 px-3 text-right">-</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.feedCost * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                {formatCurrencyVND(data.feedCost, 2)}
              </td>
            </tr>
            <tr className="bg-slate-200/70 font-bold border-t border-slate-300">
              <td className="py-3 px-3 text-slate-900" colSpan={4}>
                TỔNG VỐN ĐẦU TƯ THỰC TẾ (B = 1 + 2 + 3 + 4 + 5)
              </td>
              <td className="py-3 px-3 text-right text-slate-900 font-black text-base">
                {formatCurrencyVND(data.totalCapital, 2)}
              </td>
            </tr>

            {/* PHẦN C: DÒNG TIỀN MẶT CẦM VỀ */}
            <tr className="bg-blue-50/70 font-bold border-t-2 border-blue-200">
              <td className="py-3 px-3 text-blue-900 pl-4" colSpan={4}>
                C. LÃI RÒNG DÒNG TIỀN MẶT CẦM VỀ NGÀY 28 TẾT (C = A - B)
                <span className="block text-[11px] text-blue-700 font-normal">
                  {data.cashProfit >= 0
                    ? "Đã hoàn trả 100% gốc đầu tư, dôi dư tiền mặt cầm tay"
                    : "Thu hồi gần hết vốn tiền mặt vụ 1 (chưa tính tài sản tồn dư)"}
                </span>
              </td>
              <td className="py-3 px-3 text-right font-black text-base text-blue-700">
                {data.cashProfit >= 0 ? `+${formatCurrencyVND(data.cashProfit, 2)}` : formatCurrencyVND(data.cashProfit, 2)}
              </td>
            </tr>

            {/* PHẦN D: TÀI SẢN TÍCH LŨY CÒN LẠI */}
            <tr className="bg-amber-50/60 font-bold text-amber-900">
              <td colSpan={5} className="py-2.5 px-3 uppercase tracking-wider text-xs">
                D. Giá Trị Tài Sản Tích Lũy Còn Lại Sau Tết (Post-Tet Equity)
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                1. Đàn gà 1 tháng tuổi sau 100 ngày thành gà giò 4.5 tháng tuổi
                <span className="block text-[11px] text-slate-400 font-normal">
                  {data.chicken1mRemaining} con khỏe mạnh, sẵn sàng xuất bán dịp Rằm tháng Giêng
                </span>
              </td>
              <td className="py-2.5 px-2 text-center font-semibold">{data.chicken1mRemaining} con</td>
              <td className="py-2.5 px-3 text-right">{formatVNDRaw(130000)}</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.chicken1mValue * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-amber-800">
                {formatCurrencyVND(data.chicken1mValue, 2)}
              </td>
            </tr>
            <tr className="hover:bg-slate-50/80 transition">
              <td className="py-2.5 px-3 pl-6 font-medium">
                2. Giá trị thiết bị & đường ống nước 2km (khấu hao 20% vụ đầu)
                <span className="block text-[11px] text-slate-400 font-normal">2 điều hòa, máy bơm, máy cắt cỏ, bạt cước vẫn hoạt động tốt</span>
              </td>
              <td className="py-2.5 px-2 text-center">80% giá trị</td>
              <td className="py-2.5 px-3 text-right">-</td>
              <td className="py-2.5 px-3 text-right font-medium">
                {Math.round(data.equipmentResidual * 1000000).toLocaleString("vi-VN")} đ
              </td>
              <td className="py-2.5 px-3 text-right font-bold text-amber-800">
                {formatCurrencyVND(data.equipmentResidual, 2)}
              </td>
            </tr>
            <tr className="bg-amber-100/50 font-bold border-t border-amber-200">
              <td className="py-2.5 px-3 text-amber-950" colSpan={4}>
                TỔNG GIÁ TRỊ TÀI SẢN TÍCH LŨY CÒN NGUYÊN SAU TẾT (D)
              </td>
              <td className="py-2.5 px-3 text-right text-amber-900 font-black text-base">
                +{formatCurrencyVND(data.totalPostTetAssets, 2)}
              </td>
            </tr>

            {/* PHẦN E: LỢI NHUẬN RÒNG KINH TẾ TỔNG HỢP */}
            <tr className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white font-bold border-t-2 border-emerald-500">
              <td className="py-4 px-3 pl-4" colSpan={4}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-sm sm:text-base font-black tracking-tight text-white block">
                      E. TỔNG LỢI NHUẬN RÒNG KINH TẾ (E = C + D)
                    </span>
                    <span className="text-[11px] text-emerald-200 font-normal">
                      Lãi thực tế toàn diện: Tiền mặt dôi dư + Đàn gà giò gối đầu + Hạ tầng thiết bị
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-3 text-right font-black text-lg sm:text-xl text-amber-300">
                +{formatCurrencyVND(data.totalNetProfit, 2)}
              </td>
            </tr>

            {/* PHẦN F: CHỈ SỐ TÀI CHÍNH */}
            <tr className="bg-slate-50 font-semibold text-slate-700 text-xs">
              <td className="py-2.5 px-3" colSpan={2}>
                Tỷ suất hoàn vốn vụ 1 (ROI = E / B):
                <strong className="text-emerald-700 ml-1 font-bold">{formatPercent(data.roi, 1)}</strong>
              </td>
              <td className="py-2.5 px-3 text-center" colSpan={2}>
                Biên lợi nhuận ròng (Net Margin):
                <strong className="text-emerald-700 ml-1 font-bold">{formatPercent(data.netMargin, 1)}</strong>
              </td>
              <td className="py-2.5 px-3 text-right">
                Tỷ lệ thu hồi tiền mặt:
                <strong className="text-blue-700 ml-1 font-bold">{formatPercent(data.cashRecoveryRate, 1)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
