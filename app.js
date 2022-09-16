const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const app = express()

// 解析客户端请求
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public')) // 处理静态资源
app.use(cors())
app.use(morgan('dev'))

const PORT = process.env.PORT || 3000

// 挂载路由
app.use('/api/v1', router)

// 挂载统一处理服务端错误中间件
// app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
