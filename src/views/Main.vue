<template>
   <div>
     <el-container>
       <el-aside width="auto">
         <common-aside/>
       </el-aside>
       <el-container>
         <el-header>
         <Header/>
         </el-header>
         <el-main>
           <router-view></router-view>
         </el-main>
       </el-container>
     </el-container>
   </div>
</template>

<script>
    import CommonAside from '../components/CommonAside.vue'
    import Header from "./Header";
    export default {
        name: "Main",
        components:{
          CommonAside,
          Header
        }
    }
</script>

<style scoped>
  .el-header{
    padding: 0px;
  }
</style>
