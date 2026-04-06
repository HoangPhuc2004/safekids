import { useNavigate, useParams } from "react-router";
import { Users, Palette, Volume2, Maximize, Zap } from "lucide-react";
import { useGameRoom } from "../../context/GameRoomContext";

export default function TeacherLiveGame() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activeRoom } = useGameRoom();

  const handleEndGame = () => {
    // In a real app we might call endRoom() here, 
    navigate(`/teacher/game-stats/${id}`);
  };

  const players = activeRoom?.players || [];
  const accuracy = 75; // Mock

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative overflow-hidden flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-rose-200/40 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-200/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-100/40 to-transparent blur-2xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex flex-col opacity-0">
          <span className="text-white">Logo placeholder</span>
        </div>

        {/* Join Code Display */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-gray-100 border border-gray-200 shadow-sm px-4 py-2 rounded-xl text-gray-800 font-black tracking-widest text-xl">
          {id} 
          <span className="bg-white border border-gray-200 p-1.5 rounded-lg opacity-80 hover:opacity-100 cursor-pointer ml-2 shadow-sm text-gray-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-gray-200">
            <Palette size={16} /> Giao diện
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors border border-gray-200">
            <Volume2 size={18} />
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors border border-gray-200">
            <Maximize size={18} />
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-gray-200 mx-2">
            Tạm dừng <Zap size={16} className="text-yellow-500 fill-yellow-500" />
          </button>
          <button 
            onClick={handleEndGame}
            className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm"
          >
            Kết thúc
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 w-full max-w-5xl px-6 py-12 flex flex-col">
        
        {/* Progress Bar Container */}
        <div className="relative bg-gray-100 rounded-full h-16 w-full max-w-3xl border-2 border-gray-200 shadow-inner mx-auto mb-16 flex items-center overflow-visible">
          {/* Green Indicator */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-8 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
          
          {/* Red Indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-8 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>

          {/* Progress Bar fill Mock */}
          <div className="h-full bg-green-500/20 rounded-l-full w-[40%]"></div>
          <div className="h-full bg-red-500/20 rounded-r-full w-[10%]"></div>

          {/* Center Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-24 h-24 border-[6px] border-gray-50 flex flex-col items-center justify-center shadow-lg">
             <span className="text-gray-900 font-black text-2xl tracking-tight">{accuracy}%</span>
             <span className="text-gray-400 text-[10px] uppercase font-bold text-center leading-tight">Class<br/>accuracy</span>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white rounded-3xl pb-6 shadow-xl border border-gray-100 w-full mx-auto overflow-hidden text-sm">
          
          {/* Tabs */}
          <div className="flex items-center justify-center bg-gray-50 border-b border-gray-200">
            <div className="relative top-[1px]">
              <button className="px-8 py-4 font-bold text-rose-600 border-b-2 border-rose-600">Bảng xếp hạng</button>
              <button className="px-8 py-4 font-medium text-gray-500 hover:text-gray-700">Câu hỏi</button>
              <button className="px-8 py-4 font-medium text-gray-500 hover:text-gray-700 flex items-center gap-2">Chống gian lận <span className="text-xs">✕</span></button>
            </div>
          </div>

          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 text-gray-700 font-bold">
            <Users size={16} className="text-gray-500" />
            <span>{players.length} người chơi</span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 px-10 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 bg-white">
             <div className="col-span-2">Hạng</div>
             <div className="col-span-6">Tên</div>
             <div className="col-span-4">Điểm</div>
          </div>

          {/* Table Body */}
          <div className="space-y-2 px-4 mt-2">
             {players.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-semibold">Chưa có người chơi nào.</div>
             ) : (
                players.map((p, index) => (
                  <div key={p.id} className="grid grid-cols-12 px-6 py-3 items-center bg-white hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer border border-gray-100 shadow-sm">
                    <div className="col-span-2 font-black text-gray-600 text-base">{index + 1}</div>
                    <div className="col-span-6 flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs bg-gradient-to-br ${p.color}`}>
                          {p.avatar}
                       </div>
                       <span className="font-bold text-gray-800 tracking-wide">{p.name}</span>
                    </div>
                    <div className="col-span-2 font-bold text-gray-800 flex items-center gap-2">
                       {/* Mock Score */}
                       0
                    </div>
                    <div className="col-span-2 flex justify-end">
                       <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-rose-600 p-2 rounded-lg bg-gray-100 transition-all">
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
