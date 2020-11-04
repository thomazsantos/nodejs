
const app = require('../index')
let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');
let should = chai.should();

chai.use(chaiHttp);

let userJson = {
    "firstname" :"Thomaz",
    "lastname" : "Luiz Santos",
    "email" : "thomaz.santos@gmail.com",
    "password" : "12345678",
    "password2" : "12345678"
};

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
    agent.post('/api/login')
        .send(userJson)
        .then(function (res) {
        expect(res).to.have.cookie('sessionid');
        return agent.get('/')
        .then(function (res) {
           expect(res).to.have.status(200);
        });
                
    }); 
});

    
// remove a user
describe('remove a user exists', ()=>{
    it('remove a user in API!',(done)=>{
        agent 
        .post('/api/removeuser')
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

// do a logout
describe('try to do a logout', ()=>{
    it('try to do a logout of user!', (done)=>{
        agent
        .get("/api/logout")
        .end(function(err, res) {
            res.should.have.status(200);
            agent.should.not.have.cookie("nToken");
            done();
        }) 
    }) 
})





