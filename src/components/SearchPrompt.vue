<template>
  <!-- 搜索提示 -->
  <div class="seachHint">
    <ul>
      <li
        v-for="(item, index) in hintItem"
        :key="index"
        @click="$emit('getRes', item.title)"
        v-html="item.active"
      ></li>
    </ul>
    <van-loading
      type="spinner"
      color="#1989fa"
      class="loading"
      v-if="hintItem.length == 0"
    />
  </div>
</template>
<script>
export default {
  name: "seachHint",
  props: ["value"],
  data() {
    return {
      hintItem: [],
    };
  },
  methods: {
    async getSeachHint(hint) {
      let res = await this.axios.get(
        `v1/search/suggestion_topic_author?q=${hint}&type=2&f=2`
      );
      this.hintItem = res.info;
      //文字高亮
      this.hintItem.forEach((v) => {
        // let str = v.title.replaceAll(
        //   `<span class="light">${hint}</span>`,
        //   v.title
        // );
        let str = v.title.replaceAll(
          hint,
          `<span style="color:green">${hint}</span>`
        );
        v.active = str;
      });
    },
  },
  computed: {},
  mounted() {
    this.getSeachHint(this.value);
  },
  watch: {
    value() {
      this.getSeachHint(this.value);
    },
  },
};
</script>
<style lang='less' scoped>
.seachHint {
  ul {
    li {
      padding: 10px;
      padding-left: 20px;
      border-bottom: 1px solid #ccc;
    }
  }
  .loading {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
