<template>
  <div class="dashboard" :style="{backgroundImage: bgImg}"></div>
</template>
<script>
import BGImg from '@/assets/home.jpg'
export default {
  name: 'HomeIndex',
  data () {
    return {
      bgImg: 'url(' + BGImg + ')'
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
</style>
