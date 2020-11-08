<template>
    <Layout>
        <div class="layout-main">
            <h2>排程</h2>
            <div style="margin-top: 60px" ref="planMain">
                <el-transfer v-model="value" :data="data" :titles="['Source', 'Target']">
                    <el-button type="primary" class="transfer-footer" slot="right-footer" size="small" :disabled="value.length === 0"
                    @click="plan()">排程</el-button>
                </el-transfer>
            </div>
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
                data: [],
                value: [],
                planBtn: true
            }
        },
        mounted() {
            getOrders()
                .then(res => {
                    if(res.code === 200) {
                        res.data.forEach(item => {
                            this.data.push({
                                key: item.orderId,
                                label: `订单 ${ item.orderId }`,
                                disabled: false
                            });
                        });
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
        methods: {
            plan() {
                const loading = this.$loading({
                    lock: true,//lock的修改符--默认是false
                    text: 'Loading',//显示在加载图标下方的加载文案
                    spinner: 'el-icon-loading',//自定义加载图标类名
                    // background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
                    target: this.$refs.planMain
                });

                plan({
                    orderIdList: this.value
                }).then( res => {
                    setTimeout(()=>loading.close(),1000);
                    if(res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '排程成功!请点击其他栏目查看排程结果！'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .layout-main {
        width: 80%;
        margin-left: 10%;
    }
    .transfer-footer {
        margin-left: 150px;
        padding: 6px 5px;
    }
</style>