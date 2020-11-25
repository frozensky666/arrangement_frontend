<template>
    <div>
        planOverview
    </div>
</template>

<script>
    import {planOverview} from "@/network/plan";

    export default {
        name: "PlanOverview",
        data() {
            return {
                overview: null
            }
        },
        mounted() {
            planOverview().then(
                res => {
                    if (res.code === 200) {
                        this.overview = res.data;
                        console.log(this.overview);
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
        }
    }
</script>

<style scoped>

</style>