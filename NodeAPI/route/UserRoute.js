let expressObj = require("express")
let userRouter = expressObj.Router({})

let UserModel = require("../data-model/UserDataModel")

userRouter.post("/api/register", (req, res) => {
    let userData = req.body
    console.log("Regstering user: ", userData)
    UserModel.findOne({username: userData.username})
    .then((existingUser) => {
        if(existingUser){
            console.log("ERROR: Username already exists.")
            return res.status(409).send({ message: 'Username already exists' });
        }
        else{
            let userDataObj = new UserModel(userData)
            userDataObj.save()
            .then((newUser) => {
                console.log("Sucessfully registered user: ", newUser)
                return res.status(201).send({message: "Sucessfully registered user."})
            }).catch((err) => {
                console.log("ERROR: Error saving user to database: ", err)
                return res.status(500).send({message: "Error saving user to database."})
            })
        }
    }).catch((err) => {
        console.log("ERROR: Server error: ", err)
        return res.status(500).send({message: "Server error"})
    })
})

userRouter.post("/api/login", (req, res) => {
    let loginData = req.body
    console.log("Attempting to login user: ", loginData)
    UserModel.findOne({username: loginData.username, password: loginData.password})
    .then((existingUser) => {
        if(existingUser){
            console.log("Login successful.")
            return res.status(200).send(existingUser)
        }
        else{
            console.log("ERROR: Invalid credentials.")
            return res.status(401).send({message: "Invalid credentials."})
        }
    }).catch((err) => {
        console.log("ERROR: Server error: ", err)
        return res.status(500).send({message: "Server error"})
    })
})

module.exports = userRouter