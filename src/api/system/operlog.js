import { service } from '@/utils/request'

const api = {
  operlogList: '/log/operloglist',
  operlogInfo: '/log/operloginfo',
  delOperlog: '/log/deleteoperlog',
  cleanOperlog: '/log/cleanoperlog'
}

// 分页数据
export function getOperlogList (params) {
  return service({
    url: api.operlogList,
    method: 'get',
    params
  })
}

// 查询详细
export function getOperlogInfo (id) {
  return service({
    url: api.operlogInfo + `/${id}`,
    method: 'get'
  })
}

// 删除
export function delOperlog (id) {
  return service({
    url: api.delOperlog + `/${id}`,
    method: 'delete'
  })
}

// 清空
export function cleanOperlog () {
  return service({
    url: api.cleanOperlog,
    method: 'delete'
  })
}
