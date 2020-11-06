
const app = require('../index')
let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');
let should = chai.should();
let  assert = chai.assert;

chai.use(chaiHttp);

let userJson = {
    "firstname" :"Thomaz",
    "lastname" : "Luiz Santos",
    "email" : "thomaz.santos@gmail.com",
    "password" : "12345678",
    "password2" : "12345678"
};

let updateUser = {
    "firstname" :"Thomaz update",
    "lastname" : "Luiz Santos update",
    "email" : "thomaz.santos@gmail.com.br",
    "password" : "123456789",
    "password2" : "123456789" 
}


var agent = chai.request.agent(app)
 
// add a user 
describe('register a user', ()=>{
    it('register a user in API!',(done)=>{

    chai.request(app)
        .post('/api/register')
        .send(userJson)
        .end((error,res) =>{
            if (error) {
                done(error);
            } else {
                res.should.have.status(200);            
                done();
            }
        })    
    })
    
})
 

// try to add user again with repeat data
describe('register a  exists user', ()=>{
    it('register a user exists in API!',(done)=>{
    chai.request(app)
        .post('/api/register')
        .send(userJson)
        .end((error,res) =>{   
            if (error) {
                done(error);
            } else {         
                res.should.have.status(400);                
                done();
            }
            
        })    
    })
     
})

// do a login
describe('login authentication', () => {   
    it('login a user in API!',(done)=>{         
        agent.post('/api/login')
            .send({email : userJson.email, password : userJson.password})
            .end(function (error, res) {                    
                    if (error){
                        done(error);
                    }else{         
                        expect(res.body.token).to.not.equal(0)              
                        expect(res).to.have.status(200);
                        return agent.get('/api/listusers')
                                    .then(function (res) {                                        
                                        expect(res).to.have.status(200);
                                        done();
                                });
                    }
                
            }); 
    });
})

 
// update a user
describe('update a user exists', ()=>{
    it('update a user in API!',(done)=>{   
        agent 
        .post('/api/updateuser')               
        .send(updateUser) 
        .end((error,res) =>{   
            if (error) {
                done(error);
              } else {                         
                expect(userJson).not.equal(updateUser);
                res.should.have.status(200);
                done();
              }
        })   
    })
     
})


// user profile
describe('show the user profile', ()=> {
    it('show profile of user', (done)=>{
        agent
        .get('/api/profile')
        .send({})
        .end((error,res) => {
            if (error) {
                done(error)
            }else{
                expect(res.body.isAuth).to.equal(true);                
                res.should.have.status(200);
                done();
            }
        })


    })
})


// user list
describe('show de lit of users ', () => {   
    it('show the users list in API!',(done)=>{         
    agent
        .get('/api/listusers')
        .send({})
        .end((error,res) => {
            if (error) {
                done(error);
            }else{
                expect(res.body).to.not.equal(0) 
                expect(res).to.have.status(200);
                done()
            };
        }) 
    });

});

 
// remove a user
describe('remove a user exists', ()=>{
    it('remove a user in API!',(done)=>{
        agent 
        .post('/api/removeuser')
        .send({'email' : userJson.email})
        .send({'email' : updateUser.email})
        .end((error,res) =>{   
            if (error) {
                done(error);
              } else {         
                res.should.have.status(200);
                done();
              }
        })              
    })
     
}) 


// do a logout

describe('try to do a logout', ()=>{
    it('try to do a logout of user!', (done)=>{
        agent
        .get("/api/logout")
        .end(function(err, res) {            
            agent.should.not.have.cookie("nToken");
            res.should.have.status(200);
            done();
        }) 
    }) 
})




