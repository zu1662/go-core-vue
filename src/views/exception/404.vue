<template>
  <div>
    <row-transition>
      <div class="a" v-if="flag">aaaa</div>
    </row-transition>
    <el-button @click="flag = !flag">button</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: true
    }
  }
}
</script>

<style scoped>
  .a, .b {
    width: 20rem;
    height: 10rem;
  }
  .a {
    background-color: red;
  }
  .b {
    background-color: blueviolet;
  }
</style>
