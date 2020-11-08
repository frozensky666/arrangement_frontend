<template>
    <Layout>
		<el-page-header @back="goBack" content="子订单-资源关系表">
		</el-page-header>
		<div class="work-main">
		<div class="workspace">
			<el-collapse >
			  <el-collapse-item  title="子订单详情" name="1">
			    <div>子订单编号为 {{workData[0].workId}}</div>
			    <div>该子订单生产 {{workData[0].num}} 件产品</div>
				<div>该子订单的生产时间为 {{timeQuantum}}</div>
			  </el-collapse-item>
			</el-collapse>
		</div>
		
		<el-table
		  :data="workData"
		  style="width: 50%%;"
		  border
		  default-expand-all
		  >
			
			<el-table-column
				  prop="lineName"
				  label="产线名称">
			</el-table-column>
			<el-table-column
			      label="设备"
			      >
			      <template slot-scope="scope">
					<el-table
					  :data="scope.row.devices"
					  style="width: 50%%;"
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
			      </template>
			</el-table-column>
			<el-table-column
			      label="人员"
			      >
			      <template slot-scope="scope">
					<el-table
					  :data="scope.row.persons"
					  style="width: 50%%;"
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
			      </template>
			</el-table-column>
		</el-table>
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
		mounted() 
		{
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
			        alert("未知错误，请重试");
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

<style>
	.work-main {
	    width: 80%;
	    margin-left: 10%;
		
		
	}
	
	
	.workspace{
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.workspace .el-collapse-item__content {
	    padding-bottom: 25px;
	    font-size: 18px;
	    color: #606266;
		font-family:"PingFang SC";
		line-height: 50px;
		
	}
	.el-collapse-item__header{
		font-size: 20px;
		height: 65px;
		line-height: 65px;
		font-family:"PingFang SC";

		}
</style>