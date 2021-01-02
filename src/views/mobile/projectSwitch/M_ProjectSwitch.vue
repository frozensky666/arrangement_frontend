<template>
    <M_Layout title="工程切换">
		<div class="project-wrap">
			
			<el-button :plain="true" @click="open" class="project-formbody">
				<div class="inbutton">
					<div class="project-header-right">
						<div class="project-title">工程A</div>
						<div class="project-textbody">按期交货率最高</div>
					</div>
					<i v-if="projectid==0" class="el-icon-check" style="margin-top: 3rem;font-size: 5rem;margin-right: 1rem;"></i>
				</div>
			</el-button>
			<el-button :plain="true" @click="open2" class="project-formbody">
				<div class="inbutton">
					<div class="project-header-right">
						<div class="project-title">工程B</div>
						<div class="project-textbody">机器利用率最高</div>
					</div>
					<i v-if="projectid==1" class="el-icon-check" style="margin-top: 3rem;font-size: 5rem;margin-right: 1rem;"></i>
				</div>
			</el-button>
			
		</div>
	</M_Layout>
</template>

<script>
    import M_Layout from "@/components/content/M_Layout";
	import {getswitch} from "@/network/switchProject";
	import {setswitch} from "@/network/switchProject";
	import request from "@/network/request";
    export default {
        name: "M_ProjectSwitch",
        components: {
            M_Layout
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

	.inbutton{
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.project-header-right {
	    margin-top: 50px;
		margin-left: 1rem;
	}
	.project-title {
text-align:left; 
	    font-family:"SourceHanSansSC-regular";
		font-size: 38px;
	}
	.project-textbody{
		margin-top: 2rem;
		margin-bottom: 3rem;
		font-family:"SourceHanSansSC-regular";
		font-size: 24px;
	}
	.project-formbody{
		margin-top: 2rem;
		margin-left: 1rem;
		margin: 0 32px;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
</style>