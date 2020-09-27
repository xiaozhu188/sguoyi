import toast from './src/toast';

toast.install = function (Vue) {
    Vue.$toast = Vue.prototype.$toast = toast;
};
export default toast;
