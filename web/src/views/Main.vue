<template>
  <div class="index">
    <div id="nav">
      <div class="topBar bgc-t-black fixed">
        <div class="topBar-inner content-size-1 color-white">
          <!-- pc端 >768px -->
          <h1 class="mr-6" id="logo">Vennie</h1>
          <ul id="pc-topBar-menu">
            <li class="px-6 f-l">
              <router-link to="/">首页</router-link>
            </li>
            <li class="px-6 f-l">
              <router-link to="/category">分类</router-link>
            </li>
            <li class="px-6 f-l">
              <router-link to="/about">关于我</router-link>
            </li>
          </ul>
          <!-- 移动端 <768px -->
          <i class="f-r hidden" @click="showMenu"><img id="list_icon" src="../assets/imgs/list.png"></i>
        </div>
      </div>
    </div>
    <div :class="isShow?'aniShow':''" class="bgc-t-black color-white d-menu hidden">
      <ul id="mb-topBar-menu" class="content-size-1">
        <li class="mr-4 py-4">
          <router-link to="/">首页</router-link>
        </li>
        <li class="mr-4 py-4">
          <router-link to="/category">分类</router-link>
        </li>
        <li class="mr-4 py-4">
          <router-link to="/about">关于我</router-link>
        </li>
      </ul>
    </div>
    <div class="content-size-1">
      <router-view />
    </div>
  </div>
</template>

<style>
#list_icon{
  height: 2.1429rem;
  position: absolute;
  top: 50%;
  right: 0rem;
  transform:translateY(-50%);
  cursor: pointer;
}
#nav{
  height: 3.5714rem;;
}
h1 {
  display: inline-block;
  cursor: pointer;
}
ul > li {
  cursor: pointer;
}
a {
  color: white;
}
.index {
  width: 100%;
}
.topBar {
  width: 100%;
  height: 3.5714rem;
}
.topBar-inner {
  height: 100%;
  line-height: 3.5714rem;
  position: relative;
}
#pc-topBar-menu {
  display: inline-block;
  vertical-align: top;
}
.content-size-1 {
  width: 80%;
  margin: 0 auto;
}
@media only screen and (max-width: 768px) {
  .content-size-1 {
    width: 95%;
  }
  #pc-topBar-menu {
    display: none;
  }
  .topBar-inner > i {
    display: block;
  }
  .d-menu {
    border-top: 0.0714rem solid rgb(47, 46, 46);
  }
  .aniShow {
    display: block;
    overflow: hidden;
    animation-name: showMenu;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    box-shadow: 0 0.1429rem 0.1429rem 0rem rgb(47, 46, 46, 0.6);
  }
  @keyframes showMenu {
    0% {
      height: 0rem;
    }
    100% {
      height: 11rem;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    showMenu() {
      this.isShow = !this.isShow;
    }
  }
};
</script>