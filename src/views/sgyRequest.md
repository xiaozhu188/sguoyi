<script>
    import { sguoyi } from '../../packages/index';
    let request = sguoyi.create({
        baseURL: 'https://cnodejs.org/api/v1'
    });
    export default {
        data() {
            return {
                topics: [],
                topic: ''
            }
        },
        mounted() {
            this.fetch1();
        },
        methods: {
            fetch1() {
                request({
                    url: '/topics',
                    params: {
                        page: 1,
                        limit: 3
                    }
                }).then(res => {
                     this.topics = res.data
                });
                request.get('/topics', {
                    params: {
                        page: 1,
                        limit: 5
                    }
                }).then(res => {
                     console.log(res)
                })
            },
            fetch2() {
                this.$sgy.post('/v2/music/reviews', {
                    music: 5567544,
                    title: '5567544',
                    content: '5567544'
                }).then(res=> {
                    console.log(res);
                    if(res.code !== 200) {
                        this.$message.error(res.msg);
                        return 
                    }
                })
            },
        }
    };
</script>
# SgyRequest 网络请求

## 何时使用
- api请求

## 代码演示

::: demo
<summary>
  #### 发送get请求
      this.$sgy.get(config)
      this.$sgy({
        method: 'GET'
      })
      this.$sgy.request({
        method: 'GET'
      })
</summary>

```html
<template>
    <div>
        <div v-for="topic in topics" :key="topic.id">
            {{ topic.title }}
        </div>
    </div>
</template>

<script>
    import { sguoyi } from '@/packages';
    let request = sguoyi.create({
        baseURL: 'https://cnodejs.org/api/v1'
    });
    export default {
        data() {
            return {
                topic: '',
                topics: []
            }
        },
        mounted() {
            this.fetch1()
        },
        methods: {
            fetch1() {
                request({
                    url: '/topics',
                    params: {
                        page: 1,
                        limit: 3
                    }
                }).then(res => {
                     this.topics = res.data
                })
                request.get({
                    url: '/topics',
                    params: {
                        page: 1,
                        limit: 5
                    }
                }).then(res => {
                     console.log(res)
                })
            }
        }
    };
</script>
```
:::

::: demo
<summary>
  #### 发送post请求
    this.$sgy.post(url, data, config)
    this.$sgy({
      url: '',
      method: 'POST',
      data: {}
    })
    this.$sgy.request({
      url: '',
      method: 'POST',
      data: {}
    })
</summary>

```html
<template>
    <a-button @click="fetch2">发送请求</a-button>
</template>

<script>
    export default {
        methods: {
            fetch2() {
                this.$sgy.post('/v2/music/reviews', {
                    music: 5567544,
                    title: '5567544',
                    content: '5567544'
                }).then(res=> {
                    if(res.code !== 200) {
                        this.$message.error(res.msg);
                        return 
                    }
                })
            },
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
