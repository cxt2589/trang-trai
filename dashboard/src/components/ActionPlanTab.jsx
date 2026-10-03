import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Check,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Truck,
  Zap,
  Hammer,
  UtensilsCrossed,
  HeartHandshake
} from "lucide-react";

export function ActionPlanTab({ onSwitchToFinancialTab, onSwitchToLivingCostTab }) {
  const [selectedPhaseId, setSelectedPhaseId] = useState(1);
  const [selectedSubDayId, setSelectedSubDayId] = useState(1); // 1, 2, 3, 4, 5 for Phase 1
  const [checkedTasks, setCheckedTasks] = useState({
    "1-1": true,
    "1-2": true,
    "2-1": false,
    "2-2": false,
    "3-1": false,
    "4-1": false,
    "5-1": false
  });

  const toggleTask = (taskId) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const SUB_STAGES_PHASE_1 = [
    {
      id: 1,
      timeline: "Ngày 1 – 3",
      title: "Máy Xúc Mở Đường & Khai Hoang Mặt Bằng",
      badge: "Ưu Tiên Số 1",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      icon: Truck,
      tasks: [
        {
          id: "1-1",
          role: "Máy xúc & Trưởng trại",
          text: "Thuê 1 máy xúc làm việc 3 ngày: Mở rộng, bạt taluy, san phẳng đường giao thông từ ngoài vào trại để xe tải chở vật tư vào tận nơi."
        },
        {
          id: "1-2",
          role: "Máy xúc",
          text: "San ủi tạo mặt bằng phẳng phiu cho 2 khu chuồng gà (ô gà 3T và ô gà 1T) cùng khu vực dựng lán trại ăn nghỉ."
        },
        {
          id: "1-3",
          role: "Máy xúc & Cơ điện",
          text: "Múc rãnh thoát nước dọc sườn đồi chống lũ quét/ngập úng mùa đông, tạo vũng bùn tự nhiên ở thung lũng 2 cho đàn lợn."
        },
        {
          id: "1-4",
          role: "Người 2, 3 (Dọn cỏ)",
          text: "Chạy máy cắt cỏ dọn sạch cỏ dại hai bên đường đi huyết mạch và toàn bộ khuôn viên khu lán trại."
        }
      ],
      caution: "Đường đi chưa thông thì tuyệt đối không chở vật tư hay con giống vào vì sẽ bị kẹt xe và hư hỏng thiết bị."
    },
    {
      id: 2,
      timeline: "Ngày 4 – 6",
      title: "Kéo Điện, Lắp 2 Điều Hòa, Giường Chiếu & Nước Mó",
      badge: "An Cư Cho 4-5 Người",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Zap,
      tasks: [
        {
          id: "2-1",
          role: "Người 2, 3 (Cơ điện)",
          text: "Kéo đường dây điện từ công tơ vào lán; đấu nối tủ điện an toàn có aptomat chống giật; lắp ổ cắm cho máy móc."
        },
        {
          id: "2-2",
          role: "Người 2 & Thợ điều hòa",
          text: "Lắp đặt 2 điều hòa 2 chiều cho khu lán sinh hoạt của nhóm 4–5 người (sưởi ấm mùa đông rét mướt vùng cao)."
        },
        {
          id: "2-3",
          role: "Người 4, 5 (Chỗ ở)",
          text: "Kê giường gấp, phản nằm, trải chiếu, mắc màn chống muỗi vắt; lắp 2 đèn LED năng lượng mặt trời và thiết bị phát 4G."
        },
        {
          id: "2-4",
          role: "Người 2, 3 (Đường nước)",
          text: "Kéo 2km ống PE phi 25 từ mó suối về bể lắng lọc; lắp phao cơ tự động, lọc cát sỏi sinh thái và máy bơm tăng áp."
        }
      ],
      caution: "Kiểm tra kỹ nguồn nước mó suối và hệ thống aptomat điện trước khi đóng điện sinh hoạt."
    },
    {
      id: 3,
      timeline: "Ngày 7 – 9",
      title: "Chặt Tre Làm Chuồng (Thuê 2-3 Người Thời Vụ) & Sát Trùng",
      badge: "Xây Dựng Chuồng Trại",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: Hammer,
      tasks: [
        {
          id: "3-1",
          role: "Thuê 2–3 người thời vụ",
          text: "Thuê 2–3 lao động bản địa trong 3 ngày: cùng anh em chặt tre nứa trên đồi, vót cọc, chôn cột dựng khung chuồng tự nhiên (tiết kiệm 100% sắt thép)."
        },
        {
          id: "3-2",
          role: "Người 2, 3 + Nhân công",
          text: "Căng lưới cước B40 quây 2.000m² sườn đồi; lợp mái bạt dứa 2 lớp chống mưa rét; ngăn riêng 2 ô chuồng (ô gà 3T và ô gà 1T)."
        },
        {
          id: "3-3",
          role: "Người 1 (Kỹ thuật)",
          text: "Rải vôi bột khử trùng toàn bộ nền chuồng và bán kính 20m xung quanh; phun thuốc sát trùng Benkocid, để trống 48–72h."
        },
        {
          id: "3-4",
          role: "Người 1, 4",
          text: "Rải lớp trấu đệm lót sinh học dày 12cm, rắc men ủ vi sinh Balasa khử mùi hôi và giữ ấm chân gà."
        }
      ],
      caution: "Chuồng tre phải lợp bạt dốc thoát nước tốt, quây bạt chắn hướng gió bấc để tránh gà bị cảm lạnh."
    },
    {
      id: 4,
      timeline: "Ngày 10 – 12",
      title: "Kích Hoạt Bếp Ăn 0Đ Siêu Tốc & Đàn Vật Nuôi Tự Cấp",
      badge: "Tự Cung Tự Cấp",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: UtensilsCrossed,
      tasks: [
        {
          id: "4-1",
          role: "Người 4, 5 (Vườn rau siêu tốc)",
          text: "Cuốc 4 luống đất cạnh chuồng gà. Gieo hạt rau ăn lá ngắn ngày (cải mơ, cải ngọt tỉa non, rau dền, muống cạn - 15–20 ngày có ăn)."
        },
        {
          id: "4-2",
          role: "Người 4 (Giàn quả bờ rào)",
          text: "Cắm cọc tre dọc rào lưới B40, tra hạt bí đao (bí chanh), mướp hương, đỗ cove (ngọn làm rau xào, quả để dành ăn Tết)."
        },
        {
          id: "4-3",
          role: "Người 4 (Đàn gà đẻ trứng)",
          text: "Mua 12–15 con gà/vịt hậu bị đẻ trứng thải (~50k/con = 750k). Quây góc vườn cho ăn thóc ngâm và cơm thừa -> thu 8–10 trứng/ngày."
        },
        {
          id: "4-4",
          role: "Người 4, 5 (Bếp củi & Chuối)",
          text: "Thu gom củi khô đồi rừng nhóm bếp củi đun nước, kho hầm thức ăn (giảm 75% tiền gas). Hái bắp hoa chuối làm nộm và canh chua."
        }
      ],
      caution: "Bón lót luống rau bằng phân trấu hoai mục và tưới nước giữ ẩm ngày 2 lần để hạt nảy mầm đều."
    },
    {
      id: 5,
      timeline: "Ngày 13 – 14",
      title: "Đón Giống Đợt 1 (Gà 3T & Lợn F1) & Chạy Máy Băm Chuối",
      badge: "Vào Giống An Toàn",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: HeartHandshake,
      tasks: [
        {
          id: "5-1",
          role: "Người 1 (Đón gà 3T)",
          text: "Đón 200–400 gà Lạc Sơn 3 tháng tuổi về chuồng. Pha ngay nước đường Glucozo + Vitamin C + Điện giải uống 2h đầu chống sốc di chuyển."
        },
        {
          id: "5-2",
          role: "Người 1, 3 (Đón lợn F1)",
          text: "Đón lợn bản F1 (12–15kg/con) vào khu thung lũng 2 có vũng tắm bùn. Bữa đầu cho ăn cháo loãng men vi sinh ấm bụng."
        },
        {
          id: "5-3",
          role: "Người 4, 5 (Băm chuối men)",
          text: "Chạy thử máy băm chuối: băm thân chuối vườn trộn cám ngô + men ủ vi sinh + chút muối, đóng bao ủ kín 48h tập ăn dặm."
        },
        {
          id: "5-4",
          role: "Người 1 (Chuẩn bị chuồng úm)",
          text: "Kiểm tra chuồng úm sưởi nhiệt, sẵn sàng đón tiếp đàn gà giống 1 tháng tuổi (giá 12.000đ/con) vào đầu tuần 3."
        }
      ],
      caution: "Gà 3T mới về phải nhốt ấm trong chuồng 3–5 ngày đầu để quen đệm lót và cám trước khi thả ra sân đồi."
    }
  ];

  const PHASES = [
    {
      id: 1,
      name: "Giai Đoạn 1",
      timeline: "Tuần 1 – 2 (14 Ngày Vàng)",
      tag: "Trọng Yếu • Khởi Động",
      tagColor: "bg-red-100 text-red-800 border-red-200",
      title: "Máy Xúc Mở Đường, Hạ Tầng, Bếp Ăn 0đ & Đón Giống Đợt 1",
      desc: "Ưu tiên số 1: Máy xúc 3 ngày mở đường để có lối đi. Sau đó cho người vào kéo điện nước, lắp 2 điều hòa, thuê 2-3 người chặt tre làm chuồng, kích hoạt bếp ăn 0đ và đón gà 3T + lợn F1.",
      hasSubStages: true
    },
    {
      id: 2,
      name: "Giai Đoạn 2",
      timeline: "Tuần 3 – 6 (Ngày 15 – 42)",
      tag: "Ổn Định Đàn",
      tagColor: "bg-amber-100 text-amber-800 border-amber-200",
      title: "Đón Gà 1T (12k), Vận Hành Chuối Men & Thả Gà Leo Đồi",
      desc: "Đón đàn gà giống 1 tháng tuổi (giá tối ưu 12k/con để gối đầu). Đàn gà 3T bắt đầu leo dốc sườn đồi. Máy băm chuối men chạy đều đặn mỗi tuần để cắt giảm 40% chi phí thức ăn.",
      hasSubStages: false,
      tasks: [
        {
          id: "p2-1",
          role: "Người 1 (Kỹ thuật)",
          text: "Đón đàn gà 1T (12.000đ/con), bật bóng hồng ngoại sưởi ấm 28–30°C trong chuồng úm chắn gió mùa đông bắc."
        },
        {
          id: "p2-2",
          role: "Người 1 (Thả đồi)",
          text: "Mở cửa chuồng thả đàn gà 3T ra sườn đồi từ 9h sáng sau khi tan sương mù. Gà leo dốc bới tìm sâu bọ giúp thịt săn chắc."
        },
        {
          id: "p2-3",
          role: "Người 4, 5 (Chuối men)",
          text: "Băm 200kg thân chuối/tuần, trộn men vi sinh + cám ngô ủ 48h cho lợn và gà 3T ăn thay thế 35–40% cám mua."
        },
        {
          id: "p2-4",
          role: "Người 4 (Bếp ăn 0đ)",
          text: "Bắt đầu thu hoạch luống rau cải, dền đầu tiên sau 18–20 ngày gieo. Đàn gà đẻ đạt sản lượng 8–10 trứng tươi mỗi ngày."
        }
      ],
      kpi: "Tỷ lệ sống đàn gà 3T > 98%; đàn lợn tăng cân đạt 18–20kg; đàn gà 1T thích nghi tốt."
    },
    {
      id: 3,
      name: "Giai Đoạn 3",
      timeline: "Tuần 7 – 10 (Ngày 43 – 70)",
      tag: "Tăng Tốc Vỗ Béo",
      tagColor: "bg-teal-100 text-teal-800 border-teal-200",
      title: "Vỗ Béo Thảo Dược, Thịt Thơm Săn Chắc & Tỉa Đàn Nội Bộ",
      desc: "Giai đoạn tích mỡ vàng, da giòn cho gà 3T. Bổ sung thóc ngâm mầm và tỏi giã ngâm rượu để tạo chất lượng thịt đồi đặc sản, nâng cao đề kháng chống chọi rét đậm.",
      hasSubStages: false,
      tasks: [
        {
          id: "p3-1",
          role: "Người 1 (Thảo dược)",
          text: "Pha tỏi giã ngâm giấm + rượu vào máng nước 2 lần/tuần phòng ngừa hen khẹc mùa rét cho đàn gà."
        },
        {
          id: "p3-2",
          role: "Người 1, 4 (Thóc mầm)",
          text: "Ngâm 4 thùng phuy thóc mầm luân phiên. Bữa chiều cho ăn 100% thóc mầm để thịt gà săn chắc, ngọt thịt, không tích mỡ thừa."
        },
        {
          id: "p3-3",
          role: "Cả nhóm (Tỉa đàn)",
          text: "Bắt đầu tỉa 1–2 con gà trống choai hoặc gà còi phát triển sớm/tuần để cải thiện bữa ăn tươi cho anh em cắm trại."
        },
        {
          id: "p3-4",
          role: "Người 1 (Thương mại)",
          text: "Chụp ảnh, quay video gà thả đồi gửi khách quen, gia đình, cơ quan đặt cọc gà Tết trước."
        }
      ],
      kpi: "Gà 3T đạt 1.8 – 2.1kg/con; lợn đạt 24 – 26kg/con; nhận cọc sớm 30% sản lượng."
    },
    {
      id: 4,
      name: "Giai Đoạn 4",
      timeline: "Tuần 11 – 13 (Ngày 71 – 90 / Đến 28 Tết)",
      tag: "Thu Tiền Mặt",
      tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "Phân Loại Gà Cúng Tết, Xuất Bán Thu Tiền Trước 28 Tết",
      desc: "Đỉnh điểm thu hồi vốn! Phân loại gà trống đẹp mã bán cúng Tết và gà thịt thương phẩm. Xuất bán toàn bộ gà 3T và 3 lợn F1 trước 28 Tết để hoàn trả 100% vốn gốc và chia thưởng.",
      hasSubStages: false,
      tasks: [
        {
          id: "p4-1",
          role: "Người 1, 2 (Phân loại)",
          text: "Phân loại gà trống thiến/cúng Tết (giá 220k–250k/kg) và gà thịt thương phẩm (180k–200k/kg). Buộc chân, đóng sọt giao hàng."
        },
        {
          id: "p4-2",
          role: "Người 3, 4 (Xuất lợn)",
          text: "Bắt xuất lợn F1 đạt chuẩn 28–32kg cho các gia đình chung đụng thịt ăn Tết (giá 130k–140k/kg hơi)."
        },
        {
          id: "p4-3",
          role: "Thủ quỹ nhóm",
          text: "Thu trọn tiền mặt, hoàn trả 100% vốn đầu tư ban đầu vào tài khoản chung nhóm sáng lập trước ngày 28 Chạp."
        },
        {
          id: "p4-4",
          role: "Người 4, 5 (Bàn giao Tết)",
          text: "Dọn dẹp chuồng gà 3T, rải vôi khử trùng. Bàn giao quy trình cho người trực 5 ngày Tết."
        }
      ],
      kpi: "Xuất bán 100% gà 3T và lợn; thu về 114M – 192M tiền mặt; hoàn 100% vốn gốc."
    },
    {
      id: 5,
      name: "Giai Đoạn 5",
      timeline: "Tuần 14+ (29 Chạp – Rằm Tháng Giêng)",
      tag: "Gối Sóng Lãi",
      tagColor: "bg-purple-100 text-purple-800 border-purple-200",
      title: "Trực Giữ 5 Ngày Tết & Gối Sóng Rằm Tháng Giêng (Đàn Gà 1T @ 12k)",
      desc: "Vận hành chế độ trực Tết 4 cữ nghiêm ngặt. Đàn gà 1 tháng tuổi (giá 12k) lên giò 4.5 tháng sẽ được bán vào dịp Lễ Thượng Nguyên (Rằm tháng Giêng) với giá cao nhất.",
      hasSubStages: false,
      tasks: [
        {
          id: "p5-1",
          role: "Người trực Tết (Bản địa)",
          text: "Thực hiện 4 cữ trực: 7h cho ăn thả gà, 12h kiểm tra nước uống tự động, 17h30 lùa gà vào chuồng đóng chốt, đêm bật đèn sưởi ấm."
        },
        {
          id: "p5-2",
          role: "Nhóm sáng lập",
          text: "Trao thù lao 3.2M + tặng cặp gà trống đồi + giỏ quà Tết cho người trực để động viên tinh thần."
        },
        {
          id: "p5-3",
          role: "Mùng 6 Tết (Tái đàn)",
          text: "Anh em quay trở lại trang trại chúc Tết, kiểm tra đàn gà 1T (lúc này đã là gà giò 4.5 tháng tuổi khỏe mạnh)."
        },
        {
          id: "p5-4",
          role: "Rằm Tháng Giêng",
          text: "Bán đàn gà giò đón đợt cao điểm lễ hội Thượng Nguyên, thu về thêm 37M – 50M lợi nhuận ròng mà không bị ép giá."
        }
      ],
      kpi: "Bảo toàn 100% tài sản và đàn 285 gà giò; thu thêm lợi nhuận đợt 2 sau Tết."
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
              Trật tự chuẩn xác: <strong>Máy xúc 3 ngày mở đường $\rightarrow$ Kéo điện nước, lắp 2 điều hòa $\rightarrow$ Thuê người chặt tre làm chuồng $\rightarrow$ Bếp ăn 0đ $\rightarrow$ Đón giống</strong>.
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
              Chỉ đạo máy xúc san mặt bằng chuồng; phụ trách đón giống gà 3T và lợn F1; lịch vắc-xin; kiểm soát đệm lót sinh học và phân loại xuất bán ngày Tết.
            </p>
          </div>

          {/* Person 2 & 3 */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-950 uppercase">Người 2 & 3: Cơ Điện</span>
              <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-1.5 py-0.2 rounded">Hạ Tầng & Nước</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Kéo điện, lắp tủ điện chống giật, lắp 2 điều hòa sưởi ấm cho lán ở; kéo 2km ống nước mó suối; bảo dưỡng máy cắt cỏ; quản lý nhóm thợ tre dựng chuồng.
            </p>
          </div>

          {/* Person 4 & 5 */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-950 uppercase">Người 4 & 5: Hậu Cần</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded">Bếp Ăn 0đ & Chuối</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Kê giường phản, chăn màn; dựng bếp củi; cuốc 4 luống rau ăn lá siêu tốc (15–20 ngày); chăm 15 gà đẻ trứng; băm thân chuối ủ men vi sinh hàng tuần.
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

          {/* GIAI ĐOẠN 1: 5 CHẶNG TUẦN TỰ RÕ RÀNG */}
          {currentPhase.hasSubStages && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  Kế Hoạch 14 Ngày Vàng (5 Chặng Tuần Tự Tuyệt Đối):
                </h4>
                <span className="text-[11px] text-slate-400">Chọn chặng để xem chi tiết</span>
              </div>

              {/* 5 Sub-stage Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {SUB_STAGES_PHASE_1.map((sub) => {
                  const isSubActive = selectedSubDayId === sub.id;
                  const IconComp = sub.icon;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubDayId(sub.id)}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                        isSubActive
                          ? "bg-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20"
                          : "bg-slate-100/70 border-slate-200 hover:bg-white text-slate-600"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${sub.badgeColor}`}>
                            {sub.timeline}
                          </span>
                          <IconComp className={`w-3.5 h-3.5 ${isSubActive ? "text-emerald-600" : "text-slate-400"}`} />
                        </div>
                        <div className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                          {sub.title}
                        </div>
                      </div>
                      <span className={`text-[10px] mt-1.5 block ${isSubActive ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                        {sub.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Sub-stage Tasks & Checklist */}
              {(() => {
                const activeSub = SUB_STAGES_PHASE_1.find((s) => s.id === selectedSubDayId) || SUB_STAGES_PHASE_1[0];
                return (
                  <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 space-y-3 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                        <span className="bg-slate-800 text-white text-[11px] px-2 py-0.5 rounded font-black">
                          {activeSub.timeline}
                        </span>
                        <span>{activeSub.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Bấm vào ô vuông để đánh dấu hoàn thành
                      </span>
                    </div>

                    {/* Task checklist with clean, custom, bulletproof checkbox widget */}
                    <div className="space-y-2">
                      {activeSub.tasks.map((task) => {
                        const isDone = !!checkedTasks[task.id];
                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`p-2.5 rounded-xl border transition flex items-start gap-3 cursor-pointer select-none ${
                              isDone
                                ? "bg-emerald-50/60 border-emerald-300"
                                : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/90"
                            }`}
                          >
                            {/* Explicit Checkbox Box Widget */}
                            <div className="mt-0.5 flex-shrink-0">
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                                  isDone
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : "border-2 border-slate-300 bg-white hover:border-emerald-500"
                                }`}
                              >
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>

                            <div className="text-xs leading-relaxed flex-1">
                              <span className="font-bold text-slate-900 mr-1.5 bg-slate-200/80 px-1.5 py-0.2 rounded text-[10px]">
                                {task.role}:
                              </span>
                              <span className={isDone ? "line-through text-slate-400" : "text-slate-800 font-medium"}>
                                {task.text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Caution Tip */}
                    <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Lưu ý kỹ thuật:</strong> {activeSub.caution}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TASKS FOR PHASE 2, 3, 4, 5 */}
          {!currentPhase.hasSubStages && currentPhase.tasks && (
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
                      className={`p-2.5 rounded-xl border transition flex items-start gap-3 cursor-pointer select-none ${
                        isDone
                          ? "bg-emerald-50/60 border-emerald-300"
                          : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/90"
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isDone
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "border-2 border-slate-300 bg-white hover:border-emerald-500"
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="text-xs leading-relaxed flex-1">
                        <span className="font-bold text-slate-900 mr-1.5 bg-slate-200/80 px-1.5 py-0.2 rounded text-[10px]">
                          {task.role}:
                        </span>
                        <span className={isDone ? "line-through text-slate-400" : "text-slate-800 font-medium"}>
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
