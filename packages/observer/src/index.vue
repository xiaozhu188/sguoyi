<template>
    <div>
        Observer
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
        name: 'Observer',
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

</style>
