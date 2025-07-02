import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../state/user/UserSlice"
import { NavLink, useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, message } = useSelector((state) => state.user);
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = formRef.current
    const formData = new FormData(form)

    const loginData = Object.fromEntries(formData.entries())

    try {
      const result = await dispatch(loginUser(loginData)).unwrap();
      console.log("Login success: ", result.message)
      navigate("/home");
    } catch (err) {
      console.log("Login failed: ", err.message)
    }
  }

  return (
    <div>
        <h2>Login</h2>
        {loading && <p>Loading...</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form ref={formRef} onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" maxLength={20} required className="form-control" />
        <input name="password" type="password" placeholder="Password" required className="form-control" />
        
        <button type="submit" className="btn btn-primary">Login</button>
        <NavLink to="/register">Don't have an account? Register here!</NavLink>
        </form>   
    </div>
  )
}

export default Login