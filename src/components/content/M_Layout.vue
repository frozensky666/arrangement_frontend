<template>
    <div>
        <mt-header fixed :title="title" style='z-index:999;'>
            <mt-button slot="right">
                <span @click="logout()" class="logout">退出登录</span>
            </mt-button>
        </mt-header>
        <div style="padding-top: 3rem;padding-bottom: 3rem">
            <slot></slot>
        </div>
        <mt-tabbar v-model="selected" style='z-index:999;'>
            <mt-tab-item id="/m/projectSwitch" v-if="permit(['0'])">
                <i class="el-icon-sort"></i>
                <div>工程切换</div>
            </mt-tab-item>
            <mt-tab-item id="/m/planOverview" v-if="permit(['0'])">
                <i class="el-icon-s-marketing"></i>
                <div>排程概览</div>
            </mt-tab-item>
            <mt-tab-item id="/m/resourceLoad" v-if="permit(['0','1','2'])">
                <i class="el-icon-pie-chart"></i>
                <div>资源负载图</div>
            </mt-tab-item>
            <mt-tab-item id="/m/orderGantt" v-if="permit(['0','1','2'])">
                <i class="el-icon-data-analysis"></i>
                <div>订单甘特图</div>
            </mt-tab-item>
			<mt-tab-item id="/m/analyze" v-if="permit(['0','1','2'])">
			    <i class="el-icon-files"></i>
			    <div>延期分析</div>
			</mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        name: "M_Layout",
        props: ['title'],
        data() {
            return {
                selected: ""
            }
        },
        mounted() {
            this.selected = this.$route.path;
        },
        watch: {
            selected(val) {
                this.$router.push(val).catch(err => {err});
            }
        },
        methods: {
            logout() {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("auth");
                this.$router.push('/m/login');
            },
            getUsername() {
                return sessionStorage.getItem("user");
            },
            permit(arr) {
                return arr.some(auth => auth === sessionStorage.getItem("auth"));
            },
        }
    }
</script>

<style scoped>
    .logout {
        text-decoration: underline;
        color: #ffcbbc;
    }
    .mint-tabbar {
        position: fixed;
    }
</style>