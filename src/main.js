import Vue from 'vue'
import App from '@/views/app.vue'
import router from '@/router/index'
import iView from 'iview';
import store from '@/store';
import 'iview/dist/styles/iview.css';
//总线管理
let bus = new Vue(); 
Vue.use(iView)

var vm = new Vue({
  el: '#app',
  router,
  data:{
  	bus
  },
  store,
  render: h => h(App)
})
window.inHospVM = vm;

