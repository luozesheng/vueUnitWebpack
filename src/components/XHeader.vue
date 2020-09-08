<!--渲染模版-->
<template>
    <div class="xwrapper">
        <div class="xheader_title">福建亿榕信息技术有限公司</div>
        <div class="xheader_info">
            <div class="xh_user">{{ userName }}</div>
            <div class="xh_split"></div>
            <div class="xh_user_lg">注销</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.xwrapper {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #32a060;
    justify-content: space-between;
    box-sizing: border-box;

    .xheader_title {
        min-width: 200px;
        height: 50px;
        line-height: 50px;
        color: #ffffff;
        font-size: 24px;
        font-weight: 550;
        padding-left: 20px;
        padding-right: 20px;

    }

    .xheader_info {
        min-width: 160px;
        height: 50px;
        line-height: 50px;
        display: inherit;
        justify-content: flex-end;
        color: #ffffff;

        .xh_user,
        .xh_user_lg {
            min-width: 80px;
            padding-left: 5px;
            padding-right: 5px;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            cursor: pointer;
        }

        .xh_split {
            background-color: #ffffff;
            width: 2px;
            height: 30px;
            position: relative;
            top: 10px;
        }
    }
}
</style>
<!--组件逻辑-->
<script>
export default {
    data() {
        return {
            msg: 'Hello,Webpack',
            userName: "玛丽亚"
        }
    }
}
</script>