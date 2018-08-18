<template>
  <div class="map-chose">
    <el-input class="map-chose-show" type="text" :placeholder="config.placeholder" :style="{width: config.width}" readonly="true" :value="adr">
      <template slot="prepend" v-if='config.prepend'>{{config.prepend}}</template>
      <template slot="append" v-if='config.append'>{{config.append}}</template>
    </el-input>
    <mlmap class="map" ref="map" :init="initMap"></mlmap>
  </div>
</template>

<script>
import {loadSource, } from "@/utils"
import mlmap from "@common/map"
//import component from "@/"
export default {
  name: "map-chose",
  components: {mlmap},
  props: {
    value:{},
    config:{
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      adr: null,
      map: null,
    }
  },

  created() {

     
    //http://api.map.baidu.com/api?v=2.0&ak=l4aUB0y5tI5bFfGbZUScijxkR26mMzI1
    // loadSource("http://api.map.baidu.com/getscript?v=2.0&ak=l4aUB0y5tI5bFfGbZUScijxkR26mMzI1&services=&t=20180629105709").then(()=>{
    //   // 百度地图API功能
       




    //   // var point = new BMap.Point(116.400244,39.92556);
    //   // map.centerAndZoom(point, 12);
    //   // var marker = new BMap.Marker(point);  // 创建标注
    //   // map.addOverlay(marker);              // 将标注添加到地图中
    //   // marker.addEventListener("click",getAttr);
    //   // function getAttr(){
    //   //   var p = marker.getPosition();       //获取marker的位置
    //   //   alert("marker的位置是" + p.lng + "," + p.lat);   
    //   // }
    // })
  },

  mounted() {
     this.$refs.map.getAsync().then((map) => {
      this.map = map
      this.map.addEventListener("click", this.choseMap);
    })
  },

  methods: {
    initMap(map) {
      var geolocation = new BMap.Geolocation();
      let _this = this
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          _this.setPoint(r.point)
          _this.getAdrDetail(r.address, r.point)
          // alert('您的位置：'+r.point.lng+','+r.point.lat);
        }
        else {
          console.log('failed'+this.getStatus());
        }        
      },{enableHighAccuracy: true})
      //关于状态码
      //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
      //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
      //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
      //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
      //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
      //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
      //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
      //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    },
    setPoint(point) {
      this.map.clearOverlays(); 
      var mk = new BMap.Marker(point);
      this.map.addOverlay(mk);
      this.map.panTo(point);
    },
    getLocation(x,y) {
      let geoc = new BMap.Geocoder()
      let point = new BMap.Point(x,y)
      geoc.getLocation(point, rs => {
        this.getAdrDetail(rs.addressComponents, point)
      })
    },
    getAdrDetail(adr,point) {
      if(adr.province==adr.city)
      {
        this.adr=adr.city + adr.district +adr.street+adr.streetNumber;//+ adr.district 
      } else {
        this.adr=adr.province+adr.city+ adr.district  + adr.street + adr.streetNumber; //+ adr.district 
      }
      // _this.adr = r.address.province + r.address.city + r.address.street + r.address.street_number
      this.$emit('input', [point.lat, point.lng])
    },
    
    choseMap(e){
      this.getLocation(e.point.lng, e.point.lat)
      this.setPoint(e.point)
    },
  },
  watch: {
    value(val) {

    }
  },
  computed: {},
  activated() {},
}
</script>

<style lang='scss' scoped>
.map-chose{
  .map-chose-show{
    width: 220px;
  }
  .map{
    margin-top: 10px;
    width: 600px;
    height: 300px;
  }
}
  
</style>