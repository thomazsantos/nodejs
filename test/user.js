import app from '../index.js'
import chaiHttp from 'chai-http'
import chai from 'chai'
import * as mocha from 'mocha'
const { expect, assert } = chai

chai.use(chaiHttp)

const userJson = {
  firstname: 'Thomaz',
  lastname: 'Luiz Santos',
  email: 'thomaz.santos@gmail.com',
  password: '12345678',
  password2: '12345678'
}

const updateUser = {
  firstname: 'Thomaz update',
  lastname: 'Luiz Santos update',
  email: 'thomaz.santos@gmail.com.br',
  password: '123456789',
  password2: '123456789'
}

const agent = chai.request.agent(app)

// add a user
describe('register a user', () => {
  it('register a user in API!', (done) => {
    chai.request(app)
      .post('/api/register')
      .send(userJson)
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          assert.equal(200, res.status)
          done()
        }
      })
  })
})

// try to add user again with repeat data
describe('register a  exists user', function () {
  it('register a user exists in API!', function (done) {
    chai.request(app)
      .post('/api/register')
      .send(userJson)
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          assert.equal(400, res.status)
          done()
        }
      })
  })
})

// do a login
describe('login authentication', function () {
  it('login a user in API!', function (done) {
    agent.post('/api/login')
      .send({ email: userJson.email, password: userJson.password })
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          expect(res.body.token).to.not.equal(0)
          expect(res).to.have.status(200)
          return agent.get('/api/listusers')
            .then(function (res) {
              expect(res).to.have.status(200)
              done()
            })
        }
      })
  })
})

// do a logout
describe('try to do a logout', function () {
  it('try to do a logout of user!', function (done) {
    agent
      .get('/api/logout')
      .end((error, res) => {
        if (error) {
          done(error)
        }
        expect(agent).not.have.cookie('nToken')
        expect(res).to.have.status(200)
        done()
      })
  })
})

// do a login
describe('login authentication', function () {
  it('login a user in API!', function (done) {
    agent.post('/api/login')
      .send({ email: userJson.email, password: userJson.password })
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          expect(res.body.token).to.not.equal(0)
          expect(res).to.have.status(200)
          return agent.get('/api/listusers')
            .then(function (res) {
              expect(res).to.have.status(200)
              done()
            })
        }
      })
  })
})

// update a user
describe('update a user exists', function () {
  it('update a user in API!', function (done) {
    agent
      .post('/api/updateuser')
      .send(updateUser)
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          expect(userJson).not.equal(updateUser)
          expect(res).to.have.status(200)
          done()
        }
      })
  })
})

// user profile
describe('show the user profile', function () {
  it('show profile of user', function (done) {
    agent
      .get('/api/profile')
      .send({})
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          expect(res.body.isAuth).to.equal(true)
          expect(res).to.have.status(200)
          done()
        }
      })
  })
})

// user list
describe('show de lit of users ', function () {
  it('show the users list in API!', function (done) {
    agent
      .get('/api/listusers')
      .send({})
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          expect(res.body).to.not.equal(0)
          expect(res).to.have.status(200)
          done()
        };
      })
  })
})

// remove a user
describe('remove a user exists', function () {
  it('remove a user in API!', function (done) {
    agent
      .post('/api/removeuser')
      .send({ email: userJson.email })
      .send({ email: updateUser.email })
      .end((error, res) => {
        if (error) {
          done(error)
        } else {
          expect(res).to.have.status(200)
          done()
        }
      })
  })
})
