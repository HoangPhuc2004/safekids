import { useNavigate } from "react-router";
import { Users, Play, ArrowLeft, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { useGameRoom } from "../../context/GameRoomContext";
import { useState } from "react";

export default function TeacherGameLobby() {
  const navigate = useNavigate();
  const { activeRoom, startGame, leaveRoom } = useGameRoom();
  const [copied, setCopied] = useState(false);

  if (!activeRoom) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-black text-gray-800 mb-4">Chưa có phòng game nào</h2>
        <button 
          onClick={() => navigate("/teacher/create-game")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black shadow-lg"
        >
          Tạo game ngay
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(activeRoom.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = () => {
    startGame(activeRoom.id);
    navigate(`/teacher/game-stats/${activeRoom.id}`); // Giả lập bắt đầu game -> sang thống kê
  };

  return (
    <div className="p-6 lg:p-10 bg-transparent min-h-full pb-24 font-sans">
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate("/teacher")}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors bg-white px-4 py-2 rounded-xl shadow-sm"
        >
          <ArrowLeft size={18} /> Rời phòng
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-indigo-100/50 border border-indigo-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-50 rounded-tr-full -ml-10 -mb-10 opacity-50"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start justify-between">
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
              <Sparkles size={16} /> Phòng chờ
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              {activeRoom.gameName}
            </h1>
            
            <div className="mt-8">
              <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-3">Mã phòng cho học sinh</p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="bg-gray-100 px-8 py-4 rounded-2xl border-2 border-gray-200 text-5xl font-mono font-black text-indigo-700 tracking-[0.2em] shadow-inner">
                  {activeRoom.id}
                </div>
                <button 
                  onClick={handleCopy}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-4 rounded-2xl transition-all h-[88px] flex flex-col items-center justify-center gap-1 min-w-[88px]"
                >
                  {copied ? <Check size={28} /> : <Copy size={28} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[400px] bg-gray-50 rounded-[2rem] p-6 border-2 border-gray-100 shadow-inner flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 mb-6">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center sm:text-left">Đã tham gia</p>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-3xl font-black text-gray-800">
                  <Users size={32} className="text-indigo-500" />
                  {activeRoom.players.length} <span className="text-sm text-gray-500">Học sinh</span>
                </div>
              </div>
              
              <button 
                onClick={handleStartGame}
                disabled={activeRoom.players.length === 0}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-white shadow-lg transition-all w-full sm:w-auto
                  ${activeRoom.players.length === 0 
                    ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                    : 'bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 shadow-green-200'}
                `}
              >
                <Play size={20} className="fill-current" /> BẮT ĐẦU
              </button>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-4 overflow-y-auto max-h-[300px]">
              {activeRoom.players.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 py-10 opacity-70">
                  <Loader2 size={32} className="animate-spin text-indigo-300" />
                  <p className="font-bold text-sm text-center">Đang đợi học sinh vào phòng...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {activeRoom.players.map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs bg-gradient-to-br ${p.color}`}>
                        {p.avatar}
                      </div>
                      <span className="font-bold text-xs text-gray-700 truncate">{p.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
