const mongoose = require('mongoose')
const {
  mongopath
} = require('../config/config.default')
const main = async () => {
  await mongoose.connect(mongopath)
}

main().then(res => {
  console.log('mongo连接成功');
}).catch(err => {
  console.log('mongo连接失败');
})

module.exports = {
  User: mongoose.model('User', require('./userModel')),
  Video: mongoose.model('Video', require('./videoModel')),
  Subscribe: mongoose.model('Subscribe', require('./subscribeModel')),
}
