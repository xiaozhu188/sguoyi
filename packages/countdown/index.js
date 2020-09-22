import countdown from './src/index.vue';
countdown.install = function(Vue) {
    Vue.component(countdown.name, countdown);
};
export default countdown;
