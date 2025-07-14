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
                _id: appointment._id,
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
    const patientId = req.query.patient;
    if (!patientId) {
        return res.status(400).send({ message: "Missing patient ID" });
    }
    console.log("Getting appointments by patient: " +patientId +"...")
    AppointmentModel.find({"patient._id": patientId})
    .then((appointments)=>{
        console.log("Found appointments: ", appointments)
        let appointmentsResponse = []
        for(const appointment of appointments){
            let appResp = {
                _id: appointment._id,
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

appointmentRouter.put("/api/makePayment", (req, res) => {
    const appointmentId = req.body.appointmentId
    AppointmentModel.findOne({"_id": appointmentId})
    .then((appointment) => {
        if (!appointment) {
            return res.status(404).send({ message: "Appointment not found." });
        }
        appointment.isPaid = true;
        appointment.save()
        .then((savedAppointment) => {
            console.log("Appointment payment successful: ", savedAppointment)
            return res.status(200).send({message: "Appointment payment successful."})
        }).catch((err) => {
            console.log("ERROR: Error making appointment payment: ", err)
            return res.status(500).send({message: "Error making appointment payment."})
        })
    }).catch((err) => {
        console.log("ERROR: Payment server error: ", err)
        return res.status(500).send({message: "Error payment server error."})
    })
})

module.exports = appointmentRouter