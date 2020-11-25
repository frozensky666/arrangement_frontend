<template>
    <div :style="{ height: height, width: width }"></div>
</template>

<script>
    export default {
        name: "planOverviewChart",
        props: {
            option: {
                require: false,
                default() {
                    return {};
                }
            },
            width: {
                require: false,
                default() {
                    return "400px";
                }
            },
            height: {
                require: false,
                default() {
                    return "300px";
                }
            }
        },
        data() {
            return {
                chart: null
            };
        },
        watch: {
            option(val) {
                // console.log("哈哈哈哈");
                this.init();
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let chart = this.$echarts.init(this.$el);
                chart.showLoading();
                chart.setOption(this.option === undefined ? {} : this.option);
                chart.hideLoading();
            }
        }
    };
</script>

<style scoped></style>
