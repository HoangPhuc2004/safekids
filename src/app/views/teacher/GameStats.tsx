import { useNavigate, useParams } from "react-router";
import { Palette, Volume2, Maximize, Play, Check, X as XIcon, Activity, Flame, Clock, Users } from "lucide-react";

export default function GameStats() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mocking the result
  const accuracy = 48;
  const correctNum = 32;
  const incorrectNum = 34;
  const totalNum = correctNum + incorrectNum;
  
  const mockPlayers = [
    { id: 1, name: "Phuc", score: 2300, accuracy: 48, results: [true, false, null, true, true, false, true, false] },
    { id: 2, name: "Minh", score: 1800, accuracy: 65, results: [true, true, true, false, false, true, true, false] },
    { id: 3, name: "An", score: 1200, accuracy: 30, results: [false, false, true, false, true, false, false, false] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative overflow-y-auto no-scrollbar pb-20 p-4 lg:p-8">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 fixed">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-rose-200/40 to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-200/40 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-100/40 to-transparent blur-2xl"></div>
      </div>

      {/* Top Header Controls */}
      <div className="relative z-10 w-full flex items-center justify-between mb-6">
        <div className="flex gap-2 text-white opacity-0">Logo</div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-gray-200 shadow-sm">
            <Palette size={16} /> Giao diện
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors border border-gray-200 shadow-sm">
            <Volume2 size={18} />
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors border border-gray-200 shadow-sm">
            <Maximize size={18} />
          </button>
          <button 
            onClick={() => navigate("/teacher")}
            className="flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 transition-colors shadow-sm"
          >
            <XIcon size={18} />
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Top Summary Card */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-gray-100 shadow-xl flex flex-col lg:flex-row justify-between items-center gap-8">
          
          <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-8 md:gap-12 pl-2">
            {/* Accuracy Circular Bubble & Bar */}
            <div className="flex flex-col w-full sm:w-auto relative items-center">
              <span className="text-gray-800 font-bold mb-4 text-center">Độ chính xác của lớp</span>
              
              <div className="relative w-full sm:w-64 h-6 bg-gray-100 rounded-full border border-gray-200 shadow-inner flex overflow-visible">
                {/* Green & Red segments */}
                <div className="bg-green-500 h-full rounded-l-full shadow-[0_0_10px_rgba(34,197,94,0.3)] z-10 relative" style={{ width: `${accuracy}%` }}></div>
                <div className="bg-rose-500 h-full rounded-r-full shadow-[0_0_10px_rgba(244,63,94,0.3)] z-10 relative" style={{ width: `${100 - accuracy}%` }}></div>
                
                {/* Center Percent Bubble */}
                <div className="absolute left-[48%] top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-14 h-14 border-[4px] border-gray-50 flex items-center justify-center shadow-lg z-20">
                  <span className="text-gray-900 font-black tracking-tight">{accuracy}%</span>
                </div>
              </div>
            </div>

            {/* Questions Breakdown */}
            <div className="flex gap-8 translate-y-4">
              <div className="flex flex-col items-center">
                <span className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Câu được hỏi</span>
                <span className="text-gray-900 font-black text-3xl">{totalNum}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Chính xác</span>
                <span className="text-green-600 font-black text-3xl">{correctNum}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Không chính xác</span>
                <span className="text-rose-600 font-black text-3xl">{incorrectNum}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0 relative top-2">
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2">
              <Play size={16} className="fill-current text-gray-500" /> Chơi lại
            </button>
            <button className="bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-black transition-all shadow-lg flex items-center justify-center gap-2">
              <Play size={16} className="fill-current" /> Giao bài tập
            </button>
            <button className="text-gray-500 font-bold hover:text-gray-800 text-sm py-2">Xem lại câu hỏi</button>
          </div>
        </div>

        {/* Detailed Stats Block */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
           
           <div className="flex items-center justify-center bg-gray-50 border-b border-gray-200">
             <div className="relative top-[1px]">
               <button className="px-8 py-4 font-black text-rose-600 border-b-2 border-rose-600">Tổng quan</button>
               <button className="px-8 py-4 font-bold text-gray-500 hover:text-gray-800 transition-colors">Câu hỏi</button>
               <button className="px-8 py-4 font-bold text-gray-500 hover:text-gray-800 transition-colors">Báo cáo chuẩn</button>
             </div>
           </div>

           {/* Content Overview Mode */}
           <div className="flex flex-col pb-8">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-gray-700 font-bold bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                    Điểm số <ChevronDownIcon />
                  </div>
                  <div className="text-gray-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    Độ chính xác
                  </div>
                </div>
              </div>

              {/* Table List Header */}
              <div className="grid grid-cols-[1fr_80px_60px_minmax(200px,1fr)] px-8 py-3 text-sm font-bold text-gray-500">
                 <div>Người tham gia</div>
                 <div className="text-center">Điểm</div>
                 <div className="text-center">%</div>
                 <div className="pl-4"></div>
              </div>

              {/* Players Rows */}
              <div className="px-4 space-y-2">
                 {mockPlayers.map(p => (
                   <div key={p.id} className="grid grid-cols-[1fr_80px_60px_minmax(200px,1fr)] items-center px-4 py-4 bg-white hover:bg-gray-50 transition-colors rounded-xl border border-gray-100 shadow-sm group">
                      <div className="font-bold text-gray-800 tracking-wide text-base">{p.name}</div>
                      <div className="text-center font-black text-gray-800">{p.score}</div>
                      <div className="text-center font-bold text-gray-600">{p.accuracy}%</div>
                      <div className="flex items-center pl-4 gap-1.5 overflow-x-auto no-scrollbar">
                         {p.results.map((r, i) => (
                           <div key={i} className={`w-8 h-8 rounded shrink-0 flex items-center justify-center
                             ${r === true ? 'bg-green-100 text-green-600 border border-green-200' : 
                               r === false ? 'bg-rose-100 text-rose-600 border border-rose-200' : 
                               'bg-gray-100 border border-gray-200'}`}
                           >
                             {r === true ? <Check size={16} strokeWidth={3} /> : r === false ? <XIcon size={16} strokeWidth={3} /> : '-'}
                           </div>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Demoing Questions Tab view locally here for completeness below */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hidden">
           {/* Mock Questions View */}
           <div className="flex gap-4 mb-6">
             <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 border border-green-200 shadow-sm"><Check size={16} /> 2 Câu đúng ít nhất 40%</div>
             <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 border border-rose-200 shadow-sm"><Activity size={16} /> 3 Câu sai nhiều</div>
             <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 border border-gray-200 shadow-sm"><Clock size={16} /> Thời gian dài nhất</div>
           </div>

           <div className="space-y-4">
             <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-gray-400 font-black text-2xl mr-4">1.</span>
                    <h3 className="text-gray-900 font-bold text-lg flex-1 leading-snug">Choose the participle:<br/>Tengo la cara _________</h3>
                    <div className="flex gap-2">
                       <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 pb-1.5 rounded-lg text-xs font-black flex items-center shadow-sm">1/3 CHÍNH XÁC</span>
                       <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 pb-1.5 rounded-lg text-xs font-black flex items-center shadow-sm"><Clock size={12} className="mr-1 inline" /> 7S</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border-t border-gray-100 p-6">
                  <div className="space-y-3">
                     <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-green-500"></div>
                        <Check size={20} className="text-green-500 mx-3" strokeWidth={3} />
                        <span className="flex-1 font-bold text-gray-800">quemada</span>
                        <div className="flex -space-x-2">
                           <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-white text-xs font-black text-gray-600 z-10">P</span>
                        </div>
                     </div>
                     <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center">
                        <div className="w-2 h-2 rounded-full bg-rose-500 ml-4 mr-5"></div>
                        <span className="flex-1 font-semibold text-gray-600">quemando</span>
                        <div className="flex -space-x-2">
                           <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-white text-xs font-black text-gray-600 z-10">M</span>
                           <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-white text-xs font-black text-gray-600">A</span>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
