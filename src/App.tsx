import React, { Suspense, lazy } from "react";
import { useAuth } from "context/authContext";
import ErrorBoundary from "components/ErrorBoundary";
import { FullPageError, FullPageLoading } from "components/FullPage";
import "./App.css";

const Dashboard = lazy(() => import("pages/dashboard"));
const User = lazy(() => import("pages/user"));

export default function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fullbackRender={FullPageError}>
        <Suspense fallback={<FullPageLoading />}>
          {user ? <Dashboard /> : <User />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
