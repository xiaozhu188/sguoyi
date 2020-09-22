# Ruler 标尺时间选择器

以滑动标尺的体验选择时间段

## 何时使用
- 需要选择当天时间段时使用，最小可精确到1分钟（暂不开放，因为当前业务仅精确到10分钟）

## 代码演示

::: demo
<summary>
  #### 基本
  可选择范围是0:00-19:00;
  当前时间点是12:30;
</summary>

```html
<template>
    <div class="demo-ruler">
        <ruler
            :START_TIME="START_TIME" 
            :END_TIME="END_TIME" 
            :container="true"
            :DISABLED_TIME="DISABLED_TIME"
            @select="handleSelect" 
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                START_TIME: 8,
                END_TIME: 21,
                CURRENT_TIME: 12,
                DISABLED_TIME: ['9:00 - 11:00', '17:30 - 18:30']
            }        
        },
        methods: {
            handleSelect(val) {
                if(val.length) {
                    this.$message.success(`选择时间段：${val[0]}-${val[1]}`)
                } else {
                    this.$message.error('时间段已经被占用')
                }
            }
        },
    };
</script>
```
:::

## API

### Ruler Props 
| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|-------------------|-------------|
| START_TIME  | 可选择时间段的最小时间点(默认可在8：00-21：00) | Number | 8 |
| END_TIME | 可选择时间段的最大时间点(默认可在8：00-21：00) | Number | 21.5 |
| DEGREE | 1小时分6个刻度，即：1个刻度10分钟(暂不对外开放) | Number | 6 |
| SIZE | 一个刻度占用的像素(暂不对外开放) | Number | 20 |
| DEFAULT_SELECTED_TIME | 默认选择1小时即60分钟 | Number | 60 |
| CURRENT_TIME | 当前刻度值(默认指向9点),比如,9指向 9:00,9.5指向 9:30 | Number | 9 |
| DISABLED_TIME | 已被占用时间段,通常由后端返回 | Array | [] |
| container | 仅哎文档演示时使用，不推荐业务代码里使用 | Object, String, Boolean | - |
{.table-api} 

### Ruler Events
| 参数        | 说明           | 回调参数               |
|------------|----------------|-------------------|
| handleSelect | 滑动结束 | [startTime, endTime] |
{.table-api} 
