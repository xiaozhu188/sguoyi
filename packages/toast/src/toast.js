import Vue from 'vue'
import Toast from './index'

let seed = 0
const now = Date.now()

function getUuid () {
    return 'SToast_' + now + '_' + seed++
}

let Constructor = Vue.extend(Toast)
let instance

const toast = function (config) {
    if (!instance) {
        instance = new Constructor()
        document.body.appendChild(instance.$mount().$el)
    }
    let options = {
        tId: getUuid(),
        duration: 2000
    }
    if (typeof config === 'string') {
        options.content = config
    } else {
        options = {
            ...options,
            ...config
        }
    }
    return instance.create(options)
}
toast.remove = function (id) {
    instance.remove(id)
}
toast.destroy = function () {
    if (instance) {
        instance.destroy()
        instance = null
    }
}

export default toast
