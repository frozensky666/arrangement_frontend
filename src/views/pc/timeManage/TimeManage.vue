<template>
    <Layout>
		<div class="time-wrap">
			<div class="time-header">
				<h2>模拟时间</h2>
				<!-- <div class="time-header-left">
					<div class="time-title">模拟时间</div>
				</div> -->
				<!-- <div class="time-header-right">
					<el-switch
					  v-model="quickmode"
					  active-text="快速模式"
					  inactive-text="普通模式">
					</el-switch>
				</div> -->
			
			</div>
			<div class="time-body">
				<div class="time-left">
					<div style="margin-left: 20px;"><p class="fontofname">修改当日时间</p></div>
					
					 <div class="time-select-moni">
					     <el-time-picker
					        v-model="value1"
					        :picker-options="{
					        }"
					        placeholder="任意时间点"
							@change="timeChange3(value1)">
					      </el-time-picker>
					  </div>
					 
					  
				</div>
				
				<div>
					<div class="time-right">
						<p class="fontoftimetext">当前系统模拟时间为</p>
						<p class="fontoftime">{{finvalue}}</p>
					</div>
				</div>
			
			</div>
			<div class="time-calendar">
				<div class="time-left" @click="timeChange2(value)">
					<el-calendar  v-model="value" >
					</el-calendar>
				</div>
				
				<div class="time-right">
					
				</div>
			
			</div>
			
		</div>
    </Layout>
</template>

<script>
    import Layout from "@/components/content/Layout";
	import {getsimulatetime} from "@/network/simulationSystem";
	import {setsimulatetime} from "@/network/simulationSystem";
	import request from "@/network/request";
	const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）
	import moment from 'moment';
    export default {
        components: {
            Layout
        },
		data() {
		      return {
					quickmode: true,
					value2: "",
					value1:'',
					value: '',
					finvalue:'',
					subvalue:'',
		      }
		    },
			mounted() {
				getsimulatetime()
				    .then(res => {
				        if(res.code === 200) {
									console.log(res.data)
							this.value1=res.data;
							this.value2=res.data;
							this.value=res.data;
							this.subvalue=res.data;
							this.finvalue=moment(this.value).format('YYYY-MM-DD ')+moment(this.value1).format('HH:mm:ss');
				        } else {
				            alert(res.msg);
				        }
				    })
				    .catch(err => {
				        alert("未知错误，请重试");
				    });
				
					
					
			    
			 },
		methods:{
			
			timeChange2(d) {
			    console.log(d);
				this.value2=d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
				this.finvalue=moment(this.value).format('YYYY-MM-DD ')+moment(this.value1).format('HH:mm:ss');
				this.subvalue=moment(this.finvalue).format('YYYY-MM-DDTHH:mm:ss');
				this.submitetime(this.subvalue)
			},
			timeChange3(time){
				this.finvalue=moment(this.value).format('YYYY-MM-DD ')+moment(this.value1).format('HH:mm:ss');
				this.subvalue=moment(this.finvalue).format('YYYY-MM-DDTHH:mm:ss')
				this.submitetime(this.subvalue)
			},
			submitetime(time){
				
				request._get(API.SIMULATE_TIME+"/"+time)
				    .then(res => {
				        if(res.code === 200) {

							console.log(res.data)
							
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
			}
		}
    }
</script>

<style scoped>
	.time-wrap {
	    width: 80%;
	    margin-left: 10%;
	}
	.time-header {
	    /* margin-top: 50px; */
	    margin-bottom: 50px;
	   /* display: flex;
	    justify-content: space-between; */
	}
	.time-title {
	    padding: 20px;
	    border: 1px solid #1f94ff;
	}

	.time-header-right {
	    margin-top: 30px;
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
		font-size: 36px;
		font-weight: bold;
	}
	.fontoftime {
		padding-left: 20px;
		font-family: "PingFang SC";
		font-size: 36px;
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