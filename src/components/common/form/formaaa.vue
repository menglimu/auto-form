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