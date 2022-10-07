import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { socket, SocketContext } from "./context/socket";

import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/chat" element={<Chat />} />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
