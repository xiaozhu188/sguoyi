<template>
    <a-layout class="basic-layout">
        <a-layout-sider :width="240">
            <div class="logo" @click="handleClick">SGUOYI</div>
            <a-menu :theme="theme" mode="inline" :default-selected-keys="['moveNumber']">
                <a-menu-item key="moveNumber">
                    <router-link to="/moveNumber">
                        <span class="nav-text">MoveNumber <span class="chinese">数字滚动</span></span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="ruler">
                    <router-link to="/ruler">
                        <span class="nav-text">Ruler <span class="chinese">时间标尺</span></span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="countdown">
                    <router-link to="/countdown">
                        <span class="nav-text">Countdown <span class="chinese">倒计时</span></span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="virtualList">
                    <router-link to="/virtualList">
                        <span class="nav-text">VirtualList <span class="chinese">虚拟列表</span></span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="marquee">
                    <router-link to="/marquee">
                        <span class="nav-text">Marquee <span class="chinese">文字滚动</span></span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="observer">
                    <router-link to="/observer">
                        <span class="nav-text">Observer <span class="chinese">观测</span></span>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content :style="{ margin: '24px 16px 0' }">
                <div class="basic-layout-content">
                    <router-view />
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import { store, mutations } from './../store'
    import { lightTheme, darkTheme } from './../config'

    const themeMap = {
        'light': lightTheme,
        'dark': darkTheme
    }

    export default {
        name: "Demo",
        data() {
            return {
                theme: store.theme
            }
        },
        created() {
            this.setTheme(this.theme)
        },
        methods: {
            setTheme(theme) {
                this.theme = theme
                localStorage.setItem('theme', theme)
                Object.keys(themeMap[theme]).forEach(item => {
                    document.documentElement.style.setProperty(item, themeMap[theme][item])
                })
            },
            handleClick() {
                let theme = localStorage.getItem('theme')
                theme = theme === 'light' ? 'dark' : 'light'
                this.setTheme(theme)
            }
        }
    };
</script>

<style lang="less" scoped>
    #app {
        .ant-layout {
            background: var(--bg-layout);
        }
    }

    .basic-layout {
        height: 100vh;

        /deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-layout-sider {
            background: var(--bg-sider);
        }

        .logo {
            height: 32px;
            margin: 16px;
            line-height: 32px;
            text-align: center;
            letter-spacing: 1px;
            font-weight: 700;
            font-size: 22px;
            font-family: sguoyi2;
            background: var(--bg-logo);
            color: rgba(198, 47, 47, 0.9);
        }
    }

    .basic-layout-content {
        padding: 24px;
        background: var(--bg);
        color: var(--color);
    }

    .chinese {
        font-size: 12px;
        margin-left: 6px;
        font-weight: 400;
        opacity: .67;
    }
</style>
