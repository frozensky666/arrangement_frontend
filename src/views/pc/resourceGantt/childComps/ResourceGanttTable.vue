<template>
  <div>
    <div class="table-btn">
      <el-button :disabled="switchGantt" @click="changeToGantt"
        >切换回甘特图</el-button
      >
    </div>
    <div class="table">
      <div class="row" v-for="item in queryData" :key="item.role">
        <div class="row-label">
          {{ item.role }}
        </div>
        <div
          class="row-content"
          :style="{
            width: bodyWidth * 0.8 - 180 - 26 + 'px',
            'max-width': blocks * blockSize + 'px'
          }"
        >
          <div class="row-content-wrap" :style="{ left: bias + 'px' }">
            <el-popover
              v-for="block in item.plan"
              :key="block.start + block.end + block.value"
              placement="top"
              width="240"
              trigger="hover"
            >
              <div class="item-msg">订单编号： {{ block.orderId }}</div>
              <div class="item-msg">物料编号： {{ block.materialId }}</div>
              <div class="item-msg">
                开始时间： {{ block.start.substr(0, 19).replace("T", " ") }}
              </div>
              <div class="item-msg">
                结束时间： {{ block.end.substr(0, 19).replace("T", " ") }}
              </div>
              <div
                class="row-item"
                slot="reference"
                @click="showRoutes(block.value)"
                :style="{
                  'background-color': block.bg,
                  width: getWidth(block.start, block.end) + 'px',
                  left: getPosition(block.start) + 'px',
                  'z-index': block.bg === block.oriBg ? 1 : 0
                }"
              >
                <!--                                        {{dateType === "date" ? block.value : ""}}-->
              </div>
            </el-popover>
            <!--                            </el-tooltip>-->
          </div>
        </div>
      </div>
      <div
        class="canvas-wrap"
        :style="{
          width: bodyWidth * 0.8 - 180 - 26 + 'px',
          'max-width': blocks * blockSize + 'px',
          height: queryData.length * 51 + 'px'
        }"
      >
        <canvas
          class="canvas"
          height="3000"
          width="3000"
          ref="canvas"
          :style="{ left: bias + 'px' }"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { colorFaded, generateRandomColor } from "@/common/utils";

export default {
  name: "ResourceGanttTable",
  props: [
    "queryData",
    "bodyWidth",
    "blocks",
    "blockSize",
    "bias",
    "dateType",
    "date"
  ],
  data() {
    return {
      currentProduct: null,
      transformedData: [],
      mode: "gantt",
      switchGantt: true
    };
  },
  watch: {
    queryData(val) {
      this.transformedData = this.dataTransform(val);
      this.clearCanvas();
      if (this.mode === "route") {
        this.drawLines(this.currentProduct);
        this.changeColor(this.mode, this.currentProduct);
      }
    }
  },
  methods: {
    getPosition(start) {
      if (this.dateType === "date") {
        //按小时
        let begin = new Date(this.date);
        let d = new Date(start);
        return (
          ((d.getTime() - begin.getTime()) / (24 * 60 * 60 * 1000)) *
          12 *
          this.blockSize
        );
      } else if (this.dateType === "month") {
        //按日
        let begin = new Date(this.date);
        let d = new Date(start);
        return (
          ((d.getTime() - begin.getTime()) / (24 * 60 * 60 * 1000)) *
          this.blockSize
        );
      }
    },
    getWidth(start, end) {
      if (this.dateType === "date") {
        //按小时
        let s = new Date(start);
        let e = new Date(end);
        return (
          ((e.getTime() - s.getTime()) / (24 * 60 * 60 * 1000)) *
          12 *
          this.blockSize
        );
      } else if (this.dateType === "month") {
        //按日
        let s = new Date(start);
        let e = new Date(end);
        return (
          ((e.getTime() - s.getTime()) / (24 * 60 * 60 * 1000)) * this.blockSize
        );
      }
    },
    showRoutes(p) {
      this.currentProduct = p;
      this.mode = this.mode === "gantt" ? "route" : "gantt";
      //change color
      this.changeColor(this.mode, p);
      //draw line
      if (this.mode === "route") {
        this.clearCanvas();
        this.drawLines(p);
      } else {
        this.clearCanvas();
      }
    },
    dataTransform(queryData) {
      //进行数据结构转换，方便后续的渲染
      let transformedData = {};
      queryData.forEach((obj, idx) => {
        obj.plan.forEach(p => {
          if (p.delay) {
            this.$set(p, "bg", "hsl(0,100%,50%)");
          } else {
            this.$set(p, "bg", generateRandomColor(p.value));
          }
          p.oriBg = p.bg; //本来的颜色/显示的颜色（是否淡化处理）
          p.index = idx; //用于路线图定位
          if (Object.prototype.hasOwnProperty.call(transformedData, p.value)) {
            transformedData[p.value].push(p);
          } else {
            Object.defineProperty(transformedData, p.value, {
              value: [p],
              configurable: true,
              writable: true,
              enumerable: true
            });
          }
        });
      });
      for (let product in transformedData) {
        if (Object.prototype.hasOwnProperty.call(transformedData, product)) {
          transformedData[product].sort(
            (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
          );
          let tmpObj = {};
          transformedData[product].forEach(plan => {
            let st = new Date(plan.start).toString();
            if (Object.prototype.hasOwnProperty.call(tmpObj, st)) {
              tmpObj[st].push(plan);
            } else {
              Object.defineProperty(tmpObj, st, {
                value: [plan],
                configurable: true,
                writable: true,
                enumerable: true
              });
            }
          });
          transformedData[product] = tmpObj;
        }
      }
      return transformedData;
    },
    clearCanvas() {
      let c = this.$refs.canvas;
      let ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
    },
    drawLines(p) {
      //产品
      let c = this.$refs.canvas;
      let ctx = c.getContext("2d");
      let tmpArr = [];
      if (Object.prototype.hasOwnProperty.call(this.transformedData, p)) {
        for (let i in this.transformedData[p]) {
          if (Object.prototype.hasOwnProperty.call(this.transformedData[p], i))
            tmpArr.push(this.transformedData[p][i]);
        }
      }
      if (tmpArr.length > 1) {
        //全在同一时刻的情况排除
        for (let i = 0; i < tmpArr.length - 1; i++) {
          for (let j = 0; j < tmpArr[i].length; j++) {
            for (let k = 0; k < tmpArr[i + 1].length; k++) {
              let end1 = this.getPosition(tmpArr[i][j].end);
              let start2 = this.getPosition(tmpArr[i + 1][k].start);
              let lintHeight = 51;
              if (tmpArr[i][j].index === tmpArr[i + 1][k].index) {
                //画横线
                let y = 20 + lintHeight * tmpArr[i][j].index; //51为一行的高度 (40px height + 10px margin bottom
                ctx.beginPath();
                ctx.moveTo(end1, y);
                ctx.lineTo(start2, y);
                ctx.strokeStyle = "rgb(229, 80, 57)";
                ctx.stroke();
              } else {
                let shortLine = 5;
                let y1 = 20 + lintHeight * tmpArr[i][j].index;
                let y2 = 20 + lintHeight * tmpArr[i + 1][k].index;
                let e2x = end1 + shortLine;
                let s2x = start2 - shortLine;
                // let p1y = y1+(tmpArr[i][j].index > tmpArr[i+1][k].index ? -1:1)*25;
                let p1y = y1 + 25;
                ctx.beginPath();
                ctx.moveTo(end1, y1);
                ctx.lineTo(e2x, y1);
                ctx.lineTo(e2x, p1y);
                ctx.lineTo(s2x, p1y);
                ctx.lineTo(s2x, y2);
                ctx.lineTo(start2, y2);
                ctx.strokeStyle = "rgb(229, 80, 57)";
                ctx.stroke();
              }
            }
          }
        }
      }
    },
    changeColor(mode, p) {
      //当前模式/点击的产品
      let flag = mode === "route";
      this.switchGantt = !flag;
      for (let product in this.transformedData) {
        if (
          Object.prototype.hasOwnProperty.call(this.transformedData, product)
        ) {
          for (let i in this.transformedData[product]) {
            if (
              Object.prototype.hasOwnProperty.call(
                this.transformedData[product],
                i
              )
            ) {
              this.transformedData[product][i].forEach(p2 => {
                p2.bg = flag && product !== p ? colorFaded(p2.bg) : p2.oriBg;
              });
            }
          }
        }
      }
    },
    changeToGantt() {
      this.mode = "gantt";
      this.switchGantt = true;
      this.clearCanvas();
      for (let product in this.transformedData) {
        if (
          Object.prototype.hasOwnProperty.call(this.transformedData, product)
        ) {
          for (let i in this.transformedData[product]) {
            if (
              Object.prototype.hasOwnProperty.call(
                this.transformedData[product],
                i
              )
            ) {
              this.transformedData[product][i].forEach(p2 => {
                p2.bg = p2.oriBg;
              });
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
/* table */
.table-btn {
  width: 100%;
  height: 40px;
}
.table {
  margin-top: 20px;
  position: relative;
}
.table .row {
  height: 50px;
  border-top: 1px solid #fff;
  position: relative;
  font-size: 10px;
}
.table .row .row-label {
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  background-color: #f5f7fa;
  text-align: center;
  line-height: 40px;
  height: 40px;
  font-size: large;
}
.table .row .row-content {
  position: absolute;
  left: 206px;
  top: 0;
  height: 40px;
  background-color: #f5f7fa;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}
.table .row .row-content-wrap {
  position: absolute;
}
.table .row .row-content .row-item {
  position: absolute;
  height: 40px;
  line-height: 40px;
  /*top: 7px;*/
  display: inline-block;
  /*border-radius: 10px;*/
  text-align: center;
  /*color: #fff;*/
  /*text-shadow: 2px 2px 2px #000;*/
  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  outline: 1px solid #fff;
}
.canvas {
  position: absolute;
  top: 0;
}
.canvas-wrap {
  left: 206px;
  position: absolute;
  top: 0;
  overflow: hidden;
  white-space: nowrap;
}
.item-msg {
  margin: 10px;
}
</style>
