import { useAuth } from "@/hooks/Auth";
import { RoleContext } from "@/hooks/Role";
import { api } from "@/lib/api";
import { signOUtUser } from "../../firebase/firebasePanel";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/Shared/Loader";

function RoleProvider({ children }) {
  const [isBanned, setIsBanned] = useState(false);
  const [role, setRole] = useState("");
  const currentUser = useAuth();
  const [loading,setLoading]=useState(true)
  const email = currentUser.data?.email;

  useEffect(() => {
    setLoading(true)
    if (currentUser.data) {
      (async () => {
        const res = await api.get(`/role/${email}`);
        setRole(res.data.role);
        setIsBanned(res.data.isBanned);
        setLoading(false)
      })();
    } else {
      setRole("");
      setLoading(false)
    }
  }, [currentUser, email]);
  
  useEffect(() => {
    if (isBanned) {
      signOUtUser();
      toast.error("An admin Banned you.!");
    }
  }, [isBanned]);

  if (loading) {
    return <Loader/>
  }
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

export default RoleProvider;
