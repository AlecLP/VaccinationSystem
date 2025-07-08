import React from "react"
import { useSelector } from "react-redux"
import HospitalTable from "./HospitalTable";

const Hospital = () => {

    const { user } = useSelector((state) => state.user);
    
    return(
        <div className="h-auto w-full py-10 bg-neutral-100 justify-center flex items-center rounded-4xl">
            {user && user.role === "ADMIN" ?
            <>
                <HospitalTable/>
            </>
            :
            <p>ACCESS DENIED: NOT AN ADMIN</p>}
        </div>
    )

}

export default Hospital