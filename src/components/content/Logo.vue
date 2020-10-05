<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <span class="shkb-logo" :style="{ color: mainColor }">S.H.K.B</span>
        <span class="shkb-logo-reflect" :style="{ color: reflectColor }"
          >S.H.K.B</span
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    mainColor: {
      type: String,
      default() {
        return "#ffffff";
      }
    },
    reflectColor: {
      type: String,
      default() {
        return "#cccccc55";
      }
    }
  }
};
</script>

<style scoped>
.shkb-logo,
.shkb-logo-reflect {
  font-size: 60px;
  font-weight: 900;
  user-select: none;
}
.shkb-logo {
  z-index: 1;
  position: relative;
  margin-left: 10px;
  float: left;
}
.shkb-logo-reflect {
  position: absolute;
  display: block;
  left: 30px;
  transform: rotateX(180deg);
  top: 30px;
}
</style>
