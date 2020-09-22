<template>
    <div class="title js-video-title" v-if="text">
        <div class="inner js-video-title-inner">{{ text }}</div>
    </div>
</template>

<script>
    import { debounce } from '../../utils'

    export default {
        name: "SMarquee",
        props: {
            text: {
                type: String,
                default: '',
                required: true
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.handleResize()
            })
            this.callback = debounce(this.handleResize, 200)
            window.addEventListener('resize', this.callback)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.callback)
        },
        methods: {
            handleResize(e) {
                let titleDom = document.querySelector('.js-video-title')
                let titleInnerDom = document.querySelector('.js-video-title-inner')
                let titleDomWidth = titleDom.getBoundingClientRect().width
                let titleInnerDomWidth = titleInnerDom.getBoundingClientRect().width
                if (titleDom && titleInnerDom) {
                    if ((titleInnerDomWidth > titleDomWidth) && (titleDomWidth > 10)) {
                        titleDom.style.setProperty('--diff', titleDomWidth + 'px')
                        titleDom.style.setProperty('--duration', (titleInnerDomWidth / titleDomWidth * 8) + 's')
                    } else {
                        titleDom.style.setProperty('--diff', titleDomWidth + 'px')
                        titleDom.style.setProperty('--duration', 0)
                    }
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .title {
        width: 100%;
        overflow: hidden;
        --diff: 100px;

        .inner {
            word-break: keep-all;
            width: fit-content;
            animation: move var(--duration) linear 2s infinite;
            white-space: nowrap;

            &:hover {
                animation-play-state: paused;
            }
        }
    }

    @keyframes move {
        0%, 5% {
            transform: translateX(0px);
        }
        95%, 100% {
            transform: translateX(calc(-100% + var(--diff)));
        }
    }
</style>
