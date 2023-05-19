<template>
  <!-- 我是搜索页面 -->
  <div class="seachPage" v-if="books.length != 0">
    <van-search
      show-action
      placeholder="搜索作品、作者、一搜既有"
      shape="round"
      background="skyblue"
      @cancel="$router.back()"
      autofocus
      v-model.trim="value"
      v-if="showName != 'SeachResult'"
      @search="getRes(value)"
    />
    <!-- 热门搜索 -->
    <component
      :is="showName"
      :books="books"
      @addpage="changeHot"
      :hintItem="hintItem"
      :value="value"
      @getRes="getRes"
    ></component>
    <!-- 搜索历史 -->
    <div class="seachHistory" v-if="showName == 'HotSeach'">
      <header>
        <h3>搜索历史</h3>
        <span @click="seachHistory = []"> 清空历史 </span>
      </header>
      <ul>
        <li v-for="item in showHistory" :key="item" @click="getRes(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HotSeach from "@/components/HotSeach.vue";
import SearchPrompt from "@/components/SearchPrompt.vue";
import SeachResult from "@/components/SeachResult.vue";
export default {
  data() {
    return {
      books: [],
      showName: "HotSeach",
      value: "",
      hotpage: 1,
      hintItem: [],
      flag: false, //节流阀
      seachHistory: [],
    };
  },
  mounted() {
    this.getHotBooks();
  },
  computed: {
    showHistory() {
      return Array.from(new Set(this.seachHistory));
    },
  },
  methods: {
    async getHotBooks(page = 1) {
      let res = await this.axios.get(
        `search/mini/hot_word?&page=${page}&size=10`
      );
      if (res.hits.hot_word.length < 10) {
        this.hotpage = 1;
      }
      this.books = res.hits.hot_word;
      this.books.map((v, index) => {
        if (v.target_str.length >= 10) {
          this.books[index].target_str = v.target_str.substring(0, 9) + "...";
        }
      });
    },

    changeHot(value) {
      this.hotpage += value;
      this.getHotBooks(this.hotpage);
    },
    getRes(value) {
      this.flag = true;
      this.value = value;
      this.showName = this.value.length == 0 ? "HotSeach" : "SeachResult";
      if (this.value.length != 0) {
        this.seachHistory.unshift(value);
      }
      if (this.seachHistory.length >= 10) {
        this.seachHistory.pop();
      }
      setTimeout(() => {
        this.flag = false;
      }, 1000);
    },
  },
  components: {
    HotSeach,
    SearchPrompt,
    SeachResult,
  },
  watch: {
    value() {
      if (!this.flag) {
        let len = this.value.length;
        this.showName = len > 0 ? "SearchPrompt" : "HotSeach";
      }
    },
  },

  beforeRouteLeave(to, from, next) {
    this.showName = "HotSeach";
    this.value = "";
    next();
  },
};
</script>
<style lang='less' scoped>
.seachPage {
  height: 100vh;
  background: #eeeeee;
}
header {
  position: relative;
  margin-top: 10px;
  padding-top: 10px;
  h3 {
    font-size: 18px;
    color: rgb(90, 90, 90);
    margin-left: 10px;
  }
  span {
    position: absolute;
    right: 20px;
    top: 10px;
    color: #ccc;
    font-size: 12px;
  }
}
.seachHistory {
  height: 100%;
  background: #fff;
  ul {
    display: flex;
    flex-flow: row wrap;
    li {
      padding: 10px;
      font-size: 13px;
      margin: 20px 10px;
      color: rgb(148, 148, 148);
      background: rgb(241, 241, 241);
      border-radius: 10px;
    }
  }
}
</style>
