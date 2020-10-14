<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    nowColor () {
      return this.$store.state.settings.color
    }
  },
  mounted () {
    this.$log.capsule('env', process.env.NODE_ENV)
    this.$nextTick(_ => {
      this.$themeChalk.setTheme(this.nowColor)
    })
  }
}
</script>
<style>
#app {
    height: 100%;
    width: 100%;
  }
</style>
