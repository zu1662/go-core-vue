<template>
  <div class="user-menu">
    <notice></notice>
    <user-actions></user-actions>
  </div>
</template>
<script>
import Notice from './Notice'
import UserActions from './UserActions'
export default {
  name: 'UserMenu',
  components: {
    Notice,
    UserActions
  }
}
</script>
<style lang="scss" scoped>
  .user-menu {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>
