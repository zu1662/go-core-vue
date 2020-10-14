<template>
  <el-dialog
    title="主题"
    width="600px"
    :visible.sync="dialogVisible"
    :append-to-body="true"
  >
    <el-table :data="themeList" border>
      <el-table-column label="主题名称" prop="title" align="center" width="160"/>
      <el-table-column label="预览" width="120">
        <template slot-scope="scope">
          <div class="theme-preview" :style="{ backgroundImage: `url(${scope.row.preview})` }"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="defaultTheme === scope.row.name" type="success" icon="el-icon-check" round>已激活</el-button>
          <el-button v-else round @click="handleSelectTheme(scope.row.name)">使用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { settings } from '@/config/defaultSetting'
export default {
  computed: {
    defaultTheme () {
      return this.$store.state.settings.theme
    }
  },
  data () {
    return {
      themeList: settings.themeList,
      dialogVisible: false
    }
  },
  methods: {
    setDialog (val) {
      this.dialogVisible = val
    },
    handleSelectTheme (themeName) {
      this.$store.dispatch('changeSetting', {
        key: 'theme',
        value: themeName
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
}
</style>
