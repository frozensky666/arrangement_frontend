<template>
    <div class="login-container">
        <!--        <h1 class="login-title">排程系统</h1>-->
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="login-title">排程系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text"
                          v-model="ruleForm2.username"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm2.password"
                          auto-complete="off"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from "@/network/login";

    export default {
        data(){
            return {
                logining: false,
                ruleForm2: {
                    username: '林佳奇',
                    password: '123',
                },
                rules2: {
                    username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                    password: [{required: true, message: 'enter your password', trigger: 'blur'}]
                },
                checked: false
            }
        },
        methods: {
            handleSubmit(event){
                this.$refs.ruleForm2.validate((valid) => {
                    if(valid){
                        this.logining = true;
                        login(this.ruleForm2).then(res => {
                            if(res.data === null) {
                                this.$message({
                                    type: "error",
                                    message: "用户名或密码错误！"
                                });

                            } else{
                                sessionStorage.setItem('user', this.ruleForm2.username);
                                sessionStorage.setItem("auth",res.data.personAuth);
                                this.logining = false;
                                this.$router.push("/m/planOverview");
                                this.$message({
                                    type: "success",
                                    message: "登陆成功"
                                });
                            }
                        }).catch(err => console.log(err));
                    }else{
                        this.$message({
                            type: "error",
                            message: "未知的错误"
                        });
                    }
                })
            }
        }
    };
</script>

<style scoped>
    .login-page {
        margin: 0 auto;
        padding-top: 40%;
        width: 80%;
        background: #fff;
    }
    .login-title {
        margin: 1rem auto;
    }
</style>