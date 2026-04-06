import { useNavigate, useParams } from "react-router";
import { Users, Palette, Volume2, Maximize, Pause, Zap } from "lucide-react";
import { useGameRoom } from "../../context/GameRoomContext";

export default function TeacherLiveGame() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activeRoom } = useGameRoom();

  const handleEndGame = () => {
    // In a real app we might call endRoom() here, 
    // but we can just navigate to the stats screen
    navigate(`/teacher/game-stats/${id}`);
  };

  // Safe fallback if room is lost
  const players = activeRoom?.players || [];
  
  // Calculate mock accuracy based on players count or just random
  const accuracy = 75; // Mock

  return (
    <div className="min-h-screen bg-[#11050e] font-sans relative overflow-hidden flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-yellow-500/10 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-500/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-pink-600/10 to-transparent blur-2xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 py-3 bg-[#111111]/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex flex-col opacity-0">
          <span className="text-white">Logo placeholder</span>
        </div>

        {/* Join Code Display */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-xl text-white font-black tracking-widest text-xl">
          {id} 
          <span className="bg-[#3a3a3a] p-1.5 rounded-lg opacity-80 hover:opacity-100 cursor-pointer ml-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-white/5">
            <Palette size={16} /> Giao diện
          </button>
          <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-2 rounded-lg transition-colors border border-white/5">
            <Volume2 size={18} />
          </button>
          <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-2 rounded-lg transition-colors border border-white/5">
            <Maximize size={18} />
          </button>
          <button className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-white/5 mx-2">
            Tạm dừng <Zap size={16} className="text-yellow-400 fill-yellow-400" />
          </button>
          <button 
            onClick={handleEndGame}
            className="bg-[#ED2E7E] hover:bg-[#c92469] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg"
          >
            Kết thúc
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 w-full max-w-5xl px-6 py-12 flex flex-col">
        
        {/* Progress Bar Container */}
        <div className="relative bg-[#1A0B16] rounded-full h-16 w-full max-w-3xl border-2 border-black shadow-inner shadow-black/50 mx-auto mb-16 flex items-center overflow-visible">
          {/* Green Indicator */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-8 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
          
          {/* Red Indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-8 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>

          {/* Progress Bar fill Mock */}
          <div className="h-full bg-green-500/20 rounded-l-full w-[40%]"></div>
          <div className="h-full bg-red-500/20 rounded-r-full w-[10%]"></div>

          {/* Center Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-24 h-24 border-[6px] border-[#22101D] flex flex-col items-center justify-center shadow-2xl">
             <span className="text-black font-black text-2xl tracking-tight">{accuracy}%</span>
             <span className="text-gray-500 text-[10px] uppercase font-bold text-center leading-tight">Class<br/>accuracy</span>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-[#1f1e24] rounded-3xl pb-6 shadow-2xl border border-white/5 w-full mx-auto overflow-hidden text-sm">
          
          {/* Tabs */}
          <div className="flex items-center justify-center bg-[#111111]/40 border-b border-black">
            <div className="relative top-[1px]">
              <button className="px-8 py-4 font-bold text-white border-b-2 border-white">Bảng xếp hạng</button>
              <button className="px-8 py-4 font-medium text-gray-400 hover:text-gray-300">Câu hỏi</button>
              <button className="px-8 py-4 font-medium text-gray-400 hover:text-gray-300 flex items-center gap-2">Chống gian lận <span className="text-xs">✕</span></button>
            </div>
          </div>

          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 text-gray-300 font-bold">
            <Users size={16} />
            <span>{players.length} người chơi</span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 px-10 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
             <div className="col-span-2">Hạng</div>
             <div className="col-span-6">Tên</div>
             <div className="col-span-4">Điểm</div>
          </div>

          {/* Table Body */}
          <div className="space-y-1 px-4">
             {players.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-semibold">Chưa có người chơi nào.</div>
             ) : (
                players.map((p, index) => (
                  <div key={p.id} className="grid grid-cols-12 px-6 py-3 items-center bg-[#2a2930] hover:bg-[#32313a] rounded-xl transition-colors group cursor-pointer border border-[#36353d]">
                    <div className="col-span-2 font-black text-white text-base opacity-80">{index + 1}</div>
                    <div className="col-span-6 flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs bg-gradient-to-br ${p.color}`}>
                          {p.avatar}
                       </div>
                       <span className="font-bold text-white tracking-wide">{p.name}</span>
                    </div>
                    <div className="col-span-2 font-bold text-white flex items-center gap-2">
                       {/* Mock Score */}
                       0
                    </div>
                    <div className="col-span-2 flex justify-end">
                       <button className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white p-2 rounded-lg bg-[#1f1e24] transition-all">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                       </button>
                    </div>
                  </div>
                ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
