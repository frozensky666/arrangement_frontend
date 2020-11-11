<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {_isMobile} from "@/common/utils";
  import {getsimulatetime} from "@/network/simulationSystem";

  export default {
    created() {
    },
    mounted() {

      getsimulatetime()
              .then(res => {
                if(res.code === 200) {
                  sessionStorage.setItem("now",res.msg);
                } else {
                  sessionStorage.setItem("now","2018-10-10T00:00:00");
                  this.$message({
                    type: "error",
                    message: "获取模拟时间错误！"
                  });
                }
              })
      // if(this.$route.path === "/" || this.$route.path === "/pc" || this.$route.path === "/m") {
      //   if (_isMobile()) {
      //     this.$router.replace('/m');
      //   } else {
      //     this.$router.replace('/pc');
      //   }
      // }
    }
  }
</script>

<style></style>
