import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LandingView() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [hasDisability, setHasDisability] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (login(email, password)) {
        if (role === "teacher") navigate("/teacher");
        else navigate("/student");
      } else {
        alert("Sai email hoặc mật khẩu!");
      }
    } else {
      alert("Đăng ký thành công, vui lòng đăng nhập!");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Visual Section - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 items-center justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center text-white px-12 max-w-xl">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl mb-8 animate-bounce-slow">
            <Shield size={56} className="text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl font-black mb-6 tracking-tight leading-tight">
            SafeKids <span className="text-pink-200">Academy</span>
          </h1>
          <p className="text-xl text-pink-50 font-medium leading-relaxed opacity-90 mb-8">
            Nền tảng học tập tương tác giúp trẻ em tự bảo vệ bản thân và xây dựng môi trường an toàn, hạnh phúc.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">1,000+ Học sinh đang tham gia</span>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-400 rounded-full blur-2xl opacity-40 animate-pulse" />
      </div>

      {/* Auth Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-20 h-20 bg-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-200">
              <Shield size={40} className="text-white" />
            </div>
          </div>
          
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Chào mừng bạn!</h2>
            <p className="text-gray-500 text-lg">Bắt đầu hành trình học tập an toàn cùng SafeKids.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-pink-100 border border-white relative overflow-hidden">
            {/* Top glassmorphism highlight */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-400 opacity-60" />
            
            <div className="flex gap-1 mb-8 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  isLogin ? "bg-white text-pink-600 shadow-sm ring-1 ring-gray-100" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  !isLogin ? "bg-white text-pink-600 shadow-sm ring-1 ring-gray-100" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Đăng ký
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800 ml-1">
                  Vai trò của bạn
                </label>
                <div className="relative group">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-pink-500 focus:bg-white transition-all appearance-none text-gray-800 font-medium"
                  >
                    <option value="student">Học sinh / Trẻ em</option>
                    <option value="teacher">Giáo viên / Phụ huynh</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-pink-500">
                    <ArrowRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-pink-500 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800 ml-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-pink-500 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className="flex items-center gap-3 p-4 bg-pink-50/50 rounded-2xl border border-pink-100 cursor-pointer hover:bg-pink-50 transition-colors group">
                    <input
                      type="checkbox"
                      checked={hasDisability}
                      onChange={(e) => setHasDisability(e.target.checked)}
                      className="w-5 h-5 accent-pink-600 rounded-lg cursor-pointer"
                    />
                    <span className="text-sm font-bold text-pink-900 group-hover:text-pink-600">
                      Tôi cần hỗ trợ tiếp cận (Dành cho người khuyết tật)
                    </span>
                  </label>

                  {hasDisability && (
                    <div className="pl-4 border-l-2 border-pink-200 py-1 space-y-1 animate-in zoom-in-95 duration-300">
                      <label className="block text-xs font-bold text-pink-700 uppercase tracking-wider ml-1">
                        Loại hỗ trợ:
                      </label>
                      <select className="w-full px-4 py-3 bg-white border-2 border-pink-100 rounded-2xl focus:outline-none focus:border-pink-500 text-sm font-semibold text-pink-900">
                        <option value="khiem_thinh">Phụ đề & Ngôn ngữ ký hiệu (Khiếm thính)</option>
                        <option value="khiem_thi">Trình đọc màn hình (Khiếm thị)</option>
                        <option value="khuyet_tat_van_dong">Điều khiển bàn phím (Vận động)</option>
                        <option value="khac">Khác</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-200 text-white font-black py-4 rounded-2xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-lg shadow-md mt-8"
              >
                {isLogin ? (
                  <>
                    <LogIn size={20} strokeWidth={3} /> Đăng nhập ngay
                  </>
                ) : (
                  <>
                    <UserPlus size={20} strokeWidth={3} /> Bắt đầu ngay
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm font-medium">
              &copy; 2026 SafeKids Academy. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
