import React, { useState } from 'react'
import DriverView from '../../compnents/adminComponents/DriverView'
import NewDrivers from '../../compnents/adminComponents/NewDrivers'
import AdminSidebar from '../../layouts/AdminSidebar'

export default function AdminDriverManagement() {
    const [isActive,setIsActive] = useState(true)
  return (
    <div>
        <AdminSidebar/>
        {isActive && <button  className="btn btn-outline-light p-2 ms-3 mt-3 mb-3" onClick={()=>setIsActive(false)} >New Requests</button>}
        {!isActive && <button  className="btn btn-outline-light p-2 ms-3 mt-3 mb-3" onClick={()=>setIsActive(true)} >Driver Management</button>}
        {isActive && <DriverView/>}
        {!isActive && <NewDrivers/>}
    </div>
  )
}
