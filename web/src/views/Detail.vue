<template>
  <div>
    <MainPanel>
      <div class="fs-xxl color-darkGray pt-3 article-title">{{model.title}}</div>
      <div class="article-time py-3" v-html="model.time"></div>
      <div class="article-tags pb-4 color-white fs-xs">
        <span
          class="bgc-t-black px-2 py-2 mr-2"
          v-for="item in model.categorySon"
          :key="item._id"
        >{{item.name}}</span>
      </div>
      <section class="text-left color-darkGray overflow-warp" v-html="model.body"></section>
    </MainPanel>
  </div>
</template>

<script>
import MainPanel from "../components/Panel/MainPanel/MainPanel";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  watch: {
    $route: "fetch",
  },
  components: {
    MainPanel,
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.article-title {
  line-height: 2.1429rem;
}
</style>