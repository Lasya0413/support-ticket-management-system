import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RoleRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return (
      <Navigate
        to={
          user.role === "agent"
            ? "/agent-dashboard"
            : "/customer-dashboard"
        }
        replace
      />
    );
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                user
                  ? user.role === "agent"
                    ? "/agent-dashboard"
                    : "/customer-dashboard"
                  : "/login"
              }
              replace
            />
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to={
                  user.role === "agent"
                    ? "/agent-dashboard"
                    : "/customer-dashboard"
                }
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/customer-dashboard"
          element={
            <RoleRoute role="customer">
              <CustomerDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/agent-dashboard"
          element={
            <RoleRoute role="agent">
              <AgentDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/create-ticket"
          element={
            <RoleRoute role="customer">
              <CreateTicket />
            </RoleRoute>
          }
        />

        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;