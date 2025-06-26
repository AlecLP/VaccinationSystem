let express = require("express")
const app = express()
const cors = require("cors")
globalThis.rootPath = __dirname
const port = 9000
app.use(cors({origin: "http://localhost:" +port}))
app.use(express.json({limit: "2mb", extended: false}))

//Apps and Routes
//======================================================


//Using the Apps and Routes
//======================================================


console.log("REST API is listening on port: ", port)
app.listen(port)