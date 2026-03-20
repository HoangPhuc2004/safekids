import { useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError() as any;
  console.error("ErrorBoundary caught:", error);
  return (
    <div className="p-4 bg-red-50 text-red-600 h-screen">
      <h1 className="font-bold">An error occurred:</h1>
      <pre className="text-xs mt-2 whitespace-pre-wrap">{error?.message || error?.statusText || JSON.stringify(error)}</pre>
      <pre className="text-xs mt-2 whitespace-pre-wrap">{error?.stack}</pre>
    </div>
  );
}