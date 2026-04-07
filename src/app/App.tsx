import { RouterProvider } from 'react-router';
import { router } from './appRouter';
import { GameRoomProvider } from './context/GameRoomContext';
import { AuthProvider } from './context/AuthContext';
import { GroupProvider } from './context/GroupContext';

export default function App() {
  return (
    <AuthProvider>
      <GroupProvider>
        <GameRoomProvider>
          <RouterProvider router={router} />
        </GameRoomProvider>
      </GroupProvider>
    </AuthProvider>
  );
}
