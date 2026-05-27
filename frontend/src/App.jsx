import { useEffect } from "react";
import History from "./pages/History"
import { Routes, Route } from "react-router-dom";

import socket from "./socket";

import Room from "./pages/Room";

import Dashboard from "./pages/Dashboard"

import Login from "./pages/Login";
import Register from "./pages/Register";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  useEffect(() => {

    const handleConnect = () => {
      console.log("Connected:", socket.id);
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };

  }, []);

  return (

    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/room/:roomId"
        element={
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}

export default App;