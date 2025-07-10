import React from "react"
import { useSelector } from "react-redux"
import AppointmentTable from "./AppointmentTable";

const Appointment = () => {

    const { user } = useSelector((state) => state.user);
    
    return(
        <div className="h-auto w-full py-10 bg-neutral-100 justify-center flex items-center rounded-4xl">
            {user && user.role === "ADMIN" ?
            <>
                <AppointmentTable/>
            </>
            :
            <p>ACCESS DENIED: NOT AN ADMIN</p>}
        </div>
    )

}

export default Appointment