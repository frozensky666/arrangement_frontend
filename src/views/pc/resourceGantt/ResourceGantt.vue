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
                <div class="time-middle" :style="{'width': blocks*block_scale+'px'}">
                    <div class="time-middle-wrap" :style="{'left':bias+'px'}">
                        <!--                    <div v-for="i in 21"-->
                        <!--                         :key="i"-->
                        <!--                         class="time-middle-wrap-content">-->
                        <!--                        {{i}}-->
                        <!--                    </div>-->
                        <div v-if="dateType==='date'">
                            <div v-for="title in title_hour"
                                 :key="title"
                                 class="time-middle-wrap-content"
                            :style="{'width': block_scale-1+'px'}">
                                {{title}}
                            </div>
                        </div>
                        <div v-if="dateType==='month'">
                            <div v-for="i in getDaysOfMonth(date)"
                                 :key="i"
                                 class="time-middle-wrap-content"
                                 :style="{'width': block_scale-1+'px'}">
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
            <div class="row" v-for="item in demoData0" :key="item.role" :style="{'width':block_scale*blocks+300+'px'}">
                <div class="row-label">
                    {{item.role}}
                </div>
                <div class="row-content" :style="{'width':block_scale*blocks+'px'}">
                    <div class="row-content-wrap" :style="{'left':bias+'px'}">
                        <div class="row-item" v-for="block in item.plan" :key="block.start+block.end+block.value"
                             :style="{'background-color': block.bg,'width': getWidth(block.start,block.end)+'px','left': getPosition(block.start)+'px'}">
                            {{getWidth(block.start,block.end)>50 ?block.value:""}}
                        </div>
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
                block_scale: 80,
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
                demoData0: null,
            }
        },
        methods: {
            scroll(n,len) {
                if(this.timer)return;
                let times = 0;
                if(this.bias<=-Math.floor((len-1)/this.blocks)*this.block_scale*this.blocks && n<0) return;
                else if(this.bias>=0 && n>0) return;
                this.timer = setInterval(()=> {
                    this.bias += n*5;
                    times += 1;
                    if(times === this.block_scale/5){
                        clearInterval(this.timer);
                        this.timer = null;
                        console.log(-this.bias/this.block_scale);
                    }
                },10);

            },
            getData() { //TODO
                if(this.dateType === "date") {
                    this.demoData0 =  [
                        {
                            role: "小明",
                            plan: [
                                {
                                    start: '2018/11/09 7:23',
                                    end: '2018/11/09 8:45',
                                    value: '产品1',
                                    bg: 'green'
                                },
                                {
                                    start: '2018/11/09 12:23',
                                    end: '2018/11/09 18:45',
                                    value: '产品2',
                                    bg: 'blue'
                                },
                                {
                                    start: '2018/11/09 19:55',
                                    end: '2018/11/10 0:45',
                                    value: '产品3',
                                    bg: 'yellow'
                                },
                                {
                                    start: '2018/11/10 1:28',
                                    end: '2018/11/10 6:59',
                                    value: '产品4',
                                    bg: 'red'
                                },
                            ]
                        },
                        {
                            role: "小红",
                            plan: [
                                {
                                    start: '2018/11/09 7:00',
                                    end: '2018/11/09 9:00',
                                    value: '产品4',
                                    bg: 'red'
                                },
                                {
                                    start: '2018/11/09 11:23',
                                    end: '2018/11/09 19:45',
                                    value: '产品3',
                                    bg: 'yellow'
                                },
                                {
                                    start: '2018/11/09 19:55',
                                    end: '2018/11/10 0:45',
                                    value: '产品2',
                                    bg: 'blue'
                                },
                                {
                                    start: '2018/11/10 0:28',
                                    end: '2018/11/10 4:30',
                                    value: '产品1',
                                    bg: 'green'
                                },
                            ]
                        },
                    ];
                } else if(this.dateType === "month") {
                    this.demoData0 = [
                        {
                            role: "小明",
                            plan: [
                                {
                                    start: '2018/11/09 7:23',
                                    end: '2018/11/09 8:45',
                                    value: '产品1',
                                    bg: 'green'
                                },
                                {
                                    start: '2018/11/09 12:23',
                                    end: '2018/11/09 18:45',
                                    value: '产品2',
                                    bg: 'blue'
                                },
                                {
                                    start: '2018/11/09 19:55',
                                    end: '2018/11/10 0:45',
                                    value: '产品3',
                                    bg: 'yellow'
                                },
                                {
                                    start: '2018/11/10 1:28',
                                    end: '2018/11/10 6:59',
                                    value: '产品4',
                                    bg: 'red'
                                },
                            ]
                        },
                        {
                            role: "小红",
                            plan: [
                                {
                                    start: '2018/11/09 7:00',
                                    end: '2018/11/09 9:00',
                                    value: '产品4',
                                    bg: 'red'
                                },
                                {
                                    start: '2018/11/09 11:23',
                                    end: '2018/11/09 19:45',
                                    value: '产品3',
                                    bg: 'yellow'
                                },
                                {
                                    start: '2018/11/09 19:55',
                                    end: '2018/11/10 0:45',
                                    value: '产品2',
                                    bg: 'blue'
                                },
                                {
                                    start: '2018/11/10 0:28',
                                    end: '2018/11/10 4:30',
                                    value: '产品1',
                                    bg: 'green'
                                },
                                {
                                    start: '2018/11/10 7:28',
                                    end: '2018/11/11 4:30',
                                    value: '产品2',
                                    bg: 'blue'
                                },
                            ]
                        },
                    ]
                }
            },
            timeSelectChange() { //按小时、按日转换
                this.bias = 0;
                this.getData();
            },
            timeChange(time) { //日期改变
                this.bias = 0;
                this.getData();
            },
            getDaysOfMonth(time) {
                let d = new Date(time);
                return (new Date(d.getFullYear(),d.getMonth()+1,0).getDate()); //获取当月天数
            },
            getPosition(start) {
                if(this.dateType === "date") { //按小时
                    let begin = new Date(this.date);
                    begin.setHours(7);
                    let d = new Date(start);
                    return (d.getTime()-begin.getTime())/(24*60*60*1000)*12*this.block_scale;
                } else if(this.dateType === "month") { //按日
                    let begin = new Date(this.date);
                    begin.setHours(7);
                    begin.setDate(1);
                    let d = new Date(start);
                    return (d.getTime()-begin.getTime())/(24*60*60*1000)*this.block_scale;
                }
            },
            getWidth(start,end) {
                if(this.dateType === "date") { //按小时
                    let s = new Date(start);
                    let e = new Date(end);
                    return (e.getTime()-s.getTime())/(24*60*60*1000)*12*this.block_scale;
                } else if(this.dateType === "month") { //按日
                    let s = new Date(start);
                    let e = new Date(end);
                    return (e.getTime()-s.getTime())/(24*60*60*1000)*this.block_scale;
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
        /*width: 99px;*/
        height: 78px;
        border: solid 1px #888888;
        margin-left: -1px;
        display: inline-block;
        white-space: normal;
        float: left;
    }
    .table .row {
        background-color: #6c81eb;
        height: 40px;
        border-top: 1px solid #fff;
    }
    .table .row .row-label {
        width: 250px;
        background-color: #818181;
        height: 40px;
        display: inline-block;
        float: left;
    }
    .table .row .row-content {
        display: inline-block;
        position: relative;
        margin-left: 25px;
        height: 40px;
        background-color: #abc;
        overflow: hidden;
        white-space: nowrap;
    }
    .table .row .row-content-wrap {
        position: absolute;
        height: 80px;
        z-index: 1;
    }
    .table .row .row-content .row-item{
        position: absolute;
        height: 40px;
        display: inline-block;
    }

</style>