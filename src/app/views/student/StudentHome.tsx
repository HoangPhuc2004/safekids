import { useNavigate } from "react-router";
import { KeyRound, Trophy, Compass, BookOpen, Star } from "lucide-react";
import { useGameRoom } from "../../context/GameRoomContext";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function StudentHome() {
  const navigate = useNavigate();
  const { joinRoom } = useGameRoom();
  const { user } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  
  const userName = user?.name || "Học sinh";
  const userAvatar = userName.substring(0, 2).toUpperCase();

  const learningPath = [
    { id: "course-1", title: "Bài 1: Cơ thể của tớ", status: "completed", duration: "10 phút", description: "Tìm hiểu về các bộ phận cơ thể và ranh giới cá nhân." },
    { id: "course-2", title: "Bài 2: Vùng đồ bơi an toàn", status: "current", duration: "15 phút", description: "Quy tắc vùng đồ bơi và cách giữ an toàn cho bản thân." },
    { id: "course-3", title: "Bài 3: Nói Không - Chạy - Kể", status: "locked", duration: "12 phút", description: "Kỹ năng xử lý khi gặp tình huống nguy hiểm." },
  ];

  return (
    <div className="p-6 lg:p-10 bg-transparent min-h-full pb-24">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Chào em, <span className="text-pink-600">{userName}</span> 👋
          </h1>
          <p className="text-gray-500 font-bold mt-1 text-lg">Hôm nay em muốn khám phá điều gì mới nào?</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-indigo-50">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Điểm thưởng</p>
            <p className="text-xl font-black text-gray-800">1,250 <span className="text-xs text-orange-500">KIM CƯƠNG</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Game & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Game Lobby Card */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-50 transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-200 rotate-3 group-hover:rotate-0 transition-transform">
                <KeyRound size={48} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Đấu trường Trắc nghiệm</h2>
                <p className="text-gray-500 font-medium mb-6">Nhập mã phòng từ cô giáo để cùng các bạn tranh tài kiến thức an toàn!</p>
                <div className="flex flex-col sm:flex-row w-full gap-3">
                  <input 
                    type="text" 
                    placeholder="Nhập mã phòng (VD: 1234)" 
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="flex-1 px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all uppercase tracking-widest font-mono font-black text-lg text-center md:text-left" 
                  />
                  <button 
                    onClick={() => {
                      if (!roomCode) return;
                      const success = joinRoom(roomCode, { name: userName, avatar: userAvatar, color: "from-indigo-500 to-blue-600" });
                      if (success) {
                        navigate("/student/game-lobby");
                      } else {
                        alert("Không tìm thấy mã phòng hoặc phòng đã đóng!");
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg hover:shadow-indigo-200 active:scale-95"
                  >
                    VÀO NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Grids */}
          <div className="grid grid-cols-1 gap-6">
            <button onClick={() => navigate("/student/groups")} className="bg-white p-8 rounded-[2rem] shadow-sm border border-indigo-50 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 hover:border-indigo-200 transition-all hover:shadow-lg hover:-translate-y-1 group">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:scale-110 shrink-0 shadow-inner">
                <Compass size={40} strokeWidth={2.5} />
              </div>
              <div className="flex-1 flex flex-col justify-center h-full pt-1">
                <h3 className="font-black text-2xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">Nhóm Hỏi Đáp (Thảo luận)</h3>
                <p className="text-gray-500 font-medium">Nơi chia sẻ, hỏi đáp và cùng nhau tìm hiểu kiến thức về an toàn học đường cùng cô giáo và các bạn.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Learning Path */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <BookOpen size={24} className="text-pink-600" />
              Lộ trình học
            </h2>
          </div>

          <div className="space-y-4">
            {learningPath.map((course, index) => (
              <div key={course.id} className="relative group">
                <div 
                  onClick={() => course.status !== 'locked' ? navigate(`/student/course/${course.id}`) : null}
                  className={`
                    p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden
                    ${course.status === 'locked' 
                      ? 'bg-gray-50 border-gray-100 opacity-60 grayscale cursor-not-allowed' 
                      : course.status === 'current'
                        ? 'bg-white border-pink-500 shadow-xl shadow-pink-100 -translate-y-1'
                        : 'bg-white border-gray-100 hover:border-indigo-300 hover:shadow-lg shadow-sm'}
                  `}
                >
                  {course.status === 'current' && (
                    <div className="absolute top-0 right-0 p-3">
                      <Star size={20} className="text-pink-500 fill-pink-500" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-lg
                      ${course.status === 'completed' ? 'bg-green-100 text-green-600' : 
                        course.status === 'current' ? 'bg-pink-100 text-pink-600' : 'bg-gray-200 text-gray-400'}
                    `}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className={`font-black text-lg leading-tight ${course.status === 'locked' ? 'text-gray-500' : 'text-gray-900'}`}>
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium mt-1 mb-2 line-clamp-1">{course.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black px-2 py-1 bg-gray-100 text-gray-400 rounded-lg">{course.duration}</span>
                        {course.status === 'completed' && <span className="text-xs font-black text-green-600 tracking-widest uppercase">Hoàn thành!</span>}
                        {course.status === 'current' && <span className="text-xs font-black text-pink-500 animate-pulse tracking-widest uppercase">Đang học...</span>}
                      </div>
                    </div>
                  </div>
                </div>
                {index < learningPath.length - 1 && (
                  <div className="ml-12 h-4 w-1 bg-gray-100 mx-auto my-1" />
                )}
              </div>
            ))}
          </div>
          
          <button className="w-full py-4 text-indigo-600 font-black text-sm uppercase tracking-widest hover:bg-indigo-50 rounded-2xl transition-all">
            Xem tất cả bài học
          </button>
        </div>
      </div>
    </div>
  );
}
