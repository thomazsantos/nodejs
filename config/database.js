const db=require('./config').get(process.env.NODE_ENV);
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect(db.DATABASE, { useNewUrlParser: true,useUnifiedTopology:true }).then( 
        ()=> {console.log("Database connected!") },
        err => {console.log("*** Error to connect on database *** " + err)}
    );
} 




