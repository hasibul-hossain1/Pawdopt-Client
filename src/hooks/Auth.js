import { createContext, useContext } from "react"



export const AuthContext=createContext({loading:true,error:null,data:null})

export const useAuth=()=>{
    return useContext(AuthContext)
}