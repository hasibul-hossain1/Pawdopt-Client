import { useAuth } from '@/hooks/Auth'
import { useRole } from '@/hooks/Role'
import React from 'react'
import { Navigate } from 'react-router'
import { toast } from 'sonner'

function AdminRoute({children}) {
    const currentUser=useAuth()
    const role=useRole()
    if (!currentUser.data || role!=="admin") {
        toast.error("You are not admin")
        return <Navigate to="/"/>
    }
  return children
}

export default AdminRoute