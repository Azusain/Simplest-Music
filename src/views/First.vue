<template>
  <div>
    <h1>我是首页</h1>
  </div>
</template>

<script>
  import {getData} from "../api";
  export default {
    name: "First",
    data(){
      return{}
    },
    mounted() {
      getData().then((data) =>{
        console.log(data)
      })
    }
  }
</script>

<style scoped>

</style>
