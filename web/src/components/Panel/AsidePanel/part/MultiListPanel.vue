<template>
  <Panel>
    <div slot="title" class="px-4 py-4">
      <ul class="ml-panel-title pb-3 color-darkGray">
        <li
          v-for="(item,index) in ['链接收藏','个人链接']"
          class="f-l px-4 py-4 mr-3"
          :class="{active:index==isActive}"
          :key="index"
          @click="changeIndex(index)"
        >{{item}}</li>
      </ul>
    </div>
    <div slot="content">
      <ul v-show="isActive==0" v-cloak>
        <li class="list-hover" v-for="item in colData" :key="item._id">
            <a class="color-darkGray d-block py-3 px-4 line-style" target="blank" :href="item.link">{{item.name}}</a>
        </li>
      </ul>
      <ul v-show="isActive==1" v-cloak>
        <li class="list-hover"  v-for="item in perData" :key="item._id">
            <a class="color-darkGray d-block py-3 px-4 line-style" target="blank" :href="item.link">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../Panel";

export default {
  components: {
    Panel
  },
  data() {
    return {
      isActive: 0,
      colData:[],
      perData:[]
    };
  },
  methods: {
    changeIndex(index) {
      this.isActive = index;
    },
    async fetchCol(){
      const res = await this.$http.get('/linkCols')
      this.colData = res.data
    },
    async fetchPer(){
      const res = await this.$http.get('linkPer')
      this.perData = res.data
    }
  },
  created(){
    this.fetchCol()
    this.fetchPer()
  }
};
</script>

<style lang="scss">
.ml-panel-title {
  overflow: hidden;
  border-bottom: 0.0714rem solid white;
  li {
    border-radius: 0.3571rem;
  }
  li:hover {
    background-color: #d9534f;
    color: white;
  }
  .active {
    background-color: #d9534f;
    color: white;
  }
}
</style>