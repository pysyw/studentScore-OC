<template>
  <v-dialog
    ref="addScore"
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
            <el-select v-model="cid" placeholder="请选择" @change="selectClass">
              <el-option
                v-for="item in classes"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学生姓名:" prop="phone">
            <el-select
              v-model="form.studentId"
              filterable
              remote
              :disabled="disable"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="(item, index) in studentList"
                :key="index"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
            <div v-if="disable" class="el-form-item__error">请先选择班级在填写学生姓名</div>
          </el-form-item>
          <el-form-item label="考试类别:" prop="name">
            <el-select v-model="form.examType" placeholder="请选择">
              <el-option
                v-for="(item,index) in examTypeList"
                :key="index"
                :label="item.exmaTypeName"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="科目:" prop="sex">
            <el-select v-model="form.subjectName" placeholder="请选择">
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
import { addScore } from '@/api/score'
import { getClass } from '@/api/class'
import { findStudentByCid } from '@/api/score'
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
      title: '新增成绩',
      loading: false,
      form: {
        score: '',
        subjectName: '',
        examType: '',
        studentId: ''
      },
      disable: true,
      classes: [],
      cid: '',
      examTypeList: [],
      subjectList: [],
      studentList: [],
      formRules: {
        // class: [{ required: true, message: '请输入用户名' }],
        // phone: [{ required: true, message: '请输入手机号' }],
        // name: [{ required: true, message: '请输入姓名' }]
      }
    }
  },
  methods: {
    /** 初始化表单 **/
    initData() {
      this.form = {
        score: '',
        subjectName: '',
        examType: '',
        studentId: ''
      }
      this.classes = []
      this.examTypeList = []
      this.subjectList = []
      this.studentList = []
    },
    /** 点击表单提交成功 **/
    successForm() {
      addScore(this.form).then(res => {
        if (res.code === 200) {
          this.$message({ message: '新增成功', type: 'success' })
          this.hide()
          this.$emit('success')
        }
      })
    },
    show() {
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
      this.$refs.addScore.showDialog()
    },
    hide() {
      this.initData()
      this.$refs.addScore.closeDialog()
    },
    /** 选择班级 **/
    selectClass(val) {
      this.cid = val
      findStudentByCid(this.cid).then(res => {
        this.studentList = res.data
        this.loading = false
      })
      this.disable = false
    },
    /** 远程搜索 */
    remoteMethod(query) {
      if (query !== '') {
        this.studentList = this.studentList.filter(item => {
          return item.name.indexOf(query) > -1
        })
      } else {
        this.studentList = []
      }
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
