<template>
    <Layout>
        <h2>订单管理</h2>
        <div>
            <el-button type="primary" class="right-float" @click="dialogFormVisible = true">添加订单</el-button>
            <el-dialog title="添加订单" :visible.sync="dialogFormVisible" width="600px">
                <el-form :model="form" :rules="rules"  ref="orderCreateForm">
                    <el-form-item label="订单编号" :label-width="formLabelWidth" prop="orderId" style="display: none">
                            <el-input v-model.number="form.orderId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物料编号" :label-width="formLabelWidth" prop="materialId">
                        <el-select v-model="form.materialId" placeholder="请选择">
                            <el-option
                                    v-for="item in materials"
                                    :key="'ma'+item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订货数量" :label-width="formLabelWidth" prop="orderNum">
                        <el-col :span="10">
                            <el-input v-model.number="form.orderNum" autocomplete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="订单交期" :label-width="formLabelWidth" prop="orderDeadline">
                        <el-date-picker
                                v-model="form.orderDeadline"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button> <!--dialogFormVisible = false-->
                    <el-button type="primary" @click="submitForm('orderCreateForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
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
                    prop="orderDeadline"
                    label="订单交期">
            </el-table-column>
        </el-table>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
    export default {
        components: {
            Layout
        },
        data() {
            return {
                orderTableData:  [
                    {
                        orderId: 418477,
                        materialId: 3246515,
                        orderNum: 7700,
                        orderDeadline:"2018-11-9"
                    },
                    {
                        orderId: 418477,
                        materialId: 3246515,
                        orderNum: 7700,
                        orderDeadline:"2018-11-9"
                    },
                    {
                        orderId: 418477,
                        materialId: 3246515,
                        orderNum: 7700,
                        orderDeadline:"2018-11-9"
                    },
                    {
                        orderId: 418477,
                        materialId: 3246515,
                        orderNum: 7700,
                        orderDeadline:"2018-11-9"
                    },
                    {
                        orderId: 418477,
                        materialId: 3246515,
                        orderNum: 7700,
                        orderDeadline:"2018-11-9"
                    }
                ],
                dialogFormVisible: false,
                formLabelWidth: "80px",
                form: {
                    orderId: -1,
                    materialId: null,
                    orderNum: null,
                    orderDeadline: null
                },
                rules: {
                    orderId: [
                        { required: true, message: '订单号不能为空', trigger: 'blur' },
                        { type: 'number', max: -1, message: '此处需要负整数', trigger: 'blur' }
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
                materials: [1,2,3]
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.dialogFormVisible = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .right-float {
       float: right;margin-right: 100px;
    }
</style>