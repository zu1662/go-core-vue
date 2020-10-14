<!--
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-06-02 10:16:20
 * @LastEditTime: 2020-06-24 11:12:42
 * @Description: 水印效果 
 -->

# 水印效果

在对应DOM下设置水印效果

引用方式：

```javascript
import WaterMark from '@/components/WaterMark/index.vue'

export default {
    components: {
        WaterMark
    }
}
```

## 代码演示

```html
// 直接设置 waterMark 字段
<water-mark
  spacing="1rem"
  content="huazite"
>
  需要设置水印效果的DOM元素
</water-mark>

// 通过作用域插槽进行设置
<water-mark
  spacing="10px"
  opacity="0.5"
>
  需要设置水印效果的DOM元素
  <div slot="watermark" slot-scope="scope">
    <span v-if="scope.coord.row % 2 "> 奇数行</span>
    <span v-else>偶数行</span>
  </div>
</water-mark>
```

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
content | 水印文字 | string | -
spacing | 水印间隔 | string | 20px
repeatX | X轴重复显示 | boolean | true
repeatY | Y轴重复显示 | boolean | true
rotate | 旋转角度 | string | -30
opacity | 透明度 | string | 0.3
