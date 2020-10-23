<template>
  <div class="app-container">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="mini"
      @click="handleAdd"
    >新增</el-button>
    <el-table
      v-loading="loading"
      :data="menuList"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="接口名称" :show-overflow-tooltip="true" width="180px" />
      <el-table-column prop="path" label="接口路径" :show-overflow-tooltip="true" width="180px" />
      <el-table-column prop="method" label="请求方式" :show-overflow-tooltip="true" width="180px" />
      <el-table-column prop="sort" label="排序" min-width="60px" />
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '0' ? 'danger' : 'success'"
            disable-transitions
          >{{ getDictVal('STATUS',scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级接口">
              <treeselect
                v-model="form.pid"
                :options="interfaceOptions"
                :props="defaultProps"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级接口"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接口名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入接口名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接口路径" prop="path">
              <el-input v-model="form.path" placeholder="请输入接口路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="sort">
              <el-input-number v-model="form.sort" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接口类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio label="0">主路径</el-radio>
                <el-radio label="1">具体接口</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.type != '0'">
            <el-form-item label="请求方式" prop="method">
              <el-radio-group v-model="form.method">
                <el-radio label="GET">GET</el-radio>
                <el-radio label="POST">POST</el-radio>
                <el-radio label="PUT">PUT</el-radio>
                <el-radio label="DELETE">DELETE</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接口状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetAPITree, getAPIInfo, delAPI, addAPI, updateAPI } from '@/api/system/interface'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Menu',
  components: { Treeselect },
  data () {
    return {
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      interfaceOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 菜单状态数据字典
      statusOptions: this.getDictList('STATUS'),
      // 查询参数
      queryParams: {
        title: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '接口名称不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '接口路径不能为空', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请求方式不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '接口排序不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /** 查询菜单列表 */
    getList () {
      this.loading = true
      GetAPITree(this.queryParams).then(response => {
        this.menuList = response.data
        this.loading = false
      })
    },
    /** 转换菜单数据结构 */
    normalizer (node) {
      // 去掉children=null的属性
      if (!node.children || node.children === 'null') {
        delete node.children
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    },
    /** 查询菜单下拉树结构 */
    getTreeselect () {
      GetAPITree().then(response => {
        this.interfaceOptions = []
        const nowInterface = { id: 0, name: '主类目', children: [] }
        nowInterface.children = response.data
        this.interfaceOptions.push(nowInterface)
      })
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        id: undefined,
        pid: 0,
        name: undefined,
        type: '0',
        sort: 0,
        status: '1'
      }
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.getList()
    },
    /** 新增按钮操作 */
    handleAdd (row) {
      this.reset()
      this.getTreeselect()
      if (row != null) {
        this.form.pid = row.id
      }
      this.open = true
      this.title = '添加菜单'
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      this.getTreeselect()
      getAPIInfo(row.id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改菜单'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateAPI(this.form).then(response => {
              if (response.code) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addAPI(this.form).then(response => {
              if (response.code) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      this.$confirm('是否确认删除名称为"' + row.title + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delAPI(row.id)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function () {})
    }
  }
}
</script>
