<script>
    export default {
        data() {
            return {
                shortText: '我吃的是草，挤出来的是牛奶'
            }
        },
        methods: {
            onResize(data) {
                console.log(data)
            },
            onEnter() {
                console.log('onEnter')            
            },
            onLeave() {
                console.log('onLeave')            
            },
            onChange() {
                console.log('onChange')            
            }
        }
    }
</script>

# Observer 观测

IntersectionObserver, MutationObserver and PerformanceObserver in Vue.js

## 何时使用
- IntersectionObserver, MutationObserver and PerformanceObserver in Vue.js

## 代码演示

::: demo
<summary>
  #### ResizeObserver
  提供组件与指令调用
</summary>

```html
<template>
    <div class="demo-observer">
        <div v-resize="onResize">测试区</div>
        <resize @resize="onResize">
            <div>{{ shortText }}</div>
        </resize>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shortText: '我吃的是草，挤出来的是牛奶'
            }
        },
        methods: {
            onResize(data) {
                console.log(data)
            }
        }   
    };
</script>
```
:::

::: demo
<summary>
  #### IntersectionObserver
  组件调用
</summary>

```html
<template>
    <intersection @enter="onEnter" @leave="onLeave" @change="onChange">
        <div>{{ shortText }}</div>
    </intersection>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            onEnter() {
                console.log('onEnter')            
            },
            onLeave() {
                console.log('onLeave')            
            },
            onChange() {
                console.log('onChange')            
            }
        }   
    };
</script>
```
:::

## API

### Affix Props 
| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|-------------------|-------------|
| text | 文字 | String | '' |
{.table-api} 
