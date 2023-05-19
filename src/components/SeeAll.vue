<template>
  <div class="seeAll">
    <header>
      <h1>漫画选集</h1>
      <div class="sort" @click="sort = !sort">
        <span class="iconfont icon-paixu"></span>
        {{ sort ? "正序" : "倒序" }}
      </div>
    </header>
    <div class="tag">
      已更
      {{ bookMsg.comics_count }}个内容 | {{ bookMsg.comic_body_count }}个正文
    </div>
    <ul>
      <li v-for="item in comics" :key="item.id" @click="readbook(item.id)">
        <img :src="item.cover_image_url" :alt="item.title" />
        <div class="item-right">
          <h4>{{ item.title }}</h4>
          <div class="date">
            <span class="left">
              {{ getDate(item.created_at) }}
            </span>
            <span class="right">
              <span class="iconfont icon-dianzan"></span>
              {{ getnum(item.likes_count_number) }}
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div class="bottom"></div>
  </div>
</template>
<script>
export default {
  props: ["bookMsg"],
  data() {
    return {
      sort: true,
    };
  },
  computed: {
    comics() {
      let arr = [];
      arr.push(...this.bookMsg.comics);
      return this.sort ? arr : arr.reverse();
    },
  },
  methods: {
    getnum(num) {
      return num >= 100000 ? parseInt(num / 10000) + "万" : num;
    },
    getDate(date) {
      return date.length <= 5 ? "2023-" + date : 20 + date;
    },
    readbook(readId) {
      this.$router.push({
        name: "readbook",
        params: {
          readId,
        },
      });
      this.$store.commit("getBookMsg", this.bookMsg.comics);
    },
  },
};
</script>
<style lang='less' scoped>
.seeAll {
  z-index: 10;
  position: fixed;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 90vh;
  overflow: scroll;
  width: 100vw;
  background: #fff;
  padding: 0 10px;
  header {
    margin-bottom: 10px;
    position: relative;
    h1 {
      font-weight: bolder;
      font-size: 20px;
      margin-top: 10px;
    }
    .sort {
      position: absolute;
      right: 30px;
      font-size: 12px;
      color: #ccc;
      top: 0px;
    }
  }
  .tag {
    font-size: 14px;
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

  ul {
    li {
      display: flex;
      margin: 20px 0;
      img {
        display: block;
        width: 141px;
        height: 85px;
        border-radius: 10px;
      }
      .item-right {
        position: relative;
        margin-top: 10px;
        width: 260px;
        h4 {
          overflow: hidden;
          white-space: nowrap;
          font-weight: bolder;
          text-overflow: ellipsis;
          font-size: 18px;
          margin-left: 10px;
        }
        .date {
          position: absolute;
          bottom: 10px;
          width: 100%;
          left: 10px;
          font-size: 12px;
          color: #aaa;
          .right {
            position: absolute;
            right: 20px;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
