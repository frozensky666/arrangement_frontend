<template>
    <Layout>
        <div class="gantt-wrap">
            <div class="gantt-header">
                <div class="gantt-header-left">
                    <div class="gantt-title">资源甘特图</div>
                </div>
                <div class="gantt-header-middle">
                    <div class="gantt-tips1">单击产品可切换产品路线图和资源甘特图</div>
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
                <div class="row" v-for="item in queryData" :key="item.role">
                    <div class="row-label">
                        {{item.role}}
                    </div>
                    <div class="row-content" :style="{'width':(bodyWidth*0.8-180-26)+'px','max-width':blocks*blockSize+'px'}">
                        <div class="row-content-wrap" :style="{'left':bias+'px'}">
                            <el-tooltip
                                    v-for="block in item.plan" :key="block.start+block.end+block.value"
                                    effect="dark" :content="block.value" placement="top">
                                <div class="row-item"
                                     @click="showRoutes(block.value)"
                                     :style="{'background-color': block.bg,'width': getWidth(block.start,block.end)+'px','left': getPosition(block.start)+'px','z-index': block.bg===block.oriBg?1:0}">
                                    {{block.value}}
                                </div>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
                <div class="canvas-wrap" :style="{'width':(bodyWidth*0.8-180-26)+'px','max-width':blocks*blockSize+'px','height':queryData.length*51+'px'}">
                    <canvas class="canvas" height="3000" width="3000" ref="canvas" :style="{'left':bias+'px'}"></canvas>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    import {bodyWidthMixin} from "@/common/mixin";
    import {generateRandomColor,colorFaded} from "@/common/utils";
    import {resourceGanttDate,resourceGanttHour} from "@/network/resourceGantt";
    import Layout from "@/components/content/Layout";

    export default {
        name: "ResourceGantt_v2",
        mixins: [bodyWidthMixin],
        components: {
            Layout
        },
        data() {
            return {
                mode: "gantt", // "gantt" / "route"
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
                queryData: [],
                transformedData: null,
                currentProduct: null
            }
        },
        beforeMount() {

        },
        mounted() {
          this.timeChange(this.date);
        },
        methods: {
            getData() {
                let reqFunc;
                if(this.dateType === "date") {
                    reqFunc = resourceGanttHour;
                }else {
                    reqFunc = resourceGanttDate;
                }
                let tmpDate = new Date(this.date);
                tmpDate.setDate(tmpDate.getDate() + 6);
                // console.log("妙啊");
                return reqFunc({
                    params: this.dateType === "date"?
                        {
                            date: this.date
                        }:
                        {
                            start: this.date,
                            end: tmpDate
                        }
                }).then(res => {
                    if(res.code === 200) {
                        this.queryData = res.data;
                        this.dataTransform();
                    }
                    else alert("Some Error Occured!")
                });
            },
            dataTransform() {
                //进行数据结构转换，方便后续的渲染
                this.transformedData = {};
                this.queryData.forEach((obj,idx) => {
                    obj.plan.forEach(p => {
                        if(p.delay) {
                            this.$set(p,"bg","hsl(0,100%,50%)");
                        }else {
                            this.$set(p,"bg",generateRandomColor(p.value));
                        }
                        p.oriBg = p.bg; //本来的颜色/显示的颜色（是否淡化处理）
                        p.index = idx; //用于路线图定位
                        if(Object.prototype.hasOwnProperty.call(this.transformedData,p.value)) {
                            this.transformedData[p.value].push(p);
                        } else {
                            Object.defineProperty(this.transformedData,p.value,{
                                value: [p],
                                configurable:true,
                                writable:true,
                                enumerable:true
                            });
                        }
                    });
                });
                for(let product in this.transformedData) {
                    if(Object.prototype.hasOwnProperty.call(this.transformedData,product)) {
                        this.transformedData[product].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
                        let tmpObj = {};
                        this.transformedData[product].forEach(plan => {
                            let st = new Date(plan.start).toString();
                            if(Object.prototype.hasOwnProperty.call(tmpObj,st)) {
                                tmpObj[st].push(plan);
                            } else {
                                Object.defineProperty(tmpObj,st,{
                                    value: [plan],
                                    configurable:true,
                                    writable:true,
                                    enumerable:true
                                });
                            }
                        });
                        this.transformedData[product] = tmpObj;
                    }
                }
            },
            timeSelectChange(timeSelect) {
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
                // TODO
                // 请求数据
                this.clearCanvas();
                this.getData().then(()=> {
                    if(this.mode === "route") {
                        this.drawLines(this.currentProduct);
                        this.changeColor(this.mode,this.currentProduct);
                    }
                });
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
            },
            clearCanvas() {
                let c=this.$refs.canvas;
                let ctx=c.getContext("2d");
                ctx.clearRect(0,0,c.width,c.height);
            },
            drawLines(p) { //产品
                let c=this.$refs.canvas;
                let ctx=c.getContext("2d");
                let tmpArr = [];
                if(Object.prototype.hasOwnProperty.call(this.transformedData,p)) {
                    for(let i in this.transformedData[p]) {
                        if(Object.prototype.hasOwnProperty.call(this.transformedData[p],i))
                            tmpArr.push(this.transformedData[p][i]);
                    }
                }
                if(tmpArr.length > 1) { //全在同一时刻的情况排除
                    for(let i=0;i<tmpArr.length-1;i++) {
                        for(let j=0;j<tmpArr[i].length;j++) {
                            for(let k=0;k<tmpArr[i+1].length;k++) {
                                let end1 = this.getPosition(tmpArr[i][j].end);
                                let start2 = this.getPosition(tmpArr[i+1][k].start);
                                let lintHeight = 51;
                                if(tmpArr[i][j].index === tmpArr[i+1][k].index) {//画横线
                                    let y = 20+lintHeight*tmpArr[i][j].index; //51为一行的高度 (40px height + 10px margin bottom
                                    ctx.beginPath();
                                    ctx.moveTo(end1,y);
                                    ctx.lineTo(start2,y);
                                    ctx.strokeStyle="rgb(229, 80, 57)";
                                    ctx.stroke();
                                }else {
                                    let shortLine = 5;
                                    let y1 = 20+lintHeight*tmpArr[i][j].index;
                                    let y2 = 20+lintHeight*tmpArr[i+1][k].index;
                                    let e2x = end1+shortLine;
                                    let s2x = start2-shortLine;
                                    let p1y = y1+(tmpArr[i][j].index > tmpArr[i+1][k].index ? -1:1)*18;
                                    ctx.beginPath();
                                    ctx.moveTo(end1,y1);
                                    ctx.lineTo(e2x,y1);
                                    ctx.lineTo(e2x,p1y);
                                    ctx.lineTo(s2x,p1y);
                                    ctx.lineTo(s2x,y2);
                                    ctx.lineTo(start2,y2);
                                    ctx.strokeStyle="rgb(229, 80, 57)";
                                    ctx.stroke();
                                }
                            }
                        }
                    }
                }
            },
            changeColor(mode,p) { //当前模式/点击的产品
                let flag = mode==="route";
                for(let product in this.transformedData) {
                    if(Object.prototype.hasOwnProperty.call(this.transformedData,product)) {
                        for(let i in this.transformedData[product]) {
                            if(Object.prototype.hasOwnProperty.call(this.transformedData[product],i)) {
                                this.transformedData[product][i].forEach(p2 => {
                                    p2.bg = flag && (product!==p) ? colorFaded(p2.bg) : p2.oriBg;
                                });
                            }
                        }
                    }
                }
            },
            showRoutes(p) {
                this.currentProduct = p;
                this.mode = this.mode === "gantt"?"route":"gantt";
                //change color
                this.changeColor(this.mode,p);
                //draw line
                if(this.mode === "route") {
                    this.clearCanvas();
                    this.drawLines(p)
                } else {
                    this.clearCanvas();
                }
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

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
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
        line-height: 30px;
        text-align: center;
        border: solid 1px #888888;
        margin-left: -1px;
        display: inline-block;
        white-space: normal;
        float: left;
    }

    /* table */
    .table {
        margin-top: 20px;
        position: relative;
    }
    .table .row {
        /*background-color: #6c81eb;*/
        height: 50px;
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
        background-color: #F5F7FA;
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
        background-color: #F5F7FA;
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

        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .canvas {
        position: absolute;
        top: 0;
    }
    .canvas-wrap {
        left: 206px;
        position: absolute;
        top: 0;
        overflow: hidden;
        white-space: nowrap;
    }
</style>