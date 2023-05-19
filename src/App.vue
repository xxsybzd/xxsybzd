<template>
  <div id="app">
    <van-tabbar v-model="active" route v-if="!$route.meta.hideTab">
      <van-tabbar-item
        class="iconfont icon-shujia"
        name="bookshelf"
        to="bookshelf"
        >书架</van-tabbar-item
      >
      <van-tabbar-item class="iconfont icon-shuben" name="Book Town" to="/index"
        >书城</van-tabbar-item
      >
      <van-tabbar-item
        class="iconfont icon-fenlei"
        name="classify"
        to="/classify"
        >分类</van-tabbar-item
      >
      <van-tabbar-item class="iconfont icon-wode" name="my" to="my"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "Book Town",
    };
  },
};
</script>
<style lang="less">
#app {
  height: 100vh;
}
</style>
