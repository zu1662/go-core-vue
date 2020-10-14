<template>
  <el-color-picker
    v-model="color"
    @change="handleChange"
    :predefine="['#1890FF', '#67C23A','#E6A23C','#11A983', '#13C2C2', '#6959CD', '#F5222D', ]"
    class="color-picker"
    popper-class="color-picker-dropdown"
  />
</template>

<script>
export default {
  data () {
    return {
      color: ''
    }
  },
  computed: {
    defaultColor () {
      return this.$store.state.settings.color
    }
  },
  created () {
    this.color = this.defaultColor
  },
  mounted () {
    // this.themeChalk = new ThemeChalk(this.defaultColor)
    // this.themeChalk.setTheme(this.defaultColor)
  },
  methods: {
    handleChange (val) {
      this.$themeChalk.setTheme(val, this.defaultColor).then(res => {
        this.$emit('change', val)
      })
    }
  }
}
</script>

<style>
.theme-message,
.color-picker-dropdown {
  z-index: 99999 !important;
}

.color-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.color-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
