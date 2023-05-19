<template>
  <div class="readbook">阅读中</div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      readId: 0,
    };
  },
  computed: {
    ...mapState(["currentReadBook"]),
  },
  methods: {
    async getcomic(id) {
      let res = await this.axios.get(`/m/v2/mweb/comic/${id}`);
      console.log(res);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.readId = to.params.readId;
      vm.getcomic(vm.readId);
    });
  },
};
</script>
<style lang='less' scoped>
</style>
