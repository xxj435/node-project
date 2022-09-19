const mongoose = require('mongoose')
const md5 = require('../utils/md5')
const baseModel = require('./baseModel')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value), // md5 加密
    select: false
  },
  image: {
    type: String,
    default: null
  },
  cover: {
    type: String,
    default: null
  },
  channeldes: {
    type: String,
    default: null
  },
  subscribeCount: {
    type: Number,
    default: 0
  },
  ...baseModel
})

module.exports = userSchema;
