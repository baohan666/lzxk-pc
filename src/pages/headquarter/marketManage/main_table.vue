<template>
    <div>
      <table width="100%" style="border-collapse:collapse;table-layout:fixed;"  border="1">
        <thead>
          <tr height="40px">
            <td colspan="2" width="100%">需要回款的商品 <span v-if="!isView" class="addMain" @click="addMain">添加需回款商品</span></td>
          </tr>
        </thead>
        <tbody id="z_tbody">
          <tr height="50px">
            <td width="50%">主品</td>
            <td width="50%">回款商品数量</td>
          </tr>
          <template v-if="items.length>0">
            <template v-for="(item,index) in items">
              <mainInput @delItem="delItem" :isView="isView" :item="item" :key="'mainInput'+index"></mainInput>
            </template>
          </template>
          <template v-else>
            <tr height="40px">
              <td colspan="2" width="100%" class="grey">请添加需回款商品</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
</template>
<script>
  import mainInput from 'src/pages/headquarter/marketManage/main_input';
    export default{
        components: {
          mainInput
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
            addMain(){
                this.$emit("selectAwardGoods",{handleType:1});
            },
            delItem(id){
                 this.$emit("delItem",{goodId:id,handleType:1})
            }
        },
        computed: {},
        watch: {}
    }
</script>
<style scoped>
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
  .addMain{
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
