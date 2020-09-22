import testA from './testA'
import testB from './testB'
import countdown from './countdown'
import virtualList from './virtualList'
import ruler from './ruler'
import marquee from './marquee'
import observer from './observer'
export default {
    install(Vue) {
        Vue.use(testA)
        Vue.use(testB)
        Vue.use(countdown)
        Vue.use(virtualList)
        Vue.use(ruler)
        Vue.use(marquee)
        Vue.use(observer)
    }
}
