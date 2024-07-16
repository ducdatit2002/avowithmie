const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    bookSchema: { type: String, required: true },
    img: { type: String, required: true }
});

const validate = (book) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        bookSchema: Joi.string().required(),
        img: Joi.string().required()
    })
    return schema.validate(book);
}

const Book = mongoose.model('book', bookSchema);

module.exports = { Book, validate };