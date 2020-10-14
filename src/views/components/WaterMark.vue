<template>
  <div>
     <water-mark
      class="text-container"
      style="line-height: 30px;"
      spacing="1rem"
      content="huazite"
    >
      <p class="text">
       在这种时间的空茫中，好像我们只是站在一个尖尖的点上，茫然四顾，都是未知。这难免让人丧气。
      </p>
      <p class="text">
       我知道。在昨天漫长的飞行里，我陷入了昏睡，起飞到降落，只有最后半个小时才醒着。和以前不一样，现在的我几乎可以在任何交通工具上放心睡着。
      </p>
      <p class="text">
        我们能度过漫长的岁月抵达此刻，就已经足够幸运，那些没有到达此刻的人，就永远留在了过去。
      </p>
      <p class="text">
        在所有的担忧里，对时间的焦虑最为尖锐，因为时间不可逆，甚至不可以停，如此存在，如此流逝。
      </p>
      <p class="text">
        我们不会遗忘，会带着关于他们的记忆进入新的生活，只是我们真的是幸运的，时间像是对我们勇敢活着的奖励。
      </p>
    </water-mark>
    <water-mark
      class="text-container"
      style="line-height: 30px;"
      spacing="10px"
      opacity="0.5"
    >
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <div slot="watermark" slot-scope="scope">
        <span v-if="scope.coord.row % 2 "> 奇数行</span>
        <span v-else>偶数行</span>
      </div>
    </water-mark>
  </div>
</template>

<script>
import WaterMark from '@/components/WaterMark'
export default {
  components: {
    WaterMark
  }
}
</script>

<style lang="scss" scoped>
.text-container {
  margin: 3rem 1rem;
}
</style>
