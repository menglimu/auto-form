import Qs from 'qs'
export default{

	  // url: '/route',
	  // baseURL: 'http://weixin.wahama.cn/index.php?s=/addon/Shop/WapApi/', 
	  baseURL: process.env.API_ROOT+'/index.php?s=/addon/Shop/WapApi/',
	  // baseURL: 'https://h5.msyidai.com/loan/getLoanList',
	  
	  method: 'POST',
	  
	  transformRequest: [function (data) {
	    //为了避免qs格式化时对内层对象的格式化先把内层的对象转为
	    // data = data || {}
	    data.CustData = JSON.stringify(data.CustData);
	    //由于使用的form-data传数据所以要格式化
	    data = Qs.stringify(data);
	    return data;
	  }],

	  
	  transformResponse: [function (data) {
	    
	    return data;
	  }],

	  headers: {'Content-Type':'application/x-www-form-urlencoded'},

	  
	  params: {
	    // eid:8484662,
	    // openid:'57c80528e4b07e300ed4ffbb',
	    // pubacckey:'',
	    // timestamp:'',
	    // nonce:'',
	    // pubaccid:'',
	    // shop_id: 1
	  },

	  
	  paramsSerializer: function(params) {
	    return Qs.stringify(params)
	  },

	  
  	data: {
	    shop_id: 1,
    	mid: 1,
    	publicid: 4,
    	// url: window.location.href
  	},

	  
	timeout: 1000,

	  
	withCredentials: false, // default

	  
	responseType: 'json', // default

	 
	  
	// onUploadProgress: function (progressEvent) {
	//     // Do whatever you want with the native progress event
	//     console.log(1);
	// },

	  
	// onDownloadProgress: function (progressEvent) {
	//     // Do whatever you want with the native progress event
	//     console.log(2);
	// },

	  
	maxContentLength: 2000,

	  
	validateStatus: function (status) {
	    return status >= 200 && status < 300; // default
	},

	  
	maxRedirects: 5, // default
	 // proxy: { 
		//  host: 'http://weixin.wahama.cn/index.php?s=/addon/Shop/WapApi/',
		//  port: 80,
		//  auth: {
		// 	 username: 'aa',
		// 	 password: '2123'
		// }
	 // }
}
