<template>
  <div class="page">
    <el-row :gutter="10">
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fm-header{
  height: 50px;
  box-shadow: 0 2px 10px rgba(70,160,252, 0.6);
  padding: 0 10px;
  background-image: linear-gradient(to right,#1278f6,#00b4aa);
  position: relative;
  text-align: left;

  .fm-logo{
    height: 26px;
    vertical-align: middle;
  }
  .fm-title{
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 6px;
  }
  .fm-link{
    height: 50px;
    float: right;
    
    a{
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      line-height: 50px;
      font-weight: 500;
      margin-left: 10px;
      
      &:hover{
        opacity: 0.8;
      }
    }
  }
}
.fm-container{
  height: calc(100% - 50px);
}
</style>
