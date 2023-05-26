<template>

  <div class="Aside">
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             text-color="#fff"
             active-text-color="#ffd04b"
    >
      <h5>{{isCollapse ? '教学':'后台教学管理系统'}}</h5><!--这里对折叠后的状态进行选择-->
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class=item.icon></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.name" >
        <template slot="title">
          <i :class=item.icon></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>`
  </div>

</template>

<script>
  import Cookie from 'js-cookie'
  export default {
    name: "CommonAside",
    data() {
      return {};
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
      menudata(){
        //如果缓存中没有，从当前store中获取
        console.log(this.$store.state.tab.menu)
        return JSON.parse(Cookie.get('menu'))||this.$store.state.tab.menu
        /*return this.menudata1*/
      },
      isCollapse(){
        return this.$store.state.tab.isCollapse
      }
    }

  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width:210px;
    min-height: 400px;
  }
  span{
    font-size: 17px;
  }
  ul{
    background: linear-gradient(to bottom, rgba(130, 228, 199),  rgba(65, 153, 234));
    border: 2px solid #fff;
    border-radius: 10px 10px 10px 10px ;
    box-shadow: 20px 20px 11px 2px #333;
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


