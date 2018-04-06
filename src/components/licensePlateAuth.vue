<template>
  <div class="content">
  	<header class="head">
			<a class="ico back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">车牌车驾认证</h1>
      <span class="text">保存</span>
		</header>
		<div class="main plg">
			 <div class="y-bindphone">
            <ul>              
              <li>
                <span>认证名称</span>
                <input type="text" name="" placeholder="请输入" value="车牌车驾认证" class="txt">
              </li>                  
            </ul>
        </div>
        <div class="reg-upload">
            <p class="title">上传证件：</p>
            <div class="load-row">
                <div class="imgbox">
                    <img src="../assets/images/login_license.png">
                    <div class="imgmask">
                        <p class="imtips">点击查看大图</p>
                    </div>
                </div>                
            </div>
            <div class="load-row">                
                <div class="uploadbtn mr">
                    <img src="../assets/images/home_icon_upload.png" class="add">
                    <p class="pt">行驶证正面</p>
                    <input type="file" name="">
                </div>
                <div class="uploadbtn">
                    <img src="../assets/images/home_icon_upload.png" class="add">
                    <p class="pt">行驶证反面</p>
                    <input type="file" name="">
                </div>
            </div>
        </div>
        <!-- <div class="bigImgBox">
            <img src="http://placehold.it/350x150">
        </div> -->
		</div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      
    }
  },
  created(){
    
  },
  mounted(){
    
  },
  methods: {
    
  }

}
</script>

