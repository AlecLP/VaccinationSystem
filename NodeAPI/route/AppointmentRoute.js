let expressObj = require("express")
let appointmentRouter = expressObj.Router({})

let AppointmentModel = require("../data-model/AppointmentDataModel")

appointmentRouter.post("/api/scheduleAppointment", (req, res) => {
    let appointmentData = req.body
    console.log("Scheduling Appointment: ", appointmentData)

    let appointmentDataObj = new AppointmentModel(appointmentData)
    appointmentDataObj.save()
    .then((newAppointment) => {
        console.log("Sucessfully scheduled appointment: ", newAppointment)
        return res.status(201).send({message: "Sucessfully scheduled appointment."})
    }).catch((err) => {
        console.log("ERROR: Error scheduling appointment: ", err)
        return res.status(500).send({message: "Error scheduling appointment."})
    })
})

appointmentRouter.get("/api/getAppointments", (req, res) => {
    console.log("Getting appointments...")
    AppointmentModel.find()
    .then((appointments)=>{
        console.log("Found appointments: ", appointments)
        let appointmentsResponse = []
        for(const appointment of appointments){
            let appResp = {
                approver: appointment.approver.firstName +" " +appointment.approver.lastName,
                patient: appointment.patient.firstName +" " +appointment.patient.lastName,
                hospital: appointment.hospital.name +", at: " +appointment.hospital.address,
                vaccine: appointment.vaccine.name,
                doses: appointment.vaccine.dosesRequired,
                appointmentDate: appointment.appointmentDate,
                charge: appointment.charge,
                isPaid: appointment.isPaid
            }
            appointmentsResponse.push(appResp)
        }
        res.status(200).send(appointmentsResponse)
    })
    .catch((err)=>{
        console.log("Error while fetching appointments: ", err)
        res.status(500).send("Error while fetching appointments")
    })
})

appointmentRouter.get("/api/getAppointmentsByPatient", (req, res) => {
    const patient = req.body.patient
    console.log("Getting appointments by patient: " +patient +"...")
    AppointmentModel.find({"patient._id": patient})
    .then((appointments)=>{
        console.log("Found appointments: ", appointments)
        let appointmentsResponse = []
        for(const appointment of appointments){
            let appResp = {
                approver: appointment.approver.firstName +" " +appointment.approver.lastName,
                patient: appointment.patient.firstName +" " +appointment.patient.lastName,
                hospital: appointment.hostpital.name +", at: " +appointment.hospital.address,
                vaccine: appointment.vaccine.name,
                doses: appointment.vaccine.dosesRequired,
                appointmentDate: appointment.appointmentDate,
                charge: appointment.charge,
                isPaid: appointment.isPaid
            }
            appointmentsResponse.push(appResp)
        }
        res.status(200).send(appointmentsResponse)
    })
    .catch((err)=>{
        console.log("Error while fetching appointments: ", err)
        res.status(500).send("Error while fetching appointments")
    })
})

module.exports = appointmentRouter