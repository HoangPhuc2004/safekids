import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Users, CheckCircle, XCircle, BarChart3, TrendingUp, Calendar, Trophy, Target, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function GameStats() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mockData = {
    title: "Game Lớp 5A - Phòng tránh cơ bản",
    date: "10/10/2026",
    totalStudents: 35,
    avgScore: 85,
    participants: 35,
    questions: [
      { id: 1, text: "Vùng nhạy cảm là gì?", correct: 30, incorrect: 5 },
      { id: 2, text: "Ai được phép chạm vào vùng đồ bơi?", correct: 34, incorrect: 1 },
      { id: 3, text: "Quy tắc 5 ngón tay", correct: 25, incorrect: 10 },
      { id: 4, text: "Khi bị đe dọa, em nên làm gì?", correct: 28, incorrect: 7 },
    ]
  };

  const pieData = [
    { name: "Đạt (>=50%)", value: 30, color: "#4f46e5" },
    { name: "Chưa đạt (<50%)", value: 5, color: "#f43f5e" }
  ];

  const barData = mockData.questions.map(q => ({
    name: `Câu ${q.id}`,
    "Đúng": q.correct,
    "Sai": q.incorrect,
  }));

  const hardestQuestion = mockData.questions.reduce((prev, current) => (prev.incorrect > current.incorrect) ? prev : current);
  const easiestQuestion = mockData.questions.reduce((prev, current) => (prev.correct > current.correct) ? prev : current);

  return (
    <div className="bg-transparent min-h-screen pb-24 flex flex-col font-sans">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="font-black text-gray-800 text-lg lg:text-xl tracking-tight">
            Thống kê chi tiết
          </h1>
          <p className="hidden md:block text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Mã Game: {id || 'GAME-101'}</p>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 space-y-10">
        {/* Game Info Card */}
        <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3">
              <Calendar size={14} /> {mockData.date}
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2 tracking-tight">{mockData.title}</h2>
            <p className="text-gray-500 font-bold text-lg">Phân tích kết quả học tập của Lớp 5A</p>
          </div>
          
          <div className="flex gap-4 w-full lg:w-auto relative z-10">
            <div className="flex-1 lg:flex-none bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200 flex flex-col items-center justify-center min-w-[140px]">
              <Trophy size={32} className="mb-2 opacity-80" />
              <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mb-1">Điểm TB</p>
              <p className="text-3xl font-black">{mockData.avgScore}%</p>
            </div>
            <div className="flex-1 lg:flex-none bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm flex flex-col items-center justify-center min-w-[140px]">
              <Users size={32} className="mb-2 text-indigo-400" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tham gia</p>
              <p className="text-3xl font-black text-gray-800">{mockData.totalStudents}</p>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Insights */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-rose-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                  <AlertCircle size={60} className="text-rose-600" />
                </div>
                <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4">Câu hỏi khó nhất</h4>
                <p className="font-black text-gray-800 text-lg mb-4 leading-tight">Câu {hardestQuestion.id}: {hardestQuestion.text}</p>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black text-rose-600">{hardestQuestion.incorrect}</span>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-1.5">Học sinh trả lời sai</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-green-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                  <CheckCircle size={60} className="text-green-600" />
                </div>
                <h4 className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-4">Câu hỏi dễ nhất</h4>
                <p className="font-black text-gray-800 text-lg mb-4 leading-tight">Câu {easiestQuestion.id}: {easiestQuestion.text}</p>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-black text-green-600">{easiestQuestion.correct}</span>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-1.5">Học sinh trả lời đúng</span>
                </div>
              </div>
            </div>

            {/* Answer Distribution Chart */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-indigo-50">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-xl text-gray-800 flex items-center gap-3">
                  <BarChart3 className="text-indigo-600" />
                  Phân phối đáp án theo câu hỏi
                </h3>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fontWeight: 700, fill: '#9ca3af' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fontWeight: 700, fill: '#9ca3af' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#f9fafb' }} 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700 }} 
                    />
                    <Bar dataKey="Đúng" stackId="a" fill="#4f46e5" radius={[0, 0, 8, 8]} barSize={40} />
                    <Bar dataKey="Sai" stackId="a" fill="#f43f5e" radius={[8, 8, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart & Recommendations */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-indigo-50 flex flex-col items-center">
              <h3 className="font-black text-xl text-gray-800 mb-8 self-start">Tỷ lệ đạt mục tiêu</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3 w-full mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-xs font-black text-gray-600 uppercase tracking-widest">{entry.name}</span>
                    </div>
                    <span className="font-black text-gray-800">{entry.value} EM</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-200">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Target size={24} />
                Đề xuất giảng dạy
              </h3>
              <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6">
                Dựa trên kết quả, có <span className="text-white font-black">{hardestQuestion.incorrect} học sinh</span> còn lúng túng ở <span className="text-white font-black">Câu {hardestQuestion.id}</span>. Cô nên dành 5-10 phút đầu giờ tới để ôn tập lại nội dung này.
              </p>
              <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                Tải báo cáo PDF chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
