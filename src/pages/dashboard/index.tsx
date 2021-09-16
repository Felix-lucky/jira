import React from "react";
import { useAuth } from "context/authCintext";
import { Button } from "antd";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <div>
      <Button type="primary" onClick={logout}>
        登出
      </Button>
      <div>Dashboard</div>
    </div>
  );
}
