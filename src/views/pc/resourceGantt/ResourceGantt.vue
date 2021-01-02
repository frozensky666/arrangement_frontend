<template>
  <Layout>
    <div class="gantt-wrap">
      <div class="gantt-header">
        <div class="gantt-header-left">
          <h2>资源甘特图</h2>
        </div>
      </div>
      <div class="time-selector">
        <div class="time-selector-left">
          <el-select
            v-model="dateType"
            style="width: 160px"
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
        <div class="time-selector-right">
          <div class="time-left" @click="scroll(-1)">
            <div class="time-l-arrow"></div>
          </div>
          <div
            class="time-middle"
            :style="{
              'max-width': blocks * blockSize + 'px',
              flex: '0 0 ' + (bodyWidth * 0.8 - 180 - 2 * 26) + 'px'
            }"
            @scroll="drag"
          >
            <!--  【 总宽*0.8 - selector宽度 - 左右箭头宽度 = 可视窗口宽度 】-->
            <div
              v-if="dateType === 'date'"
              :style="{ width: blocks * blockSize + 'px' }"
            >
              <div
                v-for="title in timeDivision"
                :key="title"
                class="time-middle-content"
                :style="{ width: blockSize - 1 + 'px' }"
              >
                <span>{{ title }}</span>
              </div>
            </div>
            <div
              v-if="dateType === 'month'"
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
          </div>
          <div class="time-right" @click="scroll(1)">
            <div class="time-r-arrow"></div>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleTabClick"
        style="margin-top: 20px"
      >
        <el-tab-pane label="人员" name="first">
          <ResourceGanttTable
            :date="this.date"
            :queryData="this.personData"
            :bias="this.bias"
            :block-size="this.blockSize"
            :blocks="this.blocks"
            :body-width="bodyWidth"
            :date-type="this.dateType"
          >
          </ResourceGanttTable>
        </el-tab-pane>
        <el-tab-pane label="设备" name="second">
          <ResourceGanttTable
            :date="this.date"
            :queryData="this.deviceData"
            :bias="this.bias"
            :block-size="this.blockSize"
            :blocks="this.blocks"
            :body-width="bodyWidth"
            :date-type="this.dateType"
          >
          </ResourceGanttTable>
        </el-tab-pane>
        <el-tab-pane label="产线" name="third">
          <ResourceGanttTable
            :date="this.date"
            :queryData="this.lineData"
            :bias="this.bias"
            :block-size="this.blockSize"
            :blocks="this.blocks"
            :body-width="bodyWidth"
            :date-type="this.dateType"
          >
          </ResourceGanttTable>
        </el-tab-pane>
      </el-tabs>
      <el-popover placement="bottom" width="200" trigger="hover">
        <div class="gantt-tips1">单击产品可切换产品路线图和资源甘特图</div>
        <div class="gantt-tips2">
          红色表示延期订单
          <div class="color-block"></div>
        </div>
        <div class="tips" slot="reference">
          tips
        </div>
      </el-popover>
    </div>
  </Layout>
</template>

<script>
import { bodyWidthMixin } from "@/common/mixin";
import { resourceGanttDate, resourceGanttHour } from "@/network/resourceGantt";
import Layout from "@/components/content/Layout";
import { toLocalDate } from "@/common/utils";
import ResourceGanttTable from "@/views/pc/resourceGantt/childComps/ResourceGanttTable";

export default {
  name: "ResourceGantt",
  mixins: [bodyWidthMixin],
  components: {
    Layout,
    ResourceGanttTable
  },
  data() {
    return {
      // screenWidth: document.body.clientWidth,
      date: "2018-11-9",
      dateType: "date",
      dateTypeOptions: [
        {
          value: "month",
          label: "按天显示"
        },
        {
          value: "date",
          label: "按小时显示"
        }
      ],
      timeDivision: [
        "00:00-02:00",
        "02:00-04:00",
        "04:00-06:00",
        "06:00-08:00",
        "08:00-10:00",
        "10:00-12:00",
        "12:00-14:00",
        "14:00-16:00",
        "16:00-18:00",
        "18:00-20:00",
        "20:00-22:00",
        "22:00-24:00"
      ],
      bias: 0,
      blocks: 12,
      blockSize: 91,
      personData: [],
      deviceData: [],
      lineData: [],
      activeName: "first"
    };
  },
  mounted() {
    this.date = sessionStorage.getItem("now");
    this.timeChange(this.date);
  },
  methods: {
    handleTabClick() {},
    getData() {
      let reqFunc;
      if (this.dateType === "date") {
        reqFunc = resourceGanttHour;
      } else {
        reqFunc = resourceGanttDate;
      }
      let tmpDate = new Date(this.date);
      tmpDate.setDate(tmpDate.getDate() + 6);
      // console.log("妙啊");
      return reqFunc({
        params:
          this.dateType === "date"
            ? {
                date: toLocalDate(this.date)
              }
            : {
                start: toLocalDate(this.date),
                end: toLocalDate(tmpDate)
              }
      }).then(res => {
        if (res.code === 200) {
          this.personData = res.data.personPlan;
          this.deviceData = res.data.devicePlan;
          this.lineData = res.data.linePlan;
          // this.dataTransform();
        } else
          this.$message({
            type: "error",
            value: "Some Error Occured!"
          });
      });
    },
    timeSelectChange(timeSelect) {
      if (timeSelect === "date") {
        this.blocks = 12;
        this.blockSize = 91;
        this.timeChange(this.date);
      } else if (timeSelect === "month") {
        this.blocks = 7;
        this.blockSize = 156;
        this.timeChange(this.date);
      }
    },
    timeChange(time) {
      this.getData();
    },
    scroll(pages) {
      let d = new Date(this.date);
      d.setDate(d.getDate() + pages);
      this.date = d;
      this.timeChange(this.date);
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
    drag(event) {
      this.bias = -event.target.scrollLeft;
    }
  }
};
</script>

<style scoped>
/* wrap all */
.gantt-wrap {
  margin: 0 32px;
  min-width: 600px;
  

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* gantt header */
.gantt-header {
  /*margin-top: 50px;*/
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
}
.gantt-title {
  padding: 20px;
  border: 1px solid #dcdfe6;
}
.gantt-tips1 {
  padding: 20px;
}
.gantt-tips2 {
  padding: 20px;
}

/* time selector */
.time-selector {
  display: flex;
  justify-content: left;
}
.time-selector-left {
  flex: 0 0 160px;
}
.time-selector-right {
  display: flex;
  height: 80px;
  margin-left: 20px;
  /*position: relative;*/
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
.time-middle {
  height: 80px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  font-size: 14px;
  color: #606266;
}
.time-middle-content {
  height: 78px;
  line-height: 30px;
  text-align: center;
  margin-left: -1px;
  display: inline-block;
  white-space: normal;
  float: left;

  border: solid 1px #dcdfe6;
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

.table-title {
  font-weight: 700;
  font-size: 18px;
  margin-top: 10px;
}

.color-block {
  display: inline-block;
  height: 10px;
  width: 10px;
  background-color: #ff0000;
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
