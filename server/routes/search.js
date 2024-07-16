const router = require("express").Router();
const { Podcast } = require("../models/podcast");
const { PlayList } = require("../models/playList");
const { Book } = require("../models/book"); 
const { BookList } = require("../models/bookList");
// Corrected the casing here
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const search = req.query.search;
    if (search !== "") {
        const podcasts = await Podcast.find({ name: { $regex: search, $options: "i" } }).limit(10);
        const playlists = await PlayList.find({ name: { $regex: search, $options: "i" } }).limit(10);
        const books = await Book.find({ title: { $regex: search, $options: "i" } }).limit(10);
        const booklists = await BookList.find({ title: { $regex: search, $options: "i" } }).limit(10);
        const result = { podcasts, playlists, books, booklists };
        res.status(200).send({ data: result });
    } else {
        res.status(200).send({});
    }
});

module.exports = router;
