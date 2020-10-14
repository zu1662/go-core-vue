import i18n from '@/locales'
import { settings } from '@/config/defaultSetting'

// set document title
export const setDocumentTitle = function (routeMeta, mainTitle) {
  // 判断 是否存在此 key 的值
  const hasKey = i18n.te('route.' + routeMeta.titlePath)
  if (hasKey) {
    const translatedTitle = i18n.t('route.' + routeMeta.titlePath)
    return translatedTitle + ' - ' + mainTitle
  }
  if (routeMeta.title) {
    return routeMeta.title + ' - ' + mainTitle
  }
  return mainTitle
}

// get i18n route title
export function getMetaTitle (meta) {
  // 判断 是否存在此 key 的值
  const hasKey = i18n.te('route.' + meta.titlePath)
  if (hasKey) {
    const translatedTitle = i18n.t('route.' + meta.titlePath)
    return translatedTitle
  }
  if (meta.title) {
    return meta.title
  }
}

// dom hasClass
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

// dom addClass
export function addClass (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

// dom removeClass
export function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = (curClass || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
  }
}

// Theme change
export function changeTheme (themeName) {
  // 检查当前主题在主题列表内是否存在
  const list = settings.themeList || []
  if (!list.find(item => item.name === themeName)) {
    themeName = 'default'
  }
  document.body.className = `theme-${themeName}`
}

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}
