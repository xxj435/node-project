const {
  body
} = require('express-validator')
const validator = require('./errorBack')
const {
  User
} = require('../../model/index')

module.exports.videoValidator = validator([
  body('title')
  .notEmpty()
  .withMessage('视频名不能为空')
  .isLength({
    max: 20
  }).withMessage('视频名长度不能大于20').bail(),
  body('vodvideoId')
  .notEmpty()
  .withMessage('vodvideoId不能为空').bail()
])
