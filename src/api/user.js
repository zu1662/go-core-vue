import { service } from '@/utils/request'

const api = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgetPsw: '/auth/forget-password',
  Register: '/auth/register',
  SendSms: '/account/sms',
  // get my info
  UserInfo: '/user/info'
}

export function login (data) {
  return service({
    url: api.Login,
    method: 'post',
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
