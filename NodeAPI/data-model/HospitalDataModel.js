let mongooseObj = require("./Db")
schemaObj = mongooseObj.Schema

let hospitalSchema = new schemaObj({
    name: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: String, required: true},
    charges: {type: Number, required: true}
},
{
    versionKey: false
})

let HospitalModel = mongooseObj.model("hospital", hospitalSchema)

module.exports = HospitalModel