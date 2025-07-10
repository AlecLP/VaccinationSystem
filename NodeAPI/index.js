let express = require("express")
const app = express()

const cors = require("cors")

globalThis.rootPath = __dirname

app.use(cors({origin: "http://localhost:9090"}))
app.use(express.json({limit: "2mb", extended: false}))

//Apps and Routes
//======================================================
const userApp = express()
const userRoute = require("./route/UserRoute")
const vaccineApp = express()
const vaccineRoute = require("./route/VaccineRoute")
const hospitalApp = express()
const hospitalRoute = require("./route/HospitalRoute")
const appointmentApp = express()
const appointmentRoute = require("./route/AppointmentRoute")

//Using Apps and Routes
//======================================================
app.use("/user", userApp)
userApp.use("/", userRoute)
app.use("/vaccine", vaccineApp)
vaccineApp.use("/", vaccineRoute)
app.use("/hospital", hospitalApp)
hospitalApp.use("/", hospitalRoute)
app.use("/appointment", appointmentApp)
appointmentApp.use("/", appointmentRoute)

const port = 9000
console.log("REST API is listening on port: ", port)
app.listen(port)