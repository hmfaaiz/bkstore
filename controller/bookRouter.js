const { AddBook, GetBook, GetBookByIsbn, GetBookByAuthor, GetBookByTitle, GetBookByReview,
    AddBookReview, ModifyReview, DeleteReview, Search ,GetImage} = require("./middleware")
const Book = require("../model/book.js")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const route = require("express").Router()

route.post("/", upload.fields([{ name: "image", maxCount: 1 }, { name: "pdf", maxCount: 1 }]), (req, res) => {
    console.log("Click")
    AddBook(req, res)

})

route.get("/", (req, res) => {
    GetBook(req, res)

})

route.get("/search/:key", (req, res) => {
    console.log(typeof (req.params.key))
    Search(req, res)

})

route.get("/isbn/:isbn", (req, res) => {
    GetBookByIsbn(req, res)

})

route.get("/author/:authorname", (req, res) => {
    GetBookByAuthor(req, res)

})

route.get("/title/:title", (req, res) => {
    GetBookByTitle(req, res)

})

route.get("/review/:isbn", (req, res) => {
    GetBookByReview(req, res)

})
route.post("/addreview/:isbn", (req, res) => {
    AddBookReview(req, res)

})

route.put("/updatereview/:isbn/:rid", (req, res) => {

    ModifyReview(req, res)
})

route.delete("/deletereview/:isbn/:rid", (req, res) => {

    DeleteReview(req, res)
})

route.get("/pdf/:fileId",(req,res)=>{
    console.log("ddd")
    GetImage(req,res)
   

})


module.exports = route;

