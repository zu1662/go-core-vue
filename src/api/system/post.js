import { service } from '@/utils/request'

const api = {
  PostList: '/post/list',
  PostAll: '/post/listall',
  UpdatePost: '/post/update',
  AddPost: '/post/add',
  DelPost: '/post/delete',
  PostInfo: '/post/info'
}

// 分页数据
export function GetPostList (params) {
  return service({
    url: api.PostList,
    method: 'get',
    params
  })
}

// 全部数据
export function GetPostAll (params) {
  return service({
    url: api.PostAll,
    method: 'get',
    params
  })
}

// 修改
export function updatePost (data) {
  return service({
    url: api.UpdatePost,
    method: 'put',
    data: data
  })
}

// 新增
export function addPost (data) {
  return service({
    url: api.AddPost,
    method: 'post',
    data: data
  })
}

// 删除
export function delPost (id) {
  return service({
    url: api.DelPost + `/${id}`,
    method: 'delete'
  })
}

// 查询详细
export function getPostInfo (id) {
  return service({
    url: api.PostInfo + `/${id}`,
    method: 'get'
  })
}
