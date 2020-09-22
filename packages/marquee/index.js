import marquee from './src/index';
marquee.install = function(Vue) {
    Vue.component(marquee.name, marquee);
};
export default marquee;
