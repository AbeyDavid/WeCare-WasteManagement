import React from 'react'
import ClientsView from '../../compnents/adminComponents/ClientsView'
import AdminSidebar from '../../layouts/AdminSidebar'

export default function AdminClientView() {
  return (
    <div>
        <AdminSidebar/>
        <ClientsView/>
    </div>
  )
}
