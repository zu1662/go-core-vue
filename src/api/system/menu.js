import { service } from '@/utils/request'

const api = {
  MenuTree: '/menu/tree',
  UpdateMenu: '/menu/update',
  AddMenu: '/menu/add',
  DelMenu: '/menu/delete',
  MenuInfo: '/menu/info'
}

// 分页数据
export function GetMenuTree (params) {
  return service({
    url: api.MenuTree,
    method: 'get',
    params
  })
}

// 修改
export function updateMenu (data) {
  return service({
    url: api.UpdateMenu,
    method: 'put',
    data: data
  })
}

// 新增
export function addMenu (data) {
  return service({
    url: api.AddMenu,
    method: 'post',
    data: data
  })
}

// 删除
export function delMenu (id) {
  return service({
    url: api.DelMenu + `/${id}`,
    method: 'delete'
  })
}

// 查询详细
export function getMenuInfo (id) {
  return service({
    url: api.MenuInfo + `/${id}`,
    method: 'get'
  })
}
