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

var userController = require('./controller/userController')

app.use('/api/register', userController.register());
app.use('/api/login', userController.login());
app.use('/api/logout',auth,userController.logout()); 
app.use('/api/profile',auth,routerController.profile());
app.use('/api/listusers', auth, userController.listusers());
app.use('/api/removeuser',auth,userController.removeuser());
app.use('/',userController.indexof());


module.exports = app 