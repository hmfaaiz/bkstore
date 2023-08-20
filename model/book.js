const mongoose = require("mongoose")


const BookSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    image:{type:String},
    pdf:{type:String},
    pdfname:{type:String},
    reviews: { type: [] }

})

module.exports = mongoose.model('book', BookSchema)