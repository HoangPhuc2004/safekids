import React from "react"
import { useAuth } from "../../context/AuthContext"
import { BookOpen, Star, Trophy, Clock, Medal, PenTool } from "lucide-react"

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  const isTeacher = user.role === "teacher"

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-tr from-pink-500 to-pink-400 rounded-b-[3rem] p-8 pt-10 shadow-xl shadow-pink-200 text-white relative overflow-hidden -mx-4 -mt-4">
        <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full w-[200%] h-[200%] -top-1/2 -left-1/2"></div>
        <div className="flex flex-col items-center relative z-10 text-center gap-3">
          <div className="w-24 h-24 bg-white rounded-[2rem] p-1 shadow-lg rotate-3 border-4 border-pink-100">
            <div className="w-full h-full bg-pink-50 rounded-[1.5rem] flex items-center justify-center text-pink-600 font-black text-4xl shadow-inner -rotate-3">
              {user.name.charAt(0)}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black mb-1 tracking-tight drop-shadow-sm">{user.name}</h1>
            <p className="text-pink-100 font-medium text-sm bg-black/10 px-4 py-1.5 rounded-full inline-block backdrop-blur-md border border-white/20">
              {isTeacher ? "Giáo viên hướng dẫn" : "Học sinh tiên tiến"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Board */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-100 border border-slate-50 relative -mt-10 mx-2 z-20 flex justify-between gap-4">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-2 shadow-sm">
            <Star size={24} fill="currentColor" />
          </div>
          <p className="text-sm font-black text-slate-800">1,240</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Điểm</p>
        </div>
        <div className="w-px bg-slate-100"></div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-2 shadow-sm">
            {isTeacher ? <BookOpen size={24} fill="currentColor" /> : <Trophy size={24} fill="currentColor" />}
          </div>
          <p className="text-sm font-black text-slate-800">{isTeacher ? "12" : "5"}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isTeacher ? "Bài giảng" : "Cúp"}</p>
        </div>
        <div className="w-px bg-slate-100"></div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-2 shadow-sm">
            <Clock size={24} fill="currentColor" />
          </div>
          <p className="text-sm font-black text-slate-800">14h</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian</p>
        </div>
      </div>

      {/* Achievements / Badges */}
      <div className="px-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-slate-800">Thành tích</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <Medal size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Mở đầu</p>
              <p className="text-[10px] font-bold text-slate-400">Hoàn thành bài 1</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Chuyên gia</p>
              <p className="text-[10px] font-bold text-slate-400">Đạt điểm tuyệt đối</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
