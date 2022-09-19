const express = require('express')

const router = express.Router()
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')
const {
  verfiyToken
} = require('../utils/jwt')
const multer = require('multer')
const upload = multer({
  dest: 'public/'
})
router
  .get('/getchannel', verfiyToken(), userController.getchannel)
  .get('/getsubscribe/:userId', verfiyToken(), userController.getsubscribe)
  .get('/getuser/:userId', verfiyToken(false), userController.getuser)
  .get('/unsubscribe/:userId', verfiyToken(), userController.unsubscribe)
  .get('/subscribe/:userId', verfiyToken(), userController.subscribe)
  .post('/register', validator.register, userController.register)
  .post('/login', validator.login, userController.login)
  .get('/list', verfiyToken(), userController.list)
  .put('/', verfiyToken(), validator.update, userController.update)
  .delete('/', userController.delete)
  .post('/headimg', verfiyToken(), upload.single('headimg'), userController.headimg)
module.exports = router;
