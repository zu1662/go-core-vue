<template>
  <div class="navbar" :class="{'navbar-topmenu': !sidebarType}">
    <div class="left-menu">
      <template v-if="sidebarType">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <breadcrumb id="breadcrumb-container" v-if="device!=='mobile'" class="breadcrumb-container" />
      </template>
      <sidebar v-else class="sidebar-topmenu" :sidebarType="sidebarType"/>
    </div>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip class="item" effect="dark" content="错误日志" placement="bottom">
          <error-log class="errLog-container right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
          <set-locker class="right-menu-item hover-effect"/>
        </el-tooltip>
      </template>
      <lang-set class="right-menu-item hover-effect"/>
      <user-menu></user-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SetLocker from '@/components/Locker/SetLocker.vue'
import UserMenu from '@/components/UserMenu/index'
import LangSet from '@/components/LangSet'
import Sidebar from './Sidebar'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SetLocker,
    UserMenu,
    LangSet,
    Sidebar
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  props: {
    sidebarType: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
