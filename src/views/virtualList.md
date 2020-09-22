# VirtualList 虚拟列表

虚拟滚动列表，提高性能

## 何时使用
- 页面需要展示大数据时

## 代码演示

::: demo
<summary>
  #### 基本
  当需要展示百万数据时
</summary>

```html
<template>
    <div class="list-wrapper">
        <virtual-list 
            :listData="data" 
            :estimatedItemSize="100" 
            v-slot="slotProps"
        >
            <virtual-list-item :item="slotProps.item" />
        </virtual-list>
    </div>
</template>

<script>
    import faker from "faker";
    let data = [];
    for (let id = 0; id < 1000; id++) {
        data.push({
            id,
            value: faker.lorem.sentences() // 长文本
        });
    }
    export default {
        data() {
            return {
                data
            }
        }
    };
</script>

<style lang="less">
.list-wrapper {
    width: 270px;
    height: 500px;
    border: 1px solid rgba(125,125,125,.5);
    ::-webkit-scrollbar {
      width: 6px;
      height: 1px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: transparent;
    }
}
</style>
```
:::

::: demo
<summary>
  #### 自定义列表项
  你可以自定义列表的每一项
</summary>

```html
<template>
    <div class="list-wrapper">
        <virtual-list 
            :listData="data" 
            :estimatedItemSize="100" 
            v-slot="slotProps"
        >
            <div class="custom-item">
                <div class="img">{{ slotProps.item.id }}</div>
                <div class="info">{{ slotProps.item.value }}</div>
            </div>
        </virtual-list>
    </div>
</template>

<script>
    import faker from "faker";
    let data = [];
    for (let id = 0; id < 1000; id++) {
        data.push({
            id,
            value: faker.lorem.sentences() // 长文本
        });
    }
    export default {
        data() {
            return {
                data
            }
        }
    };
</script>

<style lang="less">
.custom-item {
    display: flex;
    padding: 5px;
    .img {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 40px;
        height: 40px;
        border-radius: 5px;
        background: rgba(125,125,125,.5);
        text-align: center;
        font-size: 15px;
        font-weight: 500;
    }
    .info {
        flex: 1;
        padding-left: 10px;
        word-break: break-all;
    }
}
</style>
```
:::

## API

### VirtualList Props 
| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|-------------------|-------------|
| listData    | 数据列表 | Array | [] |
| estimatedItemSize  | 预估高度 | Number | - |
| bufferScale  | 缓冲区比例 | Number | 1 |
| height  | 容器高度  | String | '100%' |
{.table-api} 
