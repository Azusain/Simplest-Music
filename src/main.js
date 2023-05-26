import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
// import "./api/mock"
import Cookie from 'js-cookie'

Vue.use(router);
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
/*  console.log("before")
  next()*/
  // 判断token存不存在
  const token = Cookie.get('token')
  if(!token && to.name!=='login'&&to.name!=='regist'){
    next({name:'login'})
  }else if(token && to.name==='login'){
    next({name:'first'})
  }else{
    next()
  }
  // token不存在，说明当前用户是未登录，应该跳转至登录页
  // if (!token && to.name !== 'login' && to.name!=='regist') {
  //   next({ name: 'first' })
  // } else if (token && to.name === 'login'){ // token存在，说明用户登录，此时跳转至首页
  //   next({ name: 'first' })
  // }else if(!token && to.name==='regist'){
  //   next({name:'regist'})
  // }
  // else {
  //   next()
  // }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
