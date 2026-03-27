import { useState } from "react";
import { BookOpen, PlayCircle, Eye, Clock, ChevronDown, ChevronUp, Star } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function TeacherLecturesView() {
  const [filter, setFilter] = useState("newest"); // newest, mostViewed
  const [expandedModules, setExpandedModules] = useState<string[]>(["module-1"]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const suggestedVideos = [
    { id: "v1", title: "Nhận biết hành vi quấy rối học đường", duration: "10:05", views: 245, date: "15/10/2026", thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=250&fit=crop" },
    { id: "v2", title: "Kỹ năng phản ứng khi bị đe dọa", duration: "14:20", views: 189, date: "12/10/2026", thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop" },
  ];

  const modules = [
    {
      id: "module-1",
      title: "Module 1: Giáo dục giới tính cho trẻ",
      description: "Cung cấp kiến thức căn bản về giới tính, sự phát triển cơ thể và cách bảo vệ bản thân.",
      videos: [
        { id: "m1v1", title: "Bài 1: Cơ thể của tớ là của tớ", duration: "08:15", views: 320, date: "01/10/2026" },
        { id: "m1v2", title: "Bài 2: Vùng đồ bơi an toàn", duration: "11:30", views: 410, date: "05/10/2026" },
        { id: "m1v3", title: "Bài 3: Quy tắc 5 ngón tay", duration: "09:45", views: 280, date: "08/10/2026" },
      ]
    },
    {
      id: "module-2",
      title: "Module 2: Giáo dục về khoảng cách an toàn",
      description: "Hướng dẫn trẻ cách giữ khoảng cách an toàn với người lạ và người quen.",
      videos: [
        { id: "m2v1", title: "Bài 1: Vòng tròn giao tiếp", duration: "12:10", views: 156, date: "10/10/2026" },
        { id: "m2v2", title: "Bài 2: Nói KHÔNG thật to", duration: "07:50", views: 204, date: "14/10/2026" },
      ]
    }
  ];

  return (
    <div className="p-6 lg:p-10 bg-transparent min-h-full pb-24 font-sans">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <BookOpen size={36} className="text-indigo-600" /> Thư viện Bài giảng
        </h1>
        <p className="text-gray-500 font-bold mt-2 text-lg">Quản lý và duyệt các video bài giảng theo module học tập.</p>
      </div>

      {/* Suggested Videos */}
      <div className="mb-12">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-6 uppercase tracking-widest pl-2 border-l-4 border-pink-500">
          <Star size={20} className="text-pink-500" /> Video Đề Xuất
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedVideos.map(video => (
            <div key={video.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-indigo-50 overflow-hidden group cursor-pointer">
              <div className="relative h-48 w-full bg-gray-100">
                <ImageWithFallback src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <PlayCircle size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-black px-2 py-1 rounded-lg backdrop-blur-md">
                  {video.duration}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-black text-gray-800 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">{video.title}</h3>
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Eye size={14} /> {video.views}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-3xl border border-indigo-50 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest px-4">Các Module Bài Học</h2>
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl w-full sm:w-auto">
          <button 
            onClick={() => setFilter("newest")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${filter === 'newest' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Mới nhất
          </button>
          <button 
            onClick={() => setFilter("mostViewed")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${filter === 'mostViewed' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Xem nhiều
          </button>
        </div>
      </div>

      {/* Modules Accordion */}
      <div className="space-y-6">
        {modules.map(module => {
          const isExpanded = expandedModules.includes(module.id);
          
          const sortedVideos = [...module.videos].sort((a, b) => {
             if (filter === 'mostViewed') return b.views - a.views;
             
             // date sorting for "newest" where date is DD/MM/YYYY
             const aDate = a.date.split('/');
             const bDate = b.date.split('/');
             const valA = new Date(`${aDate[2]}-${aDate[1]}-${aDate[0]}`).getTime();
             const valB = new Date(`${bDate[2]}-${bDate[1]}-${bDate[0]}`).getTime();
             return valA - valB;
          });

          return (
            <div key={module.id} className="bg-white rounded-[2rem] border border-indigo-50 shadow-sm overflow-hidden">
              <button 
                onClick={() => toggleModule(module.id)}
                className="w-full text-left p-6 lg:p-8 flex items-center justify-between hover:bg-indigo-50/50 transition-colors"
              >
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-500 font-bold text-sm lg:text-base pr-8">{module.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform ${isExpanded ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="p-6 lg:p-8 pt-0 border-t border-indigo-50 bg-gray-50/30">
                  <div className="space-y-4 mt-6">
                    {sortedVideos.map((video) => (
                      <div key={video.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 lg:p-6 rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group cursor-pointer">
                        <div className="w-full sm:w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <PlayCircle size={28} />
                        </div>
                        <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                          <h4 className="font-black text-lg text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 truncate">{video.title}</h4>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg"><Clock size={14} /> {video.duration}</span>
                            <span className="flex items-center gap-1"><Eye size={14} /> {video.views} LƯỢT</span>
                            <span className="flex items-center gap-1 px-2 border-l border-gray-200">{video.date}</span>
                          </div>
                        </div>
                        <button className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 bg-gray-50 hover:bg-indigo-50 text-indigo-600 font-black text-xs uppercase tracking-widest rounded-xl transition-colors shrink-0">
                          Xem Bài Giảng
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
