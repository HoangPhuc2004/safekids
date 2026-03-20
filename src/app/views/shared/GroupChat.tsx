import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Send, Image as ImageIcon, Smile, MoreVertical, Users, ShieldCheck, Search, Paperclip, Mic } from "lucide-react";

export default function GroupChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTeacher = location.pathname.startsWith("/teacher");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Minh Đức", text: "Cô ơi, con có thắc mắc ạ", time: "10:15", isMe: false, role: "Học sinh" },
    { id: 2, sender: "Cô Nguyễn A", text: "Cô đây, con hỏi đi", time: "10:16", isMe: isTeacher, role: "Giáo viên" },
    { id: 3, sender: "Minh Đức", text: "Nếu có người trêu chọc bạn bè con bằng lời nói thì con làm sao ạ? Điều đó có phải quấy rối không cô?", time: "10:20", isMe: false, role: "Học sinh" },
    { id: 4, sender: "Cô Nguyễn A", text: "Đó là một dạng quấy rối bằng lời nói con nhé. Con nên bảo vệ bạn bằng cách nói 'Dừng lại!' thật to, rồi rủ bạn đi chỗ khác và báo ngay cho giáo viên.", time: "10:25", isMe: isTeacher, role: "Giáo viên" },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: isTeacher ? "Cô Nguyễn A" : "Minh Đức",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        role: isTeacher ? "Giáo viên" : "Học sinh"
      }
    ]);
    setNewMessage("");
  };

  return (
    <div className="bg-white flex flex-col h-screen font-sans border-x border-indigo-50 max-w-7xl mx-auto shadow-2xl">
      {/* Premium Chat Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black shadow-inner">
               5A
            </div>
            <div>
              <h1 className="font-black text-gray-800 text-lg tracking-tight">Nhóm Hỗ Trợ 5A</h1>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">36 Thành viên trực tuyến</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="hidden md:flex p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Search size={22} />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <MoreVertical size={22} />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-indigo-50/20 pb-10">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 px-6 py-3 rounded-full shadow-sm flex items-center gap-3 max-w-md">
            <ShieldCheck size={20} className="text-indigo-600" />
            <p className="text-[11px] font-black text-indigo-900 uppercase tracking-widest leading-tight text-center">
              Mọi tin nhắn đều được bảo mật bởi SafeKids AI
            </p>
          </div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-6">HÔM NAY - 10 THÁNG 10</span>
        </div>
        
        {messages.map((msg, idx) => {
          const showAvatar = idx === 0 || messages[idx-1].sender !== msg.sender;
          return (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="relative group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shadow-sm transition-transform group-hover:scale-110 ${
                  msg.isMe ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-pink-600 border border-indigo-50'
                }`}>
                  {msg.sender.slice(0, 2).toUpperCase()}
                </div>
              </div>
              
              <div className={`flex flex-col max-w-[70%] lg:max-w-[60%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
               {!msg.isMe && showAvatar && (
                  <div className="flex items-center gap-2 mb-1.5 ml-1">
                    <span className="text-[11px] font-black text-gray-700 tracking-tight">{msg.sender}</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-md border border-gray-100">{msg.role}</span>
                  </div>
               )}
                
                <div className={`px-5 py-4 rounded-[1.5rem] shadow-sm text-[15px] font-medium leading-relaxed ${
                  msg.isMe 
                    ? 'bg-indigo-600 text-white rounded-tr-[0.2rem] shadow-indigo-200/50' 
                    : 'bg-white text-gray-800 border-2 border-indigo-50/50 rounded-tl-[0.2rem]'
                }`}>
                  <p>{msg.text}</p>
                </div>
                <span className={`text-[10px] text-gray-400 font-black mt-2 tracking-widest ${msg.isMe ? 'mr-1' : 'ml-1'}`}>{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Premium Message Input */}
      <div className="p-4 lg:p-6 bg-white border-t border-indigo-50">
        <div className="bg-gray-50 rounded-[2rem] p-2 flex items-center gap-2 border-2 border-transparent focus-within:border-indigo-100 focus-within:bg-white transition-all shadow-inner">
          <div className="flex items-center gap-1 pl-2">
            <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
              <Paperclip size={20} />
            </button>
            <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
              <Smile size={20} />
            </button>
          </div>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hãy đặt câu hỏi cho cô giáo nhé..."
            className="flex-1 bg-transparent border-none focus:outline-none py-3 px-2 text-gray-700 font-medium placeholder:text-gray-300 placeholder:italic"
          />
          
          <div className="flex items-center gap-2 pr-2">
            <button className="hidden sm:flex p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
              <Mic size={20} />
            </button>
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className={`p-3.5 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-90 ${
                newMessage.trim() 
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-indigo-200' 
                  : 'bg-gray-200 text-gray-400 shadow-none'
              }`}
            >
              <Send size={20} strokeWidth={3} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
