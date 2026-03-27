import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Lock, Check, Star, Gift, ChevronRight, Play, Info, Sparkles, Cloud, TreePine, Sun, Trophy, Flower2, Bird, Rabbit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PathStep {
  id: number;
  title: string;
  status: "completed" | "current" | "locked";
  stars: number;
  reward?: string;
  type: "lesson" | "quiz" | "game";
}

const pathSteps: PathStep[] = [
  { id: 1, title: "Chào mừng bạn mới", status: "completed", stars: 3, type: "lesson" },
  { id: 2, title: "Quy tắc 5 ngón tay", status: "completed", stars: 3, type: "lesson" },
  { id: 3, title: "Vùng đồ bơi an toàn", status: "completed", stars: 2, type: "quiz" },
  { id: 4, title: "Ai được chạm vào con?", status: "current", stars: 0, type: "lesson" },
  { id: 5, title: "Bí mật tốt & Bí mật xấu", status: "locked", stars: 0, reward: "Mũ thám tử", type: "game" },
  { id: 6, title: "Cách nói KHÔNG dũng cảm", status: "locked", stars: 0, type: "lesson" },
  { id: 7, title: "Tìm sự giúp đỡ ở đâu?", status: "locked", stars: 0, type: "quiz" },
  { id: 8, title: "Người lạ và quà tặng", status: "locked", stars: 0, reward: "Huy hiệu Hiệp sĩ", type: "game" },
  { id: 9, title: "An toàn trên mạng", status: "locked", stars: 0, type: "lesson" },
  { id: 10, title: "Tổng kết: Em là Hiệp sĩ Nhí", status: "locked", stars: 0, reward: "Cúp Vàng", type: "quiz" },
];

const BearIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <circle cx="12" cy="13" r="8" />
        <circle cx="7" cy="6" r="3" />
        <circle cx="17" cy="6" r="3" />
        <circle cx="10" cy="12" r="1" fill="white" />
        <circle cx="14" cy="12" r="1" fill="white" />
        <path d="M10 16s1 1 2 1 2-1 2-1" stroke="white" strokeWidth="1" fill="none" />
    </svg>
);

export default function LearningPathView() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
        const currentStep = pathSteps.find(s => s.status === 'current');
        if (currentStep) {
            const el = document.getElementById(`step-${currentStep.id}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
  }, []);

  const getPosition = (index: number) => {
    const row = index;
    const isEven = row % 2 === 0;
    const x = isEven ? "25%" : "75%";
    const y = `${row * 180 + 120}px`;
    return { x, y };
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col font-sans bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('/Grass%20BG.png')" }}
    >
      {/* Premium Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Sun */}
        <div className="absolute top-24 left-16 text-yellow-200 opacity-30 animate-pulse">
           <Sun size={140} strokeWidth={1} />
        </div>
        
        {/* Decorative Clouds */}
        {[
          { t: 40, l: 10, s: 80, d: 20 },
          { t: 15, r: 15, s: 100, d: 25 },
          { t: 60, l: 40, s: 60, d: 15 },
          { t: 80, r: 20, s: 90, d: 30 }
        ].map((c, i) => (
          <motion.div 
            key={i}
            animate={{ x: [0, 40, 0] }} 
            transition={{ duration: c.d, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-white/50"
            style={{ top: `${c.t}%`, left: c.l ? `${c.l}%` : undefined, right: c.r ? `${c.r}%` : undefined }}
          >
            <Cloud size={c.s} fill="currentColor" />
          </motion.div>
        ))}

        {/* Scattered Plants/Flowers */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-emerald-800/20"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          >
            <Flower2 size={24 + Math.random() * 20} />
          </div>
        ))}
      </div>

      {/* Header Overlay */}
      <div className="fixed top-0 w-full p-6 flex items-center justify-between z-50 bg-emerald-800 shadow-xl border-b border-emerald-900">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-3 bg-white/20 hover:bg-white/40 rounded-2xl text-white transition-all shadow-xl">
                <ChevronRight size={24} className="rotate-180" />
            </button>
            <h1 className="text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] flex items-center gap-3 italic tracking-tight">
                <Trophy className="text-yellow-400 drop-shadow-md" size={32} />
                LỘ TRÌNH HIỆP SĨ
            </h1>
        </div>
        <div className="bg-white p-2 rounded-3xl shadow-2xl flex items-center gap-4 border-2 border-indigo-100">
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-200">
                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                <span className="font-black text-gray-800 text-lg">24</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-2xl border border-pink-200">
                <Gift className="text-pink-600" size={20} />
                <span className="font-black text-gray-800 text-lg">02</span>
            </div>
        </div>
      </div>

      {/* Winding Path Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pt-44 pb-72 relative z-10 scrollbar-hide">
        <div className="relative max-w-2xl mx-auto min-h-[1800px]">
           
            {/* The Golden Winding Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#facc15" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <filter id="pathShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                        <feOffset dx="0" dy="6" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                
                <path
                    d={`M ${parseFloat(getPosition(0).x)} 0 ${pathSteps.map((_, i) => {
                        const next = getPosition(i);
                        return `L ${next.x === '25%' ? 'calc(25% + 20px)' : 'calc(75% - 20px)'} ${next.y}`;
                    }).join(' ')}`}
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="60"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#pathShadow)"
                    className="opacity-90"
                />
                
                {/* Decorative Dashed Center Line */}
                <path
                    d={`M ${parseFloat(getPosition(0).x)} 0 ${pathSteps.map((_, i) => {
                        const next = getPosition(i);
                        return `L ${next.x === '25%' ? 'calc(25% + 20px)' : 'calc(75% - 20px)'} ${next.y}`;
                    }).join(' ')}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="15 25"
                    className="opacity-40"
                />
            </svg>

            {/* Decorations & Monsters along the path */}
            {pathSteps.map((_, i) => (
                <div key={`decor-${i}`} className="absolute pointer-events-none z-0" style={{ left: i % 2 === 1 ? '15%' : '85%', top: `${i * 180 + 200}px` }}>
                    <div className="relative group">
                        {i % 3 === 0 && <BearIcon className="text-amber-800/60 w-16 h-16 animate-bounce" style={{ animationDuration: '3s' }} />}
                        {i % 3 === 1 && <TreePine className="text-emerald-900/40 w-20 h-20" />}
                        {i % 3 === 2 && (
                            <div className="flex gap-1 items-end">
                                <Flower2 size={24} className="text-pink-300/60" />
                                <Flower2 size={32} className="text-yellow-300/60" />
                                <Flower2 size={24} className="text-blue-300/60" />
                            </div>
                        )}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-10 -right-4"
                        >
                           {i === 2 && <Bird size={20} className="text-indigo-900/30" />}
                           {i === 5 && <Rabbit size={20} className="text-orange-900/30" />}
                        </motion.div>
                    </div>
                </div>
            ))}

            {/* Path Nodes */}
            {pathSteps.map((step, idx) => {
                const pos = getPosition(idx);
                const isCompleted = step.status === 'completed';
                const isCurrent = step.status === 'current';
                const isLocked = step.status === 'locked';

                return (
                    <div 
                        key={step.id}
                        id={`step-${step.id}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                        style={{ left: pos.x, top: pos.y }}
                    >
                        <div className="relative flex flex-col items-center">
                            {/* Floating Label */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className={`
                                    absolute -top-16 whitespace-nowrap px-4 py-1.5 rounded-full shadow-2xl border-2 font-black text-[11px] tracking-tight uppercase transition-all
                                    ${isLocked ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-white border-yellow-300 text-gray-800 scale-110'}
                                `}
                            >
                                {step.title}
                            </motion.div>

                            {/* Main Button Node */}
                            <motion.button
                                whileHover={{ scale: isLocked ? 1 : 1.1, rotate: isLocked ? 0 : 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => !isLocked && navigate(`/student/course/${step.id}`)}
                                className={`
                                    w-28 h-28 rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.2)] relative border-[6px]
                                    ${isCompleted ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 border-white text-white' : ''}
                                    ${isCurrent ? 'bg-white border-indigo-700 text-indigo-700 ring-[8px] ring-white/30' : ''}
                                    ${isLocked ? 'bg-gray-100 border-gray-200 text-gray-400 grayscale' : ''}
                                `}
                            >
                                <span className="text-4xl font-black italic">{step.id}</span>
                                
                                <div className="absolute -bottom-4 bg-white rounded-full p-2.5 shadow-2xl border-4 border-indigo-50">
                                    {isCompleted && <Check size={20} strokeWidth={5} className="text-green-500" />}
                                    {isCurrent && <Play size={20} strokeWidth={5} className="text-indigo-700 fill-indigo-700" />}
                                    {isLocked && <Lock size={20} strokeWidth={3} className="text-gray-400" />}
                                </div>

                                {isCurrent && (
                                   <div className="absolute -top-4 -right-4 bg-rose-600 text-white text-[10px] font-black px-3 py-1.5 rounded-2xl animate-bounce shadow-xl uppercase tracking-tighter">
                                       LÀM NGAY!
                                   </div>
                                )}
                            </motion.button>

                            {/* Progression Stars */}
                            <div className="flex gap-2 mt-8 py-1 px-3 bg-black/10 rounded-full backdrop-blur-sm">
                                {[1, 2, 3].map(star => (
                                    <Star 
                                        key={star} 
                                        size={16} 
                                        className={`${star <= step.stars ? 'text-yellow-400 fill-yellow-400 drop-shadow-md' : 'text-white/20'}`} 
                                    />
                                ))}
                            </div>

                            {/* Goal/Reward Animation */}
                            {step.reward && (
                                <motion.div 
                                    animate={{ 
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-24 top-0 group/reward"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-pink-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10 border-4 border-white">
                                            <Gift size={32} strokeWidth={3} />
                                        </div>
                                        <div className="mt-3 bg-white px-3 py-1 rounded-xl shadow-lg border border-pink-100 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 origin-top">
                                            <p className="text-[10px] font-black text-pink-600 uppercase whitespace-nowrap">{step.reward}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Floating Progress Bar Dashboard */}
      <div className="fixed bottom-0 left-0 right-0 p-8 z-50 pointer-events-none">
        <div className="max-w-2xl mx-auto w-full pointer-events-auto">
            <div className="bg-[#1e293b]/90 backdrop-blur-3xl border-2 border-white/10 p-6 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-between group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <Sparkles size={100} className="text-indigo-400" />
                </div>
                
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/50">
                        <Trophy size={32} strokeWidth={3} />
                    </div>
                    <div>
                        <p className="text-[12px] font-black text-indigo-300 uppercase tracking-widest leading-none mb-2">Thử thách tiếp theo</p>
                        <h4 className="text-xl font-black text-white tracking-tight">Thu thập thêm 6 Sao ⭐</h4>
                        <div className="w-48 h-2.5 bg-white/10 rounded-full mt-3 overflow-hidden p-0.5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '70%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-[0_0_10px_#6366f1]"
                            />
                        </div>
                    </div>
                </div>

                <button className="bg-white hover:bg-indigo-50 text-indigo-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all transform active:scale-95 shadow-2xl relative z-10">
                    Mở Rương Quà
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
