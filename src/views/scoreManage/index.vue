<template>
  <div class="dashboard-container">
    <div
      class="utilsWrap"
      style="display:flex;justify-content:space-between"
    >
      <el-input
        v-model="queryList.teacherName"
        placeholder="请输入老师名字"
        style="width:300px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getLists"
        />
      </el-input>
      <div class="examSelectWrap">
        <span>选择考试类别：</span>
        <el-select
          v-model="queryList.examType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in examOption"
            :key="item._id"
            :label="item.exmaTypeName"
            :value="item._id"
          />
        </el-select>
      </div>
      <div class="classSelectWrap">
        <span>选择班级：</span>
        <el-select
          v-model="queryList.class"
          placeholder="请选择"
        >
          <el-option
            v-for="item in classOption"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </div>
      <el-button
        size="large"
        type="primary"
        @click="showDialog('addScore')"
      >新增</el-button>
    </div>
    <div class="tableWrap">
      <el-table
        :data="tableData"
        :stripe="true"
        :border="true"
        style="width: 100%"
      >
        <el-table-column
          prop="examType.exmaTypeName"
          label="考试类型"
        />
        <el-table-column
          prop="examType.date"
          label="考试时间"
        />
        <el-table-column
          prop="subjectName.name"
          label="考试科目"
        />
        <el-table-column
          prop="studentId.name"
          label="学生姓名"
        />
        <el-table-column
          label="学生班级"
          width="180px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.studentId.class.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentId.sex"
          label="性别"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.studentId.sex === 1">男</span>
            <span v-else-if="scope.row.studentId.sex === 0">女</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentId.phone"
          label="手机"
        />
        <el-table-column
          prop="score"
          label="成绩"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <v-popover
              ref="vPopover"
              content-text="您真的要删除所选项目吗？"
              btn-size="mini"
              btn-text="删除"
              @handleConfirm="handleDelete(scope.row)"
            />
            <el-button
              size="small"
              type="text"
              @click="showDialog('editScore', scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        background
        :total="pageTotal"
        layout="total, prev, pager, next"
        style="float: right;"
        :page-size="queryList.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <add-score
      ref="addScore"
      @success="getLists"
    />
    <edit-score
      ref="editScore"
      @success="getLists"
    />
  </div>
</template>

<script>
import { getClass } from '@/api/class'
import { getStudentScore, getExamType, removeScore } from '@/api/score'
import { vPopover, addScore, editScore } from './components'
export default {
  name: 'Dashboard',
  components: {
    vPopover,
    addScore,
    editScore
  },
  data() {
    return {
      tableData: [],
      pageTotal: 0,
      queryList: {
        pageNum: 1,
        pageSize: 3,
        teacherName: '',
        examType: '',
        class: ''
      },
      examOption: [],
      classOption: []
    }
  },
  mounted() {
    this.getLists()
    this.getExamCatogrey()
    this.getClassList()
  },
  methods: {
    getLists() {
      getStudentScore().then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.pageTotal = res.total
        }
      })
    },
    getExamCatogrey() {
      getExamType().then(res => {
        if (res.code === 200) {
          this.examOption = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getClassList() {
      getClass().then(res => {
        if (res.code === 200) {
          this.classOption = res.data.rows
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showDialog(ele, row) {
      this.$refs[ele].show(row)
    },
    handleDelete(row) {
      removeScore(row._id).then(res => {
        if (res.code === 200) {
          this.$message({ message: '删除成功', type: 'success' })
          this.getLists()
        }
      })
    },
    /* 分页操作 */
    handleCurrentChange(val) {
      this.queryList.pageNum = val
      this.getLists()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.pagination-wrapper {
  padding: 20px 30px;
}
.tableWrap {
  padding: 30px 0;
}
.examSelectWrap,
.classSelectWrap {
  font-size: 13px;
  color: #666;
}
.examSelectWrap .el-select,
.classSelectWrap .el-select {
  width: 100px;
  /deep/.el-input__inner {
    border: none;
  }
}
</style>
