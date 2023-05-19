<template>
  <!-- 书城的内容 -->
  <div class="index">
    <van-search
      placeholder="搜索作品、作者、一搜就有"
      background="skyblue"
      disabled
      @click="$router.push('seach')"
      shape="round"
    ></van-search>
    <van-tabs v-model="active" animated duration="0.5">
      <!-- <van-tab title="今天" v-if="classify.length !== 0"> </van-tab> -->
      <van-tab v-for="item in classify" :key="item.tag_id" :title="item.title">
        <classhify-msg :books="books"></classhify-msg>
      </van-tab>
    </van-tabs>
    <div
      class="addContent"
      v-if="!bottomOut && books.length != 0"
      @click="clickBottom"
    >
      加载更多
    </div>
    <van-loading
      type="spinner"
      color="#1989fa"
      class="addContent"
      v-if="bottomOut && books.length != 0"
    />
    <div class="toTop"></div>
  </div>
</template>
<script>
import ClasshifyMsg from "@/components/ClasshifyMsg.vue";
export default {
  data() {
    return {
      active: 0,
      classify: [], //分类
      books: [],
      sinceIndex: 0,
      bottomOut: false,
    };
  },
  components: {
    ClasshifyMsg,
  },
  methods: {
    //获取分类
    async getClassify(since = 0, id = 0) {
      // let res = await this.axios.get(`v2/pweb/home`);
      // 漫画;
      // let res = await this.axios.get("/ranking/gender"); //小说
      let res2 = await this.axios.get(
        `v1/search/by_tag?since=${
          since * 24
        }&count=24&f=3&tag=${id}&sort=1&query_category={"update_status":1}`
      );
      this.classify = res2.tags;
      // this.classify = res.categories;
      // this.books.push(...res2.topics);
      //获取书籍id然后去重 防止重复获取书籍导致key值重复
      let ids = this.books.map((v) => v.id);
      if (this.books.length == 0) {
        this.books.push(...res2.topics);
      } else {
        let arr = res2.topics.filter((item) => {
          return ids.indexOf(item.id) == "-1";
        });
        this.books.push(...arr);
      }
      this.bottomOut = false;
    },
    clickBottom() {
      this.bottomOut = true;
      this.sinceIndex++;
      this.getClassify(this.sinceIndex, this.classify[this.active].tag_id);
    },
  },
  watch: {
    active() {
      this.books = [];
      this.getClassify(0, this.classify[this.active].tag_id);
    },
  },
  mounted() {
    this.getClassify();
  },
};
</script>
<style lang="less" scoped>
.index {
  position: relative;
}
.addContent {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  color: #ddd;
}
</style>
