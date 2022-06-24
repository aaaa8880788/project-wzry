// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },
  banner: { type: String },
  avatar: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    cd: { type: String },
    cost: { type: String },
    descripton: { type: String },
  }],
  items1: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
  ],
  items2: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  ],
  mingwens: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Mingwen' },
  ],
  usageTip: { type: String },
  battleTip: { type: String },
  teamTip: { type: String },
  partners: [{
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    name: { type: String },
    descripton: { type: String }
  }],
  skilladvice: {
    skill1: {
      name: { type: String },
      icon: { type: String },
    },
    skill2: {
      name: { type: String },
      icon: { type: String },
    },
    superskill1: {
      name: { type: String },
      icon: { type: String },
    },
  },
})

module.exports = mongoose.model('Hero', schema)