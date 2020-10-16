/**
  节流
  原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
  适用场景
    按钮提交场景：防止多次提交按钮，只执行最后提交的一次
    搜索框联想场景：防止联想发送请求，只发送最后一次输入
 */
export function debounce (func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 *
  防抖
  原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
  适用场景
    拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
    缩放场景：监控浏览器resize
 */
export function throttle (func, wait) {
  let context, args
  let previous = 0

  return function () {
    const now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}
