import { useAuth } from "@/hooks/Auth";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

function PrivateRoute({ children }) {
  const currentUser = useAuth();
  const { pathname } = useLocation();

  if (!currentUser.data) {
    toast.error("You have to login first!")
    return <Navigate to="/login" state={pathname} />;
  }
  return children;
}

export default PrivateRoute;
