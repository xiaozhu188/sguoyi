import observer from './src/index.vue';
import resizeObserver from './src/ResizeObserver';
import IntersectionObserver from './src/IntersectionObserver';
import { debounce, isNative } from "../utils";
import { WAIT_TIME } from "./src/config";

observer.install = function (Vue) {
    Vue.component(observer.name, observer);
    Vue.component(resizeObserver.name, resizeObserver);
    Vue.directive('resize', {
        bind (el, binding) {
            if (isNative(ResizeObserver)) {
                let { value } = binding
                el._observer = new ResizeObserver(debounce((entries) => {
                    value.call(null, entries[0])
                }, WAIT_TIME))
            } else {
                console.warn('You need to polyfill ResizeObserver')
            }
        },
        inserted (el) { // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
            Vue.nextTick(() => {
                el._observer && el._observer.observe(el)
            })
        },
        unbind (el) {
            el._observer && el._observer.unobserve(el)
        }
    })
    Vue.component(IntersectionObserver.name, IntersectionObserver);
};
export default observer;
