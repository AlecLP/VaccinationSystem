import React from "react"
import { useSelector } from "react-redux"
import ScheduledAppointments from "./ScheduledAppointments"

const Appointment = () => {

    const { user } = useSelector((state) => state.user);
    
    return(
        <div className="h-auto w-full py-10 bg-neutral-100 justify-center flex items-center rounded-4xl">
            {user && user.role === "USER" ?
            <>
                <ScheduledAppointments/>
            </>
            :
            <p>ACCESS DENIED: USER ONLY FEATURE</p>}
        </div>
    )

}

export default Appointment