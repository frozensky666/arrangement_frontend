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
			  <div class="item" style="display: flex; margin-bottom: 20px;">
					<div class="attr">
						<div class="attr-name">子订单编号</div>
						<div class="attr-value">{{workData.workId}}</div>
					</div>
					<div class="attr">
						<div class="attr-name">子订单生产数量</div>
						<div class="attr-value">{{workData.num}}</div>
					</div>
			  </div>
			  <div class="item" style="display: flex;">
					<div class="attr">
						<div class="attr-name">子订单生产时间</div>
						<div class="attr-value">{{timeQuantum}}</div>
					</div>
					<div class="attr">
						<div class="attr-name">生产线</div>
						<div class="attr-value">{{workData.lineName}}</div>
					</div>
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
			  		  :data="workData.devices"
			  		 
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
			    :data="workData.persons"
			   
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
	import request from "@/network/request";
	import {getsuborder} from "@/network/plan";
	const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）
	import moment from 'moment'

    export default {
        components: {
            Layout
        },
		data(){
			return {
			timeQuantum:'',
			workData:[],
			thedate:'',
			  }
		},
		mounted() {
				
				getproduction({
				    params: {
				       workId:this.$route.params.id
				    }
				}).then(res => {
				        if(res.code === 200) {
							console.log("workid======"+this.$route.params.id)
							this.workData = res.data;
							var d=new Date(this.workData.endTime);
							var c=d- 1 * 60 * 60 * 1000;
							this.timeQuantum=moment(c).format('YYYY-MM-DD HH:mm:ss')+"~"+moment(d).format('YYYY-MM-DD HH:mm:ss');
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
		      goBack() {
		       this.$router.go(-1)
		      }
		    }
    }
</script>

<style scoped>
	.work-main {
	    margin: 0 32px;
	    
		
		
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
		margin-top: 24px;
	    margin-bottom: 24px;
		
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
	.attr {
		display: flex;
		flex-direction: row;
		width: 50%;
	}
	.attr-name {
		min-width: 160px;
		font-size: 18px;
	}
	.attr-value {
		font-size: 16px;
	}
	
</style>