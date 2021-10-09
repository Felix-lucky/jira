import React from "react";
import User from "pages/user";
import Dashboard from "pages/dashboard";
import { useAuth } from "context/authContext";
import ErrorBoundary from "components/ErrorBoundary";
import { FullPageError } from "components/FullPage";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fullbackRender={FullPageError}>
        {user ? <Dashboard /> : <User />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
