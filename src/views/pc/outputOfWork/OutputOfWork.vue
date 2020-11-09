<template>
    <Layout>
		<el-page-header @back="goBack" content="子订单-资源关系表">
		</el-page-header>
		<div class="work-main">
		<div class="workspace">
			<div >
			  <div class="headerofit">
			    <span class="headeroftop" >子订单详情</span>
			    <div class="textline"></div>
			  </div>
			  <div class="text item" style="display: flex;justify-content: space-between;">
			  	<div style="width: 50%;margin-bottom: 20px;">子订单编号: {{workData[0].workId}}</div>
			  	<div style="width: 50%;margin-bottom: 20px;">子订单数量: {{workData[0].num}} </div>
			  </div>
			  <div class="text item" style="display: flex;justify-content: space-between;">
			  	<div style="width: 50%;">子订单生产时间: {{timeQuantum}}</div>
			  	<div style="width: 50%;">产线名称：{{workData[0].lineName}}</div>
			  </div>
			</div>
			
		</div>
		<div class="worktable">
			<div style="width: 45%;">
			  <div class="headerofit">
			    <span class="headerofcard" >设备</span>
			    <div class="textline"></div>
			  </div>
			  <el-table
			  		  :data="workData[0].devices"
			  		 
			  		  border
			  		  default-expand-all
			  		  >
			  			  <el-table-column
			  				  prop="deviceId"
			  				  label="设备ID">
			  			  </el-table-column>
			  			  <el-table-column
			  				  prop="deviceName"
			  				  label="设备名称">
			  			  </el-table-column>
			  </el-table>
			</div>
			<div style="width: 45%;">
			  <div class="headerofit">
			    <span class="headerofcard" >人员</span>
			    <div class="textline"></div>
			  </div>
			  <el-table
			    :data="workData[0].persons"
			   
			    border
			    default-expand-all
			    >
			  	  <el-table-column
			  		  prop="personId"
			  		  label="人员ID">
			  	  </el-table-column>
			  	  <el-table-column
			  		  prop="groupId"
			  		  label="群组ID">
			  	  </el-table-column>
			  	  <el-table-column
			  		  prop="personName"
			  		  label="人员姓名">
			  	  </el-table-column>
			  </el-table>
			</div>
			
		</div>
		
					
					
		
		</div>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
	import {getproduction} from "@/network/plan";
	import moment from 'moment'

    export default {
        components: {
            Layout
        },
		data(){
			return {
			timeQuantum:'',
			workData:[{
			    workId: 123123123,
			    num: 100,
			    endTime: "2018-10-01T08:00:00",
			    lineName: "line1",
			    devices: [
			      {
			        deviceId: 1,
			        deviceName: "移印机"
			      },
				  {
				    deviceId: 2,
				    deviceName: "移印机"
				  },
				  {
				    deviceId: 3,
				    deviceName: "移印机"
				  }
			    ],
			    persons: [
			      {
			        personId: 1111,
			        groupId: "12222",
			        personName: "林佳奇"
			      },
				  {
				    personId: 13333,
				    groupId: "14444",
				    personName: "林佳奇"
				  },
				  {
				    personId: 15555,
				    groupId: "16666",
				    personName: "林佳奇"
				  },
				  {
				    personId: 17777,
				    groupId: "18888",
				    personName: "林佳奇"
				  }
			    ]
			  }],
			  }
		},
		mounted() {
			getproduction()
			    .then(res => {
			        if(res.code === 200) {
			            this.workData[0] = res.data;
			            console.log(this.orderPlanData[0])
			            var d=new Date(this.workData[0].endTime);
			            var c=d- 1 * 60 * 60 * 1000;
			            this.timeQuantum=moment(c).format('YYYY-MM-DD HH:mm:ss')+"~"+moment(d).format('YYYY-MM-DD HH:mm:ss');
			            console.log(this.timeQuantum);
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
			var d=new Date(this.workData[0].endTime);
			var c=d- 1 * 60 * 60 * 1000;
			this.timeQuantum=moment(c).format('YYYY-MM-DD HH:mm:ss')+"~"+moment(d).format('YYYY-MM-DD HH:mm:ss');
			console.log(this.timeQuantum);
				
				
		    
		},
		methods: {
		      goBack() {
		       this.$router.go(-1)
		      }
		    }
    }
</script>

<style scoped>
	.work-main {
	    width: 80%;
	    margin-left: 10%;
		
		
	}
	.worktable{
		display: flex;
		justify-content: space-between;
	}
	
	
	.workspace{
		margin-top: 30px;
		margin-bottom: 50px;
	}
	
	.text {
	    font-size: 18px;
	  }
	
	.item {
		margin-top: 15px;
	    margin-bottom: 15px;
		
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	    display: table;
	    content: "";
	  }
	  .clearfix:after {
	    clear: both
	  }
	.headerofcard{
		font-size: 22px;
		
	}
	.headeroftop{
		font-size: 28px;
		
	}
	.textline{
		margin-top: 20px;
		border-bottom: solid 1px #ccc;
		
	}
	.headerofit{
		margin-bottom: 20px;
	}
	
</style>