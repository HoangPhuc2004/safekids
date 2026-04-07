import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type RequestStatus = "pending" | "approved" | "rejected";

export interface JoinRequest {
  id: string;
  studentId: string;
  studentName: string;
  groupId: string;
  groupName: string;
  status: RequestStatus;
  createdAt: string;
}

export interface GroupMember {
  id: string;
  name: string;
  role: "teacher" | "student";
  joinedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "teacher" | "student";
  text: string;
  time: string;
}

export interface Group {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  teacherId: string;
  teacherName: string;
  members: GroupMember[];
  pendingRequests: JoinRequest[];
  messages: ChatMessage[];
}

interface GroupContextType {
  groups: Group[];
  createGroup: (name: string, teacherId: string, teacherName: string) => Group;
  joinGroupByCode: (code: string, studentId: string, studentName: string) => { success: boolean; message: string };
  approveRequest: (groupId: string, requestId: string) => void;
  rejectRequest: (groupId: string, requestId: string) => void;
  removeMember: (groupId: string, memberId: string) => void;
  renameGroup: (groupId: string, newName: string) => void;
  deleteGroup: (groupId: string) => void;
  sendMessage: (groupId: string, senderId: string, senderName: string, senderRole: "teacher" | "student", text: string) => void;
  getGroupsForUser: (userId: string, role: "teacher" | "student") => Group[];
  getGroupById: (groupId: string) => Group | undefined;
  getPendingRequestsForTeacher: (teacherId: string) => JoinRequest[];
}

const STORAGE_KEY = "safekids_groups_v2";

const GroupContext = createContext<GroupContextType | undefined>(undefined);

function generateCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function loadGroups(): Group[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGroups(groups: Group[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
}

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>(loadGroups);

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setGroups(loadGroups());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const update = useCallback((updated: Group[]) => {
    setGroups(updated);
    saveGroups(updated);
  }, []);

  const createGroup = useCallback((name: string, teacherId: string, teacherName: string): Group => {
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name,
      code: generateCode(),
      createdAt: new Date().toISOString(),
      teacherId,
      teacherName,
      members: [{ id: teacherId, name: teacherName, role: "teacher", joinedAt: new Date().toISOString() }],
      pendingRequests: [],
      messages: [],
    };
    const current = loadGroups();
    update([newGroup, ...current]);
    return newGroup;
  }, [update]);

  const joinGroupByCode = useCallback((code: string, studentId: string, studentName: string): { success: boolean; message: string } => {
    const current = loadGroups();
    const groupIndex = current.findIndex(g => g.code.toUpperCase() === code.toUpperCase());
    if (groupIndex === -1) return { success: false, message: "Mã lớp không hợp lệ. Vui lòng kiểm tra lại!" };

    const group = current[groupIndex];
    const alreadyMember = group.members.some(m => m.id === studentId);
    if (alreadyMember) return { success: false, message: "Em đã là thành viên của nhóm này rồi!" };

    const alreadyRequested = group.pendingRequests.some(r => r.studentId === studentId && r.status === "pending");
    if (alreadyRequested) return { success: false, message: "Em đã gửi yêu cầu tham gia. Đang chờ giáo viên duyệt!" };

    const request: JoinRequest = {
      id: `req-${Date.now()}`,
      studentId,
      studentName,
      groupId: group.id,
      groupName: group.name,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    current[groupIndex] = { ...group, pendingRequests: [...group.pendingRequests, request] };
    update(current);
    return { success: true, message: `Đã gửi yêu cầu tham gia nhóm "${group.name}". Đang chờ giáo viên xác nhận!` };
  }, [update]);

  const approveRequest = useCallback((groupId: string, requestId: string) => {
    const current = loadGroups();
    const gIdx = current.findIndex(g => g.id === groupId);
    if (gIdx === -1) return;
    const group = { ...current[gIdx] };
    const req = group.pendingRequests.find(r => r.id === requestId);
    if (!req) return;
    group.pendingRequests = group.pendingRequests.map(r => r.id === requestId ? { ...r, status: "approved" as RequestStatus } : r);
    if (!group.members.some(m => m.id === req.studentId)) {
      group.members = [...group.members, { id: req.studentId, name: req.studentName, role: "student", joinedAt: new Date().toISOString() }];
    }
    current[gIdx] = group;
    update(current);
  }, [update]);

  const rejectRequest = useCallback((groupId: string, requestId: string) => {
    const current = loadGroups();
    const gIdx = current.findIndex(g => g.id === groupId);
    if (gIdx === -1) return;
    const group = { ...current[gIdx] };
    group.pendingRequests = group.pendingRequests.map(r => r.id === requestId ? { ...r, status: "rejected" as RequestStatus } : r);
    current[gIdx] = group;
    update(current);
  }, [update]);

  const removeMember = useCallback((groupId: string, memberId: string) => {
    const current = loadGroups();
    const gIdx = current.findIndex(g => g.id === groupId);
    if (gIdx === -1) return;
    current[gIdx] = { ...current[gIdx], members: current[gIdx].members.filter(m => m.id !== memberId) };
    update(current);
  }, [update]);

  const renameGroup = useCallback((groupId: string, newName: string) => {
    const current = loadGroups();
    const gIdx = current.findIndex(g => g.id === groupId);
    if (gIdx === -1) return;
    current[gIdx] = { ...current[gIdx], name: newName };
    update(current);
  }, [update]);

  const deleteGroup = useCallback((groupId: string) => {
    const current = loadGroups();
    update(current.filter(g => g.id !== groupId));
  }, [update]);

  const sendMessage = useCallback((groupId: string, senderId: string, senderName: string, senderRole: "teacher" | "student", text: string) => {
    const current = loadGroups();
    const gIdx = current.findIndex(g => g.id === groupId);
    if (gIdx === -1) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      senderRole,
      text,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    current[gIdx] = { ...current[gIdx], messages: [...current[gIdx].messages, msg] };
    update(current);
  }, [update]);

  const getGroupsForUser = useCallback((userId: string, role: "teacher" | "student"): Group[] => {
    return groups.filter(g => g.members.some(m => m.id === userId && m.role === role));
  }, [groups]);

  const getGroupById = useCallback((groupId: string): Group | undefined => {
    return groups.find(g => g.id === groupId);
  }, [groups]);

  const getPendingRequestsForTeacher = useCallback((teacherId: string): JoinRequest[] => {
    return groups
      .filter(g => g.teacherId === teacherId)
      .flatMap(g => g.pendingRequests.filter(r => r.status === "pending"));
  }, [groups]);

  return (
    <GroupContext.Provider value={{
      groups,
      createGroup,
      joinGroupByCode,
      approveRequest,
      rejectRequest,
      removeMember,
      renameGroup,
      deleteGroup,
      sendMessage,
      getGroupsForUser,
      getGroupById,
      getPendingRequestsForTeacher,
    }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroups() {
  const ctx = useContext(GroupContext);
  if (!ctx) throw new Error("useGroups must be used within GroupProvider");
  return ctx;
}
