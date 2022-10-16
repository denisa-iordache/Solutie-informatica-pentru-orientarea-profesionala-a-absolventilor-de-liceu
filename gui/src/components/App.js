import React from "react";
import { AuthenticationProvider } from "../context/AuthenticationContext";
import SignUp from "./SignUp";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdatePofile from "./UpdatePofile";
import "react-toastify/dist/ReactToastify.css";
import Quiz from "./Quiz";
import LoginPage from "./LoginPage";
import Chats from "./chat/Chats";
import About from "./About";
import AdminPage from "./AdminPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthenticationProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdatePofile />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/adminPage" element={<AdminPage />} />
          </Routes>
        </AuthenticationProvider>
      </Router>
    </div>
  );
}

export default App;
