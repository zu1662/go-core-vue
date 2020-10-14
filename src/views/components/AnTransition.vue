<template>
  <div class="an-transition-body">
    <div class="intro">
      <h2>使用 <el-link type="primary" href="https://daneden.github.io/animate.css/" target="_blank">animate.css</el-link> 设置 过渡效果。</h2>
      <p>name: 动画名称</p>
      <p>enterActiveClass: 进入动画</p>
      <p>leaveActiveClass: 离开名称</p>
    </div>
    <el-divider></el-divider>
    <an-transition
      ref="anTransition"
      :enterActiveClass="enterActiveClass"
      :leaveActiveClass="leaveActiveClass"
    >
      <div class="article" v-if="isShow">
        <p>人总要爱着什么，活着才有意义。 </p>
        <p>人生是一段孤独旅程，但我遇见了你，你不是我，却又像世界上的另一个我。</p>
        <p>这个世界上根本没有正确的选择，我们只不过是要努力奋斗，使当初的选择变得正确。</p>
        <p>成年人避免崩溃的第一步，是永远对生活做最坏的打算，但是也保留着对生活最真切的希望。 </p>
        <p>如果你说你在下午四点来，从三点钟开始，我就开始感觉很快乐，时间越临近，我就越来越感到快乐。</p>
      </div>
    </an-transition>
    <el-form>
      <el-form-item label="进入动画">
        <el-input v-model="enterActiveClass"></el-input>
      </el-form-item>
      <el-form-item label="离开动画">
        <el-input v-model="leaveActiveClass"></el-input>
      </el-form-item>
      <el-form-item label="动画展示">
        <el-button @click="isShow = !isShow">点我</el-button>
        <el-button @click="handleTrigger">手动触发动画</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import AnTransition from '@/components/AnTransition'
export default {
  name: 'TransitionDemo',
  components: {
    AnTransition
  },
  data () {
    return {
      isShow: false,
      enterActiveClass: 'bounceInDown',
      leaveActiveClass: 'bounceOut'
    }
  },
  mounted () {
    this.isShow = true
  },
  methods: {
    handleTrigger () {
      this.$refs.anTransition.triggerAnimate()
    }
  }
}
</script>
<style lang="scss" scoped>
  .intro {
    margin: 2rem 0;
    font-size: 1.5rem;
    line-height: 2.4rem;
    h2 {
      margin-bottom: 1rem;
      .el-link {
        font-size: 2rem;
      }
    }
  }
  .article {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    line-height: 2rem;
  }
</style>
