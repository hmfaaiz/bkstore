const Book = require("../model/book.js")
const User = require('../model/user.js')
const { v4: uuidv4 } = require("uuid");
const { GenerateToken, Authentication } = require('./authentication')

const RegisterUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    })


    try {
        const findUser = await User.findOne({ "username": req.body.username })
        if (!findUser) {
            const saveUser = await newUser.save()
            return res.status(200).json(saveUser)

        }
        else {
            return res.status(404).json("User already exist")
        }

    }
    catch (err) {
        return res.status(404).json(err)

    }


}
const LoginUser = async (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const findUser = await User.findOne({ "username": username })

    if (findUser) {
        if (findUser.password == password) {
            GenerateToken(findUser, res)

        }
        else {

            return res.status(404).json("Invalid password")
        }

    }
    else {
        return res.status(404).json("User not exist")
    }

}






const GetBook = async (req, res) => {

    // Authentication(req, res, async () => {
    const findBook = await Book.find()
    return res.status(200).json(findBook)
    // })
}
const GetBookByIsbn = async (req, res) => {
    Authentication(req, res, async (user) => {
        console.log("yes")
        console.log("user", user)
        const isbn = req.params.isbn
        const findBook = await Book.findOne({ "isbn": isbn })
        return res.status(200).json(findBook)

    })

}

const GetBookByAuthor = async (req, res) => {

    Authentication(req, res, async () => {
        const author = req.params.authorname
        const findBook = await Book.find({ "author": author })
        return res.status(200).json(findBook)
    })
}

const GetBookByTitle = async (req, res) => {

    Authentication(req, res, async () => {
        const title = req.params.title
        const findBook = await Book.find({ "title": title })

        return res.status(200).json(findBook)
    })
}

const GetBookByReview = async (req, res) => {

    Authentication(req, res, async () => {
        const isb = req.params.isbn
        const findBook = await Book.findOne({ "isbn": isb })
        const { author, ...others } = findBook._doc
        return res.status(200).json(others)
    })
}



const ModifyReview = (req, res) => {

    Authentication(req, res, async (user) => {
        const selectBook = await Book.findOne({ "isbn": req.params.isbn })

        const modifyReview = req.body.reviews
        const username = user.user.username
        let find = selectBook.reviews.findIndex(obj => obj.id === req.params.rid)
        console.log(find)
        if (find >= 0) {
            try {
                if (selectBook.reviews[find].username == username) {
                    selectBook.reviews[find].review = modifyReview
                    console.log(selectBook)
                    selectBook.markModified('reviews');
                    const saveBook = await selectBook.save()

                    return res.status(200).json(saveBook)

                }
                else {
                    return res.status(200).json("You didn't write")
                }

            }
            catch {
                return res.status(404).json(err)
            }

        }
        else {
            return res.status(200).json("Does not exist")
        }


    })
}
const DeleteReview = (req, res) => {

    Authentication(req, res, async (user) => {
        const selectBook = await Book.findOne({ "isbn": req.params.isbn })


        const username = user.user.username
        let find = selectBook.reviews.findIndex(obj => obj.id === req.params.rid)
        console.log(find)
        if (find >= 0) {
            try {
                if (selectBook.reviews[find].username == username) {
                    selectBook.reviews.splice(find, 1)
                    console.log(selectBook)
                    selectBook.markModified('reviews');
                    const saveBook = await selectBook.save()

                    return res.status(200).json(saveBook)

                }
                else {
                    return res.status(200).json("You didn't write")
                }

            }
            catch {
                return res.status(404).json(err)
            }

        }
        else {
            return res.status(200).json("Does not exist")
        }


    })
}


const AddBookReview = async (req, res) => {

    Authentication(req, res, async (user) => {
        const selectBook = await Book.findOne({ "isbn": req.params.isbn })

        const review = req.body.reviews


        selectBook.reviews.push({
            id: uuidv4(), username: user.user.username,
            review: review
        })
        const saveBook = await selectBook.save()
        return res.status(200).json(saveBook)

    })
}



const AddBook = async (req, res) => {

    const book = new Book({
        isbn: req.body.isbn,
        author: req.body.author,
        title: req.body.title
    });

    try {
        const savebook = await book.save()
        return res.status(200).json(savebook)
    }
    catch (err) {
        return res.status(500).json(err)
    }

}

module.exports = {
    AddBook, GetBook, GetBookByIsbn, GetBookByAuthor, GetBookByTitle, GetBookByReview,
    RegisterUser, LoginUser, AddBookReview, ModifyReview, DeleteReview
}