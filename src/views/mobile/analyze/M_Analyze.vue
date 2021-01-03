<template>
    <M_Layout title="延期分析">
		<div class="project-wrap">
			<div class="project-header">

				<el-collapse accordion v-for="item in orderList" :key="item.orderId" >
				  <el-collapse-item >
				    <template slot="title" >
						<div class="order-title1">
							<div style="line-height: 1rem;margin-top: 0.5rem;">订单编号：{{item.orderId}}</div>
							<div style="line-height: 1rem;margin-top: 0.5rem;">订单交期：{{item.orderDeadline}}</div>
							<div style="line-height: 1rem;margin-top: 0.5rem;">预计交期：{{item.planDeadline}}</div>
							<div></div>
						</div>
				    </template>
				    <div v-for="dela in item.delays" :key="dela.date">
							<el-divider/>
						<div class="delay-title" >{{dela.date}}</div>
						<div class="delay-progress">
							<div  style="font-size: 18px;">平均生产进度：{{(item.avgProgress * 100).toFixed(0)}}%</div>
							<div  style="font-size: 18px;">实际生产进度：{{(dela.progress * 100).toFixed(0)}}%</div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div v-if="item.requireHuman!=0">
							<div class="delay-human">
								<div class="delay-sontitle">人力资源</div>
								<el-tag v-if="dela.human.enough" effect="dark" type="success" style="margin-top: 20px;">充足</el-tag>
								<el-tag v-if="!dela.human.enough" effect="dark" type="danger" style="margin-top: 20px;" >不足</el-tag>
							</div>
							<div class="delay-need">需要数量：{{item.requireHuman}}</div>
							<el-table
							    :data="dela.human.resources"
								border
							    style="width: 100%">
							    <el-table-column
							      label="人员信息"
							      >
							      <template slot-scope="scope">
							        
							        <span style="margin-left: 10px">{{ scope.row.resourceName }}</span>
							      </template>
							    </el-table-column>
								<el-table-column
								  label="最大工作时间"
								  >
								  <template slot-scope="scope">
								    
								    <span style="margin-left: 10px">{{ scope.row.maxWorkTime }}</span>
								  </template>
								</el-table-column>
								<el-table-column
								  label="实际工作时间"
								 >
								  <template slot-scope="scope">
								    
								    <span style="margin-left: 10px">{{ scope.row.actualWorkTime }}</span>
								  </template>
								</el-table-column>
							    <el-table-column
							      label="其它订单占用时间"
							      >
							      <template slot-scope="scope" style="display: flex;">
							        <div v-for="occupation in scope.row.occupations" :key="occupation.orderId" >
										<div>{{occupation.orderId}} （{{occupation.time}} 小时）</div>
									</div>
							      </template>
							    </el-table-column>
							    
							  </el-table>
						</div>
						<div v-if="item.requireDevice!=0">
							<div class="delay-human">
								<div class="delay-sontitle">设备资源</div>
								<el-tag v-if="dela.device.enough" effect="dark" type="success" style="margin-top: 20px;">充足</el-tag>
								<el-tag v-if="!dela.device.enough" effect="dark" type="danger"  style="margin-top: 20px;">不足</el-tag>
							</div>
							<div class="delay-need">需要数量：{{item.requireDevice}}</div>
							<el-table
							    :data="dela.device.resources"
								border
							    style="width: 100%">
							    <el-table-column
							      label="设备信息"
							      >
							      <template slot-scope="scope">
							        
							        <span style="margin-left: 10px">{{ scope.row.resourceName }}</span>
							      </template>
							    </el-table-column>
								<el-table-column
								  label="最大工作时间"
								  >
								  <template slot-scope="scope">
								    
								    <span style="margin-left: 10px">{{ scope.row.maxWorkTime }}</span>
								  </template>
								</el-table-column>
								<el-table-column
								  label="实际工作时间"
								 >
								  <template slot-scope="scope">
								    
								    <span style="margin-left: 10px">{{ scope.row.actualWorkTime }}</span>
								  </template>
								</el-table-column>
							    <el-table-column
							      label="其它订单占用时间"
							      >
							      <template slot-scope="scope" style="display: flex;">
							        <div v-for="occupation in scope.row.occupations" :key="occupation.orderId" >
										<div>{{occupation.orderId}} （{{occupation.time}} 小时）</div>
									</div>
							      </template>
							    </el-table-column>
							    
							  </el-table>
						</div>
						<div v-if="item.requireLine!=0">
							<div class="delay-human">
								<div class="delay-sontitle">产线资源</div>
								<el-tag v-if="dela.line.enough" effect="dark" type="success" style="margin-top: 20px;">充足</el-tag>
								<el-tag v-if="!dela.line.enough" effect="dark" type="danger" style="margin-top: 20px;">不足</el-tag>
							</div>
							<div class="delay-need">需要数量：{{item.requireLine}}</div>
							<el-table
							    :data="dela.line.resources"
								border
							    style="width: 100%">
							    <el-table-column
							      label="产线信息"
							      >
							      <template slot-scope="scope">
							        
							        <span style="margin-left: 10px">{{ scope.row.resourceName }}</span>
							      </template>
							    </el-table-column>
								<el-table-column
								  label="最大工作时间"
								  >
								  <template slot-scope="scope">
								    
								    <span style="margin-left: 10px">{{ scope.row.maxWorkTime }}</span>
								  </template>
								</el-table-column>
								<el-table-column
								  label="实际工作时间"
								 >
								  <template slot-scope="scope">
								    
								    <span style="margin-left: 10px">{{ scope.row.actualWorkTime }}</span>
								  </template>
								</el-table-column>
							    <el-table-column
							      label="其它订单占用时间"
							      >
							      <template slot-scope="scope" style="display: flex;">
							        <div v-for="occupation in scope.row.occupations" :key="occupation.orderId" >
										<div>{{occupation.orderId}} （{{occupation.time}} 小时）</div>
									</div>
							      </template>
							    </el-table-column>
							    
							  </el-table>
						</div>
					</div>
				    
				  </el-collapse-item>
				</el-collapse>
			</div>
		</div>
	</M_Layout>
</template>

<script>
    import M_Layout from "@/components/content/M_Layout";
	import {getdelayList} from "@/network/analyze";
	import request from "@/network/request";
    export default {
        name: "M_ProjectSwitch",
        components: {
            M_Layout
        },
		data() {
		      return {
					orderList: [
						{
						orderId: 161231234,
						orderDeadline: "2002-08-22",
						planDeadline: "1977-11-29",
						requireHuman: 4,
						requireDevice: 1,
						requireLine: 1,
						avgProgress: 0.33,
						delays: [
							{
							  date: "1979-05-23",
							  progress: "0.25",
							  human: {
								enough: false,
								resources: [
								  {
									resourceName: "马保国",
									maxWorkTime: "12",
									actualWorkTime: "8",
									occupations: [
									  
									  {
									  										orderId: 463467,
									  										time: 2
									  },
									  {
									  										orderId: 3467457,
									  										time: 2
									  }
									]
								  }
								]
							  },
							  device: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "设备1",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  },
							  line: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "产线2",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  }
							}
						],
						},
						{
						orderId: 261231234,
						orderDeadline: "2002-08-22",
						planDeadline: "1977-11-29",
						requireHuman: 4,
						requireDevice: 1,
						requireLine: 1,
						avgProgress: 0.33,
						delays: [
							{
							  date: "1979-05-23",
							  progress: "0.25",
							  human: {
								enough: false,
								resources: [
								  {
									resourceName: "马保国",
									maxWorkTime: "12",
									actualWorkTime: "8",
									occupations: [
									  {
										orderId: 8,
										time: 2
									  }
									]
								  }
								]
							  },
							  device: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "马保国",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  },
							  line: {
								  enough: false,
								  resources: [
								    {
								  	resourceName: "马保国",
								  	maxWorkTime: "12",
								  	actualWorkTime: "8",
								  	occupations: [
								  	  {
								  		orderId: 8,
								  		time: 2
								  	  }
								  	]
								    }
								  ]
							  }
							}
						],
						},
						]
		      }
		    },
			mounted() {
						getdelayList().then(res => {
							          if(res.code === 200) {
							  			this.orderList = res.data;
							  			console.log(this.orderList)
							  			} else {
							              alert(res.msg);
							          }
							      })
							      .catch(err => {
							          this.$message({
							              type: 'error',
							              message: "获取延期分析列表失败"
							          });
							      });
			 },
		methods:{
			
		}
    }
</script>

<style scoped>

.el-button+.el-button {
	margin-left: 0;
}
	.project-wrap {
	    margin: 0 32px;
	    
	}
	.project-header {
	    /* margin-top: 50px; */
	    margin-top: 3rem;
	   /* display: flex;
	    justify-content: space-between; */
	}
	.order-title1{
		width: 100%;
		display: flex;
		justify-content: space-between;
		
	}
	.delay-progress{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.delay-title{
		 font-size: 24px;
		 font-weight: bold;
		 margin-bottom: 16px;
	}
	.delay-human{
		
		display: flex;
	}
	.delay-need{
		font-size: 16px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.delay-sontitle{
		font-size: 20px;
		font-weight: bold;
		margin-top: 20px;
		margin-right: 20px;
	}
	
</style>