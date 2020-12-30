<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {getsimulatetime} from "@/network/simulationSystem";

  export default {
    mounted() {

      getsimulatetime()
              .then(res => {
                if(res.code === 200) {
                  sessionStorage.setItem("now",res.data);
                } else {
                  sessionStorage.setItem("now","2018-10-10T00:00:00");
                  this.$message({
                    type: "error",
                    message: "获取模拟时间错误！"
                  });
                }
              })

    }
  }
</script>

<style></style>
