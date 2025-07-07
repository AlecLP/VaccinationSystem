let expressObj = require("express")
let hospitalRouter = expressObj.Router({})

let HospitalModel = require("../data-model/HospitalDataModel")

hospitalRouter.post("/api/registerHospital", (req, res) => {
    let hospitalData = req.body
    console.log("Registering Hospital: ", hospitalData)

    HospitalModel.findOne({name: hospitalData.name, address: hospitalData.address})
    .then((existingHospital) => {
        if(existingHospital){
            console.log("ERROR: Hospital already exists.")
            return res.status(409).send({ message: 'Hospital already exists' });
        }
        else{
            let hospitalDataObj = new HospitalModel(hospitalData)
            hospitalDataObj.save()
            .then((newHospital) => {
                console.log("Sucessfully registered hospital: ", newHospital)
                return res.status(201).send({message: "Sucessfully registered hospital."})
            }).catch((err) => {
                console.log("ERROR: Error saving hospital to database: ", err)
                return res.status(500).send({message: "Error saving hospital to database."})
            })
        }
    })
})

hospitalRouter.get("/api/getHospitals", (req, res) => {
    console.log("Getting hospitals...")
    HospitalModel.find()
    .then((hospitals)=>{
        console.log("Found hospitals: ", hospitals)
        res.status(200).send(hospitals)
    })
    .catch((err)=>{
        console.log("Error while fetching hospitals: ", err)
        res.status(500).send("Error while fetching hospitals")
    })
})

module.exports = hospitalRouter