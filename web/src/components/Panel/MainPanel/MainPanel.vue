<template>
  <div>
    <div class="content-size-2 content-size-4 px-4 py-4 text-center">
      <div id="category" class="card-shadow bgc-card-bg1 px-4 py-6">
        <slot></slot>
      </div>
    </div>
    <AsidePanel></AsidePanel>
  </div>
</template>

<script>
import AsidePanel from "../AsidePanel/AsidePanel";

export default {
  components: {
    AsidePanel
  }
};
</script>
