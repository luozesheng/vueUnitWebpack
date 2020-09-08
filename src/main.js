import Vue from 'vue'
import App from './App.vue'
import router from "./routes/index"
import 'lib-flexible/flexible';//在入口文件引入然后运行
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
