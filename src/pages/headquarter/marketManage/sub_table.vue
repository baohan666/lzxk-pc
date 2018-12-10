<template>
  <div class="content">
    <table width="100%" style="border-collapse:collapse;table-layout:fixed;"  border="1">
      <thead>
      <tr height="40px">
        <td colspan="4" width="100%">奖励的商品 <span v-if="!isView" @click="addSub" class="addSub">添加奖励商品</span></td>
      </tr>
      </thead>
      <tbody id="z_tbody">
      <tr height="50px">
        <td width="25%">奖励商品</td>
        <td width="25%">奖励数量</td>
        <td width="25%">折后价</td>
        <td width="25%">指定批号</td>
      </tr>
      <template v-if="items.length>0">
        <template v-for="(item,index) in items">
          <subInput @delItem="delItem" :isView="isView" :item="item" :key="'subInput'+index"></subInput>
        </template>
      </template>
      <template v-else>
        <tr height="40px">
          <td colspan="4" width="100%" class="grey">请添加奖励商品</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>
<script>
  import subInput from 'src/pages/headquarter/marketManage/sub_input';
  export default{
    components: {
      subInput
    },
    props: {
      items:{},
      isView:{}
    },
    data(){
      return {}
    },
    created(){
    },
    methods: {
      addSub(){
          this.$emit('selectAwardGoods',{handleType:2});
      },
      delItem(id){
        this.$emit("delItem",{goodId:id,handleType:2})
      }
    },
    computed: {},
    watch: {}
  }
</script>
<style scoped>
  .content{
    margin-top:20px;
  }
  table{
    width:100%;
    border: 1px solid #eae2e0;
    border-radius: 4px;
  }
  td{
    text-align: center;
    padding: 12px 0;
  }
  thead{
    background-color: #ebeefb;
  }
  input{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    width:60%;
  }
  .addSub{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .grey{
    color: #ccc;
  }
</style>
