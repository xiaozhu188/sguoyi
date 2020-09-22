import Vue from 'vue'
import {
    Affix,
    Anchor,
    BackTop,
    Button,
    Icon,
    Layout,
    Menu,
    message,
    Row,
    Col,
    Tooltip,
    Skeleton
} from 'ant-design-vue'
Vue.prototype.$message = message
Vue.use(Affix)
Vue.use(Anchor)
Vue.use(BackTop)
Vue.use(Button)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Skeleton)
