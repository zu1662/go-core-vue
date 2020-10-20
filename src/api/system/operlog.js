import { service } from '@/utils/request'

const api = {
  loginlogList: '/log/loginloglist',
  loginlogInfo: '/log/loginloginfo',
  delLoginlog: '/log/deleteloginlog',
  cleanLoginlog: '/log/cleanloginlog'
}

// 分页数据
export function getLoginlogList (params) {
  return service({
    url: api.loginlogList,
    method: 'get',
    params
  })
}

// 查询详细
export function getLoginlogInfo (id) {
  return service({
    url: api.loginlogInfo + `/${id}`,
    method: 'get'
  })
}

// 删除
export function delLoginlog (id) {
  return service({
    url: api.delLoginlog + `/${id}`,
    method: 'delete'
  })
}

// 清空
export function cleanLoginlog () {
  return service({
    url: api.cleanLoginlog,
    method: 'delete'
  })
}
