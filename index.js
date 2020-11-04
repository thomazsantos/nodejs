const express=require('express');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const database = require('./config/database');


const app=express();
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

function initDataBase(){
    var db = database();
    return db;
}

initDataBase();

var router = require('./routers/routers')

app.use('/', router);


// listening port
const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});

module.exports = app 