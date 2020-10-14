<template>
  <div :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" v-if="sidebarType">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="transparent"
        :text-color="variables.sideText"
        :unique-opened="false"
        :active-text-color="color"
        :collapse-transition="false"
        :mode="sidebarType ? 'vertical' : 'horizontal'"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <transition name="el-fade-in">
        <div class="copyright" v-if="!isCollapse">
          <span>© Copyright {{nowYear}} Core Admin</span>
          <!-- <transition name="el-fade-in">
            <img src="@/assets/sidebar_bg.png" alt="" v-if="showImg">
          </transition> -->
        </div>
      </transition>
    </el-scrollbar>
    <el-menu
      v-else
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="transparent"
      :text-color="variables.sideText"
      :unique-opened="false"
      :active-text-color="color"
      :collapse-transition="false"
      :mode="sidebarType ? 'vertical' : 'horizontal'"
    >
      <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/var.scss'

export default {
  components: { SidebarItem, Logo },
  props: {
    sidebarType: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'addRouters',
      'sidebar'
    ]),
    ...mapState({
      showLogo: state => state.settings.sidebarLogo,
      color: state => state.settings.color
    }),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    nowYear () {
      return new Date().getFullYear()
    }
  },
  created () {
    this.permission_routes = this.addRouters.find(item => item.path === '/').children
  }
}
</script>
