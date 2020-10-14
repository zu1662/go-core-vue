<script>
import { getStrFullLength, cutStrByFullLength } from '@/utils/domUtil'
export default {
  name: 'Ellipsis',
  functional: true,
  props: {
    // 自定义 class
    prefixCls: {
      type: String,
      default: 'ellipsis'
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      required: true
    },
    lines: {
      type: Number,
      default: 1
    }
  },
  render (h, context) {
    const vnodes = []

    const { tooltip, length, lines, prefixCls } = context.props
    const str = context.children.map(vNode => vNode.text).join('')
    const fullLength = getStrFullLength(str)
    const canSetLine = Math.ceil(fullLength / length)
    const lineNodes = []
    const nowLines = canSetLine > lines ? lines - 1 : canSetLine - 1

    for (let i = 0; i < nowLines; i++) {
      lineNodes.push(<span>{str.substr(i * length, length)}</span>)
      lineNodes.push(<br/>)
    }
    // 存在 tooltip
    if (tooltip) {
      vnodes.push(
        <el-tooltip effect="dark" content={ str } placement="top-start">
          <div class={prefixCls}>
            {lineNodes}
            <span>{ cutStrByFullLength(str.substr(nowLines * length, length), length) + (canSetLine > lines ? '...' : '') }</span>
          </div>
        </el-tooltip>
      )
    } else {
      vnodes.push(
        <div class={prefixCls}>
          {lineNodes}
          <span>{ cutStrByFullLength(str.substr(nowLines * length, length), length) + (canSetLine > lines ? '...' : '') }</span>
        </div>
      )
    }
    return vnodes
  }
}
</script>
