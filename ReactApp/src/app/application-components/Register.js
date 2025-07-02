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
    <div>
        <h2>Registration Form</h2>
        {loading && <p>Loading...</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form ref={formRef} onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" maxLength={20} required className="form-control" />
        <input name="password" type="password" placeholder="Password" required className="form-control" />
        <input name="firstName" placeholder="First Name" required className="form-control" />
        <input name="lastName" placeholder="Last Name" required className="form-control" />
        <input name="dateOfBirth" type="date" required className="form-control" />
        <input name="age" type="number" required className="form-control" />
        <input name="profession" placeholder="Profession" required className="form-control" />
        <input name="contactPhoneNumber" placeholder="Phone Number" required className="form-control" />
        <input name="address" placeholder="Address" required className="form-control" />
        <input name="gender" placeholder="Gender" required className="form-control" />
        <input name="diseaseInfo" placeholder="Disease Info" required className="form-control" />
        <input name="medicalCertificate" placeholder="Medical Certificate" required className="form-control" />
        
        <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Register