const fs = require('fs');
const {
  promisify
} = require('util')
const lodash = require('lodash')
const rename = promisify(fs.rename)
const {
  User,
  Subscribe
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
  let id = req.user._id;
  let dbBack = await User.findByIdAndUpdate(id, req.body, {
    new: true
  })
  res.status(202).json({
    user: dbBack
  })
}


// 用户头像的上传
exports.headimg = async (req, res) => {
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


// 关注频道
exports.subscribe = async (req, res) => {
  // res.send(req.params)
  let userId = req.user._id // 自己的id
  let channelId = req.params.userId // 关注人的id
  if (userId === channelId) {
    res.status(401).json({
      err: '不能关注自己'
    })

  } else {
    const record = await Subscribe.findOne({
      user: userId,
      channle: channelId
    })
    if (!record) { // 没有关注
      await new Subscribe({
        user: userId,
        channle: channelId
      }).save()

      let user = await User.findById(channelId) // 找到关注人 给他 ++
      user.subscribeCount++
      await user.save()
      res.status(200).json({
        msg: "关注成功"
      })
    } else {
      res.status(401).json({
        err: "已经订阅了此频道"
      })
    }
  }

}


// 取消关注频道
exports.unsubscribe = async (req, res) => {
  console.log(req.params)
  let userId = req.user._id // 被取消人id
  let channelId = req.params.userId; // 取消人id
  const record = await Subscribe.findOne({
    user: userId,
    channle: channelId
  })
  console.log(record)
  if (record) {
    await record.remove()

    let user = await User.findById(channelId) // 找到关注人 给他 ++
    user.subscribeCount--
    await user.save()
    res.status(200).json({
      msg: "取消关注"
    })
  } else {
    res.status(401).json({
      err: "还没有订阅此频道"
    })
  }
}

// 获取频道信息
exports.getuser = async (req, res) => {
  let isSubscribe = false
  if (req.user) {
    const record = await Subscribe.findOne({
      channle: req.params.userId,
      user: req.user._id
    })
    if (record) {
      isSubscribe = true
    }
  }

  let user = await User.findById(req.params.userId)
  // user.isSubscribe = isSubscribe
  res.status(200).json({
    ...lodash.pick(user, [
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channeldes'
    ]),
    isSubscribe
  })
}


// 粉丝列表
exports.getsubscribe = async (req, res) => {
  let subscribeList = await Subscribe.find({
    user: req.params.userId
  }).populate('channle')
  subscribeList = subscribeList.map(item => {
    return lodash.pick(item.channle, [
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channeldes'
    ])
  })
  res.status(200).json(subscribeList)
}

// 关注列表
exports.getchannel = async (req, res) => {
  let channleList = await Subscribe.find({
    channle: req.user._id
  }).populate('user')
  channleList = channleList.map(item => {
    return lodash.pick(item.user, [
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channeldes'
    ])
  })
  res.status(200).json(channleList)
}
