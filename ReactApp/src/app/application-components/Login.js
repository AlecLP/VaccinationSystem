import React, { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, clearMessages } from "../state/user/UserSlice"
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
      console.log("Login success")
      navigate("/home");
    } catch (err) {
      console.log("Login failed: ", err.message)
    }
  }

  useEffect(() => {
    if (location.pathname === "/login") {
      dispatch(clearMessages());
    }
  }, [location.pathname]);
  

  return (
    <div className="h-screen w-full bg-neutral-100 flex justify-center items-center rounded-4xl">
      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-md">

        <div className="bg-red-700 text-white text-center py-4">
          <h2 className="text-2xl font-semibold">Welcome Back!</h2>
        </div>

        <div className="bg-white px-8 py-4">
          <div className="text-center mb-4">
            {loading && <p className="text-gray-500">Loading...</p>}
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="username"
              placeholder="Username"
              maxLength={20}
              required
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-gray-500 rounded-md text-gray-700 ring-1 ring-neutral-500/0 ring-offest-0
                     hover:ring-blue-500 hover:border-blue-500 transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-600 hover:underline">
              Register here!
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login