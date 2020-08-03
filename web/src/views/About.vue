<template>
  <div>
    <MainPanel>
      <div class="fs-xxl color-darkGray pt-3 pb-6">关于我</div>
      <section class="text-left color-darkGray overflow-warp">
        <p class="py-2">技术栈：Html | Css | js | Vue | jQuery | Ajax | Nodejs | Mongodb | Webpack | Ps</p>
        <p class="py-2">90后的IT萌妹子，热爱生活，热爱代码，喜欢新鲜事物，时刻保持着无尽的好奇。</p>
        <p class="py-2">Github:</p>
        <p class="py-2">https://github.com/huangwenni</p>
      </section>
    </MainPanel>
  </div>
</template>

<script>
import MainPanel from "../components/Panel/MainPanel/MainPanel";

export default {
  components: {
    MainPanel
  }
};
</script>

<style lang="scss" scoped>
.category-radius {
  border-radius: 0.3571rem;
}
.category-list {
  li {
    a:hover {
      color: #b63225;
    }
  }
}
</style>