<template>
  <div class="dialog-box">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :modal="modal"
      :width="width"
      :close-on-click-modal="closeModal"
      :before-close="handleClose"
      :append-to-body="appendToBody"
      :custom-class="customClass"
      class="mini-dialog"
      @closed="onClosed"
      @opened="onOpened"
    >
      <slot name="body" />
      <div
        v-show="showFooter"
        slot="footer"
        :style="{'line-height':footerLineH}"
        class="dialog-footer"
      >
        <slot name="footer" />
        <el-button
          v-if="showCancel"
          :size="size"
          @click="cancelClick($event)"
        >
          {{ rightBtn }}
        </el-button>
        <el-button
          v-if="showEnsure"
          :loading="isLoading"
          :size="size"
          type="primary"
          @click="ensureClick($event)"
        >
          {{ leftBtn }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入自定义指令
// import '@/utils/directives'
/*
* 相关参数参考 element ui 开发文档
*/
export default {
  props: {
    title: {
      type: String,
      default: '提示标题'
    },
    dialogSize: {
      type: String,
      default: 'tiny'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '500px'
    },
    footerLineH: {
      type: String,
      default: '52px'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    leftBtnW: {
      type: String,
      default: '114px'
    },
    rightBtnW: {
      type: String,
      default: '70px'
    },
    leftBtn: {
      type: String,
      default: '确 定'
    },
    rightBtn: {
      type: String,
      default: '取 消'
    },
    showEnsure: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    closeModal: {
      type: Boolean,
      default: true
    },
    isStopPropagation: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      done()
      this.$emit('handleClose')
    },
    showDialog() {
      this.dialogVisible = true
      this.$emit('showDialog')
    },
    closeDialog(event) {
      this.dialogVisible = false
      if (this.isStopPropagation) {
        event.stopPropagation()
      }
    },
    ensureClick(event) {
      this.$emit('ensureClick')
      if (this.isStopPropagation) {
        event.stopPropagation()
      }
    },
    cancelClick(event) {
      this.dialogVisible = false
      this.$emit('cancelClick')
      if (this.isStopPropagation) {
        event.stopPropagation()
      }
    },
    onClosed() {
      this.$emit('onClosed')
    },
    onOpened() {
      this.$emit('onOpened')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dialog-footer {
  position: relative;
  display: block;
}
</style>
