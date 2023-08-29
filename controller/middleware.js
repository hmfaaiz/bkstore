const Book = require("../model/book.js")
const User = require('../model/user.js')
const { v4: uuidv4 } = require("uuid");
const { GenerateToken, Authentication } = require('./authentication')


const GetImage = async (req, res) => {
    try {   
        const file = await Book.findById(req.params.fileId);
        console.log(file)
        res.download(file.pdf,file.pdfname);
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ msg: error.message });
    }
}

const RegisterUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    })


    try {
        const findUser = await User.findOne({ "username": req.body.username })
        if (!findUser) {
            const saveUser = await newUser.save()
            return res.status(200).json("Successfully Registered!")

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

            return res.status(404).json({"password":false})
        }

    }
    else {
        return res.status(404).json({"user":false})
    }

}



const GetBook = async (req, res) => {

    Authentication(req, res, async () => {
        const findBook = await Book.find()
        console.log("Books",findBook)
        return res.status(200).json(findBook)
    })
}

const Search = async (req, res) => {
    Authentication(req, res, async () => {
    const searchKey = req.params.key;

    try {
        const findBook = await Book.find(
            {
                '$or': [
                    { author: { $regex: searchKey, $options: 'i' } },
                    { title: { $regex: searchKey, $options: 'i' } },
                    { isbn: { $regex: searchKey } }
                ]
            }
        )
        if (findBook.length>0) {
            return res.status(200).json(findBook)
        }
        else {
            return res.status(200).json("Not found")

        }

    }
    catch (err) {
        return res.status(404).json(err)
    }


    })

}

// const GetBookByIsbn = async (req, res) => {
//     Authentication(req, res, async (user) => {
//         const isbn = req.params.isbn
//         const findBook = await Book.findOne({ "isbn": isbn })
//         return res.status(200).json(findBook)

//     })

// }

// const GetBookByAuthor = async (req, res) => {

//     Authentication(req, res, async () => {
//         const author = req.params.authorname
//         const findBook = await Book.find({ "author": author })
//         return res.status(200).json(findBook)
//     })
// }

// const GetBookByTitle = async (req, res) => {

//     Authentication(req, res, async () => {
//         const title = req.params.title
//         const findBook = await Book.find({ "title": title })
//         return res.status(200).json(findBook)
//     })
// }

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
    console.log(273,req.files["pdf"][0].originalname)

    const book = new Book({
        isbn: req.body.isbn,
        author: req.body.author,
        title: req.body.title,
        image:req.files["image"][0].path,
        pdf:req.files["pdf"][0].path,
        pdfname:req.files["pdf"][0].originalname
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
    AddBook, GetBook, GetBookByReview,
    RegisterUser, LoginUser, AddBookReview, ModifyReview, DeleteReview, Search,GetImage
}