import { service } from '@/utils/request'

const api = {
  Login: '/base/login',
  Captcha: '/base/captcha',
  Logout: '/base/logout',
  MenuList: '/menu/tree',
  ForgetPsw: '/auth/forget-password',
  Register: '/auth/register',
  SendSms: '/account/sms',
  // get my info
  UserInfo: '/base/userinfo'
}

export function login (data) {
  return service({
    url: api.Login,
    method: 'post',
    data
  })
}

export function getCaptcha (data) {
  return service({
    url: api.Captcha,
    method: 'get',
    data
  })
}

export function getMenuList (data) {
  return service({
    url: api.MenuList,
    method: 'get',
    data
  })
}

export function getSmsCaptcha (data) {
  return service({
    url: api.SendSms,
    method: 'post',
    data
  })
}

export function getInfo () {
  return service({
    url: api.UserInfo,
    method: 'get'
  })
}

export function logout () {
  return service({
    url: api.Logout,
    method: 'post'
  })
}
