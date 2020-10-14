import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

/**
 * SVG 图标，如果需要通过css的color进行设置，那么svg的path应该只有一个，且不存在fill的情况。
 */
