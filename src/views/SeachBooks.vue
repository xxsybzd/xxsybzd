<template>
  <div class="seachbooks">
    <div v-if="show">
      <header>
        <span class="iconfont icon-fanhui" @click="$router.back()"></span>
        <img
          :src="bookMsg.cover_image_url"
          :alt="bookMsg.title"
          @click="isSeeAll = false"
        />
        <h1>
          {{ bookMsg.title }}
        </h1>
        <ul>
          <li>{{ bookMsg.popularity_info }}人气值</li>
          <span>|</span>
          <li>{{ computedNum(bookMsg.origin_comments_count) }}总评论</li>
        </ul>
      </header>
      <div class="content">
        <ul class="tags">
          <li
            v-for="(item, index) in bookMsg.tags"
            :key="index"
            v-show="index <= 4"
          >
            {{ item }}
          </li>
        </ul>
        <div class="desc">
          <div class="description">
            {{ bookMsg.description }}
          </div>
        </div>
        <div class="user" v-if="bookMsg?.user">
          <img :src="bookMsg.user.avatar" />
          {{ bookMsg.user.nickname }}
        </div>
        <div class="section">
          <h3 class="">漫画选集</h3>
          <div class="tag">
            已更
            {{ bookMsg.comics_count }}个内容 |
            {{ bookMsg.comic_body_count }}个正文
          </div>
          <div class="catalogue">
            <ul>
              <li v-for="item in bookMsg.comics" :key="item.id">
                <img :src="item.cover_image_url" :alt="item.title" />
                <h4 class="title">
                  {{ getTitle(item.title) }}
                </h4>
              </li>
            </ul>
          </div>
          <van-button
            van-button
            round
            type="info"
            class="round"
            @click="isSeeAll = true"
            >∨ 展开目录</van-button
          >
        </div>
      </div>
    </div>
    <van-loading type="spinner" color="#1989fa" v-else class="loading" />
    <see-all v-if="isSeeAll" :bookMsg="bookMsg"></see-all>
  </div>
</template>
<script>
import SeeAll from "@/components/SeeAll.vue";
export default {
  data() {
    return {
      bookid: 0,
      bookMsg: {},
      show: false,
      isSeeAll: false,
    };
  },
  methods: {
    computedNum(num) {
      if (num >= 10000 && num <= 100000000) {
        return parseInt(num / 10000) + "万";
      } else if (num < 10000) {
        return num;
      } else {
        return (num / 100000000).toFixed(2) + "亿";
      }
    },
    async getsection(id) {
      let res = await this.axios.get(`/v2/pweb/topic/${id}`);
      this.bookMsg = res.topic_info;
      this.show = true;
    },
    getTitle(title) {
      if (title.length > 10) {
        return title.substring(0, 15) + "...";
      }
      return title;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.isSeeAll = false;
      vm.show = false;
      vm.bookid = to.params.bookId;
      vm.getsection(vm.bookid);
    });
  },
  components: {
    SeeAll,
  },
};
</script>
<style lang='less' scoped>
header {
  position: relative;
  .iconfont {
    position: absolute;
    top: 30px;
    left: 10px;
    z-index: 222;
    color: #fff;
  }
  img {
    display: block;
    width: 100%;
    height: 250px;
    border-radius: 5px;
    filter: brightness(80%);
  }
  h1 {
    font-size: 20px;
    position: absolute;
    bottom: 50px;
    left: 10px;
    color: #fff;
  }
  ul {
    display: flex;
    position: absolute;
    bottom: 15px;
    left: 10px;
    li {
      color: #fff;
      margin: 0 5px;
    }
    span {
      color: skyblue;
    }
  }
}
.content {
  .tags {
    display: flex;
    padding: 10px 0;
    background: #eee;
    li {
      padding: 5px 20px;
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
  .description {
    margin-top: 10px;
    font-size: 14px;
    padding: 0 10px;
    text-indent: 2rem;
    line-height: 20px;
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
  .user {
    line-height: 30px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      vertical-align: middle;
    }
    margin-top: 10px;
    padding: 0 10px;
    font-size: 12px;
    background-image: linear-gradient(
      -225deg,
      #a445b2 0%,
      #d41872 52%,
      #ff0066 100%
    );
    background-clip: text;
    color: transparent;
  }
  .section {
    padding: 10px;
    position: relative;
    h3 {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 10px;
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
    .catalogue {
      width: 100%;
      margin-top: 10px;
      overflow: hidden;
      height: 130px;
      ul {
        display: flex;
        overflow: auto;
        padding-bottom: 30px;
        li {
          margin-right: 10px;
          img {
            width: 190px;
            height: 100px;
          }
          h4 {
            margin-left: 3px;
            font-size: 10px;
            margin-top: 10px;
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
    }
    .round {
      position: absolute;
      left: 50%;
      margin-top: 10px;
      color: #aaa;
      background: #fff;
      border: 1px solid #aaa;
      font-size: 12px;
      transform: translateX(-50%);
    }
  }
}

.loading {
  text-align: center;
}
</style>
