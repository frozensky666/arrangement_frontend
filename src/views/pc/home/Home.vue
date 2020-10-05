<template>
  <el-container>
    <el-header height="620px">
      <Logo></Logo>
      <div class="title">
        OASIS
      </div>
      <SearchBox class="searchBox" @search="search"></SearchBox>
      <div class="mask-outer">
        <div class="group"></div>
        <div class="mask-inner"></div>
      </div>
    </el-header>

    <el-main>
      <HomeCard
        class="home-card"
        icon-class="el-icon-user"
        card-title="Top Author"
        link="https://www.baidu.com"
        head-right="╰(●'◡'●)╮"
      >
        <HomeProgress
          v-for="i of topAuthor"
          :key="i.id"
          :percentage="(i.paper / getMax()) * 100"
          :text-left="i.name"
          :text-right="i.paper.toString() + 'Paper'"
          :link="i.link"
        ></HomeProgress>
      </HomeCard>
      <HomeCard
        icon-class="el-icon-office-building"
        card-title="Top Affiliation"
        link="https://www.baidu.com"
        head-right="ヘ(￣ω￣ヘ) "
      >
        <HomeProgress
          v-for="i of topAuthor"
          :key="i.id"
          :percentage="(i.paper / getMax()) * 100"
          :text-left="i.name"
          :text-right="i.paper.toString() + 'Paper'"
          :link="i.link"
        ></HomeProgress>
      </HomeCard>
      <HomeCard
        icon-class="el-icon-notebook-1"
        card-title="Top Journal"
        link="https://www.baidu.com"
        head-right="<(￣︶￣)>"
      >
        <HomeProgress
          v-for="i of topAuthor"
          :key="i.id"
          :percentage="(i.paper / getMax()) * 100"
          :text-left="i.name"
          :text-right="i.paper.toString() + 'Paper'"
          :link="i.link"
        ></HomeProgress>
      </HomeCard>
    </el-main>

    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import HomeProgress from "@/views/pc/home/childComps/HomeProgress";
import HomeCard from "@/views/pc/home/childComps/HomeCard";
import SearchBox from "@/components/content/SearchBox";
import Logo from "@/components/content/Logo";
import Footer from "@/components/common/Footer";
import { comsearch } from "@/network/search";

export default {
  name: "Home",
  components: {
    HomeCard,
    HomeProgress,
    SearchBox,
    Logo,
    Footer
  },
  data() {
    return {
      topAuthor: [
        { id: 1, name: "Kobe Bryent", paper: 1000, link: "#" },
        { id: 2, name: "Ben Affleck", paper: 900, link: "#" },
        { id: 3, name: "Johnny Depp", paper: 800, link: "#" },
        { id: 4, name: "Justin theroux ", paper: 700, link: "#" },
        { id: 5, name: "Emma Roberts", paper: 300, link: "#" },
        { id: 6, name: "Chad Michael Murray ", paper: 200, link: "#" },
        { id: 7, name: "Jared Leto", paper: 100, link: "#" },
        { id: 8, name: "Paul Walker", paper: 50, link: "#" },
        { id: 9, name: "Tobey Maguire", paper: 25, link: "#" },
        { id: 10, name: "Orlando Bloom", paper: 20, link: "#" }
      ]
    };
  },
  methods: {
    getMax() {
      return this.topAuthor[0].paper;
    },
    search(params) {
      // console.log(params);
      this.$router.push({ path: "/searchResults", params: params });
    }
  },
  mounted() {
    comsearch().then(data => {
      console.log(data);
    });
  }
};
</script>

<style scoped>
.el-header {
  background-image: url("~@/assets/img/timg2.jpg");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  padding-left: 0;
}
.el-main {
  height: 500px;
  display: flex;
  justify-content: space-around;
  background-color: var(--bgd-color);
  overflow: unset;
}
.home-card {
  z-index: 100;
  margin-top: -100px;
  min-width: 250px;
}
.mask-outer {
  position: absolute;
  width: 100%;
  /*height: 160px;*/
  bottom: 0;
  overflow: hidden;
}
.mask-inner {
  height: 170px;
  background: url("~@/assets/img/timg2.jpg") no-repeat bottom;
  background-size: 100%;
  filter: blur(15px);
}
.mask-outer .group {
}
.searchBox {
  margin-top: 80px;
}
.title {
  position: relative;
  top: 50px;
  font-size: 50px;
  text-align: center;
  color: #ffffff;
  user-select: none;
}
.el-footer {
  padding: 0;
}
</style>
