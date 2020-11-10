<template>
	<Layout>
		<div class="gantt-wrap">
			<div class="gantt-header">
				<div class="gantt-header-left">
					<h2>
						订单甘特图
					</h2>
				</div>
				<div class="gantt-header-middle">
					<div class="grid-content bg-purple">
						<p class="fontofname">按期交货率</p>
						<el-progress type="circle" stroke-linecap="butt" :stroke-width="20"   :percentage="parseInt(rate*100)"></el-progress>
					</div>

				</div>

				<div class="gantt-header-right">
				</div>
			</div>
			<div class="gantt-select">
				<div class="gantt-header-left">
					<el-date-picker
							style="width: 160px"
							v-model="date"
							type="date"
							placeholder="选择日期"
							@change="timeChange">
					</el-date-picker>
				</div>
			</div>
			<div class="order-title">
				<div class="order-title-left">
					<div class="order-text">订单号</div>
				</div>
				<div class="order-title-right" :style="{'max-width':'1200px','flex':'0 0 '+(bodyWidth*0.8-180)+'px'}"  @scroll="drag">
					<div class="order-text2">订单进度</div>
				</div>
			</div>

			<div class="table">
				<div class="row" v-for="item in orderList" :key="item.orderId">
					<div class="row-label">
						{{item.orderId}}
					</div>
					<div class="row-content" :style="{'width':(bodyWidth*0.8-180)+'px','max-width':'1180px'}">
						<div class="row-content-wrap" :style="{'left':bias+'px'}">
							<el-tooltip
									v-for="(block,index) in item.process" :key="block.name+block.percent"
									effect="dark" :content="getPercentage(block.percent)" placement="top">

								<div class="row-item" v-if="block.isdelayed==0"
									 :style="{'left': getPosition(item.process.length,index)+'px','width':getWidthOfBox(item.process.length)+'px'}">
									<div class="row-item2" 
										 :style="{'width':getWidthOfBox(item.process.length)+'px'}">
										 <div class="row-percentbox2" v-if="getmaxlenth(item.process.length,block.percent)"
										 	 :style="{'background-color': getColor(block.percent,block.isdelayed,index),'width':getWidthOfPercent(item.process.length,block.percent)+'px'}">
										 	{{block.name}}   {{getPercentage(block.percent)}}
										 </div>
										 <div class="row-percentbox" v-if="!getmaxlenth(item.process.length,block.percent)"
										 	 :style="{'background-color': getColor(block.percent,block.isdelayed,index),'width':getWidthOfPercent(item.process.length,block.percent)+'px'}">
										 	{{block.name}}   {{getPercentage(block.percent)}}
										 </div>
									</div>
										
										
								</div>

								<div class="row-item" v-if="(block.isdelayed==1)"
									 :style="{'left': getPosition(item.process.length,index)+'px','width':getWidthOfBox(item.process.length)+'px'}">
									<div class="row-item2" 
										 :style="{'width':getWidthOfBox(item.process.length)+'px'}">
										 <div class="row-percentbox2" v-if="getmaxlenth(item.process.length,block.percent)"
										 	 :style="{'background-color': getColorAfter(block.percent,block.isdelayed,index),'width':getWidthOfPercent(item.process.length,block.percent)+'px'}">
										 	{{block.name}}   {{getPercentage(block.percent)}}
										 </div>
										 <div class="row-percentbox" v-if="!getmaxlenth(item.process.length,block.percent)"
										 	 :style="{'background-color': getColorAfter(block.percent,block.isdelayed,index),'width':getWidthOfPercent(item.process.length,block.percent)+'px'}">
										 	{{block.name}}   {{getPercentage(block.percent)}}
										 </div>
										 
									</div>
									<el-tooltip class="row-percentbox" v-if="(block.isdelayed==1)"
										 :style="{'left':getPosition2(item.process.length,block.theline)+'px','top':'33px'}"
																				  effect="dark" :content="getddl(block.ddl)" placement="top">
									      
										  <i class="el-icon-top"></i>
									    </el-tooltip>
								</div>
								

							</el-tooltip>
						</div>
					</div>
				</div>
			</div>

			<el-popover
			        placement="bottom"
			        width="200"
			        trigger="hover">
			            <div class="gantt-tips2">红色表示延期订单
			                <div class="color-block"></div>
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
	import {getorderList} from "@/network/orderGantt";
	import {getorderRate} from "@/network/orderGantt";
	import moment from 'moment';
				  export default {
					mixins: [bodyWidthMixin],
					  components: {
						  Layout
					  },
				    data() {
				      return {
						screenWidth: document.body.clientWidth,
						dateType: "day",
						date: "2018-11-09",
						height:80,
						bias: 0,
						rate:'0.79',
							orderList: [
							    {
							        orderId: "418575",

							        process: [
							            {
							                name:'装配',
											percent:'0.6',
											theline:'0.8',
											isdelayed:'1'
							            }
										
							        ]
							    },
								{
								    orderId: "418577",

								    process: [
								        {
								            name:'装配',
											percent:'1',
											theline:'1',
											isdelayed:'0'
								        }
										
								    ]
								},
								{
								    orderId: "764486",
								    process: [
								        {
								            name:'装配',
											percent:'0.8',
											theline:'0.7',
											isdelayed:'1'
								        }
										
								    ]
								},
								{
								    orderId: "762904",

								    process: [
								        {
								            name:'装配',
											percent:'0.53',
											theline:'1',
											isdelayed:'0'
								        },
										{
										    name:'测试',
											percent:'0.33',
											theline:'1',
											isdelayed:'0'
										}
										
								    ]
								},
								{
								    orderId: "762345",

								    process: [
								        {
								            name:'装配',
											percent:'0.53',
											theline:'1',
											isdelayed:'0'
								        },
										{
										    name:'测试',
											percent:'0',
											theline:'1',
											isdelayed:'0'
										}
										
								    ]
								}
							]
						
						
						
						
				      }
				    
				  },
				  mounted() {
						this.date = sessionStorage.getItem("now");
				  		getorderList({
				  		    params: {
				  		       date:this.date
				  		    }
				  		}).then(res => {
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
				  		            message: "未知错误，请重试"
				  		        });
				  		    });
				  		getorderRate({
				  		    params: {
				  		       date:this.date
				  		    }
				  		}).then(res => {
				  		        if(res.code === 200) {
				  					this.rate = res.data;
				  					console.log(this.rate)
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
					  
					  timeChange(time) {
					      console.log(time);
						  this.date=moment(time).format('YYYY-MM-DD');
						  console.log(this.date);
						  getorderList({
						      params: {
						         date:this.date
						      }
						  }).then(res => {
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
						              message: "未知错误，请重试"
						          });
						      });
						  getorderRate({
						      params: {
						         date:this.date
						      }
						  }).then(res => {
						          if(res.code === 200) {
						  			this.rate = res.data;
						  			console.log(this.rate)
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
					  getColor(percent,isdelayed,index){
						 if(percent<1){
							 if(index==0){
								 return '#C0E9FC'
							 }else if(index==2){
								 return '#4EA4CB';
							 }else if(index==3){
								 return '#F59D2A';
							 }else if(index==4){
								 return '#E4C7FF';
							 }else{
								 return '#E4C7FF';
							 }
							 
						 }else if(isdelayed==1){
							 return '#E02E44'
						 }else {
							 return '#98F20c'
						 }
						 
						  /* if (percent < 0.2) {
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
						          } */
					  },
					  
					  getColorAfter(percent,isdelayed){
						  if(isdelayed==1){
						  		return '#E02E44'
						  }
					  },
					  getWidthOfPercentAfter(num,percent){
						  return 1150/num*(1-percent);
						  
					  },
					  getPosition(num,theindex) {
					  					  return (1150/num)*theindex+30;
					      
					  },
					  getPosition2(num,percent) {
					  					  return (1150/num)*percent;
					      
					  },
					  getPosition3(num,percent) {
					  					  return (1150/num)*percent+1;
					      
					  },
					  getWidthOfBox(num) {
					  					  return 1150/num;
					      
					  },
					  getWidthOfPercent(num,percent) {
					  					  return 1150/num*percent;
					      
					  },
					  getWidthOfPercent2(num,percent) {
					  					  return 1150/num*percent-1;
					      
					  },
					  getPercentage(percent) {
						  if(percent!=1){
							  return parseInt(percent*100)+"%";
						  }else{
							  return "已完成"
						  }
					  					  
					      
					  },
					  getmaxlenth(num,percent){
						  if(percent/num<0.06){
							  return true;
						  }else{
							  return false;
						  }
					  },
					  getddl(ddl){
						  return "交期："+ddl;
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
        border: 1px solid #DCDFE6;
    }
    .gantt-header-middle {

    }
    .gantt-header-right {
	margin-right: 100px;
    }
	.gantt-select {
	    margin-top: 10px;
	    margin-bottom: 5px;
	    display: flex;
	    justify-content: space-between;
	}
	.gantt-tips2 {
	    padding: 20px;
	}
	.el-row {
		margin-bottom: 20px;

		
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		border: 1px solid #DCDFE6;
		text-align: center;
		padding-bottom: 10px;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		float:left;
		padding-left: 50px;
		padding-right: 50px;
		border-radius: 4px;
		min-height: 36px;
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
		font-size: 12px;
		color: #8C8C8C;
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
	
	
	    /* order-title */
	.order-title{
	    display: flex;
	    justify-content: left;
		margin-bottom: 30px;
		margin-top: 10px;
	}
	.order-title-left {
	    flex: 0 0 160px;
		text-align: center;
	}
	
	 .order-title-right {
		 margin-left: 50px;
			text-align: center;
			overflow-x: auto;
			overflow-y: hidden;
			white-space: nowrap;
	        /*position: relative;*/
	    }
	.order-text {
	    padding: 20px;
		text-align: center;
        padding-bottom: 20px;
	    background-color: #F5F7FA;
	}
	.order-text2{
		width: 1180px;
		padding-top: 20px;
		padding-bottom: 20px;
		background-color: #F5F7FA;
	}
	
	  /* table */
	.table .row {
	    /*background-color: #6c81eb;*/
	    height: 70px;
	    border-top: 1px solid #fff;
	    /*display: flex;*/
	    /*justify-content: left;*/
	    position: relative;
	}
	.table .row .row-label {
	    position: absolute;
	    left: 0;
	    top: 5px;
	    width: 160px;
	    /*flex: 0 0 160px;*/

	    text-align: center;
	    line-height: 40px;
	    height: 40px;
	    font-size: large;

			background-color: #F5F7FA;
	
	}
	.table .row .row-content {
	    /*display: inline-block;*/
	    position: absolute;
	    left: 180px;
	    top: 0;
	    /*margin-left: 46px;*/
	    height: 70px;
	    overflow-x: hidden;
	    overflow-y: hidden;
	    white-space: nowrap;
	}
	.table .row .row-content-wrap {
	    position: absolute;
	}
	.table .row .row-content .row-item{
	    position: absolute;
	    height: 70px;
	    top: 5px;
	    display: inline-block;
		
	    cursor: pointer;
	}
	.table .row .row-content .row-item2{
	    position: absolute;
	    height: 40px;
	    display: inline-block;
		border: 1px solid #DCDFE6;
	    cursor: pointer;
	}
	.table .row .row-content .row-item .row-percentbox{
		position: absolute;

		height: 30px;
	    display: inline-block;
	    padding-top: 10px;
	    text-align: center;
	    cursor: pointer;
	}
	.table .row .row-content .row-item .row-percentbox2{
		position: absolute;
	
		height: 30px;
	    display: inline-block;
	    padding-top: 10px;
	    cursor: pointer;
		text-indent:70px;
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
	.color-block {
	    display: inline-block;
	    height: 10px;
	    width: 10px;
	    background-color: #ff0000;
	}
</style>

