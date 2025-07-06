import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerVaccine, getVaccines } from "../../state/vaccine/VaccineSlice"

const VaccineForm = () => {

    const dispatch = useDispatch()
    const { registerLoading, registerError, registerMessage } = useSelector((state) => state.vaccines)
    const formRef = useRef(null)
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = formRef.current
        const formData = new FormData(form)

        const vaccineData = Object.fromEntries(formData.entries())

        try {
            const result = await dispatch(registerVaccine(vaccineData)).unwrap()
            dispatch(getVaccines())
            console.log("Vaccine Registration success: ", result.message)
        } catch (err) {
            console.log("Vaccine Registration failed: ", err.message)
        }
    }

    return(
        <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-md">
            <div className="bg-red-700 text-white text-center py-4">
                <h2 className="text-2xl font-semibold">Vaccine Registration Form</h2>
            </div>

            <div className="bg-white px-8 py-4 pb-8">
                <div className="text-center mb-4">
                    {registerLoading && <p className="text-gray-500">Loading...</p>}
                    {registerMessage && <p className="text-green-600">{registerMessage}</p>}
                    {registerError && <p className="text-red-600">{registerError}</p>}
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="relative block w-full mb-4">
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
                    <label className="relative block w-full mb-4">
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
                    <label className="relative block w-full mb-4">
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                        />
                        <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                            Price
                        </span>
                    </label>
                    <label className="relative block w-full mb-4">
                        <input
                            name="sideEffect"
                            maxLength={50}
                            required
                            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                        />
                        <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                            Side Effect(s)
                        </span>
                    </label>
                    <label className="relative block w-full mb-4">
                        <input
                            name="origin"
                            maxLength={50}
                            required
                            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                        />
                        <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                            Origin
                        </span>
                    </label>
                    <label className="relative block w-full mb-4">
                        <input
                            name="dosesRequired"
                            type="number"
                            min="0"
                            required
                            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                        />
                        <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                            Doses Required
                        </span>
                    </label>
                    <label className="relative block w-full mb-4">
                        <input
                            name="otherInfo"
                            maxLength={50}
                            required
                            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 w-full peer"
                        />
                        <span className="absolute left-4 top-0 -translate-y-1/2 scale-100 bg-white px-0.5 text-xs font-medium transition-transform peer-focus:scale-0">
                            Other Information
                        </span>
                    </label>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-gray-500 rounded-md text-gray-700 ring-1 ring-neutral-500/0 ring-offest-0
                                hover:ring-blue-500 hover:border-blue-500 transition duration-200 cursor-pointer"
                    >
                        Register Vaccine
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VaccineForm