const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const GenerateToken = (user, res) => {
    jwt.sign({ user }, process.env.Key, (err, token) => {
        if (token) {
            return res.status(200).json(token)
        }
        else {
            return res.status(404).json("Something is wrong")
        }
    })
}


const Authentication = (req, res, next) => {
    // const token = req.headers.token
    token = req.headers.authorization;
    if (token) {
       
        jwt.verify(token, process.env.Key, (err, user) => {
            if (user) {
                next(user)
            }
            else {
                return res.status(404).json('Invalid token')
            }
        })
    }
    else {
        return res.status(404).json("You are not authenticate user")
    };
}





module.exports = { GenerateToken, Authentication }