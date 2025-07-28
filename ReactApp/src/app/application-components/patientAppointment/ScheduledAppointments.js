import React, { useMemo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { getAppointmentsByPatient, makeAppointmentPayment } from "../../state/appointment/AppointmentSlice"
import PreviousAppointments from "./PreviousAppointments"

const AppointmentTable = () => {

    const dispatch = useDispatch()
    const { appointments, getLoading, getError, getMessage } = useSelector((state) => state.appointments)
    const { user } = useSelector((state) => state.user)
    const patient = user._id
    const [showForm, setShowForm] = useState(false)

    const filteredAppointments = useMemo(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
    
        return appointments?.filter(appointment => {
            const date = new Date(appointment.appointmentDate)
            date.setHours(0, 0, 0, 0)
            return date >= today;
        })
    }, [appointments])

    const toggleForm = () => {
        setShowForm(prev => !prev);
    }

    const makePayment = async (appointment) => {
        console.log("Sending appointmentId:", appointment._id);
        try {
            const result = await dispatch(makeAppointmentPayment({ appointmentId: appointment._id })).unwrap();
            dispatch(getAppointmentsByPatient(patient))
        } catch (err) {
            console.error("Unexpected error during payment:", err);
        }
    };

    function downloadPDF(appointmentId){
        axios.get(`http://localhost:9000/appointment/download/${appointmentId}`, {
            responseType: 'blob'
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Appointment_${appointmentId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch((err) => {
            console.error('Download failed', err);
            alert("PDF download failed: ", err)
        });
    }

    useEffect(() => {
        if(appointments === null){ 
            dispatch(getAppointmentsByPatient(patient))
            console.log("Appointments: ", appointments)
        }
    }, [appointments, dispatch])

    return(
        <div className="w-full rounded-3xl overflow-hidden shadow-md mx-7">
            <div className="bg-red-700 text-white text-center py-4">
                <h2 className="text-2xl font-semibold">Scheduled Appointments</h2>
            </div>

            <div className="bg-white px-8 py-4 pb-8">
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
                            <th className="px-4 py-3">Paid</th>
                            <th className="px-4 py-3">Action</th>
                            <th className="px-4 py-3">Certificate</th>
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
                                <td className="px-4 py-3">{appointment.isPaid ? "Yes" : "No"}</td>
                                <td>
                                    {!appointment.isPaid ? 
                                        <button
                                            onClick={() => makePayment(appointment)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                                        >
                                            Make Payment
                                        </button>
                                        :
                                        <></>
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    {appointment.isPaid ? 
                                        <button
                                            onClick={() => downloadPDF(appointment._id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                                        >
                                            Download
                                        </button>
                                        :
                                        <>
                                            <p>N/A</p>
                                        </>
                                    }
                                </td>
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

                <div className="flex justify-start mb-4 pt-4">
                    <button
                        onClick={toggleForm}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                    >
                        {showForm ? "Close" : "View Previous Appointments"}
                    </button>
                </div>

                {showForm && (
                <div className="mb-6 border border-gray-300 rounded-xl p-4 bg-gray-50">
                    <PreviousAppointments/>
                </div>
                )}
            </div>
        </div>
    )

}

export default AppointmentTable