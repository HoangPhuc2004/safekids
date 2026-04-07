import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft, Plus, MessageCircle, ShieldCheck, Search,
  Clock, ChevronRight, X, Copy, Check, Users, Bell, LogIn,
  Hourglass, CheckCircle2, XCircle
} from "lucide-react";
import { useGroups } from "../../context/GroupContext";
import { useAuth } from "../../context/AuthContext";

export default function GroupsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const {
    groups, createGroup, joinGroupByCode,
    getGroupsForUser, getPendingRequestsForTeacher,
  } = useGroups();

  const isTeacher = location.pathname.startsWith("/teacher");
  const userId = user?.username ?? "";
  const userName = user?.name ?? "";

  // ── My groups ──────────────────────────────────────────────────────────────
  const myGroups = getGroupsForUser(userId, isTeacher ? "teacher" : "student");

  // ── Teacher: pending requests count ───────────────────────────────────────
  const pendingRequests = isTeacher ? getPendingRequestsForTeacher(userId) : [];

  // ── Create group modal (teacher) ───────────────────────────────────────────
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [createdGroup, setCreatedGroup] = useState<{ name: string; code: string } | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCreate = () => {
    if (!newGroupName.trim()) return;
    const g = createGroup(newGroupName.trim(), userId, userName);
    setCreatedGroup({ name: g.name, code: g.code });
    setNewGroupName("");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    });
  };

  // ── Join group modal (student) ─────────────────────────────────────────────
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinResult, setJoinResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleJoin = () => {
    if (!joinCode.trim()) return;
    const result = joinGroupByCode(joinCode.trim(), userId, userName);
    setJoinResult(result);
    if (result.success) setJoinCode("");
  };

  // ── Student: check pending status for a group ─────────────────────────────
  const getStudentStatus = (groupId: string) => {
    const grp = groups.find(g => g.id === groupId);
    if (!grp) return null;
    const isMember = grp.members.some(m => m.id === userId && m.role === "student");
    if (isMember) return "member";
    const req = grp.pendingRequests.find(r => r.studentId === userId && r.status === "pending");
    if (req) return "pending";
    return null;
  };

  // ── Also show groups where student has pending request but not yet member ──
  const pendingGroups = isTeacher ? [] : groups.filter(g => {
    const isMember = myGroups.some(mg => mg.id === g.id);
    const hasPending = g.pendingRequests.some(r => r.studentId === userId && r.status === "pending");
    return !isMember && hasPending;
  });

  const allDisplayGroups = [...myGroups, ...pendingGroups];

  const basePath = isTeacher ? "/teacher" : "/student";

  return (
    <div className="bg-transparent min-h-screen pb-24 flex flex-col font-sans relative">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 border-b border-indigo-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all shadow-sm">
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-black text-gray-800 text-lg lg:text-xl tracking-tight">Thảo luận nhóm</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Search size={22} />
          </button>

          {isTeacher && (
            <div className="relative">
              {pendingRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-black flex items-center justify-center border-2 border-white z-10 animate-bounce">
                  {pendingRequests.length}
                </span>
              )}
              <button
                onClick={() => setIsCreateOpen(true)}
                className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                <Plus size={22} strokeWidth={3} />
              </button>
            </div>
          )}

          {!isTeacher && (
            <button
              onClick={() => { setIsJoinOpen(true); setJoinResult(null); }}
              className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 text-sm font-black"
            >
              <LogIn size={18} strokeWidth={3} />
              Nhập mã lớp
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full p-6 lg:p-10">
        {/* Safe Space Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-[2rem] p-8 mb-10 flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-indigo-100/50 text-white relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-10 group-hover:scale-125 transition-transform">
            <ShieldCheck size={160} />
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl font-black mb-1">Không gian chia sẻ An toàn</h3>
            <p className="text-indigo-100 font-medium leading-relaxed opacity-90">
              Đây là nơi các em có thể đặt câu hỏi về các vấn đề quấy rối, thắc mắc bài học để cô giáo và các bạn cùng hỗ trợ.
            </p>
          </div>
        </div>

        {/* Pending requests banner for teacher */}
        {isTeacher && pendingRequests.length > 0 && (
          <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bell size={24} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-black text-amber-800">Có {pendingRequests.length} yêu cầu tham gia đang chờ duyệt</p>
              <p className="text-sm text-amber-600 font-medium">Mở nhóm tương ứng để chấp nhận hoặc từ chối.</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-2xl text-gray-900">
            Danh sách nhóm {isTeacher ? "của cô" : "của em"}
          </h2>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {allDisplayGroups.length} NHÓM
          </span>
        </div>

        {allDisplayGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Users size={40} className="text-indigo-300" />
            </div>
            <h3 className="font-black text-xl text-gray-600 mb-2">Chưa có nhóm nào</h3>
            <p className="text-gray-400 font-medium max-w-xs">
              {isTeacher
                ? "Nhấn nút + để tạo nhóm lớp mới và chia sẻ mã lớp cho học sinh."
                : "Nhấn \"Nhập mã lớp\" để tham gia nhóm của cô giáo."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allDisplayGroups.map((group) => {
              const status = isTeacher ? null : getStudentStatus(group.id);
              const groupPending = isTeacher
                ? group.pendingRequests.filter(r => r.status === "pending").length
                : 0;

              return (
                <div
                  key={group.id}
                  onClick={() => {
                    if (status === "member" || isTeacher) {
                      navigate(`${basePath}/groups/${group.id}`);
                    }
                  }}
                  className={`bg-white p-6 rounded-[2rem] shadow-sm border border-indigo-50 flex items-center gap-5 transition-all group relative overflow-hidden ${
                    status === "member" || isTeacher
                      ? "cursor-pointer hover:border-pink-300 hover:shadow-xl hover:shadow-pink-50"
                      : "cursor-default opacity-80"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                      {group.name.substring(0, 2).toUpperCase()}
                    </div>
                    {groupPending > 0 && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-black flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                        {groupPending}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-gray-800 text-lg group-hover:text-pink-600 transition-colors truncate">
                        {group.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                      <Clock size={12} />
                      {new Date(group.createdAt).toLocaleDateString("vi-VN")}
                      <span className="ml-2 text-indigo-400 font-black">MÃ: {group.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">
                        {group.members.filter(m => m.role === "student").length} học sinh
                      </span>
                      {/* Student status badge */}
                      {status === "pending" && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <Hourglass size={10} />
                          Đang chờ duyệt
                        </span>
                      )}
                    </div>
                  </div>

                  {(status === "member" || isTeacher) && (
                    <div className="text-gray-300 group-hover:text-pink-400 transition-colors ml-1">
                      <ChevronRight size={24} strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── TEACHER: Create Group Modal ───────────────────────────────────────── */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => { setIsCreateOpen(false); setCreatedGroup(null); setNewGroupName(""); }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            {!createdGroup ? (
              <>
                <div className="text-center mb-6 pt-2">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Plus size={28} className="text-indigo-600" strokeWidth={3} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">Tạo nhóm lớp mới</h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">Hệ thống sẽ tự tạo mã lớp để học sinh tham gia.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Tên nhóm</label>
                    <input
                      type="text"
                      value={newGroupName}
                      onChange={e => setNewGroupName(e.target.value)}
                      onKeyPress={e => e.key === "Enter" && handleCreate()}
                      placeholder="Ví dụ: Lớp 5A, Nhóm Tiếng Anh..."
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-200 focus:bg-white rounded-xl py-3 px-4 outline-none font-medium text-gray-700 transition-all"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={handleCreate}
                    disabled={!newGroupName.trim()}
                    className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Tạo nhóm
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center pt-4 pb-2">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800 mb-1">Nhóm đã được tạo!</h2>
                  <p className="text-gray-500 text-sm font-medium">Chia sẻ mã lớp này cho học sinh của bạn.</p>
                </div>

                <div className="my-6 bg-indigo-50 rounded-2xl p-6 flex flex-col items-center gap-3">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Mã lớp — {createdGroup.name}</p>
                  <p className="text-5xl font-black text-indigo-700 tracking-[0.3em] select-all">{createdGroup.code}</p>
                  <button
                    onClick={() => handleCopyCode(createdGroup.code)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-indigo-200 text-indigo-600 font-black text-sm rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                  >
                    {codeCopied ? <Check size={16} /> : <Copy size={16} />}
                    {codeCopied ? "Đã sao chép!" : "Sao chép mã"}
                  </button>
                </div>

                <button
                  onClick={() => { setIsCreateOpen(false); setCreatedGroup(null); }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-4 rounded-xl transition-all"
                >
                  Xong
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── STUDENT: Join Group Modal ─────────────────────────────────────────── */}
      {isJoinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => { setIsJoinOpen(false); setJoinResult(null); setJoinCode(""); }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6 pt-2">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <LogIn size={28} className="text-indigo-600" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black text-gray-800">Tham gia nhóm lớp</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Nhập mã lớp do giáo viên cung cấp.</p>
            </div>

            {joinResult ? (
              <div className={`mb-6 p-4 rounded-2xl flex flex-col items-center gap-3 ${joinResult.success ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200"}`}>
                {joinResult.success
                  ? <CheckCircle2 size={32} className="text-green-500" />
                  : <XCircle size={32} className="text-red-400" />}
                <p className={`font-bold text-center text-sm ${joinResult.success ? "text-green-700" : "text-red-600"}`}>
                  {joinResult.message}
                </p>
              </div>
            ) : null}

            {!joinResult?.success && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Mã lớp</label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={e => setJoinCode(e.target.value.replace(/\D/g, ""))}
                    onKeyPress={e => e.key === "Enter" && handleJoin()}
                    placeholder="Ví dụ: 1234"
                    maxLength={4}
                    inputMode="numeric"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-200 focus:bg-white rounded-xl py-3 px-4 outline-none font-black text-gray-700 transition-all text-center text-2xl tracking-[0.5em]"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleJoin}
                  disabled={joinCode.length < 4}
                  className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Gửi yêu cầu tham gia
                </button>
              </div>
            )}

            {joinResult?.success && (
              <div className="space-y-3 mt-2">
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <Hourglass size={20} className="text-amber-500 flex-shrink-0" />
                  <p className="text-sm text-amber-700 font-medium">
                    Yêu cầu của em đang chờ giáo viên xác nhận. Em sẽ vào nhóm sau khi được chấp thuận.
                  </p>
                </div>
                <button
                  onClick={() => { setIsJoinOpen(false); setJoinResult(null); }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-4 rounded-xl transition-all"
                >
                  Xong
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
