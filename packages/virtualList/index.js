import virtualList from './src/index';
import virtualListItem from './src/Item';
virtualList.install = function(Vue) {
    Vue.component(virtualList.name, virtualList);
    Vue.component(virtualListItem.name, virtualListItem);
};
export default virtualList;
