### v-download

- v-download 下载文件
- v-download.image 下载图片

#### 下载文件

```js
let url='https://scrm-1304132716.cos.ap-shanghai.myqcloud.com/static/files/imort_ai_phone_demo.csv'
<a-button v-download="{url: url,fileName: 'wxwork'}">下载文件</a-button>
```

> 受同源策略限制，非同源、浏览器可以预览的文件，比如图片、视频、PDF，会直接*预览*而非下载，其中图片需要使用`.image`修饰符来下载，其他暂未支持

```js
let url='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
<strong>非同源图片会导致预览的例子: </strong>
<a-button v-download="{url: url,fileName: 'logo-wxwork.png'}">下载非同源图片</a-button>
```

#### 下载图片

使用canvas实现

- 可跨域

```js
let url='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
<a-button v-download.image="{url: url,fileName: 'logo-wxwork.png'}">下载图片</a-button>
```
