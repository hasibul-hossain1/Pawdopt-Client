import { AuthContext } from '@/hooks/Auth'
import React, { useEffect, useState } from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../../firebase/firebase.init'



function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState({loading:true,error:null,data:null})

     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        console.log(user);
     });

    return () => unsubscribe();
  }, []);
    
  return (
    <AuthContext.Provider>{children}</AuthContext.Provider>
  )
}

export default AuthProvider