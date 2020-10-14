<template>
  <div v-if="errorLogs.length>0">
    <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible=true">
      <el-button style="padding: 8px 10px;" size="small" type="danger">
        <svg-icon name="bug" />
      </el-button>
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" width="80%" append-to-body fullscreen>
      <div slot="title">
        <span style="padding-right: 10px;font-size:2rem">Error Log</span>
      </div>
      <div class="action-box">
        <el-button size="mini" type="info" icon="el-icon-upload" @click="uploadToServer">上传至服务器</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="clearAll">清除错误日志</el-button>
      </div>
      <el-table :data="errorLogs" size="mini" stripe border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div style="line-height: 3rem;" v-html="scope.row.err.stack">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Msg">
          <template slot-scope="{row}">
            {{ row.err.message }}
          </template>
        </el-table-column>
        <el-table-column label="Info">
          <template slot-scope="{row}">
            {{ row.vm.$vnode.tag }} error in {{ row.info }}
          </template>
        </el-table-column>
        <el-table-column label="Url">
          <template slot-scope="{row}">
            {{ row.url }}
          </template>
        </el-table-column>
        <el-table-column label="Time">
          <template slot-scope="{row}">
            {{ row.time | dateFormat }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ErrorLog',
  data () {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    errorLogs () {
      return this.$store.getters.errorLogs
    }
  },
  methods: {
    clearAll () {
      this.dialogTableVisible = false
      this.$store.dispatch('clearErrorLog')
    },
    uploadToServer () {

    }
  }
}
</script>

<style scoped>
.message-title {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
.action-box {
  margin-bottom: 2rem;
}
</style>
