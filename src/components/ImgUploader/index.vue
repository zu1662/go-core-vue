<!--
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-01-06 10:54:20
 * @LastEditTime: 2020-04-27 15:13:10
 * @Description:自定义图片上传组件
 -->
<template>
  <div class="upload-imagebox">
    <div class="upload-box">
      <el-upload
        :action="uploadAddr + uploadUrl"
        :headers="myHeaders"
        ref="uploadItem"
        :limit="maxNum"
        list-type="picture-card"
        :file-list="fileList"
        :on-success="handleAvatarSuccess"
        :on-change="uploadFileChange"
        :before-upload="beforeAvatarUpload"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}" class="img-model">
          <el-progress v-if="file.progressFlag" type="circle" :percentage="file.progressPercent"></el-progress>
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <label v-if="!file.progressFlag" class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
            >
              <div class="el-icon-edit" @click="editFile = file">
                <el-upload
                  class="edit-upload"
                  :action="uploadAddr + uploadUrl"
                  :headers="myHeaders"
                  :show-file-list="false"
                  :on-change="handleEditChange"
                  :before-upload="beforeAvatarUpload">
                </el-upload>
              </div>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
    </div>
    <div v-if="showSave" class="btn-box" style="text-align: right;margin-top: 20px;">
      <hr>
      <el-button
        @click="saveImages"
      >save</el-button>
    </div>
  </div>
</template>
<script>
import { ACCESS_TOKEN } from '@/config/variableInit'
export default {
  props: {
    showSave: {
      type: Boolean,
      default: false
    },
    maxNum: {
      type: Number,
      required: true
    },
    uploadUrl: {
      type: String,
      required: true
    },
    ltSize: {
      type: Object,
      default: function () {
        return {
          size: 0,
          errMsg: 'Image size can not less than miniSize.'
        }
      }
    },
    gtSize: {
      type: Object,
      default: function () {
        return {
          size: 10,
          errMsg: 'Image size can not greater than largeSize.'
        }
      }
    },
    fileType: {
      type: String,
      default: 'jpg|gif|png|jpeg'
    }
  },
  data () {
    return {
      editIndex: 0,
      myHeaders: { ACCESS_TOKEN: this.$ls.get(ACCESS_TOKEN) },
      fileList: [],
      tableColIdx: null,
      uploadAddr: process.env.BASE_API,
      editFile: null
    }
  },
  mounted () {
  },
  methods: {
    // 上传文件变化，自定义进度条
    uploadFileChange (file, fileList) {
      if (file.status === 'ready') {
        file.progressFlag = true
        file.progressPercent = 0
        const interval = setInterval(_ => {
          if (file.progressPercent >= 99) {
            clearInterval(interval)
            return
          }
          file.progressPercent += 1
        }, 10)
      }
      if (file.status === 'success') {
        file.url = file.response.obj
        file.progressPercent = 100
        this.$nextTick(_ => {
          file.progressFlag = false
        })
      }
    },
    // 删除图片
    handleRemove (file) {
      const fileList = this.$refs.uploadItem.uploadFiles
      fileList.forEach((item, index) => {
        if (item.url === file.url) {
          fileList.splice(index, 1)
        }
      })
      if (fileList.length <= this.maxNum) {
        this.$refs.uploadItem.$el.lastChild.style.display = 'block'
      }
    },
    // 编辑图片：通过新的上传组件，成功后，把图片赋值到之前的list上
    handleEditChange (file) {
      if (file.status === 'ready') {
        this.editFile.progressFlag = true
        this.editFile.progressPercent = 0
        const interval = setInterval(_ => {
          if (this.editFile.progressPercent >= 99) {
            clearInterval(interval)
            return
          }
          this.editFile.progressPercent += 1
        }, 10)
      }
      if (file.status === 'success') {
        this.editFile.progressPercent = 100
        this.editFile.progressFlag = false
        this.editFile.url = file.response.obj
        this.editFile.id = ''
        this.editFile.name = file.name
        this.editFile.response = file.response
      }
    },
    // 初始化数据
    initDatas (imglist, tableColIdx) {
      const list = []
      imglist = imglist || []
      imglist.forEach(item => {
        list.push({
          id: item.id,
          url: item.fullPath
        })
      })
      if (list.length >= this.maxNum) {
        this.$refs.uploadItem.$el.lastChild.style.display = 'none'
      }
      this.fileList = list
      this.tableColIdx = tableColIdx
    },
    // 图片上传前
    beforeAvatarUpload (file) {
      // 最多可以上传6张图片
      const fileList = this.$refs.uploadItem.uploadFiles
      if (this.maxNum && fileList.length - 1 >= this.maxNum) {
        this.$message.warning(`At most ${this.maxNum} pictures can be uploaded.`)
        return false
      }
      // 图片类型判断
      const imgTypeReg = new RegExp(`\\.(${this.fileType})`)
      if (!imgTypeReg.test(file.name.toLocaleLowerCase())) {
        this.$message.error(`This image could not be added: Support Image type: ${this.fileType}.`)
        return false
      }
      // 图片尺寸判断
      const fileSize = file.size / 1024 / 1024
      if (this.gtSize && fileSize > this.gtSize.size) {
        this.$message.error(this.$t(this.gtSize.errMsg))
        return false
      }
      if (this.ltSize && fileSize < this.ltSize.size) {
        this.$message.error(this.$t(this.ltSize.errMsg))
        return false
      }
    },
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      file.progressPercent = 100
      file.progressFlag = false
      const fileLength = this.$refs.uploadItem.uploadFiles.length
      if (fileLength >= this.maxNum) {
        this.$refs.uploadItem.$el.lastChild.style.display = 'none'
      }
    },
    // 保存按钮点击
    saveImages () {
      const fileList = this.$refs.uploadItem.uploadFiles
      this.$emit('setImgsList', fileList, this.tableColIdx)
    },
    // 获取当前数据
    getNowFileList () {
      const fileList = this.$refs.uploadItem.uploadFiles
      return fileList
    }
  }
}
</script>
<style lang="scss"  scoped>
.upload-imagebox {
  .upload-box {
    & > div {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      /deep/ .el-upload-list {
        display: contents;
        .img-model {
          height: 100%;
        }
        li:first-child {
          width: 300px;
          height: 300px;
        }
      }
    }
  }
}
/deep/ .el-icon-edit {
  position: relative;
  .edit-upload {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    .el-upload  {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
