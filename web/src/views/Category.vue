<template>
  <div>
    <MainPanel>
      <div class="fs-xxl color-darkGray pt-3 pb-5">分类</div>
      <section class="text-left">
        <div v-show="front" v-cloak>
          <h3 class="color-darkGray py-4">前端</h3>
          <div class="bgc-card-bg2 category-radius px-3 py-3">
            <ul class="category-list">
              <li class="py-2" v-for="item in front" :key="item._id">
                <a class="color-black" @click="$router.push(`/detail/${item._id}`)">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="back" v-cloak>
          <h3 class="color-darkGray py-4">后端</h3>
          <div class="bgc-card-bg2 category-radius px-3 py-3">
            <ul class="category-list">
              <li class="py-2" v-for="item in back" :key="item._id">
                <a class="color-black" @click="$router.push(`/detail/${item._id}`)">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="dataBase" v-cloak>
          <h3 class="color-darkGray py-4">数据库</h3>
          <div class="bgc-card-bg2 category-radius px-3 py-3">
            <ul class="category-list">
              <li class="py-2" v-for="item in dataBase" :key="item._id">
                <a class="color-black" @click="$router.push(`/detail/${item._id}`)">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="tools" v-cloak>
          <h3 class="color-darkGray py-4">工具</h3>
          <div class="bgc-card-bg2 category-radius px-3 py-3">
            <ul class="category-list">
              <li class="py-2" v-for="item in tools" :key="item._id">
                <a class="color-black" @click="$router.push(`/detail/${item._id}`)">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </MainPanel>
  </div>
</template>

<script>
import MainPanel from "../components/Panel/MainPanel/MainPanel";

export default {
  components: {
    MainPanel
  },
  data() {
    return {
      front: false,
      back: false,
      dataBase: false,
      tools:false
    };
  },
  methods: {
    async fetchData() {
      const categories = await this.$http.get("/categoryParents");
      for (let value of categories.data) {
        const res = await this.$http.get(`/articles/category/${value._id}`);
        if (res.data[0]) {
          const name = res.data[0].categoryParent.name;
          if (name === "前端") {
            this.front = res.data;
          } else if (name === "后端") {
            this.back = res.data;
          } else if (name === "数据库") {
            this.dataBase = res.data;
          }else if (name === "工具") {
            this.tools = res.data;
          }
        }
      }
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.category-radius {
  border-radius: 5px;
}
.category-list {
  li {
    a:hover {
      color: #b63225;
    }
  }
}
</style>