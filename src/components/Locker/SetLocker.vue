<template>
  <div class="set-locker">
    <i class="el-icon-lock locker-icon" @click="handleLocker"></i>

    <el-dialog width="30%" title="设置锁屏密码" :visible.sync="lockerDialog" append-to-body destroy-on-close>
      <el-form ref="lockerForm" :model="lockerForm" :rules="rules" @submit.native.prevent>
        <el-form-item label="锁屏密码" prop="lockerPass">
          <el-input type="password" placeholder="请输入锁屏密码" @keyup.enter.native.stop.prevent="submitForm('lockerForm')" v-model="lockerForm.lockerPass"></el-input>
        </el-form-item>
        <el-form-item class="submit-item">
          <el-button style="width:30%" type="primary" @click="submitForm('lockerForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import md5 from 'md5'
export default {
  name: 'SetLocker',
  data () {
    return {
      lockerDialog: false,
      lockerForm: {
        lockerPass: ''
      },
      rules: {
        lockerPass: [
          { required: true, message: '锁屏密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLocker () {
      this.lockerDialog = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const locker = {
            password: md5(this.lockerForm.lockerPass),
            isLocked: true,
            redirect: this.$route.path
          }
          this.$store.dispatch('SetLocker', locker).then(_ => {
            this.$router.push({ name: 'locker' })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .locker-icon {
    display: block;
    width: 2rem;
    height: 100%;
    text-align: center;
    line-height: $header-height;
    font-size: 2rem;
    cursor: pointer;
  }
  .submit-item {
    text-align: right;
  }
</style>
