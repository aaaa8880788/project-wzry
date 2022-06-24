module.exports = app => {
  // 导入mongoose
  const mongoose = require('mongoose')
  // 连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    // useUnifiedTopology: true
  })

  // 将所有初始化的模型都引用一遍
  // 插件require-all的作用就是引用文件夹中所有的文件
  require('require-all')(__dirname + '/../models')
}