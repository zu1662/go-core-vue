<template>
  <transition
    v-on:after-enter="handleAfterEnter"
    :enter-active-class="'animated ' + enterActiveClass"
    :leave-active-class="'animated ' + leaveActiveClass"
  >
    <slot></slot>
  </transition>
</template>
<script>
import 'animate.css'
import { addClass, removeClass } from '@/utils/domUtil'

export default {
  name: 'AnTransition',
  props: {
    enterActiveClass: {
      type: String,
      default: 'fadeIn'
    },
    leaveActiveClass: {
      type: String,
      default: 'fadeOut'
    }
  },
  data () {
    return {
      animateDOM: ''
    }
  },
  methods: {
    // 手动触发动画
    triggerAnimate () {
      addClass(this.animateDOM, 'animated')
      addClass(this.animateDOM, this.enterActiveClass)
    },
    handleAfterEnter (el) {
      this.animateDOM = el
      el.addEventListener('animationend', this.handleAnimationend)
    },
    handleAnimationend () {
      removeClass(this.animateDOM, 'animated')
      removeClass(this.animateDOM, this.enterActiveClass)
    }
  }
}

</script>
