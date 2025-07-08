import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHospitals } from "../../state/hospital/HospitalSlice"
import HospitalForm from "./HospitalForm"

const HospitalTable = () => {

    const dispatch = useDispatch()
    const { hospitals, getLoading, getError, getMessage } = useSelector((state) => state.hospitals)
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(prev => !prev);
    };

    useEffect(() => {
        if(hospitals === null){
            dispatch(getHospitals())
            console.log("Hospitals: ", hospitals)
        }
    }, [hospitals, dispatch])

    return(
        <div className="w-full rounded-3xl overflow-hidden shadow-md mx-7">
            <div className="bg-red-700 text-white text-center py-4">
                <h2 className="text-2xl font-semibold">Hospitals</h2>
            </div>

            <div className="bg-white px-8 py-4 pb-8">
                <div className="text-center mb-4">
                    {getLoading && <p className="text-gray-500">Loading...</p>}
                    {getError && <p className="text-green-600">{getError}</p>}
                    {getMessage && <p className="text-red-600">{getMessage}</p>}
                </div>

                <div className="flex justify-start mb-4">
                    <button
                        onClick={toggleForm}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                    >
                        {showForm ? "Cancel" : "Register Hospital"}
                    </button>
                </div>

                {showForm && (
                <div className="mb-6 border border-gray-300 rounded-xl p-4 bg-gray-50">
                    {/* You can move this to its own <RegisterHospitalForm /> component */}
                    <HospitalForm/>
                </div>
                )}

                {hospitals && hospitals.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Charges ($)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {hospitals.map((hospital, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{hospital.name}</td>
                                <td className="px-4 py-3">{hospital.address}</td>
                                <td className="px-4 py-3">{hospital.type}</td>
                                <td className="px-4 py-3">${hospital.charges.toFixed(2)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                !getLoading && (
                    <p className="text-center text-gray-500 mt-4">No hospitals available.</p>
                )
                )}
            </div>
        </div>
    )

}

export default HospitalTable