<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ totalData.saleTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.sale | num }}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{ totalData.viewsTotal | num }}</div>
        <div class="bottom">今日访问量：{{ totalData.views | num }}</div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{ totalData.collectTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.collect | num }}</div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{ totalData.payTotal | num }}</div>
        <div class="bottom">今日支付量：{{ totalData.pay | num }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div class="title">产品销售比例</div>
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>

    <!-- 3.  -->
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
              <div>{{ orderData.curOrderCount | num }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.curCollect | num }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ orderData.curMoney | num }}</div>
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
              <div>{{ orderData.orderCount | num }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.collect | num }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ orderData.money | num }}</div>
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

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      totalData: {}, //首页数据统计
      orderData: {}, //首页订单信息
    };
  },
  created() {
    // console.log('mounted-id', document.getElementById('charts'));  //null
    this.totalInfo();
    this.orderinfo();
    this.format();
  },
  mounted() {
    //最早获取DOM元素的生命周期函数 挂载完毕
    // console.log('mounted-id', document.getElementById('charts'));
    // this.line();
    //带参数就error 
    // 原因猜测：此时仅仅只读取到了同步函数，但是并未读取到方法中的异步函数，所以无法获得异步函数中传出的参数值？？？right or false??
    // this.line2(arrX, yarr1, yarr2);  
    // this.pie(pieData);  //带参数就error
  },
  methods: {
    //获取数据统计
    async totalInfo() {
      let res = await this.$api.totalInfo();
      // console.log('首页统计信息', res.data.data.list);
      this.totalData = res.data.data.list;
    },
    //获取今日订单统计信息
    async orderinfo() {
      let res = await this.$api.orderinfo();
      // console.log('获取今日订单统计信息', res.data)
      this.orderData = res.data.list;
    },
    //获取图表动态数据
    async format() {
      let res = await this.$api.format();
      // console.log(res.data);
      // console.log('获取图表动态数据----',res.data.result.data.sale_money);
      let arr = res.data.result.data.sale_money, arrX = [], yarr1 = [], yarr2 =[];  
      let pieData = [];  
      arr.forEach(item => {
        //柱状图和折线图的横纵数据
        arrX.push(item.name);
        yarr1.push(item.num);
        yarr2.push(item.total_amount);
        //饼状图的数据
        let obj = {};  //注意作用域，这个obj不能放在arr.forEach()外面
        obj.name = item.name;
        obj.value = item.total_amount;
        // console.log(obj);
        pieData.push(obj);
        // console.log(pieData);
      });
      this.line2(arrX, yarr1, yarr2);
      this.pie(pieData);
    },
    //
    //绘制图表--折线  其中line方法仅做说明使用
    line() {
      let myChart = echarts.init(document.getElementById("charts"));
      myChart.setOption({
        // title: {//标题组件，包含主标题和副标题
        //   text: 'ECharts 入门示例'
        // },
        tooltip: {//提示框组件
          trigger: 'axis',
          //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
          // formatter:'{a}-{b}-{c}'
        },
        xAxis: {//x轴数据
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          // axisLine: {//坐标轴轴线相关设置
          //   lineStyle: {
          //     color: 'skyblue',//坐标轴线线的颜色
          //   }
          // },
          // axisTick: {//坐标轴刻度相关设置
          //   alignWithLabel: true
          // }
        },
        yAxis: {//y轴会自动创建数据
        },
        series: [//图表内容
          {
            name: '销量',
            type: 'line',//bar 柱状图  line 折线图  pie饼图  map地图
            data: [5, 20, 66, 10, 10, 20],
            // label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
            //   show: true
            // },
            // labelLine: {
            //   lineStyle: {
            //     color: '#ff5555'
            //   }
            // },
            // itemStyle: {
            //   color: '#ff5555'
            // },
            // lineStyle: {
            //   color: '#ff5555'
            // },
            // smooth: true,//是否平滑曲线显示
          }
        ]
      });
    },
    line2(arrX, yarr1, yarr2) {
      let myChart = echarts.init(document.getElementById("charts"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          data: arrX,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar", //bar 柱状图  line 折线图  pie饼图  map地图
            data: yarr1,
            smooth: true, //是否平滑曲线显示
          },
          {
            name: "销量额",
            type: "line", 
            data: yarr2,
            smooth: true, 
          },
        ],
      });
    },
    pie(pieData) {
      let myChart = echarts.init(document.getElementById("pie"));
      let option;
      option = {
        tooltip: {
          trigger: 'item',
          formatter:'{a}<br/>{b}:{d}%'
        },
        legend: {
          top: "80%",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "产品销售额",
            type: "pie",
            radius: [30, 80],
            center: ["50%", "45%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 0,
            },
            data: pieData,
            emphasis: {//高亮配置 
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  filters: {
    num(value) {
      //eg: 23466 -- 23,466
      if (!value) return;
      return value.toLocaleString(); //toLocaleString()可以用来格式化
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin: 30px 10px;
}
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
    // .title {
    //   text-align: center;
    // }
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
  // 下方统计订单样式
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