import React, { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ChevronLeft, Play, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "../../../lib/utils"

export default function CourseView() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [isVideoFinished, setIsVideoFinished] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  // Giả lập dữ liệu khóa học
  const courseData = {
    title: "Nhận biết hành vi quấy rối",
    description: "Bài giảng giúp bạn hiểu rõ về các hành vi không an toàn và cách phòng tránh hiệu quả.",
    videoUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800", // Placeholder cho video
    questions: [
      {
        text: "Hành vi nào sau đây là KHÔNG an toàn?",
        options: [
          "Bắt tay chào hỏi",
          "Chạm vào vùng đồ bơi của người khác",
          "Đập tay (High five)",
          "Khoác vai bạn thân"
        ],
        correctAnswer: 1,
        explanation: "Vùng đồ bơi là vùng riêng tư, không ai được phép chạm vào ngoại trừ bác sĩ khi khám bệnh (có sự đồng ý của phụ huynh)."
      },
      {
        text: "Khi có người lạ cho quà và yêu cầu giữ bí mật, bạn nên làm gì?",
        options: [
          "Nhận quà và giữ bí mật",
          "Từ chối và chạy đi kể ngay với người lớn tin cậy",
          "Giấu quà đi không cho ai biết",
          "Nhận quà nhưng kể cho bạn bè"
        ],
        correctAnswer: 1,
        explanation: "Không bao giờ giữ những 'bí mật xấu', đặc biệt là với người lạ. Hãy luôn kể cho ba mẹ hoặc thầy cô."
      }
    ]
  }

  const handleFinishVideo = () => {
    setIsVideoFinished(true)
  }

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return // Prevent multiple answers
    
    setSelectedAnswer(index)
    const correct = index === courseData.questions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(s => s + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < courseData.questions.length - 1) {
      setCurrentQuestion(c => c + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    } else {
      setShowResults(true)
    }
  }

  return (
    <div className="flex flex-col -mx-4 -mt-4 min-h-[calc(100vh-140px)]">
      {/* Course Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm border-b border-pink-100 sticky top-[68px] z-30">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-[17px] text-slate-800 flex-1 truncate">{courseData.title}</h1>
      </div>

      <div className="flex-1 px-4 py-6 w-full max-w-lg mx-auto pb-24">
        {!isVideoFinished ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Video Player (Simulated) */}
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-lg mb-6">
              <img src={courseData.videoUrl} alt="Video thumbnail" className="w-full h-full object-cover opacity-60" />
              <button 
                onClick={handleFinishVideo}
                className="absolute inset-0 flex flex-col items-center justify-center group"
              >
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform mb-3">
                  <Play size={32} fill="currentColor" className="ml-1" />
                </div>
                <span className="bg-black/50 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  Bấm để hoàn thành video
                </span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-800 mb-2">Giới thiệu bài học</h2>
              <p className="text-slate-600 leading-relaxed">{courseData.description}</p>
              
              <div className="mt-8 bg-pink-50 rounded-2xl p-4 flex gap-4 items-start border border-pink-100">
                <div className="bg-pink-100 p-2 rounded-xl text-pink-500 mt-1">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-pink-700 mb-1">Lưu ý quan trọng</h3>
                  <p className="text-sm text-pink-600/90">Hãy xem hết video để có thể làm bài kiểm tra trắc nghiệm nhé. Bài kiểm tra giúp bạn củng cố kiến thức tốt hơn!</p>
                </div>
              </div>
            </div>
          </div>
        ) : !showResults ? (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-slate-500 text-sm">Câu hỏi {currentQuestion + 1} / {courseData.questions.length}</span>
                <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">Trắc nghiệm</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-500 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / courseData.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-slate-800 mb-8 leading-snug">
              {courseData.questions[currentQuestion].text}
            </h2>

            <div className="flex flex-col gap-3 flex-1">
              {courseData.questions[currentQuestion].options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrectOption = courseData.questions[currentQuestion].correctAnswer === idx;
                
                let btnClass = "bg-white border-2 border-slate-100 text-slate-700 hover:border-pink-200 hover:bg-pink-50/50"
                if (selectedAnswer !== null) {
                  if (isCorrectOption) {
                    btnClass = "bg-green-50 border-2 border-green-500 text-green-700"
                  } else if (isSelected && !isCorrectOption) {
                    btnClass = "bg-red-50 border-2 border-red-500 text-red-700"
                  } else {
                    btnClass = "bg-slate-50 border-2 border-slate-100 text-slate-400 opacity-60"
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      "p-4 rounded-2xl text-left font-bold transition-all text-[15px] flex items-center justify-between",
                      btnClass
                    )}
                  >
                    <span>{option}</span>
                    {selectedAnswer !== null && isCorrectOption && <CheckCircle2 size={20} className="text-green-500 shrink-0 ml-2" />}
                  </button>
                )
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-8 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <div className={cn(
                  "p-4 rounded-2xl mb-6 flex gap-3",
                  isCorrect ? "bg-green-100/50 text-green-800" : "bg-red-100/50 text-red-800"
                )}>
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? <CheckCircle2 size={24} className="text-green-600" /> : <AlertCircle size={24} className="text-red-600" />}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{isCorrect ? "Tuyệt vời! Bạn trả lời đúng rồi" : "Chưa chính xác!"}</h4>
                    <p className="text-sm opacity-90">{courseData.questions[currentQuestion].explanation}</p>
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full bg-slate-800 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-slate-200 hover:bg-slate-900 transition-colors"
                >
                  {currentQuestion < courseData.questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-10">
            <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-pink-200 rounded-full animate-ping opacity-20"></div>
              <span className="text-5xl">🎉</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 text-center">Hoàn thành bài học!</h2>
            <p className="text-slate-500 text-center mb-8 font-medium">Bạn đã trả lời đúng {score}/{courseData.questions.length} câu hỏi trắc nghiệm.</p>
            
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-pink-500 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-600 transition-colors"
            >
              Quay lại trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
