<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {_isMobile} from "@/common/utils";

  export default {
    mounted() {
      if(this.$route.path === "/" || this.$route.path === "/pc" || this.$route.path === "/m") {
        if (_isMobile()) {
          this.$router.replace('/m');
        } else {
          this.$router.replace('/pc');
        }
      }
    }
  }
</script>

<style></style>
