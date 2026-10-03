import React from "react";
import { Mountain, Clock, Printer, RotateCcw, HelpCircle, Sparkles } from "lucide-react";

export function Header({ onReset, onPrint, onOpenGlossary }) {
  return (
    <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white shadow-md sticky top-0 z-40 border-b border-emerald-800/60 no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow ring-2 ring-emerald-400/30 flex-shrink-0">
              <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-white leading-tight truncate">
                  Kế Hoạch Trang Trại Vụ Tết
                </h1>
                <span className="bg-amber-500/25 text-amber-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold border border-amber-500/40 inline-flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> 100-120 Ngày
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-200/90 truncate">
                Gà Lạc Sơn (1T @ 12k & 3T) • Lợn bản F1 • Thân chuối men vi sinh
              </p>
            </div>
          </div>

          {/* Right Actions & Countdown */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 bg-emerald-900/80 px-2 py-1 rounded-lg border border-emerald-700/50 text-[11px] sm:text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Đếm ngược: <strong className="text-amber-300">Xuất trước 28 Chạp</strong></span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onOpenGlossary}
                className="text-[11px] sm:text-xs bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 px-2 py-1 rounded-lg border border-emerald-600/50 font-medium transition cursor-pointer flex items-center gap-1"
                title="Giải thích thuật ngữ"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Thuật ngữ</span>
              </button>

              <button
                onClick={onReset}
                className="text-[11px] sm:text-xs bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 px-2 py-1 rounded-lg border border-emerald-600/50 font-medium transition cursor-pointer flex items-center gap-1"
                title="Đặt lại"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Đặt lại</span>
              </button>

              <button
                onClick={onPrint}
                className="text-[11px] sm:text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-bold shadow transition cursor-pointer flex items-center gap-1"
                title="In báo cáo"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
