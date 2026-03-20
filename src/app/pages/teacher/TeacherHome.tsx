import React from "react"
import { useNavigate } from "react-router"
import { PlayCircle, CheckCircle2, ChevronRight, BarChart3 } from "lucide-react"
import { cn } from "../../../lib/utils"

const videos = [
  { id: 1, title: "Giới thiệu về bình đẳng giới", duration: "5:20", completed: true, thumb: "bg-pink-200" },
  { id: 2, title: "Nhận biết hành vi quấy rối", duration: "8:15", completed: true, thumb: "bg-purple-200" },
  { id: 3, title: "Xử lý tình huống trên lớp", duration: "10:30", completed: false, thumb: "bg-indigo-200" },
  { id: 4, title: "Trò chuyện cùng phụ huynh", duration: "6:45", completed: false, thumb: "bg-blue-200" },
]

export default function TeacherHome() {
  const navigate = useNavigate();
  const progress = 50;

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500 pb-20">
      {/* Progress Section */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-pink-100/40 border border-pink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
        
        <h2 className="text-xl font-extrabold text-slate-800 mb-2">Tiến độ học tập</h2>
        <p className="text-sm font-medium text-slate-500 mb-6">Bạn đã hoàn thành 2/4 bài giảng</p>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-pink-50 border-4 border-pink-500 text-pink-600 font-black text-xl shadow-inner">
            {progress}%
          </div>
          <div className="flex-1">
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs font-bold text-pink-500 mt-2 text-right">Cố lên cô giáo ơi! 🚀</p>
          </div>
        </div>
      </div>

      {/* Video List */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-extrabold text-slate-800">Bài giảng chuyên môn</h2>
          <button className="text-sm font-bold text-pink-600 flex items-center hover:text-pink-700 transition-colors">
            Tất cả <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="flex flex-col gap-3">
          {videos.map((vid) => (
            <div 
              key={vid.id} 
              onClick={() => navigate(`/teacher/course/${vid.id}`)}
              className={cn(
              "group bg-white p-4 rounded-3xl flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.02] border-2 shadow-sm",
              vid.completed ? "border-slate-100 hover:border-pink-200 shadow-slate-200/50" : "border-pink-100 hover:border-pink-300 shadow-pink-100/50"
            )}>
              <div className={cn(
                "w-20 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden",
                vid.thumb
              )}>
                {vid.completed ? (
                  <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle2 size={28} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <PlayCircle size={28} className={cn("text-white drop-shadow-md opacity-80 group-hover:opacity-100 transition-opacity")} strokeWidth={2.5} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-sm mb-1 leading-snug group-hover:text-pink-600 transition-colors">{vid.title}</h3>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <PlayCircle size={12} /> {vid.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
