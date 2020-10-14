const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  permissions: state => state.user.permissions,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  lang: state => state.i18n.lang,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  errorLogs: state => state.errorLog.logs
}

export default getters
