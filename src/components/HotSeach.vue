<template>
  <div>
    <div class="hotSeach">
      <header>
        <h3>热门搜索</h3>
        <span @click="$emit('addpage', +1)">换一批</span>
      </header>
      <ul>
        <li
          v-for="(item, index) in books"
          :key="item.target_id"
          @click="toBookRes(item.target_title, item.target_id)"
        >
          <span :class="{ active: index < 3 }">
            {{ index + 1 }}
          </span>
          {{ item.target_str }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "HotSeach",
  props: ["books"],
  data() {
    return {
      hotIndex: 0,
    };
  },

  computed: {},
  methods: {
    toBookRes(title, id) {
      this.$emit("getRes", title);
      this.$router.push(`/seach/${id}`);
    },
    //换热门
  },
};
</script>
<style lang='less' scoped>
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
.hotSeach {
  background: #fff;
  ul {
    display: flex;
    flex-flow: row wrap;
    li {
      width: 50%;
      margin: 20px 0;
      color: #aaa;
      font-size: 14px;
      span {
        margin: 0 15px;
        &.active {
          color: yellowgreen;
        }
      }
    }
  }
}
</style>
