import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../state/user/UserSlice"

let Header = (props) => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        dispatch(logout())
        navigate("/login")
    }
    const handleLogin = (e) => {
        navigate("/login")
    }

    return(
        <div className="relative h-20 w-full flex items-center justify-between px-15">
            <div className="flex font-semibold text-3xl">
                <p className="text-red-700">Immuno</p>
                <p>Suite</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-lg">
                <NavLink to="/home">Home</NavLink>
                {user && user.role === "ADMIN" ? 
                <>
                    <NavLink to="/vaccines">Vaccines</NavLink> 
                    <NavLink to="/hospital">Hospital</NavLink>
                    <NavLink to="/scheduleAppointments">Appointments</NavLink>
                </>
                : 
                <></>}
                {user && user.role === "USER" ?
                <>
                    <NavLink to="/patientAppointments">Appointments</NavLink>
                </>
                :
                <></>}
            </div>
            <div className="text-lg">
                {!user ? 
                    <button className="px-4 py-1 border border-gray-500 text-gray-700 rounded-xl ring-1 ring-neutral-500/0 ring-offest-0
                     hover:ring-blue-500 hover:border-blue-500 transition duration-200 cursor-pointer" onClick={()=>handleLogin()}>
                        Login</button>
                    :
                    <button className="px-4 py-1 border border-gray-500 text-gray-700 rounded-xl ring-1 ring-neutral-500/0 ring-offest-0
                     hover:ring-red-500 hover:border-red-500 transition duration-200 cursor-pointer" onClick={()=>handleLogout()}>
                        Logout</button>
                }
            </div>
        </div>
    )
}

export default Header