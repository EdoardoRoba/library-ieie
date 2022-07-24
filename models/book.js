const mongoose = require('mongoose')
const Schema = mongoose.Schema // defines the schema of the data

// schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    }
}, { timestamps: true });

// model. The string defines the model name (very important)
const Book = mongoose.model('Book', bookSchema)
module.exports = Book