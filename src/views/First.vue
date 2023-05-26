<template>
  <div class="total">

    <div class="together">
      <div class="title">
        <span>作业完成情况</span>
      </div>
      <div ref="echarts3" style="height: 280px" class="employee">

      </div>
      <div class="title">
        <span>考试平均分</span>
      </div>
      <div ref="echarts2" style="height: 280px" class="money">

      </div>

    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import {maketotal, totalIndent} from "../api";
  export default {
    name: "",
    data(){
      return{
        name:'',
        videoData: [],
        userData:[]
      }
    },

    /*是通过调用maketotal和totalIndent两个接口获取[name:###,value:$$$]这样的数组格式*/
    mounted() {
      maketotal().then((res)=>{
        this.videoData.push(res.data)
        const echarts3 = echarts.init(this.$refs.echarts3)/*获取实例*/
        console.log(")))))))))))))))"+res.data.map(item => item.value))
        const eachrts3Option = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: res.data,
              type: 'pie'
            }
          ],
        }
        echarts3.setOption(eachrts3Option)
      })

      totalIndent().then((res)=>{
        console.log(")))))))))))))))"+res.data.map(item => item.name))
        this.userData.push(res.data)
        const echarts2 = echarts.init(this.$refs.echarts2)
        const eachrts2Option = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "平均分",
          },
          xAxis: {
            type: "category", // 类目轴
            data: res.data.map(item=>item.name),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [

            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: '平均分',
              data: res.data.map(item => item.value),
              type: 'bar'
            }]
        }
        echarts2.setOption(eachrts2Option)
      })



    }
  }
</script>

<style scoped>
/*  .total{
    !*图片地址 不重复 水平位置居中 垂直位置居中*!
    background: url(backPicture.png) no-repeat center center;
    height: 100%;
    width: 100%;
    !*把背景图片放大到适合元素容器的尺寸，图片比例不变*!
    background-size: auto;
    position: fixed;
  }*/
  body{
    background: #3a8ee6;
  }
  .title{
    height: 30px;
    width: 600px;
  }
  span{
    font-size: 20px;
    color:rebeccapurple;
  }
  .together{
    height: 400px;
    width: 600px;
  }

</style>
