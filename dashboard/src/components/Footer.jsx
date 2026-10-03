import React from "react";
import { Mountain, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-8 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-700 flex items-center justify-center text-white">
              <Mountain className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">
              Trang Trại Hữu Cơ Bán Tự Nhiên • Kế Hoạch Tài Chính & Vận Hành Vụ Tết
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Thiết kế chuẩn Executive Financial Dashboard cho Startup Nông Nghiệp</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
          * Lưu ý: Các số liệu mô phỏng dựa trên khảo sát thực tế giá gà Lạc Sơn, giá lợn bản cắp nách và giá thức ăn ủ chua vi sinh. Trong quá trình nuôi thực tế tại miền Bắc cần chú trọng công tác giữ ấm tránh sương muối và tuân thủ lịch tiêm vắc xin nghiêm ngặt.
        </p>
      </div>
    </footer>
  );
}
