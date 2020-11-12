<template>
	<Layout>
		<div class="gantt-wrap">
			<div class="gantt-header">
				<div class="gantt-header-left">
					<h2>资源负载图</h2>
				</div>
				<div class="gantt-header-middle">
					<div class="grid-content bg-purple" v-if="dateType==='day'">
						<p class="fontofname">设备总负载</p>
						<p class="fontofdate">{{getdaydate(date)}}</p>
						<el-progress type="circle" stroke-linecap="butt" :stroke-width="20" :percentage="parseInt(Loaddata.deviceSumLoad*100)"></el-progress>
					</div>
					<div class="grid-content bg-purple" v-if="dateType==='day'">
						<p class="fontofname">人员总负载</p>
						<p class="fontofdate">{{getdaydate(date)}}</p>
						<el-progress type="circle" stroke-linecap="butt" :stroke-width="20" :percentage="parseInt(Loaddata.personnelSumLoad*100)"></el-progress>
					</div>
					<div class="grid-content bg-purple" v-if="dateType==='date'">
						<p class="fontofname">设备总负载</p>
						<p class="fontofdate">{{getweekdate(date)}}</p>
						<el-progress type="circle" stroke-linecap="butt" :stroke-width="20" :percentage="parseInt(Loaddata.deviceSumLoad*100)"></el-progress>
					</div>
					<div class="grid-content bg-purple" v-if="dateType==='date'">
						<p class="fontofname">人员总负载</p>
						<p class="fontofdate">{{getweekdate(date)}}</p>
						<el-progress type="circle" stroke-linecap="butt" :stroke-width="20" :percentage="parseInt(Loaddata.personnelSumLoad*100)"></el-progress>
					</div>
				</div>

				<div class="gantt-header-right">
					

				</div>
			</div>
			<div class="time-selector">
				<div class="time-selector-left">
					<el-select v-model="dateType" style="width: 160px" @change="timeSelectChange">
						<el-option
								v-for="item in dateTypeOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
					<el-date-picker
					        style="width: 160px"
					        v-model="date"
					        type="date"
					        placeholder="选择日期"
					        @change="timeChange">
					</el-date-picker>
				</div>
				<div class="time-selector-right">
					<div class="time-left" @click="scroll(-1)">
						<div class="time-l-arrow"></div>
					</div>
					<div class="time-middle"
						 :style="{'max-width':blocks*blockSize+'px','flex':'0 0 '+(bodyWidth*0.8-180-2*26)+'px'}"
						 @scroll="drag"
					> <!--  【 总宽*0.8 - selector宽度 - 左右箭头宽度 = 可视窗口宽度 】-->
						<div v-if="dateType==='day'"
							 :style="{'width':blocks*blockSize+'px'}">
							<div v-for="i in getDays(date,blocks)"
								 :key="'month'+i"
								 class="time-middle-content"
								 :style="{'width': blockSize-1+'px'}">
								<span>{{i}}</span>
							</div>
						</div>
						<div v-if="dateType==='date'"
							 :style="{'width':blocks*blockSize+'px'}">
							<div v-for="i in getWeeks(date,blocks)"
								 :key="'month'+i"
								 class="time-middle-content"
								 :style="{'width': blockSize-1+'px'}">
								<span>{{i}}</span>
							</div>
						</div>

					</div>
					<div class="time-right" @click="scroll(1)">
						<div class="time-r-arrow"></div>
					</div>
				</div>


			</div>
			<div class="table" >
				<div class="row" v-for="item in Loaddata.personnelLoad" :key="item.name">
					<div class="row-label">
						{{item.name}}
					</div>
					<div class="row-content" :style="{'width':(bodyWidth*0.8-180-26)+'px','max-width':blocks*blockSize+'px'}">
						<div class="row-content-wrap" :style="{'left':bias+'px'}">
							<el-tooltip
									v-for="(block,index) in item.load" :key="block.data+block.percent"
									effect="dark" :content="getPercentage(block.percent)" placement="top">

								<div class="row-item"
									 :style="{'left': getPosition(index)+'px'}">
									<div class="row-colorbox"
										 :style="{'background-color': getColor(block.percent),'top': gettop(block.percent)+'px','height': getHeight(block.percent)+'px'}
										 ">
										 <p v-if="block.percent>0.3" :style="{'line-height': gettoptext(block.percent)+'px'}">{{getPercentage(block.percent)}}</p>
									</div>
									
									<div v-if="block.percent<=0.3" class="textofbox"   :style="{'line-height': gettoptext(block.percent)+'px'}">{{getPercentage(block.percent)}}</div>
								</div>

							</el-tooltip>
						</div>
					</div>
				</div>
				<div class="row" v-for="item in Loaddata.deviceLoad" :key="item.name">
					<div class="row-label">
						{{item.name}}
					</div>
					<div class="row-content" :style="{'width':(bodyWidth*0.8-180-26)+'px','max-width':blocks*blockSize+'px'}">
						<div class="row-content-wrap" :style="{'left':bias+'px'}">
							<el-tooltip
									v-for="(block,index) in item.load" :key="block.data+block.percent"
									effect="dark" :content="block.percent" placement="top">

								<div class="row-item"
									 :style="{'left': getPosition(index)+'px'}">
									<div class="row-colorbox"
										 :style="{'background-color': getColor(block.percent),'top': gettop(block.percent)+'px','height': getHeight(block.percent)+'px'}
										 ">
										 <p v-if="block.percent>0.3" :style="{'line-height': gettoptext(block.percent)+'px'}">{{getPercentage(block.percent)}}</p>
									</div>
									
									<div v-if="block.percent<=0.3" class="textofbox"   :style="{'line-height': gettoptext(block.percent)+'px'}">{{getPercentage(block.percent)}}</div>
								</div>

							</el-tooltip>
						</div>
					</div>
				</div>
			</div>

			<el-popover
			        placement="bottom"
			        width="150"
			        trigger="hover">
			            <div >
			            	<div class="fontofright">图例</div>
			            	<div>
			            		<div class="fontofrightson1">0~20%</div>
			            		<div class="fontofrightson2">20%~40%</div>
			            		
			            	</div>
							<div class="fontofrightson3">40%~60%</div>
							<div class="fontofrightson4">60%~80%</div>
			            	<div>
			            		
			            		<div class="fontofrightson5">80%~100%</div>
			            		<div class="fontofrightson6">>100%</div>
			            	</div>
			            
			            </div>
			    <div class="tips" slot="reference">
			        tips
			    </div>
			</el-popover>

		</div>
	</Layout>
</template>

<script>
	import {bodyWidthMixin} from "@/common/mixin";
	import {generateRandomColor,colorFaded} from "@/common/utils";
	import Layout from "@/components/content/Layout";
	import {resourceLoadDay} from "@/network/resourceLoad";
	import {resourceLoadWeek} from "@/network/resourceLoad";
	import moment from 'moment';
	import {toLocalDate} from "@/common/utils";

	export default {
					mixins: [bodyWidthMixin],
					  components: {
						Layout
					  },
				    data() {
				      return {
						screenWidth: document.body.clientWidth,
						dateType: "day",
						date: "2018/11/01",
				        dateTypeOptions: [
				            {
				                value: "day",
				                label: '按天显示'
				            },
				            {
				                value: "date",
				                label: '按周显示'
				            }
				        
				        ],
						
						blocks: 7,
						blockSize: 170,
						height:80,
						timeDivision: [
						    '2018/11/09',
						    '2018/11/10',
						    '2018/11/11',
						    '2018/11/12',
						    '2018/11/13',
						    '2018/11/14',
						    '2018/11/15',
						],
						bias: 0,
						Loaddata:{
							personnelSumLoad:'0.70',
							deviceSumLoad:'0.80',
							personnelLoad: [
							    {
							        name: "小明",
							        load: [
							            {
							                date:'2018/11/09',
											percent:'0.5'
							            },
							            {
							                date:'2018/11/10',
							                percent:'0.7'
							            },
							            {
							                date:'2018/11/11',
							                percent:'0.8'
							            },
							            {
							                date:'2018/11/12',
							                percent:'0.9'
							            },
										{
										    date:'2018/11/13',
										    percent:'1'
										},
										{
										    date:'2018/11/14',
										    percent:'0.4'
										},
										{
										    date:'2018/11/15',
										    percent:'0.5'
										},
							        ]
							    },
							    {
							        name: "小红",
							        load: [
							           {
							               date:'2018/11/09',
							           	percent:'0.2'
							           },
							           {
							               date:'2018/11/10',
							               percent:'0.1'
							           },
							           {
							               date:'2018/11/11',
							               percent:'0.3'
							           },
							           {
							               date:'2018/11/12',
							               percent:'0.4'
							           },
							           {
							               date:'2018/11/13',
							               percent:'0.5'
							           },
							           {
							               date:'2018/11/14',
							               percent:'1'
							           },
							           {
							               date:'2018/11/15',
							               percent:'1'
							           },
							        ]
							    },
							],
							deviceLoad: [
							    {
							        name: "设备1",
							        load: [
							            {
							                date:'2018/11/09',
											percent:'0.6'
							            },
							            {
							                date:'2018/11/10',
							                percent:'0.7'
							            },
							            {
							                date:'2018/11/11',
							                percent:'0.8'
							            },
							            {
							                date:'2018/11/12',
							                percent:'0.9'
							            },
										{
										    date:'2018/11/13',
										    percent:'1'
										},
										{
										    date:'2018/11/14',
										    percent:'0.4'
										},
										{
										    date:'2018/11/15',
										    percent:'0.5'
										},
							        ]
							    },
							    {
							        name: "设备2",
							        load: [
							           {
							               date:'2018/11/09',
							           	percent:'0.2'
							           },
							           {
							               date:'2018/11/10',
							               percent:'0.1'
							           },
							           {
							               date:'2018/11/11',
							               percent:'0.3'
							           },
							           {
							               date:'2018/11/12',
							               percent:'0.4'
							           },
							           {
							               date:'2018/11/13',
							               percent:'0.5'
							           },
							           {
							               date:'2018/11/14',
							               percent:'1'
							           },
							           {
							               date:'2018/11/15',
							               percent:'1'
							           },
							        ]
							    },
							]
						},
						
				      }
				    
				  },
				  mounted() {
					  this.date = toLocalDate(sessionStorage.getItem("now"));
					  this.timeChange(this.date)
				  },
				  
				  methods: {
					  timeSelectChange(timeSelect) {
					      console.log(timeSelect);
					      if(timeSelect === "day") {
					          this.blocks = 7;
					          this.blockSize = 170;
					          this.timeChange(this.date);
					      } else if (timeSelect === "date") {
					          this.blocks = 7;
					          this.blockSize = 170;
					          this.timeChange(this.date);
					      }
					  },
					  timeChange(time) {
						  var theday=moment(time).format('YYYY-MM-DD');
					      console.log(time);
						  if(this.dateType==="day"){
							  resourceLoadDay({
							      params: {
							         date:time
							      }
							  }).then(res => {
							          if(res.code === 200) {
							  			this.Loaddata = res.data;
							  			console.log(this.Loaddata)
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
						  if(this.dateType==="date"){
							  resourceLoadWeek({
								  params: {
									 date:time
								  }
							  }).then(res => {
									  if(res.code === 200) {
										this.Loaddata = res.data;
										console.log(this.Loaddata)
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
					  },
					  scroll(pages) {
					      let d = new Date(this.date);
					      d.setDate(d.getDate()+pages);
					      this.date = d;
					      this.timeChange(this.date);
					  },
					  drag(event) {
					      this.bias = -event.target.scrollLeft;
					  
					      console.log('scroll', event.target.scrollLeft);
					  },
					  getColor(percent){
						 
						  if (percent < 0.2) {
						            return '#08FFFF';
						          } else if (percent < 0.4) {
						            return '#4EA4CB';
						          } else if (percent < 0.6) {
						            return '#98F20c';
						          } else if (percent < 0.8) {
						            return '#F59D2A';
						          } else if (percent < 1) {
						            return '#E4C7FF';
						          } else {
						            return '#E02E44';
						          }
					  },
					  getPosition(theindex) {
					  					  return theindex*this.blockSize+30;
					      
					  },
					  gettop(percent) {
					  					  return this.height*(1-percent);
					      
					  },
					  gettoptext(percent) {
						  if(percent>0.5){
							  return this.height*(percent)/2;
						  }else if(percent>0.3){
							  return this.height*(percent-0.3)/2;
						  }else{
							  return 60;
						  }
					  					  
					      
					  },
					  getHeight(percent) {
					  					  return percent*this.height;
					      
					  },
					  getDays(date,days) {
					      let d = new Date(date);
					      let arr = [];
					      for (let i = 0; i <days; i++) {
					          arr[i] = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
					          d.setDate(d.getDate()+1);
					      }
					      return arr;
					  },
					  getWeeks(date,days) {
					      let d = new Date(date);
					      let arr = [];
					      for (let i = 0; i <days*7; i++) {
					          arr[i] = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
					          d.setDate(d.getDate()+6);
							  arr[i]=arr[i]+'~'+(d.getMonth()+1)+'/'+d.getDate();
							  d.setDate(d.getDate()+1);
					      }
					      return arr;
					  },
					  getdaydate(date){
						  let d =new Date(date);
						  let out ='';
						  out=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
						  d.setDate(d.getDate()+6);
						  out=out+'-'+d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
						  return out;
					  },
					  getweekdate(date){
						  let d =new Date(date);
						  let out ='';
						  out=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
						  d.setDate(d.getDate()+48);
						  out=out+'-'+d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
						  return out;
					  },
					  getPercentage(percent) {
					  					  return parseInt(percent*100)+"%";
					      
					  }
				  },
				  
				  }
</script>

<style scoped>
	.gantt-wrap {
	    width: 80%;
	    min-width: 600px;
	    margin-left: 10%;
	}
/* gantt header */
    .gantt-header {

        margin-bottom: 50px;
        display: flex;
        justify-content: space-between;
    }
    .gantt-title {
        padding: 20px;
        border: 1px solid #1f94ff;
    }
    .gantt-header-middle {
		display: flex;
    }
    .gantt-header-right {
	margin-top: 170px;
	
    }
	.fontofright{
		border: 1px solid #ebeef5;
		text-align: center;
		width: 100px;
	}
	.fontofrightson1{

		
		background-color: #08FFFF;
		border: 1px solid #ebeef5;
		text-align: center;
		width: 100px;
	}
	.fontofrightson2{

		
		background-color: #4EA4CB;
		border: 1px solid #ebeef5;
		text-align: center;
		width: 100px;
	}
	.fontofrightson3{

		
		background-color: #98F20c;
		border: 1px solid #ebeef5;
		text-align: center;
		width: 100px;
	}
	.fontofrightson4{

		
		background-color: #F59D2A;
		border: 1px solid #ebeef5;
		text-align: center;
		width: 100px;
	}
	.fontofrightson5{

		
		background-color: #E4C7FF;
		border: 1px solid #ebeef5;
		text-align: center;
		width: 100px;
	}
	.fontofrightson6{

		
		background-color: #E02E44;
		border: 1px solid #ebeef5;
		text-align: center;
		width: 100px;
	}
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {

		padding-left: 30px;
		padding-right: 30px;
		border-radius: 4px;
		min-height: 36px;
		border: 1px solid #ebeef5;
		text-align: center;
		padding-bottom: 10px;
	}

	.row-bg {
		background-color: #f9fafc;
	}

	.fontofname {
		padding-top: 10px;
		color: #8C8C8C;
		font-family: "PingFang SC";
		font-size: 18px;
		font-weight: bold;
	}
	.fontofdate {
		font-family: "PingFang SC";
		color: #8C8C8C;
		font-size: 12px;
	}
	.fontoftitle {
		font-family: "PingFang SC";
		font-size: 25px;
		font-weight: bold;
		padding-top: 20px;
		margin-bottom: 50px;
	}
	.grid-title {
		border-radius: 4px;
		min-height: 36px;
		margin-left: 20px;
	}
	
	
	    /* time selector */
	.time-selector{
	    display: flex;
	    justify-content: left;
	}
	.time-selector-left {
	    flex: 0 0 160px;
	}
	
	 .time-selector-right {
	        display: flex;
	        height: 80px;
	        margin-left: 20px;
	        /*position: relative;*/
	    }
	
	.time-l-arrow, .time-r-arrow{
	    width: 8px;
	    height: 8px;
	    border-top: 2px solid #fff;
	    border-right: 2px solid #fff;
	    margin-top: 36px;
	}
	.time-l-arrow {
	    transform: rotate(225deg);
	}
	.time-r-arrow {
	    transform: rotate(45deg);
	}
	.time-middle {
	    height: 80px;
	    overflow-x: auto;
	    overflow-y: hidden;
	    white-space: nowrap;
	    font-size: 14px;
	    color: #606266;
	}
	.time-middle-content {
	    height: 78px;
	    line-height: 30px;
	    text-align: center;
	    margin-left: -1px;
	    display: inline-block;
	    white-space: normal;
	    float: left;
	
	    border: solid 1px #DCDFE6;
	}
	.time-middle-content span {
	    display: inline-block;
	    position: relative;
	    top: 50%;
	    transform: translateY(-50%);
	}
	
	::-webkit-scrollbar {/*滚动条整体样式*/
	    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
	    height: 7px;
	}
	
	::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	    background: #535353;
	}
	
	::-webkit-scrollbar-track {/*滚动条里面轨道*/
	    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	    border-radius: 10px;
	    background: #EDEDED;
	}
	.time-left,.time-right{
	    flex: 0 0 10px;
	    padding: 0 8px 0 8px;
	    background-color: #DCDFE6;
	}
	.time-left {
	    border-radius: 4px 0 0 4px
	}
	.time-right {
	    border-radius: 0 4px 4px 0
	}
	.time-left:hover,.time-right:hover{
	    background-color: #c2c2c2;
	    cursor: pointer;
	}
	.time-left:active,.time-right:active {
	    background-color: #b4b4b4;
	}
	.time-l-arrow, .time-r-arrow{
	    width: 8px;
	    height: 8px;
	    border-top: 2px solid #fff;
	    border-right: 2px solid #fff;
	    margin-top: 36px;
	}
	.time-l-arrow {
	    transform: rotate(225deg);
	}
	.time-r-arrow {
	    transform: rotate(45deg);
	}
	
	  /* table */
	.table{
		margin-top: 20px;
	}
	.table .row {
	    /*background-color: #6c81eb;*/
	    height: 100px;
	    border-top: 1px solid #fff;
	    /*display: flex;*/
	    /*justify-content: left;*/
	    position: relative;
	}
	.table .row .row-label {
	    position: absolute;
	    left: 0;
	    top: 15px;
	    width: 160px;
	    /*flex: 0 0 160px;*/
	    background-color: #f1f1f1;
	    text-align: center;
	    line-height: 60px;
	    height: 60px;
	    font-size: large;
	
	}
	
	.table .row .row-content {
	    /*display: inline-block;*/
	    position: absolute;
	    left: 206px;
	    top: 0;
	    /*margin-left: 46px;*/
	    height: 100px;

	    overflow-x: hidden;
	    overflow-y: hidden;
	    white-space: nowrap;
	}
	.table .row .row-content-wrap {
	    position: absolute;
	}
	.table .row .row-content .row-item{
	    position: absolute;
	    height: 80px;
		width: 120px;
	    top: 7px;
	    display: inline-block;

		border: 1px solid #ebeef5;
	    cursor: pointer;
	}
	.table .row .row-content .row-item .row-colorbox{
	    position: absolute;
		width: 120px;
	    display: inline-block;
		z-index:-1;
	    text-align: center;
	    cursor: pointer;
	}
	.table .row .row-content .row-item .textofbox{


		z-index:auto; 
	    text-align: center;

	}
	.tips {
	    position: fixed;
	    right: -30px;
	    top:60px;
	    background-color: rgb(102, 177, 255);
	    color: #fff;
	    width: 60px;
	    border: solid 1px #EBEEF5;
	    border-radius: 10px 0 0 10px;
	    padding: 15px;
	    transition: right 0.5s;
	    -moz-transition: right 0.5s; /* Firefox 4 */
	    -webkit-transition: right 0.5s; /* Safari 和 Chrome */
	    -o-transition: right 0.5s; /* Opera */
	}
	.tips:hover {
	    right: 0;
	}
</style>
