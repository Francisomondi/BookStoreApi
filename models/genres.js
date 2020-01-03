const mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     create_date:{
         type: Date,
         default: Date.now
     }
});

//import the genre class
let Genre = module.exports = mongoose.model('Genre',genreSchema);

//get genres

module.exports.getGenres = 
(callback,limit)=>{
    Genre.find(callback).limit(limit);

}