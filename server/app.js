// import all packages
const dotenv = require("dotenv")
const express = require("express")
const bccrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const app = express()

// configure env file and required connection file
dotenv.config({ path: "./config.env" })
require("./db/conn")
const port = process.env.PORT

// required model
const mymodels = require("./models/userSchema")

// these method is used to get data and  cookie from frontend
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello Server")
})

// Registration
app.post("/register", async (req, res) => {
    try {
        // get body or Data
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        const createUser = new mymodels({
            username: username,
            email: email,
            password: password
        })



        // save method is used to create the user or insert user
        // but before saving or inserting password will hash
        // becuase of hasing after hash it will save to db
        const created = await createUser.save()
        console.log(created)
        res.status(200).send("Registered")
    } catch (error) {
        res.status(400).send(error)
    }


})


app.get('/logout', (req, res) => {
    res.clearCookie("jwt", { path: '/' })
    res.status(200).send("User Logged Out")
})

// Authentication
app.get("/auth", authenticate, (req, res)=>{
    
})



// out backend is done and store data in database
// now ots tome to  connect frontend with backend


// run server
app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})
