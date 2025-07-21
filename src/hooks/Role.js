import { createContext, useContext } from "react"



export const RoleContext=createContext(null)

export const useRole=()=>{
    const result = useContext(RoleContext)
    return result
}