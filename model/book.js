const mongoose = require("mongoose")


const BookSchema = new mongoose.Schema({
    isbn: { type: Number, required: true, unique: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    reviews: { type: [] }

})

module.exports = mongoose.model('book', BookSchema)