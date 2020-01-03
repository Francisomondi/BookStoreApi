const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Genre = require('./models/genres');
const Book = require('./models/books');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore',
 { useNewUrlParser: true,
useUnifiedTopology: true
}, () => console.log('connected to db'));
const db = mongoose.connection;

//use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route to homepage
app.get('/',(req,res)=>{
  res.send('This is my landing page');
});
app.get('/genres', (req, res) => {
  Genre.getGenres((err,genres)=>{
      if(err){
        throw err;
      }
      res.json(genres);
  });
});

app.get('/books', (req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}....`));

