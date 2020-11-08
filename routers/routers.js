import express from 'express'
import auth from './../middlewares/auth.js'

import userController from './../controller/userController.js'
const router = express.Router()

router.post('/api/register', userController.register)
router.post('/api/login', userController.login)
router.get('/api/logout', auth, userController.logout)
router.get('/api/profile', auth, userController.profile)
router.get('/api/listusers', auth, userController.listusers)
router.post('/api/removeuser', auth, userController.removeuser)
router.post('/api/updateuser', auth, userController.updateuser)
router.get('/', userController.indexof)

export default router
