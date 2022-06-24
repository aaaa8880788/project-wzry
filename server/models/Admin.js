const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String, unique: true },
  //username里面可以加unique: true 表示用户名唯一
  password: { type: String }
})

module.exports = mongoose.model('Admin', schema)