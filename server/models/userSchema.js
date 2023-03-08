const mongoose = require("mongoose")
const bccrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// schema and documentation structure
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

// // hashing password to secure
// userSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = bccrypt.hashSync(this.password, 10);
//     }
//     next();
// })

// generate tokens to verify user
// userSchema.methods.generateToken = async function () {
//     try {
//         let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
//         this.tokens = this.tokens.concat({ token: generatedToken })
//         await this.save()
//         return generatedToken
//     } catch (error) {
//         console.log(error)

//     }
// }


// create model
const MyModel = new mongoose.model("MyModel", userSchema)

module.exports = MyModel