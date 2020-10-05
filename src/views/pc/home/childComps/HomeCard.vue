<template>
  <div class="home-card shkb-card">
    <div class="home-card-head">
      <div class="home-card-head-left">
        <i class="home-card-head-icon" :class="iconClass"></i>
        <span class="home-card-head-title">{{ cardTitle }}</span>
        <a :href="link" target="_blank" class="home-card-head-more"
          >more info</a
        >
      </div>
      <div class="home-card-head-right">
        {{ headRight }}
      </div>
    </div>
    <div class="home-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    link: {
      type: String,
      require: true
    },
    cardTitle: {
      type: String,
      require: true
    },
    iconClass: {
      type: String,
      require: true
    },
    headRight: {
      type: String,
      require: true
    }
  }
};
</script>

<style scoped>
.home-card {
  height: 500px;
  width: 25%;
}
.home-card-head {
  height: 60px;
  border-radius: 10px 10px 0 0;
  padding: 10px 10px 10px 10px;
  background-color: var(--card-deep);
}
.home-card-body {
  padding: 12px 18px 0 18px;
}

.home-card-head-more {
  margin-top: 10px;
  color: #888888;
  font-size: 14px;
  margin-left: 70px;
  display: block;
  text-decoration: none;
}
.home-card-head-more:hover {
  color: aqua;
}
.home-card-head-icon {
  font-size: 50px;
  float: left;
}
.home-card-head-title {
  font-size: 20px;
  margin-left: 20px;
}
.home-card-head-right {
  float: right;
  margin-top: -30px;
  font-size: 20px;
}
.el-progress {
  flex: 1;
}
</style>
