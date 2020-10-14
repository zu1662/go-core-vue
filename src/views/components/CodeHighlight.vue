<template>
  <div class="hightlight-body">
    <div class="intro">
      <h2>使用 <el-link type="primary" href="https://highlightjs.org/" target="_blank">highlightjs</el-link> 设置 code展示效果。</h2>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-input type="textarea" autosize v-model="inputCode"/>
      </el-col>
      <el-col :span="12">
        <div class="code-box">
          <pre v-highlight="inputCode"><code class="javascript"></code></pre>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CodeHighlight',
  data () {
    return {
      inputCode: `
      // 注册一个全局自定义指令 v-focus
      Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
          // 聚焦元素
          el.focus()
        }
      })
      `
    }
  }
}
</script>

<style lang="scss" scoped>
pre {
  font-size: 16px;
}
/deep/ .el-textarea__inner {
  background-color: #272822;
  color: #fff;
}
</style>
