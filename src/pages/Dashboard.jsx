import React from 'react'
import SideNav from "../components/SideNav";

function DashboardPage() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <div>User's Products</div>
        <div>User's Registered Events</div>
        <div>User's Posts</div>
      </div>
    </div>
  )
}

export default DashboardPage


