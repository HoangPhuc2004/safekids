import { useNavigate } from "react-router";
import { PlayCircle, Users, BarChart2, BookOpen, Plus, Activity, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function TeacherHome() {
  const navigate = useNavigate();

  const recentGames = [
    { id: "game-101", title: "Game Lớp 5A - Cơ bản", date: "10/10/2026", participants: 35, avgScore: 85 },
    { id: "game-102", title: "Game Lớp 4B - Phòng tránh", date: "09/10/2026", participants: 28, avgScore: 78 },
  ];

  const courses = [
    { id: "course-1", title: "Nhận biết hành vi quấy rối", duration: "10 phút", views: 120 },
    { id: "course-2", title: "Cách tự vệ và tìm sự trợ giúp", duration: "15 phút", views: 95 },
  ];

  return (
    <div className="p-6 lg:p-10 bg-transparent min-h-full pb-24">
      {/* Welcome & Stats Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Chào cô, <span className="text-indigo-600">Nguyễn Thị A</span> 👋
          </h1>
          <p className="text-gray-500 font-bold mt-1 text-lg">Hệ thống đã sẵn sàng cho buổi học hôm nay.</p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
          <div className="flex-shrink-0 bg-white p-4 pr-8 rounded-2xl shadow-sm border border-indigo-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Tỷ lệ hoàn thành</p>
              <p className="text-xl font-black text-gray-800 tracking-tight">92%</p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-white p-4 pr-8 rounded-2xl shadow-sm border border-indigo-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Tổng học sinh</p>
              <p className="text-xl font-black text-gray-800 tracking-tight">63</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Bài giảng & Games */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Bài giảng (Prominent Section) */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-indigo-50 flex flex-col items-start gap-8">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <BookOpen size={32} className="text-indigo-500" />
                Bài giảng 
              </h2>
              <button className="text-sm font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors">Quản lý Thư viện</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/teacher/course/${course.id}`)}
                  className="bg-gray-50 rounded-3xl p-4 cursor-pointer group border-2 border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden mb-4 shadow-inner">
                    <ImageWithFallback src={`https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=300&fit=crop`} alt="course thumbnail" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform opacity-80" />
                    <PlayCircle size={48} className="text-white relative z-10 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
                  </div>
                  <div className="px-2">
                    <h3 className="font-black text-gray-800 text-xl leading-tight group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-gray-500 uppercase tracking-tighter bg-gray-200/50 px-3 py-1.5 rounded-lg">{course.duration}</span>
                      <span className="text-xs font-black text-indigo-500 uppercase tracking-tighter bg-indigo-50 px-3 py-1.5 rounded-lg">{course.views} Lượt xem</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity: Games */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-indigo-50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <Activity size={24} className="text-pink-600" />
                Game đã thực hiện
              </h2>
              <button className="text-sm font-black text-indigo-600 uppercase tracking-widest hover:underline">Tất cả</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => navigate(`/teacher/game-stats/${game.id}`)}
                  className="p-6 rounded-3xl bg-gray-50 border-2 border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group flex items-start justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">
                      <Calendar size={12} /> {game.date}
                    </div>
                    <h3 className="font-black text-gray-800 text-lg mb-4 group-hover:text-indigo-600 transition-colors">{game.title}</h3>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Tham gia</p>
                        <p className="font-black text-gray-700">{game.participants} EM</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Điểm TB</p>
                        <p className="font-black text-green-600">{game.avgScore}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-300 group-hover:text-indigo-500 transition-colors">
                    <BarChart2 size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Actions */}
        <div className="space-y-6">
          <button 
            onClick={() => navigate("/teacher/create-game")} 
            className="w-full bg-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-transparent hover:border-indigo-500 transition-all group relative overflow-hidden text-left block"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[2rem] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                <Plus size={32} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Tạo Game mới</h3>
              <p className="text-gray-500 font-medium text-sm">Thiết lập thử thách trắc nghiệm tương tác cho lớp học của bạn.</p>
              <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest">
                Bắt đầu ngay <ArrowRight size={16} />
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate("/teacher/groups")} 
            className="w-full bg-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-transparent hover:border-pink-500 transition-all group relative overflow-hidden text-left block"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-[2rem] -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
                <Users size={32} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Quản lý Nhóm</h3>
              <p className="text-gray-500 font-medium text-sm">Theo dõi tiến độ, danh sách học sinh và thảo luận trong lớp.</p>
              <div className="mt-8 flex items-center gap-2 text-pink-600 font-black text-sm uppercase tracking-widest">
                Xem chi tiết <ArrowRight size={16} />
              </div>
            </div>
          </button>

          {/* Quick Support Card */}
          <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl shadow-indigo-200 text-white relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-125 transition-transform" />
            <h3 className="text-xl font-black mb-2 relative z-10">Cần hỗ trợ kỹ thuật?</h3>
            <p className="text-indigo-100 font-medium text-sm mb-6 relative z-10">Đội ngũ SafeKids luôn sẵn sàng giải đáp thắc mắc của cô 24/7.</p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest relative z-10 hover:bg-indigo-50 transition-colors shadow-lg">
              Liên hệ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
