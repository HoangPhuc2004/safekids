import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, LayoutGrid, CheckCircle2, PlayCircle, Plus, Info, Sparkles, Wand2, Type, Database, Check } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function CreateGameView() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("quiz");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [gameName, setGameName] = useState("");

  const templates = [
    {
      id: "quiz",
      name: "Trắc nghiệm nhanh",
      desc: "Kiểm tra kiến thức trực tiếp với phản hồi tức thì",
      img: "https://images.unsplash.com/photo-1655704705321-3ac52dc67f70?w=600&h=400&fit=crop"
    },
    {
      id: "match",
      name: "Ghép thẻ bài",
      desc: "Luyện tập nhận biết hình ảnh và khái niệm an toàn",
      img: "https://images.unsplash.com/photo-1759868937448-423d3c7c8133?w=600&h=400&fit=crop"
    },
    {
      id: "rescue",
      name: "Giải cứu gấu bông",
      desc: "Game nhập vai tương tác giúp trẻ rèn kỹ năng",
      img: "https://images.unsplash.com/photo-1725221330595-af50615c1677?w=600&h=400&fit=crop"
    }
  ];

  const videos = [
    { id: "v1", title: "Bài 1: Nhận biết hành vi quấy rối", questions: 10, duration: "10 phút", level: "Cơ bản" },
    { id: "v2", title: "Bài 2: Quy tắc đồ lót (PANTS)", questions: 15, duration: "15 phút", level: "Trung bình" },
    { id: "v3", title: "Bài 3: Cách nói KHÔNG và tự vệ", questions: 12, duration: "12 phút", level: "Nâng cao" }
  ];

  const handleCreateGame = () => {
    if (!selectedVideo || !gameName) {
      alert("Vui lòng nhập tên game và chọn video bài giảng!");
      return;
    }
    navigate("/teacher");
  };

  return (
    <div className="bg-transparent min-h-screen pb-32 flex flex-col font-sans">
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
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400">3</div>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiến trình tạo</span>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full p-6 lg:p-10 space-y-12">
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
              placeholder="VD: Ôn tập quy tắc 5 ngón tay - Lớp 5A..."
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => setSelectedVideo(vid.id)}
                className={`
                  p-6 rounded-[2rem] border-4 cursor-pointer transition-all relative group
                  ${selectedVideo === vid.id 
                    ? 'border-indigo-600 bg-white shadow-2xl shadow-indigo-100 scale-[1.02]' 
                    : 'border-transparent bg-white shadow-sm hover:border-indigo-100'}
                `}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${selectedVideo === vid.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                   <PlayCircle size={28} />
                </div>
                <h3 className="font-black text-gray-800 text-lg mb-4 leading-tight">{vid.title}</h3>
                <div className="flex flex-wrap gap-2">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter bg-gray-50 px-2 py-1 rounded-md">{vid.questions} CÂU HỎI</span>
                   <span className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter bg-indigo-50 px-2 py-1 rounded-md">{vid.level}</span>
                </div>
                {selectedVideo === vid.id && (
                  <div className="absolute top-6 right-6 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Check size={18} strokeWidth={4} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Step 3: Template Selection */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-amber-100">
                <Wand2 size={20} />
             </div>
             <h2 className="text-2xl font-black text-gray-900 tracking-tight">3. Khoác áo cho trò chơi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((tpl) => (
              <div 
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`
                  bg-white rounded-[2.5rem] overflow-hidden cursor-pointer border-4 transition-all relative group shadow-sm
                  ${selectedTemplate === tpl.id 
                    ? 'border-indigo-600 shadow-2xl shadow-indigo-100 scale-[1.02]' 
                    : 'border-transparent hover:border-indigo-100'}
                `}
              >
                <div className="h-48 relative overflow-hidden">
                  <ImageWithFallback src={tpl.img} alt={tpl.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                  <div className={`absolute inset-0 bg-indigo-600/10 transition-opacity ${selectedTemplate === tpl.id ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{tpl.name}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{tpl.desc}</p>
                </div>
                {selectedTemplate === tpl.id && (
                  <div className="absolute top-6 right-6 bg-indigo-600 text-white p-2 rounded-xl shadow-xl">
                    <CheckCircle2 size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Final Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 lg:p-10 pointer-events-none z-40">
        <div className="max-w-5xl mx-auto w-full pointer-events-auto">
          <button 
            onClick={handleCreateGame}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-black py-6 px-10 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center justify-between group transition-all transform active:scale-95"
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
