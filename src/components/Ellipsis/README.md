<!--
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-06-02 10:16:20
 * @LastEditTime: 2020-06-24 11:11:08
 * @Description:  文本自动省略号
 -->
# Ellipsis 文本自动省略号

文本过长自动处理省略号, 支持按照文本长度和最大行数两种方式截取。

引用方式：

```javascript
import Ellipsis from '@/components/Ellipsis'

export default {
    components: {
        Ellipsis
    }
}
```

## 代码演示

```html
<ellipsis :length="100" :lines="3" tooltip>
  There were injuries alleged in three cases in 2015, and a
  fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.
</ellipsis>
```

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
prefixCls | class 前缀 | string | ellipsis
tooltip | 移动到文本展示完整内容的提示 | boolean | false
length | 在按照长度截取下的文本最大字符数，超过则截取省略 | number | -
lines | 在按照最大行数进行截取，超过则截取省略 | number | 1