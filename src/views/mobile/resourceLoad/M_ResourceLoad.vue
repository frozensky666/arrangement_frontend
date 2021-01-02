<template>
  <M_Layout title="资源负载图">
    <div class="gantt-wrap">
      <div class="date-picker">
        <el-select
          v-model="dateType"
          style="width: 110px; margin-right: 8px;"
          @change="timeSelectChange"
        >
          <el-option
            v-for="item in dateTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          style="width: 160px"
          v-model="date"
          type="date"
          placeholder="选择日期"
          @change="timeChange"
        >
        </el-date-picker>
      </div>
      <div class="time-scroll-bar">
        <div class="time-left" @click="scroll(-1)">
          <div class="time-l-arrow"></div>
        </div>
        <div
          class="time-middle"
          :style="{
            'max-width': blocks * blockSize + 'px',
            flex: '0 0 ' + (bodyWidth * 0.9 - 48 - 2 * 26) + 'px'
          }"
          @scroll="drag"
        >
          <!--  【 总宽*0.9 - selector宽度 - 左右箭头宽度 = 可视窗口宽度 】-->
          <div
            v-if="dateType === 'day'"
            :style="{ width: blocks * blockSize + 'px' }"
          >
            <div
              v-for="i in getDays(date, blocks)"
              :key="'month' + i"
              class="time-middle-content"
              :style="{ width: blockSize - 1 + 'px' }"
            >
              <span>{{ i }}</span>
            </div>
          </div>
          <div
            v-if="dateType === 'date'"
            :style="{ width: blocks * blockSize + 'px' }"
          >
            <div
              v-for="i in getWeeks(date, blocks)"
              :key="'month' + i"
              class="time-middle-content"
              :style="{ width: blockSize - 1 + 'px' }"
            >
              <span>{{ i }}</span>
            </div>
          </div>
        </div>
        <div class="time-right" @click="scroll(1)">
          <div class="time-r-arrow"></div>
        </div>
      </div>
      <el-tabs v-model="loadType">
        <el-tab-pane label="人员负载" name="person">
          <div class="table">
            <div
              class="row"
              v-for="item in Loaddata.personnelLoad"
              :key="item.name"
            >
              <div class="row-label">
                {{ item.name }}
              </div>
              <div
                class="row-content"
                :style="{
                  width: bodyWidth * 0.9 - 48 - 26 + 'px',
                  'max-width': blocks * blockSize + 'px'
                }"
              >
                <div class="row-content-wrap" :style="{ left: bias + 'px' }">
                  <el-tooltip
                    v-for="(block, index) in item.load"
                    :key="block.date + block.percent"
                    effect="dark"
                    :content="getPercentage(block.percent)"
                    placement="top"
                  >
                    <div
                      class="row-item"
                      :style="{ left: getPosition(index) + 'px' }"
                    >
                      <div
                        class="row-colorbox"
                        :style="{
                          'background-color': getColor(block.percent),
                          top: gettop(block.percent) + 'px',
                          height: getHeight(block.percent) + 'px'
                        }"
                      >
                        <p
                          v-if="block.percent > 0.5"
                          :style="{
                            'line-height': gettoptext(block.percent) + 'px'
                          }"
                        >
                          {{ getPercentage(block.percent) }}
                        </p>
                      </div>

                      <div
                        v-if="block.percent <= 0.5"
                        class="textofbox"
                        :style="{ 'line-height': '40px' }"
                      >
                        {{ getPercentage(block.percent) }}
                      </div>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设备负载" name="device">
          <div class="table">
            <div
              class="row"
              v-for="item in Loaddata.deviceLoad"
              :key="item.name"
            >
              <div class="row-label">
                {{ item.name }}
              </div>
              <div
                class="row-content"
                :style="{
                  width: bodyWidth * 0.9 - 48 - 26 + 'px',
                  'max-width': blocks * blockSize + 'px'
                }"
              >
                <div class="row-content-wrap" :style="{ left: bias + 'px' }">
                  <el-tooltip
                    v-for="(block, index) in item.load"
                    :key="block.date + block.percent"
                    effect="dark"
                    :content="getPercentage(block.percent)"
                    placement="top"
                  >
                    <div
                      class="row-item"
                      :style="{ left: getPosition(index) + 'px' }"
                    >
                      <div
                        class="row-colorbox"
                        :style="{
                          'background-color': getColor(block.percent),
                          top: gettop(block.percent) + 'px',
                          height: getHeight(block.percent) + 'px'
                        }"
                      >
                        <p
                          v-if="block.percent > 0.5"
                          :style="{
                            'line-height': gettoptext(block.percent) + 'px'
                          }"
                        >
                          {{ getPercentage(block.percent) }}
                        </p>
                      </div>

                      <div
                        v-if="block.percent <= 0.5"
                        class="textofbox"
                        :style="{ 'line-height': '40px' }"
                      >
                        {{ getPercentage(block.percent) }}
                      </div>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="产线负载" name="line">
          <div class="table">
            <div class="row" v-for="item in Loaddata.lineLoad" :key="item.name">
              <div class="row-label">
                {{ item.name }}
              </div>
              <div
                class="row-content"
                :style="{
                  width: bodyWidth * 0.9 - 48 - 26 + 'px',
                  'max-width': blocks * blockSize + 'px'
                }"
              >
                <div class="row-content-wrap" :style="{ left: bias + 'px' }">
                  <el-tooltip
                    v-for="(block, index) in item.load"
                    :key="block.date + block.percent"
                    effect="dark"
                    :content="getPercentage(block.percent)"
                    placement="top"
                  >
                    <div
                      class="row-item"
                      :style="{ left: getPosition(index) + 'px' }"
                    >
                      <div
                        class="row-colorbox"
                        :style="{
                          'background-color': getColor(block.percent),
                          top: gettop(block.percent) + 'px',
                          height: getHeight(block.percent) + 'px'
                        }"
                      >
                        <p
                          v-if="block.percent > 0.5"
                          :style="{
                            'line-height': gettoptext(block.percent) + 'px'
                          }"
                        >
                          {{ getPercentage(block.percent) }}
                        </p>
                      </div>

                      <div
                        v-if="block.percent <= 0.5"
                        class="textofbox"
                        :style="{ 'line-height': '40px' }"
                      >
                        {{ getPercentage(block.percent) }}
                      </div>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-popover placement="bottom" width="150" trigger="hover">
        <div>
          <div class="fontofright">图例</div>
          <div>
            <div class="fontofrightson1">0~20%</div>
            <div class="fontofrightson2">20%~40%</div>
          </div>
          <div class="fontofrightson3">40%~60%</div>
          <div class="fontofrightson4">60%~80%</div>
          <div>
            <div class="fontofrightson5">80%~100%</div>
            <div class="fontofrightson6">>100%</div>
          </div>
        </div>
        <div class="tips" slot="reference">
          tips
        </div>
      </el-popover>
    </div>
  </M_Layout>
</template>

<script>
import M_Layout from "@/components/content/M_Layout";
import { bodyWidthMixin } from "@/common/mixin";
import { generateRandomColor, colorFaded } from "@/common/utils";
import { resourceLoadDay } from "@/network/resourceLoad";
import { resourceLoadWeek } from "@/network/resourceLoad";
import moment from "moment";
import { toLocalDate } from "@/common/utils";
export default {
  name: "M_ResourceLoad",
  mixins: [bodyWidthMixin],
  components: {
    M_Layout
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      dateType: "day",
      date: "2018/11/01",
      activeName: "person",
      dateTypeOptions: [
        {
          value: "day",
          label: "按天显示"
        },
        {
          value: "date",
          label: "按周显示"
        }
      ],
      loadType: "device",
      loadTypeOptions: [
        {
          value: "device",
          label: "设备负载"
        },
        {
          value: "person",
          label: "人员负载"
        },
        {
          value: "line",
          label: "产线负载"
        }
      ],

      blocks: 7,
      blockSize: 70,
      height: 60,
      timeDivision: [
        "2018/11/09",
        "2018/11/10",
        "2018/11/11",
        "2018/11/12",
        "2018/11/13",
        "2018/11/14",
        "2018/11/15"
      ],
      bias: 0,
      Loaddata: {
        personnelSumLoad: "0.70",
        deviceSumLoad: "0.80",
        lineSumLoad: "0.88",
        personnelLoad: [
          {
            name: "小明",
            load: [
              {
                date: "2018/11/09",
                percent: "0.5"
              },
              {
                date: "2018/11/10",
                percent: "0.7"
              },
              {
                date: "2018/11/11",
                percent: "0.8"
              },
              {
                date: "2018/11/12",
                percent: "0.9"
              },
              {
                date: "2018/11/13",
                percent: "1"
              },
              {
                date: "2018/11/14",
                percent: "0.4"
              },
              {
                date: "2018/11/15",
                percent: "0.5"
              }
            ]
          },
          {
            name: "小红",
            load: [
              {
                date: "2018/11/09",
                percent: "0.2"
              },
              {
                date: "2018/11/10",
                percent: "0.1"
              },
              {
                date: "2018/11/11",
                percent: "0.3"
              },
              {
                date: "2018/11/12",
                percent: "0.4"
              },
              {
                date: "2018/11/13",
                percent: "0.5"
              },
              {
                date: "2018/11/14",
                percent: "1"
              },
              {
                date: "2018/11/15",
                percent: "1"
              }
            ]
          }
        ],
        deviceLoad: [
          {
            name: "设备1",
            load: [
              {
                date: "2018/11/09",
                percent: "0.6"
              },
              {
                date: "2018/11/10",
                percent: "0.7"
              },
              {
                date: "2018/11/11",
                percent: "0.8"
              },
              {
                date: "2018/11/12",
                percent: "0.9"
              },
              {
                date: "2018/11/13",
                percent: "1"
              },
              {
                date: "2018/11/14",
                percent: "0.4"
              },
              {
                date: "2018/11/15",
                percent: "0.5"
              }
            ]
          },
          {
            name: "设备2",
            load: [
              {
                date: "2018/11/09",
                percent: "0.2"
              },
              {
                date: "2018/11/10",
                percent: "0.1"
              },
              {
                date: "2018/11/11",
                percent: "0.3"
              },
              {
                date: "2018/11/12",
                percent: "0.4"
              },
              {
                date: "2018/11/13",
                percent: "0.5"
              },
              {
                date: "2018/11/14",
                percent: "1"
              },
              {
                date: "2018/11/15",
                percent: "1"
              }
            ]
          }
        ],
        lineLoad: [
          {
            name: "line1",
            load: [
              {
                date: "2018/11/09",
                percent: "0.6"
              },
              {
                date: "2018/11/10",
                percent: "0.7"
              },
              {
                date: "2018/11/11",
                percent: "0.8"
              },
              {
                date: "2018/11/12",
                percent: "0.9"
              },
              {
                date: "2018/11/13",
                percent: "1"
              },
              {
                date: "2018/11/14",
                percent: "0.4"
              },
              {
                date: "2018/11/15",
                percent: "0.5"
              }
            ]
          },
          {
            name: "设备2",
            load: [
              {
                date: "2018/11/09",
                percent: "0.2"
              },
              {
                date: "2018/11/10",
                percent: "0.1"
              },
              {
                date: "2018/11/11",
                percent: "0.3"
              },
              {
                date: "2018/11/12",
                percent: "0.4"
              },
              {
                date: "2018/11/13",
                percent: "0.5"
              },
              {
                date: "2018/11/14",
                percent: "1"
              },
              {
                date: "2018/11/15",
                percent: "1"
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    console.log(this.screenWidth);
    this.date = toLocalDate(sessionStorage.getItem("now"));
    this.timeChange(this.date);
  },

  methods: {
    loadSelectChange() {},
    timeSelectChange(timeSelect) {
      console.log(timeSelect);
      if (timeSelect === "day") {
        this.blocks = 7;
        this.blockSize = 70;
        this.timeChange(this.date);
      } else if (timeSelect === "date") {
        this.blocks = 7;
        this.blockSize = 70;
        this.timeChange(this.date);
      }
    },
    timeChange(time) {
      var theday = moment(time).format("YYYY-MM-DD");
      console.log(time);
      if (this.dateType === "day") {
        resourceLoadDay({
          params: {
            date: time
          }
        })
          .then(res => {
            if (res.code === 200) {
              this.Loaddata = res.data;
              console.log(this.Loaddata);
            } else {
              alert(res.msg);
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "获取天负载列表失败"
            });
          });
      }
      if (this.dateType === "date") {
        resourceLoadWeek({
          params: {
            date: time
          }
        })
          .then(res => {
            if (res.code === 200) {
              this.Loaddata = res.data;
              console.log(this.Loaddata);
            } else {
              alert(res.msg);
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "获取周负载列表失败"
            });
          });
      }
    },
    scroll(pages) {
      let d = new Date(this.date);
      d.setDate(d.getDate() + pages);
      this.date = d;
      this.timeChange(this.date);
    },
    drag(event) {
      this.bias = -event.target.scrollLeft;

      console.log("scroll", event.target.scrollLeft);
    },
    getColor(percent) {
      if (percent < 0.2) {
        return "#08FFFF";
      } else if (percent < 0.4) {
        return "#4EA4CB";
      } else if (percent < 0.6) {
        return "#98F20c";
      } else if (percent < 0.8) {
        return "#F59D2A";
      } else if (percent < 1) {
        return "#E4C7FF";
      } else {
        return "#E02E44";
      }
    },
    getPosition(theindex) {
      return theindex * this.blockSize + 30;
    },
    gettop(percent) {
      if (percent > 0.5) {
        return this.height * (1 - percent);
      } else {
        return this.height * (1 - percent - 0.15);
      }
    },
    gettoptext(percent) {
      if (percent > 0.8) {
        return 10;
      } else if (percent > 0.5) {
        return 0;
      } else {
        return 60;
      }
    },
    getHeight(percent) {
      return percent * this.height;
    },
    getDays(date, days) {
      let d = new Date(date);
      let arr = [];
      for (let i = 0; i < days; i++) {
        arr[i] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        d.setDate(d.getDate() + 1);
      }
      return arr;
    },
    getWeeks(date, days) {
      let d = new Date(date);
      let arr = [];
      for (let i = 0; i < days * 7; i++) {
        arr[i] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        d.setDate(d.getDate() + 6);
        arr[i] = arr[i] + "~" + (d.getMonth() + 1) + "/" + d.getDate();
        d.setDate(d.getDate() + 1);
      }
      return arr;
    },
    getdaydate(date) {
      let d = new Date(date);
      let out = "";
      out =
        d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
      d.setDate(d.getDate() + 6);
      out =
        out +
        "-" +
        d.getFullYear() +
        "年" +
        (d.getMonth() + 1) +
        "月" +
        d.getDate() +
        "日";
      return out;
    },
    getweekdate(date) {
      let d = new Date(date);
      let out = "";
      out =
        d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
      d.setDate(d.getDate() + 48);
      out =
        out +
        "-" +
        d.getFullYear() +
        "年" +
        (d.getMonth() + 1) +
        "月" +
        d.getDate() +
        "日";
      return out;
    },
    getPercentage(percent) {
      return parseInt(percent * 100) + "%";
    }
  }
};
</script>

<style scoped>
.gantt-wrap {
  margin: 0 32px;
  margin-left: 5%;
}
.fontofright {
  border: 1px solid #ebeef5;
  text-align: center;
  width: 100px;
  box-sizing: border-box;
  height: 28px;
  line-height: 28px;
}
.fontofrightson1 {
  height: 24px;
  line-height: 24px;
  background-color: #08ffff;
  text-align: center;
  width: 100px;
}
.fontofrightson2 {
  height: 24px;
  line-height: 24px;
  background-color: #4ea4cb;
  text-align: center;
  width: 100px;
}
.fontofrightson3 {
  height: 24px;
  line-height: 24px;
  background-color: #98f20c;
  text-align: center;
  width: 100px;
}
.fontofrightson4 {
  height: 24px;
  line-height: 24px;
  background-color: #f59d2a;
  text-align: center;
  width: 100px;
}
.fontofrightson5 {
  height: 24px;
  line-height: 24px;
  background-color: #e4c7ff;
  text-align: center;
  width: 100px;
}
.fontofrightson6 {
  height: 24px;
  line-height: 24px;
  background-color: #e02e44;
  text-align: center;
  width: 100px;
  color: #fff;
}
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 4px;
  min-height: 36px;
  border: 1px solid #ebeef5;
  text-align: center;
  padding-bottom: 10px;
}

.row-bg {
  background-color: #f9fafc;
}

.fontofname {
  padding-top: 10px;
  color: #8c8c8c;
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
}
.fontofdate {
  font-family: "PingFang SC";
  color: #8c8c8c;
  font-size: 12px;
}
.fontoftitle {
  font-family: "PingFang SC";
  font-size: 25px;
  font-weight: bold;
  padding-top: 20px;
  margin-bottom: 50px;
}
.grid-title {
  border-radius: 4px;
  min-height: 36px;
  margin-left: 20px;
}

/* time selector */
.date-picker {
  margin: 1rem 0.5rem;
}
.date-picker > * {
  margin-bottom: 0.5rem;
}

.time-scroll-bar {
  display: flex;
  height: 80px;
  margin-left: 3rem;
}

.time-l-arrow,
.time-r-arrow {
  width: 8px;
  height: 8px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  margin-top: 36px;
}
.time-l-arrow {
  transform: rotate(225deg);
}
.time-r-arrow {
  transform: rotate(45deg);
}
.time-middle {
  height: 80px;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 14px;
  color: #606266;
}
.time-middle-content {
  height: 78px;
  line-height: 30px;
  text-align: center;
  margin-left: -1px;

  word-wrap: break-word;
  float: left;
  border: solid 1px #dcdfe6;
  font-size: 0.5rem;
}
.time-middle-content span {
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 7px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: #535353;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.time-left,
.time-right {
  flex: 0 0 10px;
  padding: 0 8px 0 8px;
  background-color: #dcdfe6;
}
.time-left {
  border-radius: 4px 0 0 4px;
}
.time-right {
  border-radius: 0 4px 4px 0;
}
.time-left:hover,
.time-right:hover {
  background-color: #c2c2c2;
  cursor: pointer;
}
.time-left:active,
.time-right:active {
  background-color: #b4b4b4;
}
.time-l-arrow,
.time-r-arrow {
  width: 8px;
  height: 8px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  margin-top: 36px;
}
.time-l-arrow {
  transform: rotate(225deg);
}
.time-r-arrow {
  transform: rotate(45deg);
}

/* table */
.table {
  margin-top: 20px;
}
.table .row {
  /*background-color: #6c81eb;*/
  height: 60px;
  border-top: 1px solid #fff;
  /*display: flex;*/
  /*justify-content: left;*/
  position: relative;
}
.table .row .row-label {
  position: absolute;
  left: 0;
  top: 15px;
  width: 2.6rem;
  margin-right: 0.4rem;
  /*flex: 0 0 160px;*/
  background-color: #f5f7fa;
  text-align: center;
  line-height: 1.25rem;
  height: 40px;
  font-size: 0.5rem;
}

.table .row .row-content {
  position: absolute;
  left: 3rem; /*标签宽度*/
  top: 0;
  height: 60px;

  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}
.table .row .row-content-wrap {
  position: absolute;
}
.table .row .row-content .row-item {
  position: absolute;
  height: 60px;
  width: 60px;
  top: 7px;
  display: inline-block;

  border: 1px solid #ebeef5;
  cursor: pointer;
}
.table .row .row-content .row-item .row-colorbox {
  position: absolute;
  width: 60px;
  display: inline-block;
  z-index: -1;
  text-align: center;
  cursor: pointer;
}
.table .row .row-content .row-item .textofbox {
  z-index: auto;
  text-align: center;
}
.tips {
  position: fixed;
  right: -30px;
  top: 60px;
  background-color: rgb(102, 177, 255);
  color: #fff;
  width: 60px;
  border: solid 1px #ebeef5;
  border-radius: 10px 0 0 10px;
  padding: 15px;
  transition: right 0.5s;
  -moz-transition: right 0.5s; /* Firefox 4 */
  -webkit-transition: right 0.5s; /* Safari 和 Chrome */
  -o-transition: right 0.5s; /* Opera */
}
.tips:hover {
  right: 0;
}
</style>
