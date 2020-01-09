const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Genre = require('./models/genres');
const Book = require('./models/books');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore',
 { useNewUrlParser: true,
useUnifiedTopology: true,
   useFindAndModify:false
}, () => console.log('connected to db'));
const db = mongoose.connection;

//use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route to homepage
app.get('/',(req,res)=>{
  res.send('This is my landing page');
});

//route to fetch genres 
app.get('/genres', (req, res) => {
  Genre.getGenres((err,genres)=>{
      if(err){
        throw err;
        
      }
      res.json(genres);
  });
});

//add genre
app.post('/genres', (req, res) => {
  let genre = req.body;
  Genre.addGenre(genre,(err, genre) => {
    if (err) {
      throw err;

    }
    res.json(genre);
  });
});

//update genres
app.put('/genres/:_id', (req, res) => {
  var id = req.params._id;
  let genre = req.body;
  Genre.updateGenre(id,genre, {}, (err, genre) => {
    if (err) {
  
    throw err;

    }
    res.json(genre);
  });
});

//update genres
app.delete('/genres/:_id', (req, res) => {
  var id = req.params._id;
  
  Genre.removeGenre(id, (err, genre) => {
    if (err) {
      throw err;

    }
    res.json(genre);
  });
});

//fetch books from the database
app.get('/books', (req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
    
  });
});

//add book
app.post('/books', (req, res) => {
  let book = req.body;
  Book.addBook(book, (err, book) => {
    if (err) {
      throw err;

    }
    res.json(book);
  });
});
//fetch specific books by id
app.get('/books/:_id', (req,res)=>{
  Book.getBook(req.params._id,(err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);

  });
});

app.put('/books/:_id', (req, res) => {
  var id = req.params._id;
  let book = req.body;
  Book.updateBook(id, book, {}, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

//fire up server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}....`));

