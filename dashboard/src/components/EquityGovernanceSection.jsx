import React, { useState } from "react";
import {
  Users,
  ShieldCheck,
  DollarSign,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Lock,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Building2,
  FileText
} from "lucide-react";

export function EquityGovernanceSection({
  onSwitchToCashFlowTab
}) {
  // State chọn phương án của TA: "option_cash" (Góp 130M tiền mặt) hoặc "option_sweat" (Góp công, trả góp vốn)
  const [taOption, setTaOption] = useState("option_sweat"); // default kịch bản thực tế của TA

  // Format tiền tệ VNĐ
  const fmtVND = (num) => new Intl.NumberFormat("vi-VN").format(Math.round(num));
  const fmtM = (num) => (num / 1000000).toFixed(1) + "M";

  // Số liệu tài chính quy mô ổn định (xuất chuồng 3.002 con/tháng, 1.2kg, 180k/kg)
  const monthlyRevenue = 648432000; // Doanh thu
  const monthlyOpex = 190040000; // Gồm giống (44.2M), cám & thức ăn (95M), lương 6 người (42M - gồm 7M TA), thú y (8.7M)
  const monthlyGrossProfit = monthlyRevenue - monthlyOpex; // 458.392.000 đ
  const monthlyReserve10Pct = monthlyRevenue * 0.10; // 64.843.200 đ (trích 10% doanh thu dự phòng)
  const distributableProfitMonthly = monthlyGrossProfit - monthlyReserve10Pct; // 393.548.800 đ

  // Phân bổ 50% tháng - 50% quý
  const payoutMonthlyPool = distributableProfitMonthly * 0.50; // 196.774.400 đ
  const payoutQuarterlyPool = payoutMonthlyPool * 3; // 590.323.200 đ / Quý

  // Tính toán phần của TA (25% cổ phần)
  const taBaseSalary = 7000000; // Lương cứng hàng tháng
  const taFullMonthlyShare = payoutMonthlyPool * 0.25; // 49.193.600 đ
  const taFullQuarterlyShare = payoutQuarterlyPool * 0.25; // 147.580.800 đ

  // Phương án 1: Góp đủ 130M tiền mặt
  const pa1 = {
    monthlyTakeHome: taBaseSalary + taFullMonthlyShare, // 56.193.600 đ
    quarterlyTakeHome: taBaseSalary + taFullMonthlyShare + taFullQuarterlyShare, // 203.774.400 đ
    annualTotalTakeHome: taBaseSalary * 12 + taFullMonthlyShare * 12 + taFullQuarterlyShare * 4, // 1.264.646.400 đ
    capitalDebt: 0,
    debtFreeMonths: 0
  };

  // Phương án 2: Góp mồ hôi, trả góp 130M qua 50% lợi tức
  const pa2_deductionMonthly = taFullMonthlyShare * 0.50; // 24.596.800 đ/tháng trừ nợ
  const pa2_takeHomeMonthlyDuringDebt = taBaseSalary + taFullMonthlyShare * 0.50; // 31.596.800 đ/tháng cầm về
  const pa2_deductionQuarterly = taFullQuarterlyShare * 0.50; // 73.790.400 đ/quý trừ nợ
  const pa2_takeHomeQuarterlyDuringDebt = taBaseSalary + taFullMonthlyShare * 0.50 + taFullQuarterlyShare * 0.50; // 105.387.200 đ

  // Tổng nợ trả sau 3 tháng đầu
  const totalRepaidAfterQ1 = pa2_deductionMonthly * 3 + pa2_deductionQuarterly; // 147.580.800 đ > 130M
  const isDebtFreeAfterQ1 = totalRepaidAfterQ1 >= 130000000;

  return (
    <section id="section-equity-governance" className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/90 space-y-6">
      {/* 1. Header & Tiêu đề phân hệ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-900 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-purple-200">
              <Scale className="w-3.5 h-3.5" />
              Cơ Cấu Quản Trị & Cổ Phần
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">•</span>
            <span className="text-slate-600 text-xs font-medium hidden sm:inline">
              Mô hình 3 Cổ đông sáng lập + 1 Quỹ dự phòng
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            8. Cơ Cấu Cổ Phần, Quyền Lực & Chính Sách Phân Phối Lợi Tức (T, TA, H)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cơ chế phân quyền chuẩn startup nông nghiệp: bảo vệ quyền điều hành của Chủ tịch (T), tôn trọng quyền sử dụng đất của Chủ đất (H), và kích hoạt tối đa động lực cống hiến của Giám đốc Vận hành (TA).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-xl">
            Sạch nợ từ T09/2027 • Kích hoạt chia lãi từ T10/2027
          </span>
        </div>
      </div>

      {/* 2. Thẻ 4 Cổ đông / Cơ cấu 100% Cổ phần */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Cổ đông 1: T */}
        <div className="bg-gradient-to-b from-indigo-50/70 to-white rounded-xl p-4 border border-indigo-200/80 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-950 uppercase tracking-wide">
                Cổ đông T
              </span>
              <span className="bg-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded-lg shadow-xs">
                35% Cổ Phần
              </span>
            </div>
            <div className="text-xs font-extrabold text-indigo-700 mt-1">
              Chủ Tịch HĐQT (Chairman)
            </div>
            <div className="mt-2 text-[11px] text-slate-600 space-y-1">
              <div>• <strong>Vai trò:</strong> Cầu nối mối quan hệ, công nghệ, quản trị tài chính & tìm kênh tiêu thụ đặc sản (180k–250k/kg).</div>
              <div>• <strong>Quyền biểu quyết:</strong> <span className="font-bold text-indigo-900">55%</span> (gồm 35% sở hữu + 20% ủy quyền từ Quỹ dự phòng), đảm bảo quyền phủ quyết và không bị bế tắc cổ đông.</div>
            </div>
          </div>
          <div className="pt-2 border-t border-indigo-100 text-[10px] font-bold text-indigo-900 bg-indigo-50/80 p-2 rounded-lg">
            🔑 Giữ lá phiếu quyết định (Casting Vote) khi biểu quyết hòa & duyệt chi lớn.
          </div>
        </div>

        {/* Cổ đông 2: TA */}
        <div className="bg-gradient-to-b from-emerald-50/70 to-white rounded-xl p-4 border border-emerald-200/80 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                Cổ đông TA
              </span>
              <span className="bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded-lg shadow-xs">
                25% Cổ Phần
              </span>
            </div>
            <div className="text-xs font-extrabold text-emerald-700 mt-1">
              Giám Đốc Vận Hành (COO)
            </div>
            <div className="mt-2 text-[11px] text-slate-600 space-y-1">
              <div>• <strong>Vai trò:</strong> Trực tiếp ở trại 24/7, kỹ thuật úm, thú y, chế độ xả cám về 0%, quản lý 4–6 thợ & nhân công.</div>
              <div>• <strong>Lương cứng 2026–2027:</strong> <span className="font-bold text-emerald-900">7.000.000 đ/tháng</span> (tính vào OPEX chi phí, không trừ vào % lợi tức).</div>
              <div>• <strong>Lộ trình 2028:</strong> Tăng lên <span className="font-bold text-emerald-900">30% cổ phần</span>, chính thức cắt lương cứng để hưởng 100% lợi tức làm chủ.</div>
            </div>
          </div>
          <div className="pt-2 border-t border-emerald-100 text-[10px] font-bold text-emerald-900 bg-emerald-50/80 p-2 rounded-lg">
            🍗 Toàn quyền điều hành kỹ thuật, an toàn sinh học & công tác thực địa.
          </div>
        </div>

        {/* Cổ đông 3: H */}
        <div className="bg-gradient-to-b from-amber-50/70 to-white rounded-xl p-4 border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                Cổ đông H
              </span>
              <span className="bg-amber-600 text-white font-black text-xs px-2 py-0.5 rounded-lg shadow-xs">
                20% Cổ Phần
              </span>
            </div>
            <div className="text-xs font-extrabold text-amber-800 mt-1">
              Hội Đồng Quản Trị (Chủ Đất)
            </div>
            <div className="mt-2 text-[11px] text-slate-600 space-y-1">
              <div>• <strong>Đóng góp:</strong> Quyền sử dụng 2.0 ha đất đồi trong 10 năm (quy đổi 0đ tiền thuê đất) + góp thêm tiền vốn/con giống.</div>
              <div>• <strong>Vai trò:</strong> Pháp lý đất đai 10 năm, bảo đảm an ninh trật tự, quan hệ chính quyền địa phương, nguồn tre nứa & giống tại chỗ.</div>
            </div>
          </div>
          <div className="pt-2 border-t border-amber-100 text-[10px] font-bold text-amber-950 bg-amber-50/80 p-2 rounded-lg">
            📜 Cam kết đất 10 năm, không đơn phương thu hồi trước hạn.
          </div>
        </div>

        {/* Cổ phần dự phòng: 20% */}
        <div className="bg-gradient-to-b from-purple-50/70 to-white rounded-xl p-4 border border-purple-200/80 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-950 uppercase tracking-wide">
                Quỹ Dự Phòng
              </span>
              <span className="bg-purple-600 text-white font-black text-xs px-2 py-0.5 rounded-lg shadow-xs">
                20% Cổ Phần
              </span>
            </div>
            <div className="text-xs font-extrabold text-purple-800 mt-1">
              Quỹ Tăng Trưởng (Giữ 2 Năm)
            </div>
            <div className="mt-2 text-[11px] text-slate-600 space-y-1">
              <div>• <strong>Phân bổ dự kiến:</strong> 10% Quỹ ESOP thưởng gắn bó cho TA/kỹ thuật + 10% dành cho Nhà đầu tư chiến lược mở rộng chuỗi.</div>
              <div>• <strong>Lợi tức 20% này:</strong> Giữ lại 100% cho công ty, nhập vào Quỹ Tái Đầu Tư (mua thức ăn dự trữ, mở rộng hạ tầng).</div>
            </div>
          </div>
          <div className="pt-2 border-t border-purple-100 text-[10px] font-bold text-purple-900 bg-purple-50/80 p-2 rounded-lg">
            🛡️ Do Chủ tịch HĐQT (T) đại diện ủy quyền biểu quyết trong 2 năm đầu.
          </div>
        </div>
      </div>

      {/* 3. BỘ CHUYỂN ĐỔI KỊCH BẢN THỰC NHẬN CỦA TA (INTERACTIVE SIMULATOR) */}
      <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Mô Phỏng Tài Chính Cá Nhân
            </span>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Thực Tế TA Nhận Về Hàng Tháng & Hàng Quý (25% Lợi Tức + 7M Lương)
            </h4>
            <p className="text-xs text-slate-500">
              Chuyển đổi giữa 2 kịch bản đóng góp vốn của TA để xem số tiền mặt thực tế cầm về túi:
            </p>
          </div>

          {/* Toggle Button */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setTaOption("option_cash")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                taOption === "option_cash"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Phương Án 1: TA Góp 130M Tiền Mặt
            </button>
            <button
              onClick={() => setTaOption("option_sweat")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                taOption === "option_sweat"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Phương Án 2: TA Góp Công (Trả Góp 130M)
            </button>
          </div>
        </div>

        {/* Hiển thị chi tiết số tiền của phương án đang chọn */}
        {taOption === "option_cash" ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Thẻ 1 */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Hàng Tháng Bình Thường (T1, T2)</span>
                <div className="text-lg sm:text-xl font-black text-emerald-700">
                  {fmtVND(pa1.monthlyTakeHome)} đ
                </div>
                <div className="text-[11px] text-slate-500">
                  = Lương cứng <strong>7M</strong> + 50% lợi tức tháng (<strong>{fmtM(taFullMonthlyShare)}</strong>)
                </div>
              </div>

              {/* Thẻ 2 */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Tháng Cuối Quý (T3, T6, T9, T12)</span>
                <div className="text-lg sm:text-xl font-black text-indigo-700">
                  {fmtVND(pa1.quarterlyTakeHome)} đ
                </div>
                <div className="text-[11px] text-slate-500">
                  = Lương 7M + Lợi tức tháng ({fmtM(taFullMonthlyShare)}) + Lợi tức quý (<strong>{fmtM(taFullQuarterlyShare)}</strong>)
                </div>
              </div>

              {/* Thẻ 3 */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Tổng Thu Nhập Cả Năm (12 Tháng)</span>
                <div className="text-lg sm:text-xl font-black text-slate-900">
                  {fmtVND(pa1.annualTotalTakeHome)} đ
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  Bình quân: ~{fmtM(pa1.annualTotalTakeHome / 12)} / tháng • Không nợ vốn
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Đặc điểm Phương án 1:</strong> TA nộp 130 triệu tiền mặt vào T10/2026. TA sở hữu vĩnh viễn 25% cổ phần từ ngày đầu, nhận trọn vẹn 100% phần chia cổ tức mà không bị cấn trừ bất cứ khoản nào. Dự án có dồi dào tiền mặt 260M ban đầu, áp lực vay trước Tết giảm về 0.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Thẻ 1 */}
              <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Hàng Tháng (Trong 3 tháng đầu)</span>
                <div className="text-lg sm:text-xl font-black text-amber-700">
                  {fmtVND(pa2_takeHomeMonthlyDuringDebt)} đ
                </div>
                <div className="text-[11px] text-slate-500">
                  = Lương <strong>7M</strong> + 50% tiền mặt rút ({fmtM(pa2_deductionMonthly)}) <br/>
                  <span className="text-amber-800 font-semibold">• Trừ nợ 130M: {fmtM(pa2_deductionMonthly)}/tháng</span>
                </div>
              </div>

              {/* Thẻ 2 */}
              <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Cuối Quý 1 (Tháng thứ 3 có lãi)</span>
                <div className="text-lg sm:text-xl font-black text-indigo-700">
                  {fmtVND(pa2_takeHomeQuarterlyDuringDebt)} đ
                </div>
                <div className="text-[11px] text-slate-500">
                  = Lương 7M + Lợi tức tháng ({fmtM(pa2_deductionMonthly)}) + 50% Quý ({fmtM(pa2_deductionQuarterly)}) <br/>
                  <span className="text-emerald-700 font-bold">• Trừ nợ quý: {fmtM(pa2_deductionQuarterly)} $\rightarrow$ TRẢ SẠCH NỢ!</span>
                </div>
              </div>

              {/* Thẻ 3 */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Từ Tháng Thứ 4 Trở Đi (Sạch Nợ)</span>
                <div className="text-lg sm:text-xl font-black text-emerald-700">
                  {fmtVND(pa1.monthlyTakeHome)} đ / tháng
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  Sạch nợ vốn 130M sau đúng 1 Quý! Chuyển sang nhận 100% như PA 1 (cuối quý nhận {fmtM(pa1.quarterlyTakeHome)}).
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Cơ chế trả góp mồ hôi siêu tốc:</strong> TA không phải bỏ đồng tiền túi nào. Công ty ghi nhận TA nợ vốn 130M không lãi. Mỗi tháng TA vẫn cầm về chắc chắn <strong>{fmtM(pa2_takeHomeMonthlyDuringDebt)} tiền mặt</strong> để sinh hoạt gia đình. Chỉ sau đúng <strong>1 Quý (3 tháng đầu)</strong> trích 50% lợi tức là TA đã trả đủ <strong>147,6M &gt; 130M</strong> nợ vốn và chính thức sở hữu 25% danh chính ngôn thuận!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. SƠ ĐỒ DÒNG TIỀN PHÂN PHỐI LỢI NHUẬN TRANG TRẠI (QUY MÔ 3.000 CON/THÁNG) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            Sơ Đồ Phân Phối Lợi Nhuận Trang Trại Hàng Tháng (Ổn Định 3.002 Con/Tháng)
          </h4>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Đơn vị: VNĐ / tháng
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Doanh Thu</div>
            <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{fmtM(monthlyRevenue)}</div>
            <div className="text-[10px] text-slate-400">3.002 con × 1.2kg × 180k</div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Tổng OPEX</div>
            <div className="text-xs sm:text-sm font-black text-rose-700 mt-0.5">({fmtM(monthlyOpex)})</div>
            <div className="text-[10px] text-slate-400">Gồm lương 6ng (42M)</div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Quỹ Dự Phòng (10%)</div>
            <div className="text-xs sm:text-sm font-black text-amber-700 mt-0.5">({fmtM(monthlyReserve10Pct)})</div>
            <div className="text-[10px] text-slate-400">10% DT giữ lại két</div>
          </div>

          <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
            <div className="text-[10px] font-bold text-emerald-800 uppercase">Lợi Nhuận Chia (100%)</div>
            <div className="text-xs sm:text-sm font-black text-emerald-700 mt-0.5">{fmtM(distributableProfitMonthly)}</div>
            <div className="text-[10px] text-emerald-600">Lợi nhuận ròng chia</div>
          </div>

          <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-200">
            <div className="text-[10px] font-bold text-indigo-800 uppercase">Chia Hàng Tháng (50%)</div>
            <div className="text-xs sm:text-sm font-black text-indigo-700 mt-0.5">{fmtM(payoutMonthlyPool)}</div>
            <div className="text-[10px] text-indigo-600">Chi trả ngày 05 hàng tháng</div>
          </div>

          <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200">
            <div className="text-[10px] font-bold text-purple-800 uppercase">Chia Theo Quý (50%)</div>
            <div className="text-xs sm:text-sm font-black text-purple-700 mt-0.5">{fmtM(payoutQuarterlyPool)} / Q</div>
            <div className="text-[10px] text-purple-600">3 tháng quyết toán 1 lần</div>
          </div>
        </div>

        {/* Bảng phân chia cụ thể cho từng cổ đông */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 mt-3">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="p-2.5">Cổ Đông</th>
                <th className="p-2.5 text-center">Tỷ Lệ %</th>
                <th className="p-2.5 text-right">Lương Cứng / Tháng</th>
                <th className="p-2.5 text-right">Chia Hàng Tháng (50%)</th>
                <th className="p-2.5 text-right">Chia Theo Quý (50%)</th>
                <th className="p-2.5 text-right font-black">Ước Tính Cả Năm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              <tr className="hover:bg-slate-50/80">
                <td className="p-2.5 font-bold text-indigo-900">T (Chủ tịch HĐQT)</td>
                <td className="p-2.5 text-center font-bold">35%</td>
                <td className="p-2.5 text-right text-slate-400 font-mono">-</td>
                <td className="p-2.5 text-right font-mono font-semibold text-indigo-700">{fmtVND(payoutMonthlyPool * 0.35)}</td>
                <td className="p-2.5 text-right font-mono font-semibold text-indigo-700">{fmtVND(payoutQuarterlyPool * 0.35)}</td>
                <td className="p-2.5 text-right font-mono font-black text-indigo-950">{fmtVND(distributableProfitMonthly * 12 * 0.35)}</td>
              </tr>
              <tr className="hover:bg-slate-50/80 bg-emerald-50/30">
                <td className="p-2.5 font-bold text-emerald-900">TA (Giám đốc Vận hành)</td>
                <td className="p-2.5 text-center font-bold">25%</td>
                <td className="p-2.5 text-right font-mono font-bold text-emerald-800">7.000.000 đ</td>
                <td className="p-2.5 text-right font-mono font-semibold text-emerald-700">{fmtVND(payoutMonthlyPool * 0.25)}</td>
                <td className="p-2.5 text-right font-mono font-semibold text-emerald-700">{fmtVND(payoutQuarterlyPool * 0.25)}</td>
                <td className="p-2.5 text-right font-mono font-black text-emerald-950">
                  {fmtVND(7000000 * 12 + distributableProfitMonthly * 12 * 0.25)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="p-2.5 font-bold text-amber-900">H (Chủ đất)</td>
                <td className="p-2.5 text-center font-bold">20%</td>
                <td className="p-2.5 text-right text-slate-400 font-mono">-</td>
                <td className="p-2.5 text-right font-mono font-semibold text-amber-700">{fmtVND(payoutMonthlyPool * 0.20)}</td>
                <td className="p-2.5 text-right font-mono font-semibold text-amber-700">{fmtVND(payoutQuarterlyPool * 0.20)}</td>
                <td className="p-2.5 text-right font-mono font-black text-amber-950">{fmtVND(distributableProfitMonthly * 12 * 0.20)}</td>
              </tr>
              <tr className="hover:bg-slate-50/80 bg-purple-50/30">
                <td className="p-2.5 font-bold text-purple-900">Quỹ Tái Đầu Tư (20% dự phòng)</td>
                <td className="p-2.5 text-center font-bold">20%</td>
                <td className="p-2.5 text-right text-slate-400 font-mono">-</td>
                <td className="p-2.5 text-right font-mono font-semibold text-purple-700">{fmtVND(payoutMonthlyPool * 0.20)}</td>
                <td className="p-2.5 text-right font-mono font-semibold text-purple-700">{fmtVND(payoutQuarterlyPool * 0.20)}</td>
                <td className="p-2.5 text-right font-mono font-black text-purple-950">{fmtVND(distributableProfitMonthly * 12 * 0.20)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. QUY CHẾ THOÁI VỐN KHI CÓ MÂU THUẪN (EXIT & BUYBACK CLAUSE) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
              Quy Chế Thoái Vốn & Bán Lại Cổ Phần Khi Phát Sinh Mâu Thuẫn (Exit & Buyback)
            </h4>
          </div>
          <span className="text-[11px] text-slate-500">
            Tính theo giá trị sổ sách sau khấu hao chuồng trại
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-3 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-rose-900">
              <span>Năm Thứ 1 (&lt; 12 tháng)</span>
              <span className="bg-rose-200 text-rose-900 text-[10px] px-1.5 py-0.2 rounded font-black">Phạt 50%</span>
            </div>
            <p className="text-rose-800 text-[11px] leading-relaxed">
              Nhận <strong>50% giá trị cổ phần</strong> còn lại sau khấu hao. 50% còn lại bị phạt thu hồi về công ty vì vi phạm cam kết giai đoạn đầu.
            </p>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-amber-900">
              <span>Năm Thứ 2 (12 – 24 tháng)</span>
              <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-black">Phạt 25%</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              Nhận <strong>75% giá trị cổ phần</strong> còn lại sau khấu hao. 25% còn lại giữ lại bù đắp chi phí tái cấu trúc người thay thế.
            </p>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-blue-900">
              <span>Năm Thứ 3 (24 – 36 tháng)</span>
              <span className="bg-blue-200 text-blue-900 text-[10px] px-1.5 py-0.2 rounded font-black">Phạt 15%</span>
            </div>
            <p className="text-blue-800 text-[11px] leading-relaxed">
              Nhận <strong>85% giá trị cổ phần</strong> còn lại sau khấu hao. Hoàn tất phần lớn nghĩa vụ cam kết.
            </p>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-emerald-900">
              <span>Sau 3 Năm (Hết khấu hao)</span>
              <span className="bg-emerald-200 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded font-black">Nhận 100%</span>
            </div>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              Nhận <strong>100% giá trị sổ sách còn lại</strong>. Cổ đông có quyền chuyển nhượng tự do cho cổ đông còn lại hoặc bên thứ ba được HĐQT duyệt.
            </p>
          </div>
        </div>

        {/* Nguyên tắc chi trả bảo vệ dòng tiền */}
        <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Nguyên tắc chi trả mua lại cổ phần không làm sập dòng tiền:</strong> Công ty không chi trả một cục làm vỡ két tiền mặt, mà chuyển thành khoản nợ nội bộ không lãi suất và trích <strong>25% – 50% lợi nhuận thặng dư hàng tháng</strong> để trả góp dần cho người rút vốn cho đến khi hết nợ. Cổ đông rút lui <strong>chấm dứt hoàn toàn quyền biểu quyết và can thiệp vận hành</strong> ngay khi ký biên bản thoái vốn.
          </div>
        </div>
      </div>
    </section>
  );
}
