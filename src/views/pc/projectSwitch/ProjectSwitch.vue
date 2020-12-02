<template>
    <Layout>
		<div class="project-wrap">
			<div class="project-header">
				<h2>工程切换</h2>
			</div>
			<el-button :plain="true" @click="open" class="project-formbody">
				<div class="inbutton">
					<div class="project-header-right">
						<div class="project-title">工程A</div>
						<div class="project-textbody">按期交货率最高</div>
					</div>
					<i v-if="projectid==0" class="el-icon-check" style="margin-top: 50px;font-size: 150px;margin-right: 50px;"></i>
				</div>
			</el-button>
			<el-button :plain="true" @click="open2" class="project-formbody">
				<div class="inbutton">
					<div class="project-header-right">
						<div class="project-title">工程B</div>
						<div class="project-textbody">机器利用率最高</div>
					</div>
					<i v-if="projectid==1" class="el-icon-check" style="margin-top: 50px;font-size: 150px;margin-right: 50px;"></i>
				</div>
			</el-button>
			
		</div>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
	import {getswitch} from "@/network/switchProject";
	import {setswitch} from "@/network/switchProject";
	import request from "@/network/request";
    export default {
        components: {
            Layout
        },
		data() {
		      return {
					projectid:'0',
		      }
		    },
			mounted() {
						getswitch().then(res => {
							          if(res.code === 200) {
							  			this.projectid = res.data;
							  			console.log(this.projectid)
							  			} else {
							              alert(res.msg);
							          }
							      })
							      .catch(err => {
							          this.$message({
							              type: 'error',
							              message: "获取工程列表失败"
							          });
							      });
			 },
		methods:{
			open() {
					this.projectid=0
			        this.$message({
			          message: '工程切换成功',
			          type: 'success'
			        });
					setswitch({
					params: {
					   project:'0'
					}
					}).then(res => {
						          if(res.code === 200) {
						  			console.log(this.projectid)
						  			} else {
						              alert(res.msg);
						          }
						      })
						      .catch(err => {
						          this.$message({
						              type: 'error',
						              message: "工程切换失败"
						          });
						      });
			      },
						  
			open2() {
				 		this.projectid=1
				         this.$message({
				           message: '工程切换成功',
				           type: 'success'
				         });
						 setswitch({
							params: {
							   project:'1'
							}
							}).then(res => {
										  if(res.code === 200) {
											console.log(this.projectid)
											} else {
											  alert(res.msg);
										  }
									  })
									  .catch(err => {
										  this.$message({
											  type: 'error',
											  message: "工程切换失败"
										  });
									  });
						 },
				      
				  
			
		}
    }
</script>
<style scoped>
.el-button+.el-button {
	margin-left: 0;
}
	.project-wrap {
	    width: 80%;
	    margin-left: 10%;
	}
	.project-header {
	    /* margin-top: 50px; */
	    margin-bottom: 50px;
	   /* display: flex;
	    justify-content: space-between; */
	}
	.project-title {
	    font-family:"SourceHanSansSC-regular";
		font-size: 38px;
	}
	.project-textbody{
		margin-top: 50px;
		margin-bottom: 80px;
		font-family:"SourceHanSansSC-regular";
		
		font-size: 24px;
	}
	.project-formbody{
		margin-top: 50px;
		
		width: 90%;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
	.inbutton{
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.project-header-right {
	    margin-top: 50px;
		margin-left: 60px;
	}
	.time-body {
	    margin-top: 50px;
	    display: flex;
	    justify-content: space-between;
	}
	.fontofname {
	
		font-family: "PingFang SC";
		font-size: 18px;
		font-weight: bold;
	}
	.time-left{
		margin-top: 30px;
	
	}
	.time-right{
		display: flex;
	}
	.fontoftimetext {
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: bold;
	}
	.fontoftime {
		padding-left: 20px;
		font-family: "PingFang SC";
		font-size: 30px;
		font-weight: bold;
		color: #00BFFF;
	}
	.time-select-moni{
		margin-top: 10px;
		margin-left: 20px;
		
	}
	.time-calendar{
		display: flex;
		justify-content: space-between;
	}
	.is-selected {
	    color: #1989FA;
	  }
</style>