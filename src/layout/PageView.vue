<template>
  <div class="page-view" :class="{isDashboard:isDashboard}">
    <router-view />
    <!-- <div class="footer">
      <div class="copyright">
        Copyright &copy; zu1662
      </div>
    </div> -->
  </div>
</template>
<script>

export default {
  name: 'PageView',
  computed: {
    isDashboard () {
      if (this.$route.path === '/dashboard/index') {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-container .isDashboard {
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
