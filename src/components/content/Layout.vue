<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="250px" style="background-color: #545c64">
            <el-menu
                    :default-active="this.$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                    active-text-color="#ffd04b"
                    router>
                <el-menu-item index="/pc/plan">
                    <i class="el-icon-receiving"></i>
                    <span slot="title">排程</span>
                </el-menu-item>
                <el-menu-item index="/pc/timeManage">
                    <i class="el-icon-alarm-clock"></i>
                    <span slot="title">模拟时间</span>
                </el-menu-item>
                <el-menu-item index="/pc/resourceGantt">
                    <i class="el-icon-data-line"></i>
                    <span slot="title">资源甘特图</span>
                </el-menu-item>
                <el-menu-item index="/pc/testResourceLoad">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">资源负载图</span>
                </el-menu-item>
                <el-menu-item index="/pc/testorderGantt">
                    <i class="el-icon-data-analysis"></i>
                    <span slot="title">订单甘特图</span>
                </el-menu-item>
				<el-menu-item index="/pc/orderManage">
				    <i class="el-icon-document"></i>
				    <span slot="title">订单管理</span>
				</el-menu-item>
				<el-menu-item index="/pc/outputOfOrderPlan">
				    <i class="el-icon-notebook-2"></i>
				    <span slot="title">订单计划表</span>
				</el-menu-item>
                <el-menu-item index="/pc/deviceManage">
                    <i class="el-icon-setting"></i>
                    <span slot="title">设备管理</span>
                </el-menu-item>
                <el-menu-item index="/pc/personnelManage">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">人员管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-main>
            <el-tooltip class="item" effect="dark" content="点击登出" placement="bottom-end">
                <div class="logout" @click="logout()">欢迎你，{{getUsername()}}</div>
            </el-tooltip>
            <slot></slot>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Layout",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            logout() {
                sessionStorage.removeItem("user");
                this.$router.push('/pc/login');
            },
            getUsername() {
                return sessionStorage.getItem("user");
            }
        },
    }
</script>

<style>
    .el-aside {
        color: #333;
    }
    .logout {
        text-align: right;
        text-decoration: underline;
        color: #1f94ff;
        cursor: pointer;
    }
</style>