# MoveNumber 数字滚动动画

数字变化上下滚动切换

## 何时使用
- 数字滚动变化，如会员积分变化

## 代码演示

::: demo
<summary>
  #### 基本
  点击数字切换。
</summary>

```html
<template>
    <div class="test">
        <move-number 
            :value="val" 
            @click.native="val = val + 1"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                val:64            
            }
        }   
    };
</script>
```
:::

## API

### MoveNumber Props 
| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|-------------------|-------------|
| value    | 初始数字 | Number | - |
{.table-api} 
