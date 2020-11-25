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
                        <el-progress type="circle" stroke-linecap="butt" :stroke-width="20"   :percentage="Math.round(overview.submitRate*100)"></el-progress>
                    </div>
                    <div class="grid-content bg-purple">
                        <p class="fontofname">设备利用率</p>
                        <el-progress type="circle" stroke-linecap="butt" :stroke-width="20"   :percentage="Math.round(overview.deviceUseRate*100)"></el-progress>
                    </div>
                    <div class="grid-content bg-purple">
                        <p class="fontofname">设备负载率</p>
                        <el-progress type="circle" stroke-linecap="butt" :stroke-width="20"   :percentage="Math.round(overview.deviceLoadRate*100)"></el-progress>
                    </div>
                    <div class="grid-content bg-purple">
                        <p class="fontofname">人员负载率</p>
                        <el-progress type="circle" stroke-linecap="butt" :stroke-width="20"   :percentage="Math.round(overview.personLoadRate*100)"></el-progress>
                    </div>
                </div>
                <div class="plan-overview-header-right"></div>
            </div>
            <div class="plan-overview-body">
                <el-table
                        :data="overview.orderPlans"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="orderId"
                            label="订单编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="orderNum"
                            label="订单数量"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="orderDeadline"
                            label="订单交期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="planDeadline"
                            label="预计交期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="生产安排">
                        <template slot-scope="scope">
                            <planOverviewChart
                                    width="400px"
                                    height="200px"
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
    import {planOverview} from "@/network/plan";
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
            }
        },
        mounted() {
            planOverview().then(
                res => {
                    if (res.code === 200) {
                        this.overview = res.data;
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        });
                    }
                }
            ).catch(
                err => {
                    this.$message({
                        type: "error",
                        message: "未知的错误"
                    });
                    console.log(err);
                }
            );
        },
        methods: {
            getChartOption(plans) {
                console.log(plans);
                return {
                    tooltip: {
                        trigger: "item",
                        formatter: "{c} ({b})"
                    },
                    itemStyle: {
                        color: "#83a2ff",
                        shadowBlur: 200,
                        shadowColor: "rgba(23,48,103,0.5)"
                    },
                    xAxis: {
                        type: "category",
                        data: plans.map(val => val['date'])
                    },
                    yAxis: {
                        type: "value",
                        show: true
                    },
                    series: [
                        {
                            data: plans.map(val => val['production']),
                            type: "line",
                            showBackground: true,
                            backgroundStyle: {
                                color: "rgba(220, 220, 220, 0.8)"
                            }
                        }
                    ]
                };

            }
        }
    }
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
        border: 1px solid #DCDFE6;
        text-align: center;
        padding-bottom: 10px;
    }
    .grid-content {
        float:left;
        padding: 8px 50px 24px;
        margin-right: 10px;
        border-radius: 4px;
        min-height: 36px;
    }
    .fontofname {
        color: #8C8C8C;
        font-size: 18px;
        font-weight: bold;
    }
</style>