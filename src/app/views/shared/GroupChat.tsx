import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Send, Smile, MoreVertical, ShieldCheck, Search, Paperclip, Mic, Edit2, Trash2, Users, PlusCircle, X } from "lucide-react";

export default function GroupChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTeacher = location.pathname.startsWith("/teacher");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [groupName, setGroupName] = useState("Nhóm Hỗ Trợ 5A");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState(groupName);

  const [members, setMembers] = useState([
    { id: "m1", name: "Nguyễn Văn A" },
    { id: "m2", name: "Trần Thị B" },
    { id: "m3", name: "Lê Văn C" },
  ]);
  const [isManageMembersModalOpen, setIsManageMembersModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  
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

  const handleRenameGroup = () => {
    if (!newGroupName.trim()) return;
    setGroupName(newGroupName);
    setIsRenameModalOpen(false);
    setIsMenuOpen(false);
  };

  const handleDeleteGroup = () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá nhóm này không?")) {
      navigate(-1);
    }
  };

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    setMembers([...members, { id: `m-${Date.now()}`, name: newMemberName }]);
    setNewMemberName("");
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  return (
    <div className="bg-white flex flex-col h-screen font-sans border-x border-indigo-50 max-w-7xl mx-auto shadow-2xl relative">
      {/* Premium Chat Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black shadow-inner">
               {groupName.substring(groupName.length > 2 ? groupName.length - 2 : 0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-black text-gray-800 text-lg tracking-tight">{groupName}</h1>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">{members.length + 33} Thành viên trực tuyến</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 relative">
          <button className="hidden md:flex p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Search size={22} />
          </button>
          {isTeacher && (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <MoreVertical size={22} />
            </button>
          )}

          {/* Teacher Group Actions Dropdown */}
          {isMenuOpen && isTeacher && (
             <div className="absolute top-12 right-0 bg-white border border-indigo-50 shadow-xl rounded-xl w-48 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => { setIsRenameModalOpen(true); setIsMenuOpen(false); setNewGroupName(groupName); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 flex items-center gap-2 transition-colors"
                >
                  <Edit2 size={16} /> Đổi tên nhóm
                </button>
                <div className="h-px bg-gray-100 my-1 mx-2"></div>
                <button 
                  onClick={() => { setIsManageMembersModalOpen(true); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 flex items-center gap-2 transition-colors"
                >
                  <Users size={16} /> Quản lý thành viên
                </button>
                <div className="h-px bg-gray-100 my-1 mx-2"></div>
                <button 
                  onClick={() => { handleDeleteGroup(); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={16} /> Xóa nhóm
                </button>
             </div>
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-indigo-50/20 pb-10" onClick={() => setIsMenuOpen(false)}>
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
      <div className="p-4 lg:p-6 bg-white border-t border-indigo-50" onClick={() => setIsMenuOpen(false)}>
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

      {/* Rename Group Modal */}
      {isRenameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsRenameModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-gray-800 mb-2 text-center mt-2">Đổi tên nhóm</h2>
            <p className="text-gray-500 text-center text-sm font-medium mb-6">Nhập tên mới cho nhóm lớp này.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Tên nhóm mới</label>
                <input 
                  type="text" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleRenameGroup()}
                  placeholder="Ví dụ: Nhóm 1, Nhóm Tiếng Anh..."
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-xl py-3 px-4 outline-none font-medium text-gray-700 transition-all"
                />
              </div>
              <button 
                onClick={handleRenameGroup}
                className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Members Modal */}
      {isManageMembersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl relative flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsManageMembersModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all z-10"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-6 pt-2">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-3">
                {groupName.substring(groupName.length > 2 ? groupName.length - 2 : 0).toUpperCase()}
              </div>
              <h2 className="text-xl font-black text-gray-800">{groupName}</h2>
              <p className="text-xs font-bold text-indigo-500 mt-1">{members.length} THÀNH VIÊN</p>
            </div>

            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-xl">
              <input 
                type="text" 
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                placeholder="Thêm thành viên mới..."
                className="flex-1 bg-transparent border-none outline-none px-2 font-medium text-sm text-gray-700"
              />
              <button 
                onClick={handleAddMember}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              >
                <PlusCircle size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
              {members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-indigo-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-full flex items-center justify-center font-black text-sm text-indigo-600">
                      {member.name.substring(0, 1).toUpperCase()}
                    </div>
                    <span className="font-bold text-gray-700 text-sm">{member.name}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {members.length === 0 && (
                <div className="py-8 text-center text-gray-400 font-medium text-sm">
                  Chưa có thành viên nào
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setIsManageMembersModalOpen(false)}
              className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black rounded-xl transition-all"
            >
              Xong
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
