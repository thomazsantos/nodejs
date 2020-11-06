const db=require('./config').get(process.env.NODE_ENV);
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db.DATABASE, { useNewUrlParser: true,useUnifiedTopology:true }).then( 
        ()=> {console.log("Database connected!") },
        err => {console.log("*** Error to connect on database *** " + err)}
    );
} 




