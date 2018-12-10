<template>
  <tr height="50px">
    <td width="25%">
      <div>{{item.goodsName}}<span v-if="!isView" @click = "del" class="viewRemark">删除</span></div>
      <div>{{item.specsMax}}</div>
    </td>
    <template  v-if="isView">
      <td width="25%">
        {{item.awardNum}}
      </td>
      <td width="25%">
        {{item.afterDiscountPrice}}
      </td>
      <td width="25%">
        {{item.batchNumber}}
      </td>
    </template>
    <template v-else>
      <td width="25%">
        <input class="tableInput" v-vue-onkeypress v-model="item.awardNum" type="number" oninput="if(value.length>8)value=value.slice(0,8)"/>
      </td>
      <td width="25%">
        <input class="tableInput" type="number" oninput="if(value.length>8)value=value.slice(0,8)" v-model="item.afterDiscountPrice"/>
      </td>
      <td width="25%">
        <input class="tableInput" v-model="item.batchNumber" maxlength="100">
      </td>
    </template>
  </tr>
</template>
<script>
    export default{
        components: {},
        props: {
          item:{},
          isView:{}
        },
        data(){
            return {
              awardNum:""//奖励数量
              ,price:""//折后价
              ,num:""//指定批号
            }
        },
        created(){
        },
        methods: {
          del(){
            this.$emit("delItem",this.$props.item.goodsId)
          }
        },
        computed: {},
        watch: {}
    }
</script>
<style scoped>
  td{
    text-align: center;
    padding: 12px 0;
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
  .viewRemark{
    margin-left:10px;
    color : #1f5dbc;
    font-size:14px;
  }
  div{
    color: #555;
    font-size:15px;
  }
</style>
