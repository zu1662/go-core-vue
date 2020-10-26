<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="系统模块" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入系统模块"
          clearable
          style="width: 240px;"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人员" prop="operName">
        <el-input
          v-model="queryParams.operName"
          placeholder="请输入操作人员"
          clearable
          style="width: 240px;"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="businessType">
        <el-select
          v-model="queryParams.businessType"
          placeholder="操作类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="操作状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleClean"
        >清空</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="日志编号" width="80" align="center" prop="id" min-width="60"/>
      <el-table-column label="系统模块" align="center" prop="operTitle" min-width="120" />
      <el-table-column label="操作类型" width="80" align="center" prop="method" min-width="80" />
      <el-table-column label="操作人员" align="center" prop="operName" min-width="120" />
      <el-table-column label="主机" align="center" prop="ipAddress" min-width="120" show-overflow-tooltip />
      <el-table-column label="操作地点" align="center" prop="ipLocation" min-width="80" />
      <el-table-column label="响应时间" align="center" prop="latencyTime" min-width="120" />
      <el-table-column label="操作结果" align="center" prop="result" min-width="160" show-overflow-tooltip/>
      <el-table-column label="操作日期" align="center" prop="operTime" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.operTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row,scope.index)"
          >详细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 操作日志详细 -->
    <el-dialog title="操作日志详细" :visible.sync="open" width="700px">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作模块：">{{ form.operTitle }}</el-form-item>
            <el-form-item
              label="操作信息："
            >{{ form.operName }} / {{ form.ipAddress }} / {{ form.ipLocation }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址：">{{ form.path }}</el-form-item>
            <el-form-item label="请求方式：">{{ form.method }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="耗时：">{{ form.latencyTime }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数：">{{ form.params }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="返回结果：">{{ form.result }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间：">{{ form.operTime | dateFormat }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOperlogList, delOperlog, cleanOperlog } from '@/api/system/operlog'
export default {
  name: 'Operlog',
  data () {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      typeOptions: [],
      // 类型数据字典
      statusOptions: [],
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        title: undefined,
        operName: undefined,
        businessType: undefined,
        status: undefined
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /** 查询登录日志 */
    getList () {
      this.loading = true
      getOperlogList(this.queryParams).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      }
      )
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.dateRange = []
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.multiple = !selection.length
    },
    /** 详细按钮操作 */
    handleView (row) {
      this.open = true
      this.form = row
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const operIds = row.id || this.ids
      this.$confirm('是否确认删除日志编号为"' + operIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delOperlog(operIds)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function () {})
    },
    /** 清空按钮操作 */
    handleClean () {
      this.$confirm('是否确认清空所有操作日志数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return cleanOperlog()
      }).then(() => {
        this.getList()
        this.msgSuccess('清空成功')
      }).catch(function () {})
    }
  }
}
</script>
