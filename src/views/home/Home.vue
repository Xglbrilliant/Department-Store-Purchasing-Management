<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class='num'>{{ numHandle(totalData.saleTotal) }}</div>
        <div class="bottom">今日销售额：{{ numHandle(totalData.sale) }}</div>
      </div>
      <div class="item">总访问量
        <div class='num'>{{ numHandle(totalData.viewsTotal) }}</div>
        <div class="bottom">今日访问量：{{ numHandle(totalData.views) }}</div>
      </div>
      <div class="item">总收藏量
        <div class='num'>{{ numHandle(totalData.collectTotal) }}</div>
        <div class="bottom">今日销售额：{{ numHandle(totalData.collect) }}</div>
      </div>
      <div class="item">总支付量
        <div class='num'>{{ numHandle(totalData.payTotal) }}</div>
        <div class="bottom">今日支付量：{{ numHandle(totalData.pay) }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id='box13'>
        <div class="title">月销售额</div>
        <div id="draw" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div class="title">产品销售比例</div>
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>

    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ orderData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ orderData.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ orderData.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ orderData.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script setup>
import { HomeTotal, getFormat, getOrder } from '@/api/home'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import echarts from '@/plugins/echarts.js'
const totalData = ref({})
const orderData = ref({})

//获取顶部动态数据方法
const getHomeTotal = async () => {
  let res = await HomeTotal();
  console.log('首页获取数据---', res.data);
  totalData.value = res.data.data.list
}
//数据格式----23456 --> 23,456
const numHandle = (value) => {
  if (!value) return;
  return value.toLocaleString();
}
//获取订单动态数据方法
const getTodayOrder = async () => {
  let res = await getOrder();
  console.log('首页订单数据---', res.data);
  orderData.value = res.data.list
}


//获取统计图表数据方法
const getFormatData = async () => {
  let res = await getFormat();
  console.log('首页图表数据---', res.data.result.data.sale_money);
  //数据处理成想要的数据格式  柱状图 折线图=[]    饼图=[{name:'',value:''}]
  let data = res.data.result.data.sale_money;
  let x = [], lineData = [], barData = [], pieData = [];
  data.forEach(ele => {
    x.push(ele.name)
    lineData.push(ele.total_amount)
    barData.push(ele.num)
    pieData.push({ name: ele.name, value: ele.total_amount })
  });
  //调用图表方法绘制
  drawTable(x, lineData, barData)
  //调用饼图绘制
  drawPie(pieData)

}

const drawTable = (data, lineData, barData) => {
  // let myChart = echarts.init(document.getElementById('draw'));
  let dsiab_com = document.getElementById("draw")
  dsiab_com.removeAttribute('_echarts_instance_')
  var myChart = echarts.init(dsiab_com);

  // 绘制图表
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data
    },
    yAxis: {},
    series: [
      {
        name: '销售额',
        type: 'line',
        data: lineData
      },
      {
        name: '销售量',
        type: 'bar',
        data: barData
      }
    ]
  });
}

const drawPie = (data) => {
  // let myChart= echarts.init(document.getElementById('pie'));
  //解决一个charts不渲染的问题 认为dom没有修改
  let dsiab_com = document.getElementById("pie")
  dsiab_com.removeAttribute('_echarts_instance_')
  var myChart = echarts.init(dsiab_com);

  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '销售额',
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}
//进入界面获取数据---生命周期
onMounted(() => {
  getHomeTotal();
  getTodayOrder()
  getFormatData()
})

</script>

<style lang="scss" scoped>
// .home {
//   margin: 10px;
// }

.header {
  display: flex;
  padding-right: 30px;

  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;

    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }

    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }

  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }

  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }

  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }

  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;

  .clearfix {
    margin-bottom: 20px;
  }

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }

  .item {
    text-align: center;
    font-size: 24px;
    color: #333;

    .el-col {
      border-right: 1px solid #eee;

    }

    .el-col:last-child {
      border-right: none;
    }

    .title {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>