import { useNavigate } from "react-router";
import { Users, Crown, Sparkles, ArrowLeft, Settings, Share2, Plus } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameRoom } from "../../context/GameRoomContext";

export default function GameLobbyView() {
  const navigate = useNavigate();
  const { activeRoom } = useGameRoom();

  // Redirect if room no longer exists or student hasn't joined
  useEffect(() => {
    if (!activeRoom) {
      navigate("/student");
    } else if (activeRoom.status === 'playing') {
      navigate("/student/story-game"); // Simulate game start
    }
  }, [activeRoom, navigate]);

  if (!activeRoom) return null;

  const displayPlayers = activeRoom.players;
  const playerCount = displayPlayers.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/50 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/50 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-100/50 rounded-full blur-[80px]"></div>
      </div>

      {/* Header Overlay */}
      <div className="p-6 lg:p-8 flex items-center justify-between relative z-20">
        <button 
          onClick={() => navigate("/student")}
          className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 rounded-2xl text-gray-700 font-black text-xs uppercase tracking-widest transition-all shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Rời Phòng
        </button>
        
        <div className="flex flex-col items-center">
            <div className="bg-white border border-gray-200 px-8 py-3 rounded-3xl shadow-md">
              <span className="text-gray-900 font-black text-3xl tracking-[0.3em] pl-[0.3em]">{activeRoom.id}</span>
            </div>
            <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.5em] mt-2 translate-x-0.5 shadow-sm">Mã phòng công khai</p>
        </div>

        <div className="flex gap-3">
           <button className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 shadow-sm transition-all shadow-sm">
              <Share2 size={20} />
           </button>
           <button className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 shadow-sm transition-all shadow-sm">
              <Settings size={20} />
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 lg:pt-0">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Game Info */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-6 py-2 rounded-full mb-6 shadow-sm">
                <Sparkles className="text-yellow-500" size={20} />
                <span className="text-indigo-700 font-black text-xs uppercase tracking-widest">Đang chờ bắt đầu</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                Phòng chờ <span className="text-indigo-600 underline decoration-indigo-300 underline-offset-8">Tranh tài</span>
              </h1>
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex items-center gap-6 shadow-xl">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-gray-200 shadow-sm">
                    <Users size={32} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Đang trực tuyến</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-gray-900">{playerCount}</span>
                      <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">Chiến binh</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:block pt-10">
              <p className="text-gray-400 font-black text-xs uppercase tracking-[0.2em] mb-4">Mẹo nhỏ cho em</p>
              <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                 <p className="text-gray-600 font-medium italic text-sm">"Đọc kỹ từng tình huống trước khi quyết định. Mỗi lựa chọn đều giúp em trở nên dũng cảm hơn!"</p>
              </div>
            </div>
          </div>

          {/* Right Column: Players Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-100 rounded-[3rem] p-8 lg:p-12 shadow-xl relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 gap-6">
                <AnimatePresence>
                  {displayPlayers.map((player, index) => (
                    <motion.div 
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }}
                      className="flex flex-col items-center gap-3 group/player"
                    >
                      <div className={`
                        relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${player.color} rounded-[1.8rem] 
                        flex items-center justify-center shadow-lg transition-all duration-500 
                        group-hover/player:scale-110 group-hover/player:rotate-3 border border-gray-100
                      `}>
                        <span className="text-white font-black text-2xl lg:text-3xl drop-shadow-md pb-1">{player.avatar}</span>
                        {index === 0 && (
                          <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 p-1.5 rounded-xl shadow-md transform rotate-12">
                            <Crown size={16} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <span className="text-gray-500 text-[10px] font-black text-center uppercase tracking-widest group-hover/player:text-gray-800 transition-colors">
                        {player.name}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Empty Slots */}
                {Array.from({ length: 12 - playerCount }).map((_, i) => (
                  <div key={`empty-${i}`} className="flex flex-col items-center gap-3 opacity-60">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-50 rounded-[1.8rem] border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <Plus size={24} className="text-gray-300" />
                    </div>
                    <div className="w-12 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Waiting Bar at Bottom */}
      <div className="bg-white border-t border-gray-200 p-6 relative z-20 shadow-[-0_-10px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
            <p className="text-gray-600 font-black text-xs uppercase tracking-[0.2em]">Đang đợi tín hiệu từ Máy Chủ Giáo Viên...</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Số lượng tối thiểu</p>
                <p className="text-gray-800 font-black">1 Chiến binh</p>
             </div>
             <button className="bg-gray-100 text-gray-400 border border-gray-200 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest cursor-not-allowed">
               Bắt đầu ngay
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
