# Toast 轻提示

## 何时使用
- 提示信息

## 代码演示

::: demo
<summary>
  #### 基本
    this.$toast('success');
    可手动点击toast关闭,或调用this.$toast.remove(id)关闭;
    调用this.$toast.destroy()销毁toast;
</summary>

```html
<template>
    <div>
        <a-button type="primary" @click="handleClick1" style="margin-right: 12px">提示</a-button>
        <a-button type="primary" @click="handleClick2">5s后销毁</a-button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick1() {
                this.$toast('success!')
            },
            handleClick2() {
                this.$toast({
                    duration: 5000,
                    content: '5s后销毁'
                })
                setTimeout(()=>{
                    this.$toast.destroy()
                }, 5000)
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
| content  | 提示内容 | String | - |
| duration | 提示持续时间 | Number | 2000 |
| mask | 是否使用蒙层，蒙层可防止重复点击 | Boolean | false |
{.table-api} 

### Ruler Methods
| 参数        | 说明           | 回调参数               |
|------------|----------------|-------------------|
| handleSelect | 滑动结束 | [startTime, endTime] |
{.table-api} 
