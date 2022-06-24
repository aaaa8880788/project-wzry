module.exports = app => {
  // 导入express模块
  const express = require('express')
  // 实例路由对象
  const router = express.Router()

  // 导入分类模型
  const Category = require('../../models/Category')
  // 定义路由规则
  // 1.新建分类
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    // console.log(model);
    res.send(model)
  })
  // 2.获取分类列表
  router.get('/categories', async (req, res) => {
    const items = await Category.find().populate('parent').limit(10)
    res.send(items)
  })
  // 3.根据id获取详情信息
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  // 4.根据id更新详情信息
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 5.根据id删除相应详情信息
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 3.导入英雄模型
  const Hero = require('../../models/Hero')
  // 定义路由规则
  // 1.新建英雄
  router.post('/heros', async (req, res) => {
    const model = await Hero.create(req.body)
    res.send(model)
  })
  // 2.获取英雄列表
  router.get('/heros', async (req, res) => {
    const items = await Hero.find().limit(10)
    res.send(items)
  })
  // 3.根据id获取详情信息
  router.get('/heros/:id', async (req, res) => {
    const model = await Hero.findById(req.params.id)
    res.send(model)
  })
  // 4.根据id更新详情信息
  router.put('/heros/:id', async (req, res) => {
    const model = await Hero.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 5.根据id删除相应详情信息
  router.put('/heros/:id', async (req, res) => {
    const model = await Hero.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 使用路由
  app.use('/admin/api', router)
}