<template>
  <Panel>
    <div slot="title" class="panel-title bgc-t-black color-white px-4 py-3">
      <span class="fs-lg">"Vennie"</span>
    </div>
    <div slot="content" class="px-4 py-4 user-avater">
      <img src="../../../../assets/imgs/avater.png" />
    </div>
  </Panel>
</template>

<script>
import Panel from "../../Panel";
export default {
  components: {
    Panel
  }
};
</script>

<style lang="scss">
.user-avater {
  img {
    width: 8.5714rem;
    height: 8.5714rem;
    border-radius: 4.2857rem;
    background-color: pink;
  }
}
</style>