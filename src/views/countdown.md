# Countdown 倒计时

不同时间格式的倒计时,可以设置倒计时步长,倒计时过程事件分发等

## 何时使用
- 页面需要显示不同时间格式的倒计时
- 页面需要轮询时

## 代码演示

::: demo
<summary>
  #### 基本
  最简单的用法。
</summary>

```html
<template>
    <div class="content">
        <countdown :time="3600*1000" @end="handleEnd" />
    </div>
</template>

<script>
    export default {
        methods: {
            handleEnd() {
                console.log('end')
            }
        },
    };
</script>

<style>
    .content {
        padding: 10px;
    }
</style>
```
:::

::: demo
<summary>
  #### 自定义文本样式
  通过自定义插槽自定义文本及其样式。
</summary>

```html
<template>
    <div class="content">
        <countdown :time="600*1000">
            <template v-slot="{slotData}">
                <button class="custom-btn btn-3d">
                    <span>敬请期待</span>
                    <span>{{slotData.hours}}小时 {{slotData.minutes}}分 {{slotData.seconds}}秒</span>
                </button>
            </template>
        </countdown>
    </div>
</template>

<script>
    export default {
        
    };
</script>

<style>
    .custom-btn {
        width: 130px;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        padding: 10px 25px;
        font-family: 'Lato', sans-serif;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        outline: none;
    }
    .btn-3d {
        position: relative;
        right: 20px;
        bottom: 20px;
        border: none;
        box-shadow: none;
        width: 130px;
        height: 40px;
        line-height: 42px;
        perspective: 230px;
    }
    .btn-3d span:nth-child(1) {
        box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9, 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
        transform: rotateX(90deg);
        transform-origin: 50% 50% -20px;
    }
    .btn-3d span:nth-child(2) {
        transform: rotateX(0deg);
        transform-origin: 50% 50% -20px;
    }
    .btn-3d:hover span:nth-child(1) {
        box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        transform: rotateX(0deg);
    }
    .btn-3d:hover span:nth-child(2) {
        box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        color: transparent;
        transform: rotateX(-90deg);
    }
    .btn-3d span {
        background: rgb(0,172,238);
        background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
        display: block;
        position: absolute;
        width: 130px;
        height: 40px;
        box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        border-radius: 5px;
        margin: 0;
        text-align: center;
        box-sizing: border-box;
        transition: all .3s;
    }
</style>
```
:::

## API

### Countdown Props 
| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|-------------------|-------------|
| autoStart    | 是否自动倒计时 | Boolean | true |
| emitEvents  | 是否分发事件 | Boolean | true |
| interval  | 倒计时步数 | Number | 1000 |
| now  | 当前客户端时间戳(毫秒级)  | Number | () => Date.now() |
| time  | 倒计时时长(毫秒级)  | Number | 0 |
{.table-api} 

### Countdown Events
| 参数        | 说明           | 回调参数               |
|------------|----------------|-------------------|
| start | 倒计时开始 | - |
| progress | 倒计时进度 | 当前时间信息  |
| abort | 倒计时取消 | - |
| end | 倒计时结束 | - |
{.table-api} 
