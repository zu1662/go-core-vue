<template>
  <section class="app-main">
    <div class="app-body">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.app-main {
  /* 50= navbar  50  */
  height: calc(100% - #{$header-height});
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

.fixed-header + .app-main {
  padding-top: $header-height;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100% - #{$tag-height + $header-height});
  }

  .fixed-header + .app-main {
    padding-top: $tag-height + $header-height;
  }
}
</style>
