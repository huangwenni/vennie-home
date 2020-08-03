<template>
  <div>
    <aside class="content-size-3 content-size-4 px-4 py-4">
      <div class="text-center">
        <user-panel></user-panel>
      </div>
      <ListPanel title="近期文章">
        <li
          class="py-3 px-4 list-hover line-style"
          v-for="item in items"
          :key="item._id"
          @click="$router.push(`/detail/${item._id}`)"
        >
          <span>
            <a class="color-darkGray fs-md">{{item.title}}</a>
          </span>
        </li>
      </ListPanel>
      <div v-show="isShow">
        <MultiListPanel></MultiListPanel>
      </div>
    </aside>
  </div>
</template>

<script>
import UserPanel from "./part/UserPanel";
import ListPanel from "./part/ListPanel";
import MultiListPanel from "./part/MultiListPanel";

export default {
  components: {
    UserPanel,
    MultiListPanel,
    ListPanel,
  },
  data() {
    return {
      items: [],
      isShow:false
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/articles");
      this.items = res.data.slice(0, 10);
      this.isShow = true;
    },
  },
  created() {
    this.fetch();
  },
};
</script>