<template>
  <Layout>
    <div class="plan-overview-wrap">
      <div class="plan-overview-header">
        <div class="plan-overview-header-left">
          <h2>排程概览</h2>
        </div>
        <div class="plan-overview-header-middle">
          <div class="grid-content bg-purple">
            <p class="fontofname">按期交货率</p>
            <el-progress
              type="circle"
              stroke-linecap="butt"
              :stroke-width="20"
              :percentage="Math.round(overview.submitRate * 100)"
            ></el-progress>
          </div>
          <div class="grid-content bg-purple">
            <p class="fontofname">设备负载率</p>
            <el-progress
              type="circle"
              stroke-linecap="butt"
              :stroke-width="20"
              :percentage="Math.round(overview.deviceLoadRate * 100)"
            ></el-progress>
          </div>
          <div class="grid-content bg-purple">
            <p class="fontofname">产线负载率</p>
            <el-progress
              type="circle"
              stroke-linecap="butt"
              :stroke-width="20"
              :percentage="Math.round(overview.deviceUseRate * 100)"
            ></el-progress>
          </div>
          <div class="grid-content bg-purple">
            <p class="fontofname">人员负载率</p>
            <el-progress
              type="circle"
              stroke-linecap="butt"
              :stroke-width="20"
              :percentage="Math.round(overview.personLoadRate * 100)"
            ></el-progress>
          </div>
        </div>
        <div class="plan-overview-header-right"></div>
      </div>
      <div class="plan-overview-body">
        <el-table
          :data="overview.orderPlans"
          stripe
          style="width: 100%"
          header-cell-style="text-align: center;"
          cell-style="text-align: center;"
        >
          <el-table-column prop="orderId" label="订单编号" width="180">
          </el-table-column>
          <el-table-column prop="orderNum" label="订单数量" width="180">
          </el-table-column>
          <el-table-column prop="orderDeadline" label="订单交期" width="180">
          </el-table-column>
          <el-table-column prop="planDeadline" label="预计交期" width="180">
          </el-table-column>
          <el-table-column label="生产安排">
            <template slot-scope="scope">
              <planOverviewChart
                width="400px"
                height="160px"
                :option="getChartOption(scope.row.plans)"
              ></planOverviewChart>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </Layout>
</template>

<script>
import moment from "moment";
import { planOverview } from "@/network/plan";
import Layout from "@/components/content/Layout";
import planOverviewChart from "@/views/pc/planOverview/childComps/planOverviewChart";
export default {
  name: "PlanOverview",
  components: {
    Layout,
    planOverviewChart
  },
  data() {
    return {
      overview: {
        submitRate: 0,
        deviceUseRate: 0,
        deviceLoadRate: 0,
        personLoadRate: 0,
        orderPlans: []
      }
    };
  },
  mounted() {
    planOverview()
      .then(res => {
        if (res.code === 200) {
          this.overview = this.completeChartData(res.data);
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      })
      .catch(err => {
        this.$message({
          type: "error",
          message: "未知的错误"
        });
        console.log(err);
      });
  },
  methods: {
    getChartOption(plans) {
      console.log(plans);
      return {
        // padding: [0, 10],
        grid: {
          x: 30,
          y: 10,
          x2: 10,
          y2: 25
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: (params, ticket, callback) => {
            return `日期：${params[0].name}<br>进度：${(
              params[0].value * 100
            ).toFixed(2)}%`;
          }
        },
        itemStyle: {
          color: "#83a2ff"
        },
        xAxis: {
          type: "category",
          data: plans.map(val => val["date"]),
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: "value",
          show: true,
          min: 0,
          max: 1
        },
        series: [
          {
            data: plans.map(val => val["production"]),
            type: "bar",
            barWidth: "16px"
          }
        ]
      };
    },
    completeChartData(overview) {
      for (const orderPlan of overview.orderPlans) {
        const plans = orderPlan.plans;
        if (plans.length > 1) {
          const start = new Date(Date.parse(plans[0].date));
          const end = new Date(Date.parse(plans[plans.length - 1].date));
          start.setDate(start.getDate() + 1);
          let pos = 1;
          while (start.toLocaleDateString() !== end.toLocaleDateString()) {
            const date = moment(start.toLocaleDateString()).format(
              "YYYY-MM-DD"
            );
            let index = pos;
            for (; index < plans.length; index++) {
              if (date === plans[index].date) {
                break;
              }
            }
            if (index === plans.length) {
              plans.splice(pos, 0, {
                date,
                production: 0
              });
            }
            start.setDate(start.getDate() + 1);
            pos++;
          }
        }
      }
      return overview;
    }
  }
};
</script>

<style scoped>
.plan-overview-wrap {
  width: 80%;
  margin-left: 10%;
}
.plan-overview-header {
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
}
.plan-overview-body {
  width: 90%;
}
.bg-purple {
  border: 1px solid #dcdfe6;
  text-align: center;
  padding-bottom: 10px;
}
.grid-content {
  float: left;
  padding: 8px 50px 24px;
  margin-right: 10px;
  border-radius: 4px;
  min-height: 36px;
}
.fontofname {
  color: #8c8c8c;
  font-size: 18px;
  font-weight: bold;
}
</style>
