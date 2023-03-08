// Authentication is the middleware
// it will cheked before the response

const Users = require("../models/userSchema")
const jwt = require("")

const authenticate = async (req, res) => {

    try {
        const token = req.cookies.jwt
        if (!token) {
            res.status(401).send("No token")
        } else {
            const verifyToken = jwt.verify(token, process.env.SECRET_KEy)
            const rootUser = await Users.findOne({ _id: verifyToken._id, "tokens.token": token })
            if (!rootUser) {
                res.status(401).send("User Not Found")
            } else {
                res.status(200).send("Authoroaed user")
            }
        }
    } catch (error) {
        res.status(401).send("Error")
    }
}

module.exports = authenticate