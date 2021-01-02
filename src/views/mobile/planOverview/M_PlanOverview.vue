<template>
  <M_Layout title="排程概览">
    <div class="block1">
      <div class="rates">
        <span class="rates-title">按期交货率：</span
        >{{ (overview.submitRate * 100).toFixed(0) }}%
      </div>
      <div class="rates">
        <span class="rates-title">设备负载率：</span
        >{{ (overview.deviceLoadRate * 100).toFixed(0) }}%
      </div>
      <div class="rates">
        <span class="rates-title">设备利用率：</span
        >{{ (overview.deviceUseRate * 100).toFixed(0) }}%
      </div>
      <div class="rates">
        <span class="rates-title">人员负载率：</span
        >{{ (overview.personLoadRate * 100).toFixed(0) }}%
      </div>
    </div>
    <div class="block2">
      <el-table
        :data="overview.orderPlans"
        stripe
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="orderId" label="订单编号" width="80">
        </el-table-column>
        <el-table-column prop="orderNum" label="订单数量" width="80">
        </el-table-column>
        <el-table-column prop="orderDeadline" label="订单交期">
        </el-table-column>
        <el-table-column prop="planDeadline" label="预计交期">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-row-header">
              <span class="table-row-item">日期</span>
              <span class="table-row-item">当日进度</span>
            </div>
            <div
              v-for="item in props.row.plans"
              :key="item.date + item.production.toString()"
              class="table-row"
            >
              <span class="table-row-item">{{ item.date }}</span>
              <span class="table-row-item"
                >{{ (item.production * 100).toFixed(0) }}%</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </M_Layout>
</template>

<script>
import M_Layout from "@/components/content/M_Layout";
import { planOverview } from "@/network/plan";

export default {
  name: "M_PlanOverview",
  components: {
    M_Layout
  },
  data() {
    return {
      overview: {
        submitRate: 0,
        deviceLoadRate: 0,
        deviceUseRate: 0,
        personLoadRate: 0,
        orderPlans: []
      }
    };
  },
  mounted() {
    planOverview()
      .then(res => {
        if (res.code === 200) {
          this.overview = res.data;
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
  width: 50%;
  margin: 1rem 0;
  text-align: center;
}
.rates-title {
  font-weight: 700;
}
.block2 {
  margin-top: 1rem;
}
.table-row {
  text-align: center;
  display: flex;
  justify-content: space-between;
  line-height: 1.25rem;
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
</style>
