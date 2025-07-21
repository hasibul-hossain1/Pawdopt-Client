import { useAuth } from "@/hooks/Auth";
import { RoleContext } from "@/hooks/Role";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

function RoleProvider({ children }) {
  const [role, setRole] = useState("");
  const currentUser = useAuth();
  const email = currentUser.data?.email;

  useEffect(() => {
    if (currentUser.data) {
      (async () => {
        const res = await api.get(`/role/${email}`);
        setRole(res.data);
        console.log(res.data);
      })();
    } else {
      setRole("");
    }
  }, [currentUser, email]);

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

export default RoleProvider;
