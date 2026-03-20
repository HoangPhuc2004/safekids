import { createBrowserRouter } from "react-router";
import LandingView from "./views/LandingView";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";
import TeacherHome from "./views/teacher/TeacherHome";
import StudentHome from "./views/student/StudentHome";
import CourseView from "./views/shared/CourseView";
import GameStats from "./views/teacher/GameStats";
import GroupsView from "./views/shared/GroupsView";
import GroupChat from "./views/shared/GroupChat";
import ReportView from "./views/student/ReportView";
import CreateGameView from "./views/teacher/CreateGameView";
import TeacherGameLobby from "./views/teacher/TeacherGameLobby";
import ProfileView from "./views/shared/ProfileView";
import StoryGameView from "./views/student/StoryGameView";
import GameLobbyView from "./views/student/GameLobbyView";
import LearningPathView from "./views/student/LearningPathView";
import ErrorBoundary from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingView,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/login",
    Component: LandingView,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/teacher",
    Component: TeacherLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, Component: TeacherHome },
      { path: "course/:id", Component: CourseView },
      { path: "game-stats/:id", Component: GameStats },
      { path: "groups", Component: GroupsView },
      { path: "groups/:id", Component: GroupChat },
      { path: "create-game", Component: CreateGameView },
      { path: "game-lobby", Component: TeacherGameLobby },
      { path: "profile", Component: ProfileView },
    ],
  },
  {
    path: "/student",
    Component: StudentLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, Component: StudentHome },
      { path: "course/:id", Component: CourseView },
      { path: "groups", Component: GroupsView },
      { path: "groups/:id", Component: GroupChat },
      { path: "report", Component: ReportView },
      { path: "profile", Component: ProfileView },
      { path: "story-game", Component: StoryGameView },
      { path: "game-lobby", Component: GameLobbyView },
      { path: "learning-path", Component: LearningPathView },
    ],
  },
  {
    path: "*",
    Component: LandingView,
  },
]);