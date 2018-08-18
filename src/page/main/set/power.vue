<template>
  <div>
    <mltable :config="config" :data="data"></mltable>
  </div>
</template>

<script>
import mltable from "@common/table"
export default {
  components: { mltable, },
  props: {},
  data () {
    return {
      config:  {
        "inline": true, "labelWidth": "100px", inputWidth: "33.33%",tableKey:"id",
        dataList: [ { "type": "string", "label": "姓名n", "key": "name", "tableSearch": true,"tableSearchDefault": "一", "value": null, "show": null, "placeholder": null, "error": null, "reg": null, "prepend": null, "append": null, "remark": null, "width": null, "min": null, "max": null, "showTable": true, "block": false, "must": true, "readonly": false, "disabled": false }, { "type": "string", "label": "班级", "key": "class", "value": null, "show": null, "placeholder": null, "error": null, "reg": null, "prepend": null, "append": null, "remark": null, "width": null, "min": null, "max": null, "showTable": true, "block": false, "must": false, "readonly": false, "disabled": false },
                 { "type": "select", "label": "年级", "key": "age", "value": null, "show": null, "placeholder": null, "error": null, "reg": null, "prepend": null, "append": null, "remark": null, "width": null, "min": null, "max": null, "showTable": true, "block": false, "must": false, "readonly": false, "disabled": false, "options": [ { "label": "一级", "value": "1" }, { "label": "二级", "value": "2" } ] } ],
      },
      data: [
        {
          name: "问您",
          class: "三年二班",
          age: ["1","2"],
        },
        {
          name: "问您1",
          class: "三年二班",
          age: ["1"],
        },
        {
          name: "问您2",
          class: "三年二班",
          age: "2",
        },
      ]
    }
  },

  created() {},

  mounted() {},

  methods: {},

  computed: {},
  activated() {},
}
</script>

<style lang='scss' scoped>
  
</style>