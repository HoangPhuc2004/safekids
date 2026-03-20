import React, { useState } from "react"
import { Copy, Plus, Users, TrendingUp, Gamepad2, Play, Share2 } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { cn } from "../../../lib/utils"

export default function TeacherGame() {
  const [activeCode, setActiveCode] = useState("SAFE99")
  
  const handleCopy = () => {
    alert("Đã sao chép mã: " + activeCode)
  }

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500 pb-20">
      {/* Active Game Section */}
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-6 shadow-2xl shadow-pink-300 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-2xl -mr-20 -mt-20"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="bg-pink-400/50 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
              Đang diễn ra
            </span>
            <h2 className="text-xl font-extrabold mb-1">Thử thách Tự Bảo Vệ</h2>
            <p className="text-pink-100 text-sm font-medium flex items-center gap-1">
              <Users size={14} /> 24 học sinh tham gia
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30 text-center cursor-pointer hover:bg-white/30 transition-colors" onClick={handleCopy}>
            <p className="text-[10px] font-bold text-pink-50 uppercase tracking-widest mb-1">Mã Phòng</p>
            <p className="font-black text-2xl tracking-widest">{activeCode}</p>
            <div className="flex items-center justify-center gap-1 mt-1 text-white/80">
              <Copy size={12} /> <span className="text-[10px] font-bold">Sao chép</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-14 gap-2 text-sm shadow-md bg-white text-pink-600 border-2 border-pink-100 hover:bg-pink-50">
          <Plus size={18} /> Tạo Game mới
        </Button>
        <Button className="h-14 gap-2 text-sm shadow-md bg-white text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-50">
          <Share2 size={18} /> Chia sẻ Link
        </Button>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-pink-100/40 border border-pink-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-pink-500" /> Thống kê hiệu quả
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-1">Tỉ lệ trả lời đúng</p>
            <p className="text-2xl font-black text-green-500">85%</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-1">Số HS hoàn thành</p>
            <p className="text-2xl font-black text-blue-500">32/40</p>
          </div>
        </div>

        {/* Dummy Chart Bar */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-700">Câu hỏi khó nhất</h3>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center flex-shrink-0">1</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-600 mb-1 line-clamp-1">Khi người lạ chạm vào vùng đồ bơi...</p>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 w-[45%] rounded-full"></div>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-400 w-8 text-right">45%</div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center flex-shrink-0">2</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-600 mb-1 line-clamp-1">Bí mật xấu là gì?</p>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 w-[60%] rounded-full"></div>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-400 w-8 text-right">60%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
