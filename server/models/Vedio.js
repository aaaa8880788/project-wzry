// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  name: { type: String },
  icon: { type: String },
  title: { type: String },
  number: { type: String },
  body: { type: String },
  fans: { type: String },
  contribute: { type: String },
}, {
  // 设置时间戳
  timestamps: true
})

module.exports = mongoose.model('Vedio', schema, 'vedios')