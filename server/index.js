const express = require('express')
const path = require('path')

const app = express()

// 解决跨域
app.use(require('cors')())
// 解析json
app.use(express.json())

// 使用 `express.static()` 中间件，将 `uploads` 目录中的图片托管为静态资源
// 托管静态资源文件
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/admin', express.static(path.join(__dirname, './admin')))
app.use('/', express.static(path.join(__dirname, './web')))



// 引用数据库
require('./plugins/db')(app)
// 引用客户端web路由
require('./routes/web/index')(app)
// 引用服务端admin路由
require('./routes/admin/superIndex')(app)


// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('invalid token...');
  }
  // 未知错误
  res.send(err)
})


app.listen(3000, () => {
  console.log('http://localhost:3000');
})