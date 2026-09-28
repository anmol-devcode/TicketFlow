import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
