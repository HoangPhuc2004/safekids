import { RouterProvider } from 'react-router';
import { router } from './appRouter';

export default function App() {
  return <RouterProvider router={router} />;
}
