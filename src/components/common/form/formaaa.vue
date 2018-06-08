<el-form :model="formData">
        <div v-for="(item,key) in jsonSchema.properties">
          <!--单层-->
          <el-form-item :label="item.title" v-if="item.type=='string'">
            <el-input v-model="formData[key]"></el-input>
          </el-form-item>
          <el-form-item :label="item.title" v-if="item.type=='integer'">
            <el-input v-model="formData[key]"></el-input>
          </el-form-item>
          <el-form-item :label="item.title" v-if="item.type==='boolean'">
            <el-switch v-model="formData[key]"></el-switch>
          </el-form-item>
          <!--单层 end-->
          <!--嵌套array-->
          <div v-if="item.type==='array'">
            <div class="array-title">
              <p class="array-title-text">
                <span>{{item.title}}</span>
              </p>
              <p>
                <el-button @click="addBtnClick(item.items.properties,key)">＋添加</el-button>
              </p>
            </div>
            <div class="array-content" v-for="(initem,index) in formData[key]">
              <!--array对象-->
              <div class="array-obj">
                <div v-for="(i,k) in item.items.properties">
                  <el-form-item :label="i.title" v-if="i.type==='string'">
                    <el-input v-model="initem[k]"></el-input>
                  </el-form-item>
                  <el-form-item :label="i.title" v-if="i.type==='number'">
                    <el-input-number v-model="initem[k]"></el-input-number>
                  </el-form-item>
                  <el-form-item :label="i.title" v-if="i.type==='boolean'">
                    <el-switch v-model="initem[k]"></el-switch>
                  </el-form-item>
                </div>
              </div>
              <!--array对象 end-->
              <!--操作按钮-->
              <div class="array-btns">
                <p>
                  <el-button @click="moveBtnClick(index,index-1,key)" :disabled="index==0">上移</el-button>
                </p>
                <p>
                  <el-button @click="moveBtnClick(index,index+1,key)" :disabled="index==formData[key].length-1">下移</el-button>
                </p>
                <p>
                  <el-button @click="delBtnClicl(index,key)">删除</el-button>
                </p>
              </div>
              <!--操作按钮 end-->
            </div>
          </div>
          <!--嵌套array end-->
        </div>
        <div style="padding-top:5px;">
          <el-form-item>
            <el-button @click="submitBtnClick">提交</el-button>
          </el-form-item>
        </div>
      </el-form>


      jsonSchema: {
          "title": "测试配置",
          "type": "object",
          "required": [
              "title"
          ],
          "properties": {
              "title": {
                  "type": "string",
                  "title": "Task list title"
              },
              "tasks": {
                  "type": "array",
                  "title": "Tasks",
                  "items": {
                      "type": "object",
                      "required": [
                          "title"
                      ],
                      "properties": {
                          "title": {
                              "type": "string",
                              "title": "Title",
                              "description": "A sample title"
                          },
                          "details": {
                              "type": "string",
                              "title": "Task details",
                              "description": "Enter the task details"
                          },
                          "done": {
                              "type": "boolean",
                              "title": "Done?",
                              "default": false
                          }
                      }
                  }
              }
          }
      },
      formData: {
          "title": "标题",
          "tasks": [
              {
                  "title": "名称",
                  "details": "13123",
                  "done": true
              }
          ]
      }

      
      inputData:[
        {
          type: 'string',//
          key: 'name',    //输出的key
          readonly: false,//只读 
          disabled: false,//不可操作
          must: true, //必填
          value: '', //默认值
          placeholder: '请输入用户名', //
          label: '用户名', //输入框前显示
          error: '请输入活动名称', //输入不符合时的提示
          reg: '',//正则
          show: '',//什么情况下显示
          min: 1, //最小字符数 
          max: 10, //最大字符数
        },
      ],
      typeInfo: [
        {  
          "value": "string",
          "label": "字符串",
        },
        {  
          "value": "phone",
          "label": "手机号",
        },
        {  
          "value": "mail",
          "label": "邮箱",
        },
        {  
          "value": "bankCode",
          "label": "银行卡号",
        },
        {  
          "value": "idCard",
          "label": "身份证号",
        },
        {  
          "value": "number",
          "label": "数字",
        },
        {  
          "value": "text",
          "label": "文本域",
        },
        {  
          "value": "boolean",
          "label": "布尔(是否)",
        },
        {  
          "value": "password",
          "label": "密码",
        },
        {  
          "value": "radio",
          "label": "单选",
        },
        {  
          "value": "checkbox",
          "label": "多选",
        },
        {  
          "value": "select",
          "label": "下拉",
        },
        {  
          "value": "date",
          "label": "日期",
        },
        {  
          "value": "time",
          "label": "时分秒时间点",
        },
        {  
          "value": "dateTime",
          "label": "具体时间点",
        },
        {  
          "value": "datetimerange",
          "label": "日期范围",
        },
        {  
          "value": "timerange",
          "label": "时间范围",
        },
        {  
          "value": "upload",
          "label": "图片上传"
        },
        {  
          "value": "color",
          "label": "颜色选择"
        },
        {  
          "value": "address",
          "label": "地址选择"
        },
        {  
          "value": "editor",
          "label": "富文本编辑"
        },
        {  
          "value": "array",
          "label": "可增加单个输入类型",
        },
        {  
          "value": "arrayObj",
          "label": "可增加对象输入",
        },
      ]