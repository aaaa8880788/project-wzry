// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },
  // ref的作用是关联Category表
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  category: { type: String }
})

// 调用关联的子分类
schema.virtual('children', {
  localField: '_id',
  ref: 'Category',
  foreignField: 'parent',
  justOne: false
})

// 调用关联的子分类
schema.virtual('newsList', {
  localField: '_id',
  ref: 'Article',
  foreignField: 'categories',
  justOne: false
})

// 调用关联的子分类
schema.virtual('heroList', {
  localField: '_id',
  ref: 'Hero',
  foreignField: 'categories',
  justOne: false
})

// 调用关联的子分类
schema.virtual('vedios', {
  localField: '_id',
  ref: 'Vedio',
  foreignField: 'categories',
  justOne: false
})




module.exports = mongoose.model("Category", schema)