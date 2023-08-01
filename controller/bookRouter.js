const { AddBook, GetBook, GetBookByIsbn, GetBookByAuthor, GetBookByTitle, GetBookByReview,
    AddBookReview, ModifyReview, DeleteReview } = require("./middleware")
const route = require("express").Router()

route.post("/", (req, res) => {
    AddBook(req, res)

})

route.get("/", (req, res) => {
    GetBook(req, res)

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
module.exports = route;

