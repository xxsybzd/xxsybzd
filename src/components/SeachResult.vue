<template>
  <!-- 搜索结果 -->
  <div class="seachResult">
    <van-nav-bar left-arrow @click-left="$emit('getRes', '')" />
    <ul>
      <li>
        <classhify-msg :books="book"></classhify-msg>
      </li>
    </ul>
  </div>
</template>
<script>
import ClasshifyMsg from "./ClasshifyMsg.vue";
export default {
  props: ["value"],
  data() {
    return {
      book: [],
    };
  },
  components: {
    ClasshifyMsg,
  },
  methods: {
    async getseachRes(title) {
      let res = await this.axios.get(`v1/search/topic?q=${title}&f=3&size=18`);
      this.book = res.hit;
      console.log(this.book);
    },
  },
  mounted() {
    this.getseachRes(this.value);
  },
};
</script>
<style lang='less' scoped>
</style>
