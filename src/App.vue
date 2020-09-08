<!--渲染模版-->
<template>
    <div class="wrapper">
        <XHeader />
        <router-view></router-view>
        <XFooter />
    </div>
</template>
<style lang="less" scoped>
/* @import "./index.less"; */
.wrapper{
  width: 100%;
  height: 100%;
}
</style>
<!--组件逻辑-->
<script>
import XHeader from './components/XHeader.vue';
import XFooter from './components/XFooter.vue';
export default {
    data() {
        return {
            msg: 'Hello,Webpack'
        }
    },
    components: {
        XHeader,
        XFooter
    },
}
</script>