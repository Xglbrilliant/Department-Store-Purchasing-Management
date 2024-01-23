const mysql = require('mysql')

const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ego',
    port:'3306'
})

//封装数据库操作语句 sql语句 参数数组arr  callback成功函数结果
function sqlFun(sql, arr,callback) {
    client.query(sql,arr, function (error, result) {
        if (error) {
            console.log('数据库语句错误');
            return;
        }
        callback(result)
    })
}

module.exports=sqlFun
