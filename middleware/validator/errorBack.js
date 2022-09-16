const {
  validationResult
} = require('express-validator')

// 账号密码效验
module.exports = validator => {
  return async (req, res, next) => {
    await Promise.all(validator.map(validator => validator.run(req)))
    const errors = validationResult(req)
    if (!errors.isEmpty()) { // errors有值说明出现错误
      return res.status(401).json({
        error: errors.array()
      })
    } else {
      next()
    }
  }
}
