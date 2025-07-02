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

    return(
        <>
            <h1>Header</h1>
            <NavLink to="/home" className="btn btn-primary">Home</NavLink> 
            {!user ? 
                <NavLink to="/login" className="btn btn-primary">Login</NavLink> 
                :
                <button className="btn btn-primary" onClick={()=>handleLogout()}>Logout</button>
            }
        </>
    )
}

export default Header