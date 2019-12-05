<template>
  <div class="dashboard-container">
    <div class="utilsWrap" style="display:flex;justify-content:space-between">
      <el-input v-model="queryList.studentName" placeholder="请输入学生名字" style="width:300px">
        <el-button slot="append" icon="el-icon-search" @click="getLists" />
      </el-input>
      <el-button size="large" type="primary" @click="showDialog('addStudent')">新增</el-button>
    </div>
    <div class="tableWrap">
      <el-table
        :data="tableData"
        :stripe="true"
        :border="true"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="class.name"
          label="班级"
        />
        <el-table-column
          prop="sex"
          label="性别"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 1">男</span>
            <span v-else-if="scope.row.sex === 0">女</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
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
            <el-button size="small" type="text" @click="showDialog('addStudent', scope.row)">编辑</el-button>
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
    <add-student ref="addStudent" @success="getLists" />
  </div>
</template>

<script>
import { getStudent, deleteStudent } from '@/api/student'
import { vPopover, addStudent } from './components'
export default {
  name: 'Dashboard',
  components: {
    vPopover,
    addStudent
  },
  data() {
    return {
      tableData: [],
      pageTotal: 0,
      queryList: {
        pageNum: 1,
        pageSize: 5,
        studentName: ''
      }
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    getLists() {
      getStudent(this.queryList).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.rows
          this.pageTotal = res.data.total
        }
      })
    },
    showDialog(ele, row) {
      this.$refs[ele].show(row)
    },
    handleDelete(row) {
      deleteStudent(row._id).then(res => {
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
.tableWrap{
  padding: 30px 0
}
</style>
