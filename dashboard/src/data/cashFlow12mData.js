/**
 * cashFlow12mData.js
 * Dữ liệu nền tảng cho mô hình Quản lý Dòng tiền 12 Tháng (10/2026 - 09/2027)
 * Trang trại gà thả đồi Lạc Sơn (3.7 ha, 4 phân khu xoay vòng)
 */

export const CAPITAL_PRESETS = [
  {
    id: 50,
    name: "Gói 50 Triệu",
    label: "Vốn Tiết Kiệm",
    equity: 50000000,
    badge: "Đòn Bẩy Cao",
    badgeColor: "bg-red-100 text-red-800 border-red-200",
    desc: "Tận dụng tối đa vốn vay & quay vòng, phù hợp khi nguồn lực ban đầu eo hẹp."
  },
  {
    id: 100,
    name: "Gói 100 Triệu",
    label: "Vốn Tiêu Chuẩn",
    equity: 100000000,
    badge: "Tiêu Chuẩn",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    desc: "Khởi động an toàn, vốn vừa phải, thu hồi nhanh."
  },
  {
    id: 130,
    name: "Gói 130 Triệu",
    label: "Khuyên Dùng",
    equity: 130000000,
    badge: "Cân Bằng Vàng",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20",
    desc: "Điểm cân bằng vàng giữa vốn, công suất 4 người & an toàn dòng tiền."
  },
  {
    id: 150,
    name: "Gói 150 Triệu",
    label: "Vốn An Toàn",
    equity: 150000000,
    badge: "Giảm Áp Lực Vay",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    desc: "Hạ thấp đỉnh nợ, giảm mạnh áp lực tiền mặt trước Tết và sạch nợ sớm."
  },
  {
    id: 170,
    name: "Gói 170 Triệu",
    label: "Tối Đa Công Suất",
    equity: 170000000,
    badge: "Công Suất Lớn",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    desc: "Khai thác tối đa mặt bằng & nhân công, lợi nhuận lớn."
  },
  {
    id: 200,
    name: "Gói 200 Triệu",
    label: "Vốn Đột Phá",
    equity: 200000000,
    badge: "Tự Chủ Tối Đa",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    desc: "Chủ động 100% chi phí xây dựng cơ bản, nhu cầu vay mượn trước Tết cực thấp."
  }
];

export const MONTHLY_BASE_SCHEDULE = [
  {
    monthIdx: 1,
    key: "10/26",
    label: "Tháng 10/2026",
    importChicks: [
      { name: "Gà Tết (2 tháng tuổi)", count: 500, cost: 35000000 },
      { name: "Gà bố mẹ (3 tháng tuổi)", count: 20, cost: 5000000 },
      { name: "Thương phẩm TP1 (1 ngày tuổi)", count: 300, isDayOld: true }
    ],
    totalImportCount: 820,
    activeFlockCount: 820,
    soldBirds: 0,
    soldType: "",
    baseFeedKg: 300,
    baseVetOpCost: 2450000,
    capexBreakdown: [
      { item: "Cải tạo quây úm 20m²", cost: 2500000 },
      { item: "Hệ thống nước mó suối 2000L + bơm tăng áp", cost: 15000000 },
      { item: "Khung tre tự chặt (0đ) + mái fibro xi măng 30m² cho 3 chuồng nhỏ đầu tiên", cost: 10300000 },
      { item: "Máng ăn, núm uống tự động & lưới cước quây 300m²/chuồng", cost: 7000000 },
      { item: "Khử trùng Benkocid, vôi bột, sửa lán & điều hòa", cost: 5000000 },
      { item: "Dự phòng hạ tầng", cost: 4000000 }
    ],
    capexCost: 43800000
  },
  {
    monthIdx: 2,
    key: "11/26",
    label: "Tháng 11/2026",
    importChicks: [
      { name: "Thương phẩm TP2 (1 ngày tuổi)", count: 500, isDayOld: true }
    ],
    totalImportCount: 500,
    activeFlockCount: 1320,
    soldBirds: 0,
    soldType: "",
    baseFeedKg: 570,
    baseVetOpCost: 3750000,
    capexBreakdown: [
      { item: "Mái fibro xi măng + lưới cước hoàn thiện đủ 4–6 chuồng nhỏ (300m²/chuồng)", cost: 5000000 }
    ],
    capexCost: 5000000
  },
  {
    monthIdx: 3,
    key: "12/26",
    label: "Tháng 12/2026",
    importChicks: [
      { name: "Thương phẩm TP3 (1 ngày tuổi)", count: 800, isDayOld: true }
    ],
    totalImportCount: 800,
    activeFlockCount: 2120,
    soldBirds: 0,
    soldType: "",
    baseFeedKg: 1000,
    baseVetOpCost: 4200000,
    capexBreakdown: [
      { item: "Bổ sung máng ăn & bóng sưởi chuồng úm rét", cost: 3000000 }
    ],
    capexCost: 3000000
  },
  {
    monthIdx: 4,
    key: "01/27",
    label: "Tháng 01/2027",
    importChicks: [
      { name: "Thương phẩm TP4 (1 ngày tuổi)", count: 1200, isDayOld: true }
    ],
    totalImportCount: 1200,
    activeFlockCount: 3320,
    soldBirds: 0,
    soldType: "",
    baseFeedKg: 1650,
    baseVetOpCost: 5800000,
    capexBreakdown: [
      { item: "Gia cố bạt chắn gió giáp Tết & máng ăn phụ", cost: 3000000 }
    ],
    capexCost: 3000000
  },
  {
    monthIdx: 5,
    key: "02/27",
    label: "Tháng 02/2027 (Tết)",
    importChicks: [
      { name: "Thương phẩm TP5 (1 ngày tuổi)", count: 2000, isDayOld: true }
    ],
    totalImportCount: 2000,
    soldBirds: 475, // 500 * 0.95
    soldType: "475 Gà Tết (bán trước 28 Tết)",
    activeFlockCount: 4845,
    baseFeedKg: 2450,
    baseVetOpCost: 7000000,
    capexBreakdown: [
      { item: "Chuồng Module 2 (160m²) + 200m lưới cước", cost: 23200000 },
      { item: "Hệ thống máng ăn máng uống Module 2", cost: 7800000 }
    ],
    capexCost: 31000000
  },
  {
    monthIdx: 6,
    key: "03/27",
    label: "Tháng 03/2027",
    importChicks: [
      { name: "Thương phẩm TP6 (1 ngày tuổi)", count: 3160, isDayOld: true }
    ],
    totalImportCount: 3160,
    soldBirds: 0,
    soldType: "",
    activeFlockCount: 8005,
    baseFeedKg: 3850,
    baseVetOpCost: 8740000,
    capexBreakdown: [
      { item: "Mở rộng chuồng úm tre nứa 110m²", cost: 14400000 },
      { item: "Chuồng Module 3 (160m²) + vây lưới B40 phân khu", cost: 23200000 }
    ],
    capexCost: 37600000
  },
  {
    monthIdx: 7,
    key: "04/27",
    label: "Tháng 04/2027",
    importChicks: [
      { name: "Thương phẩm TP7 (1 ngày tuổi)", count: 3160, isDayOld: true }
    ],
    totalImportCount: 3160,
    soldBirds: 285, // 300 * 0.95 TP1
    soldType: "285 Gà TP1 xuất chuồng",
    activeFlockCount: 10880,
    baseFeedKg: 5550,
    baseVetOpCost: 8740000,
    capexBreakdown: [
      { item: "Hoàn thiện chuồng Module 4 (160m²)", cost: 12000000 },
      { item: "Hố ủ phân sinh học & máng uống tự động", cost: 6000000 }
    ],
    capexCost: 18000000
  },
  {
    monthIdx: 8,
    key: "05/27",
    label: "Tháng 05/2027",
    importChicks: [
      { name: "Thương phẩm TP8 (1 ngày tuổi)", count: 3160, isDayOld: true }
    ],
    totalImportCount: 3160,
    soldBirds: 475, // 500 * 0.95 TP2
    soldType: "475 Gà TP2 xuất chuồng",
    activeFlockCount: 13565,
    baseFeedKg: 7050,
    baseVetOpCost: 8740000,
    capexBreakdown: [],
    capexCost: 0
  },
  {
    monthIdx: 9,
    key: "06/27",
    label: "Tháng 06/2027",
    importChicks: [
      { name: "Thương phẩm TP9 (1 ngày tuổi)", count: 3160, isDayOld: true }
    ],
    totalImportCount: 3160,
    soldBirds: 760, // 800 * 0.95 TP3
    soldType: "760 Gà TP3 xuất chuồng",
    activeFlockCount: 15965,
    baseFeedKg: 8250,
    baseVetOpCost: 8740000,
    capexBreakdown: [],
    capexCost: 0
  },
  {
    monthIdx: 10,
    key: "07/27",
    label: "Tháng 07/2027",
    importChicks: [
      { name: "Thương phẩm TP10 (1 ngày tuổi)", count: 3160, isDayOld: true }
    ],
    totalImportCount: 3160,
    soldBirds: 1140, // 1200 * 0.95 TP4
    soldType: "1,140 Gà TP4 xuất chuồng",
    activeFlockCount: 17985,
    baseFeedKg: 9050,
    baseVetOpCost: 8740000,
    capexBreakdown: [],
    capexCost: 0
  },
  {
    monthIdx: 11,
    key: "08/27",
    label: "Tháng 08/2027",
    importChicks: [
      { name: "Thương phẩm TP11 (1 ngày tuổi)", count: 3160, isDayOld: true }
    ],
    totalImportCount: 3160,
    soldBirds: 1900, // 2000 * 0.95 TP5
    soldType: "1,900 Gà TP5 xuất chuồng",
    activeFlockCount: 19245,
    baseFeedKg: 9506,
    baseVetOpCost: 8740000,
    capexBreakdown: [],
    capexCost: 0
  },
  {
    monthIdx: 12,
    key: "09/27",
    label: "Tháng 09/2027",
    importChicks: [
      { name: "Thương phẩm TP12 (1 ngày tuổi)", count: 3160, isDayOld: true }
    ],
    totalImportCount: 3160,
    soldBirds: 3002, // 3160 * 0.95 TP6
    soldType: "3,002 Gà TP6 xuất chuồng (Quy mô ổn định)",
    activeFlockCount: 19403,
    baseFeedKg: 9506,
    baseVetOpCost: 8740000,
    capexBreakdown: [],
    capexCost: 0
  }
];

export const FARM_MODULES_INFO = [
  {
    id: 1,
    name: "Khu Nhà Úm Tập Trung (Tháng 1)",
    phase: "Vận hành thường trực hàng tháng",
    shelterArea: "160 – 200 m² sàn tre kín gió",
    yardArea: "Quây úm ấm có đèn sưởi hồng ngoại",
    capacity: "3.160 con gà 1 ngày tuổi / tháng",
    purpose: "Chuyên trách Tháng 1 (0–30 ngày tuổi): Úm tập trung toàn bộ đàn gà con mới nhập về, sưởi ấm, đệm lót sinh học, kiểm soát dịch bệnh và vắc-xin ban đầu đạt tỷ lệ sống > 95%.",
    status: "Đầu mối tiếp nhận giống"
  },
  {
    id: 2,
    name: "Cụm 1: 4–6 Chuồng Cố Định (Xong T11/2026)",
    phase: "Xong trong Tháng 11/2026",
    shelterArea: "30 m² mái fibro xi măng / chuồng",
    yardArea: "270 m² sân đồi rào tre lưới / chuồng",
    capacity: "150 con giống / chuồng (Tổng 600–900 con)",
    purpose: "Đón gà sau khi úm xong ở Tháng 1, đưa vào nuôi cố định tại đây suốt 4 tháng tiếp theo đến khi xuất bán lúc 5 tháng tuổi (1,30 kg). Đón 500 gà Tết và đàn TP1.",
    status: "Hoàn thiện 4–6 chuồng T11"
  },
  {
    id: 3,
    name: "Cụm 2 & 3: Mở Rộng Chuồng Cố Định (T02–T03/2027)",
    phase: "Mở rộng sau Tết (Tháng 02 – 03/2027)",
    shelterArea: "30 m² mái fibro xi măng / chuồng",
    yardArea: "270 m² sân đồi / chuồng",
    capacity: "150–180 con giống / chuồng",
    purpose: "Lấy doanh thu bán gà Tết tái đầu tư; nhân rộng các chuồng nhỏ cố định trên quỹ đất 2 ha. Nuôi liên tục từ tháng 2 đến tháng 5, áp dụng quy trình xả cám về 0% trong 2 tháng cuối.",
    status: "Tài trợ bằng tiền bán gà Tết"
  },
  {
    id: 4,
    name: "Cụm 4: Khép Kín Hệ Thống Xoay Vòng (T04/2027)",
    phase: "Hoàn thiện Tháng 04/2027",
    shelterArea: "Chuẩn hóa 60–64 chuồng nhỏ cố định",
    yardArea: "Bãi đồi 2 ha All-in All-out",
    capacity: "Ổn định 3.002 con xuất chuồng/tháng (1,3 kg/con)",
    purpose: "Khép kín chu trình xoay vòng 5 lứa: Tháng 1 ở Nhà Úm, Tháng 2–5 ở Chuồng Cố Định xuất chuồng 1,3kg. Mỗi chuồng xuất bán xong được nghỉ sát trùng 20–30 ngày độc lập.",
    status: "Khép kín 100% trang trại"
  }
];
