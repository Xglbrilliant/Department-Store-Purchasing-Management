const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.static('upload'))

//路由--产品
const router = require('./router')
//订单
const order = require('./order')
//广告
const advert = require('./advert')

app.use('/',router)
app.use('/order',order)
app.use('/advert',advert)


app.listen(6688,()=>{
    console.log(6688);
})
