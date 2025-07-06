import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVaccines } from "../../state/vaccine/VaccineSlice"

const VaccineList = () => {

    const dispatch = useDispatch()
    const { vaccines, getLoading, getError, getMessage } = useSelector((state) => state.vaccines)

    useEffect(() => {
        if (vaccines === null) {
          dispatch(getVaccines());
        }
    }, [vaccines, dispatch]);

    return (
        <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-md">
            <div className="bg-red-700 text-white text-center py-4">
                <h2 className="text-2xl font-semibold">Vaccine List</h2>
            </div>

            <div className="bg-white px-8 py-4 pb-8">
                <div className="text-center mb-4">
                    {getLoading && <p className="text-gray-500">Loading...</p>}
                    {getError && <p className="text-green-600">{getError}</p>}
                    {getMessage && <p className="text-red-600">{getMessage}</p>}
                </div>
                <div className="max-h-[556px] overflow-y-auto px-4 py-4 pb-8 bg-white rounded-b-3xl">
                    {vaccines && vaccines.length > 0 ? (
                        vaccines.map((vaccine, idx) => (
                            <div
                                key={idx}
                                className="mb-6 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-red-700">{vaccine.name}</h3>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
                                    <div><span className="font-semibold">Type:</span> {vaccine.type}</div>
                                    <div><span className="font-semibold">Price:</span> ${vaccine.price.toFixed(2)}</div>
                                    <div><span className="font-semibold">Side Effect:</span> {vaccine.sideEffect}</div>
                                    <div><span className="font-semibold">Origin:</span> {vaccine.origin}</div>
                                    <div><span className="font-semibold">Doses Required:</span> {vaccine.dosesRequired}</div>
                                    <div className="col-span-2"><span className="font-semibold">Other Info:</span> {vaccine.otherInfo}</div>
                                </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-center text-gray-500">No Vaccines Exist</p>
                    )}
                </div>
            </div>
        </div>
    )

}

export default VaccineList