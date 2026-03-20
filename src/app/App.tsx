import { RouterProvider } from 'react-router';
import { router } from './appRouter';
import { GameRoomProvider } from './context/GameRoomContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <GameRoomProvider>
        <RouterProvider router={router} />
      </GameRoomProvider>
    </AuthProvider>
  );
}
