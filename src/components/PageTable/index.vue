<template>
  <div class="table">
    <el-table
      v-loading="listLoading"
      ref="elTable"
      :element-loading-text="loadingText"
      :data="data"
      :row-key="rowkey"
      @selection-change="handleSelectionChange"
      v-bind="$attrs"
    >
      <slot></slot>
    </el-table>
    <el-pagination
      class="pagination"
      :layout="pageLayout"
      :total="paginationTotal"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      @size-change="sizeChange"
      @current-change="pageChange"
      :class="align"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    listLoading: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    loadingText: {
      type: String,
      default: function () {
        return this.$t('Loading')
      }
    },
    rowkey: {
      type: String,
      default: function () {
        return 'id'
      }
    },
    pagination: Boolean,
    paginationAlign: String,
    pageSize: {
      type: Number,
      default: function () {
        return 10
      }
    },
    pageSizes: {
      type: Array,
      default: function () {
        return [10, 15, 20, 25, 30, 35, 40, 45, 50]
      }
    },
    paginationTotal: {
      type: Number,
      default: function () {
        return 10
      }
    },
    pageLayout: {
      default: function () {
        return 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  computed: {
    align () {
      let res
      switch (this.paginationAlign) {
        case 'right':
          res = 'textR'
          break
        case 'center':
          res = 'textC'
          break
        default:
          res = ''
      }
      return res
    }
  },
  methods: {
    sizeChange (size) {
      // console.log('每页显示条数变更为:' + size)
      this.$emit('pageSizeChange', size)
    },
    pageChange (curPage) {
      this.currentPage = curPage
      this.$emit('currentPageChange', curPage)
    },
    restPage () {
      this.currentPage = 1
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    }
  },
  data () {
    return {
      currentPage: 1
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
  text-align: left;
}
/deep/ .pagination .el-pagination__editor {
  font-size: 13px !important;
}
</style>
