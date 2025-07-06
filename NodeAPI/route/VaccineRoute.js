let expressObj = require("express")
let vaccineRouter = expressObj.Router({})

let VaccineModel = require("../data-model/VaccineDataModel")

vaccineRouter.post("/api/registerVaccine", (req, res) => {
    let vaccineData = req.body
    console.log("Registering Vaccine: ", vaccineData)

    VaccineModel.findOne({name: vaccineData.name})
    .then((existingVaccine) => {
        if(existingVaccine){
            console.log("ERROR: Vaccine already exists.")
            return res.status(409).send({ message: 'Vaccine already exists' });
        }
        else{
            let vaccineDataObj = new VaccineModel(vaccineData)
            vaccineDataObj.save()
            .then((newVaccine) => {
                console.log("Sucessfully registered vaccine: ", newVaccine)
                return res.status(201).send({message: "Sucessfully registered vaccine."})
            }).catch((err) => {
                console.log("ERROR: Error saving vaccine to database: ", err)
                return res.status(500).send({message: "Error saving vaccine to database."})
            })
        }
    })
})

vaccineRouter.get("/api/getVaccines", (req, res) => {
    console.log("Getting vaccines...")
    VaccineModel.find()
    .then((vaccines)=>{
        console.log("Found vaccines: ", vaccines)
        res.status(200).send(vaccines)
    })
    .catch((err)=>{
        console.log("Error while fetching vaccines: ", err)
        res.status(500).send("Error while fetching vaccines")
    })
})

module.exports = vaccineRouter