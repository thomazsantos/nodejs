const User=require('./../models/user');
const user=require('./../models/user');

function register(req,res){
   
    const newuser=new User(req.body);
    console.log(newuser);
     
    if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
        
    User.findOne({email:newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"email exits"});
     
        newuser.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false});}
            res.status(200).json({
                succes:true,
                user : doc
            });
        });
    });
};

function login(req,res){
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in"
        });
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        email : user.email,
                        token: user.token
                    });
                });    
            });
          });
        }
    });
};

function logout(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });

}

function profile(req,res){
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.firstname + req.user.lastname
        
    })
}

function listusers(req,res){
    user.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
    
}

function removeuser(req,res){
    
    user.findOneAndDelete({'email': req.body.email},function(err,result){
        if (err){
            console.log(err);
        }else{
            res.json(result)
        }
    }); 
    
}

function updateuser(req,res){
    
    console.log(req.user);

    user.findOne({'_id': req.user._id},function(err,user){
        if (err){
            console.log(err);
        }else{
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname
            user.email = req.body.email
            user.password = req.body.password
            user.password2 = req.body.password2
            user.save();
            res.status(200).json(user)
        }
    }); 
    
}

function indexof(req,res){
    res.status(200).send(`it's run ;D ready for fun!`);
}

module.exports = {register, login, logout, profile, listusers, removeuser, updateuser, indexof}
