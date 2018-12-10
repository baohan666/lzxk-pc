<template>
	<div>
		<el-date-picker
			v-if = "startIsShow"
			v-model="startDate"
			type="date"
			class="is-required"
			placeholder="选择时间"
			:picker-options="pickerOptionStar"
			@change = "(value) => changeHandler(value, 'startDate')">
		</el-date-picker>

		<div v-if = "endIsShow" class="div-inline">-</div>
		<el-date-picker
			v-if = "endIsShow"
			v-model="endDate"
			type="date"
			placeholder="选择时间"
			:picker-options="pickerOptionEnd"
			@change = "(value) => changeHandler(value, 'endDate')">
		</el-date-picker>
	</div>
</template>

<script>
	import {getStore,setDepartment} from 'src/config/cache'
	export default{
		props: ['startIsShow', 'endIsShow', 'starTim', 'endTim'],
		data(){
			return{
				startDate: this.$props.starTim,
				endDate: this.$props.endTim,
				pickerOptionStar: {  //开始日期范围
          disabledDate: (time) => {
             let endTime = this.endDate;
             if (endTime) {
                return time.getTime() > endTime;
              }
          }
        },
        pickerOptionEnd: {  //结束日期范围
          disabledDate: (time) => {
             let starTime =this.startDate;
             if (starTime) {
                return time.getTime() < starTime;
             }
          }
        }
			}
		},
		watch:{
			starTim(val) {
				this.startDate = val;
      },
      endTim(val){
        this.endDate = val;
      }
		},
		created(){
			this.init();
		},
		methods: {
			init(){
				console.log(this.startDate)
			},

			//将国际标准日期格式转化为 yyyy-MM-dd
			transformDate : function($val){
			  if($val){
          let date = $val;
          if(date ==""){return ""};
          let month = (date.getMonth() + 1).toString().padStart(2,'0');
          let strDate = date.getDate().toString().padStart(2,'0');
          //时间格式yyyy-MM-dd
          return  date.getFullYear()+'-'+month+'-'+strDate;
        }else{
			    return '';
        }
			},
			changeHandler(val,item){
				let data = this.transformDate(val);
				this.$emit("changeSelect",{type:item,data:data});
			}
		}
	}
</script>

<style>
</style>
