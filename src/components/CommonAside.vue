<template>

  <div>
      <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
      >
      <h5>{{isCollapse ? '物流':'物流管理系统'}}</h5><!--这里对折叠后的状态进行选择-->
       <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class=item.icon></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label" >
        <template slot="title">
          <i :class=item.icon></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>`
  </div>

</template>

<script>
    export default {
      name: "CommonAside",
      data() {
        return {
          menudata:[
            {
              path:"/",
              name:"first",
              label:"首页",
              icon:"el-icon-s-home",
              url:"First",
            },
            {
              path:"/workers",
              name:"workers",
              label:"员工管理",
              icon:"el-icon-s-home",
              url:"Workers",
            },
            {
              path:"/customers",
              name:"customers",
              label:"客户管理",
              icon:"el-icon-s-home",
              url:"Customers",
            },
            {
              label:"仓储管理",
              icon:"el-icon-video-play",
              children:[
                {
                  path:"/warehouse/inventory",
                  name:"inventory",
                  label:"库存清单",
                  icon:"setting",
                  url:"Warehouse/Inventory",
                },
                {
                  path:"/warehouse/inwarehouse",
                  name:"inwarehouse",
                  label:"入库清单",
                  icon:"setting",
                  url:"Warehouse/Inwarehouse",
                },
                {
                  path:"/warehouse/outwarehouse",
                  name:"outwarehouse",
                  label:"出库清单",
                  icon:"setting",
                  url:"Warehouse/Outwarehouse",
                }
              ]
            },
            {
              label: "运输管理",
              icon: "el-icon-video-play",
              children: [
                {
                  path: "/transport/carpossess",
                  name: "carpossess",
                  label: "公司拥有车辆",
                  icon: "setting",
                  url: "Transport/Carpossess",
                },
                {
                  path: "/transport/carusing",
                  name: "car-using",
                  label: "正在运输车辆",
                  icon: "setting",
                  url: "Transport/Carusing",
                }
              ]
            },
            {
              label:"配送管理",
              icon:"el-icon-user",
              children: [
                {
                  path: "/distribution/tasks",
                  name: "tasks",
                  label: "配送任务",
                  icon: "setting",
                  url: "Distribution/Task",
                },
                {
                  path: "/distribution/accidents",
                  name: "accidents",
                  label: "配送事故",
                  icon: "setting",
                  url: "Distribution/Accidents",
                }
              ]
            },
            {
              path:"/package",
              name:"package",
              label:"包装管理",
              icon:"el-icon-s-home",
              url:"Package",
            },
            {
              path:"/finance",
              name:"finance",
              label:"财务管理",
              icon:"el-icon-s-home",
              url:"Finance",
            }
          ]
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        //菜单栏点击事件
        clickMenu(item){
          console.log(item.path)
          if(this.$route.path!==item.path&& !(this.$route.path==='/first'&&(item.path==='/'))) {
            this.$router.push(item.path)

          }

        }
      },
      computed:{
        //没有子菜单
        noChildren(){
          return this.menudata.filter(item => !item.children)
        },
        //有子菜单
        hasChildren(){
          return this.menudata.filter(item => item.children)
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        }
      }

    }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width:200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100vh;
    border-right: none;
    h3{
      color:#fff;
    }
  }
  h5{
    margin-top: 20px;
    margin-bottom: -10px;
    /* display: block; */
    height: 50px;
    text-align: center;
    font-size: 24px;
    color: #fff;
  }
</style>


