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
    expiresIn: 60 * 60
  })
}


// 验证token
module.exports.verfiyToken = async (req, res, next) => {
  console.log(req.headers)
  let token = req.headers.authorization
  if (!token) {
    res.status(402).json({
      error: "请传入token"
    })
  }
  try {
    let userinfo = await verfiy(token, uuid);
    req.user = userinfo
    next();
  } catch (err) {
    res.status(402).json({
      error: "无效token"
    })
  }

}
