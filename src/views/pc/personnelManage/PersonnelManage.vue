<template>
    <Layout>
        <div class="layout-main">
            <h2>人员管理</h2>
            <div class="btn-wrap">
                <el-button type="primary" @click="createFormVisible = true">添加人员</el-button>
            </div>

            <el-dialog title="添加人员" :visible.sync="createFormVisible" width="600px">
                <el-form :model="createForm" :rules="rules"  ref="createForm">
                    <el-form-item label="人员编号" :label-width="formLabelWidth" prop="personId" style="display: none">
                        <el-col :span="10">
                            <el-input v-model.number="createForm.personId" autocomplete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="所属组" :label-width="formLabelWidth" prop="groupId">
                        <el-select v-model="createForm.groupId" placeholder="请选择">
                            <el-option
                                    v-for="item in groups"
                                    :key="'c'+item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员姓名" :label-width="formLabelWidth" prop="personName">
                        <el-col :span="10">
                            <el-input v-model.number="createForm.personName" autocomplete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="登录密码" :label-width="formLabelWidth" prop="personPassword">
                        <el-col :span="10">
                            <el-input v-model.number="createForm.personPassword" autocomplete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="人员权限" :label-width="formLabelWidth" prop="personAuth">
                        <el-select v-model="createForm.personAuth" placeholder="请选择">
                            <el-option
                                    v-for="item in auth"
                                    :key="'c'+item.label"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelForm('createForm','createFormVisible')">取 消</el-button> <!--createFormVisible = false-->
                    <el-button type="primary" @click="submitForm('createForm','createFormVisible')">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改人员" :visible.sync="modifyFormVisible" width="600px">
                <el-form :model="modifyForm" :rules="rules"  ref="modifyForm">
                    <el-form-item label="人员编号" :label-width="formLabelWidth" prop="personId">
                        <el-col :span="10">
                            <el-input v-model.number="modifyForm.personId" autocomplete="off" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="所属组" :label-width="formLabelWidth" prop="groupId">
                        <el-select v-model="modifyForm.groupId" placeholder="请选择">
                            <el-option
                                    v-for="item in groups"
                                    :key="'c'+item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员姓名" :label-width="formLabelWidth" prop="personName">
                        <el-col :span="10">
                            <el-input v-model.number="modifyForm.personName" autocomplete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="登录密码" :label-width="formLabelWidth" prop="personPassword">
                        <el-col :span="10">
                            <el-input v-model.number="modifyForm.personPassword" autocomplete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="人员权限" :label-width="formLabelWidth" prop="personAuth">
                        <el-select v-model="modifyForm.personAuth" placeholder="请选择">
                            <el-option
                                    v-for="item in auth"
                                    :key="'m'+item.label"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelForm('modifyForm','modifyFormVisible')">取 消</el-button> <!--modifyFormVisible = false-->
                    <el-button type="primary" @click="submitForm('modifyForm','modifyFormVisible')">确 定</el-button>
                </div>
            </el-dialog>

            <el-table
                    :data="personTableData"
                    stripe
                    style="width: 90%">
                <el-table-column
                        prop="personId"
                        label="人员编号">
                </el-table-column>
                <el-table-column
                        width="80"
                        prop="groupId"
                        label="所属组">
                </el-table-column>
                <el-table-column
                        prop="personName"
                        label="人员名称">
                </el-table-column>
                <el-table-column
                        prop="personPassword"
                        label="人员密码">
                </el-table-column>
                <el-table-column
                        label="人员权限">
                    <template slot-scope="scope">
                        {{scope.row.personAuth | authToStr}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">

                        <el-button type="warning" size="mini" @click="modifyThis(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="deleteThis(scope.row.personId)">删除</el-button>

                </el-table-column>
            </el-table>
        </div>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
    import {getPeople,getAllGroups,updatePerson,deletePerson,createPerson} from "@/network/personnelManage";

    export default {
        components: {
            Layout
        },
        data() {
            return {
                personTableData:  [],
                
                createFormVisible: false,
                modifyFormVisible:false,

                formLabelWidth: "80px",

                createForm: {
                    personId: -1,
                    groupId: null,
                    personName: null,
                    personPassword: null,
                    personAuth: 2
                },
                modifyForm: {
                    personId: null,
                    groupId: null,
                    personName: null,
                    personPassword: null,
                    personAuth: null,
                },

                rules: {
                    personId: [
                        { type: 'number', required: true, message: '订单号不能为空', trigger: 'blur' }
                    ],
                    groupId: [
                        { required: true, message: '请选择物料编号', trigger: 'change' }
                    ],
                    personName: [
                        { required: true, message: '用户姓名不能为空', trigger: 'blur' }
                    ],
                    personPassword: [
                        { required: true, message: '用户密码不能为空', trigger: 'blur' }
                    ],
                    personAuth:[
                        { required: true, message: '请选择用户权限', trigger: 'change' }
                    ]
                },
                groups: [],
                auth: [{
                    label: "管理员",
                    value: 0
                },{
                    label: "组长",
                    value: 1
                },{
                    label: "普通员工",
                    value: 2
                }]
            }
        },
        filters: {
            authToStr: i => i === 0 ? "管理员" : ( i === 1 ? "组长" : "普通员工")
        },
        mounted() {
            getPeople()
                .then(res => {
                    if(res.code === 200) {
                        this.personTableData = res.data;
                    }  else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        type: 'error',
                        message: '未知错误，请重试!'
                    });
                });
            getAllGroups().
                then(res => {
                    if(res.code === 200) {
                        this.groups = res.data;
                    } else {
                        alert(res.msg);
                    }
                })
                .catch(err => {
                    alert("未知错误，请重试");
                });
        },
        methods: {
            submitForm(formName,visibleFlag) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let op = formName === "createForm" ? createPerson : updatePerson;
                        op(this[formName]).then(res => {
                            if(res.code !== 200) {
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            } else {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                setTimeout(() => this.$router.go(0),1000);
                            }
                        });
                        this[visibleFlag] = false;
                    } else {
                        return false;
                    }
                });
            },
            cancelForm(formName,visibleFlag) {
                this.$refs[formName].resetFields();
                this[visibleFlag] = false;
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            modifyThis(row) {
                Object.keys(row).forEach(key => this.$set(this.modifyForm,key,row[key]));
                this.modifyFormVisible = true;
            },
            deleteThis(id) {
                this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deletePerson({
                        params: {
                            personId: id
                        }
                    }).then(res => {
                        if(res.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            setTimeout(() => {
                                this.$router.go(0);
                            },1000);
                        }else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .btn-wrap{
        width: 90%;
        display: flex;
        justify-content: flex-end;
    }
    .btn-wrap > * {
        margin-left: 10px;
    }

    .layout-main {
        width: 80%;
        margin-left: 10%;
    }
</style>