<template>
    <div>
        <el-button @click="login">登录</el-button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            login() {
                this.$router.push("/pc/plan");
            }
        }
    }
</script>

<style scoped>

</style>