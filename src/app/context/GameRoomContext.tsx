import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Models
export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface GameRoom {
  id: string;
  teacherId: string;
  gameName: string;
  template: string;
  video: string;
  status: 'waiting' | 'playing' | 'finished';
  players: Player[];
}

// Context Type
interface GameRoomContextType {
  activeRoom: GameRoom | null;
  createRoom: (roomInfo: Omit<GameRoom, 'id' | 'status' | 'players'>) => string;
  joinRoom: (roomId: string, player: Omit<Player, 'id'>) => boolean;
  leaveRoom: (roomId: string, playerId: string) => void;
  startGame: (roomId: string) => void;
}

const GameRoomContext = createContext<GameRoomContextType | undefined>(undefined);

// Storage key
const ROOM_STORAGE_KEY = 'safekids_game_room';

// Helper to get random 4 digit string
const generateRoomId = () => Math.floor(1000 + Math.random() * 9000).toString();
const generatePlayerId = () => Math.random().toString(36).substring(2, 9);

export const GameRoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRoom, setActiveRoom] = useState<GameRoom | null>(() => {
    try {
      const stored = localStorage.getItem(ROOM_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ROOM_STORAGE_KEY) {
        if (e.newValue) {
          setActiveRoom(JSON.parse(e.newValue));
        } else {
          setActiveRoom(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync to localStorage when local state changes
  const updateRoomState = (newRoom: GameRoom | null) => {
    setActiveRoom(newRoom);
    if (newRoom) {
      localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(newRoom));
    } else {
      localStorage.removeItem(ROOM_STORAGE_KEY);
    }
  };

  const createRoom = (roomInfo: Omit<GameRoom, 'id' | 'status' | 'players'>) => {
    const newRoom: GameRoom = {
      ...roomInfo,
      id: generateRoomId(),
      status: 'waiting',
      players: []
    };
    updateRoomState(newRoom);
    return newRoom.id;
  };

  const joinRoom = (roomId: string, playerInfo: Omit<Player, 'id'>) => {
    // Check if the room exists globally
    const storedStr = localStorage.getItem(ROOM_STORAGE_KEY);
    if (!storedStr) return false;
    
    const storedRoom: GameRoom = JSON.parse(storedStr);
    if (storedRoom.id !== roomId) return false;

    // Avoid duplicates if same name joins
    const exists = storedRoom.players.find(p => p.name === playerInfo.name);
    if (!exists) {
      const newPlayer: Player = { ...playerInfo, id: generatePlayerId() };
      const newRoom = {
        ...storedRoom,
        players: [...storedRoom.players, newPlayer]
      };
      updateRoomState(newRoom);
    }
    return true;
  };

  const leaveRoom = (roomId: string, playerId: string) => {
    if (!activeRoom || activeRoom.id !== roomId) return;
    const newRoom = {
      ...activeRoom,
      players: activeRoom.players.filter(p => p.id !== playerId)
    };
    updateRoomState(newRoom);
  };

  const startGame = (roomId: string) => {
    if (!activeRoom || activeRoom.id !== roomId) return;
    const newRoom = { ...activeRoom, status: 'playing' as const };
    updateRoomState(newRoom);
  };

  return (
    <GameRoomContext.Provider value={{ activeRoom, createRoom, joinRoom, leaveRoom, startGame }}>
      {children}
    </GameRoomContext.Provider>
  );
};

export const useGameRoom = () => {
  const context = useContext(GameRoomContext);
  if (context === undefined) {
    throw new Error('useGameRoom must be used within a GameRoomProvider');
  }
  return context;
};
