import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../compnents/adminComponents/AdminLogin'
import AdminHome from '../pages/adminPages/AdminHome'

function AdminValid(){
  const adminId = useSelector((state)=>state.admin.adminId)
  return adminId ? <AdminHome/> : <AdminLogin/>
}

export default function AdminRoute() {
  return (
    <div>
      <Routes>
            <Route exact path="/admin" element={<AdminValid/>} />
        </Routes>
    </div>
  )
}
