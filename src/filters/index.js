/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-12-27 10:33:01
 * @LastEditTime: 2020-06-02 09:12:18
 * @Description: filters
 */
import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

/**
 * like 2 days ago
 * 如果超出时间跨度，显示 时间格式
 * @param {date|string|number} time
 * @param {number} daySpan
 * @return {string}
 */
function timeAgo (time, daySpan = 5) {
  const getTime = moment(time).unix()
  const nowTime = moment().unix()
  const daySet = daySpan * 24 * 60 * 60
  if (nowTime - getTime > daySet) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return moment(time).startOf('second').fromNow()
  }
}
Vue.filter('timeAgo', timeAgo)

/**
 * dateFormat
 * @param {date|string|number} time
 * @param {string} formatter
 * @return {string}
 */
function dateFormat (time, formatter = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(formatter)
}
Vue.filter('dateFormat', dateFormat)

/**
 * 10000 => "10,000"
 * @param {number} num
 */
function toThousandFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
Vue.filter('toThousandFilter', toThousandFilter)

/**
 * 首字母大写
 * @param {String} string
 */
function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
Vue.filter('uppercaseFirst', uppercaseFirst)
