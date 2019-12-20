<template>
  <v-dialog
    ref="editScore"
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
            <el-input v-model="rowData.className" disabled />
          </el-form-item>
          <el-form-item label="学生姓名:" prop="phone">
            <el-input v-model="rowData.studentName" disabled />
          </el-form-item>
          <el-form-item label="考试类别:" prop="name">
            <el-select v-model="form.examTypeId" placeholder="请选择">
              <el-option
                v-for="(item,index) in examTypeList"
                :key="index"
                :label="item.exmaTypeName"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="科目:" prop="sex">
            <el-select v-model="form.subjectId" placeholder="请选择">
              <el-option
                v-for="(item,index) in subjectList"
                :key="index"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="成绩:" prop="phone">
            <el-input v-model="form.score" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import vDialog from '../v-dialog'
import { editExamType } from '@/api/score'
import { getClass } from '@/api/class'
import { getExamType } from '@/api/examType'
import { getSubject } from '@/api/subject'
export default {
  name: 'AddUser',
  components: {
    vDialog
  },
  data() {
    return {
      dialogVisible: false,
      title: '编辑用户',
      loading: false,
      rowData: {
        class: '',
        studentName: ''
      },
      form: {
        score: '',
        subjectId: '',
        examTypeId: '',
        studentId: ''
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
        // class: [{ required: true, message: '请输入用户名' }],
        // phone: [{ required: true, message: '请输入手机号' }],
        // name: [{ required: true, message: '请输入姓名' }]
      },
      examTypeList: [],
      subjectList: []
    }
  },
  methods: {
    /** 初始化表单 **/
    initData() {
      this.form = {
        score: '',
        subjectId: '',
        examTypeId: '',
        studentId: ''
      }
      this.examTypeList = []
      this.classes = []
      this.subjectList = []
    },
    /** 点击表单提交成功 **/
    successForm() {
      editExamType(this.form).then(res => {
        if (res.code === 200) {
          this.$message({ message: '新增成功', type: 'success' })
          this.hide()
          this.$emit('success')
        }
      })
    },
    show(row) {
      this.initData()
      getClass().then(res => {
        this.classes = res.data.rows
      })
      getExamType().then(res => {
        this.examTypeList = res.data.rows
      })
      getSubject().then(res => {
        this.subjectList = res.data.rows
      })
      const data = Object.assign({}, row)
      this.form = {
        score: data.score,
        subjectId: data.subjectName._id,
        examTypeId: data.examType._id,
        studentId: data.studentId._id
      }
      this.rowData = {
        className: data.studentId.class.name,
        studentName: data.studentId.name
      }
      this.form.class = data.studentId.class.name
      this.$refs.editScore.showDialog()
    },
    hide() {
      this.initData()
      this.$refs.editScore.closeDialog()
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
