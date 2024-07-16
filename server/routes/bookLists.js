const router = require('express').Router();
const { BookList, validate } = require('../models/bookList');
const { Book } = require('../models/book');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const Joi = require("joi");

// create booklist
router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const bookList = await BookList({ ...req.body, user: user._id }).save();
	await bookList.save();

	user.booklists.push(bookList._id);
	await user.save();

	res.status(201).send({ data: bookList });
});
// edit booklist by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		desc: Joi.string().allow(""),
		img: Joi.string().allow(""),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const booklist = await BookList.findById(req.params.id);
	if (!booklist) return res.status(404).send({ message: "Booklist not found" });

	const user = await User.findById(req.user._id);
	if (!user._id.equals(booklist.user))
		return res.status(403).send({ message: "User don't have access to edit!" });

	booklist.title = req.body.title;
	booklist.desc = req.body.desc;
	booklist.img = req.body.img;
	await booklist.save();

	res.status(200).send({ message: "Updated successfully" });
});

// add book to bookist
router.put("/add-book", auth, async (req, res) => {
	const schema = Joi.object({
		booklistId: Joi.string().required(),
		bookId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const booklist = await BookList.findById(req.body.booklistId);
	if (!user._id.equals(booklist.user))
		return res.status(403).send({ message: "User don't have access to add!" });

	if (booklist.books.indexOf(req.body.bookId) === -1) {
		booklist.books.push(req.body.bookId);
	}
	await booklist.save();
	res.status(200).send({ data: booklist, message: "Added to booklist" });
});

// remove book from booklist
router.put("/remove-book", auth, async (req, res) => {
	const schema = Joi.object({
		booklistId: Joi.string().required(),
		bookId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const booklist = await BookList.findById(req.body.booklistId);
	if (!user._id.equals(booklist.user))
		return res
			.status(403)
			.send({ message: "User don't have access to Remove!" });

	const index = booklist.books.indexOf(req.body.bookId);
	booklist.books.splice(index, 1);
	await booklist.save();
	res.status(200).send({ data: booklist, message: "Removed from booklist" });
});

// user booklists
router.get("/favourite", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const booklists = await BookList.find({ _id: user.booklists });
	res.status(200).send({ data: booklists });
});

// get random booklists
router.get("/random", auth, async (req, res) => {
	const booklists = await BookList.aggregate([{ $sample: { size: 2 } }]);
	res.status(200).send({ data: booklists });
});

// get booklist by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const booklist = await BookList.findById(req.params.id);
	if (!booklist) return res.status(404).send("not found");

	const books = await Book.find({ _id: booklist.books });
	res.status(200).send({ data: { booklist, books } });
});

// get all booklist
router.get("/", auth, async (req, res) => {
	const booklists = await BookList.find();
	res.status(200).send({ data: booklists });
});

// delete booklist by id
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
    const user = await User.findById(req.user._id);
    const booklist = await BookList.findById(req.params.id);
    if (!user._id.equals(booklist.user))
        return res
            .status(403)
            .send({ message: "User don't have access to delete!" });

    // Using findByIdAndDelete to remove the booklist
    if (booklist) {
        await BookList.findByIdAndDelete(req.params.id);
        const index = user.booklists.indexOf(req.params.id);
        if (index > -1) {
            user.booklists.splice(index, 1); // Only modify the array if the item is found
        }
        await user.save();
        res.status(200).send({ message: "Removed from library" });
    } else {
        res.status(404).send({ message: "Booklist not found" });
    }
});

module.exports = router;
