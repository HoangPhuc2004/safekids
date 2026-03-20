import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, User, Settings, LogOut, Bell, Shield, HelpCircle, AlertTriangle, ChevronRight, Camera, CreditCard, ShieldCheck } from "lucide-react";

export default function ProfileView() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTeacher = location.pathname.startsWith("/teacher");

  return (
    <div className="bg-transparent min-h-screen pb-24 flex flex-col font-sans">
      {/* Premium Profile Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 p-8 lg:p-12 rounded-b-[3rem] lg:rounded-b-[4rem] shadow-2xl relative overflow-hidden text-white mb-10">
        {/* Animated background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
               <button onClick={() => navigate(-1)} className="p-2.5 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                <ArrowLeft size={22} />
              </button>
              <h1 className="text-2xl font-black tracking-tight uppercase">Tài khoản cá nhân</h1>
            </div>
            <button className="p-2.5 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
              <Settings size={22} />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group flex-shrink-0">
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl border-8 border-white/20 overflow-hidden text-indigo-600">
                <span className="text-4xl lg:text-5xl font-black">{isTeacher ? "NA" : "MĐ"}</span>
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-pink-600 rounded-2xl border-4 border-white text-white shadow-lg hover:scale-110 transition-all">
                <Camera size={20} />
              </button>
            </div>
            <div className="text-center md:text-left pt-2">
              <h2 className="text-3xl lg:text-4xl font-black mb-2 tracking-tight">{isTeacher ? "Cô Nguyễn Thị A" : "Minh Đức"}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-black border border-white/10">
                  {isTeacher ? "GIÁO VIÊN CHỦ NHIỆM" : "HỌC SINH LỚP 5A"}
                </span>
                <span className="bg-indigo-500/30 backdrop-blur-md px-4 py-1 rounded-full text-sm font-black border border-white/10 text-indigo-100">
                  ID: {isTeacher ? "TC-1029" : "ST-8472"}
                </span>
              </div>
              {!isTeacher && (
                <div className="mt-6 flex items-center justify-center md:justify-start gap-2 bg-yellow-400/20 border border-yellow-400/30 px-4 py-2 rounded-2xl text-yellow-200 font-black text-xs tracking-widest uppercase">
                  <ShieldCheck size={16} /> Danh hiệu: Hiệp sĩ An toàn
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Settings List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-indigo-50 overflow-hidden divide-y divide-indigo-50">
            <div className="p-6 lg:p-8 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-all group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <User size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-gray-800 text-lg">Thông tin cá nhân</h3>
                <p className="text-sm text-gray-500 font-medium">Thay đổi thông tin liên lạc và bí danh của em</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-indigo-400" />
            </div>
            
            <div className="p-6 lg:p-8 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-all group">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-gray-800 text-lg">Cài đặt thông báo</h3>
                <p className="text-sm text-gray-500 font-medium">Chọn cách em muốn nhận tin nhắn từ cô giáo</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-indigo-400" />
            </div>

            <div className="p-6 lg:p-8 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-all group">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-gray-800 text-lg">Bảo mật & Quyền riêng tư</h3>
                <p className="text-sm text-gray-500 font-medium">Đổi mật khẩu và quản lý bảo vệ hai lớp</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-indigo-400" />
            </div>

            <div className="p-6 lg:p-8 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-all group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-gray-800 text-lg">Trung tâm hỗ trợ</h3>
                <p className="text-sm text-gray-500 font-medium">Xem hướng dẫn sử dụng hoặc phản hồi lỗi</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {!isTeacher && (
            <button 
              onClick={() => navigate("/student/report")}
              className="w-full bg-red-600 hover:bg-red-700 text-white p-8 rounded-[2rem] font-black flex flex-col items-center justify-center gap-4 shadow-xl shadow-red-100 transition-all group border-b-8 border-red-800 active:border-b-0 active:translate-y-2"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle size={32} />
              </div>
              <span className="text-xl tracking-tight leading-none text-center">BÁO CÁO VI PHẠM KHẨN CẤP</span>
              <p className="text-red-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Cô giáo sẽ nhận được ngay!</p>
            </button>
          )}

          <div className="bg-indigo-50 p-8 rounded-[2rem] border-2 border-dashed border-indigo-200 flex flex-col items-center text-center">
             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-500 mb-4 shadow-sm">
                <CreditCard size={28} />
             </div>
             <h4 className="font-black text-gray-800 uppercase tracking-widest text-xs mb-2">Thành tích học tập</h4>
             <p className="text-gray-500 text-sm font-medium mb-6 italic">Em đã hoàn thành 5 bài học và 2 thử thách.</p>
             <button className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">Xem chứng chỉ</button>
          </div>

          <button 
            onClick={() => navigate("/")}
            className="w-full bg-white border-2 border-red-50 hover:bg-red-50 text-red-500 p-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all hover:shadow-md active:scale-95 mt-4"
          >
            <LogOut size={20} strokeWidth={3} />
            ĐĂNG XUẤT KHỎI HỆ THỐNG
          </button>
        </div>
      </div>
    </div>
  );
}