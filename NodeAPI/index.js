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

//Using Apps and Routes
//======================================================
app.use("/user", userApp)
userApp.use("/", userRoute)

const port = 9000
console.log("REST API is listening on port: ", port)
app.listen(port)