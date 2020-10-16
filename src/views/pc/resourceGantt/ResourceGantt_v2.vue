<template>
    <div class="gantt-wrap">
        <div class="gantt-header">
            <div class="gantt-header-left">
                <div class="gantt-title">资源甘特图</div>
            </div>
            <div class="gantt-header-middle">
                <div class="gantt-tips1">双击产品可显示路线图</div>
            </div>
            <div class="gantt-header-right">
                <div class="gantt-tips2">红色表示延期订单</div>
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
                    <div v-if="dateType==='date'"
                         :style="{'width':blocks*blockSize+'px'}">
                        <div v-for="title in timeDivision"
                             :key="title"
                             class="time-middle-content"
                             :style="{'width': blockSize-1+'px'}">
                            {{title}}
                        </div>
                    </div>
                    <div v-if="dateType==='month'"
                         :style="{'width':blocks*blockSize+'px'}">
                        <div v-for="i in getDays(date,blocks)"
                             :key="'month'+i"
                             class="time-middle-content"
                             :style="{'width': blockSize-1+'px'}">
                            {{i}}
                        </div>
                    </div>

                </div>
                <div class="time-right" @click="scroll(1)">
                    <div class="time-r-arrow"></div>
                </div>
            </div>
        </div>
        <div class="table">
            <div class="row" v-for="item in demoData0" :key="item.role">
                <div class="row-label">
                    {{item.role}}
                </div>
                <div class="row-content" :style="{'width':(bodyWidth*0.8-180-26)+'px','max-width':blocks*blockSize+'px'}">
                    <div class="row-content-wrap" :style="{'left':bias+'px'}">
                        <el-tooltip
                                v-for="block in item.plan" :key="block.start+block.end+block.value"
                                effect="dark" :content="block.value" placement="top">
                            <div class="row-item"
                                 :style="{'background-color': block.bg,'width': getWidth(block.start,block.end)+'px','left': getPosition(block.start)+'px'}">
                                {{getWidth(block.start,block.end)>50 ?block.value:""}}
                            </div>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bodyWidthMixin} from "@/common/mixin";
    import {generateRandomColor,colorFaded} from "@/common/utils";

    export default {
        name: "ResourceGantt_v2",
        mixins: [bodyWidthMixin],
        data() {
            return {
                screenWidth: document.body.clientWidth,
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
                blockSize: 100,
                timeDivision: [
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
                bias: 0,
                demoData0: [
                    {
                        role: "小明",
                        plan: [
                            {
                                start: '2018/11/09 7:23',
                                end: '2018/11/09 8:45',
                                value: '1',
                                delay :true
                                // bg: 'green'
                            },
                            {
                                start: '2018/11/09 12:23',
                                end: '2018/11/09 18:45',
                                value: '2',
                                delay :false
                                // bg: 'blue'
                            },
                            {
                                start: '2018/11/09 19:55',
                                end: '2018/11/10 0:45',
                                value: '3',
                                delay :false
                                // bg: 'yellow'
                            },
                            {
                                start: '2018/11/10 1:28',
                                end: '2018/11/10 7:00',
                                value: '4',
                                delay :false
                                // bg: 'red'
                            },
                        ]
                    },
                    {
                        role: "小红",
                        plan: [
                            {
                                start: '2018/11/09 7:00',
                                end: '2018/11/09 9:00',
                                value: '5',
                                delay :false
                                // bg: 'red'
                            },
                            {
                                start: '2018/11/09 11:23',
                                end: '2018/11/09 19:45',
                                value: '6',
                                delay :false
                                // bg: 'yellow'
                            },
                            {
                                start: '2018/11/09 19:55',
                                end: '2018/11/10 0:00',
                                value: '7',
                                delay :false
                                // bg: 'blue'
                            },
                            {
                                start: '2018/11/10 0:28',
                                end: '2018/11/10 4:30',
                                value: '1',
                                delay :true
                                // bg: 'green'
                            },
                        ]
                    },
                ],
            }
        },
        beforeMount() {
          this.demoData0.forEach(obj => {
              obj.plan.forEach(p => {
                  // p.bg = colorFaded(p.delay?"hsl(0,100%,50%)":generateRandomColor(p.value)); //faded
                  p.bg = p.delay?"hsl(0,100%,50%)":generateRandomColor(p.value); //正常颜色
              });
          });
        },
        mounted() {
          this.timeChange(this.date);
        },
        methods: {
            timeSelectChange(timeSelect) {
                console.log(timeSelect);
                if(timeSelect === "date") {
                    this.blocks = 12;
                    this.blockSize = 100;
                    this.timeChange(this.date);
                } else if (timeSelect === "month") {
                    this.blocks = 7;
                    this.blockSize = 170;
                    this.timeChange(this.date);
                }
            },
            timeChange(time) {
                console.log(time);
            },
            scroll(pages) {
                let d = new Date(this.date);
                d.setDate(d.getDate()+pages);
                this.date = d;
                this.timeChange(this.date);
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
            getPosition(start) {
                if(this.dateType === "date") { //按小时
                    let begin = new Date(this.date);
                    begin.setHours(7);
                    let d = new Date(start);
                    return (d.getTime()-begin.getTime())/(24*60*60*1000)*12*this.blockSize;
                } else if(this.dateType === "month") { //按日
                    let begin = new Date(this.date);
                    begin.setHours(7);
                    // begin.setDate(1);
                    let d = new Date(start);
                    return (d.getTime()-begin.getTime())/(24*60*60*1000)*this.blockSize;
                }
            },
            getWidth(start,end) {
                if(this.dateType === "date") { //按小时
                    let s = new Date(start);
                    let e = new Date(end);
                    return (e.getTime()-s.getTime())/(24*60*60*1000)*12*this.blockSize;
                } else if(this.dateType === "month") { //按日
                    let s = new Date(start);
                    let e = new Date(end);
                    return (e.getTime()-s.getTime())/(24*60*60*1000)*this.blockSize;
                }
            },
            drag(event) {
                this.bias = -event.target.scrollLeft;

                console.log('scroll', event.target.scrollLeft);
            }
        }
    }
</script>

<style scoped>
    /* wrap all */
    .gantt-wrap {
        width: 80%;
        min-width: 600px;
        margin-left: 10%;
    }

    /* gantt header */
    .gantt-header {
        margin-top: 50px;
        margin-bottom: 50px;
        display: flex;
        justify-content: space-between;
    }
    .gantt-title {
        padding: 20px;
        border: 1px solid #1f94ff;
    }
    .gantt-tips1 {
        padding: 20px;
        border: 1px solid #1f94ff;
    }
    .gantt-tips2 {
        padding: 20px;
        border: 1px solid #850006;
        background-color: #ff0000;
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
    .time-left,.time-right{
        flex: 0 0 10px;
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
        height: 80px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }
    .time-middle-content {
        height: 78px;
        line-height: 39px;
        border: solid 1px #888888;
        margin-left: -1px;
        display: inline-block;
        white-space: normal;
        float: left;
    }

    /* table */
    .table .row {
        /*background-color: #6c81eb;*/
        height: 40px;
        border-top: 1px solid #fff;
        /*display: flex;*/
        /*justify-content: left;*/
        position: relative;
    }
    .table .row .row-label {
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        /*flex: 0 0 160px;*/
        background-color: #f1f1f1;
        border-radius: 10px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        font-size: large;

    }
    .table .row .row-content {
        /*display: inline-block;*/
        position: absolute;
        left: 206px;
        top: 0;
        /*margin-left: 46px;*/
        height: 40px;
        background-color: #f1f1f1;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
    }
    .table .row .row-content-wrap {
        position: absolute;
    }
    .table .row .row-content .row-item{
        position: absolute;
        height: 26px;
        top: 7px;
        display: inline-block;
        border-radius: 10px;
        text-align: center;
        color: #fff;
        text-shadow: 2px 2px 2px #000;
        cursor: pointer;
    }
</style>