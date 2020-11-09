<template>
    <Layout>
       <div class="layout-main">
           <h2>订单管理</h2>
           <div class="btn-wrap">
               <el-button type="primary" @click="createFormVisible = true">添加订单</el-button>
           </div>

           <el-dialog title="添加订单" :visible.sync="createFormVisible" width="600px">
               <el-form :model="createForm" :rules="rules"  ref="createForm">
                   <el-form-item label="订单编号" :label-width="formLabelWidth" prop="orderId" style="display: none">
                       <el-col :span="10">
                            <el-input v-model.number="createForm.orderId" autocomplete="off"></el-input>
                       </el-col>
                   </el-form-item>
                   <el-form-item label="物料编号" :label-width="formLabelWidth" prop="materialId">
                       <el-select v-model="createForm.materialId" placeholder="请选择">
                           <el-option
                                   v-for="item in materials"
                                   :key="'c'+item"
                                   :label="item"
                                   :value="item">
                           </el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="订货数量" :label-width="formLabelWidth" prop="orderNum">
                       <el-col :span="10">
                           <el-input v-model.number="createForm.orderNum" autocomplete="off"></el-input>
                       </el-col>
                   </el-form-item>
                   <el-form-item label="订单交期" :label-width="formLabelWidth" prop="orderDeadline">
                       <el-date-picker
                               v-model="createForm.orderDeadline"
                               type="date"
                               placeholder="选择日期">
                       </el-date-picker>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="cancelForm('createForm','createFormVisible')">取 消</el-button> <!--createFormVisible = false-->
                   <el-button type="primary" @click="submitForm('createForm','createFormVisible')">确 定</el-button>
               </div>
           </el-dialog>

           <el-dialog title="修改订单" :visible.sync="modifyFormVisible" width="600px">
               <el-form :model="modifyForm" :rules="rules"  ref="modifyForm">
                   <el-form-item label="订单编号" :label-width="formLabelWidth" prop="orderId">
                       <el-col :span="10">
                           <el-input v-model.number="modifyForm.orderId" autocomplete="off" :disabled="true"></el-input>
                       </el-col>
                   </el-form-item>
                   <el-form-item label="物料编号" :label-width="formLabelWidth" prop="materialId">
                       <el-select v-model="modifyForm.materialId" placeholder="请选择">
                           <el-option
                                   v-for="item in materials"
                                   :key="'m'+item"
                                   :label="item"
                                   :value="item">
                           </el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="订货数量" :label-width="formLabelWidth" prop="orderNum">
                       <el-col :span="10">
                           <el-input v-model.number="modifyForm.orderNum" autocomplete="off"></el-input>
                       </el-col>
                   </el-form-item>
                   <el-form-item label="订单交期" :label-width="formLabelWidth" prop="orderDeadline">
                       <el-date-picker
                               v-model="modifyForm.orderDeadline"
                               type="date"
                               placeholder="选择日期">
                       </el-date-picker>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="cancelForm('modifyForm','modifyFormVisible')">取 消</el-button> <!--createFormVisible = false-->
                   <el-button type="primary" @click="submitForm('modifyForm','modifyFormVisible')">确 定</el-button>
               </div>
           </el-dialog>

           <el-table
                   :data="orderTableData"
                   stripe
                   style="width: 90%">
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
                       label="订单交期">
                   <template slot-scope="scope">
                       {{scope.row.orderDeadline |dateFormat}}
                   </template>
               </el-table-column>
               <el-table-column
                       label="操作">
                   <template slot-scope="scope">
                       <el-button type="warning" size="mini" @click="modifyThis(scope.row)">修改</el-button>
                       <el-button type="danger" size="mini" @click="deleteThis(scope.row.orderId)">删除</el-button>
                   </template>
               </el-table-column>
           </el-table>
       </div>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
    import {getOrders,updateOrder,createOrder,deleteOrder} from "@/network/orderManage";
    import {getAllMaterial} from "@/network/materialManage";

    export default {
        components: {
            Layout
        },
        data() {
            return {
                orderTableData:  [],
                createFormVisible: false,
                modifyFormVisible:false,

                formLabelWidth: "80px",

                createForm: {
                    orderId: -1,
                    materialId: null,
                    orderNum: null,
                    orderDeadline: null
                },
                modifyForm: {
                    orderId: -1,
                    materialId: null,
                    orderNum: null,
                    orderDeadline: null
                },

                rules: {
                    orderId: [
                        { type: 'number', required: true, message: '订单号不能为空', trigger: 'blur' }
                    ],
                    materialId: [
                        { required: true, message: '请选择物料编号', trigger: 'change' }
                    ],
                    orderNum: [
                        { required: true, message: '订单数量不能为空', trigger: 'blur' },
                        { type: 'number', min: 1, message: '订单数量不能小于1', trigger: 'blur' }
                    ],
                    orderDeadline: [
                        { type: 'date', required: true, message: '请选择订单截止日期', trigger: 'change' }
                    ]
                },
                materials: []
            }
        },
        filters: {
            dateFormat: (d) => new Date( new Date(d).getTime()+ 8 * 3600 * 1000).toISOString()
                .split("T")[0]
        },
        mounted() {
            getOrders()
                .then(res => {
                    if(res.code === 200) {
                        res.data.forEach(item => item.orderDeadline = new Date(item.orderDeadline));
                        this.orderTableData = res.data;
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
            getAllMaterial().
                then(res => {
                    if(res.code === 200) {
                        this.materials = res.data;
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
                        let op = formName === "createForm" ? createOrder : updateOrder;
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
                this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteOrder({
                        params: {
                            orderId: id
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