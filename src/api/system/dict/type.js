import { service } from '@/utils/request'

const api = {
  DictTypeList: '/dict/dicttypelist',
  DictMap: '/dict/dictmap',
  DictTypeInfo: '/dict/dicttype',
  DictTypeUpdate: '/dict/dicttypeupdate',
  DictTypeDelete: '/dict/dicttypedelete',
  DictTypeAdd: '/dict/dicttypeadd'
}

// 分页数据
export function getDictTypeList (params) {
  return service({
    url: api.DictTypeList,
    method: 'get',
    params
  })
}

// 全部数据
export function getDictMap (params) {
  return service({
    url: api.DictMap,
    method: 'get',
    params
  })
}

// 修改
export function updateDictType (data) {
  return service({
    url: api.DictTypeUpdate,
    method: 'put',
    data: data
  })
}

// 新增
export function addDictType (data) {
  return service({
    url: api.DictTypeAdd,
    method: 'post',
    data: data
  })
}

// 删除
export function delDictType (id) {
  return service({
    url: api.DictTypeDelete + `/${id}`,
    method: 'delete'
  })
}

// 查询详细
export function getDictTypeInfo (id) {
  return service({
    url: api.DictTypeInfo + `/${id}`,
    method: 'get'
  })
}
