import { useNavigate } from "react-router";
import { Users, Play, ArrowLeft, Loader2, Copy, Check, Link, ChevronDown, Volume2, Maximize, Palette, X, QrCode } from "lucide-react";
import { useGameRoom } from "../../context/GameRoomContext";
import { useState } from "react";

export default function TeacherGameLobby() {
  const navigate = useNavigate();
  const { activeRoom, startGame, leaveRoom } = useGameRoom();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!activeRoom) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-black text-gray-800 mb-4">Chưa có phòng game nào</h2>
        <button 
          onClick={() => navigate("/teacher/create-game")}
          className="bg-pink-600 text-white px-6 py-3 rounded-xl font-black shadow-lg"
        >
          Tạo game ngay
        </button>
      </div>
    );
  }

  const joinLink = window.location.origin + "/student/join";
  const formattedCode = activeRoom.id.split('').join(' ');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(joinLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeRoom.id);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleStartGame = () => {
    startGame(activeRoom.id);
    navigate(`/teacher/game-stats/${activeRoom.id}`);
  };

  return (
    <div className="min-h-screen bg-[#11050e] font-sans relative overflow-hidden flex flex-col">
      {/* Fake 3D Neon Background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-yellow-500/20 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-pink-600/20 to-transparent blur-2xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-[#111111]/80 backdrop-blur-sm border-b border-white/10">
        <div></div>
        
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
          <button 
            onClick={() => {
              navigate("/teacher");
            }}
            className="bg-[#ED2E7E] hover:bg-[#c92469] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg"
          >
            Kết thúc
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-6 mt-[-5%]">
        {/* The Black Box */}
        <div className="bg-[#1f1e24] rounded-3xl p-6 shadow-2xl border border-white/5 max-w-4xl w-full">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            
            {/* Left Section: Link and Code */}
            <div className="flex-1 space-y-4">
              {/* Row 1: Join Link */}
              <div className="bg-[#2a2930] rounded-2xl flex items-center p-4 border border-white/5 group hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded-full bg-[#3f3e46] text-gray-300 font-black flex items-center justify-center text-sm mr-4 shrink-0">
                  1
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4 gap-2">
                  <span className="text-gray-400 font-semibold text-sm">Tham gia bằng<br/>thiết bị bất kỳ</span>
                  <span className="text-white font-black text-2xl tracking-tight sm:text-3xl">
                    {window.location.host}/student/join
                  </span>
                </div>
                <button 
                  onClick={handleCopyLink}
                  className="bg-[#3f3e46] hover:bg-white/20 text-white p-3 rounded-xl transition-all"
                >
                  {copiedLink ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                </button>
              </div>

              {/* Row 2: Join Code */}
              <div className="bg-[#2a2930] rounded-2xl flex items-center p-4 border border-white/5 group hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded-full bg-[#3f3e46] text-gray-300 font-black flex items-center justify-center text-sm mr-4 shrink-0">
                  2
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4 gap-2">
                  <span className="text-gray-400 font-semibold text-sm">Nhập mã<br/>tham gia</span>
                  <span className="text-white font-black text-5xl tracking-[0.15em] ml-4 font-mono">
                    {formattedCode}
                  </span>
                </div>
                <button 
                  onClick={handleCopyCode}
                  className="bg-[#3f3e46] hover:bg-white/20 text-white p-3 rounded-xl transition-all"
                >
                  {copiedCode ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            {/* Right Section: Share */}
            <div className="w-full md:w-48 bg-[#2a2930] rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-center gap-3">
              <div className="bg-white p-2 rounded-xl">
                <QrCode size={80} className="text-black" />
              </div>
              <div className="text-gray-400 font-bold text-sm mt-1">Chia sẻ qua</div>
              <div className="flex items-center gap-2 mt-1">
                <button className="bg-[#3f3e46] p-1.5 rounded-md text-white hover:bg-white/20"><Link size={14} /></button>
                {/* Fake Google Classroom icon */}
                <button className="bg-green-700 p-1.5 rounded-md text-white hover:bg-green-600 flex items-center justify-center font-black text-[10px] w-7 h-7">GC</button>
                <button className="text-gray-400 hover:text-white p-1"><ChevronDown size={16} /></button>
              </div>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between">
            <button className="bg-[#2a2930] hover:bg-[#3a3a40] border border-white/5 text-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 font-semibold transition-colors grow max-w-sm justify-between">
              <span className="flex items-center gap-2 text-sm"><Volume2 size={16} className="text-gray-400" /> Tự động bắt đầu quiz</span>
              <div className="bg-[#3f3e46] p-1 rounded"><Play size={14} className="fill-current text-gray-400" /></div>
            </button>
            
            <button 
              onClick={handleStartGame}
              disabled={activeRoom.players.length === 0}
              className={`
                flex-1 rounded-xl font-black text-xl text-white shadow-lg transition-all py-3 shadow-pink-900/50
                ${activeRoom.players.length === 0 
                  ? 'bg-[#8c184c] text-white/50 cursor-not-allowed shadow-none' 
                  : 'bg-[#ED2E7E] hover:bg-[#fa3b8c] hover:scale-[1.02] active:scale-95'}
              `}
            >
              BẮT ĐẦU
            </button>
            
            <button className="bg-[#2a2930] border border-white/5 text-white rounded-xl px-6 py-3 flex items-center justify-center gap-3 font-black text-xl shrink-0 min-w[100px]">
              <Users size={24} className="text-gray-400" />
              {activeRoom.players.length}
            </button>
          </div>
        </div>

        {/* Floating Avatars below */}
        <div className="w-full max-w-6xl mt-12 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 px-6 content-start max-h-[300px] overflow-y-auto pt-4">
          {activeRoom.players.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-white/30 gap-3 py-10">
              <Loader2 size={32} className="animate-spin" />
              <p className="font-bold text-sm">Đang đợi học sinh vào phòng...</p>
            </div>
          ) : (
            activeRoom.players.map(p => (
              <div key={p.id} className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl bg-gradient-to-br shadow-xl ${p.color} border-2 border-white/20 hover:scale-110 transition-transform cursor-pointer`}>
                  {p.avatar}
                </div>
                <span className="font-bold text-xs text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm truncate max-w-full">
                  {p.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
