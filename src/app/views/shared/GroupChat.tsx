import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import {
  ArrowLeft, Send, Smile, MoreVertical, ShieldCheck, Search,
  Paperclip, Mic, Edit2, Trash2, Users, X, CheckCircle2, XCircle,
  Clock, Bell
} from "lucide-react";
import { useGroups } from "../../context/GroupContext";
import { useAuth } from "../../context/AuthContext";

type Tab = "chat" | "pending" | "members";

export default function GroupChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: groupId } = useParams<{ id: string }>();
  const isTeacher = location.pathname.startsWith("/teacher");

  const { user } = useAuth();
  const {
    getGroupById, sendMessage, renameGroup, deleteGroup,
    removeMember, approveRequest, rejectRequest,
  } = useGroups();

  const userId = user?.username ?? "";
  const userName = user?.name ?? "";
  const userRole = isTeacher ? "teacher" : "student";

  const group = groupId ? getGroupById(groupId) : undefined;

  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState(group?.name ?? "");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [group?.messages]);

  if (!group) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 font-medium">
        <div className="text-center">
          <p className="text-xl font-black mb-2">Không tìm thấy nhóm</p>
          <button onClick={() => navigate(-1)} className="text-indigo-600 font-black underline">Quay lại</button>
        </div>
      </div>
    );
  }

  const pendingRequests = group.pendingRequests.filter(r => r.status === "pending");
  const members = group.members.filter(m => m.role === "student");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(group.id, userId, userName, userRole, newMessage.trim());
    setNewMessage("");
  };

  const handleRenameGroup = () => {
    if (!newGroupName.trim()) return;
    renameGroup(group.id, newGroupName.trim());
    setIsRenameModalOpen(false);
    setIsMenuOpen(false);
  };

  const handleDeleteGroup = () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá nhóm này không?")) {
      deleteGroup(group.id);
      navigate(-1);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (window.confirm("Xác nhận xoá thành viên này khỏi nhóm?")) {
      removeMember(group.id, memberId);
    }
  };

  return (
    <div
      className="bg-white flex flex-col h-screen font-sans border-x border-indigo-50 max-w-7xl mx-auto shadow-2xl relative"
      onClick={() => setIsMenuOpen(false)}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black shadow-inner">
              {group.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="font-black text-gray-800 text-lg tracking-tight">{group.name}</h1>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">
                  {members.length} Học sinh · Mã: <span className="text-indigo-500">{group.code}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 relative" onClick={e => e.stopPropagation()}>
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

          {isMenuOpen && isTeacher && (
            <div className="absolute top-12 right-0 bg-white border border-indigo-50 shadow-xl rounded-xl w-52 py-2 z-50">
              <button
                onClick={() => { setIsRenameModalOpen(true); setIsMenuOpen(false); setNewGroupName(group.name); }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 flex items-center gap-2 transition-colors"
              >
                <Edit2 size={16} /> Đổi tên nhóm
              </button>
              <div className="h-px bg-gray-100 my-1 mx-2" />
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

      {/* ── Tabs (teacher only) ────────────────────────────────────────────── */}
      {isTeacher && (
        <div className="flex border-b border-indigo-50 bg-white px-6 gap-1">
          {[
            { key: "chat" as Tab, label: "Tin nhắn", icon: null },
            {
              key: "pending" as Tab,
              label: "Yêu cầu tham gia",
              badge: pendingRequests.length,
            },
            { key: "members" as Tab, label: "Thành viên", icon: null },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-black transition-all border-b-2 ${
                activeTab === tab.key
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Tab: Pending Requests (teacher) ───────────────────────────────── */}
      {isTeacher && activeTab === "pending" && (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {pendingRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={36} className="text-green-400" />
              </div>
              <p className="font-black text-gray-500 text-lg">Không có yêu cầu nào đang chờ</p>
              <p className="text-gray-400 text-sm font-medium mt-1">Tất cả yêu cầu đã được xử lý.</p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Bell size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-black text-gray-800">
                    {pendingRequests.length} yêu cầu đang chờ duyệt
                  </p>
                  <p className="text-xs text-gray-400 font-medium">Chấp nhận hoặc từ chối từng học sinh bên dưới.</p>
                </div>
              </div>

              {pendingRequests.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-5 border border-indigo-50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-lg flex-shrink-0">
                    {req.studentName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-800 truncate">{req.studentName}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
                      <Clock size={10} />
                      {new Date(req.createdAt).toLocaleString("vi-VN", {
                        day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit"
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => approveRequest(group.id, req.id)}
                      className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-black text-sm px-4 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm shadow-green-200"
                    >
                      <CheckCircle2 size={16} />
                      Duyệt
                    </button>
                    <button
                      onClick={() => rejectRequest(group.id, req.id)}
                      className="flex items-center gap-1.5 bg-white border-2 border-red-200 hover:bg-red-50 text-red-500 font-black text-sm px-4 py-2.5 rounded-xl transition-all active:scale-95"
                    >
                      <XCircle size={16} />
                      Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Members (teacher) ─────────────────────────────────────────── */}
      {isTeacher && activeTab === "members" && (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Users size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="font-black text-gray-800">{members.length} học sinh trong nhóm</p>
                <p className="text-xs text-gray-400 font-medium">Nhấn ✕ để xoá thành viên khỏi nhóm.</p>
              </div>
            </div>

            {members.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                  <Users size={36} className="text-indigo-300" />
                </div>
                <p className="font-black text-gray-500">Chưa có học sinh nào trong nhóm.</p>
              </div>
            ) : (
              members.map(member => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl p-4 border border-indigo-50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl flex items-center justify-center font-black text-indigo-600 text-sm">
                    {member.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-400 font-medium">
                      Tham gia: {new Date(member.joinedAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Tab: Chat ─────────────────────────────────────────────────────── */}
      {(!isTeacher || activeTab === "chat") && (
        <>
          <div
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-indigo-50/20 pb-10"
          >
            {/* Safe badge */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 px-6 py-3 rounded-full shadow-sm flex items-center gap-3 max-w-md">
                <ShieldCheck size={20} className="text-indigo-600" />
                <p className="text-[11px] font-black text-indigo-900 uppercase tracking-widest leading-tight text-center">
                  Mọi tin nhắn đều được bảo mật bởi SafeKids AI
                </p>
              </div>
            </div>

            {group.messages.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="font-black text-lg">Chưa có tin nhắn nào</p>
                <p className="text-sm font-medium mt-1">Hãy bắt đầu cuộc trò chuyện!</p>
              </div>
            )}

            {group.messages.map((msg, idx) => {
              const isMe = msg.senderId === userId;
              const showAvatar = idx === 0 || group.messages[idx - 1].senderId !== msg.senderId;
              return (
                <div key={msg.id} className={`flex items-end gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0 ${
                    isMe ? "bg-indigo-100 text-indigo-600" : "bg-white text-pink-600 border border-indigo-50"
                  }`}>
                    {msg.senderName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className={`flex flex-col max-w-[70%] lg:max-w-[60%] ${isMe ? "items-end" : "items-start"}`}>
                    {!isMe && showAvatar && (
                      <div className="flex items-center gap-2 mb-1.5 ml-1">
                        <span className="text-[11px] font-black text-gray-700 tracking-tight">{msg.senderName}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-md border border-gray-100">
                          {msg.senderRole === "teacher" ? "Giáo viên" : "Học sinh"}
                        </span>
                      </div>
                    )}
                    <div className={`px-5 py-4 rounded-[1.5rem] shadow-sm text-[15px] font-medium leading-relaxed ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-tr-[0.2rem] shadow-indigo-200/50"
                        : "bg-white text-gray-800 border-2 border-indigo-50/50 rounded-tl-[0.2rem]"
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                    <span className={`text-[10px] text-gray-400 font-black mt-2 tracking-widest ${isMe ? "mr-1" : "ml-1"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
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
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSend()}
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
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-indigo-200"
                      : "bg-gray-200 text-gray-400 shadow-none"
                  }`}
                >
                  <Send size={20} strokeWidth={3} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Rename Modal ───────────────────────────────────────────────────── */}
      {isRenameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setIsRenameModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-gray-800 mb-2 text-center mt-2">Đổi tên nhóm</h2>
            <p className="text-gray-500 text-center text-sm font-medium mb-6">Nhập tên mới cho nhóm lớp này.</p>
            <div className="space-y-4">
              <input
                type="text"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleRenameGroup()}
                placeholder="Ví dụ: Nhóm 1, Nhóm Tiếng Anh..."
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-xl py-3 px-4 outline-none font-medium text-gray-700 transition-all"
                autoFocus
              />
              <button
                onClick={handleRenameGroup}
                disabled={!newGroupName.trim()}
                className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200 disabled:opacity-40"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
