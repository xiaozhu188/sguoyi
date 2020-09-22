import ruler from './src/index';
ruler.install = function(Vue) {
    Vue.component(ruler.name, ruler);
};
export default ruler;
