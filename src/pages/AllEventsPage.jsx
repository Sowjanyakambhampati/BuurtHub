import React from 'react';
import { Link, useParams } from "react-router-dom";
import SideNav from "../components/SideNav";

function AllEventsPage() {
  const { city } = useParams();
  return (
    <div  className="flex">
    <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">

      <h1> Upcoming Events in {city} </h1>

      </div>
       
    </div>
  )
}

export default AllEventsPage

//add the "add/delete event button only for admin"