<!--渲染模版-->
<template>
  <div class="wrapper">
    主页aaaaaaa
  </div>
</template>
<!--组件逻辑-->
<script>

export default {
  name: "Home",
  data() {
    return {
      msg: 'Hello,Webpack',
      userName: "玛丽亚"
    }
  },
  components: {
    DatePicker
  },
  methods: {
    changeDate(v) {
      console.log('aaaa', v);
    },
  },
}
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

}
</style>