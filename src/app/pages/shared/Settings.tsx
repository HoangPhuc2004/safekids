import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router"
import { Moon, Sun, Volume2, Globe, Shield, LogOut, ChevronRight } from "lucide-react"
import { cn } from "../../../lib/utils"

export default function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  const [darkMode, setDarkMode] = useState(false)
  const [sound, setSound] = useState(true)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const SettingRow = ({ icon: Icon, title, onClick, color = "text-slate-500", rightContent }: any) => (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <Icon size={20} className={color} />
        <span className="font-bold text-slate-700">{title}</span>
      </div>
      {rightContent || <ChevronRight size={20} className="text-slate-300" />}
    </div>
  )

  const Toggle = ({ active, onChange }: any) => (
    <div 
      onClick={onChange}
      className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out", active ? "bg-green-500" : "bg-slate-200")}
    >
      <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300", active ? "translate-x-6" : "translate-x-0")} />
    </div>
  )

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500 pb-20">
      <div className="px-2 mt-4">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-6">Cài đặt</h1>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-100 border border-slate-50">
        <SettingRow 
          icon={darkMode ? Moon : Sun} 
          title="Chế độ tối" 
          color="text-indigo-500"
          rightContent={<Toggle active={darkMode} onChange={() => setDarkMode(!darkMode)} />}
        />
        <SettingRow 
          icon={Volume2} 
          title="Âm thanh" 
          color="text-pink-500"
          rightContent={<Toggle active={sound} onChange={() => setSound(!sound)} />}
        />
        <SettingRow 
          icon={Globe} 
          title="Ngôn ngữ" 
          color="text-blue-500"
          rightContent={<span className="text-sm font-bold text-slate-400">Tiếng Việt</span>}
        />
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-100 border border-slate-50">
        <SettingRow 
          icon={Shield} 
          title="Bảo mật và Quyền riêng tư" 
          color="text-green-500"
        />
      </div>

      <button 
        onClick={handleLogout}
        className="mt-4 flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-3xl font-black active:scale-95 transition-transform border border-red-100 shadow-sm"
      >
        <LogOut size={20} /> Đăng xuất
      </button>

      <p className="text-center text-xs font-bold text-slate-300 mt-8">
        Phiên bản 1.0.0
      </p>
    </div>
  )
}
