const jwt = require('jsonwebtoken')
const {
  promisify
} = require('util')
const tojwt = promisify(jwt.sign)
const verfiy = promisify(jwt.verify)
const {
  uuid
} = require('../config/config.default')
// 用户信息生成token
module.exports.createToken = async (userinfo) => {
  return await tojwt(userinfo, uuid, {
    expiresIn: 60 * 60 * 24
  })
}


// 验证token
module.exports.verfiyToken = function (required = true) {
  return async (req, res, next) => {
    let token = req.headers.authorization
    if (token) { // 有token
      try { // 去解码 如果解码成功 放行
        let userinfo = await verfiy(token, uuid);
        req.user = userinfo
        next();
      } catch (err) { // 解码失败
        res.status(402).json({
          error: "无效token"
        })
      }

    } else if (required) { // 验证该页面是否需要传递token
      res.status(402).json({
        error: "请传入token"
      })
    } else {
      next()
    }


  }
}
