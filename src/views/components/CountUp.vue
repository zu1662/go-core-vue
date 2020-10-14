<template>
  <div class="countup-body">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>数字动画组件</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="group">
            <count-up :end="100"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="group">
            <count-up :start="14" :end="100"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="group">
            <count-up :end="100" :decimals="2"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="group">
            <count-up :end="100" :duration="6"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="group">
            <count-up :end="100" :callback="() => {className = 'end'}" :class="className"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="group">
            <count-up :end="end" :callback="update"/>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import CountUp from '@/components/CountUp'
export default {
  name: 'CountUpDemo',
  components: { CountUp },
  data () {
    return {
      // 回调函数使用
      className: '',
      // 更新数值用
      end: 50
    }
  },
  methods: {
    update () {
      setTimeout(() => {
        this.end = 100
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  font-size: $font-size-large;
}
.group {
    margin: 1rem 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 60px;
      &.end {
        padding: 0px 20px;
        border-radius: 4px;
        background-color: $primary-color;
        color: #FFF;
      }
    }
  }
</style>
