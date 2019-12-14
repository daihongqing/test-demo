<template>
  <div id="app">
    <transition :name="className">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
/* IMPORT CSS */
import "./assets/reset.min.css";
import "./assets/basic.less";
export default {
  computed: {
    className() {
      let { path } = this.$route;
      return path.includes("/handle") ? "handle" : "home";
    }
  }
};
</script>

<style lang="less">
.handle-enter-active,
.handle-leave-active,
.home-enter-active,
.home-leave-active {
  transition: opacity 0.2s linear 0s;
}

.home-enter,
.handle-enter {
  opacity: 0;
}
.home-enter-to,
.handle-enter-to {
  opacity: 1;
}
.home-leave,
.handle-leave {
  opacity: 1;
}
.home-leave-to,
.handle-leave-to {
  opacity: 0;
}
</style>