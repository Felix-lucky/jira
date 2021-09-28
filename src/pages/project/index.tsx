import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import Epic from "pages/epic";
import KanBan from "pages/kanban";

export default function Project() {
  return (
    <div>
      <div>Project</div>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="/kanban" element={<KanBan />} />
        <Route path="/epic" element={<Epic />} />
        <Navigate to="kanban" />
      </Routes>
    </div>
  );
}
