<template>
    <div class="container">
        <div class="ruler-wrapper" ref="ruler" @scroll="scroll">
            <canvas id="canvas-ruler" style="background: #f3f5f7;"></canvas>
        </div>
        <div class="cursor" :style="{width: `${CURSOR_WIDTH}px`}"></div>
    </div>
</template>

<script>
    import * as util from '../../utils/index'

    let {innerWidth} = window
    const CANVAS_HEIGHT = 80
    const DEGREE = 6     // 1小时分6个刻度，即：1个刻度10分钟
    const SIZE = 20     // 一个刻度占用的像素
    const DEFAULT_SELECTED_TIME = 60 // 默认选择1小时即60分钟
    const CURSOR_WIDTH = (DEFAULT_SELECTED_TIME / (60 / DEGREE)) * SIZE // 固标宽度
    const CURSOR_HEIGHT = 20
    let offsetX = (innerWidth - CURSOR_WIDTH) / 2
    let originalPoint = {
        x: offsetX,
        y: CANVAS_HEIGHT
    }
    export default {
        name: 'Ruler',
        data() {
            this.oldStartVal = ''
            this.oldEndVal = ''
            return {
                CURSOR_WIDTH
            }
        },
        props: {
            DISABLED_TIME: {
                type: Array,
                default() {
                    return []
                }
            },
            START_TIME: {
                type: Number,
                default: 0
            },
            END_TIME: {
                type: Number,
                default: 24
            },
            CURRENT_TIME: {
                type: Number,
                default: 0
            },
            container: [Object, String, Boolean]
        },
        computed: {
            // 起始刻度
            MIN_VALUE() {
                return this.START_TIME * DEGREE
            },
            // 总共刻度
            MAX_VALUE() {
                return this.END_TIME * DEGREE
            },
            // 当前时间点的刻度值
            currentValue() {
                return this.CURRENT_TIME * DEGREE
            }
        },
        mounted() {
            setTimeout(()=>{
                if (this.container) {
                    innerWidth = document.querySelector('.demo-ruler .container').getBoundingClientRect().width
                    console.log('innerWidth', innerWidth)
                    offsetX = (innerWidth - CURSOR_WIDTH) / 2
                    originalPoint = {
                        x: offsetX,
                        y: CANVAS_HEIGHT
                    }
                }
                this.draw()
            })
        },
        methods: {
            scroll: util.debounce(function (e) {
                const {START_TIME} = this
                let deltaX = Math.round(e.target.scrollLeft)
                if (deltaX % SIZE !== 0) {
                    // 位置大于一个刻度的一半,向后吸附,否则向前吸附
                    let scrollIndex = Math.floor(deltaX / SIZE)
                    if (deltaX % SIZE >= SIZE / 2) {
                        scrollIndex = scrollIndex + 1
                    }
                    deltaX = SIZE * scrollIndex
                    this.setScrollLeft(deltaX)
                }
                // 1px是多少min
                let pxPerMin = 60 / DEGREE / SIZE
                let start = Math.floor(pxPerMin * deltaX + START_TIME * 60) // 起始时间的分钟数
                let end = start + DEFAULT_SELECTED_TIME // 结束时间的分钟数,跨度是60min
                if (this.checkTime(start, end)) {
                    console.log('无效时间')
                    this.$emit('select', [])
                    return
                }
                // 开始时间
                let startTime = util.min2Time(start)

                // 结束时间
                let endTime = util.min2Time(end)

                if (startTime !== this.oldStartVal && endTime !== this.oldEndVal) {
                    this.oldStartVal = startTime
                    this.oldEndVal = endTime
                    this.$emit('select', [startTime, endTime])
                }

            }, 300),
            draw() {
                const {MIN_VALUE, MAX_VALUE} = this
                const canvasRuler = document.querySelector('#canvas-ruler')
                canvasRuler.width = MAX_VALUE * SIZE + innerWidth - CURSOR_WIDTH - MIN_VALUE * SIZE
                canvasRuler.height = CANVAS_HEIGHT
                const context = canvasRuler.getContext('2d')
                this.drawRuler(context)
                this.drawDisabledArea(context)
            },
            drawRuler(context) {
                const {MIN_VALUE, MAX_VALUE} = this
                context.lineWidth = 1
                for (let i = MIN_VALUE; i <= MAX_VALUE; i++) {
                    // 绘制刻度线
                    context.beginPath()
                    context.moveTo(originalPoint.x + (i - MIN_VALUE) * SIZE, originalPoint.y)
                    context.lineTo(originalPoint.x + (i - MIN_VALUE) * SIZE, i % DEGREE === 0 ? 25 : i % (DEGREE / 2) === 0 ? 40 : 55)
                    context.strokeStyle = i % DEGREE === 0 ? '#111' : '#5a5a5a'
                    context.stroke()
                    context.closePath()
                    // 绘制文本
                    if (i % DEGREE === 0) {
                        const FONT_SIZE = 12
                        context.fontSize = FONT_SIZE
                        let currentMin = i * (60 / DEGREE)
                        let hour = Math.floor(currentMin / 60)
                        let min = currentMin % 60
                        let time = `${hour < 10 ? '0' + hour : hour}:${min === 0 ? '00' : min}`
                        let text = i === 0 ? '00:00' : time
                        context.fillText(text, originalPoint.x + (i - MIN_VALUE) * SIZE - FONT_SIZE, 17)
                    }
                }
                // 绘制底边框
                context.moveTo(0, CANVAS_HEIGHT)
                context.lineTo(MAX_VALUE * SIZE, CANVAS_HEIGHT)
                context.stroke()
                // 设置标尺的起始值
                if (this.currentValue > 0) {
                    this.setScrollLeft((this.currentValue - MIN_VALUE) * SIZE)
                }
            },
            drawDisabledArea(context) {
                if (this.DISABLED_TIME.length) {
                    const {START_TIME} = this
                    // 绘制不能选择的区域
                    context.beginPath()
                    context.fillStyle = '#7f7f7f'
                    this.DISABLED_TIME.forEach(time => {
                        time = time.replace(/\s/g, '')
                        let [disableStart, disableEnd] = time.split('-')
                        let oX1 = this.time2px(disableStart)
                        let oX2 = this.time2px(disableEnd)
                        context.fillRect(
                            oX1 + offsetX - this.time2px(`${START_TIME}:00`),
                            CANVAS_HEIGHT - CURSOR_HEIGHT,
                            oX2 - oX1,
                            CURSOR_HEIGHT
                        )
                    })
                    context.closePath()
                }
            },
            checkTime(start, end) {
                let disableMin = this.DISABLED_TIME.map((time) => {
                    time = time.replace(/\s/g, '')
                    let [disableStart, disableEnd] = time.split('-')
                    return [util.time2Min(disableStart), util.time2Min(disableEnd)]
                })
                let flag = disableMin.some((item) => {
                    let [min, max] = item
                    if ((start > min && start < max) || (end > min && end < max) || (start == min || end == max) || (start > min &&
                        start < max)) {
                        return true
                    }
                    return false
                })
                return flag
            },
            setScrollLeft(value) {
                this.$refs.ruler.scrollLeft = value
            },
            // 时间点转像素
            time2px(time) {
                let totalMin = util.time2Min(time)
                return totalMin * (SIZE / (60 / DEGREE))
            }
        }
    }
</script>

<style scoped lang="less">
    .container {
        position: relative;
        height: 80px;
    }

    .ruler-wrapper {
        overflow-x: auto;
    }

    .cursor {
        position: absolute;
        left: 50%;
        bottom: 0;
        z-index: 2;
        transform: translateX(-50%);
        width: auto;
        height: 20px;
        background: #d11c2b;
    }
</style>
