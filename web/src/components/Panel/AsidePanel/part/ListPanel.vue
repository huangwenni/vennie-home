<template>
  <Panel>
    <div slot="title" class="panel-title bgc-t-black color-white px-4 py-4">
      <span class="fs-lg">{{title}}</span>
    </div>
    <div slot="content">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </Panel>
</template>

<script>
import Panel from "../../Panel";
export default {
  components: {
    Panel,
  },
  props: {
    title: {}
  }
};
</script>
