<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Page style setting</h3>
      <div class="drawer-item layout-type">
        <el-tooltip content="侧边栏导航" placement="top">
          <div class="layout" :class="{'active': layoutType === 'sidebar'}" @click="handleSetLayout('sidebar')">
            <div class="layout-demo sidebar">
              <div></div>
              <div></div>
            </div>
            <i class="el-icon-check"></i>
          </div>
        </el-tooltip>
        <el-tooltip content="顶部栏导航" placement="top">
          <div class="layout" :class="{'active': layoutType === 'topmenu'}" @click="handleSetLayout('topmenu')">
            <div class="layout-demo topmenu">
              <div></div>
              <div></div>
            </div>
            <i class="el-icon-check"></i>
          </div>
        </el-tooltip>
      </div>
      <div class="drawer-item">
        <span>Global Color</span>
        <color-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="colorChange" />
      </div>

      <div class="drawer-item">
        <span>Global Theme</span>
        <i class="el-icon-s-open theme-icon" @click="showThemeDialog"></i>
      </div>

      <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

    </div>
    <theme-picker ref="themePicker"/>
  </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: { ColorPicker, ThemePicker },
  data () {
    return {}
  },
  computed: {
    layoutType () {
      return this.$store.state.settings.layoutType
    },
    fixedHeader: {
      get () {
        return this.$store.state.settings.fixedHeader
      },
      set (val) {
        this.$store.dispatch('changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get () {
        return this.$store.state.settings.tagsView
      },
      set (val) {
        this.$store.dispatch('changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get () {
        return this.$store.state.settings.sidebarLogo
      },
      set (val) {
        this.$store.dispatch('changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    }
  },
  methods: {
    handleSetLayout (layout) {
      if (layout === 'topmenu') {
        this.$store.dispatch('openSideBar', false)
      }
      this.$store.dispatch('changeSetting', {
        key: 'layoutType',
        value: layout
      })
    },
    colorChange (val) {
      this.$store.dispatch('changeSetting', {
        key: 'color',
        value: val
      })
    },
    showThemeDialog () {
      this.$refs.themePicker.setDialog(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-icon {
  padding: 3px;
  border: 1px solid #eee;
  float: right;
  font-size: 25px;
  margin-right: 5px;
  color: $primary-color;
  cursor: pointer;
  transition: all ease-in .2s;
  &:hover {
    background-color: #eee;
  }
}
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }

  .drawer-item.layout-type {
    display: flex;
    .layout {
      position: relative;
      width: 5rem;
      height: 4rem;
      margin-right: 3rem;
      cursor: pointer;
      .el-icon-check {
        display: none;
        position: absolute;
        top: 10%;
        left: 40%;
        color: $primary-color;
        font-size: 2rem;
        text-align: center;
        line-height: 4rem;
      }
      &.active .el-icon-check {
        display: block;
      }
      .layout-demo {
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        box-shadow: $shadow-card;
        overflow: hidden;
        &.sidebar {
          > div:first-child {
            width: 1rem;
            height: 100%;
            background-color: #343434;
          }
          > div:last-child {
            flex: 1;
            height: 100%;
            background-color: #fff;
          }
        }
        &.topmenu {
          flex-direction: column;
          > div:first-child {
            background-color: #343434;
            height: 1rem;
            width: 100%;
          }
          > div:last-child {
            flex: 1;
            width: 100%;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
