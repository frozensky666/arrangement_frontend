<template>
    <Layout>
		<div class="time-wrap">
			<div class="time-header">
				<div class="time-header-left">
					<div class="time-title">模拟时间</div>
				</div>
				<div class="time-header-right">
					<el-switch
					  v-model="quickmode"
					  active-text="快速模式"
					  inactive-text="普通模式">
					</el-switch>
				</div>
			
			</div>
			<div class="time-body">
				<div class="time-left">
					<div><p class="fontofname">修改当日时间</p></div>
					<div class="time-select-moni">
					    <el-date-picker
					      v-model="value2"
					      type="date"
					      placeholder="选择日期"
					      format="yyyy 年 MM 月 dd 日"
					      value-format="yyyy/MM/dd"
						  @change="timeChange(value2)">
					    </el-date-picker>
					 </div>
				</div>
				
				<div class="time-right">
					<p class="fontoftimetext">当前系统模拟时间为</p>
					<p class="fontoftime">{{value2}}</p>
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
    export default {
        components: {
            Layout
        },
		data() {
		      return {
					quickmode: true,
					value2: "2019/11/09",
					value: new Date("2019/11/09")
		      }
		    },
		methods:{
			timeChange(time) {
			    console.log(time);
				this.value=new Date(this.value2);
			},
			timeChange2(d) {
			    console.log(d);
				this.value2=d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
			},
		}
    }
</script>

<style scoped>
	.time-wrap {
	    width: 80%;
	    min-width: 600px;
	    margin-left: 10%;
	}
	.time-header {
	    margin-top: 50px;
	    margin-bottom: 50px;
	    display: flex;
	    justify-content: space-between;
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
		display: flex;
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