
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const bookRoute = require("./controller/bookRouter")
const userRoute = require("./controller/userRouter")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.Url)
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log(err)
    })

app.use(cors());
app.use(express.json())
app.use('/api/book', bookRoute)
app.use('/api/user', userRoute)

app.listen(2000, () => {
    console.log("Listen")
})