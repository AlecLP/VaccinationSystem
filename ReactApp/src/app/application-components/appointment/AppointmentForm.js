import React, { useEffect, useState } from "react"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { scheduleAppointment, getAppointments } from "../../state/appointment/AppointmentSlice"
import { getVaccines } from "../../state/vaccine/VaccineSlice"
import { getHospitals } from "../../state/hospital/HospitalSlice"
import { getUsers } from "../../state/user/UserSlice"

const AppointmentForm = () => {
    const dispatch = useDispatch()
    const { hospitals } = useSelector((state) => state.hospitals)
    const { user, users } = useSelector((state) => state.user)
    const { vaccines } = useSelector((state) => state.vaccines) 
    const { scheuleLoading, scheduleError, scheduleMessage } = useSelector((state) => state.appointments)

    const [selectedPatient, setSelectedPatient] = useState(null)
    const [selectedHospital, setSelectedHospital] = useState(null)
    const [selectedVaccine, setSelectedVaccine] = useState(null)
    const [appointmentDate, setAppointmentDate] = useState("")

    useEffect(() => {
        if (!hospitals) dispatch(getHospitals())
        if (!users) dispatch(getUsers())
        if (!vaccines) dispatch(getVaccines())
    }, [dispatch, hospitals, users, vaccines])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedPatient || !selectedHospital || !selectedVaccine || !appointmentDate) return;

        const appointment = {
            approver: user,
            patient: selectedPatient,
            hospital: selectedHospital,
            vaccine: selectedVaccine,
            appointmentDate: new Date(appointmentDate),
            charge: selectedHospital.charges,
            isPaid: false
        }

        dispatch(scheduleAppointment(appointment))
        dispatch(getAppointments())
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <h3 className="text-lg font-semibold text-gray-700">Schedule an Appointment</h3>

            <div>
                <label className="block text-sm mb-1">Patient</label>
                <Select
                    options={users?.map(user => ({
                        value: user,
                        label: `${user.firstName} ${user.lastName}`
                    }))}
                    onChange={opt => setSelectedPatient(opt.value)}
                    placeholder="Search for a patient..."
                    isClearable
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Hospital</label>
                <Select
                    options={hospitals?.map(h => ({
                        value: h,
                        label: `${h.name} - ${h.address}`
                    }))}
                    onChange={opt => setSelectedHospital(opt.value)}
                    placeholder="Search for a hospital..."
                    isClearable
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Vaccine</label>
                <Select
                    options={vaccines?.map(v => ({
                        value: v,
                        label: `${v.name} (${v.dosesRequired} doses)`
                    }))}
                    onChange={opt => setSelectedVaccine(opt.value)}
                    placeholder="Search for a vaccine..."
                    isClearable
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Appointment Date</label>
                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                />
            </div>

            <div className="md:col-span-2 mt-2 flex justify-start">
                <button
                type="submit"
                className="px-4 py-2 border border-gray-500 rounded-md text-gray-700 ring-1 ring-neutral-500/0 ring-offset-0
                    hover:ring-blue-500 hover:border-blue-500 transition duration-200 cursor-pointer"
                >
                Schedule
                </button>
            </div>

            <div className="text-center mt-2">
                {scheuleLoading && <p className="text-gray-500">Scheduling...</p>}
                {scheduleMessage && <p className="text-green-600">{scheduleMessage}</p>}
                {scheduleError && <p className="text-red-600">{scheduleError}</p>}
            </div>
        </form>
    )
}

export default AppointmentForm