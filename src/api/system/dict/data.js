import { service } from '@/utils/request'

const api = {
  DictValList: '/dict/dictdatalist',
  DictMap: '/dict/dictmap',
  DictValInfo: '/dict/dictdata',
  DictValUpdate: '/dict/dictdataupdate',
  DictValDelete: '/dict/dictdatadelete',
  DictValAdd: '/dict/dictdataadd'
}

// 分页数据
export function getDictValList (params) {
  return service({
    url: api.DictValList,
    method: 'get',
    params
  })
}

// 修改
export function updateDictVal (data) {
  return service({
    url: api.DictValUpdate,
    method: 'put',
    data: data
  })
}

// 新增
export function addDictVal (data) {
  return service({
    url: api.DictValAdd,
    method: 'post',
    data: data
  })
}

// 删除
export function delDictVal (id) {
  return service({
    url: api.DictValDelete + `/${id}`,
    method: 'delete'
  })
}

// 查询详细
export function getDictValInfo (id) {
  return service({
    url: api.DictValInfo + `/${id}`,
    method: 'get'
  })
}
