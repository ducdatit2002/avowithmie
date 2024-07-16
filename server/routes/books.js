const router = require('express').Router();
const { User } = require('../models/user');
const { Book, validate } = require('../models/book');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validObjectId = require('../middleware/validateObjectId');

// create book
router.post('/', admin, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    const book = await Book(req.body).save();
    res.status(200).send({ data: book, message: 'Book created successfully' });
});

// get all books
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.status(200).send({ data: books });
});

// update books by id
router.put("/:id", [validObjectId, admin], async (req, res) => {
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true});
    res.status(200).send({ data: book, message: "Update book successfully" });
})

//delete book by id
router.delete("/:id", [validObjectId, admin], async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Book deleted successfully" });
});

//like book

router.put("/like/:id", [validObjectId, auth], async (req, res) => {
	let resMessage = "";
	const book = await Book.findById(req.params.id);
	if (!book) return res.status(400).send({ message: "book does not exist" });

	const user = await User.findById(req.user._id);
	const index = user.likedBooks.indexOf(book._id);
	if (index === -1) {
		user.likedBooks.push(book._id);
		resMessage = "Added to your liked books";
	} else {
		user.likedBooks.splice(index, 1);
		resMessage = "Removed from your liked book";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
});

//get all liked books
router.get("/like", auth, async (req, res) => {
    const user = await User.findById(req.user._id)
    const books = await Book.find({ _id: user.likedBooks });
    res.status(200).send({ data: books });
});

module.exports = router;


