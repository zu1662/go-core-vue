<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="deptList"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="deptName" label="部门名称" min-width="200" />
      <el-table-column prop="sort" label="排序" min-width="80" />
      <el-table-column prop="leaderName" label="负责人" min-width="100" />
      <el-table-column prop="leaderMobile" label="负责人电话" min-width="150" />
      <el-table-column prop="leaderEmail" label="负责人邮箱" min-width="150" />
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '0' ? 'danger' : 'success'"
            disable-transitions
          >{{ getDictVal('STATUS',scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="200">
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
            v-if="scope.row.p_id != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级部门" prop="pid">
              <treeselect
                v-model="form.pid"
                :options="deptOptions"
                :props="defaultProps"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级部门"
                :is-disabled="isEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="sort">
              <el-input-number v-model="form.sort" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="查询负责人" label-width="90px">
               <el-select
                v-model="leaderSearchVal"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                @change="handleLeaderChange"
                :remote-method="searchUserList"
                :loading="searchLoading">
                <el-option
                  v-for="item in leaderSearchList"
                  :key="item.id"
                  :label="item.userName + `(${item.userCode})`"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leaderName">
              <el-input disabled v-model="form.leaderName" placeholder="请输入负责人" maxlength="20" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="leaderMobile">
              <el-input disabled v-model="form.leaderMobile" placeholder="请输入联系电话" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="leaderEmail">
              <el-input disabled v-model="form.leaderEmail" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
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
import { GetUserListAll } from '@/api/system/user'
import { GetDeptTree, getDeptInfo, delDept, addDept, updateDept } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Dept',
  components: { Treeselect },
  data () {
    return {
      // 联系人查询loading
      searchLoading: false,
      leaderSearchList: [],
      leaderSearchVal: '',
      // 遮罩层
      loading: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: '',
      isEdit: false,
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: this.getDictList('STATUS'),
      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined
      },
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pid: [
          { required: true, message: '上级部门不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '菜单顺序不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 选中负责人
    handleLeaderChange (val) {
      this.form.leaderId = val.id
      this.form.leaderName = val.userName
      this.form.leaderMobile = val.mobile
      this.form.leaderEmail = val.email

      this.leaderSearchVal = ''
    },
    // 远程查询负责人
    searchUserList (val) {
      if (val !== '') {
        this.searchLoading = true
        GetUserListAll({ userCode: val }).then(res => {
          this.leaderSearchList = res.data
          this.searchLoading = false
        })
      }
    },
    /** 查询部门列表 */
    getList () {
      this.loading = true
      GetDeptTree(this.queryParams).then(response => {
        this.deptList = response.data
        this.loading = false
      })
    },
    /** 转换部门数据结构 */
    normalizer (node) {
      // 去掉children=null的属性
      if (!node.children || node.children === 'null') {
        delete node.children
      }
      return {
        id: node.id,
        label: node.deptName,
        children: node.children
      }
    },
    /** 查询部门下拉树结构 */
    getTreeselect (e) {
      GetDeptTree().then(response => {
        this.deptOptions = []

        if (e === 'update') {
          const dept = { id: 0, deptName: '主类目', children: [], isDisabled: true }
          dept.children = response.data
          this.deptOptions.push(dept)
        } else {
          const dept = { id: 0, deptName: '主类目', children: [] }
          dept.children = response.data
          this.deptOptions.push(dept)
        }
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
        pid: undefined,
        deptName: undefined,
        sorc: undefined,
        leaderId: undefined,
        status: '0'
      }
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.getList()
    },
    /** 新增按钮操作 */
    handleAdd (row) {
      this.reset()
      this.getTreeselect('add')
      if (row !== undefined) {
        this.form.pid = row.id
      }
      this.form.status = '0'
      this.open = true
      this.title = '添加部门'
      this.isEdit = false
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      this.getTreeselect('update')

      getDeptInfo(row.id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改部门'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateDept(this.form).then(response => {
              if (Number(response.code)) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addDept(this.form).then(response => {
              if (Number(response.code)) {
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
      this.$confirm(
        '是否确认删除名称为"' + row.deptName + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function () {
          return delDept(row.id)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function () {})
    }
  }
}
</script>
