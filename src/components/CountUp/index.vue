<!--
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-01-08 17:04:27
 * @LastEditTime: 2020-01-08 18:01:17
 * @Description: countUp
 -->
 <template>
  <span></span>
</template>

<script>
// https://github.com/inorganik/CountUp.js
import { CountUp } from 'countup.js'
export default {
  name: 'CountUp',
  props: {
    start: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      type: Number,
      required: true
    },
    decimals: { // 小数点位数
      type: Number,
      required: false,
      default: 0
    },
    duration: {
      type: Number,
      required: false,
      default: 2
    },
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    callback: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      countUpper: null
    }
  },
  watch: {
    end (value) {
      if (this.countUpper && this.countUpper.update) {
        this.countUpper.update(value)
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (!this.countUpper) {
        this.countUpper = new CountUp(this.$el, this.end, {
          startVal: this.start,
          decimalPlaces: this.decimals,
          duration: this.duration,
          ...this.options
        })
        this.countUpper.start(() => {
          this.callback(this.countUpper)
        })
      }
    },
    destroy () {
      this.countUpper = null
    }
  },
  beforeDestroy () {
    this.destroy()
  },
  start (callback) {
    if (this.countUpper && this.countUpper.start) {
      this.countUpper.start(() => {
        callback && callback(this.countUpper)
      })
    }
  },
  pauseResume () {
    if (this.countUpper && this.countUpper.pauseResume) {
      this.countUpper.pauseResume()
    }
  },
  reset () {
    if (this.countUpper && this.countUpper.reset) {
      this.countUpper.reset()
    }
  },
  update (newEndVal) {
    if (this.countUpper && this.countUpper.update) {
      this.countUpper.update(newEndVal)
    }
  }
}
</script>
