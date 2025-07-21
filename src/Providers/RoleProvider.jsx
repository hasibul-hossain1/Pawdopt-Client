import { useAuth } from "@/hooks/Auth";
import { RoleContext } from "@/hooks/Role";
import { api } from "@/lib/api";
import { signOUtUser } from "../../firebase/firebasePanel";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function RoleProvider({ children }) {
  const [isBanned, setIsBanned] = useState(false);
  const [role, setRole] = useState("");
  const currentUser = useAuth();
  const email = currentUser.data?.email;

  useEffect(() => {
    if (currentUser.data) {
      (async () => {
        const res = await api.get(`/role/${email}`);
        setRole(res.data.role);
        setIsBanned(res.data.isBanned);
      })();
    } else {
      setRole("");
    }
  }, [currentUser, email]);
  
  useEffect(() => {
    if (isBanned) {
      signOUtUser();
      toast.error("An admin Banned you.!");
    }
  }, [isBanned]);


  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

export default RoleProvider;
