<!--
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-01-06 11:51:16
 * @LastEditTime: 2020-01-06 14:12:18
 * @Description: 自定义input输入。做一些控制的时候在此设置
 -->
<template>
 <el-input :placeholder="placeholder" :value="value" @input="update" :disabled="disabled" v-bind="$attrs"></el-input>
</template>
<script>
export default {
  name: 'CustInput',
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Please input'
    },
    regex: {
      type: RegExp,
      default: /^\d*(\.?\d{0,2})/g
    }
  },
  methods: {
    //     /^\d*(\.?\d{0,2})/g 只允许输入大于0的数字

    //     /^[\d-()-*#+]*/g 只允许输入数字和其他一些国际号码支持的字符

    update (val) {
      const inputFormat = val.match(this.regex)[0] || null
      this.$emit('input', inputFormat)
    }
  }
}
</script>
