import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerHospital, getHospitals } from "../../state/hospital/HospitalSlice"

const HospitalForm = () => {

    const dispatch = useDispatch()
    const { registerLoading, registerError, registerMessage } = useSelector((state) => state.hospitals)
    const formRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = formRef.current
        const formData = new FormData(form)

        const hospitalData = Object.fromEntries(formData.entries())

        try {
            const result = await dispatch(registerHospital(hospitalData)).unwrap()
            dispatch(getHospitals())
            console.log("Hospital Registration success: ", result.message)
        } catch (err) {
            console.log("Hospital Registration failed: ", err.message)
        }
    }

    return(
        <>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Register a New Hospital</h3>
            <div className="text-center mb-4">
                {registerLoading && <p className="text-gray-500">Loading...</p>}
                {registerMessage && <p className="text-green-600">{registerMessage}</p>}
                {registerError && <p className="text-red-600">{registerError}</p>}
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="relative block w-full mb-2">
                    <input
                    name="name"
                    maxLength={50}
                    required
                    className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                    />
                    <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                    Name
                    </span>
                </label>

                <label className="relative block w-full mb-2">
                    <input
                    name="address"
                    maxLength={100}
                    required
                    className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                    />
                    <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                    Address
                    </span>
                </label>

                <label className="relative block w-full mb-2">
                    <input
                    name="type"
                    maxLength={50}
                    required
                    className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                    />
                    <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                    Type
                    </span>
                </label>

                <label className="relative block w-full mb-2">
                    <input
                    name="charges"
                    type="number"
                    step="0.01"
                    required
                    className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                    />
                    <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                    Charges ($)
                    </span>
                </label>

                <div className="md:col-span-2 mt-2 flex justify-start">
                    <button
                    type="submit"
                    className="px-4 py-2 border border-gray-500 rounded-md text-gray-700 ring-1 ring-neutral-500/0 ring-offset-0
                        hover:ring-blue-500 hover:border-blue-500 transition duration-200 cursor-pointer"
                    >
                    Register Hospital
                    </button>
                </div>
            </form>
        </>
    )
}

export default HospitalForm