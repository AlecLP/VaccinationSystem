import React, { useMemo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAppointmentsByPatient } from "../../state/appointment/AppointmentSlice"

const PreviousAppointments = () => {

    const dispatch = useDispatch()
    const { appointments, getLoading, getError, getMessage } = useSelector((state) => state.appointments)
    const { user } = useSelector((state) => state.user)
    const patient = user._id

    const filteredAppointments = useMemo(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
    
        return appointments?.filter(appointment => {
            const date = new Date(appointment.appointmentDate)
            date.setHours(0, 0, 0, 0)
            return date < today
        })
    }, [appointments])

    useEffect(() => {
        if(appointments === null){ 
            dispatch(getAppointmentsByPatient(patient))
            console.log("Appointments: ", appointments)
        }
    }, [appointments, dispatch])

    return(
        <div>
            <h2 className="text-2xl font-semibold">Previous Appointments</h2>
            <div className="text-center mb-4">
                {getLoading && <p className="text-gray-500">Loading...</p>}
                {getMessage && <p className="text-green-600">{getMessage}</p>}
                {getError && <p className="text-red-600">{getError}</p>}
            </div>

            {filteredAppointments && filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                        <th className="px-4 py-3">Approver</th>
                        <th className="px-4 py-3">Patient</th>
                        <th className="px-4 py-3">Hospital</th>
                        <th className="px-4 py-3">Vaccine</th>
                        <th className="px-4 py-3">Doses</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Charges ($)</th>
                        <th className="px-4 py-3">Vaccinated?</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredAppointments.map((appointment, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3">{appointment.approver}</td>
                            <td className="px-4 py-3">{appointment.patient}</td>
                            <td className="px-4 py-3">{appointment.hospital}</td>
                            <td className="px-4 py-3">{appointment.vaccine}</td>
                            <td className="px-4 py-3">{appointment.doses}</td>
                            <td className="px-4 py-3">{appointment.appointmentDate}</td>
                            <td className="px-4 py-3">${appointment.charge.toFixed(2)}</td>
                            <td className="px-4 py-3">{appointment.isPaid ? "Successful" : "Unsuccessful"}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            ) : (
            !getLoading && (
                <p className="text-center text-gray-500 mt-4">No appointments available.</p>
            )
            )}
        </div>
    )

}

export default PreviousAppointments