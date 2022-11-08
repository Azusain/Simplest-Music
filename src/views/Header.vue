<template>
    <div class="content-header">
      <div class="left-header">
        <el-button  @click="clickFold" icon="el-icon-menu" size="mini"></el-button>
        <span class="text">首页</span>
      </div>
      <div class="right-header">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../login.jpg" class="user">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>系统反馈</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
          return{}
        },
        methods:{
          clickFold(){
            this.$store.commit('collapseMenu')
          }
        }
    }
</script>

<style lang="less" scoped>
  .content-header{
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .text{
      color:#fff;
      font-size: 14px;
      margin-left: 10px;
    }
    .right-header{
      .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }

  /*.left-header{
    display: inline-block;
    height: 60px;
  }
  .right-header{
    display: inline-block;
    float: right;

  }
  .el-dropdown{
    margin-top: 10px;
    margin-right: 20px;
  }
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }*/

</style>
