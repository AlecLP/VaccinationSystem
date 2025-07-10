let mongooseObj = require("./Db")
schemaObj = mongooseObj.Schema

let appointmentSchema = new schemaObj({
    approver: {type: Object, required: true},
    patient: {type: Object, required: true},
    hospital: {type: Object, required: true},
    vaccine: {type: Object, required: true},
    appointmentDate: {type: Date, required: true},
    charge: {type: Number, required: true},
    isPaid: {type: Boolean, required: true}
},
{
    versionKey: false
})

let AppointmentModel = mongooseObj.model("appointment", appointmentSchema)

module.exports = AppointmentModel