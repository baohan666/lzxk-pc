<template>
  <tr height="50px">
    <td width="50%">
      <div>{{item.goodsNamem}}<span v-if="!isView" @click = "del" class="viewRemark">删除</span></div>
      <div>{{item.specsMaxm}}</div>
    </td>
    <td width="50%">
      <template  v-if="isView">
        {{item.collectionNum}}
      </template>
      <template v-else>
        <input class="tableInput" v-vue-onkeypress v-model="item.collectionNum" type="number" oninput="if(value.length>8)value=value.slice(0,8)"/>
      </template>
    </td>
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
              awardNum:''
            }
        },
        created(){
        },
        methods: {
          del(){
              this.$emit("delItem",this.$props.item.goodsIdm)
          }
        },
        computed: {},
        watch: {}
    }
</script>
<style scoped>
  input{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    width: 60%;
  }
  td{
    text-align: center;
    padding: 12px 0;
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
