let mongooseObj = require("./Db")
schemaObj = mongooseObj.Schema

let userSchema = new schemaObj({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    age: {type: Number, required: true},
    profession: {type: String, required: true},
    contactPhoneNumber: {type: Number, required: true},
    address: {type: String, required: true},
    gender: {type: String, required: true},
    diseaseInfo: {type: String, required: true},
    medicalCertificate: {type: String, required: true},
    role: {type: String, required: true}
},
{
    versionKey: false
})

let UserModel = mongooseObj.model("user", userSchema)

module.exports = UserModel