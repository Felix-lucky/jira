import React from "react";
import User from "pages/user";
import Dashboard from "pages/dashboard";
import { useAuth } from "context/authCintext";
import "./App.css";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <Dashboard /> : <User />}</div>;
}

export default App;
