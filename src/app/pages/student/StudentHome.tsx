import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Check, Lock, Play, Star, Heart } from "lucide-react"
import { cn } from "../../../lib/utils"

const levels = [
  { id: 1, title: "Cơ thể của mình", type: "video", status: "completed", x: "50%" },
  { id: 2, title: "Quy tắc đồ bơi", type: "quiz", status: "active", x: "70%" },
  { id: 3, title: "Nói KHÔNG to", type: "video", status: "locked", x: "30%" },
  { id: 4, title: "Bí mật Tốt & Xấu", type: "quiz", status: "locked", x: "50%" },
  { id: 5, title: "Chạy & Kể lại", type: "video", status: "locked", x: "70%" },
  { id: 6, title: "Vòng tròn tin cậy", type: "quiz", status: "locked", x: "40%" },
]

export default function StudentHome() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState(5)
  const [stars, setStars] = useState(120)

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 -mx-4 -my-4 px-4 py-6 pb-24 overflow-hidden relative">
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-3xl shadow-sm border border-slate-100 mb-8 z-10 sticky top-4">
        <div className="flex items-center gap-1 font-black text-pink-500 text-lg">
          <Heart fill="currentColor" size={24} className="text-pink-500" /> {hearts}
        </div>
        <div className="flex items-center gap-1 font-black text-amber-400 text-lg">
          <Star fill="currentColor" size={24} className="text-amber-400" /> {stars}
        </div>
      </div>

      <div className="flex-1 relative pb-20 mt-4">
        <svg className="absolute top-0 bottom-0 left-0 right-0 w-full h-full -z-10" preserveAspectRatio="none">
          <path
            d="M 180 20 Q 300 100 250 200 T 150 400 T 250 600 T 180 800"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="16"
            strokeDasharray="16 16"
            strokeLinecap="round"
            className="opacity-50"
          />
        </svg>

        <div className="flex flex-col gap-12 relative z-10 items-center">
          {levels.map((level, i) => {
            const isCompleted = level.status === "completed"
            const isActive = level.status === "active"
            const isLocked = level.status === "locked"
            
            return (
              <div 
                key={level.id}
                className="flex flex-col items-center relative group"
                style={{ marginLeft: i % 2 === 0 ? '-80px' : '80px' }}
              >
                {/* Tooltip */}
                {isActive && (
                  <div className="absolute -top-14 bg-white px-4 py-2 rounded-2xl shadow-xl shadow-pink-200/50 font-bold text-pink-500 whitespace-nowrap z-20 animate-bounce">
                    {level.title}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                  </div>
                )}
                
                {/* Node */}
                <button
                  onClick={() => {
                    if (!isLocked) navigate(`/student/course/${level.id}`)
                  }}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center border-b-[6px] transition-all transform hover:scale-105 active:scale-95 z-10 shadow-lg",
                    isCompleted ? "bg-green-400 border-green-500 text-white" :
                    isActive ? "bg-pink-500 border-pink-600 text-white ring-8 ring-pink-100 ring-opacity-50" :
                    "bg-slate-200 border-slate-300 text-slate-400 opacity-80 cursor-not-allowed"
                  )}
                >
                  {isCompleted ? <Check size={36} strokeWidth={4} /> :
                   isLocked ? <Lock size={32} strokeWidth={3} /> :
                   <Play size={32} fill="currentColor" className="ml-2" />}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
