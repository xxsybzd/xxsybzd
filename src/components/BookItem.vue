<template>
  <!-- 分类下的图书 -->
  <div class="book">
    <h3>
      {{ book.title }}
    </h3>
    <span class="user">
      {{ book.user.nickname }}
    </span>
    <ul>
      <li
        v-for="(item, index) in book.category"
        :key="index"
        v-show="index <= 4"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
    <img :src="book.cover_image_url" @click="toBookId" />
    <div class="footer">
      <span class="latest_comic_title">
        {{ book.latest_comic_title }}
      </span>
      <span class="iconfont icon-aixin"></span>
      <span class="sub_title">
        {{ favouriteCount }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["book"],
  data() {
    return {};
  },
  mounted() {},
  computed: {
    //喜欢人数
    favouriteCount() {
      let count = this.book.favourite_count;
      let num = count >= 10000 ? (count / 10000).toFixed(2) + "万" : count;
      return num;
    },
  },
  methods: {
    toBookId() {
      this.$router.push({
        name: "SeachBooks",
        params: {
          bookId: this.book.id,
          bookmsg: this.book,
        },
      });
    },
  },
};
</script>
<style lang='less' scoped>
.book {
  margin-top: 10px;
  padding-left: 5%;
}
.user {
  font-size: 12px;
  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-clip: text;
  color: transparent;
}
h3 {
  margin-bottom: 7px;
  font-weight: bolder;
  background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
  background-clip: text;
  color: transparent;
}
ul {
  display: flex;
  margin: 10px 0;
  li {
    padding: 1px 20px;
    margin-right: 10px;
    border-radius: 10px;
    font-size: 12px;
    // background: rgb(240, 240, 240);
    background-image: linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);
    span {
      background-image: linear-gradient(
        -225deg,
        #231557 0%,
        #44107a 29%,
        #ff1361 67%,
        #fff800 100%
      );
      background-clip: text;
      color: transparent;
    }
  }
}

img {
  display: block;
  width: 95%;
  border-radius: 5px;
  height: 200px;
  margin-bottom: 5px;
}

.latest_comic_title {
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #874da2 0%, #c43a30 100%);
  font-size: 12px;
}
.footer {
  width: 95%;
}
.icon-aixin {
  float: right;
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
}
.sub_title {
  float: right;
  background-clip: text;
  color: transparent;
  font-size: 14px;
  background-image: linear-gradient(45deg, #874da2 0%, #c43a30 100%);
}
</style>
