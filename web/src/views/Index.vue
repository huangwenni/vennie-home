<template>
  <div class="index">
    <div class="content-size-2 content-size-4 px-4 py-4 text-center">
      <section
        class="bgc-card-bg1 px-4 py-4 mb-4 card-shadow article-list"
        v-for="(item,index) in items"
        :key="index"
      >
        <a @click="$router.push(`/detail/${item._id}`)">
          <div class="article-title">
            <h3 class="color-white bgc-title-bg px-3 py-3">{{item.title}}</h3>
          </div>
          <div class="article-time py-3" v-html="item.time"></div>
          <div class="article-tags pb-4 color-white fs-xs">
            <span
              class="bgc-t-black px-2 py-2 mr-2"
              v-for="(category,index) in item.categorySon"
              :key="index"
            >{{category.name}}</span>
          </div>
          <div class="article-content text-left card-shadow bgc-card-bg2 px-3 py-2">
            <p>{{item.body}}</p>
          </div>
        </a>
      </section>
      <div v-show="isShow">
        <v-app>
          <div class="text-center">
            <v-pagination
              color="#9e3434"
              @input="next"
              v-model="pagination.page"
              :length="pagination.total"
            ></v-pagination>
          </div>
        </v-app>
      </div>
    </div>
    <AsidePanel></AsidePanel>
  </div>
</template>

<script>
import AsidePanel from "../components/Panel/AsidePanel/AsidePanel";

export default {
  components: {
    AsidePanel,
  },
  data() {
    return {
      items: [],
      pagination: {
        page: 1,
        total: 0,
      },
      isShow:false
    };
  },
  methods: {
    async fetchData() {
      //对获取到的文章数据进行处理
      const res = await this.$http.get("/articles");
      const items = res.data.map((item) => {
        const text = item.body;
        const text1 = text.replace(/<\/?.+?>/g, "");
        const text2 = text1.replace(/ /g, "");
        const text3 = text2.replace(/[ ]|[&nbsp;]/g, "");
        item.body = text3;
        return item;
      });
      return items;
    },
    async fetch() {
      const items = await this.fetchData();
      //默认获取和显示第一页的数据
      await this.count(5, 1);
      //获取分页总数
      await this.total(5,items);
      this.isShow = true
    },
    async next(page) {
      //获取和显示指定页面的数据
      this.count(5, page);
    },
    //判断一共分为几页 count：一页多少 items:所有的数据
    async total(count, items) {
      let length = items.length % count;
      if (length > 0) {
        length = parseInt(items.length / count) + 1;
      } else if (length == 0) {
        length = items.length / count;
      }
      this.pagination.total = length;
    },
    //获取每一页的数据 count:一页多少 page：第几页
    async count(count, page) {
      const items = await this.fetchData();
      // 1 0,5       (1-1)*5 1*5
      // 2 5,10      (2-1)*5 2*5
      // 3 10,15     (3-1)*5 3*5
      // 4 15,20     (4-1)*5 4*5
      let articles = items.slice((page - 1) * count, page * count);
      this.items = articles;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.index {
  overflow: hidden;
  .article-list {
    a {
      color: black;
    }
    .article-title {
      h3 {
        display: inline-block;
        font-weight: 100;
        border-radius: 0.7143rem;
      }
    }
    .article-content {
      p {
        height: 7.1429rem;
        position: relative;
        line-height: 1.7857rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }
  .user-panel {
    overflow: hidden;
  }
}
.theme--light.v-application {
  background: #ffffff00 !important;
}
.v-application--wrap {
  min-height: 0 !important;
}
</style>


