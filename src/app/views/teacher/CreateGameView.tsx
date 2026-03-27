import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, PlayCircle, Plus, Info, Sparkles, Type, Database, Check } from "lucide-react";
import { useGameRoom } from "../../context/GameRoomContext";

export default function CreateGameView() {
  const navigate = useNavigate();
  const { createRoom } = useGameRoom();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [gameName, setGameName] = useState("");
  const [expandedModules, setExpandedModules] = useState<string[]>(["module-1"]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const modules = [
    {
      id: "module-1",
      title: "Module 1: Nhận biết hành vi quấy rối",
      desc: "Câu hỏi trắc nghiệm và tình huống xử lý về các hành vi không an toàn.",
      stories: [
        { id: "s1", title: "Cốt truyện: Chuyến dã ngoại", questions: 10, level: "Cơ bản" },
        { id: "s2", title: "Cốt truyện: Người lạ mặt ở siêu thị", questions: 15, level: "Trung bình" }
      ]
    },
    {
      id: "module-2",
      title: "Module 2: Kỹ năng tự vệ",
      desc: "Các kỹ năng phòng tránh và xử lý khi gặp tình huống nguy hiểm.",
      stories: [
        { id: "s3", title: "Cốt truyện: Bí mật bị đe dọa", questions: 12, level: "Nâng cao" },
        { id: "s4", title: "Cốt truyện: Tin nhắn lạ", questions: 8, level: "Cơ bản" }
      ]
    }
  ];

  const handleCreateGame = () => {
    if (!selectedStory || !gameName) {
      alert("Vui lòng nhập tên game và chọn cốt truyện!");
      return;
    }
    createRoom({
      teacherId: "t1",
      gameName,
      template: "quiz",
      video: selectedStory
    });
    navigate("/teacher/game-lobby");
  };

  return (
    <div className="bg-transparent min-h-screen pb-12 flex flex-col font-sans">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm">
            <ChevronLeft size={22} />
          </button>
          <h1 className="font-black text-gray-800 text-lg lg:text-xl tracking-tight">
            Thiết lập Game học tập
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-indigo-600">1</div>
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400">2</div>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiến trình tạo</span>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full p-6 lg:p-10 space-y-12">
        {/* Step 1: Basic Info */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Type size={20} />
             </div>
             <h2 className="text-2xl font-black text-gray-900 tracking-tight">1. Thông tin trò chơi</h2>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-indigo-50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
              <Sparkles size={80} className="text-indigo-600" />
            </div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Tên trò chơi (Gợi nhớ cho cô)</label>
            <input 
              type="text" 
              placeholder="VD: Ôn tập kỹ năng tự vệ - Lớp 5A..."
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="w-full text-2xl font-black text-gray-800 bg-transparent border-b-4 border-indigo-50 focus:border-indigo-600 transition-all outline-none pb-4 placeholder:text-gray-200"
            />
            <p className="text-xs text-gray-400 font-medium mt-4 italic flex items-center gap-2">
              <Info size={14} /> Tên này sẽ hiển thị trong danh sách quản lý của cô.
            </p>
          </div>
        </section>

        {/* Step 2: Content Selection */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-pink-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-pink-200">
                <Database size={20} />
             </div>
             <h2 className="text-2xl font-black text-gray-900 tracking-tight">2. Chọn kho tàng câu hỏi</h2>
          </div>

          <div className="space-y-4">
            {modules.map(module => {
              const isExpanded = expandedModules.includes(module.id);
              return (
                <div key={module.id} className="bg-white rounded-[2rem] border border-indigo-50 shadow-sm overflow-hidden">
                  <button 
                    onClick={() => toggleModule(module.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-indigo-50/50 transition-colors"
                  >
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{module.title}</h3>
                      <p className="text-gray-500 font-bold text-sm">{module.desc}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform ${isExpanded ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                      <span className="font-bold">{isExpanded ? '−' : '+'}</span>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="p-6 pt-0 bg-gray-50/30 border-t border-indigo-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {module.stories.map((story) => (
                          <div 
                            key={story.id}
                            onClick={() => setSelectedStory(story.id)}
                            className={`
                              p-5 rounded-3xl border-2 cursor-pointer transition-all relative group flex items-start gap-4
                              ${selectedStory === story.id 
                                ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100 scale-[1.02]' 
                                : 'border-transparent bg-white shadow-sm hover:border-indigo-100'}
                            `}
                          >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${selectedStory === story.id ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                              <PlayCircle size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-gray-800 text-base mb-2 leading-tight pr-6 truncate">{story.title}</h4>
                              <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter bg-gray-100 px-2 py-1 rounded-md">{story.questions} CÂU HỎI</span>
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter bg-indigo-50 px-2 py-1 rounded-md">{story.level}</span>
                              </div>
                            </div>
                            {selectedStory === story.id && (
                              <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md">
                                <Check size={14} strokeWidth={4} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final Action */}
        <div className="pt-4">
          <button 
            onClick={handleCreateGame}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-black py-6 px-10 rounded-[2rem] shadow-xl shadow-indigo-200 flex items-center justify-between group transition-all transform active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Plus size={24} strokeWidth={4} />
              </div>
              <div className="text-left">
                 <p className="text-xs font-black text-indigo-200 uppercase tracking-widest leading-none mb-1">Xác nhận thiết lập</p>
                 <p className="text-xl tracking-tight">KÍCH HOẠT GAME NGAY</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-indigo-200 font-black text-sm uppercase tracking-widest pl-10">
              Sẵn sàng cho lớp học <ChevronLeft size={20} className="rotate-180" strokeWidth={3} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
