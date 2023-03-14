import React from 'react'
import { useSelector } from 'react-redux'
import DriverSidebar from '../../compnents/driverComponents/DriverSidebar'

export default function DriverHome() {
  const driver = useSelector((state)=>state.driver.driverData)
  return (
    <div>
        <DriverSidebar/>
       <h3>Home</h3>
       <h4 className='mt-3'>{driver.name}</h4>
    </div>
  )
}
