import React from "react";
import { Mountain, Clock, Printer, RotateCcw, HelpCircle, Sparkles, TrendingUp } from "lucide-react";

export function Header({ onReset, onPrint, onOpenGlossary }) {
  return (
    <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white shadow-xl sticky top-0 z-40 border-b border-emerald-800/60 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400/30 flex-shrink-0">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  Kế Hoạch Khởi Động & Phân Tích Lợi Nhuận Trang Trại
                </h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-500/40 inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Vụ Tết
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5 line-clamp-1">
                Mô hình nông nghiệp tuần hoàn: Gà Lạc Sơn (1T & 3T) • Lợn bản F1 • Thân chuối men vi sinh • Thu hồi vốn 100-120 ngày
              </p>
            </div>
          </div>

          {/* Right Actions & Countdown */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-700/50 shadow-inner">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs text-slate-200">
                Đếm ngược xuất bán: <strong className="text-amber-300">100 - 120 Ngày</strong> <span className="text-emerald-300/70 hidden sm:inline">(Trước 28 Chạp)</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenGlossary}
                className="inline-flex items-center gap-1 text-xs bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 hover:text-white px-2.5 py-1.5 rounded-lg border border-emerald-600/50 transition-colors font-medium cursor-pointer"
                title="Giải thích thuật ngữ tài chính"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">Giải thích</span>
              </button>

              <button
                onClick={onReset}
                className="inline-flex items-center gap-1 text-xs bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 hover:text-white px-2.5 py-1.5 rounded-lg border border-emerald-600/50 transition-colors font-medium cursor-pointer"
                title="Khôi phục thông số mặc định"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đặt lại</span>
              </button>

              <button
                onClick={onPrint}
                className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-semibold shadow-md shadow-emerald-950/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="In hoặc lưu báo cáo PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In Báo Cáo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
