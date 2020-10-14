<script>
import { isExternal } from '@/utils/validate'

// 使用函数式组件设置不同的链接类型
export default {
  name: 'AppLink',
  functional: true,
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render: function (h, context) {
    const { to } = context.props
    if (isExternal(to)) {
      return h('a', {
        attrs: {
          href: to,
          target: '_blank'
        }
      }, context.children)
    } else {
      return h('router-link', {
        attrs: {
          to: to
        }
      }, context.children)
    }
  }
}
</script>
