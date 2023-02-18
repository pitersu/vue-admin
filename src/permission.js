import router from './router'
import store from './store'
// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 要从哪里来
 * @param {*} next 是否要去
 */
router.beforeEach((to, from, next) => {
  // 存在 token ，进入主页
  // if (store.state.user.token) {
  // 快捷访问
  if (store.getters.token) {
    // 1.用户已登录，则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
