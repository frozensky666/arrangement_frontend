<template>
    <Layout>
        <div class="layout-main plan" ref="planMain">
            <h2>排程</h2>
            <div class="btn-wrap">
                <el-button type="primary" @click="plan()" :disabled="multipleSelection.length === 0">排程</el-button>
            </div>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 90%"
                        @selection-change="handleSelectionChange"
                        stripe
                >
                    <el-table-column
                            type="selection"
                            width="55"
                            :selectable="row => row.state === 0"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="orderId"
                            label="订单编号">
                    </el-table-column>
                    <el-table-column
                            prop="materialId"
                            label="物料编号">
                    </el-table-column>
                    <el-table-column
                            prop="orderNum"
                            label="订货数量">
                    </el-table-column>
                    <el-table-column
                            prop="orderDeadline"
                            label="订单交期">
                    </el-table-column>
                    <el-table-column
                            label="订单状态">
                        <template slot-scope="scope">
                            {{scope.row.state | stateFilter}}
                            <div :class="getColor(scope.row.state)" class="state"></div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
    import {getOrders} from "@/network/orderManage";
    import {plan} from "@/network/plan";

    export default {
        name: "Plan",
        components: {
            Layout
        },
        data() {
            return {
                tableData: [],
                multipleSelection: []
            }
        },
        mounted() {
            getOrders()
                .then(res => {
                    if(res.code === 200) {
                        this.tableData = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        type: 'error',
                        message: "未知错误，请重试"
                    });
                });
        },
        filters: {
            stateFilter: v => v === 0 ? "未排程" : ( v === 1 ? "已排程" : "已过期")
        },
        methods: {
            plan() {
                const loading = this.$loading({
                    lock: true,//lock的修改符--默认是false
                    text: 'Loading',//显示在加载图标下方的加载文案
                    spinner: 'el-icon-loading',//自定义加载图标类名
                    // background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
                    target: this.$refs.planMain
                });
                this.$message({
                    type: 'info',
                    message: '正在排程，请稍后'
                });

                plan({
                    orderIdList: this.multipleSelection.map(v => v.orderId)
                }).then( res => {
                    setTimeout(()=>loading.close(),1000);
                    if(res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '排程成功!请点击其他栏目查看排程结果！'
                        });
                        setTimeout(() => this.$router.go(0),1000);
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
            },
            getColor(state) {
                if (state === 0) {
                    return 'not-plan-row';
                } else if (state === 1) {
                    return 'plan-row';
                } else if (state === 2) {
                    return 'overdue-row'
                }
                return '';
            }
        }
    }
</script>

<style scoped>
    .plan .btn-wrap{
        display: flex;
        justify-content: flex-end;
        margin: 0 32px;
    }
    .plan .btn-wrap > * {
        margin-left: 10px;
    }
    .plan.layout-main {
        margin: 0 32px;
        
    }
    .plan .not-plan-row {
        background-color: rgb(49, 204, 119);
    }
    .plan .plan-row {
        background-color: #ff6869;
    }
    .plan .overdue-row {
        background-color: #bdbdbd;
    }
    .plan .state {
        display: inline-block;
        width: 10px;
        height: 10px;
    }
</style>