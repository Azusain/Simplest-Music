import Cookie from 'js-cookie'
export default {
  state:{
    isCollapse: false,//控制菜单是展开还是关闭
    menu: []
  },
  mutations:{
    //控制菜单展开还是关闭的方法
    collapseMenu(state){
      state.isCollapse=!state.isCollapse
    },
    // 设置menu的数据
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      // 组装动态路由的数据
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            console.log(item.url)
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          console.log(item.url)
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      console.log(menuArray, 'menuArray')
      // 路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main',item)
      })

    }

  }
}

