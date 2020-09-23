<template>
    <div class="box box-demo">
        <slot name="component"></slot>
        <div class="box-demo-description">
            <slot name="description"></slot>
        </div>
        <transition name="slide">
            <div class="box-demo-code" v-show="isOpen">
                <slot name="code"></slot>
            </div>
        </transition>
        <div class="code-box-actions">
            <a-tooltip title="Copy code">
                <a-icon type="copy" @click.native="copyCode" />
            </a-tooltip>
            <a-tooltip :title="isOpen?'Hide code':'Show code'">
                <span class="code-expand-icon" @click="toggleOpen">
                    <img width="16" alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="code-expand-icon-show" v-show="isOpen">
                    <img width="16" alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="code-expand-icon-hide" v-show="!isOpen">
                </span>
            </a-tooltip>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'demoBox',
        props: {
            jsfiddle: Object,
        },
        data() {
            return {
                isOpen: false,
            };
        },
        methods: {
            toggleOpen() {
                this.isOpen = !this.isOpen;
            },
            copyCode() {
                if (this.$slots.code && this.$slots.code[0] && this.$slots.code[0].elm) {
                    this.$copyText(this.$slots.code[0].elm.outerText).then(res => {
                        this.$message.success('复制成功')
                    }, err => {
                        this.$message.success(err.message || '复制失败')
                    })
                }
            }
        },
    };
</script>

<style lang="less">
    @font-face {
        font-family: sguoyi;
        src: url("../assets/fonts/font.woff");
    }

    @font-face {
        font-family: sguoyi2;
        src: url("../assets/fonts/font2.woff");
    }

    .header-anchor {
        color: blueviolet;
    }

    .markdown {

        h1 {
            color: var(--color-markdown-h1);
            font-weight: 500;
            margin-bottom: 20px;
            margin-top: 8px;
            font-size: 30px;
            font-variant: tabular-nums;
            line-height: 38px;
        }

        h2, h3, h4, h5, h6 {
            color: var(--color-markdown-h);
            font-variant: tabular-nums;
            margin: 1.6em 0 .6em;
            font-weight: 500;
            clear: both;
        }
    }

    .markdown h1 a, .markdown h2 a, .markdown h3 a {
        font-size: .8em;
        opacity: 0;
        font-weight: 400;
        transition: opacity .2s ease-in-out;
    }

    .markdown h1:hover a, .markdown h2:hover a, .markdown h3:hover a {
        opacity: 1;
    }

    .table-api {
        font-size: 14px;
        line-height: 1.5;
        font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
        border-width: 0;
        margin: 2em 0;
        width: 100%;
        text-align: left;
        border-spacing: 0;

        th {
            font-weight: 600;
            background: rgba(0, 0, 0, .02);
        }

        th, td {
            padding: 14px 16px;
            white-space: nowrap;
            color: #5c6b77;
            border-width: 1px 0;
            border-bottom: 1px solid var(--table-api-td-border-color);
        }
    }

    .box-demo {
        padding: 0;
        border: 1px solid var(--box-demo-border-color);
        border-radius: 4px;
        box-shadow: none;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .box-demo-show {
        padding: 20px 25px 30px;
        border-bottom: 1px solid var(--box-demo-border-color);
    }

    .box-demo-description {
        position: relative;
        padding: 15px 20px;
        border-radius: 0 0 6px 6px;
        transition: background-color 0.4s ease;
        width: 100%;
        font-size: 12px;

        &.bordered {
            border-bottom: 1px dashed #e9e9e9;
        }

        p {
            margin: 1em 0;
        }

        h3, h4 {
            position: absolute;
            top: -10px;
            padding: 1px 8px;
            margin-left: -8px;
            margin-top: 0;
            margin-bottom: 0;
            color: var(--color-demo-description-h4);
            border-radius: 4px;
            border-top-left-radius: 0;
            background: var(--bg-demo-description-h4);
            -webkit-transition: background-color 0.4s ease;
            transition: background-color 0.4s ease;

            .header-anchor {
                display: none;
            }
        }

        li {
            line-height: 21px;
        }
    }

    .box-demo-code {
        padding: 15px;
        overflow: auto;
        border-top: 1px dashed var(--box-demo-border-color);

        pre, code {
            display: block;
            margin: 0;
            border: none;
            font-size: 15px;
            line-height: 1.6;
            font-family: sguoyi2;
        }
    }

    .code-box-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        border-top: 1px dashed var(--box-demo-actions-border-color);
        opacity: .7;
        transition: opacity .3s;

        .anticon {
            color: var(--color-icon-copy);
            cursor: pointer;
        }

        > span {
            position: relative;
            display: inline-block;
            width: 16px;
            height: 16px;
            line-height: 1;
            margin-left: 16px;
            margin-top: -2px;
            vertical-align: top;
            cursor: pointer;
            opacity: .55;
        }

        .code-expand-icon-show, .code-expand-icon-hide {
            filter: invert(var(--filter-invert));
        }
    }

</style>

<style>
    .hljs-tag {
        color: var(--hljs-tag);
    }

    .hljs-comment, .hljs-quote {
        color: #93a1a1
    }

    .hljs-addition, .hljs-keyword, .hljs-selector-tag {
        color: var(--hljs-keyword);
    }

    .hljs-doctag, .hljs-literal, .hljs-meta .hljs-meta-string, .hljs-number, .hljs-regexp, .hljs-string {
        color: var(--hljs-doctag);
    }

    .hljs-name, .hljs-section, .hljs-selector-class, .hljs-selector-id, .hljs-title {
        color: var(--hljs-name);
    }

    .hljs-attr, .hljs-attribute, .hljs-class .hljs-title, .hljs-template-variable, .hljs-type, .hljs-variable {
        color: var(--hljs-attr);
    }

    .hljs-bullet, .hljs-link, .hljs-meta, .hljs-meta .hljs-keyword, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-subst, .hljs-symbol {
        color: var(--hljs-bullet);
    }

    .hljs-built_in, .hljs-deletion {
        color: var(--hljs-built-in);
    }

    .hljs-formula {
        background: #eee8d5
    }

    .hljs-emphasis {
        font-style: italic
    }

    .hljs-strong {
        font-weight: 700
    }
</style>
