const express = require('express')

const router = express.Router()
const videoController = require('../controller/videoController')
const vodController = require('../controller/vodController')
router.get('/list', videoController.list)
router.get('/getvod', vodController.getvod)
module.exports = router;
