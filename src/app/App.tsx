import { RouterProvider } from 'react-router';
import { router } from './appRouter';
import { GameRoomProvider } from './context/GameRoomContext';

export default function App() {
  return (
    <GameRoomProvider>
      <RouterProvider router={router} />
    </GameRoomProvider>
  );
}
