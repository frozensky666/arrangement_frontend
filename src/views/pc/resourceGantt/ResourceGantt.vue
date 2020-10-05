<template>
    <div>
        <div class="time-selector">
            <div class="time-selector-left">
                <el-select v-model="dateType" style="width: 220px" @change="timeSelectChange">
                    <el-option
                            v-for="item in dateTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                        v-model="date"
                        :type="dateType"
                        placeholder="选择日期"
                        @change="timeChange">
                </el-date-picker>
            </div>
            <div class="time-selector-right">
                <div class="time-left" @click="scroll(blocks,dateType==='month'?getDaysOfMonth(date):12)">
                    <div class="time-l-arrow"></div>
                </div>
                <div class="time-middle" :style="{'width': blocks*100+'px'}">
                    <div class="time-middle-wrap" :style="{'left':bias+'px'}">
                        <!--                    <div v-for="i in 21"-->
                        <!--                         :key="i"-->
                        <!--                         class="time-middle-wrap-content">-->
                        <!--                        {{i}}-->
                        <!--                    </div>-->
                        <div v-if="dateType==='date'">
                            <div v-for="title in title_hour"
                                 :key="title"
                                 class="time-middle-wrap-content">
                                {{title}}
                            </div>
                        </div>
                        <div v-if="dateType==='month'">
                            <div v-for="i in getDaysOfMonth(date)"
                                 :key="i"
                                 class="time-middle-wrap-content">
                                {{i}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="time-right" @click="scroll(-blocks,dateType==='month'?getDaysOfMonth(date):12)">
                    <div class="time-r-arrow"></div>
                </div>
            </div>
        </div>
        <div class="table">
            <div class="row" v-for="item in demoData0" :key="item.role">
                <div class="row-label">
                    {{item.role}}
                </div>
                <div class="row-content">
                    <div class="row-item" v-for="block in item.plan" :key="block.start+block.end+block.value"
                         :style="{'background-color': block.bg,'width': 100+'px','left': getPosition(block.start)+'px'}">
                        {{block.value}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResourceGantt",
        data() {
            return {
                dateType: "date",
                date: "2018/11/9",
                dateTypeOptions: [
                    {
                        value: "month",
                        label: '按天显示'
                    },
                    {
                        value: "date",
                        label: '按小时显示'
                    }

                ],
                blocks: 12,
                bias: 0,
                timer: null,
                title_hour: [
                    "7:00-9:00",
                    "9:00-11:00",
                    "11:00-13:00",
                    "13:00-15:00",
                    "15:00-17:00",
                    "17:00-19:00",
                    "19:00-21:00",
                    "21:00-23:00",
                    "23:00-次日1:00",
                    "次日1:00-次日3:00",
                    "次日3:00-次日5:00",
                    "次日5:00-次日7:00",
                ],
                demoData0: [
                    {
                        role: "小明",
                        plan: [
                            {
                                start: '2019/1/21 7:23',
                                end: '2019/1/21 8:45',
                                value: '产品1',
                                bg: 'green'
                            },
                            {
                                start: '2019/1/21 12:23',
                                end: '2019/1/21 18:45',
                                value: '产品2',
                                bg: 'blue'
                            },
                            {
                                start: '2019/1/21 19:55',
                                end: '2019/1/22 0:45',
                                value: '产品3',
                                bg: 'yellow'
                            },
                            {
                                start: '2019/1/21 1:28',
                                end: '2019/1/22 6:59',
                                value: '产品4',
                                bg: 'red'
                            },
                        ]
                    },
                    {
                        role: "小红",
                        plan: [
                            {
                                start: '2019/1/21 7:00',
                                end: '2019/1/21 9:00',
                                value: '产品4',
                                bg: 'green'
                            },
                            {
                                start: '2019/1/21 11:23',
                                end: '2019/1/21 19:45',
                                value: '产品3',
                                bg: 'blue'
                            },
                            {
                                start: '2019/1/21 19:55',
                                end: '2019/1/22 0:45',
                                value: '产品2',
                                bg: 'yellow'
                            },
                            {
                                start: '2019/1/21 0:28',
                                end: '2019/1/22 4:30',
                                value: '产品1',
                                bg: 'red'
                            },
                        ]
                    },
                ],
            }
        },
        methods: {
            scroll(n,len) {
                if(this.timer)return;
                let times = 0;
                if(this.bias<=-Math.floor((len-1)/this.blocks)*100*this.blocks && n<0) return;
                else if(this.bias>=0 && n>0) return;
                this.timer = setInterval(()=> {
                    this.bias += n*5;
                    times += 1;
                    if(times === 20){
                        clearInterval(this.timer);
                        this.timer = null;
                        console.log(-this.bias/100);
                    }
                },10);

            },
            timeSelectChange() {
              this.bias = 0;
            },
            timeChange(time) {
                this.bias = 0;
                // if(this.dateType === "date") { //按小时
                //
                // } else if(this.dateType === "month") { //按日
                //     //请求当月1-blocks号的内容并显示
                // }
            },
            searchByDate(startDate,endDate) {
                console.log(startDate,endDate);

            },
            getDaysOfMonth(time) {
                let d = new Date(time);
                return (new Date(d.getFullYear(),d.getMonth()+1,0).getDate()); //获取当月天数
            },
            getPosition(start) {
                if(this.dateType === "date") { //按小时
                    let d = new Date(start);
                    d.setTime(d.getTime()-7*60*60*1000);
                    let today = new Date(d.getFullYear(),d.getMonth(),d.getDate(),7);
                    d = new Date(start);
                    // console.log(d,today);
                    return (d.getTime()-today.getTime())/(24*60*60*1000)*12*100;
                } else if(this.dateType === "month") { //按日
                    //TODO
                }
            },
            getWidth(start,end) {
                if(this.dateType === "date") { //按小时

                } else if(this.dateType === "month") { //按日
                    //TODO
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .time-selector{
        display: flex;
    }
     .time-selector-left {
         width: 250px;
     }
     .time-selector-right {
         display: flex;
         height: 80px;
         position: absolute;
         left: 250px;
         /*line-height: 80px;*/
     }
    .time-left,.time-right{
        width: 10px;
        padding: 0 8px 0 8px;
        background-color: #bcbec1;
        border-radius: 4px;
    }
    .time-left:hover,.time-right:hover{
        background-color: #dcdcdc;
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
    .time-middle {
        position: relative;
        /*width: 700px;*/
        height: 80px;
        margin:0 auto 0 auto;
        overflow: hidden;
        white-space: nowrap;
    }
    .time-middle-wrap {
        position: absolute;
        height: 80px;
        z-index: 1;
    }
    .time-middle-wrap-content {
        width: 99px;
        height: 78px;
        border: solid 1px #888888;
        margin-left: -1px;
        display: inline-block;
        white-space: normal;
        float: left;
    }
    .table {
        width: 1500px;
    }
    .table .row {
        position: relative;
        background-color: #6c81eb;
        height: 40px;
        width: 1500px;
    }
    .table .row .row-label {
        width: 250px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #818181;
        height: 40px;
        display: inline-block;
    }
    .table .row .row-content {
        display: inline-block;
        position: absolute;
        left: 275px;
        height: 40px;
        width: 1200px;
        background-color: #abc;
    }
    .table .row .row-content .row-item{
        position: absolute;
        height: 40px;
        top: 0;
    }

</style>