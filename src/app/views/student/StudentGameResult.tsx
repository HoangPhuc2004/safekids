import { useNavigate, useParams } from "react-router";
import { X, Maximize, Info, Check, Clock, Flame, SquareCheck } from "lucide-react";

export default function StudentGameResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mockData = {
    name: "Phuc",
    rank: 1,
    totalPlayers: 1,
    score: 2300,
    accuracy: 48,
    stats: {
      correct: 3,
      partial: 2,
      incorrect: 3,
      timePerQuestion: 2,
      streak: 2
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen bg-gray-50 font-sans overflow-y-auto no-scrollbar z-[9999] p-4 lg:p-8">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 fixed">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-rose-200/40 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-200/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-100/40 to-transparent blur-2xl"></div>
      </div>

      {/* Floating Emojis Side Bar */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 bg-white/80 p-2 rounded-full backdrop-blur-md border border-gray-200 shadow-md">
        <button className="w-10 h-10 hover:scale-110 transition-transform bg-rose-50 rounded-full flex items-center justify-center font-black text-rose-600 text-[10px] uppercase shadow-sm">Mới</button>
        <button className="w-10 h-10 hover:scale-110 transition-transform bg-rose-50 rounded-full flex items-center justify-center font-black text-rose-600 text-[10px] uppercase shadow-sm">SUS</button>
        <button className="w-10 h-10 hover:scale-110 transition-transform bg-rose-50 text-2xl rounded-full flex items-center justify-center shadow-sm">🤯</button>
        <button className="w-10 h-10 hover:scale-110 transition-transform bg-rose-50 rounded-full flex items-center justify-center font-black text-orange-600 shadow-sm">OP</button>
        <button className="w-10 h-10 hover:scale-110 transition-transform bg-rose-50 text-2xl rounded-full flex items-center justify-center shadow-sm">🤪</button>
      </div>

      {/* Top Header Controls */}
      <div className="relative z-10 w-full flex justify-between items-center max-w-5xl mx-auto mb-6">
        <button 
          onClick={() => navigate("/student")}
          className="w-10 h-10 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 border border-gray-200 transition-all shadow-sm"
        >
          <X size={20} />
        </button>
        <button className="w-10 h-10 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 border border-gray-200 transition-all shadow-sm">
          <Maximize size={20} />
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 w-full pb-20 pt-2 lg:pt-0">
        
        {/* Top Two Cards Row */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          
          {/* Main Score Card */}
          <div className="flex-1 bg-white rounded-[2rem] p-8 border border-rose-200 relative overflow-hidden shadow-xl flex flex-col sm:flex-row justify-between items-center sm:items-start min-h-[220px]">
             <div className="flex flex-col h-full justify-between z-10 w-full sm:w-auto text-center sm:text-left">
               <div className="font-bold text-rose-600 text-lg sm:text-xl flex items-center gap-2 mb-8 sm:mb-0 justify-center sm:justify-start">
                 🎉 Chiến thắng xuất sắc, tiếp tục phát huy nhé, {mockData.name}!
               </div>
               
               <div className="flex items-center justify-center sm:justify-start gap-12 mt-auto">
                 <div className="flex flex-col">
                   <div className="flex items-end font-black text-gray-900 gap-1 justify-center sm:justify-start">
                     <span className="text-4xl">{mockData.rank}</span>
                     <span className="text-xl pb-1 text-gray-500">/{mockData.totalPlayers}</span>
                   </div>
                   <div className="text-gray-500 font-bold text-sm tracking-wide">Rank <svg className="inline w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg></div>
                 </div>

                 <div className="flex flex-col">
                   <div className="font-black text-gray-900 text-4xl leading-tight">
                     {mockData.score}
                   </div>
                   <div className="text-gray-500 font-bold text-sm tracking-wide">Score</div>
                 </div>
               </div>
             </div>

             {/* 3D Avatar */}
             <div className="mt-8 sm:mt-0 flex flex-col items-center z-10">
               <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(225,42,117,0.15)]">
                 <span className="text-6xl">🧑‍🚀</span>
               </div>
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-black transition-colors w-full shadow-lg">
                 Cửa hàng
               </button>
             </div>
          </div>

          {/* Mini Games Card */}
          <div className="w-full md:w-72 bg-white rounded-[2rem] p-6 border border-gray-200 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-center gap-4 mb-4 mt-6">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center transform group-hover:-translate-y-1 transition-transform rotate-12 shadow-sm text-lg">🍂</div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center transform group-hover:-translate-y-2 transition-transform -translate-y-2 shadow-sm text-2xl">🔰</div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center transform group-hover:-translate-y-1 transition-transform -rotate-12 shadow-sm text-lg">🧧</div>
            </div>
            
            <div className="text-center w-full">
              <h3 className="font-black text-gray-800 text-lg mb-4 tracking-tight">Chơi minigame</h3>
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-black transition-all shadow-lg active:scale-95">
                 Chơi ngay
              </button>
            </div>
          </div>

        </div>

        {/* Accuracy Bar Component */}
        <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-sm mb-4 justify-center sm:justify-start">
            Độ chính xác <Info size={16} className="text-gray-400" />
          </div>
          
          <div className="relative w-full h-8 bg-gray-200 rounded-full mb-2 flex overflow-visible border-2 border-transparent">
            {/* Outline highlight effect */}
            <div className="absolute inset-[-4px] rounded-full border-2 border-rose-500/10 pointer-events-none"></div>

            <div className="h-full bg-[#22c55e] rounded-l-full shadow-[0_0_15px_rgba(34,197,94,0.3)] relative z-10" style={{ width: `${mockData.accuracy}%` }}></div>
            <div className="h-full bg-[#E12A75] rounded-r-full shadow-[0_0_15px_rgba(225,42,117,0.3)] relative z-10" style={{ width: `${100 - mockData.accuracy}%` }}></div>
            
            {/* Percent Badge Bubble */}
            <div className="absolute left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 border-[3px] border-white flex flex-col items-center justify-center shadow-md z-20">
               <span className="text-gray-900 font-black text-xs leading-none">{mockData.accuracy}%</span>
            </div>
          </div>
        </div>

        {/* Performance Stats Component */}
        <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center text-gray-800 font-bold pb-2">
            <span>Thống kê hiệu suất</span>
            <span className="text-sm font-semibold text-gray-500">8 câu hỏi</span>
          </div>

          <div className="flex flex-wrap gap-3">
             <div className="flex items-center gap-1.5 bg-green-50 text-green-600 font-black text-xs px-3 py-1.5 rounded-lg border border-green-200">
               <Check size={14} strokeWidth={3} /> {mockData.stats.correct} Đúng
             </div>
             <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 font-black text-xs px-3 py-1.5 rounded-lg border border-yellow-200">
               <Check size={14} strokeWidth={3} /> {mockData.stats.partial} Đúng một phần
             </div>
             <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 font-black text-xs px-3 py-1.5 rounded-lg border border-rose-200">
               <X size={14} strokeWidth={3} /> {mockData.stats.incorrect} Sai
             </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
             <div className="flex items-center gap-2 bg-teal-50 text-teal-600 font-black text-xs px-3 py-2 rounded-lg border border-teal-200">
               <Clock size={16} /> {mockData.stats.timePerQuestion}s t.gian/câu hỏi
             </div>
             <div className="flex items-center gap-2 bg-orange-50 text-orange-600 font-black text-xs px-3 py-2 rounded-lg border border-orange-200">
               <Flame size={16} /> {mockData.stats.streak} Chuỗi đúng
             </div>
          </div>
        </div>

        {/* Review Questions Component */}
        <div className="w-full space-y-4">
          <div className="text-gray-800 font-bold leading-tight">
             <div className="text-lg tracking-tight">Xem lại câu hỏi</div>
             <div className="text-gray-500 text-sm font-semibold">Nhấn vào câu hỏi để xem chi tiết</div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 flex flex-col gap-6 cursor-pointer hover:scale-[1.01] transition-transform">
            <h4 className="font-bold text-gray-800 text-lg">
              1. Choose the participle: Tengo la cara _________
            </h4>
            <div className="w-full border-b border-dashed border-gray-300"></div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-4 cursor-pointer">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <span className="text-gray-600 font-semibold">quemada</span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
