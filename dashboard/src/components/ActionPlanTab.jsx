import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Carrot,
  Egg,
  Droplets,
  Flame,
  Trees,
  CheckSquare,
  Square,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Wheat,
  RotateCcw
} from "lucide-react";

export function ActionPlanTab({ onSwitchToFinancialTab, onSwitchToLivingCostTab }) {
  const [selectedPhaseId, setSelectedPhaseId] = useState(1);
  const [selectedSubDayId, setSelectedSubDayId] = useState(1); // For phase 1: 1 (day 1-3), 2 (day 4-7), 3 (day 8-14)
  const [checkedTasks, setCheckedTasks] = useState({
    "1-1": true,
    "1-2": true,
    "1-3": false,
    "2-1": false,
    "2-2": false,
    "3-1": false
  });

  const toggleTask = (taskId) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const PHASES = [
    {
      id: 1,
      name: "Giai Đoạn 1",
      timeline: "Tuần 1 – 2 (14 Ngày Vàng)",
      tag: "Trọng Yếu • Khởi Động",
      tagColor: "bg-red-100 text-red-800 border-red-200",
      title: "Hạ Tầng Nước Điện, Bếp Ăn 0đ & Đón Đàn Giống Đợt 1",
      desc: "Thời điểm then chốt nhất quyết định 80% thành bại. Thiết lập đường nước, dựng lán trại, gieo rau ăn lá, nuôi gà trứng và đưa gà 3T + lợn F1 vào chuồng an toàn.",
      hasSubDays: true
    },
    {
      id: 2,
      name: "Giai Đoạn 2",
      timeline: "Tuần 3 – 6 (Ngày 15 – 42)",
      tag: "Ổn Định Đàn",
      tagColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: "Vận Hành Chuối Men Vi Sinh & Đàn Gà Thả Đồi Thích Nghi",
      desc: "Đàn gà 3T bắt đầu leo dốc sườn đồi tập thể dục. Vận hành máy băm chuối ủ men đều đặn mỗi tuần để cắt giảm 40% chi phí cám. Vườn rau bắt đầu cho thu hoạch lứa đầu.",
      hasSubDays: false,
      tasks: [
        { id: "p2-1", role: "Người 1 (Kỹ thuật)", text: "Mở cửa chuồng thả gà 3T ra sân đồi từ 9h sáng (sau khi tan sương mù). Kiểm tra phân gà hàng ngày trên đệm lót sinh học." },
        { id: "p2-2", role: "Người 4, 5 (Bếp & Chuối)", text: "Vận hành máy băm chuối: băm 200kg thân chuối/tuần, trộn men ủ vi sinh + cám ngô + muối hạt, đóng bao ủ kín 48h làm thức ăn cho lợn và gà." },
        { id: "p2-3", role: "Người 4 (Hậu cần)", text: "Bắt đầu thu hoạch luống rau cải, dền đầu tiên (sau 20 ngày gieo). Đàn 15 con gà đẻ đạt sản lượng 8-10 trứng tươi mỗi ngày." },
        { id: "p2-4", role: "Người 2, 3 (Hạ tầng)", text: "Kiểm tra hệ thống van nước tự động 2km ống PE, vệ sinh bể lọc cát sỏi để đảm bảo nguồn nước luôn sạch thông suốt." }
      ],
      kpi: "Tỷ lệ sống đàn gà 3T > 98%; lợn F1 tăng cân đạt 18-20kg/con; đàn gà 1T hoàn thành giai đoạn úm."
    },
    {
      id: 3,
      name: "Giai Đoạn 3",
      timeline: "Tuần 7 – 10 (Ngày 43 – 70)",
      tag: "Tăng Tốc Vỗ Béo",
      tagColor: "bg-teal-100 text-teal-800 border-teal-200",
      title: "Vỗ Béo Thảo Dược, Thịt Thơm Săn Chắc & Tỉa Đàn Nội Bộ",
      desc: "Giai đoạn tích mỡ vàng, da giòn cho gà 3T. Bổ sung thóc ngâm mầm và tỏi gừng ủ men để tạo chất lượng thịt đồi đặc sản, nâng cao sức đề kháng trong mùa đông rét đậm.",
      hasSubDays: false,
      tasks: [
        { id: "p3-1", role: "Người 1 (Kỹ thuật)", text: "Pha tỏi giã ngâm giấm + rượu vào máng nước 2 lần/tuần phòng ngừa hen cúm và sưng phù đầu mùa đông." },
        { id: "p3-2", role: "Người 1, 4", text: "Ngâm 4 thùng phuy thóc mầm gối đầu. Buổi chiều cho gà ăn 100% thóc mầm để thịt gà săn chắc, thơm ngọt, không bị nhão mỡ." },
        { id: "p3-3", role: "Tất cả nhóm", text: "Bắt đầu tỉa 1-2 con gà trống choai hoặc gà còi phát triển sớm/tuần để cải thiện bữa ăn tươi cho anh em cắm trại." },
        { id: "p3-4", role: "Người 1 (Thương mại)", text: "Bắt đầu chụp ảnh, quay video gà thả đồi, lợn chạy thung lũng gửi cho khách quen, gia đình, bạn bè đặt cọc gà Tết." }
      ],
      kpi: "Gà 3T đạt trọng lượng 1.8 - 2.1kg/con; lợn F1 đạt 24 - 26kg/con; nhận cọc sớm 30% sản lượng."
    },
    {
      id: "4",
      name: "Giai Đoạn 4",
      timeline: "Tuần 11 – 13 (Ngày 71 – 90 / Đến 28 Tết)",
      tag: "Thu Tiền Mặt",
      tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "Phân Loại Gà Trống Thiến, Chốt Đơn & Xuất Bán Thu Tiền Trước 28 Tết",
      desc: "Đỉnh điểm thu hồi vốn! Toàn bộ 400 gà 3T và 3 lợn F1 được phân loại đóng lồng giao khách. Thu trọn vẹn tiền mặt về tay trước ngày 28 Chạp để hoàn vốn 100% và chia thưởng.",
      hasSubDays: false,
      tasks: [
        { id: "p4-1", role: "Người 1, 2 (Xuất bán)", text: "Phân loại gà trống đẹp mã (bán cúng Tết 220k - 250k/kg) và gà thịt thương phẩm (180k - 200k/kg). Buộc chân, đóng sọt giao hàng." },
        { id: "p4-2", role: "Người 3, 4 (Giao lợn)", text: "Bắt xuất lợn F1 đạt chuẩn 28 - 32kg cho các gia đình chung đụng thịt ăn Tết (giá 130k - 140k/kg hơi)." },
        { id: "p4-3", role: "Thủ quỹ nhóm", text: "Thu tiền mặt, đối chiếu công nợ, hoàn trả 100% vốn đầu tư ban đầu vào tài khoản chung nhóm sáng lập." },
        { id: "p4-4", role: "Người 4, 5 (Bàn giao Tết)", text: "Dọn dẹp chuồng gà 3T sau xuất bán, rải vôi khử trùng. Bàn giao quy trình cho người trực 5 ngày Tết." }
      ],
      kpi: "Xuất bán 100% gà 3T và lợn thương phẩm; thu về từ 114M - 192M tiền mặt; dôi dư tiền mặt sau khi trả hết vốn."
    },
    {
      id: 5,
      name: "Giai Đoạn 5",
      timeline: "Tuần 14+ (29 Chạp – Rằm Tháng Giêng)",
      tag: "Gối Sóng Lãi",
      tagColor: "bg-purple-100 text-purple-800 border-purple-200",
      title: "Trực Giữ 5 Ngày Tết & Gối Sóng Rằm Tháng Giêng (Đàn Gà 1T @ 12k)",
      desc: "Vận hành chế độ trực Tết 4 cữ nghiêm ngặt. Đàn gà 1 tháng (mua giá 12k) lên giò 4.5 tháng sẽ được bán vào dịp Lễ Thượng Nguyên (Rằm tháng Giêng) với giá cao nhất.",
      hasSubDays: false,
      tasks: [
        { id: "p5-1", role: "Người trực Tết (Bản địa)", text: "Thực hiện 4 cữ trực: 7h cho ăn thả gà, 12h kiểm tra nước uống tự động, 17h30 lùa gà vào chuồng đóng chốt, đêm bật đèn pha sưởi ấm." },
        { id: "p5-2", role: "Nhóm sáng lập", text: "Trao thù lao 3.2M + tặng cặp gà trống đồi + giỏ quà Tết cho người trực để động viên tinh thần." },
        { id: "p5-3", role: "Mùng 6 Tết (Tái đàn)", text: "Anh em quay trở lại trang trại chúc Tết, kiểm tra đàn gà 1T (lúc này đã là gà giò 4.5 tháng tuổi khỏe mạnh)." },
        { id: "p5-4", role: "Rằm Tháng Giêng", text: "Bán đàn gà giò đón đợt cao điểm lễ hội Thượng Nguyên, thu về thêm 37M - 50M lợi nhuận ròng mà không bị ép giá." }
      ],
      kpi: "Bảo toàn 100% tài sản máy móc và đàn 285 gà giò; thu thêm lợi nhuận đợt 2 sau Tết."
    }
  ];

  const SUB_DAYS_PHASE_1 = [
    {
      id: 1,
      name: "Ngày 1 – 3",
      tag: "Hạ Tầng & Sát Trùng",
      tagColor: "bg-red-50 text-red-700 border-red-200",
      title: "An Cư Lán Trại, Kéo Nước Mó & Sát Trùng Khử Khuẩn Chuồng",
      tasks: [
        { id: "1-1", role: "Người 2, 3 (Cơ điện)", text: "Kéo 2km ống PE phi 25 từ mó nước suối về bể lắng. Lắp phao tự động và chạy thử máy bơm công suất lớn." },
        { id: "1-2", role: "Người 4, 5 (Lán trại)", text: "Dọn dẹp lán nghỉ, mắc màn chống muỗi, kê giường bạt, dựng bếp củi che mưa để nấu nướng nước sôi." },
        { id: "1-3", role: "Người 1 (Kỹ thuật)", text: "Rải vôi bột khử trùng nền chuồng gà + bán kính 20m xung quanh. Phun thuốc sát trùng Benkocid, để trống 48-72h." },
        { id: "1-4", role: "Người 1, 2", text: "Rải lớp trấu đệm lót sinh học dày 12cm, trộn men ủ vi sinh khử mùi hôi chuồng." }
      ],
      warning: "TUYỆT ĐỐI chưa đón gà giống về trong 3 ngày đầu nếu đường nước chưa thông hoặc chuồng chưa khô vôi sát trùng."
    },
    {
      id: 2,
      name: "Ngày 4 – 7",
      tag: "Bếp 0đ & Đón Gà 3T",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      title: "Khởi Động Bếp Ăn 0 Đồng & Đón Đàn Gà 3T + Lợn Bản F1",
      tasks: [
        { id: "2-1", role: "Người 4, 5 (Bếp ăn 0đ)", text: "Cuốc 4 luống đất cạnh chuồng gà. Gieo hạt rau cải ngọt, rau dền, mồng tơi. Cắm cọc rào tra hạt bí đao, mướp." },
        { id: "2-2", role: "Người 4 (Gà trứng)", text: "Mua 12-15 con gà/vịt hậu bị đẻ thải (~50k/con = 750k). Quây góc vườn cho ăn thóc ngâm và cơm thừa." },
        { id: "2-3", role: "Người 1 (Đón gà 3T)", text: "Đón 200 - 400 gà 3 tháng tuổi về chuồng. Pha ngay nước đường Gluco-K-C + Điện giải uống 2h đầu chống sốc di chuyển." },
        { id: "2-4", role: "Người 1, 3 (Đón lợn)", text: "Đón lợn bản F1 (12 - 15kg/con) vào khu thung lũng 2. Bữa đầu cho ăn cháo loãng men vi sinh ấm bụng." }
      ],
      warning: "Gà 3T mới về phải giữ ấm trong chuồng 3-5 ngày đầu để quen cám và đệm lót trước khi thả ra sân đồi."
    },
    {
      id: 3,
      name: "Ngày 8 – 14",
      tag: "Ủ Chuối Men & Gà 1T 12k",
      tagColor: "bg-blue-50 text-blue-800 border-blue-200",
      title: "Vận Hành Băm Chuối Men Vi Sinh & Đón Đàn Gà 1T (12.000đ/con)",
      tasks: [
        { id: "3-1", role: "Người 4, 5 (Ủ chuối men)", text: "Chặt cây chuối vườn, băm nhỏ trộn cám ngô + men vi sinh + chút muối. Ủ kín bao 48h. Cho lợn và gà tập ăn dặm." },
        { id: "3-2", role: "Người 1 (Đón gà 1T)", text: "Đón đàn gà giống 1 tháng (giá tối ưu 12k/con). Bật bóng sưởi hồng ngoại kiểm soát nhiệt độ 28-30°C trong chuồng úm chắn gió." },
        { id: "3-3", role: "Người 1, 2 (Kết nối bản địa)", text: "Giao lưu với các hộ dân sống gần trại, nhắm trước 1 người đứng đắn, thật thà để đặt vấn đề phụ việc và trực 5 ngày Tết." },
        { id: "3-4", role: "Tất cả nhóm", text: "Họp đánh giá tổng kết 14 ngày đầu: kiểm tra tỷ lệ sống, điều chỉnh khẩu phần thức ăn ủ men." }
      ],
      warning: "Gà giống 1T giá 12k cần được giữ ấm tuyệt đối ban đêm, tránh gió lùa khe cửa khiến gà bị lạnh chân."
    }
  ];

  const currentPhase = PHASES.find((p) => p.id === selectedPhaseId) || PHASES[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-emerald-800/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Sparkles className="w-3.5 h-3.5" />
                Cẩm Nang Tác Chiến Thực Tế
              </span>
              <span className="text-emerald-300 text-xs font-semibold">
                Lộ Trình Thần Tốc 100 Ngày
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              Kế Hoạch Hành Động & Phân Công Tác Chiến
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Tích hợp tiến độ 5 giai đoạn, kế hoạch <strong>14 ngày vàng đầu tiên</strong>, phân vai cụ thể cho 4–5 người và cẩm nang kiểm soát rủi ro thực địa.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={onSwitchToFinancialTab}
              className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Về Kế Hoạch Vốn & P&L</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onSwitchToLivingCostTab}
              className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>Xem Bếp Ăn & Trực Tết</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-5 Persons Team Role Distribution Cards */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            Bảng Phân Công Nhiệm Vụ Đội Ngũ 4 – 5 Người (Tránh Dẫm Chân Nhau)
          </h3>
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold hidden sm:inline-block">
            Cố định trách nhiệm theo chuyên môn
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Person 1 */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-950 uppercase">Người 1: Trưởng Trại</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded">Kỹ Thuật & Thú Y</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Chịu trách nhiệm về tỷ lệ sống của đàn gà Lạc Sơn và lợn F1, lịch vắc-xin, độ ấm chuồng, kiểm soát đệm lót sinh học và phân loại xuất bán ngày Tết.
            </p>
          </div>

          {/* Person 2 & 3 */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-950 uppercase">Người 2 & 3: Cơ Điện</span>
              <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-1.5 py-0.2 rounded">Hạ Tầng & Nước</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Kéo 2km ống nước từ mó suối, lắp máy bơm, điều hòa, quây lưới B40 sân đồi, bảo dưỡng máy cắt cỏ, kiểm tra hệ thống máng nước tự động không bị tắc.
            </p>
          </div>

          {/* Person 4 & 5 */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-950 uppercase">Người 4 & 5: Hậu Cần</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded">Bếp Ăn & Chuối Men</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Lo chỗ ăn ngủ lán trại, gom củi đun bếp, cuốc 4 luống rau ăn lá siêu tốc, chăm đàn 15 gà đẻ trứng, vận hành máy băm chuối vườn ủ men vi sinh hàng tuần.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Phase Interactive Timeline Navigation Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            Chọn Giai Đoạn Để Xem Lộ Trình & Nhiệm Vụ Chi Tiết
          </h3>
          <p className="text-xs text-slate-500">
            Bấm chọn từng giai đoạn để bung ra toàn bộ checklist công việc và mẹo kiểm soát rủi ro
          </p>
        </div>

        {/* Phase buttons row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PHASES.map((phase) => {
            const isSelected = selectedPhaseId === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`p-2.5 sm:p-3 rounded-xl border-2 text-left transition flex flex-col justify-between cursor-pointer active:scale-[0.98] ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {phase.name}
                    </span>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full border ${phase.tagColor}`}>
                      {phase.timeline.split("(")[0]}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {phase.title}
                  </h4>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? "text-emerald-700 font-bold" : "text-slate-400"}>
                    {isSelected ? "Đang chọn xem" : "Bấm để xem"}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-600" : "text-slate-400"}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE PHASE DETAIL CARD */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                  {currentPhase.name}: {currentPhase.timeline}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${currentPhase.tagColor}`}>
                  {currentPhase.tag}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                {currentPhase.title}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed max-w-3xl">
                {currentPhase.desc}
              </p>
            </div>
          </div>

          {/* SPECIAL IN-DEPTH SUB-DAYS FOR PHASE 1 */}
          {currentPhase.hasSubDays && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  Kế Hoạch Tác Chiến Chi Tiết Từng Ngày (14 Ngày Vàng Đầu Tiên):
                </h4>
                <span className="text-[11px] text-slate-400">Nhấp chọn để xem từng chặng</span>
              </div>

              {/* Sub-day Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SUB_DAYS_PHASE_1.map((sub) => {
                  const isSubActive = selectedSubDayId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubDayId(sub.id)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                        isSubActive
                          ? "bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20"
                          : "bg-slate-100/70 border-slate-200 hover:bg-white text-slate-600"
                      }`}
                    >
                      <div>
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded border ${sub.tagColor}`}>
                          {sub.name}
                        </span>
                        <div className="text-xs font-bold text-slate-900 mt-1 truncate">
                          {sub.tag}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSubActive ? "text-emerald-600" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Active Sub-day Details */}
              {(() => {
                const activeSub = SUB_DAYS_PHASE_1.find((s) => s.id === selectedSubDayId) || SUB_DAYS_PHASE_1[0];
                return (
                  <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 space-y-3 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                      <div className="font-bold text-xs sm:text-sm text-slate-900">
                        {activeSub.name}: {activeSub.title}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Bấm vào ô vuông để đánh dấu hoàn thành
                      </span>
                    </div>

                    {/* Task checklist */}
                    <div className="space-y-2">
                      {activeSub.tasks.map((task) => {
                        const isDone = !!checkedTasks[task.id];
                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`p-2.5 rounded-xl border transition flex items-start gap-2.5 cursor-pointer ${
                              isDone
                                ? "bg-emerald-50/50 border-emerald-300 text-slate-800"
                                : "bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700"
                            }`}
                          >
                            <div className="mt-0.5 flex-shrink-0 text-emerald-600">
                              {isDone ? (
                                <CheckSquare className="w-4 h-4" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <div className="text-xs leading-relaxed flex-1">
                              <span className="font-bold text-slate-900 mr-1.5 bg-slate-200/80 px-1.5 py-0.2 rounded text-[10px]">
                                {task.role}:
                              </span>
                              <span className={isDone ? "line-through text-slate-500" : "text-slate-800 font-medium"}>
                                {task.text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Warning tip */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Lưu ý sống còn:</strong> {activeSub.warning}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TASKS FOR PHASE 2, 3, 4, 5 */}
          {!currentPhase.hasSubDays && currentPhase.tasks && (
            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Nhiệm Vụ Thực Hiện Trọng Tâm:
                </h4>
                <span className="text-[11px] text-slate-400">Bấm ô vuông để đánh dấu hoàn thành</span>
              </div>

              <div className="space-y-2">
                {currentPhase.tasks.map((task) => {
                  const isDone = !!checkedTasks[task.id];
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-2.5 rounded-xl border transition flex items-start gap-2.5 cursor-pointer ${
                        isDone
                          ? "bg-emerald-50/50 border-emerald-300 text-slate-800"
                          : "bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0 text-emerald-600">
                        {isDone ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="text-xs leading-relaxed flex-1">
                        <span className="font-bold text-slate-900 mr-1.5 bg-slate-200/80 px-1.5 py-0.2 rounded text-[10px]">
                          {task.role}:
                        </span>
                        <span className={isDone ? "line-through text-slate-500" : "text-slate-800 font-medium"}>
                          {task.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentPhase.kpi && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2.5 text-[11px] text-emerald-950 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Chỉ tiêu nghiệm thu (KPI):</strong> {currentPhase.kpi}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
