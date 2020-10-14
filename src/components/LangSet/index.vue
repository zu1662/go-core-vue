<template>
  <div class="lang-set">
    <el-dropdown trigger="click" @command="handleLangCommand">
      <span class="el-dropdown-link">
        <svg-icon style="cursor: pointer;" name="language" class="lang-svg"></svg-icon>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'LangSet',
  methods: {
    handleLangCommand (command) {
      this.$store.dispatch('SetLang', command)
      this.$emit('setLang', command)
    }
  }
}
</script>
<style lang="scss" scoped>
.lang-set {
  .el-dropdown {
    color: inherit;
    }
}
.lang-svg {
  display: inline-block;
  cursor: pointer;
  color: inherit;
  font-size: 15px;
}
</style>
