const mongoose = require('mongoose');
const Joi = require('joi');

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true },
    desc: { type: String },
    books: { type: Array, default: [] },
    img: { type: String }
})

const validate = (bookList) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        user: Joi.string().required(),
        desc: Joi.string().allow(''),
        books: Joi.array().items(Joi.string()),
        img: Joi.string().allow('')
    });
    return schema.validate(bookList);
};

const BookList = mongoose.model('bookList', bookListSchema);

module.exports = { BookList, validate };
