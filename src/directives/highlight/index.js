// highlight.js  代码高亮指令
import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai.css'

// use any language
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)

const Highlight = {}
Highlight.install = function (Vue, options) {
  // 自定义指令 v-highlight
  Vue.directive('highlight', {
    // 被绑定元素插入父节点时调用
    inserted: function (el, binding) {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach((block) => {
        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        if (binding.value) {
          block.textContent = binding.value
        }
        hljs.highlightBlock(block)
      })
    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: function (el, binding) {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach((block) => {
        if (binding.value) {
          block.textContent = binding.value
          hljs.highlightBlock(block)
        }
      })
    }
  })
}

Vue.use(Highlight)
