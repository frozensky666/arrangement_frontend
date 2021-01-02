<template>
  <M_Layout title="订单甘特图">
    <div style="margin-left: 1rem;">
      <el-date-picker
        style="width: 160px"
        v-model="date"
        type="date"
        placeholder="选择日期"
        @change="timeChange"
      >
      </el-date-picker>
      <div class="rates">
        <span class="rates-title">按期交货率：</span
        >{{ parseInt((rate == -0.1 ? 0 : rate) * 100) }}%
      </div>
    </div>
    <el-table :data="orderList" style="width: 100%">
		
      <el-table-column label="订单号" prop="orderId">
      </el-table-column>
	  
	  <el-table-column
	        label="交期"
	        >
	        <template slot-scope="scope">
	          {{ scope.row.process[0].ddl }}
	        </template>
	  </el-table-column>
		<el-table-column type="expand">
			<template slot-scope="props">
			  <div class="table-row-header">
				<span class="table-row-item">过程</span>
			    <span class="table-row-item">完成百分比</span>
			    <span class="table-row-item">是否延期</span>
				<span class="table-row-item">预计完成百分比</span>
			  </div>
			  <div
			    v-for="item in props.row.process"
			    :key="item.name"
			    class="table-row"
			  >
			    <span class="table-row-item">{{ item.name }}</span>
			    <span class="table-row-item">{{ parseInt(item.percent * 100) }}%</span>
				<span class="table-row-item">{{ isdelaye(item.isdelayed) }}</span>
				<span class="table-row-item">{{ parseInt(item.theline * 100) }}%</span>
			  </div>
			</template>
		     
		</el-table-column>
    </el-table>
    <!-- <el-popover placement="bottom" width="200" trigger="hover">
      <div class="gantt-tips2">
        红色表示延期订单
        <div class="color-block"></div>
      </div>
      <div class="tips" slot="reference">
        tips
      </div>
    </el-popover> -->
  </M_Layout>
</template>

<script>
import M_Layout from "@/components/content/M_Layout";
import { bodyWidthMixin } from "@/common/mixin";
import { generateRandomColor, colorFaded } from "@/common/utils";
import { getorderList } from "@/network/orderGantt";
import { getorderRateFinish } from "@/network/orderGantt";
import { toLocalDate } from "@/common/utils";
import moment from "moment";
export default {
  name: "M_OrderGantt",
  components: {
    M_Layout
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      dateType: "day",
      date: "2018-11-09",
      height: 80,
      bias: 0,
      rate: 0.79,

      orderList: [
        {
          orderId: "418575",

          process: [
            {
              name: "装配",
              percent: "0.6",
              theline: "0.8",
              isdelayed: "1",
              ddl: "2020-12-12"
            }
          ]
        },
        {
          orderId: "418577",

          process: [
            {
              name: "装配",
              percent: "1",
              theline: "1",
              isdelayed: "0",
              ddl: "2020-12-12"
            }
          ]
        },
        {
          orderId: "764486",
          process: [
            {
              name: "装配",
              percent: "0.8",
              theline: "0.7",
              isdelayed: "1",
              ddl: "2020-12-12"
            }
          ]
        },
        {
          orderId: "762904",

          process: [
            {
              name: "装配",
              percent: "0.53",
              theline: "1",
              isdelayed: "0",
              ddl: "2020-12-12"
            },
            {
              name: "测试",
              percent: "0.33",
              theline: "1",
              isdelayed: "0",
              ddl: "2020-12-12"
            }
          ]
        },
        {
          orderId: "762345",

          process: [
            {
              name: "装配",
              percent: "0.53",
              theline: "1",
              isdelayed: "0",
              ddl: "2020-12-12"
            },
            {
              name: "测试",
              percent: "0",
              theline: "1",
              isdelayed: "0",
              ddl: "2020-12-12"
            }
          ]
        }
      ],
      search: ""
    };
  },
  mounted() {
    console.log(sessionStorage.getItem("now"));
    this.date = toLocalDate(sessionStorage.getItem("now"));
    getorderList({
      params: {
        date: this.date
      }
    })
      .then(res => {
        if (res.code === 200) {
          this.orderList = res.data;
          console.log(this.orderList);
        } else {
          alert(res.msg);
        }
      })
      .catch(err => {
        this.$message({
          type: "error",
          message: "获取订单列表失败"
        });
      });
    getorderRateFinish({
      params: {
        date: this.date
      }
    })
      .then(res => {
        if (res.code === 200) {
          this.rate = res.data;
          console.log(this.rate);
        } else {
          alert(res.msg);
        }
      })
      .catch(err => {
        this.$message({
          type: "error",
          message: "获取订单完成率失败"
        });
      });
  },
  methods: {
    timeChange(time) {
      console.log(time);
      this.date = moment(time).format("YYYY-MM-DD");
      console.log(this.date);
      getorderList({
        params: {
          date: this.date
        }
      })
        .then(res => {
          if (res.code === 200) {
            this.orderList = res.data;
            console.log(this.orderList);
          } else {
            alert(res.msg);
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "获取订单列表失败"
          });
        });
      getorderRateFinish({
        params: {
          date: this.date
        }
      })
        .then(res => {
          if (res.code === 200) {
            this.rate = res.data;
            console.log(this.rate);
          } else {
            alert(res.msg);
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "获取订单完成率失败"
          });
        });
    },
    isdelaye(num) {
      if (num == 1) {
        return "延期";
      } else {
        return "未延期";
      }
    }
  }
};
</script>

<style scoped>

.rates {
  line-height: 1.25rem;
  font-size: 0.875rem;
  color: #606266;
  font-weight: 500;
  display: inline-block;
  width: 40%;
  text-align: center;
}
.rates-title {
  font-weight: 700;
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
.color-block {
  display: inline-block;
  height: 10px;
  width: 10px;
  background-color: #ff0000;
}
.table-row-header {
  text-align: center;
  display: flex;
  justify-content: space-between;
  line-height: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.table-row-item {
  display: inline-block;
  width: 5rem;
}
.table-row {
  text-align: center;
  display: flex;
  justify-content: space-between;
  line-height: 1.25rem;
}
</style>
