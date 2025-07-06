import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../state/user/UserSlice"

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, message } = useSelector((state) => state.user);
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = formRef.current
    const formData = new FormData(form)

    const userData = Object.fromEntries(formData.entries())
    userData.role = "USER"

    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      console.log("Registration success: ", result.message)
      navigate("/login");
    } catch (err) {
      console.log("Registration failed: ", err.message)
    }
  }

  return (
    <div className="h-auto w-full py-10 bg-neutral-100 flex justify-center items-center rounded-4xl">
      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-md">

        <div className="bg-red-700 text-white text-center py-4">
          <h2 className="text-2xl font-semibold">Registration Form</h2>
        </div>

        <div className="bg-white px-8 py-4 pb-8">
          <div className="text-center mb-4">
            {loading && <p className="text-gray-500">Loading...</p>}
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="relative block w-full mb-4">
              <input
                name="username"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Username
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="password"
                type="password"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Password
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="firstName"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                First Name
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="lastName"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Last Name
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="dateOfBirth"
                type="date"
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-2 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Date of Birth
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="age"
                type="number"
                min="1"
                max="150"
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Age
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="profession"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Profession
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="contactPhoneNumber"
                type="number"
                maxLength={10}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer
                           appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Phone Number
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="address"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Address
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="gender"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Gender
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="diseaseInfo"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Disease Information
              </span>
            </label>
            <label className="relative block w-full mb-4">
              <input
                name="medicalCertificate"
                maxLength={50}
                required
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
              />
              <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                Medical Certificate
              </span>
            </label>
            
            <button
              type="submit"
              className="px-4 py-2 border border-gray-500 rounded-md text-gray-700 ring-1 ring-neutral-500/0 ring-offest-0
                     hover:ring-blue-500 hover:border-blue-500 transition duration-200 cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register