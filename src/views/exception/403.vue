<template>
  <div>
    <ellipsis :length="100" :content="inputVal" tooltip>
      There were injuries alleged in three cases in 2015, and a
      fourth incident in September, according to the safety recall report.
      After meeting with US regulators in October, the firm decided to issue a voluntary recall.
    </ellipsis>
  </div>
</template>

<script>
import Ellipsis from '@/components/Ellipsis'
export default {
  components: { Ellipsis },
  data () {
    return {
      inputVal: '我去恶趣味我去饿我去打打2313解耦i丘吉尔哦i九七'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
