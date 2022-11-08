import Vue from 'vue'
import Vuex from 'vuex'
import tab from "./tab";

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{//将菜单合并的方法进行挂载，接着需要在main.js进行调用才真正使用这个方法
    tab
  }
})
