<template>
	<Layout>
		<h2>设备管理</h2>
		<div class="btn-wrap">
			<el-button type="primary" @click="createFormVisible = true">添加设备</el-button>
		</div>

		<el-dialog title="添加设备" :visible.sync="createFormVisible" width="600px">
			<el-form :model="createForm" :rules="rules"  ref="createForm">
				<el-form-item label="设备编号" :label-width="formLabelWidth" prop="deviceId" style="display: none">
					<el-input v-model.number="createForm.deviceId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
					<el-col :span="10">
						<el-input v-model.number="createForm.deviceName" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelForm('createForm','createFormVisible')">取 消</el-button> <!--createFormVisible = false-->
				<el-button type="primary" @click="submitForm('createForm','createFormVisible')">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="修改设备" :visible.sync="modifyFormVisible" width="600px">
			<el-form :model="modifyForm" :rules="rules"  ref="modifyForm">
				<el-form-item label="设备编号" :label-width="formLabelWidth" prop="deviceId">
					<el-input v-model.number="modifyForm.deviceId" autocomplete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
					<el-col :span="10">
						<el-input v-model.number="modifyForm.deviceName" autocomplete="off"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelForm('modifyForm','modifyFormVisible')">取 消</el-button> <!--modifyFormVisible = false-->
				<el-button type="primary" @click="submitForm('modifyForm','modifyFormVisible')">确 定</el-button>
			</div>
		</el-dialog>

		<el-table
				:data="deviceTableData"
				stripe
				style="width: 90%">
			<el-table-column
					prop="deviceId"
					label="设备编号">
			</el-table-column>
			<el-table-column
					prop="deviceName"
					label="设备名称">
			</el-table-column>
			<el-table-column
					label="操作">
				<template slot-scope="scope">
					<el-button type="warning" size="mini" @click="modifyThis(scope.row)">修改</el-button>
					<el-button type="danger" size="mini" @click="deleteThis(scope.row.deviceId)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</Layout>
</template>

<script>
	import Layout from "@/components/content/Layout";
	import {getDevices,updateDevice,deleteDevice,createDevice} from "@/network/deviceManage";

	export default {
		components: {
			Layout
		},
		data() {
			return {
				deviceTableData:  [],

				createFormVisible: false,
				modifyFormVisible:false,

				formLabelWidth: "80px",

				createForm: {
					deviceId: -1,
					deviceName: null
				},
				modifyForm: {
					deviceId: null,
					deviceName: null
				},

				rules: {
					deviceId: [
						{ type: 'number', required: true, message: '设备号不能为空', trigger: 'blur' }
					],
					deviceName: [
						{ required: true, message: '设备名称不能为空', trigger: 'blur' }
					],
				}
			}
		},
		mounted() {
			getDevices()
				.then(res => {
					if(res.code === 200) {
						this.deviceTableData = res.data;
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
						let op = formName === "createForm" ? createDevice : updateDevice;
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
				console.log(this.modifyForm);
				this.modifyFormVisible = true;
			},
			deleteThis(id) {
				this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteDevice({
						params: {
							deviceId: id
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
</style>