# Marquee 文字走马灯

单行文本超出边界滚动

## 何时使用
- 代替text-overflow: ellipsis方案,过长文本超出边界滚动完整显示

## 代码演示

::: demo
<summary>
  #### 基本
  最简单的用法。
</summary>

```html
<template>
    <div>
        <div class="demo-marquee">
            <s-marquee :text="longText" />
        </div>
        <div class="demo-marquee">
            <s-marquee :text="shortText" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                longText: '譬如想有乔木，想看好花，一定要有好土；没有土，便没有花木了；所以土实在较花木还重要',
                shortText: '我吃的是草，挤出来的是牛奶'
            }
        }   
    };
</script>

<style>
.demo-marquee {
    width: 200px;
    margin-bottom: 15px;
    line-height: 1.3;
}
</style>
```
:::

## API

### Affix Props 
| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|-------------------|-------------|
| text | 文字 | String | '' |
{.table-api} 
