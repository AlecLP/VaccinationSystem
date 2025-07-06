let mongooseObj = require("./Db")
schemaObj = mongooseObj.Schema

let vaccineSchema = new schemaObj({
    name: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    sideEffect: {type: String, required: true},
    origin: {type: String, required: true},
    dosesRequired: {type: Number, required: true},
    otherInfo: {type: String, required: true}
},
{
    versionKey: false
})

let VaccineModel = mongooseObj.model("vaccine", vaccineSchema)

module.exports = VaccineModel