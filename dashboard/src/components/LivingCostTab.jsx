import React, { useState } from "react";
import {
  Utensils,
  Flame,
  Droplets,
  CalendarCheck,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Layers,
  Egg,
  Carrot,
  Trees,
  Coins,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  Gift
} from "lucide-react";
import { formatCurrencyVND } from "../utils/calculator";

export function LivingCostTab({ onSwitchToFinancialTab }) {
  const [teamSize, setTeamSize] = useState(4); // 4 or 5 people
  const [days, setDays] = useState(100); // 100 days
  const [mode, setMode] = useState("self_sufficient"); // 'self_sufficient' or 'buy_all'

  // Unit costs
  // Mode: Buy all
  const foodCostPerDayBuy = 50000; // 50k/person/day
  const gasCostBuy = 1600000; // 4 gas tanks
  const utilCostBuy = 1800000; // Electric, water, 4G
  const tetSalaryBuy = 4500000; // Outside guard

  // Mode: Self-sufficient (Tận dụng trang trại)
  const foodCostPerDaySelf = 22000; // 22k/person/day (only rice, spices, red meat, salt)
  const gasCostSelf = 400000; // Wood stove primarily, 1 mini gas
  const utilCostSelf = 1200000; // Spring water + solar LED + shared 4G
  const tetSalarySelf = 3200000; // Local trusted guard (600k/day * 5 days + gift)

  // Calculations
  const totalFoodBuy = teamSize * foodCostPerDayBuy * days;
  const totalBuy = totalFoodBuy + gasCostBuy + utilCostBuy + tetSalaryBuy;

  const totalFoodSelf = teamSize * foodCostPerDaySelf * days;
  const totalSelf = totalFoodSelf + gasCostSelf + utilCostSelf + tetSalarySelf;

  const totalCurrent = mode === "self_sufficient" ? totalSelf : totalBuy;
  const totalSaved = totalBuy - totalSelf;
  const savePercent = Math.round((totalSaved / totalBuy) * 100);

  const costItems = [
    {
      id: "food",
      name: "Tiền ăn hàng ngày (3 bữa / ngày)",
      icon: Utensils,
      color: "emerald",
      buyDaily: `${(foodCostPerDayBuy / 1000).toFixed(0)}k đ/người/ngày`,
      buyTotal: totalFoodBuy / 1000000,
      selfDaily: `${(foodCostPerDaySelf / 1000).toFixed(0)}k đ/người/ngày`,
      selfTotal: totalFoodSelf / 1000000,
      saved: (totalFoodBuy - totalFoodSelf) / 1000000,
      solution:
        "Tự trồng 4 luống rau ăn lá (cải, mồng tơi, dền); nuôi 15 con gà/vịt đẻ trứng (8-10 trứng tươi/ngày); khai thác hoa chuối, củ chuối, thân chuối xào; tỉa gà trống choai từ tháng 2. Chỉ mua gạo ngon, mắm muối, dầu ăn và cá biển/thịt đỏ đổi vị.",
      highlight: "Tiết kiệm 56% tiền chợ"
    },
    {
      id: "gas",
      name: "Năng lượng đun nấu (Gas & Đun nấu)",
      icon: Flame,
      color: "amber",
      buyDaily: "4 bình gas 12kg",
      buyTotal: gasCostBuy / 1000000,
      selfDaily: "Bếp củi đồi + 1 bình phụ",
      selfTotal: gasCostSelf / 1000000,
      saved: (gasCostBuy - gasCostSelf) / 1000000,
      solution:
        "Tận dụng 100% cành cây khô tỉa vườn, thân gỗ tạp, lá chuối khô để nhóm bếp củi nấu nước sôi, kho hầm thức ăn và nấu cám. Gas chỉ dùng đun nấu nhanh bữa sáng hoặc mưa gió.",
      highlight: "Tiết kiệm 75% tiền gas"
    },
    {
      id: "util",
      name: "Nước sinh hoạt, Đèn lán trại & 4G",
      icon: Droplets,
      color: "blue",
      buyDaily: "Điện lưới + nước đóng bình",
      buyTotal: utilCostBuy / 1000000,
      selfDaily: "Nước khe lọc + Đèn mặt trời",
      selfTotal: utilCostSelf / 1000000,
      saved: (utilCostBuy - utilCostSelf) / 1000000,
      solution:
        "Tận dụng đường ống dẫn nước khe suối tự nhiên qua bể lọc cát sỏi sinh thái; lắp 2 bóng LED năng lượng mặt trời chiếu sáng khu sinh hoạt; dùng chung 1 gói 4G phát wifi nội bộ.",
      highlight: "Tiết kiệm 33%"
    },
    {
      id: "tet",
      name: "Lương & Thù lao trực 5 ngày Tết (29 - M4)",
      icon: CalendarCheck,
      color: "purple",
      buyDaily: "Thuê bảo vệ dịch vụ ngoài",
      buyTotal: tetSalaryBuy / 1000000,
      selfDaily: "Người bản địa uy tín + Quà",
      selfTotal: tetSalarySelf / 1000000,
      saved: (tetSalaryBuy - tetSalarySelf) / 1000000,
      solution:
        "Thuê 1 người dân bản địa thân tín gần trại (họ vẫn ăn Tết ở nhà, sang trại 2-3 cữ cho ăn gà gối đầu, kiểm tra nước, bật điện canh gác ban đêm). Thù lao 600k/ngày * 5 ngày = 3.0M + lì xì 200k + tặng 1 cặp gà trống thiến đồi và giỏ quà Tết.",
      highlight: "An toàn tuyệt đối"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner Intro */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Sparkles className="w-3.5 h-3.5" />
                Hậu Cần & Bếp Ăn 0 Đồng
              </span>
              <span className="text-emerald-300 text-xs font-semibold">
                Chu kỳ {days} ngày cắm chốt
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              Dự Toán Sinh Hoạt Nhóm & Lương Trực 5 Ngày Tết
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Chiến lược khai thác nguồn thực phẩm tự nhiên, vườn rau siêu tốc và đàn gà trứng để cắt giảm tới <strong>{savePercent}% chi phí sinh hoạt</strong> mà anh em vẫn ăn ngon, đủ chất.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onSwitchToFinancialTab}
              className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>Về Kế Hoạch Vốn & P&L</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200/90 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Quy Mô Đội Ngũ Cắm Trại & Chế Độ Dự Toán
            </h3>
            <p className="text-xs text-slate-500">
              Điều chỉnh số người và so sánh trực quan giữa 2 phương án chi phí
            </p>
          </div>

          {/* Quick Preset Pickers */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Team size toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 px-2">Đội ngũ:</span>
              <button
                onClick={() => setTeamSize(4)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                  teamSize === 4
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                4 Người
              </button>
              <button
                onClick={() => setTeamSize(5)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                  teamSize === 5
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                5 Người
              </button>
            </div>

            {/* Mode toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => setMode("self_sufficient")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  mode === "self_sufficient"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Carrot className="w-3.5 h-3.5" />
                <span>Tự Cung Tự Cấp (Khuyên dùng)</span>
              </button>
              <button
                onClick={() => setMode("buy_all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  mode === "buy_all"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Mua Ngoài 100%</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Tổng chi phí 100 ngày + Tết
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {formatCurrencyVND(totalCurrent / 1000000, 1)}
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              {mode === "self_sufficient" ? "Đã áp dụng tự cấp" : "Chi trả mua ngoài hoàn toàn"}
            </span>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              Tiết kiệm được nhờ tự cấp
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">
              +{formatCurrencyVND(totalSaved / 1000000, 1)}
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold mt-0.5 block">
              Giảm {savePercent}% ngân sách sinh hoạt
            </span>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200/80">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
              Tiền ăn / người / ngày
            </span>
            <div className="text-xl sm:text-2xl font-black text-blue-900 mt-0.5">
              {mode === "self_sufficient"
                ? `${(foodCostPerDaySelf / 1000).toFixed(0)}.000 đ`
                : `${(foodCostPerDayBuy / 1000).toFixed(0)}.000 đ`}
            </div>
            <span className="text-[11px] text-blue-700 mt-0.5 block">
              {mode === "self_sufficient" ? "Chỉ tốn gia vị & thịt đỏ" : "Mua 100% tại chợ"}
            </span>
          </div>

          <div className="bg-purple-50 rounded-xl p-3 border border-purple-200/80">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
              Lương trực 5 ngày Tết
            </span>
            <div className="text-xl sm:text-2xl font-black text-purple-900 mt-0.5">
              {formatCurrencyVND(
                (mode === "self_sufficient" ? tetSalarySelf : tetSalaryBuy) / 1000000,
                1
              )}
            </div>
            <span className="text-[11px] text-purple-700 mt-0.5 block">
              29 Chạp đến hết Mùng 4 Tết
            </span>
          </div>
        </div>
      </div>

      {/* Comprehensive Comparison Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="p-3.5 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/60">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              Bảng Dự Toán So Sánh Chi Phí: Mua Ngoài vs. Tận Dụng Trang Trại
            </h3>
            <p className="text-xs text-slate-500">
              Minh bạch từng hạng mục chi phí cho nhóm {teamSize} người trong 100 ngày và giải pháp triển khai thực tế
            </p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full self-start sm:self-auto flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Giúp giữ vững dòng tiền vụ Tết
          </span>
        </div>

        {/* Desktop / Tablet Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-bold">
                <th className="py-3 px-3 sm:px-4">Hạng Mục Chi Phí</th>
                <th className="py-3 px-3 text-right">Mua Ngoài 100%</th>
                <th className="py-3 px-3 text-right bg-emerald-50/70 text-emerald-900">
                  Tận Dụng Trang Trại
                </th>
                <th className="py-3 px-3 text-right font-black text-emerald-700">Tiết Kiệm</th>
                <th className="py-3 px-3 sm:px-4">Giải Pháp Thực Chiến Cụ Thể</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {costItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 mt-0.5 flex-shrink-0">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.name}</div>
                          <span className="text-[10px] text-slate-400 font-normal">
                            Đơn giá: {item.selfDaily}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right text-slate-600 font-semibold">
                      <div className="text-slate-900 font-bold">{formatCurrencyVND(item.buyTotal, 2)}</div>
                      <div className="text-[10px] text-slate-400">{item.buyDaily}</div>
                    </td>
                    <td className="py-3.5 px-3 text-right bg-emerald-50/40 font-bold text-emerald-900">
                      <div className="text-emerald-800 text-sm font-extrabold">
                        {formatCurrencyVND(item.selfTotal, 2)}
                      </div>
                      <span className="inline-block text-[10px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.2 rounded font-semibold mt-0.5">
                        {item.highlight}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-black text-emerald-600">
                      +{formatCurrencyVND(item.saved, 2)}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-[11px] text-slate-600 leading-relaxed max-w-sm sm:max-w-md">
                      {item.solution}
                    </td>
                  </tr>
                );
              })}

              {/* Total Footer Row */}
              <tr className="bg-slate-900 text-white font-black text-xs border-t-2 border-emerald-500">
                <td className="py-3.5 px-3 sm:px-4 uppercase tracking-wider text-amber-300">
                  TỔNG CỘNG ({teamSize} NGƯỜI • {days} NGÀY + 5 NGÀY TẾT)
                </td>
                <td className="py-3.5 px-3 text-right text-slate-300">
                  {formatCurrencyVND(totalBuy / 1000000, 2)}
                </td>
                <td className="py-3.5 px-3 text-right bg-emerald-950 text-amber-300 text-sm font-black">
                  {formatCurrencyVND(totalSelf / 1000000, 2)}
                </td>
                <td className="py-3.5 px-3 text-right text-emerald-400 text-sm font-black">
                  +{formatCurrencyVND(totalSaved / 1000000, 2)}
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-emerald-200 font-semibold text-[11px]">
                  Tiết kiệm {savePercent}% ngân sách tiền mặt! Khoản dôi dư này bảo toàn 100% cho lợi nhuận cuối vụ.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Action Pillars: "Vườn Rau Siêu Tốc - Đàn Gà Trứng - Bếp Củi Rừng" */}
      <div className="space-y-3">
        <div className="px-1">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Carrot className="w-4 h-4 text-emerald-600" />
            3 Trụ Cột Tự Cung Tự Cấp Thực Chiến: "Cơm Có Rau, Bếp Có Trứng"
          </h3>
          <p className="text-xs text-slate-500">
            Kế hoạch hành động cụ thể để triển khai ngay trong 7 ngày đầu lập trại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
              <Carrot className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 text-sm">
                1. Luống Rau Ăn Lá Siêu Tốc (20 - 25 ngày)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cuốc 3–4 luống đất ngay cạnh chuồng gà, bón lót phân gà ủ hoai. Gieo hạt rau cải ngọt, cải mơ, rau dền, mồng tơi, xà lách.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Dàn quả leo bờ rào (45 ngày):
              </div>
              <div>Cắm giàn mướp hương, bí đao, đỗ cove: ngọn làm rau xào, quả để dành ăn tới tận Tết.</div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              <Egg className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 text-sm">
                2. Đàn Gà Trứng & Tỉa Đàn Nội Bộ
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đầu tư mua 12–15 con gà/vịt hậu bị đẻ trứng thải (~50k/con = 750k). Mỗi ngày nhặt 8–10 quả trứng tươi sạch, cung cấp nguồn protein rẻ nhất cho anh em.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Tỉa gà choai từ tháng thứ 2:
              </div>
              <div>Trong đàn 300-400 con, tỉa 1 con/tuần (gà còi hoặc trống gáy sớm) để bồi dưỡng bữa ăn mà không hụt sản lượng thương phẩm Tết.</div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
              <Trees className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 text-sm">
                3. Kho Báu Vườn Chuối & Bếp Củi Rừng
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vườn chuối sẵn có là nguồn thực phẩm dồi dào: hoa chuối làm nộm, nấu canh chua cá; củ chuối nấu xương; thân chuối non xào tỏi hoặc luộc chấm kho quẹt.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Bếp củi khô thay thế gas:
              </div>
              <div>Thu gom cành khô, thân gỗ tạp tỉa cành để đun nước, nấu canh, hầm thức ăn và nấu cám. Giảm tiền gas xuống mức gần như 0 đồng.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan for 5 Tet Days Guarding */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-purple-600" />
              Quy Trình & Chế Độ Trực Giữ Trang Trại 5 Ngày Tết (29 Chạp – Mùng 4)
            </h3>
            <p className="text-xs text-slate-500">
              Đảm bảo an toàn tuyệt đối cho đàn gà 1 tháng tuổi (200-400 con gối đầu) và tài sản máy móc
            </p>
          </div>
          <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-1 rounded-full self-start sm:self-auto flex items-center gap-1">
            <Gift className="w-3.5 h-3.5" />
            Thù lao 600.000đ/ngày + Quà Tết
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Card 1: Nhiệm vụ then chốt */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-purple-900">
              <Clock className="w-4 h-4 text-purple-600" />
              Nhiệm Vụ Hàng Ngày Của Người Trực Tết
            </h4>
            <ul className="space-y-2 text-slate-700 text-[11px]">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                <span><strong>Sáng (6h30 - 8h):</strong> Kiểm tra máng nước pha vitamin, lùa đàn gà 1T ra sân chơi có lưới che, cho ăn cữ 1.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                <span><strong>Trưa (11h30 - 13h):</strong> Kiểm tra hệ thống nước uống tự động, tránh tắc van; bổ sung chuối băm ủ men.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
                <span><strong>Chiều tối (17h - 18h30):</strong> Lùa gà vào chuồng kín gió, đóng chốt an toàn, bật bóng đèn sưởi ấm ban đêm (thời tiết Tết miền Bắc/miền Trung lạnh).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">4</span>
                <span><strong>Đêm:</strong> Bật đèn pha bảo vệ xung quanh khu lán trại và kho máy móc. Người trực có thể ngủ lại lán hoặc tuần tra kiểm soát.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Phương án nhân sự & Chế độ */}
          <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-200/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-purple-900">
              <Gift className="w-4 h-4 text-purple-600" />
              Phương Án Bố Trí Nhân Lực & Đãi Ngộ
            </h4>
            <div className="space-y-2 text-slate-700 text-[11px] leading-relaxed">
              <div className="p-2.5 rounded-lg bg-white border border-purple-200 space-y-1">
                <strong className="text-purple-900 block font-bold">Phương án A (Khuyên dùng): Thuê người bản địa thân tín</strong>
                <p>
                  Chọn người dân địa phương uy tín sống gần trang trại. Họ vẫn sinh hoạt ăn Tết cùng gia đình, nhưng sang trại theo 3 cữ cố định. 
                  Chi phí: <strong>600.000đ/ngày * 5 ngày = 3.000.000đ</strong> + Lì xì 200k + 1 cặp gà trống thiến đồi + Giỏ quà Tết.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-purple-200 space-y-1">
                <strong className="text-purple-900 block font-bold">Phương án B: Nhóm 4–5 anh em tự chia ca trực</strong>
                <p>
                  Chia 2 ca: Ca 1 (29 Chạp – Mùng 1) 2 người; Ca 2 (Mùng 2 – Mùng 4) 2 người. 
                  Mỗi người trực được bồi dưỡng <strong>500.000đ/ngày</strong> trích từ quỹ dự phòng + Ngân sách làm mâm cỗ tất niên giao thừa tại trại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
