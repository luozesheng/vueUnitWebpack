import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/layoutSide'
import Home from '@/views/home'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
let router = new Router({
  base: '/',
  routes: [
    {
        path: '/',
        component: Index,
        redirect: "/home",
        children: [
          {
            path: '/home',
            component: Home
          },
        ]
    },
    
  ]
})
router.beforeEach( ( to, from, next ) => {
  
  let vm = window.inHospVM;
  if( vm !== undefined ){

  }
  next();
})
export default router;
//添加bus总线解除绑定处理工具类
let utils = {
  offBus(vm){

  }
};