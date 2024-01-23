/* 
首页接口
*/
import request from '@/utils/request'

//定义接口
export const host ='http://localhost:6688';//代理请求

const homeTotal ='/api/home/dataCount';//统计数据
const format='/api/home/format';//折线图
const order='/api/home/orderinfo';//今日订单数据

//定义方法
export function HomeTotal(){
    return request.get(homeTotal)
}

export function getFormat(){
    return request.get(format)
}

export function getOrder(){
    return request.get(order)
}
