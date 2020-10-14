<template>
  <el-container class="login-container">
    <an-transition
      :enterActiveClass="animateName"
      ref="anTransition"
    >
    <div class="login-panel" v-if="showLocker">
      <div class="title">Unlock</div>
        <div class="body">
          <el-form :model="lockerForm" :rules="rules" ref="lockForm" @submit.native.prevent>
            <el-form-item prop="lockerPass">
              <el-input type="password" class="handle-input" @keyup.enter.native.stop.prevent="submitForm('lockForm')" placeholder="请输入锁屏密码" v-model="lockerForm.lockerPass"></el-input>
            </el-form-item>
          </el-form>
          <el-button class="handle-btn" icon="el-icon-unlock" @click="submitForm('lockForm')"></el-button>
          <el-button class="handle-btn" icon="el-icon-switch-button" @click="handleLogout"></el-button>
        </div>
      </div>
    </an-transition>
  </el-container>
</template>
<script>
import md5 from 'md5'
import AnTransition from '@/components/AnTransition'
export default {
  name: 'Login',
  components: {
    AnTransition
  },
  data () {
    return {
      animateName: 'bounceInDown',
      showLocker: false,
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
  mounted () {
    this.showLocker = true
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const nowPassword = md5(this.lockerForm.lockerPass)
          this.$store.dispatch('LockerIn', nowPassword).then(res => {
            if (res.code === 1) {
              this.$router.replace({ path: res.redirect || '/' })
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              })
              this.animateName = 'wobble'
              this.$nextTick(_ => {
                this.$refs.anTransition.triggerAnimate()
                this.lockerForm.lockerPass = ''
              })
              this.$refs.lockForm.clearValidate()
            }
          })
        }
      })
    },
    handleLogout () {
      this.$confirm('确定要退出登陆吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('Logout').then(() => {
          setTimeout(() => {
            this.$router.replace({ name: 'login' })
          }, 16)
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/styles/var.scss';
  $panel-width: 12rem;
  $min-width: 90rem;
  $panel-height: 60rem;
  $min-height: 50rem;
  $header-height: 6rem;

  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: $min-height;
    overflow-x: hidden;
    background-image: linear-gradient(-45deg,#409EFF 10%,#67C23A);
    box-shadow: 0 6px 8px 0 rgba(0,0,0,.1);
  }
  .login-panel {
    z-index: 1000;
    .title {
      margin-bottom: 1rem;
      font-size: 2rem;
      color: #fff;
    }
    .body {
      height: 40px;
      display: flex;
      /deep/ .el-form {
        height: 100%;
        .el-form-item {
          .el-form-item__content {
            line-height: inherit;
          }
          .handle-input {
            .el-input__inner {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
        }
      }
      .handle-btn {
        height: 100%;
        border: none;
        margin-left: 0;
        border-radius: 0;
        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
  }
</style>
