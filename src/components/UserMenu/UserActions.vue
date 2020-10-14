<template>
  <div class="user-actions">
    <el-dropdown class="action-dropdown">
      <div class="user-info">
        <el-avatar size="small" :src="avatar"></el-avatar>
        <span class="user-name">{{nickname}}</span>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
          <el-dropdown-item command="user-center">
            <router-link :to="{ path: 'home' }" tag="div">
              <i class="el-icon-user"></i>
              <span>个人中心</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item command="user-setting">
            <router-link :to="{ path: 'home' }" tag="div">
              <i class="el-icon-setting"></i>
              <span>账户设置</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item command="user-test" disabled>
            <router-link :to="{ path: 'home' }" tag="div">
              <i class="el-icon-setting"></i>
              <span>测试</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item command="logout" divided>
            <div @click="handlelogout">
              <i class="el-icon-switch-button"></i>
              <span>退出登陆</span>
            </div>
          </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserActions',
  computed: {
    ...mapGetters(['nickname', 'avatar'])

  },
  methods: {
    ...mapActions(['Logout']),
    handlelogout () {
      this.$confirm('确定要退出登陆吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Logout({}).then(() => {
          setTimeout(() => {
            window.location.reload()
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
  .user-actions {
    cursor: pointer;
    margin: 0 1rem 0 2rem;
    height: 80%;

    .action-dropdown {
      height: 100%;
    }
    .user-info {
      height: 100%;
      display: flex;
      align-items: center;
      .user-name {
        margin-left: 1rem;
      }
    }

    .action-dropdown {
      color: inherit;
    }
  }
  .user-dropdown-menu {
    i[class^="el-icon-"]{
      margin-right: 0.5rem;
    }
  }
</style>
