import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Info, Volume2, Maximize, Palette, Mail, Check, X, HelpCircle, SquareCheck } from "lucide-react";

export default function GameStats() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'questions'>('overview');

  const accuracy = 48; // Mock accuracy
  
  // Mock Data
  const students = [
    { id: 1, name: "Phuc Pham Hoang", score: 2300, points: 4, totalPoints: 8, answers: ['correct', 'correct', 'partial', 'correct', 'incorrect', 'incorrect', 'correct', 'incorrect'] }
  ];

  const questions = [
    { id: 1, type: "Nhiều lựa chọn", text: "1. Vùng nhạy cảm là gì?", time: 3, correct: 1, incorrect: 0, options: ["Đáp án A", "Đáp án B", "Đáp án C"] },
    { id: 2, type: "Một lựa chọn", text: "2. Ai được phép chạm vào vùng đồ bơi?", time: 2, correct: 1, incorrect: 0, options: ["Đáp án A", "Đáp án B", "Đáp án C"] }
  ];

  const renderIcon = (status: string) => {
    switch(status) {
      case 'correct': return <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white"><Check size={16} strokeWidth={4} /></div>;
      case 'incorrect': return <div className="w-8 h-8 rounded-full bg-[#E12A75] flex items-center justify-center text-white"><X size={16} strokeWidth={4} /></div>;
      case 'partial': return <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white"><Check size={16} strokeWidth={4} /></div>;
      default: return <div className="w-8 h-8 rounded-full bg-gray-500"></div>;
    }
  };

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
        <div className="flex flex-col opacity-0">Logo block</div>
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
            onClick={() => navigate("/teacher")}
            className="bg-[#ED2E7E] hover:bg-[#c92469] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg ml-2"
          >
            Thoát
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 w-full max-w-6xl px-6 py-10 flex flex-col">
        
        {/* Top Summary Box */}
        <div className="bg-[#1a191f] rounded-3xl p-8 shadow-2xl border border-white/5 w-full mx-auto mb-8 flex flex-col items-center relative">
          <div className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-4">
            Độ chính xác của lớp <Info size={14} className="text-gray-400" />
          </div>
          
          <div className="relative w-full max-w-2xl h-12 bg-black rounded-xl border border-gray-800 mb-8 flex overflow-hidden p-1 shadow-inner">
            <div className="h-full bg-teal-400 rounded-l-md" style={{ width: `${accuracy}%` }}></div>
            <div className="h-full bg-[#E12A75] rounded-r-md" style={{ width: `${100 - accuracy}%` }}></div>
            
            {/* Range markers */}
            <div className="absolute top-[110%] w-full flex justify-between text-[10px] text-gray-500 px-1 font-bold">
               <span>0%</span><span>10%</span><span>20%</span><span>30%</span><span>40%</span><span>50%</span><span>60%</span><span>70%</span><span>80%</span><span>90%</span><span>100%</span>
            </div>
            
            {/* Percent Badge Bubble */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-14 h-14 border-4 border-[#1a191f] flex flex-col items-center justify-center shadow-lg">
               <span className="text-black font-black text-lg leading-none">{accuracy}%</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-2 mt-4">Khởi động tuyệt vời! Luyện tập tạo nên sự hoàn hảo!</h2>
          <p className="text-gray-400 mb-8">Giao bài tập để học sinh có thể thành thạo chủ đề này.</p>

          <div className="flex items-center gap-4">
            <button className="bg-[#3a3a40] hover:bg-[#4a4a50] text-white px-8 py-3 rounded-lg font-bold transition-colors">Chơi lại</button>
            <button className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-lg font-black transition-colors">Giao bài tập</button>
            <button className="bg-[#3a3a40] hover:bg-[#4a4a50] text-white px-8 py-3 rounded-lg font-bold transition-colors">Xem lại câu hỏi</button>
          </div>
        </div>

        {/* Floating Tabs */}
        <div className="flex justify-center -mb-px z-20">
          <div className="flex bg-[#111111]/80 rounded-t-2xl px-2">
             <button 
               onClick={() => setActiveTab('overview')}
               className={`px-8 py-4 font-bold text-[15px] border-b-[3px] transition-colors ${activeTab === 'overview' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
             >Tổng quan</button>
             <button 
               onClick={() => setActiveTab('questions')}
               className={`px-8 py-4 font-bold text-[15px] border-b-[3px] transition-colors ${activeTab === 'questions' ? 'text-white border-white' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
             >Câu hỏi</button>
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="bg-[#16151a] rounded-3xl p-6 shadow-2xl border border-white/5 w-full mx-auto min-h-[400px]">
          
          {activeTab === 'overview' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5 flex-wrap gap-4">
                <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-400 rounded-sm"></div> Đúng</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#E12A75] rounded-sm"></div> Sai</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> Đúng một phần</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> Chưa chấm</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-500 rounded-sm"></div> Hết giờ</div>
                </div>
                <div className="flex items-center gap-6">
                   <label className="flex items-center gap-2 text-white font-bold text-sm cursor-pointer">
                     Hiện thời gian làm bài <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent" />
                   </label>
                   <button className="flex items-center gap-2 bg-[#3f3e46] hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                     <Mail size={16} /> Gửi email cho tất cả phụ huynh
                   </button>
                </div>
              </div>

              {/* Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="py-4 px-4 font-bold text-white w-20"></th>
                      <th className="py-4 px-4 font-bold text-white w-64">Họ tên</th>
                      <th className="py-4 px-4 font-bold text-white w-32">Điểm</th>
                      <th className="py-4 px-4 font-bold text-white w-48">Chính xác <Info size={14} className="inline ml-1 text-gray-500" /></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q1</div><div className="text-xs">100%</div></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q2</div><div className="text-xs">100%</div></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q3</div><div className="text-xs">100%</div></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q4</div><div className="text-xs">100%</div></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q5</div><div className="text-xs">0%</div></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q6</div><div className="text-xs">0%</div></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q7</div><div className="text-xs">100%</div></th>
                      <th className="py-4 px-2 font-bold text-white text-center"><div className="text-[10px] text-gray-400 mb-1">Q8</div><div className="text-xs">0%</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, i) => (
                      <tr key={student.id} className="hover:bg-[#222129] transition-colors border-b border-white/5 last:border-0">
                        <td className="py-4 px-4 text-gray-400 font-bold">{i + 1}</td>
                        <td className="py-4 px-4 flex items-center gap-3">
                           <div className="w-6 h-6 rounded bg-orange-200"></div>
                           <span className="text-white font-bold">{student.name}</span>
                           <button className="text-gray-500 hover:text-white bg-[#2a2a30] p-1.5 rounded"><Mail size={12} /></button>
                        </td>
                        <td className="py-4 px-4 text-white font-semibold">{student.score}</td>
                        <td className="py-4 px-4">
                           <span className="text-white font-semibold">{Math.round((student.points/student.totalPoints)*100)}%</span>
                           <span className="text-gray-400 text-xs ml-2">({student.points} / {student.totalPoints} pts)</span>
                        </td>
                        {student.answers.map((status, index) => (
                          <td key={index} className="py-4 px-2 text-center">
                            <div className="flex justify-center -mt-2">
                              {renderIcon(status)}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                <div className="text-gray-400 font-bold flex items-center gap-2">
                  <SquareCheck size={18} /> {questions.length} Câu hỏi
                </div>
                <label className="flex items-center gap-2 text-gray-400 font-bold text-sm cursor-pointer">
                  Sắp xếp theo độ chính xác <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent" />
                </label>
              </div>

              {/* Bubbles */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                 <div className="w-8 h-8 rounded bg-[#3c6b54] text-white flex items-center justify-center font-black text-sm">1</div>
                 <div className="w-8 h-8 rounded bg-[#3c6b54] text-white flex items-center justify-center font-black text-sm">2</div>
                 <div className="w-8 h-8 rounded bg-[#3c6b54] text-white flex items-center justify-center font-black text-sm">3</div>
                 <div className="w-8 h-8 rounded bg-[#3c6b54] text-white flex items-center justify-center font-black text-sm">4</div>
                 <div className="w-8 h-8 rounded bg-[#7a2846] text-white flex items-center justify-center font-black text-sm">5</div>
                 <div className="w-8 h-8 rounded bg-[#7a2846] text-white flex items-center justify-center font-black text-sm">6</div>
                 <div className="w-8 h-8 rounded bg-[#3c6b54] text-white flex items-center justify-center font-black text-sm">7</div>
                 <div className="w-8 h-8 rounded bg-[#7a2846] text-white flex items-center justify-center font-black text-sm">8</div>
              </div>

              {/* Question list */}
              <div className="space-y-6 max-w-4xl mx-auto">
                {questions.map((q) => (
                  <div key={q.id} className="relative bg-[#1c1b22] border border-[#33313a] rounded-xl overflow-hidden pl-2">
                    {/* Left Border */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-400"></div>
                    
                    <div className="p-5 flex flex-col gap-6">
                      {/* Card Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#33313a]">
                        <div className="bg-[#2a2930] flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#3f3e46]">
                           <SquareCheck size={14} className="text-gray-400" />
                           <span className="text-gray-300 text-xs font-bold">{q.type}</span>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex flex-col border border-[#3f3e46] rounded-lg overflow-hidden">
                             <div className="bg-[#2a2930] text-[10px] text-gray-400 font-bold px-3 pt-1">Thời gian TB</div>
                             <div className="bg-[#2a2930] text-sm text-gray-200 font-black px-3 pb-1">{q.time} s</div>
                           </div>
                           <div className="flex border border-[#3f3e46] rounded-lg overflow-hidden bg-[#2a2930]">
                             <div className="flex flex-col px-3 justify-center gap-1">
                               <div className="w-32 h-1.5 bg-black rounded-full overflow-hidden flex">
                                 <div className="h-full bg-teal-400" style={{width: `${(q.correct / (q.correct + q.incorrect)) * 100}%`}}></div>
                               </div>
                               <div className="text-[10px] text-gray-300 font-bold">{q.correct} đúng, {q.incorrect} sai</div>
                             </div>
                           </div>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="text-white font-bold text-lg">
                        {q.text}
                      </div>

                      {/* Options */}
                      <div className="space-y-3 pl-2">
                        {q.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex-shrink-0 border-2 ${i === 0 ? 'border-teal-400 bg-teal-400/20' : 'border-gray-600 bg-[#2a2930]'}`}></div>
                            <span className={i === 0 ? 'text-white' : 'text-gray-400'}>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
