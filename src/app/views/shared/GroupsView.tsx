import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Plus, MessageCircle, ShieldCheck, Search, Clock, ChevronRight, X } from "lucide-react";

export default function GroupsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTeacher = location.pathname.startsWith("/teacher");

  const [groups, setGroups] = useState([
    { 
      id: "group-1", 
      name: "Nhóm Hỗ Trợ 5A", 
      lastMessage: "Cô ơi, nếu có người trêu chọc bạn bè con thì con làm sao ạ?", 
      time: "10:30 AM", 
      unread: 2, 
      avatar: "5A",
    },
    { 
      id: "group-2", 
      name: "Trao đổi chung khối 5", 
      lastMessage: "Cảm ơn cô đã hướng dẫn quy tắc 5 ngón tay", 
      time: "Hôm qua", 
      unread: 0, 
      avatar: "K5",
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      lastMessage: "Nhóm vừa được tạo",
      time: "Vừa xong",
      unread: 0,
      avatar: newGroupName.substring(0, 2).toUpperCase(),
    };
    setGroups([newGroup, ...groups]);
    setNewGroupName("");
    setIsCreateModalOpen(false);
  };

  return (
    <div className="bg-transparent min-h-screen pb-24 flex flex-col font-sans relative">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-black text-gray-800 text-lg lg:text-xl tracking-tight">
            Thảo luận nhóm
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Search size={22} />
          </button>
          {isTeacher && (
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              <Plus size={22} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full p-6 lg:p-10">
        {/* Safe Space Alert */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-[2rem] p-8 mb-10 flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-indigo-100/50 text-white relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-10 group-hover:scale-125 transition-transform">
            <ShieldCheck size={160} />
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl font-black mb-1">Không gian chia sẻ An toàn</h3>
            <p className="text-indigo-100 font-medium leading-relaxed opacity-90">
              Đây là nơi các em có thể đặt câu hỏi về các vấn đề quấy rối, thắc mắc bài học để cô giáo và các bạn cùng hỗ trợ. Mọi chia sẻ của em đều được bảo mật và trân trọng.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-2xl text-gray-900">Danh sách nhóm của {isTeacher ? 'cô' : 'em'}</h2>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{groups.length} NHÓM HOẠT ĐỘNG</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => navigate(`${isTeacher ? '/teacher' : '/student'}/groups/${group.id}`)}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-indigo-50 flex items-center gap-5 cursor-pointer hover:border-pink-300 hover:shadow-xl hover:shadow-pink-50 transition-all group relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform">
                {group.avatar}
                {group.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-black flex items-center justify-center border-4 border-white shadow-lg animate-bounce">
                    {group.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-black text-gray-800 text-lg group-hover:text-pink-600 transition-colors truncate">{group.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  <Clock size={12} /> {group.time}
                </div>
                <p className="text-sm text-gray-500 font-medium line-clamp-1 italic">"{group.lastMessage}"</p>
              </div>
              
              <div className="flex items-center gap-1 ml-2">
                <div className="text-gray-300 group-hover:text-pink-400 transition-colors ml-1">
                  <ChevronRight size={24} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Support Section for Desktop */}
        <div className="mt-16 bg-white p-8 rounded-[3rem] border border-dashed border-indigo-200 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-6">
            <MessageCircle size={32} />
          </div>
          <h3 className="font-black text-xl text-gray-800 mb-2">Cần tạo nhóm thảo luận riêng?</h3>
          <p className="text-gray-500 font-medium mb-6 max-w-md">Nếu em muốn trao đổi riêng với chuyên gia hoặc cô giáo, hãy nhấn vào nút bên dưới.</p>
          <button className="px-8 py-3 bg-indigo-50 text-indigo-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-100 transition-all">
            Yêu cầu tư vấn 1-1
          </button>
        </div>
      </div>

      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-gray-800 mb-2 text-center mt-2">Tạo nhóm lớp mới</h2>
            <p className="text-gray-500 text-center text-sm font-medium mb-6">Nhập tên nhóm để tạo mới.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Tên nhóm</label>
                <input 
                  type="text" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Ví dụ: Nhóm 1, Nhóm Tiếng Anh..."
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-xl py-3 px-4 outline-none font-medium text-gray-700 transition-all"
                />
              </div>
              <button 
                onClick={handleCreateGroup}
                className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
              >
                Tạo nhóm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
