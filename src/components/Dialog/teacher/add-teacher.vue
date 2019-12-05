<template>
  <v-dialog
    ref="addTeacher"
    left-btn="确定"
    width="600px"
    :title="title"
    @ensureClick="successForm"
    @onClosed="initData"
  >
    <div slot="body" class="body">
      <div class="formWarp">
        <el-form
          ref="formElement"
          :model="form"
          :rules="formRules"
          label-position="right"
          label-width="120px"
          size="medium"
          style="width: 90%;magin: 0 auto;"
        >
          <el-form-item label="图片:" prop="avatar">
            <template>
              <el-upload
                class="avatar-uploader"
                :action="photoUpload"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
              >
                <img v-if="form.avatar" :src="form.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </template>
          </el-form-item>
          <el-form-item label="班级:" prop="class">
            <el-select v-model="form.class" multiple placeholder="请选择">
              <el-option
                v-for="item in classes"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="教师姓名:" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择" :disabled="hasId">
              <el-option
                v-for="(item,index) in sexOption"
                :key="index"
                :label="item.name"
                :value="item.val"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="手机:" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import vDialog from '../v-dialog'
import { photoUpload } from '@/api/upload'
import { editTeacher, addTeacher } from '@/api/teacher'
import { getClass } from '@/api/class'
export default {
  name: 'AddUser',
  components: {
    vDialog
  },
  data() {
    return {
      dialogVisible: false,
      title: '新增用户',
      loading: false,
      roleList: [],
      hasId: false,
      photoUpload: photoUpload,
      form: {
        phone: '',
        name: '',
        class: [],
        avatar: '',
        sex: ''
      },
      sexOption: [
        {
          name: '男',
          val: 1
        },
        {
          name: '女',
          val: 0
        }
      ],
      classes: [],
      formRules: {
        class: [{ required: true, message: '请输入用户名' }],
        phone: [{ required: true, message: '请输入手机号' }],
        name: [{ required: true, message: '请输入姓名' }] }
    }
  },
  methods: {
    /** 初始化表单 **/
    initData() {
      this.hasId = false
      this.form = {
        sex: '',
        avatar: '',
        phone: '',
        name: '',
        class: []
      }
      this.classes = []
    },
    /** 点击表单提交成功 **/
    successForm() {
      if (!this.form._id) { // 新增
        addTeacher(this.form).then(res => {
          if (res.code === 200) {
            this.$message({ message: '新增成功', type: 'success' })
            this.hide()
            this.$emit('success')
          }
        })
      } else { // 编辑
        editTeacher(this.form).then(res => {
          if (res.code === 200) {
            this.$message({ message: '新增成功', type: 'success' })
            this.hide()
            this.$emit('success')
          }
        })
      }
    },
    // 上传图片
    handleUploadSuccess(res, file) {
      this.$message.success('上传头像成功')
      this.form.avatar = res.path
      // this.form.avatar = URL.createObjectURL(file.raw)
    },
    beforeUpload() {
      console.log(2)
    },
    show(row) {
      this.initData()
      getClass().then(res => {
        this.classes = res.data.rows
      })
      if (row) {
        const data = Object.assign({}, row)
        this.title = '编辑用户'
        this.hasId = true
        this.form = data
        this.form.class = data.class.map(item => {
          return item._id
        })
        console.log(this.form)
      } else {
        this.initData()
        this.hasId = false
        this.title = '新增用户'
      }
      this.$refs.addTeacher.showDialog()
    },
    hide() {
      this.initData()
      this.$refs.addTeacher.closeDialog()
    }
  }
}
</script>
<style lang="scss" scoped>
   /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
