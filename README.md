# Kế Hoạch Khởi Động & Phân Tích Lợi Nhuận Trang Trại Vụ Tết (Executive Agri-Dashboard)

Dashboard tài chính & vận hành chuẩn Executive dành cho Startup Nông nghiệp tuần hoàn (Gà Lạc Sơn 1T & 3T, Lợn bản F1, Thân chuối men vi sinh) vụ Tết.

---

## 🌟 Tính Năng Chủ Chốt

1. **Phân Biệt Chuẩn Mực Dòng Tiền**:
   - **Dòng tiền mặt cầm về (Cash Flow)**: Tiền thực thu ngày 28 Tết trừ đi vốn đầu tư ban đầu.
   - **Lợi nhuận ròng kinh tế (Total Net Profit)**: Dòng tiền mặt thuần + Giá trị đàn gà gối đầu (4.5 tháng) + Giá trị thiết bị còn lại sau khấu hao vụ 1 (32 triệu).
   - **Tỷ suất hoàn vốn ROI & Biên lợi nhuận ròng**.

2. **3 Kịch Bản Vốn Khởi Điểm (Preset Scenarios)**:
   - **Gói 100 Triệu (Tiết kiệm tối đa)**: 400 gà 3T, 200 gà 1T, 3 lợn bản | Doanh thu 87.7M | Lợi nhuận ròng **+44.4M** (ROI 44.4%).
   - **Gói 130 Triệu (Khuyên dùng - Cân bằng vàng)**: 650 gà 3T, 300 gà 1T, 6 lợn bản | Doanh thu 147.0M | Lãi tiền mặt **+17.0M** | Lợi nhuận ròng **+86.0M** (ROI 66.1%).
   - **Gói 170 Triệu (Tối đa công suất 4 người)**: 1.000 gà 3T, 400 gà 1T, 10 lợn bản | Doanh thu 229.0M | Lãi tiền mặt **+59.0M** | Lợi nhuận ròng **+140.4M** (ROI 82.5%).

3. **Mô Phỏng Độ Nhạy Real-Time (Simulator)**:
   - Slider giá gà Lạc Sơn (160k - 250k đ/con).
   - Slider giá lợn bản hơi (100k - 160k đ/kg).
   - Slider mức tiết kiệm chi phí thức ăn nhờ thân chuối ủ men vi sinh (0% - 60%).
   - Slider tỷ lệ sống đàn nuôi (85% - 98%).

4. **Báo Cáo P&L Chi Tiết**:
   - Minh bạch từng dòng mục doanh thu, chi phí biến đổi giống, thức ăn, CAPEX hạ tầng 40M, tài sản sau Tết.

5. **Lộ Trình Triển Khai 3 Tháng (100 Ngày)** & **Checklist Hạ Tầng 40M** tương tác trực tiếp.

---

## 🚀 Cách Chạy & Sử Dụng

### Cách 1: Mở Trực Tiếp (Không Cần Cài Đặt)
- Mở trực tiếp file `index.html` hoặc `ke_hoach_trang_trai_tet.html` bằng trình duyệt (Google Chrome, Microsoft Edge, Brave, v.v.).

### Cách 2: Chạy Môi Trường Phát Triển Vite React (Hot-Reload)
Vào thư mục `dashboard` và chạy:
```bash
cd dashboard
npm run dev
```
Truy cập: `http://localhost:5173`

Để đóng gói bản production:
```bash
npm run build
```
