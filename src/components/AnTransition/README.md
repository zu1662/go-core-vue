<!--
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-06-02 10:16:20
 * @LastEditTime: 2020-06-24 11:12:39
 * @Description: 动画过渡效果 
 -->

# animate 动画过渡效果

基于 animate.css 的动画过渡效果

引用方式：

```javascript
import AnTransition from '@/components/AnTransition/index.vue'

export default {
    components: {
        AnTransition
    }
}
```

## 代码演示

```html
<an-transition
  ref="anTransition"
  enterActiveClass="bounceInDown"
  leaveActiveClass="bounceOut"
>
  需要设置动画效果的DOM元素
</an-transition>
```

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
enterActiveClass | 进入动画名称（animate.css） | string | fadeIn
leaveActiveClass | 离开动画名称（animate.css） | string | fadeOut
