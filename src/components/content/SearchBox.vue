<template>
  <div>
    <div class="search">
      <a href="javascript: void(0)" class="choose">
        <span>{{ title }}</span>
        <span class="arrow0"></span>
        <span class="list">
          <span class="arrow1"></span>
          <a class="item multi-search" @click="changeTitle('MultiSearch')"
            >MultiSearch</a
          >
          <a
            class="item"
            v-for="item in list"
            :key="item"
            @click="changeTitle(item)"
            >{{ item }}</a
          >
          <span class="m-list">
            <span class="arrow2"></span>
            <label v-for="(item2, index) in list" :for="item2" :key="item2">
              <span>{{ item2 }}:</span>
              <input :id="item2" type="text" v-model="mulInput[index]" />
            </label>
            <button class="ok" @click="ok">OK</button>
          </span>
        </span>
      </a>
      <input
        type="text"
        placeholder="Please input here"
        v-model="mainInput"
        :readonly="title === 'MultiSearch'"
      />
      <button @click="search">search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      title: "Author",
      list: ["Author", "Institution", "Conference", "Keywords"],
      mulInput: [],
      mainInput: ""
    };
  },
  methods: {
    changeTitle(item) {
      this.title = item;
      this.mainInput = "";
    },
    search() {
      let value = "";
      if (this.title === "MultiSearch") {
        try {
          value = JSON.parse(this.mainInput);
        } catch (e) {
          alert("混合搜索模式中请输入JSON格式的数据！");
          return;
        }
      } else {
        value = this.mainInput;
      }
      let param = {
        type: this.title,
        value
      };
      this.$emit("search", param);
    },

    ok() {
      // this.mainInput = this.mulInput;
      this.title = "MultiSearch";
      let tmpString = "{";
      for (let i = 0; i < this.list.length; i++) {
        tmpString += `"${this.list[i]}":"${
          this.mulInput[i] === undefined ? "" : this.mulInput[i]
        }"`;
        if (i !== this.list.length - 1) tmpString += ",";
      }
      this.mainInput = tmpString + "}";
    }
  }
};
</script>

<style scoped>
.search {
  position: relative;
  margin: 0 auto;
  padding-left: 80px;
  border-radius: 20px;
  width: 500px;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 12px;
  color: red;
  border: 1px solid #ddd;
}
.search .arrow0 {
  display: inline-block;
  position: relative;
  left: 8px;
  bottom: 2px;
  border: solid #999;
  border-width: 1px 1px 0 0;
  height: 5px;
  width: 5px;
  background-color: #ffffff;
  transform: rotate(135deg);
  transition: all 1s;
}
.search input {
  margin-left: 22px;
  width: 380px;
  line-height: 30px;
  background-color: #eee;
  border: 0;
  font-size: 12px;
  color: #666;
  padding: 0 10px;
}
.search input::placeholder {
  font-size: 12px;
}
.search button {
  position: absolute;
  width: 70px;
  height: 40px;
  right: 0;
  border-radius: 20px;
  border: 0;
  color: #999;
  cursor: pointer;
  background-color: #fff;
}
.search button:hover {
  background-color: #ccc;
  color: #fff;
}
.search button:active {
  background-color: #999;
  color: #fff;
}
.search .choose {
  display: block;
  position: absolute;
  left: 0;
  text-align: center;
  width: 100px;
  background-color: #fff;
  border-radius: 20px;
  color: #999;
}
.search .choose:hover .list {
  visibility: visible;
}
.search .choose:hover .arrow0 {
  transform: rotate(-45deg);
  border-color: #f00;
  bottom: 0;
  transition: all 0.2s;
}
.search .list {
  position: absolute;
  z-index: 9;
  left: 0;
  top: 50px;
  padding: 6px 0px 12px;
  background-color: #fff;
  border-radius: 3px;
  visibility: hidden;
  transition: visibility 1s;
  border: 1px solid #ddd;
}
.search .list .item {
  display: block;
  line-height: 24px;
  padding: 0 15px;
  text-align: center;
}
.search .list .item.multi-search {
  background-color: orange;
  color: #fff;
}
.search .list .item:hover {
  color: #fff;
  background-color: #ccc;
}
.search .list .item:active {
  color: #fff;
  background-color: #999;
}
.search .list .arrow1 {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -7px;
  height: 10px;
  width: 10px;
  background-color: #fff;
  transform: rotate(45deg);
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.search .list .multi-search:hover ~ .m-list {
  visibility: visible;
}
.m-list:hover {
  visibility: visible;
}
.m-list {
  position: absolute;
  top: 0;
  left: 110px;
  width: 480px;
  background-color: #fff;
  color: #999;
  padding: 10px 0 10px 10px;
  border-radius: 5px;
  visibility: hidden;
  transition: visibility 1s;
  border: 1px solid #ddd;
}
.m-list .arrow2 {
  position: absolute;
  top: 15px;
  left: -6px;
  height: 10px;
  width: 10px;
  background-color: #fff;
  transform: rotate(45deg);
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.m-list label {
  display: flex;
  line-height: 25px;
}
.m-list label span {
  text-align: center;
  width: 60px;
}
.m-list label input {
  border: 1px solid #fff;
  border-radius: 5px;
  width: 300px;
  height: 25px;
}
.m-list .ok {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 4px;
  background-color: #6c81eb;
  color: #fff;
  cursor: pointer;
}
</style>
