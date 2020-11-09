<template>
    <Layout>
        <div class="orderplan-wrap">
        	<div class="orderplan-header">
				<h2>订单计划表</h2>

        	</div>
        	<div class="orderplan-body">
				<div>
				  <el-table
				    :data="orderPlanData"
				    style="width: 100%;margin-bottom: 20px;"
				    border>
				    <el-table-column type="expand" >
					  <template slot-scope="props" v-if="props.row.subOrders.length!=0">
						  <el-table
						    :data="props.row.subOrders"
						    style="width: 100%;margin-bottom: 20px;"
						    >
						<el-table-column
						        prop="workId"
						        label="子订单编号"
								>
						</el-table-column>
						<el-table-column
						        prop="num"
						        label="子订单数量"
								>
						</el-table-column>
						<el-table-column
						        prop="timeQuantum"
						        label="生产时间"
								width="400px">
						</el-table-column>
						<el-table-column label="操作"
						 width="200px">
						      <template slot-scope="scope" >
						        <el-button
						          size="mini"
								  type="primary"
						          @click="handleEdit(scope.row.workId)" >子订单-资源关系表</el-button>
						      </template>
						</el-table-column>
						 </el-table>
					  </template>
					</el-table-column>
				    <el-table-column
				            prop="orderId"
				            label="订单编号"
							>
				    </el-table-column>
				    <el-table-column
				            prop="materialId"
				            label="物料编号"
							>
				    </el-table-column>
				    <el-table-column
				            prop="orderDeadline"
				            label="订单交期"
							>
				    </el-table-column>
					
					
				  </el-table>
				</div>
        	</div>

        	
        </div>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
	import {getsuborder} from "@/network/plan";
	import moment from 'moment';
    export default {
        components: {
            Layout
        },
		data() {
		      return {
				  orderPlanData:  [],	        
		      }
		    },
			
			mounted() {
				getsuborder()
				    .then(res => {
				        if(res.code === 200) {
				            this.orderPlanData = res.data;
							console.log(this.orderPlanData[0])
							for(let i=0;i<this.orderPlanData.length;i++){
								this.$set(this.orderPlanData[i],"id",i);
								for(let j=0;j<this.orderPlanData[i].subOrders.length;j++){
									this.$set(this.orderPlanData[i].subOrders[j],"id",(i+1)*100+j);
									var d=new Date(this.orderPlanData[i].subOrders[j].endTime);
									var c=d- 1 * 60 * 60 * 1000;
									var f=moment(c).format('YYYY-MM-DD HH:mm:ss')+" ~ "+moment(d).format('YYYY-MM-DD HH:mm:ss');
									this.$set(this.orderPlanData[i].subOrders[j],"timeQuantum",f);
								}
								
							}
				        } else {
				            alert(res.msg);
				        }
				    })
				    .catch(err => {
				        this.$message({
				            type: 'error',
				            message: "未知错误，请重试"
				        });
				    });
				
					
					
			    
			},
			methods: {
			      handleEdit(workId) {
			        console.log(workId);
					        this.$router.push({
					          path: `/pc/outputOfWork/${workId}`,
					        })
			      }
			      
			    }
    }
</script>

<style scoped>
	.orderplan-wrap {
		width: 80%;
	    margin-left: 10%;
		
		
	}
	.orderplan-header {
	    margin-bottom: 50px;
	}
	.orderplan-title {
	    padding: 20px;
	    border: 1px solid #1f94ff;
	}
	
	.orderplan-header-right {
	    margin-top: 30px;
	}
	.orderplan-body {

	}
	.fontofname {
	
		font-family: "PingFang SC";
		font-size: 18px;
		font-weight: bold;
	}
	
</style>