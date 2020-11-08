import express from 'express'
import bodyparse from 'body-parser'
import cookieParser from 'cookie-parser'
import database from './config/database.js'
import router from './routers/routers.js'

const app = express()
app.use(bodyparse.urlencoded({ extended: false }))
app.use(bodyparse.json())
app.use(cookieParser())

function initDataBase () {
  const db = database()
  return db
}

initDataBase()

app.use('/', router)

// listening port
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`)
})

export default app
