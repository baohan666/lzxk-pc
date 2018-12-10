<template>
	<div>
		<div class ="addressWraper">
			<el-select v-model="provinceCode" class="el-select-address" placeholder="请选择省区" ref="provin" @change = "currentPro">
			    <el-option
			      v-for="(item, index) in provinceArray"
			      :key="item.id"
			      :label="item.text"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-select v-model="cityCode" class="el-select-address" placeholder="请选择地区" @change = "currentCity">
			    <el-option
			      v-for="(item, index) in cityArray"
			      v-if = "item.parentId == provinceCode"
			      :key="item.id"
			      :label="item.text"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-select v-model="countyCode" class="el-select-address" placeholder="请选择县区" @change = "currentCounty">
			    <el-option
			      v-for="(item, index) in countyArray"
			      v-if = "item.parentId == cityCode"
			      :key="item.id"
			      :label="item.text"
			      :value="item.value">
			    </el-option>
			</el-select>
		</div>
	</div>
</template>

<script>
	import {getStore,setStore} from 'src/config/cache' 
	import {getAddressData, } from 'src/api/api_components'
	export default{
		props: [
			'getProvince','getCounty', 'getCity', 'required'
		],
		data(){
			return{
				provinceArray:[],//省区数据
				provinceCode: '',//选择省区code
				provinceName: '',//选择省区文本
				cityArray:[],//市区数据
				cityCode: '',//选择市区code
				cityName:'',//选择市区文本
				countyArray:[],//县区数据
				countyCode: '',//选择县区code
				countyName:'',//选择县区文本
			}
		},
		 watch: {
	        getProvince(val) {
				this.provinceCode=Number(val);
				this.$props.getCity!='' ? this.cityCode = parseInt(this.$props.getCity) : this.cityCode = '';
				this.$props.getCounty!= '' ? this.countyCode = parseInt(this.$props.getCounty) :this.countyCode ='';
	        }
	
		},
		created(){
			this.init();
		},
		methods: {
			//初始化加载省地县数据并缓存；
			init: function(){
				//从缓存中获取省地县数据，否则重新请求加载
				
				if(getStore('provinceArray')){
					this.provinceArray = JSON.parse(getStore('provinceArray'));
					this.cityArray = JSON.parse(getStore('cityArray'));
					this.countyArray = JSON.parse(getStore('countyArray'));
				}else{
					getAddressData().then(res => {
						this.provinceArray = res.data.data.provinceArray;
						this.cityArray = res.data.data.cityArray;
						this.countyArray = res.data.data.countyArray;
						setStore("provinceArray", this.provinceArray);
						setStore("cityArray", this.cityArray);
						setStore("countyArray", this.countyArray);
					})
				}
				if(this.$props.getProvince){
					this.provinceCode = this.$props.getProvince ;
					this.cityCode = this.$props.getCity;
					this.countyCode = this.$props.getCounty;
				}
				
			},
			//选择省区，加载对应市区
			currentPro: function($val){console.log($val);
				this.cityCode = '';
				this.countyCode = '';
				let obj = {};
		        obj = this.provinceArray.find((item)=>{
		            return item.value === $val;
		        });
          		this.provinceName = obj.text;console.log(this.required);
          		/*if(this.required==true){
          			this.$emit('seleSuccess',{'msg':"请选择市和县"});	
          		}else{*/
          			this.$emit('seleSuccess',{ provinceName : this.provinceName, 'countyName': this.countyName, 'provinceCode': this.provinceCode, 'cityCode': this.cityCode, 'countyCode':this.countyCode});
//        		}
			},
			//选择省区，加载对应县区
			currentCity: function($val){
				this.countyCode = '';
				let obj = {};
		        obj = this.cityArray.find((item)=>{
		            return item.value === $val;
		        });
          		this.cityName = obj.text;
          		/*if(this.required==true){
          			this.$emit('seleSuccess',{'msg':"请选择县"});
          		}else{*/
          			this.$emit('seleSuccess',{ provinceName : this.provinceName,'cityName': this.cityName, 'countyName': this.countyName, 'provinceCode': this.provinceCode, 'cityCode': this.cityCode, 'countyCode':this.countyCode});
          		/*}*/
          			
			},
			//选择县区
			currentCounty: function($val){
				let obj = {};
		        obj = this.countyArray.find((item)=>{
		            return item.value === $val;
		        });
          		this.countyName = obj.text;
          		
          		this.$emit('seleSuccess',{'msg':'ok', provinceName : this.provinceName, 'cityName': this.cityName, 'countyName': this.countyName, 'provinceCode': this.provinceCode, 'cityCode': this.cityCode, 'countyCode':this.countyCode});	
			}
			
		}
	}
	
</script>
<style>

	.el-select-address{
		width:120px;
		.el-input__inner{
			padding:0 10px;
		}
	}

	
</style>
