<!--渲染模版-->
<template>
    <div class="xfooter" v-model="name">{{name}}</div>
</template>
<style lang="less" scoped>
.xfooter {
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: fixed;
    bottom: 0px;
    box-shadow: 5px 0px 0px #c2c2c2;
    color: #a3a3a3;
    background-color: rgba(220,220,220,0.9);
    text-align: center;
}
</style>
<!--组件逻辑-->
<script>
export default {
    data() {
        return {
            name: '福建亿榕信息技术有限公司'
        }
    }
}
</script>