<template>
    <div class="numbers">
        <div class="num-wrapper" v-for="(num, index) in currentValue" :key="index" :style="{height: `${height}px`}">
            <div class="scroll-wrapper" :style="{transform: `translateY(${-num * height}px)`, transitionDuration: `${duration}s`}">
                <div class="num" v-for="item in [0,1,2,3,4,5,6,7,8,9]" :key="item" :style="{height: `${height}px`}">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { debounce } from '../../utils'

    function num2array(number) {
        let str = number > 0 ? String(number) : '0'
        let res = []
        for (let i = 0; i < str.length; i++) {
            res.push(str[i])
        }
        return res
    }

    export default {
        name: 'MoveNumber',
        props: {
            value: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 30
            },
            duration: {
                type: Number,
                default: 1.5
            }
        },
        data() {
            return {
                currentValue: []
            }
        },
        watch: {
            value: {
                immediate: true,
                handler: debounce(function (val) {
                    let length = val.toString().length
                    let arr = new Array(length)
                    this.currentValue = arr.fill(0, 0)
                    setTimeout(() => {
                        this.currentValue = num2array(val)
                    })
                }, 300)
            }
        }
    }
</script>

<style lang="less" scoped>
    .numbers {
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
    }

    .num-wrapper {
        position: relative;
        text-align: center;
        font-size: 26px;
        overflow: hidden;

        .scroll-wrapper {
            transition: all 1.5s ease;
        }

        .num {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
        }
    }
</style>
