<template>
  <div class="login">
    <div class="login-panel">
      <el-form
        hide-required-asterisk
        ref="loginForm"
        id="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-position="top"
      >
        <div class="logo">
          <h1>{{titlename}}</h1>
        </div>
        <el-form-item class="login-item" label="用户名" prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="请输入用户名"
            autocomplete="off"
          >
            <svg-icon slot="prefix" name="username"></svg-icon>
          </el-input>
        </el-form-item>
        <el-form-item class="login-item" label="密码" prop="password">
          <el-input
            class="login-input"
            type="password"
            @keyup.enter.native="submitForm('loginForm')"
            v-model="loginForm.password"
            placeholder="请输入密码"
            autocomplete="off"
          >
            <svg-icon slot="prefix" name="password"></svg-icon>
          </el-input>
        </el-form-item>
        <el-form-item class="login-item captcha-box" label="验证码" prop="captchaCode">
          <el-input
            class="captcha-input"
            v-model="loginForm.captchaCode"
            placeholder="请输入验证码"
            autocomplete="off"
          >
            <svg-icon slot="prefix" name="captcha"></svg-icon>
          </el-input>
          <div @click="handleGetCaptcha" v-if="captchaUrl" class="captcha-img"><el-image :src="captchaUrl"></el-image></div>
        </el-form-item>
        <el-form-item class="submit-item">
          <el-button class="submit-btn" :loading="submitting" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
        <div class="more-item">
          <div class="login-with">
            <span>{{$t('user.loginWith')}}</span>
            <svg-icon name="wechat"></svg-icon>
            <svg-icon name="qq"></svg-icon>
          </div>
          <el-link type="primary" @click="registe" :underline="false">{{$t('user.register')}}</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'md5'
import { getCaptcha } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      submitting: false,
      titlename: process.env.VUE_APP_GLOBAL_TITLE || 'vue-element-core',
      loginForm: {
        userName: 'huazi',
        password: '123456',
        captchaCode: '',
        captchaId: ''
      },
      captchaUrl: '',
      loginRules: {
        userName: [
          { required: true, message: this.$t('user.usernameValidate'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('user.passwordValidate'), trigger: 'blur' }
        ],
        captchaCode: [
          { required: true, message: this.$t('user.captchaValidate'), trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.handleGetCaptcha()
  },
  methods: {
    handleGetCaptcha  () {
      getCaptcha().then(res => {
        if (Number(res.code) === 1) {
          this.loginForm.captchaId = res.data.id
          this.captchaUrl = res.data.captcha
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    },
    registe () {
      this.$router.push({ name: 'register' })
    },
    handleLangCommand (command) {
      this.$refs.loginForm.clearValidate()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.submitting = true
        const nowPassword = md5(this.loginForm.password)
        const params = { ...this.loginForm }
        params.password = nowPassword
        this.$store.dispatch('Login', params).then(res => {
          if (Number(res.code)) {
            this.$router.push({ path: this.$route.redirect || '/' })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.msg
            })
          }
        }).catch(err => {
          this.$notify.error({
            title: '错误',
            message: err
          })
        }).finally(() => {
          this.submitting = false
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url("~@/assets/bg.jpg") no-repeat center center;
    background-size: cover;

    .login-panel {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: 400px;
      background: rgba(0,0,0, 0.2);

      .logo {
        text-align: center;
      }

      /deep/ #loginForm {
        width: 300px;
        color: #fff;
        .more-item{
          margin: 1.5rem 0;
          display: flex;
          justify-content: space-between;
          .login-with {
            font-size: 1.4rem;
            color: #fff;
            display: flex;
            align-items: center;
            .svg-icon {
              font-size: 2rem;
              margin-left: 1.5rem;
              cursor: pointer;
              &:hover {
                color: $primary-color;
              }
            }
          }
        }
        .login-item {
          margin: 15px 0;
          .el-form-item__label {
            color: #fff;
          }
          .el-input__prefix {
            margin-left: .3rem;
            color: #666666;
          }
          &.captcha-box {
            .el-form-item__content {
              display: flex;
              align-items: center;
            }
            .captcha-input {
              width: 60%;
            }
            .captcha-img {
              display: inline-block;
              margin-left: 5px;
              height: 40px;
              width: 40%;
              border-radius: 5px;
              background-color: #fff;
            }
          }

        }
        .submit-btn {
          margin-top: 2.5rem;
          width: 100%;
        }
      }
    }
  }
</style>
