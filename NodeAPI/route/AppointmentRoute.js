let expressObj = require("express")
const PDFDocument = require("pdfkit")
const fs = require('fs')
const path = require('path');
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

        const doc = new PDFDocument();
        
        const pdfDir = path.join(__dirname, '../pdfs');
        fs.mkdirSync(pdfDir, { recursive: true });

        const pdfPath = path.join(pdfDir, `${appointment._id}.pdf`);
        doc.pipe(fs.createWriteStream(pdfPath));

        //Header
        doc.rect(0, 0, doc.page.width, 80)
            .fill("#b91c1c")
        doc.fillColor("white")
            .fontSize(24)
            .text("ImmunoSuite Appointment Certificate", 50, 25)

        //Body
        doc.fillColor("black")
        doc.fontSize(12)
            .text(`Patient: ${appointment.patient.firstName} ${appointment.patient.lastName}`, 50, 100)
            .text(`Doctor: ${appointment.approver.firstName} ${appointment.approver.lastName}`)
            .text(`Hospital: ${appointment.hospital.name} at ${appointment.hospital.address}`)
            .text(`Vaccine: ${appointment.vaccine.name}`)
            .text(`Doses: ${appointment.vaccine.dosesRequired}`)
            .text(`Date: ${appointment.appointmentDate.toDateString()}`)
            .text(`Cost: $${appointment.charge.toFixed(2)}`)

        doc.end()

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

appointmentRouter.get("/download/:id", (req, res) => {
    const {id} = req.params

    const pdfPath = path.join(__dirname, '../pdfs', `${id}.pdf`)

    if(!fs.existsSync(pdfPath)){
        return res.status(404).json({message: "PDF not found for requested appointment."})
    }

    res.download(pdfPath, `Appointment_${id}.pdf`, (err) => {
        if(err){
            console.log("Download error: ", err)
            res.status(500).json({message: "Error sending pdf"})
        }
    })
})

module.exports = appointmentRouter