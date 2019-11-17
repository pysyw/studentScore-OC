<template>
  <el-popover
    v-model="popover"
    placement="bottom"
    width="250"
    trigger="click"
  >
    <div class="popover-content-wrapper">
      <div class="popover-content-body">
        {{ contentText }}
      </div>
      <div class="popover-content-footer float-right">
        <el-button
          size="mini"
          @click="cancelPopover"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleConfirm"
        >确定</el-button>
      </div>
    </div>
    <el-button
      slot="reference"
      type="text"
      :size="btnSize"
    >{{ btnText }}</el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'VPopover',
  props: {
    contentText: {
      type: String,
      default: '您真的要取消此订单吗?'
    },
    btnText: {
      type: String,
      default: '删除'
    },
    btnSize: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      popover: false
    }
  },
  methods: {
    cancelPopover() {
      this.popover = false
    },
    handleConfirm() {
      this.$emit('handleConfirm')
      this.popover = false
    }
  }
}
</script>

<style lang="scss" scoped>
.popover-content-wrapper {
  .popover-content-body {
    padding-top: 10px;
  }
  .popover-content-footer {
    padding: 30px 0 0;
    /deep/.el-button--primary {
      padding: 10px 0;
      border-radius: 4px;
      width: 60px;
    }
    /deep/.el-button--default {
      padding: 10px 0;
      border-radius: 4px;
      width: 60px;
    }
  }
}

</style>
