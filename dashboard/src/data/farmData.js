export const PRESET_SCENARIOS = {
  100: {
    id: 100,
    name: "Gói 100 Triệu",
    badge: "Tiết kiệm tối đa",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    tagline: "Khởi động an toàn, vốn mỏng, thu hồi nhanh",
    capital: 100, // Triệu VND
    capex: 39.0, // Triệu VND
    chicken3mCount: 400,
    chicken3mPrice: 75000, // đ/con
    chicken1mCount: 200,
    chicken1mPrice: 12000, // đ/con (Giá giống 1 tháng tuổi: 12.000đ)
    pigsCount: 3,
    pigPrice: 1200000, // đ/con
    baseFeedCost: 25.0, // Triệu VND (ở mức tiết kiệm 40% chuối ủ men)
    chickenOutRate: 0.95,
    pigWeight: 30, // kg/con
    equipmentResidual: 32.0, // Triệu VND (giá trị thiết bị sau vụ 1)
    chicken1mValuation: 130000, // đ/con khi thành gà giò 4.5 tháng
  },
  130: {
    id: 130,
    name: "Gói 130 Triệu",
    badge: "Khuyên dùng - Cân bằng tối ưu",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold ring-2 ring-emerald-500/20",
    tagline: "Điểm cân bằng vàng giữa vốn, công suất 4 người & an toàn",
    capital: 130,
    capex: 40.0,
    chicken3mCount: 650,
    chicken3mPrice: 75000,
    chicken1mCount: 300,
    chicken1mPrice: 12000, // đ/con (Giá giống 1 tháng tuổi: 12.000đ)
    pigsCount: 6,
    pigPrice: 1200000,
    baseFeedCost: 30.45, // Triệu VND
    chickenOutRate: 0.95,
    pigWeight: 30,
    equipmentResidual: 32.0,
    chicken1mValuation: 130000,
  },
  170: {
    id: 170,
    name: "Gói 170 Triệu",
    badge: "Tối đa năng suất 4 lao động",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300 font-semibold",
    tagline: "Khai thác tối đa mặt bằng 2.000m² & nhân công, lợi nhuận lớn",
    capital: 170,
    capex: 40.0,
    chicken3mCount: 1000,
    chicken3mPrice: 75000,
    chicken1mCount: 400,
    chicken1mPrice: 12000, // đ/con (Giá giống 1 tháng tuổi: 12.000đ)
    pigsCount: 10,
    pigPrice: 1200000,
    baseFeedCost: 38.2, // Triệu VND
    chickenOutRate: 0.95,
    pigWeight: 30,
    equipmentResidual: 32.0,
    chicken1mValuation: 130000,
  }
};

export const INITIAL_CAPEX_ITEMS = [
  { id: 1, name: "Máy cắt cỏ cầm tay 2 thì", cost: 1.4, note: "Dọn 2.000m² sườn đồi, tạo mặt bằng sạch", category: "Thiết bị", completed: true },
  { id: 2, name: "2 Điều hòa lướt/cũ", cost: 9.5, note: "Lắp phòng ở + phòng điều hành kho ấm mùa đông", category: "Tiện ích sinh hoạt", completed: true },
  { id: 3, name: "Đường ống nước 2km (PE phi 25)", cost: 9.5, note: "Kéo từ mó nước tự nhiên về bể chứa tổng", category: "Cơ sở hạ tầng", completed: true },
  { id: 4, name: "Máy bơm đẩy công suất lớn", cost: 2.5, note: "Đấu nối mó nước đẩy lên bồn cao áp lực", category: "Cơ sở hạ tầng", completed: true },
  { id: 5, name: "Hệ thống điện, bóng sưởi úm, bếp gas", cost: 7.0, note: "Chiếu sáng + giữ ấm đàn gà 1T tránh rét", category: "Hệ thống điện", completed: true },
  { id: 6, name: "4 Thùng phuy 200L ngâm thóc mầm", cost: 1.4, note: "Ủ mầm ngũ cốc giàu đạm thay cám viên", category: "Dụng cụ chăn nuôi", completed: true },
  { id: 7, name: "Lưới cước quây 2.000m² + Bạt dứa", cost: 4.5, note: "Quây riêng 2 ô gà 3T và 1T, chắn gió bấc", category: "Chuồng trại", completed: true },
  { id: 8, name: "Công nhật dọn dẹp tuần đầu (2 người x 7 ngày)", cost: 4.2, note: "Phát cây cỏ rậm, đào hố chôn cọc tre", category: "Nhân công khởi tạo", completed: true },
];

export const ROADMAP_STEPS = [
  {
    week: "Tuần 1",
    phase: "Hạ Tầng & Chuồng Trại",
    tag: "Khởi động",
    tagColor: "bg-emerald-100 text-emerald-800",
    title: "Dọn Cỏ, Kéo Điện Nước & Dựng Chuồng Tre Tự Nhiên",
    highlights: [
      "Chạy máy cắt cỏ dọn phẳng 2.000 m² sườn đồi gần kho.",
      "Kéo 2km ống PE phi 25 từ mó nước về bể, đấu máy bơm công suất lớn.",
      "Lắp 2 điều hòa sinh hoạt giữ ấm cho đội ngũ 4 người.",
      "Chặt tre nứa tại chỗ dựng chuồng ngủ, căng bạt dứa chắn gió bấc, chia 2 ô rào cước (ô gà 3T và ô gà 1T)."
    ],
    riskTip: "Nước mó phải kiểm tra độ sạch; chuồng tre tiết kiệm 100% chi phí sắt thép nhưng phải lợp mái bạt dốc tránh dột rét."
  },
  {
    week: "Tuần 2",
    phase: "Vào Giống Gà",
    tag: "Trọng yếu",
    tagColor: "bg-blue-100 text-blue-800",
    title: "Đón Gà Giống Lạc Sơn (3T & 1T @ 12k) & Kích Hoạt Thóc Mầm",
    highlights: [
      "Đón gà 3 tháng (vỗ béo Tết) và gà giống 1 tháng (giá tối ưu 12k/con để gối đầu), bổ sung Gluco-K-C + điện giải.",
      "Thắp bóng sưởi ban đêm kiểm soát nhiệt độ nghiêm ngặt cho đàn 1 tháng tuổi.",
      "Ngâm 4 thùng phuy ủ thóc mầm theo công thức luân phiên làm nguồn đạm sạch tự nhiên."
    ],
    riskTip: "Thời tiết miền Bắc chuyển rét đột ngột: đêm phải kéo kín bạt quây, giữ nền trấu khô ráo."
  },
  {
    week: "Tuần 3 - 4",
    phase: "Vào Giống Lợn & Ủ Cám",
    tag: "Tận dụng tài nguyên",
    tagColor: "bg-amber-100 text-amber-800",
    title: "Đón Lợn Bản Nhỡ & Chế Biến Thân Chuối Men Vi Sinh",
    highlights: [
      "Đón lợn bản giống nhỡ (12 - 15kg/con), thả khu thung lũng 2 có vũng tắm tự nhiên.",
      "Chặt thân chuối vườn băm nhỏ, trộn cám ngô + men vi sinh ủ yếm khí 24-48h.",
      "Cắt giảm 40 - 50% chi phí cám thương nghiệp nhờ thức ăn lên men giàu vi sinh vật có lợi."
    ],
    riskTip: "Lợn bản thích nghi nhanh nhưng cần tiêm phòng đủ vắc xin dịch tả lợn và tụ huyết trùng."
  },
  {
    week: "Tháng 2",
    phase: "Chăm Sóc & Vỗ Béo Đồi",
    tag: "Tăng trưởng",
    tagColor: "bg-teal-100 text-teal-800",
    title: "Nuôi Thả Tự Nhiên & Hoàn Thiện Thịt Thơm Ngon",
    highlights: [
      "Gà 3T thả tự do leo dốc từ 9h sáng, bới tìm sâu bọ sườn đồi, tạo thớ thịt săn chắc, da giòn vàng.",
      "Bữa chiều cho ăn thóc mầm ủ men giúp tiêu hóa tốt, tăng cân đều đặn nhưng không tích mỡ thừa.",
      "Đàn gà 1 tháng vào giai đoạn gà giò hoàn chỉnh, đề kháng vững vàng với sương muối mùa đông."
    ],
    riskTip: "Kiểm tra gà hàng tuần, loại bỏ kịp thời các con chậm lớn, phân loại trống mái cho vụ Tết."
  },
  {
    week: "Tháng 3 (Cận Tết)",
    phase: "Xuất Bán & Thu Tiền",
    tag: "Thu tiền mặt",
    tagColor: "bg-red-100 text-red-800",
    title: "15 - 28 Chạp: Xuất Bán Thần Tốc, Vét Đàn 3T & Giữ Gà Gối Đầu",
    highlights: [
      "15 - 20 Chạp: Chọn gà trống mã đẹp mào cờ làm gà cúng Tết / giỏ quà biếu giá cao (220k - 250k/con).",
      "21 - 28 Chạp: Xuất bán toàn bộ lợn bản đạt chuẩn 30kg và vét sạch đàn gà 3T.",
      "Thu hồi toàn bộ tiền mặt vụ 1 (87M - 229M).",
      "GIỮ NGUYÊN 100% đàn gà 1T (lúc này đã 4.5 tháng tuổi) gối rằm tháng Giêng, né hoàn toàn bẫy sụt giá sau Tết."
    ],
    riskTip: "Liên hệ khách hàng đặt cọc trước từ đầu tháng 12 âm lịch để tối ưu giá bán lẻ thay vì phụ thuộc thương lái."
  }
];

export const EXECUTIVE_INSIGHTS = [
  {
    title: "Tại sao Gói 130 Triệu là 'Điểm Cân Bằng Vàng'?",
    content: "Với quy mô 650 gà 3T, 300 gà 1T và 6 lợn bản, gói 130M khai thác vừa vặn 100% công suất của nhóm 4 người trong 100 ngày. Bạn thu về ngay 147 triệu tiền mặt trước 28 Tết (dôi dư 17 triệu tiền mặt sau khi hoàn vốn gốc), đồng thời sở hữu nguyên vẹn đàn 285 gà giò và 32 triệu tài sản hạ tầng cho chu kỳ tiếp theo."
  },
  {
    title: "Lợi ích đột phá khi giống gà 1 tháng chỉ 12.000đ",
    content: "Giá con giống 1 tháng tuổi 12.000đ/con giúp chi phí giống gối đầu giảm tới gần 70% (chỉ tốn 2.4M - 4.8M). Khoản tiết kiệm này được chuyển thành quỹ dự phòng thức ăn và thuốc thú y, giúp trang trại có sức chịu tải tài chính cực kỳ vững vàng trước biến động thị trường."
  },
  {
    title: "Chiến thuật né 'Bẫy Sụt Giá Ra Giêng'",
    content: "Hầu hết các hộ nuôi dồn toàn bộ đàn bán Tết hoặc còn thừa gà bị thương lái ép giá rẻ vào tháng Giêng. Mô hình này chia làm 2 tầng: Tầng 1 (Gà 3T) bán vét sạch sát Tết khi giá đỉnh điểm; Tầng 2 (Gà 1T) nuôi gối đúng đến Rằm tháng Giêng - thời điểm nhu cầu cúng lễ thượng nguyên tăng vọt trở lại với giá bán cao ngất ngưởng."
  }
];
