<template>
  <div class="notice">
    <el-dropdown trigger="click" class="notice-dropdown">
      <el-badge :value="10" :max="99" class="notice-badge">
        <i class="el-icon-bell"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown" class="notice-dropdown-menu">
        <el-tabs v-model="activeName">
          <el-tab-pane label="通知" name="first">通知</el-tab-pane>
          <el-tab-pane label="消息" name="second">消息</el-tab-pane>
          <el-tab-pane label="代办" name="third">代办</el-tab-pane>
        </el-tabs>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'Notice',
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>
<style lang="scss" scoped>
  $notice-height: 2rem;
  $notice-width: 2rem;

  .notice-dropdown-menu {
    padding: 1rem 2rem;
  }
  .notice {
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $notice-width;
    height: $notice-height;

    .notice-dropdown {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: inherit;
    }
    .notice-badge {
      cursor: pointer;

      .el-icon-bell {
        display: block;
        font-size: $notice-width;
        width: $notice-width;
        height: $notice-width;
      }
      /deep/ .el-badge__content {
        top: 0;
      }
    }
  }
</style>
