import React from "react"
import { Outlet, NavLink, useNavigate, useLocation } from "react-router"
import { useAuth } from "../context/AuthContext"
import { LogOut, User as UserIcon, Settings, Home, Gamepad2, GraduationCap } from "lucide-react"
import { cn } from "../../lib/utils"

interface MobileLayoutProps {
  navItems: {
    label: string;
    icon: React.ElementType;
    path: string;
  }[]
}

export function MobileLayout({ navItems }: MobileLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md bg-pink-50 text-slate-800 pb-20 overflow-x-hidden shadow-2xl shadow-slate-300 relative min-h-screen">
        {/* Top App Bar */}
        <div className="sticky top-0 z-50 shadow-sm px-4 py-3 flex items-center justify-between shadow-pink-100/30 backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-extrabold shadow-inner shadow-pink-200">
            {user?.name.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{user?.role === "teacher" ? "Giáo viên" : "Học sinh"}</p>
            <p className="font-bold text-slate-800">{user?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <NavLink to={user?.role === "teacher" ? "/teacher/profile" : "/student/profile"} className={({ isActive }) => cn("p-2 rounded-full transition-colors", isActive ? "bg-pink-100 text-pink-600" : "text-slate-400 hover:bg-slate-100")}>
             <UserIcon size={20} />
          </NavLink>
          <NavLink to={user?.role === "teacher" ? "/teacher/settings" : "/student/settings"} className={({ isActive }) => cn("p-2 rounded-full transition-colors", isActive ? "bg-pink-100 text-pink-600" : "text-slate-400 hover:bg-slate-100")}>
             <Settings size={20} />
          </NavLink>
          <button onClick={handleLogout} className="p-2 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full mx-auto relative p-4 pb-24">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(236,72,153,0.2)] z-50 px-6 py-2 pb-safe">
        <div className="flex justify-around items-center w-full mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/teacher" || item.path === "/student"}
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 min-w-[4rem] transition-all duration-200",
                isActive ? "text-pink-600 scale-110" : "text-slate-400 hover:text-pink-400"
              )}
            >
              <item.icon size={24} strokeWidth={useLocation().pathname === item.path ? 2.5 : 2} className={cn("transition-transform", useLocation().pathname === item.path ? "-translate-y-1" : "")} />
              <span className={cn("text-[10px] font-bold", useLocation().pathname === item.path ? "opacity-100" : "opacity-0 h-0")}>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
