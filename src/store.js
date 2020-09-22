import Vue from 'vue';

export let store = Vue.observable({
    theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
});
export let mutations = {
    setTheme(theme) {
        store.theme = theme;
    }
}
