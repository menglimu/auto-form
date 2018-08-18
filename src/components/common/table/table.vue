<template>
  <div>
    <div class="search-box" v-if="selectConfig.dataList&&selectConfig.dataList.length>0">
      <mlform ref="searchForm" :config="selectConfig" v-model="searchInput"></mlform>
      <el-button size="small" @click="resetSearch">重置</el-button>
      <el-button size="small" @click="search">搜索</el-button>
    </div>
    <div class="btn-box">
      <el-button size="small" @click="addShow">添加</el-button>
      <el-button size="small" @click="removeAll">删除</el-button>
    </div>
    <el-table :data="data" border stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in config.dataList" :prop="item.key" :key="item.key" :label="item.label" v-if="item.showTable" :formatter="(row, column, cellValue, index)=>{
          return formatter(row, column, cellValue, index, item)
        }">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button icon="el-icon-more" circle size="small"></el-button>
          <el-button icon="el-icon-edit" @click="editShow(scope.$index, scope.row)" circle size="small"></el-button>
          <el-button icon="el-icon-delete" @click="deleteOne(scope.$index, scope.row)" circle size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加"
      :visible.sync="addVisible"
      width="80%">
      <mlform ref='addForm' :config="config" v-model="userInput"></mlform>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd" size="small">取 消</el-button>
        <el-button type="primary" @click="add" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改"
      :visible.sync="editVisible"
      width="80%">
      <mlform ref='editForm' :config="config" v-model="userInput"></mlform>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEdit" size="small">取 消</el-button>
        <el-button type="primary" @click="edit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//import component from "@/"
import mlform from "@/components/common/form"
import { copyObj } from "@/utils"
export default {
  name: "mstable",
  components: { mlform },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      addVisible: false,
      editVisible: false,
      editIndex: null,
      userInput: {},
      searchInput: {},
      data: [],
      multipleSelection: [],  //多选
    };
  },

  created() {
    this.data = [
        {
          id: 1,
          name: "问您但是发送到发送到发士大夫撒地方撒旦法爱仕达啥多奥术大师大所大阿诗丹顿多多多多多多多多多多多多多多多多多多多阿诗丹顿多多多多多多多多多多多多多多多多多多多多多",
          class: "三年二班",
          age: ["1","2"],
        },
        {
          id: 2,
          name: "问您1",
          class: "三年二班",
          age: ["1"],
        },
        {
          id: 3,
          name: "问您2",
          class: "三年二班",
          age: "2",
        },
      ]
  },

  mounted() {},

  methods: {
    //新增
    addShow() {
      this.addVisible = true
    },
    closeAdd() {
      this.userInput = {}
      this.addVisible = false
    },
    add() {
      if (this.$refs.addForm.validate()) {
        this.data.push(this.userInput)
        this.closeAdd()
      }
    },

    // 删除
    deleteOne(index, row) {
      this.data.splice(index,1)
    },
    removeAll() {
      this.multipleSelection.forEach(obj => {
        this.data.splice(this.data.findIndex(item => item[this.config.tableKey] === obj[this.config.tableKey]), 1)
      });
    },
    //获取选择的项
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改
    editShow(index, row) {
      this.editIndex = index
      this.userInput = row
      this.editVisible = true
    },
    closeEdit() {
      this.userInput = {}
      this.editVisible = false
    },
    edit() {
      if (this.$refs.editForm.validate()) {
        this.data[this.editIndex] = this.userInput
        this.closeEdit()
      }
    },
    //查询
    resetSearch() {
      this.$refs.searchForm.reset()
    },
    search() {
      console.log('点击了查询');
    },
    //表单显示过滤，将单选，下拉的值转换为文字
    formatter(row, column, cellValue, index, config) {
      if (config.type == "select" || config.type == "radio" || config.type == "checkbox") {
        if (!Array.isArray(cellValue)) {
          cellValue = [cellValue]
        }
        let val = []
        config.options.filter(obj => cellValue.filter(val => val == obj.value).length>0).forEach(obj => {
          val.push(obj.label)
        });
        return val.join(',')
      }else{
        return cellValue
      }
      
    },
  },

  computed: {
    selectConfig() {
      let config = Object.assign({inline: true,"labelWidth": "100px", inputWidth: "33.33%",dataList: []}, copyObj(this.config))
      let dataList = config.dataList.filter(obj => obj.tableSearch)
      dataList.forEach(obj => obj.value = obj.tableSearchDefault)
      config.dataList = dataList || []
      console.log(config,this.config);
      return config
    }
  },
  activated() {}
};
</script>

<style lang='scss' scoped>
  .btn-box{
    padding: 0 10px 10px;
  }
  .search-box{
    @include inline(1);
    padding-right: 20px;
  }
</style>