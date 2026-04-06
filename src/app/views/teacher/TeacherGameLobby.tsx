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
          className="bg-rose-600 text-white px-6 py-3 rounded-xl font-black shadow-lg"
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
    navigate(`/teacher/live-game/${activeRoom.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative overflow-hidden flex flex-col">
      {/* Fake 3D Light Background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-rose-200/40 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-200/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-100/40 to-transparent blur-2xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div></div>
        
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
          <button 
            onClick={() => {
              navigate("/teacher");
            }}
            className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm"
          >
            Kết thúc
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-6 mt-[-5%]">
        {/* The White Box */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 max-w-4xl w-full">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            
            {/* Left Section: Link and Code */}
            <div className="flex-1 space-y-4">
              {/* Row 1: Join Link */}
              <div className="bg-gray-50 rounded-2xl flex items-center p-4 border border-gray-200 group hover:border-indigo-300 transition-all">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 font-black flex items-center justify-center text-sm mr-4 shrink-0">
                  1
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4 gap-2">
                  <span className="text-gray-500 font-semibold text-sm">Tham gia bằng<br/>thiết bị bất kỳ</span>
                  <span className="text-gray-900 font-black text-2xl tracking-tight sm:text-3xl">
                    {window.location.host}/student/join
                  </span>
                </div>
                <button 
                  onClick={handleCopyLink}
                  className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 shadow-sm flex items-center justify-center w-11 h-11 rounded-xl transition-all"
                >
                  {copiedLink ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
              </div>

              {/* Row 2: Join Code */}
              <div className="bg-gray-50 rounded-2xl flex items-center p-4 border border-gray-200 group hover:border-indigo-300 transition-all">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 font-black flex items-center justify-center text-sm mr-4 shrink-0">
                  2
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between pr-4 gap-2">
                  <span className="text-gray-500 font-semibold text-sm">Nhập mã<br/>tham gia</span>
                  <span className="text-indigo-600 font-black text-5xl tracking-[0.15em] ml-4 font-mono drop-shadow-sm">
                    {formattedCode}
                  </span>
                </div>
                <button 
                  onClick={handleCopyCode}
                  className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 shadow-sm flex items-center justify-center w-11 h-11 rounded-xl transition-all"
                >
                  {copiedCode ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            {/* Right Section: Share */}
            <div className="w-full md:w-48 bg-gray-50 rounded-2xl border border-gray-200 p-4 flex flex-col items-center justify-center gap-3">
              <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                <QrCode size={80} className="text-gray-800" />
              </div>
              <div className="text-gray-500 font-bold text-sm mt-1">Chia sẻ qua</div>
              <div className="flex items-center gap-2 mt-1">
                <button className="bg-white border border-gray-200 shadow-sm p-1.5 rounded-md text-gray-600 hover:bg-gray-50"><Link size={14} /></button>
                {/* Fake Google Classroom icon */}
                <button className="bg-green-600 p-1.5 rounded-md text-white hover:bg-green-700 flex items-center justify-center font-black text-[10px] w-7 h-7 shadow-sm">GC</button>
                <button className="text-gray-400 hover:text-gray-600 p-1"><ChevronDown size={16} /></button>
              </div>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between">
            <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-xl px-4 py-3 flex items-center gap-3 font-semibold transition-colors grow max-w-sm justify-between shadow-sm">
              <span className="flex items-center gap-2 text-sm"><Volume2 size={16} className="text-gray-500" /> Tự động bắt đầu quiz</span>
              <div className="bg-white border border-gray-200 shadow-sm p-1 rounded"><Play size={14} className="fill-current text-gray-500" /></div>
            </button>
            
            <button 
              onClick={handleStartGame}
              className={`
                flex-1 rounded-xl font-black text-xl text-white shadow-lg transition-all py-3 
                bg-[#ED2E7E] hover:bg-[#fa3b8c] hover:scale-[1.02] active:scale-95 shadow-pink-500/30
              `}
            >
              BẮT ĐẦU
            </button>
            
            <button className="bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-6 py-3 flex items-center justify-center gap-3 font-black text-xl shrink-0 min-w[100px] shadow-sm">
              <Users size={24} className="text-gray-400" />
              {activeRoom.players.length}
            </button>
          </div>
        </div>

        {/* Floating Avatars below */}
        <div className="w-full max-w-6xl mt-12 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 px-6 content-start max-h-[300px] overflow-y-auto pt-4">
          {activeRoom.players.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-400 gap-3 py-10">
              <Loader2 size={32} className="animate-spin text-gray-300" />
              <p className="font-bold text-sm">Đang đợi học sinh vào phòng...</p>
            </div>
          ) : (
            activeRoom.players.map(p => (
              <div key={p.id} className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl bg-gradient-to-br shadow-md ${p.color} border-2 border-white/50 hover:scale-110 transition-transform cursor-pointer`}>
                  {p.avatar}
                </div>
                <span className="font-bold text-xs text-gray-800 bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm truncate max-w-full shadow-sm border border-gray-100">
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
