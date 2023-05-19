<template>
  <!-- 分页下的内容 -->
  <div class="classhifymsg">
    <ul>
      <li v-for="item in books" :key="item.id">
        <book-item :book="item"></book-item>
      </li>
    </ul>
  </div>
</template>
<script>
import BookItem from "@/components/BookItem.vue";
export default {
  props: ["books"],
  data() {
    return {};
  },
  components: {
    BookItem,
  },
};
</script>
<style lang="less" scoped>
li {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
ul li:last-child {
  margin-bottom: 100px;
}
</style>
