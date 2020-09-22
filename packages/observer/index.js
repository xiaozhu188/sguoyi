import observer from './src/index.vue';
observer.install = function(Vue) {
    Vue.component(observer.name, observer);
};
export default observer;
