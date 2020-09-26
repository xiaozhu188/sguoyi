export const debounce = function (func, delay = 300) {
    let timer = null
    return function () {
        let _this = this
        let args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(function () {
            return func.apply(_this, args);
        }, delay)
    }
}

// 分钟数转时间点
export const min2Time = function (min) {
    let h = Math.floor(min / 60)
    let m = min % 60
    let res = `${h}:${m < 10 ? '0' + m : m}`
    return res
}

// 分钟转小时
export const min2Hour = function (min) {
    let hour = Math.floor(min / 60)
    let minus = Math.floor(min % 60)
    return hour + minus / 60
}

// 时间点转分钟数
export const time2Min = function (time) {
    let [hour, min] = time.split(':')
    hour = Number(hour.replace(/\s/g, ''))
    min = Number(min.replace(/\s/g, ''))
    let totalMin = 60 * hour + min
    return totalMin
}

// 是否浏览器原生方法
export const isNative = function (constructor) {
    return typeof constructor === 'function' && /native code/g.test(constructor.toString())
}
