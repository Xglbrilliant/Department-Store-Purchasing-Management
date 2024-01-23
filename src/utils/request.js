import axios from 'axios'
import qs from 'querystring'
const instance = axios.create({
    baseURL:process.env.NODE_ENV=='production'?process.env.VUE_APP_BASE_API:'',
    timeout: 5000,
})

instance.interceptors.request.use(function (config) {
    if(config.method =='post'){
        config.data = qs.stringify(config.data)
    }
    // 在发送请求之前做些什么--对post请求参数 处理字符串拼接
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    console.log('error',error);
    // 对响应错误做点什么
    const { response } = error;
    //response.status 错误状态   500 服务器错误  response.info 信息提示
    errorHandle(response.status,response.info)
    // return Promise.reject(error);
});

//错误响应处理提示信息
function errorHandle(status,info){
    switch(status){
        case 400:
            console.log("400-表示请求报文中存在语法错误");
            break;
        case 401:
            console.log("401-未经许可，需要通过HTTP认证");
            break;
        case 403:
            console.log("403-服务器拒绝该次访问（访问权限出现问题）");
            break;
        case 404:
            console.log("404-表示服务器上无法找到请求的资源");
            break;
        case 500:
            console.log("500-表示服务器在执行请求时发生了错误");
            break;
        case 503:
            console.log("503-表示服务器暂时处于超负载或正在进行停机维护");
            break;
        case 504:
            console.log("504-（网关超时）  服务器作为网关或代理，但是没有及时从上游服务器收到请求");
            break;
        default:
            console.log(info);
            break;
    }
}

export default instance
