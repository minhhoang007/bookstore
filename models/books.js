const mongoose = require('mongoose')
const validator = require('validator')

const Book = mongoose.model('Book', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Book