const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
     genre: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
     publisher: {
        type: String
    },
    pages: {
        type: String
        
    },
    image: {
        type: String,
        required: true
    },

});

//import the book class
let Book = module.exports = mongoose.model('Book', bookSchema);

//get books

module.exports.getBooks =
    (callback, limit) => {
        Book.find(callback).limit(limit);

    }

//post a book
module.exports.addBook =
    (book, callback) => {
        Book.create(book, callback);
    }

    //get a single book
module.exports.getBook =
    (_id,callback) => {
        Book.findById(_id, callback);
 
    }


module.exports.updateBook =
    (id, book, options, callback) => {
        let querry = { _id: id };
        let update = {
            title: book.title,
            genre: book.genre,
            description: book.description,
            author: book.author,
            publisher: book.publisher,
            pages: book.pages,
            image: book.image

        }
        Book.findOneAndUpdate(querry, update, options, callback);
    }
