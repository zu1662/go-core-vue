<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg-icon name="hamburger" class="hamburger" :class="{'is-active': isActive}"></svg-icon>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'Hamburger',
  components: { SvgIcon },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger.svg-icon {
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
