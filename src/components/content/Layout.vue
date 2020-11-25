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
                <el-menu-item index="/pc/plan" v-if="permit(['0'])">
                    <i class="el-icon-receiving"></i>
                    <span slot="title">排程</span>
                </el-menu-item>
                <el-menu-item index="/pc/planOverview" v-if="permit(['0'])">
                    <i class="el-icon-s-marketing"></i>
                    <span slot="title">排程概况</span>
                </el-menu-item>
                <el-menu-item index="/pc/outputOfOrderPlan" v-if="permit(['0','1','2'])">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">订单计划表</span>
                </el-menu-item>
                <el-menu-item index="/pc/resourceGantt" v-if="permit(['0','1','2'])">
                    <i class="el-icon-data-line"></i>
                    <span slot="title">资源甘特图</span>
                </el-menu-item>
                <el-menu-item index="/pc/testResourceLoad" v-if="permit(['0','1','2'])">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">资源负载图</span>
                </el-menu-item>
                <el-menu-item index="/pc/testorderGantt" v-if="permit(['0','1','2'])">
                    <i class="el-icon-data-analysis"></i>
                    <span slot="title">订单甘特图</span>
                </el-menu-item>
<!--                <el-menu-item index="/pc/timeManage" v-if="permit(['0'])">-->
<!--                    <i class="el-icon-alarm-clock"></i>-->
<!--                    <span slot="title">模拟时间</span>-->
<!--                </el-menu-item>-->
				<el-menu-item index="/pc/orderManage" v-if="permit(['0'])">
				    <i class="el-icon-document"></i>
				    <span slot="title">订单管理</span>
				</el-menu-item>
                <el-menu-item index="/pc/personnelManage" v-if="permit(['0'])">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">人员管理</span>
                </el-menu-item>
                <el-menu-item index="/pc/deviceManage" v-if="permit(['0'])">
                    <i class="el-icon-setting"></i>
                    <span slot="title">设备管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-main>
            <div class="main-header">
                <div>
                    系统当前模拟时间：
                    <el-date-picker
                        v-model="current"
                        type="datetime"
                        placeholder="选择日期时间"
                        @change="dateChange">
                    </el-date-picker>
                </div>
                <div class="logout">欢迎你，
                    <el-tooltip class="item" effect="dark" content="点击登出" placement="bottom-end">
                        <span @click="logout()" class="logout-name">{{getUsername()}}</span>
                    </el-tooltip>
                </div>
            </div>
            <slot></slot>
        </el-main>
    </el-container>
</template>

<script>
    import moment from "moment";

    export default {
        name: "Layout",
        data() {
            return {
                current: "2018-10-04T00:00:00"
            }
        },
        mounted() {
          this.current = sessionStorage.getItem("now");
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            logout() {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("auth");
                this.$router.push('/pc/login');
            },
            getUsername() {
                return sessionStorage.getItem("user");
            },
            permit(arr) {
                return arr.some(auth => auth === sessionStorage.getItem("auth"));
            },
            dateChange() {
                sessionStorage.setItem("now",moment(this.current).format('YYYY-MM-DDTHH:mm:ss'));
            }
        },
    }
</script>

<style>
    .el-aside {
        color: #333;
    }
    .logout-name {
        text-decoration: underline;
        color: #1f94ff;
        cursor: pointer;
    }
    .main-header {
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>