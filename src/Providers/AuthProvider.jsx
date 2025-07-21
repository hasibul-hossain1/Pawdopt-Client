import { AuthContext } from '@/hooks/Auth'
import React, { useEffect, useState } from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../../firebase/firebase.init'



function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState({loading:true,error:null,data:null})

     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        if(user){
            setCurrentUser({loading:false,error:null,data:auth.currentUser})
        }
        else{
            setCurrentUser({loading:false,error:null,data:null})
        }
     });

    return () => unsubscribe();
  }, []);

    
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider