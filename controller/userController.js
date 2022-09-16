const fs = require('fs');
const {
  promisify
} = require('util')
const rename = promisify(fs.rename)
const {
  User
} = require('../model/index')

const {
  createToken
} = require('../utils/jwt')
exports.list = async (req, res) => {
  console.log(req.user);
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.method);
  res.send('/delete')
}

// 注册
exports.register = async (req, res) => {
  console.log(req.body)
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  user = dbBack.toJSON()
  delete user.password
  res.status(201).json(user);
}

// 登录
exports.login = async (req, res) => {
  // 客户端验证
  let dbBack = await User.findOne(req.body);
  console.log(dbBack)
  // 链接数据库查询
  if (!dbBack) {
    res.status(402).json({
      error: "邮箱或者密码不正确"
    })
  }

  dbBack = dbBack.toJSON()
  dbBack.token = await createToken(dbBack)
  res.status(200).json(dbBack);
}


// 修改
exports.update = async (req, res) => {
  let id = req.user.userinfo._id;
  let dbBack = await User.findByIdAndUpdate(id, req.body, {
    new: true
  })
  res.status(202).json({
    user: dbBack
  })
}


// 用户头像的上传
exports.headimg = async (req, res) => {
  console.log(req.file);
  let fileArr = req.file.originalname.split('.')
  let filetype = fileArr[fileArr.length - 1]
  try {
    rename('./public/' + req.file.filename, './public/' + req.file.filename + '.' + filetype)
    res.status(201).json({
      filepath: req.file.filename + '.' + filetype,
      msg: '上传成功'
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}
