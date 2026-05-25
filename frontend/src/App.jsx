import { useEffect } from "react";
import History from "./pages/History"
import {
  Routes,
  Route
} from "react-router-dom";

import socket from "./socket";

import Room from "./pages/Room";

import Dashboard from "./pages/Dashboard"

function App() {

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

  }, []);

  return (

    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />
      <Route
        path="/history"
        element={<History />}
      />
      <Route
        path="/room/:roomId"
        element={<Room />}
      />

    </Routes>

  );
}

export default App;