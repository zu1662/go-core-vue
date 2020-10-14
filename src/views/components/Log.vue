<template>
  <div class="log-body">
    <h1>打开控制台，查看效果</h1>
    <div class="item">
      <h2>$log.capsule</h2>
      <el-button size="small" type="primary" @click="$log.capsule('title', 'primary')">
        $log.capsule('title', 'primary')
      </el-button>
      <el-button size="small" type="success" @click="$log.capsule('title', 'success', 'success')">
        $log.capsule('title', 'success', 'success')
      </el-button>
      <el-button size="small" type="warning" @click="$log.capsule('title', 'warning', 'warning')">
        $log.capsule('title', 'warning', 'warning')
      </el-button>
      <el-button size="small" type="danger" @click="$log.capsule('title', 'danger', 'danger')">
        $log.capsule('title', 'danger', 'danger')
      </el-button>
    </div>
    <div class="item">
      <h2>$log.colorful</h2>
      <el-button size="small" @click="handleColorful">
        colorful
      </el-button>
    </div>
    <div class="item">
      <h2>$log.$default | primary | success | warning | danger</h2>
      <el-button size="small" @click="$log._default('default style')">
        $log._default('default style')
      </el-button>
      <el-button size="small" type="primary" @click="$log._primary('primary style')">
        $log._primary('primary style')
      </el-button>
      <el-button size="small" type="success" @click="$log._success('success style')">
        $log._success('success style')
      </el-button>
      <el-button size="small" type="warning" @click="$log._warning('warning style')">
        $log._warning('warning style')
      </el-button>
      <el-button size="small" type="danger" @click="$log._danger('danger style')">
        $log._danger('danger style')
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LogDemo',
  methods: {
    handleColorful () {
      this.$log.colorful([
        { text: 'H', type: 'default' },
        { text: 'e', type: 'primary' },
        { text: 'l', type: 'success' },
        { text: 'l', type: 'warning' },
        { text: 'o', type: 'danger' }
      ])
    }
  }
}
</script>
<style lang="scss" scoped>
  .log-body {
    .item {
      padding: 2rem 1rem;
      h2 {
        margin-bottom: 1rem;
      }
      /deep/ .el-button {
          margin-bottom: 1rem;
          margin-left: 0;
          margin-right: 1rem;
        }
    }
  }
</style>
