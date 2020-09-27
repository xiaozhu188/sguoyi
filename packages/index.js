import moveNumber from "./moveNumber";
import countdown from "./countdown";
import virtualList from "./virtualList";
import ruler from "./ruler";
import marquee from "./marquee";
import observer from "./observer";
import sguoyi from "./sgyRequest";
import toast from "./toast";

export {
    moveNumber,
    countdown,
    virtualList,
    ruler,
    marquee,
    observer,
    sguoyi,
    toast
}
export default {
    install (Vue) {
        Vue.use(moveNumber);
        Vue.use(countdown);
        Vue.use(virtualList);
        Vue.use(ruler);
        Vue.use(marquee);
        Vue.use(observer);
        Vue.$sgy = Vue.prototype.$sgy = sguoyi;
        Vue.use(toast);
    }
};
