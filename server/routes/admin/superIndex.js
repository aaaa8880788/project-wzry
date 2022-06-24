// 该页面是改进过的，将增删改查接口改成通用接口
module.exports = app => {
  // 导入express模块
  const express = require('express')
  // 实例路由对象
  const router = express.Router({
    // 这里表示合并url参数
    // 因为下面app.use中使用到了url参数，正常来说只能在app.use里面的中间件使用req.params.resource
    mergeParams: true
  })
  // 导入创建的模型,其实就是表Category的意思，对它进行操作
  // const Category = require('../../models/Category')
  // 后面改为通用模型方式，所以注释掉

  // 用这个包来生成 Token 字符串
  const jwt = require('jsonwebtoken')
  // 导入jwtSecretKey    
  const { jwtSecretKey } = require('../../jwtSecretKey')
  // 用这个报来解析Token
  const expressJWT = require('express-jwt')
  // 解析jwt
  app.use(expressJWT({
    secret: jwtSecretKey,
    algorithms: ['HS256']
  }).unless({
    path: ['/admin/api/login', '/admin/api/reguser']
  }))


  // 导入解析 formadata 格式表单数据的包
  const multer = require('multer')
  // 导入处理路径的核心模块
  const path = require('path')
  // 导入创建的模型,其实就是表Admin的意思，对它进行操作
  const Admin = require('../../models/Admin')
  // 导入密码处理模块(加密)
  const bcrypt = require('bcryptjs')


  // 定义路由规则
  // 1.新建分类
  router.post('/', async (req, res) => {
    const data = req.body
    const model = await req.Model.create(data)
    // console.log(model);
    res.send(model)
  })
  // 2.获取分类列表 
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'categories'
    }
    if (req.Model.modelName === 'Vedio') {
      queryOptions.populate = 'categories'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    // const items = await req.Model.find().populate('parent')
    res.send(items)
  })
  // 3.根据id获取详情信息
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 4.根据id更新详情信息
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      message: '更新成功！',
    })
  })
  // 5.根据id删除相应详情信息
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      message: '删除成功！'
    })
  })


  // 使用路由
  app.use('/admin/api/rest/:resource', (req, res, next) => {
    // 这里的原因是获取将请求的url->categories(复数)转成Category(首字母大写单数)
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)


  // 定义上传图片路由，它不属于通用CRUD接口,用传统定义路由方法


  // 创建multer的实例对象，通过dest属性指定文件的存放路径
  const upload = multer({
    dest: path.join(__dirname, '../../uploads')
  })

  // upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
  // 将文件类型的数据，解析并挂载到 req.file 属性中
  // 将文本类型的数据，解析并挂载到 req.body 属性中

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 定义注册登录路由

  // 1.注册模块

  app.post('/admin/api/reguser', async (req, res) => {
    const data = req.body
    // 根据用户名查找用户
    const user = await Admin.findOne({ username: data.username })
    if (user) {
      return res.send({
        message: '用户已存在，请重新输入用户名'
      })
    }
    console.log(data);
    data.password = bcrypt.hashSync(data.password, 10);
    console.log(data);
    const model = await Admin.create(data)
    console.log(model);
    res.send({
      ...model,
      status: 'Ok',
      message: '注册成功！'
    })
  })

  // 2.获取用户信息
  app.get('/admin/api/userInfo', async (req, res) => {
    const userInfo = await Admin.find()
    res.send(userInfo)
  })

  // 3.根据id获取用户信息模块
  app.get('/admin/api/userInfo/:id', async (req, res) => {
    const model = await Admin.findById(req.params.id)
    res.send(model)
  })

  // 4.根据id删除用户信息模块
  app.delete('/admin/api/userInfo/:id', async (req, res) => {
    await Admin.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 5.根据id更新用户密码
  app.put('/admin/api/userInfo/:id', async (req, res) => {
    const { username, password, oldPassword, newPassword } = req.body
    // 将用户输入的旧密码与数据库旧密码进行比较
    const compareResult = bcrypt.compareSync(password, oldPassword)
    if (!compareResult) {
      res.send({
        success: false,
        message: '旧密码输入错误,请重新输入!'
      })
    } else {
      // 将新密码进行加密并更新数据库数据
      const pwd = bcrypt.hashSync(newPassword, 10)
      const UpdateUserInfo = {
        username: username,
        password: pwd
      }
      const model = await Admin.findByIdAndUpdate(req.params.id, UpdateUserInfo)
      res.send(model)
    }

  })

  // 6.登录模块
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body

    // 1.根据用户名找用户
    const user = await Admin.findOne({ username })
    if (!user) {
      // 如果查询到结果为空，说明该用户不存在，主动向客户端抛出错误422，内容为用户不存在，因为客户端接受到的请求status>=300 就会报错
      return res.send({
        message: '用户不存在！'
      })
    }
    // console.log(user);

    // 2.校验密码
    const isValid = bcrypt.compareSync(password, user.password)

    if (!isValid) {
      return res.send({
        message: '用户名或密码错误！'
      })
    }

    // 3.返回token
    // 生成 Token 字符串
    const tokenStr = jwt.sign({ id: user._id }, jwtSecretKey, {
      expiresIn: '10h', // token 有效期为 10 个小时
    })
    res.send({
      message: '登录成功！',
      status: "Ok",
      token: 'Bearer ' + tokenStr
    })
  })
}