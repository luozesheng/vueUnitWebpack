<!--渲染模版-->
<template>
  <div class="wrapper">
    主页aaaaaaa
    <DatePicker @change="changeDate"/>
  </div>
</template>
<!--组件逻辑-->
<script>
  import { DatePicker } from 'ant-design-vue';
  export default {
    name: "Home",
    data() {
      return {
        msg: 'Hello,Webpack',
        userName: "玛丽亚"
      }
    },
    components:{
      DatePicker
    },
    methods:{
      changeDate(v){
        console.log('aaaa', v);
      },
    },
  }
</script>
<style lang="less" scoped>
  .wrapper{
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .xheader_title{
      width: 50%;
      height: 50px;
      line-height: 50px;
      color: #999999;
      font-size: 16px;
      font-weight: 550;
    }
  }
</style>