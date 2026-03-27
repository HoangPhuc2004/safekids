import { Outlet, NavLink } from "react-router";
import { Home, Users, User, AlertTriangle, Shield, Menu, X, LogOut, Bell, PlusCircle, BarChart3, BookOpen } from "lucide-react";
import { useState } from "react";

export default function TeacherLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { to: "/teacher", icon: <Home size={22} />, label: "Trang chủ", end: true },
    { to: "/teacher/lectures", icon: <BookOpen size={22} />, label: "Bài giảng" },
    { to: "/teacher/groups", icon: <Users size={22} />, label: "Nhóm lớp" },
    { to: "/teacher/create-game", icon: <PlusCircle size={22} />, label: "Tạo Game" },
    { to: "/teacher/profile", icon: <User size={22} />, label: "Cá nhân" },
  ];

  return (
    <div className="flex h-screen bg-indigo-50/30 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col bg-white border-r border-indigo-100 transition-all duration-300 shadow-sm z-30 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 flex-shrink-0">
            <Shield size={22} className="text-white" />
          </div>
          {isSidebarOpen && (
            <span className="font-black text-xl text-gray-800 tracking-tight animate-in fade-in duration-500">
              TeacherHub
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group
                ${isActive 
                  ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}
              `}
            >
              <div className={`transition-transform duration-300 group-hover:scale-110`}>
                {item.icon}
              </div>
              {isSidebarOpen && <span className="animate-in slide-in-from-left-2 duration-300">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-50">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all font-bold"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen && <span>Thu gọn</span>}
          </button>
          <NavLink to="/login" className="mt-2 flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-50 transition-all font-bold">
            <LogOut size={20} />
            {isSidebarOpen && <span>Đăng xuất</span>}
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-indigo-50 sticky top-0 z-20">
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-wider">
            Quản lý đào tạo
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-gray-100 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-sm font-black text-gray-800">Cô Nguyễn Lan</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Giáo viên Chủ nhiệm</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black border border-white shadow-sm">
                NL
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-indigo-100 flex justify-around p-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              end={item.end} 
              className={({ isActive }) => `
                flex flex-col items-center gap-1.5 px-6 py-1 rounded-2xl transition-all
                ${isActive ? 'text-indigo-600 scale-110' : 'text-gray-400 opacity-70'}
              `}
            >
              {item.icon}
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
