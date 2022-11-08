export default {
  state:{
    isCollapse: false//控制菜单是展开还是关闭
  },
  mutations:{
    //控制菜单展开还是关闭的方法
    collapseMenu(state){
      state.isCollapse=!state.isCollapse
    }
  }
}

