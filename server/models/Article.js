// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  title: { type: String },
  body: { type: String }
},
  {
    // 设置时间戳
    timestamps: true
  })

module.exports = mongoose.model("Article", schema, 'articles')