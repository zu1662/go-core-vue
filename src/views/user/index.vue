<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input
              v-model="queryParams.mobile"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
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
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除</el-button>
          </el-col>
        </el-row>

        <el-table
          v-loading="loading"
          :data="userList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="45" align="center" />
          <el-table-column label="编号" width="50" align="center" prop="id" />
          <el-table-column label="用户编码" align="center" prop="userCode" :show-overflow-tooltip="true" />
          <el-table-column label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" />
          <el-table-column label="部门" align="center" prop="deptName" :show-overflow-tooltip="true" />
          <el-table-column label="手机号码" align="center" prop="mobile" width="120" />
          <el-table-column label="状态" width="50" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="1"
                inactive-value="0"
                @change="handleStatusChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createdAt" width="165">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="220"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                v-if="scope.row.userId !== 1"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleResetPwd(scope.row)"
              >重置</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getUserList"
        />
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户编码" prop="userCode">
              <el-input v-model="form.userCode" placeholder="请输入用户编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <treeselect
                v-model="form.deptId"
                :options="deptOptions"
                :props="defaultProps"
                :normalizer="normalizer"
                placeholder="请选择归属部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="form.gender" placeholder="请选择">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="岗位">
              <el-select v-model="form.postId" placeholder="请选择" @change="$forceUpdate()">
                <el-option
                  v-for="item in postOptions"
                  :key="item.id"
                  :label="item.postName"
                  :value="item.id"
                  :disabled="item.status == 0"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.roleId" placeholder="请选择" @change="$forceUpdate()">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                  :disabled="item.status == 0"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import md5 from 'md5'
import { GetRoleAll } from '@/api/system/role'
import { GetPostAll } from '@/api/system/post'
import { GetUserList, getUserInfo, delUser, addUser, updateUser, exportUser, resetUserPwd, importTemplate } from '@/api/system/user'
import { GetDeptTree } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'User',
  components: { Treeselect },
  data () {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: '',
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 状态数据字典
      statusOptions: [{ dictLabel: '禁用', dictValue: '0' }, { dictLabel: '启用', dictValue: '1' }],
      // 性别状态字典
      sexOptions: [{ dictLabel: '男', dictValue: '0' }, { dictLabel: '女', dictValue: '1' }],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        userName: undefined,
        mobile: undefined,
        status: undefined,
        deptId: undefined
      },
      // 表单校验
      rules: {
        userName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        userCode: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '归属部门不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    // 根据名称筛选部门树
    deptName (val) {
      this.$refs.tree.filter(val)
    }
  },
  created () {
    this.getUserList()
    this.getDeptTree()
    this.getRoles()
    this.getPosts()
  },
  methods: {
    // 查询role信息
    getRoles () {
      GetRoleAll().then(res => {
        if (Number(res.code)) {
          this.roleOptions = res.data
        }
      })
    },
    // 查询post信息
    async getPosts () {
      const res = await GetPostAll()
      if (Number(res.code)) {
        this.postOptions = res.data
      }
    },
    /** 查询用户列表 */
    getUserList () {
      this.loading = true
      GetUserList(this.queryParams).then(res => {
        if (Number(res.code)) {
          this.userList = res.data.list
          this.total = res.data.total
          this.loading = false
        }
      }
      )
    },
    /** 查询部门下拉树结构 */
    getDeptTree () {
      GetDeptTree().then(response => {
        this.deptOptions = response.data
      })
    },
    // 筛选节点
    filterNode (value, data) {
      if (!value) return true
      return data.deptName.indexOf(value) !== -1
    },
    // 节点单击事件
    handleNodeClick (data) {
      this.queryParams.deptId = data.id
      this.getUserList()
    },
    /** 转换菜单数据结构 */
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
    // 用户状态修改
    handleStatusChange (row) {
      const text = row.status === '1' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        const data = {
          id: row.id,
          status: row.status
        }
        updateUser(data).then(res => {
          if (Number(res.code)) {
            this.msgSuccess(text + '成功')
          }
          this.getUserList()
        })
      }).catch(action => {
        row.status = row.status === '0' ? '1' : '0'
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
        userCode: undefined,
        id: undefined,
        deptId: undefined,
        userName: undefined,
        password: undefined,
        mobile: undefined,
        email: undefined,
        gender: undefined,
        status: '0',
        postIds: undefined,
        roleIds: undefined
      }
      this.$refs.form.resetFields()
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.page = 1
      this.getUserList()
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.$refs.queryForm.resetFields()
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.open = true
      this.title = '添加用户'
      this.$nextTick(_ => {
        this.reset()
      })
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      const userId = row.id
      getUserInfo(userId).then(response => {
        this.form = response.data
        this.form.postIds = response.data.postId
        this.form.roleIds = response.data.roleId
        this.open = true
        this.title = '修改用户'
        this.form.password = ''
      })
    },
    /** 重置密码按钮操作 */
    handleResetPwd (row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const data = {
          id: row.id,
          password: md5(value)
        }
        resetUserPwd(data).then(response => {
          if (Number(response.code)) {
            this.msgSuccess('修改成功，新密码是：' + value)
          } else {
            this.msgError(response.msg)
          }
        })
      }).catch(() => {})
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateUser(this.form).then(response => {
              if (Number(response.code)) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getUserList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addUser(this.form).then(response => {
              if (Number(response.code)) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getUserList()
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
      const userIds = row.id || this.ids
      this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delUser(userIds)
      }).then(() => {
        this.getUserList()
        this.msgSuccess('删除成功')
      }).catch(function () {})
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有用户数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportUser(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function () {})
    },
    /** 导入按钮操作 */
    handleImport () {
      this.upload.title = '用户导入'
      this.upload.open = true
    },
    /** 下载模板操作 */
    importTemplate () {
      importTemplate().then(response => {
        this.download(response.msg)
      })
    },
    // 文件上传中处理
    handleFileUploadProgress (event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess (response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      this.getUserList()
    },
    // 提交上传文件
    submitFileForm () {
      this.$refs.upload.submit()
    }
  }
}
</script>
