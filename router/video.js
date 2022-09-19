const express = require('express')
const {
  verfiyToken
} = require('../utils/jwt')
const router = express.Router()
const videoController = require('../controller/videoController')
const vodController = require('../controller/vodController')
const {
  videoValidator
} = require('../middleware/validator/videoValidator')
router
  .post('/comment/:videoId', verfiyToken(), videoController.comment)
  .get('/videolist', verfiyToken(), videoController.videolist)
  .get('/getvod', verfiyToken(), vodController.getvod)
  .get('/video/:videoId', verfiyToken(false), videoController.video)
  .post('/createvideo', verfiyToken(), videoValidator, videoController.createvideo)
module.exports = router;
