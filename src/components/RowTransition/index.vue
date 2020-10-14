<script>
import { addClass, removeClass } from '@/utils/domUtil'

const Transition = {
  beforeEnter: function (el) {
    addClass(el, 'row-transition')
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingRight = el.style.paddingRight
    el.dataset.oldPaddingLeft = el.style.paddingLeft

    el.style.width = '0'
    el.style.paddingRight = 0
    el.style.paddingLeft = 0
  },

  enter: function (el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollWidth !== 0) {
      el.style.width = el.scrollWidth + 'px'
      el.style.paddingRight = el.dataset.oldPaddingRight
      el.style.paddingLeft = el.dataset.oldPaddingLeft
    } else {
      el.style.width = ''
      el.style.paddingRight = el.dataset.oldPaddingRight
      el.style.paddingLeft = el.dataset.oldPaddingLeft
    }

    el.style.overflow = 'hidden'
  },

  afterEnter: function (el) {
    // for safari: remove class then reset width is necessary
    removeClass(el, 'row-transition')
    el.style.width = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  beforeLeave: function (el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingRight = el.style.paddingRight
    el.dataset.oldPaddingLeft = el.style.paddingLeft
    el.dataset.oldOverflow = el.style.overflow

    el.style.width = el.scrollWidth + 'px'
    el.style.overflow = 'hidden'
  },
  leave: function (el) {
    if (el.scrollWidth !== 0) {
      // for safari: add class after set width, or it will jump to zero width suddenly, weired
      addClass(el, 'row-transition')
      el.style.width = 0
      el.style.paddingRight = 0
      el.style.paddingLeft = 0
    }
  },

  afterLeave: function (el) {
    removeClass(el, 'row-transition')
    el.style.width = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingRight = el.dataset.oldPaddingRight
    el.style.paddingLeft = el.dataset.oldPaddingLeft
  }
}

// 使用函数式组件
export default {
  name: 'RowTransition',
  functional: true,
  render (h, { children }) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}
</script>
<style lang="scss">
  .row-transition {
    transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
  }
</style>
