const {
  body
} = require('express-validator')
const validator = require('./errorBack')
const {
  User
} = require('../../model/index')
module.exports.register = validator([
  body('username')
  .notEmpty()
  .withMessage('用户名不能为空')
  .isLength({
    min: 3
  }).bail()
  .withMessage('用户名长度不能小于3'),
  body('email').notEmpty().withMessage('邮箱不能为空').bail().isEmail().withMessage('邮箱格式不正确').bail()
  .custom(async val => {
    // 从数据库中查找有没有该邮箱
    const emailValidate = await User.findOne({
      email: val
    });
    console.log(emailValidate)
    if (emailValidate) {
      return Promise.reject('邮箱已被注册')
    }
  }).bail(),
  body('phone').notEmpty().withMessage('手机号不能为空').bail()
  .custom(async val => {
    // 从数据库中查找有没有该手机号
    const phoneValidate = await User.findOne({
      phone: val
    });
    console.log(phoneValidate)
    if (phoneValidate) {
      return Promise.reject('手机号已被注册')
    }
  }).bail()
])

module.exports.login = validator([
  body('email').notEmpty().withMessage('邮箱不能为空').bail().isEmail().withMessage('邮箱格式不正确').bail().custom(async val => {
    console.log(val);
    // 从数据库查找有没有该邮箱
    const emailValidate = await User.findOne({
      email: val
    })
    if (!emailValidate) {
      return Promise.reject('邮箱未注册')
    }
  }),
  body('password').notEmpty().withMessage('密码不能为空').bail()
  .isLength({
    min: 3
  }).withMessage('密码长度不能小于3').bail()
])

module.exports.update = validator([
  body('email').isEmail().withMessage('邮箱格式不正确').bail().custom(async val => {
    console.log(val);
    // 从数据库查找有没有该邮箱
    const emailValidate = await User.findOne({
      email: val
    })
    if (emailValidate) {
      return Promise.reject('邮箱已注册')
    }
  }).bail(),

  body('username').custom(async val => {
    console.log(val);
    // 从数据库查找有没有该邮箱
    const emailValidate = await User.findOne({
      email: val
    })
    if (emailValidate) {
      return Promise.reject('用户已注册')
    }
  }).bail(),

  body('phone').custom(async val => {
    console.log(val);
    // 从数据库查找有没有该邮箱
    const emailValidate = await User.findOne({
      email: val
    })
    if (emailValidate) {
      return Promise.reject('手机已注册')
    }
  }).bail(),
])
