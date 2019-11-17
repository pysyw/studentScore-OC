<template>
  <v-dialog
    ref="addSettle"
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
          <el-form-item label="班级:" prop="class">
            <el-select v-model="form.class" placeholder="请选择">
              <el-option
                v-for="item in classes"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学生姓名:" prop="name">
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
import { editStudent, addStudent } from '@/api/student'
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
      form: {
        className: '',
        phone: '',
        name: '',
        class: ''
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
        className: '',
        phone: '',
        name: '',
        class: ''
      }
      this.classes = []
    },
    /** 点击表单提交成功 **/
    successForm() {
      if (!this.form._id) { // 新增
        addStudent(this.form).then(res => {
          if (res.code === 200) {
            this.$message({ message: '新增成功', type: 'success' })
            this.hide()
            this.$emit('success')
          }
        })
      } else { // 编辑
        editStudent(this.form).then(res => {
          if (res.code === 200) {
            this.$message({ message: '新增成功', type: 'success' })
            this.hide()
            this.$emit('success')
          }
        })
      }
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
      } else {
        this.initData()
        this.hasId = false
        this.title = '新增用户'
      }
      this.$refs.addSettle.showDialog()
    },
    hide() {
      this.initData()
      this.$refs.addSettle.closeDialog()
    }
  }
}
</script>
