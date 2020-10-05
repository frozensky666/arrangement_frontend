<template>
  <div class="footer">
    <el-divider class="divide"></el-divider>
    <div class="content">
      SHKB .Nanjing University.
    </div>
    <div class="content">
      <a href="http://www.beian.miit.gov.cn/">
        <!--      <img src="~@/assets/img/footer.png" alt="">-->
        苏ICP备20008491
      </a>
      © Copyright 2019-2020
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  padding-bottom: 20px;
  background-color: #f7f8fa;
}
.divide {
  margin: 0 0 20px;
}
.content {
  display: block;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #666;
}
.content a {
  color: #666;
}
.content img {
  position: relative;
  top: 3px;
  right: 2px;
}
</style>
