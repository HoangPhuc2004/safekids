import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Play, Pause, CheckCircle2, XCircle, AlertCircle, RefreshCcw, Trophy, Star, BookOpen, Clock, ArrowRight, TreePine } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseView() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const quizData = [
    {
      question: "Vùng nào trên cơ thể là vùng đồ bơi (vùng nhạy cảm)?",
      options: ["Tay và chân", "Ngực, vùng kín và mông", "Mặt và cổ", "Vai và lưng"],
      correct: 1
    },
    {
      question: "Nếu có người lạ chạm vào vùng nhạy cảm của em, em nên làm gì?",
      options: ["Im lặng", "Nói không, bỏ chạy và kể cho người lớn tin cậy", "Đánh lại họ", "Khóc một mình"],
      correct: 1
    }
  ];

  const handleSimulateVideo = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    const interval = setInterval(() => {
      progressRef.current += 10;
      setProgress(progressRef.current);
      if (progressRef.current >= 100) {
        clearInterval(interval);
        setIsPlaying(false);
        setIsVideoFinished(true);
      }
    }, 500);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === quizData[currentQuestion].correct) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  return (
    <div className="bg-indigo-50/20 min-h-screen pb-24 flex flex-col font-sans">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all shadow-sm">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="font-black text-gray-800 text-lg lg:text-xl tracking-tight">
            Bài học: Cơ thể của tớ
          </h1>
          <div className="hidden md:flex items-center gap-4 mt-0.5">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <BookOpen size={10} /> Chương 1: An toàn cá nhân
            </span>
            <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest flex items-center gap-1">
              <Clock size={10} /> 15 Phút thực hành
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
        {!quizStarted ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Video Player Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black w-full aspect-video rounded-[2rem] overflow-hidden relative shadow-2xl shadow-indigo-200/50 group border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&h=675&fit=crop" 
                  alt="Video thumbnail" 
                  className={`w-full h-full object-cover transition-opacity duration-700 ${isPlaying || isVideoFinished ? 'opacity-40' : 'opacity-90'}`} 
                />
                
                {!isVideoFinished && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={handleSimulateVideo} 
                      className={`
                        w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white 
                        hover:bg-white/40 hover:scale-110 transition-all border border-white/50 shadow-2xl
                        ${isPlaying ? 'animate-pulse' : ''}
                      `}
                    >
                      {isPlaying ? <Pause size={40} /> : <Play size={40} className="ml-2" />}
                    </button>
                  </div>
                )}
                
                {isVideoFinished && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-8 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/40">
                      <CheckCircle2 size={48} className="text-white" />
                    </div>
                    <h3 className="text-white font-black text-3xl mb-3 tracking-tight">Em đã xem xong!</h3>
                    <p className="text-gray-300 font-bold text-lg max-w-md">Kiến thức thật bổ ích đúng không? Sẵn sàng làm bài tập chưa nào?</p>
                  </div>
                )}
                
                {/* Custom Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-900/50">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Course Detail for Desktop */}
              <div className="hidden lg:block bg-white p-8 rounded-[2.5rem] shadow-sm border border-indigo-50">
                <h2 className="font-black text-2xl text-gray-900 mb-4 flex items-center gap-3">
                  <BookOpen className="text-indigo-600" />
                  Nội dung chi tiết
                </h2>
                <div className="space-y-4 text-gray-600 font-medium leading-relaxed text-lg">
                  <p>
                    Bài học này giúp chúng ta nhận diện <strong>quy tắc 5 ngón tay</strong> và <strong>vùng đồ bơi</strong>. Đây là nền tảng quan trọng nhất để các em tự bảo vệ mình trong mọi tình huống.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-500">
                    <li>Hiểu về ranh giới cá nhân (Personal Space)</li>
                    <li>Nhận biết người lạ và người quen đáng tin cậy</li>
                    <li>Thực hành kỹ năng "Nói Không - Bỏ Chạy - Kể Lại"</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar Column: Mobile Description & Start Quiz */}
            <div className="flex flex-col gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-white flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                  <Star size={80} className="text-pink-500" />
                </div>
                
                <div className="relative z-10">
                  <div className="lg:hidden mb-6">
                    <h2 className="font-black text-xl text-gray-900 mb-3">Mô tả bài học</h2>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      Tìm hiểu về vùng đồ bơi và cách nói "Không" khi có ai đó yêu cầu em làm điều em không thích.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100">
                      <h4 className="font-black text-pink-700 uppercase tracking-widest text-xs mb-3">Phần thưởng hoàn thành</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-yellow-500 shadow-sm">
                          <Trophy size={24} />
                        </div>
                        <div>
                          <p className="text-xl font-black text-gray-900">+500 Điểm</p>
                          <p className="text-xs font-bold text-gray-400">Huy hiệu "Chiến binh An toàn"</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setQuizStarted(true)} 
                      disabled={!isVideoFinished && isPlaying}
                      className={`
                        w-full px-8 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all transform active:scale-[0.98] 
                        flex items-center justify-center gap-3
                        ${isVideoFinished 
                          ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-pink-200' 
                          : 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'}
                      `}
                    >
                      BẮT ĐẦU TRẮC NGHIỆM <ArrowRight size={22} strokeWidth={3} />
                    </button>
                    {!isVideoFinished && (
                      <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {isPlaying ? "Vui lòng xem hết video..." : "Hãy nhấn Play để bắt đầu bài học"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Extra Support Card */}
              <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-200 group">
                <h3 className="font-black text-lg mb-2">Cần giúp đỡ?</h3>
                <p className="text-indigo-100 text-sm font-medium mb-4">Nếu em không hiểu phần nào, hãy nhấn vào đây để hỏi cô giáo nhé!</p>
                <button className="bg-white/20 backdrop-blur-md border border-white/30 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-all">
                  Nhắn tin cho cô
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full min-h-[500px] relative">
            {!quizFinished ? (
              <div className="relative z-10 animate-in slide-in-from-bottom-8 duration-500">
                {/* Compact Character */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="#f43f5e" />
                        <path d="M 30 70 Q 50 20 70 70" fill="#f43f5e" />
                        <circle cx="40" cy="45" r="5" fill="white" />
                        <circle cx="60" cy="45" r="5" fill="white" />
                        <circle cx="40" cy="45" r="2" fill="black" />
                        <circle cx="60" cy="45" r="2" fill="black" />
                        <path d="M 45 60 Q 50 65 55 60" stroke="white" strokeWidth="2" fill="none" />
                        <path d="M 30 40 L 25 35 L 20 45 Z" fill="#9f1239" />
                        <path d="M 35 30 L 30 25 L 25 35 Z" fill="#9f1239" />
                        <path d="M 45 25 L 40 20 L 35 30 Z" fill="#9f1239" />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Compact Main Card */}
                <div className="bg-white p-6 pt-20 rounded-[2.5rem] shadow-2xl border-b-[8px] border-indigo-100 flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-6 px-2">
                    <span className="bg-green-100 text-green-700 font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest border border-green-200">
                      GIỚI TÍNH & AN TOÀN
                    </span>
                    <span className="bg-pink-100 text-pink-600 font-black px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest border border-pink-200">
                      DỄ
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden border border-gray-100">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                    />
                  </div>

                  {/* Smaller Question */}
                  <div className="text-center mb-8">
                    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2">Câu hỏi {currentQuestion + 1} / {quizData.length}</p>
                    <h2 className="text-lg lg:text-2xl font-black text-slate-800 leading-snug max-w-2xl">
                      {quizData[currentQuestion].question}
                    </h2>
                  </div>

                  {/* 2-Column Answer Grid for Compactness */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {quizData[currentQuestion].options.map((option, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === quizData[currentQuestion].correct;
                      const showResult = isSubmitted;
                      
                      let btnClass = "w-full p-4 lg:p-5 rounded-2xl font-black text-sm lg:text-base transition-all flex items-center justify-between border-2 shadow-sm active:scale-[0.98] ";
                      
                      if (!showResult) {
                        btnClass += isSelected 
                          ? "bg-indigo-600 text-white border-indigo-700 shadow-lg shadow-indigo-100 -translate-y-1" 
                          : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 hover:border-slate-200";
                      } else {
                        if (isCorrect) {
                          btnClass += "bg-green-500 text-white border-green-600";
                        } else if (isSelected && !isCorrect) {
                          btnClass += "bg-pink-500 text-white border-pink-600 animate-shake";
                        } else {
                          btnClass += "bg-slate-50 text-slate-400 border-slate-100 opacity-50";
                        }
                      }
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => { if(!isSubmitted) setSelectedAnswer(idx); }}
                          disabled={showResult}
                          className={btnClass}
                        >
                          <span className="text-left leading-tight">{option}</span>
                          <div className="flex-shrink-0 ml-2">
                            {showResult && isCorrect && <CheckCircle2 size={24} strokeWidth={4} />}
                            {showResult && isSelected && !isCorrect && <XCircle size={24} strokeWidth={4} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Next Button */}
                  <div className="w-full max-w-xs">
                    {!isSubmitted ? (
                      <button 
                        onClick={() => {
                          if (selectedAnswer !== null) {
                            setIsSubmitted(true);
                            if (selectedAnswer === quizData[currentQuestion].correct) {
                                setScore(s => s + 1);
                            }
                          }
                        }}
                        disabled={selectedAnswer === null}
                        className={`
                          w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95
                          ${selectedAnswer !== null ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                        `}
                      >
                        XÁC NHẬN ĐÁP ÁN
                      </button>
                    ) : (
                      <motion.button 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => {
                          if (currentQuestion < quizData.length - 1) {
                            setCurrentQuestion(c => c + 1);
                            setSelectedAnswer(null);
                            setIsSubmitted(false);
                          } else {
                            setQuizFinished(true);
                          }
                        }}
                        className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        {currentQuestion < quizData.length - 1 ? 'CÂU TIẾP THEO' : 'XEM KẾT QUẢ'}
                        <ArrowRight size={20} strokeWidth={4} />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Reward Indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-indigo-50 flex items-center gap-3">
                    <span className="font-black text-gray-400 uppercase tracking-widest text-[9px]">Thử thách nhận:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 py-16 rounded-[4rem] shadow-2xl shadow-indigo-200 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700 border-b-[16px] border-indigo-100">
                <div className="w-40 h-40 bg-indigo-50 rounded-full flex items-center justify-center mb-8 relative">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-200"
                    />
                    <Trophy size={80} className="text-indigo-600" />
                </div>
                <h2 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">XUẤT SẮC QUÁ!</h2>
                <p className="text-slate-500 font-bold text-2xl mb-12">Em đã hoàn thành bài tập với số điểm <span className="text-indigo-600 font-black">{score}/{quizData.length}</span></p>
                
                <div className="w-full max-w-sm space-y-4">
                  <button 
                    onClick={() => navigate(-1)} 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl shadow-indigo-200 transition-all active:scale-95"
                  >
                    TRỞ VỀ TRANG CHỦ
                  </button>
                  <button 
                    onClick={() => { setQuizStarted(false); setQuizFinished(false); setCurrentQuestion(0); setSelectedAnswer(null); setScore(0); setIsSubmitted(false); }} 
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all"
                  >
                    Học lại bài này
                  </button>
                </div>
              </div>
            )}
            
            {/* Thematic Forest Background (Back Layer) */}
            <div className="absolute inset-0 pointer-events-none -m-10 z-0">
               <div className="absolute bottom-0 left-0 text-emerald-900/10"><TreePine size={200} /></div>
               <div className="absolute top-0 right-0 text-emerald-900/10"><TreePine size={150} /></div>
               <div className="absolute bottom-10 right-10 text-emerald-900/10 scale-x-[-1]"><TreePine size={180} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
