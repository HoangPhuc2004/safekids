import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ShieldAlert, UploadCloud, Info, CheckCircle2, AlertCircle, FileText, ChevronRight, PhoneCall } from "lucide-react";

export default function ReportView() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="bg-transparent min-h-screen pb-24 flex flex-col font-sans">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-rose-50 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="font-black text-gray-800 text-lg lg:text-xl tracking-tight">
            Báo cáo Vi phạm Khẩn cấp
          </h1>
          <p className="hidden md:block text-[10px] font-black text-rose-500 uppercase tracking-widest mt-0.5">Hệ thống bảo vệ trẻ em SafeKids</p>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full p-6 lg:p-10">
        {step === 1 ? (
          <div className="space-y-10">
            {/* Full-width Warning Banner */}
            <div className="bg-gradient-to-r from-rose-600 to-red-500 text-white p-8 lg:p-10 rounded-[2.5rem] shadow-xl shadow-rose-200 relative overflow-hidden group">
               <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full group-hover:scale-125 transition-transform" />
               <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-125 transition-transform" />
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                 <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                   <ShieldAlert size={48} className="text-white" />
                 </div>
                 <div className="flex-1 text-center md:text-left">
                   <h3 className="text-3xl lg:text-4xl font-black mb-3 text-white flex items-center justify-center md:justify-start gap-3">
                     Cảnh báo Đỏ
                   </h3>
                   <p className="text-rose-50 font-bold text-lg leading-relaxed mb-4 max-w-3xl mx-auto md:mx-0">
                     Hệ thống này được liên kết trực tiếp với <span className="text-white bg-rose-700/50 px-2 py-0.5 rounded-lg border border-rose-500">Tổng đài Quốc gia 111</span>. 
                     Việc gửi báo cáo giả mạo là hành vi vi phạm pháp luật nghiêm trọng.
                   </p>
                   <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-rose-700/50 px-4 py-2.5 rounded-xl border border-rose-500">
                     <AlertCircle size={16} /> Bảo mật 2 lớp AES-256
                   </div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldAlert size={120} className="text-rose-600" />
                </div>
                
                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <FileText className="text-rose-600" />
                  Chi tiết sự việc
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      Thông tin đối tượng bị hại <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Họ tên học sinh, tên lớp và trường..."
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl transition-all outline-none font-bold text-gray-800 shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      Loại hình vi phạm <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "leak", label: "Hình ảnh nhạy cảm bị phát tán" },
                        { id: "threat", label: "Bị đe dọa, tống tiền" },
                        { id: "harassment", label: "Quấy rối qua tin nhắn" },
                        { id: "other", label: "Vấn đề nghiêm trọng khác" }
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setIncidentType(type.id)}
                          className={`
                            px-6 py-4 rounded-2xl border-2 transition-all font-black text-sm text-left
                            ${incidentType === type.id 
                              ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-md translate-y-[-2px]' 
                              : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-rose-200'}
                          `}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      Nội dung sự việc <span className="text-rose-500">*</span>
                    </label>
                    <textarea 
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Hãy kể lại ngắn gọn điều gì đã xảy ra, ở đâu (Facebook, Zalo, Tiktok...)..."
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl transition-all outline-none font-medium text-gray-800 min-h-[160px] resize-none shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      Minh chứng đính kèm (Hình ảnh/Video)
                    </label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer group">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-rose-500 shadow-sm transition-colors mb-4">
                        <UploadCloud size={32} />
                      </div>
                      <span className="text-sm font-black text-gray-700 uppercase tracking-widest">Kéo thả hoặc Chọn ảnh</span>
                      <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">Chấp nhận JPG, PNG, MP4 (Tối đa 20MB)</p>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple accept="image/*,video/*" onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))} />
                    </div>
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {files.map((f, i) => (
                          <div key={i} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-black border border-green-100 flex items-center gap-2">
                            <FileText size={12} /> {f.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-rose-200 transition-all transform active:scale-95 flex items-center justify-center gap-3 text-xl tracking-tight"
                  >
                    GỬI BÁO CÁO NGAY <ChevronRight size={24} strokeWidth={3} />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Support info */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-indigo-50 shadow-sm">
                <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Hỗ trợ khẩn cấp 24/7</h4>
                <div className="space-y-6">
                  <a href="tel:111" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <PhoneCall size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đường dây nóng</p>
                      <p className="text-lg font-black text-gray-800">111 (Miễn phí)</p>
                    </div>
                  </a>
                  <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-3xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Info size={16} className="text-blue-600" />
                      <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Lưu ý chuyên gia:</span>
                    </div>
                    <ul className="text-[11px] text-blue-800 font-bold space-y-2 list-disc pl-4 opacity-80">
                      <li>Khuyên trẻ giữ nguyên bằng chứng gốc</li>
                      <li>Khuyên trẻ chặn ngay kẻ đe dọa</li>
                      <li>Liên hệ kịp thời với phụ huynh</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto w-full pt-10">
            <div className="bg-white p-12 lg:p-20 rounded-[4rem] shadow-2xl shadow-indigo-100 border border-white flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-100">
                <CheckCircle2 size={64} className="text-green-500" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">GỬI THÀNH CÔNG!</h2>
              <p className="text-gray-500 font-bold text-xl mb-12">Hệ thống đã chuyển báo cáo của em đến chuyên gia hỗ trợ. Hãy bình tĩnh, chúng mình luôn ở bên cạnh em.</p>
              
              <div className="w-full space-y-4">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-2xl shadow-indigo-200 transition-all active:scale-95"
                >
                  QUAY LẠI TRANG CHỦ
                </button>
                <div className="flex items-center justify-center gap-2 pt-4">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đang kết nối với tổng đài viên...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
