import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


// 懒加载方式，当路由被访问的时候才加载对应组件
const login = () => import('components/login')

const home = () => import('pages/home')

//zongbu
//商品管理--总部

const onsaleGoodsZB = () => import('pages/headquarter/goodsManage/onsaleGoods')
const removeGoodsZB = () => import('pages/headquarter/goodsManage/removeGoods')
const uploadGoodsZB = () => import('pages/headquarter/goodsManage/uploadGoods')
const researchGoodsZB = () => import('pages/headquarter/goodsManage/researchGoods')
const priceManageZB = () => import('pages/headquarter/goodsManage/priceManage')
const applicationFormZB = () => import('pages/headquarter/goodsManage/applicationForm')

const view_onsaleGoodsZB = () => import('pages/headquarter/goodsManage/view_onsaleGoods')
const viewDetail_GoodsZB = () => import('pages/headquarter/goodsManage/viewDetail_Goods')
const edit_removeGoodsZB = () => import('pages/headquarter/goodsManage/edit_removeGoods')
const view_researGoodsZB = () => import('pages/headquarter/goodsManage/view_researGoods')

const changePriceZB = () => import('pages/headquarter/goodsManage/changePrice')
const changePartPriceZB = () => import('pages/headquarter/goodsManage/changePartPrice')
const applyFormDeataiZB = () => import('pages/headquarter/goodsManage/applyFormDeatai')

const batChangePriceZB = () => import('pages/headquarter/goodsManage/batChangePrice')

//客户管理--总部
const businessCompanyManageZB = () => import('pages/headquarter/customerManage/businessCompanyManage')
const terminalCustomerManageZB = () => import('pages/headquarter/customerManage/terminalCustomerManage')

const creatBusiCompanyZB = () => import('pages/headquarter/customerManage/creatBusiCompany')
const viewBusiCompanyZB = () => import('pages/headquarter/customerManage/viewBusiCompany')
const viewterminCustomerZB = () => import('pages/headquarter/customerManage/viewterminCustomer')
const editBusCompanyZB = () => import('pages/headquarter/customerManage/editBusCompany')



//订单管理--总部
const provinceOrderZB = () => import('pages/headquarter/orderManage/provinceOrder')
const countyOrderZB = () => import('pages/headquarter/orderManage/countyOrder')
const policyReplenishmentZB = () => import('pages/headquarter/orderManage/policyReplenishment')
const zhiyiPurchaseOrderZB = () => import('pages/headquarter/orderManage/zhiyiPurchaseOrder')
const provinceOwngoodsManageZB = () => import('pages/headquarter/orderManage/provinceOwngoodsManage')
const proOrderBillZB  = () => import('pages/headquarter/orderManage/proOrderBill')
const proOrderSendGoodsZB  = () => import('pages/headquarter/orderManage/proOrderSendGoods')
const countyOrderDetailZB = () => import('pages/headquarter/orderManage/countyOrderDetail')
const provinceOrderDetailZB = () => import('pages/headquarter/orderManage/provinceOrderDetail')
const policyOweDetailZB = () => import('pages/headquarter/orderManage/policyOweDetail')
//营销管理--总部
const promotionPolicyZB = () => import('pages/headquarter/marketManage/promotionPolicy')
const view_promoPolicyZB = () => import('pages/headquarter/marketManage/view_promoPolicy')
const add_promoPolicyZB = () => import('pages/headquarter/marketManage/add_promoPolicy')
const edit_promoPolicyZB = () => import('pages/headquarter/marketManage/edit_promoPolicy')
const meetingManageZB = () => import('pages/headquarter/marketManage/meetingManage')
const meetingManageDetailZB = () => import('pages/headquarter/marketManage/meetingManageDetail')


//人员管理--总部
const addressListZB = () => import('pages/headquarter/personalManage/addressList')
const areaManageZB = () => import('pages/headquarter/personalManage/areaManage')
const feedBackZB = () => import('pages/headquarter/personalManage/feedBack')
const PersonnelApplicationZB = () => import('pages/headquarter/personalManage/PersonnelApplication')
const viewDetailPAZB = () => import('pages/headquarter/personalManage/viewDetailPA')
const viewDetailPAeditZB = () => import('pages/headquarter/personalManage/viewDetailPAedit')
const salesScopeZB = () => import('pages/headquarter/personalManage/salesScope')
const salesStaffZB = () => import('pages/headquarter/personalManage/salesStaff')

const detailFeedbackZB = () => import('pages/headquarter/personalManage/detailFeedback')
//库存管理--总部
const provinceStockZB = () => import('pages/headquarter/stockManage/provinceStock')
const provinStockLogZB = () => import('pages/headquarter/stockManage/provinStockLog')


//财务管理--总部
const provinceRetuenMoneyZB = () => import('pages/headquarter/financialManage/provinceRetuenMoney')
const provinceRetuenMoneyDetailZB = () => import('pages/headquarter/financialManage/provinceRetuenMoneyDetail')

//权限管理--总部
const roleManageZB = () => import('pages/headquarter/authorityManage/roleManage')
const accountManageZB = () => import('pages/headquarter/authorityManage/accountManage')

//省区
//商品管理--省区
const onsaleGoodsSQ = () => import('pages/province/goodsManage/onsaleGoods')
const researchGoodsSQ = () => import('pages/province/goodsManage/researchGoods')
const priceManageSQ = () => import('pages/province/goodsManage/priceManage')
const applicationFormSQ = () => import('pages/province/goodsManage/applicationForm')

const viewDetail_GoodsSQ = () => import('pages/province/goodsManage/viewDetail_Goods')
const view_researGoodsSQ = () => import('pages/province/goodsManage/view_researGoods')
const changePriceSQ = () => import('pages/province/goodsManage/changePrice') //修改省区定价详情页
const batChangeSQ = () => import('pages/province/goodsManage/batChangePrice') //修改省区定价详情页 按区域
const applyFormDeataiSQ = () => import('pages/province/goodsManage/applyFormDeatai')// 省区 改价申请单 详情


//订单管理--省区
const policyReplenishmentSQ = () => import('pages//province//orderManage/policyReplenishment')
const OwngoodsManageSQ = () => import('pages/province/orderManage/OwngoodsManage')
const saleOrderSQ = () => import('pages/province/orderManage/saleOrder')
const setReturnMoneySQ = () => import('pages/province/orderManage/setReturnMoney')

const saleOrderDetailSQ = () => import('pages/province/orderManage/saleOrderDetail')

//客户管理--省区
const terminalCustomerManageSQ = () => import('pages/province/customerManage/terminalCustomerManage')
const viewterminCustomerSQ = () => import('pages/province/customerManage/viewterminCustomer')
//营销管理--省区
const promotionPolicySQ = () => import('pages/province/marketManage/promotionPolicy')
const meetingManageSQ = () => import('pages/province/marketManage/meetingManage')
const meetingManageDetailSQ = () => import('pages/province/marketManage/meetingManageDetail')
const add_promoPolicySQ = () => import('pages/province/marketManage/add_promoPolicy')
const view_promoPolicySQ = () => import('pages/province/marketManage/view_promoPolicy')
const edit_promoPolicySQ = () => import('pages/province/marketManage/edit_promoPolicy')

//库存管理--省区

const provinceStockSQ = () => import('pages/province/stockManage/provinceStock')
const provinStockLogSQ = () => import('pages/province/stockManage/provinStockLog')


//人员管理--省区
const addressListSQ = () => import('pages/province/personalManage/addressList')
const areaManageSQ = () => import('pages/province/personalManage/areaManage')
const PersonnelApplicationSQ = () => import('pages/province/personalManage/PersonnelApplication')

const PersonnelApplicationDatailSQ = () => import('pages/province/personalManage/PersonnelApplicationDatail')


//财务管理--省区
const provinceRetuenMoneySQ = () => import('pages/province/financialManage/provinceRetuenMoney')
const provinceRetuenMoneyDetailSQ = () => import('pages/province/financialManage/provinceRetuenMoneyDetail')


//权限管理--省区
const roleManageSQ = () => import('pages/province/authorityManage/roleManage')
const accountManageSQ = () => import('pages/province/authorityManage/accountManage')

let router = new Router({
	routes: [{
			path: '/login',
			name: 'login',
			component: login
		},

		{
			path: '/',
			name: 'home',
			component: home,
			redirect: '/onsaleGoodsZB',
			children: [{
					path: '/onsaleGoodsZB',
					name: 'onsaleGoodsZB',
					components: {
						default: onsaleGoodsZB,
					}
				},
				{
					path: '/uploadGoodsZB',
					name: 'uploadGoodsZB',
					components: {
						default: uploadGoodsZB
					}
				},
				{
					path: '/researchGoodsZB',
					name: 'researchGoodsZB',
					components: {
						default: researchGoodsZB
					}
				},
				{
					path: '/removeGoodsZB',
					name: 'removeGoodsZB',
					components: {
						default: removeGoodsZB
					}
				},
				{
					path: '/priceManageZB',
					name: 'priceManageZB',
					components: {
						default: priceManageZB
					}
				},
				{
					path: '/applicationFormZB',
					name: 'applicationFormZB',
					components: {
						default: applicationFormZB
					}
				},
				{
					path: '/businessCompanyManageZB',
					name: 'businessCompanyManageZB',
					components: {
						default: businessCompanyManageZB
					}
				},
				{
					path: '/terminalCustomerManageZB',
					name: 'terminalCustomerManageZB',
					components: {
						default: terminalCustomerManageZB
					}
				},
				{
					path: '/provinceOrderZB',
					name: 'provinceOrderZB',
					components: {
						default: provinceOrderZB
					}
				},
				{
					path: '/countyOrderZB',
					name: 'countyOrderZB',
					components: {
						default: countyOrderZB
					}
				},

				{
					path: '/policyReplenishmentZB',
					name: 'policyReplenishmentZB',
					components: {
						default: policyReplenishmentZB
					}
				},
				{
					path: '/zhiyiPurchaseOrderZB',
					name: 'zhiyiPurchaseOrderZB',
					components: {
						default: zhiyiPurchaseOrderZB
					}
				},
				{
					path: '/provinceOwngoodsManageZB',
					name: 'provinceOwngoodsManageZB',
					components: {
						default: provinceOwngoodsManageZB
					}
				},
				{
					path: '/promotionPolicyZB',
					name: 'promotionPolicyZB',
					components: {
						default: promotionPolicyZB
					}
				},
				{
					path: '/meetingManageZB',
					name: 'meetingManageZB',
					components: {
						default: meetingManageZB
					}
				},
				{
					path: '/addressListZB',
					name: 'addressListZB',
					components: {
						default: addressListZB
					}
				},
				{
					path: '/areaManageZB',
					name: 'areaManageZB',
					components: {
						default: areaManageZB
					}
				},
				{
					path: '/feedBackZB',
					name: 'feedBackZB',
					components: {
						default: feedBackZB
					}
				},
				{
					path: '/PersonnelApplicationZB',
					name: 'PersonnelApplicationZB',
					components: {
						default: PersonnelApplicationZB
					}
				},
				{
					path: '/salesScopeZB',
					name: 'salesScopeZB',
					components: {
						default: salesScopeZB
					}
				},
				{
					path: '/salesStaffZB',
					name: 'salesStaffZB',
					components: {
						default: salesStaffZB
					}
				},

				{
					path: '/provinceStockZB',
					name: 'provinceStockZB',
					components: {
						default: provinceStockZB
					}
				},

				{
					path: '/provinceRetuenMoneyZB',
					name: 'provinceRetuenMoneyZB',
					components: {
						default: provinceRetuenMoneyZB
					}
				},
				{
					path: '/roleManageZB',
					name: 'roleManageZB',
					components: {
						default: roleManageZB
					}
				},
				{
					path: '/accountManageZB',
					name: 'accountManageZB',
					components: {
						default: accountManageZB
					}
				},
				{
					path: '/onsaleGoodsSQ',
					name: 'onsaleGoodsSQ',
					components: {
						default: onsaleGoodsSQ
					}
				},
				{
					path: '/researchGoodsSQ',
					name: 'researchGoodsSQ',
					components: {
						default: researchGoodsSQ
					}
				},
				{
					path: '/priceManageSQ',
					name: 'priceManageSQ',
					components: {
						default: priceManageSQ
					}
				},
				{
					path: '/applicationFormSQ',
					name: 'applicationFormSQ',
					components: {
						default: applicationFormSQ
					}
				},
				{
					path: '/promotionPolicySQ',
					name: 'promotionPolicySQ',
					components: {
						default: promotionPolicySQ
					}
				},
				{
					path:'/policyReplenishmentSQ',
					name:'policyReplenishmentSQ',
					components: {
						default: policyReplenishmentSQ
					}
				},
				{
					path: '/OwngoodsManageSQ',
					name: 'OwngoodsManageSQ',
					components: {
						default: OwngoodsManageSQ
					}
				},
				{
					path: '/saleOrderSQ',
					name: 'saleOrderSQ',
					components: {
						default: saleOrderSQ
					}
				},
				{
					path: '/setReturnMoneySQ',
					name: 'setReturnMoneySQ',
					components: {
						default: setReturnMoneySQ
					}
				},
				{
          path: '/terminalCustomerManageSQ',
          name: 'terminalCustomerManageSQ',
          components: {
            default: terminalCustomerManageSQ
          }
        },

				{
					path: '/meetingManageSQ',
					name: 'meetingManageSQ',
					components: {
						default: meetingManageSQ
					}
				},

				{
					path: '/provinceStockSQ',
					name: 'provinceStockSQ',
					components: {
						default: provinceStockSQ
					}
				},
				{
					path: '/addressListSQ',
					name: 'addressListSQ',
					components: {
						default: addressListSQ
					}
				},
				{
					path: '/areaManageSQ',
					name: 'areaManageSQ',
					components: {
						default: areaManageSQ
					}
				},
				{
					path: '/PersonnelApplicationSQ',
					name: 'PersonnelApplicationSQ',
					components: {
						default: PersonnelApplicationSQ
					}
				},
				{
					path: '/provinceRetuenMoneySQ',
					name: 'provinceRetuenMoneySQ',
					components: {
						default: provinceRetuenMoneySQ
					}
				},
				{
					path: '/roleManageSQ',
					name: 'roleManageSQ',
					components: {
						default: roleManageSQ
					}
				},
				{
					path: '/accountManageSQ',
					name: 'accountManageSQ',
					components: {
						default: accountManageSQ
					}
				}
			]
		},
		{
			path: '/detailFeedbackZB',
			name: 'detailFeedbackZB',
			component: detailFeedbackZB
		},
		{
			path: '/view_onsaleGoodsZB',
			name: 'view_onsaleGoodsZB',
			component: view_onsaleGoodsZB
		},
		{
			path: '/viewDetail_GoodsZB',
			name: 'viewDetail_GoodsZB',
			component: viewDetail_GoodsZB
		},
		{
			path: '/edit_removeGoodsZB',
			name: 'edit_removeGoodsZB',
			component: edit_removeGoodsZB
		},
		{
			path: '/view_researGoodsZB',
			name: 'view_researGoodsZB',
			component: view_researGoodsZB
		},
			{
			path: '/meetingManageDetailZB',
			name: 'meetingManageDetailZB',
			component: meetingManageDetailZB
		},
		{
			path: '/changePriceZB',
			name: 'changePriceZB',
			component: changePriceZB
		},
		{
			path: '/changePartPriceZB',
			name: 'changePartPriceZB',
			component: changePartPriceZB
		},
		{
			path: '/applyFormDeataiZB',
			name: 'applyFormDeataiZB',
			component: applyFormDeataiZB
		},
		{
			path: '/batChangePriceZB',
			name: 'batChangePriceZB',
			component: batChangePriceZB
		},
		{
			path: '/creatBusiCompanyZB',
			name: 'creatBusiCompanyZB',
			component: creatBusiCompanyZB
		},
		{
			path: '/viewBusiCompanyZB',
			name: 'viewBusiCompanyZB',
			component: viewBusiCompanyZB
		},

		{
			path: '/viewterminCustomerZB',
			name: 'viewterminCustomerZB',
			component: viewterminCustomerZB
		},
		{
			path: '/editBusCompanyZB',
			name: 'editBusCompanyZB',
			component: editBusCompanyZB
		},

		{
			path: '/provinStockLogZB',
			name: 'provinStockLogZB',
			component: provinStockLogZB
		},
		{
			path: '/view_promoPolicyZB',
			name: 'view_promoPolicyZB',
			component: view_promoPolicyZB
		},
		{
			path: '/add_promoPolicyZB',
			name: 'add_promoPolicyZB',
			component: add_promoPolicyZB
		},
		{
			path: '/edit_promoPolicyZB',
			name: 'edit_promoPolicyZB',
			component: edit_promoPolicyZB
		},
		{
			path: '/countyOrderDetailZB',
			name: 'countyOrderDetailZB',
			component: countyOrderDetailZB
		},
		{
			path: '/provinceOrderDetailZB',
			name: 'provinceOrderDetailZB',
			component: provinceOrderDetailZB
		},
		{
			path: '/proOrderBillZB',
			name: 'proOrderBillZB',
			component: proOrderBillZB
		},
		{
			path: '/proOrderSendGoodsZB',
			name: 'proOrderSendGoodsZB',
			component: proOrderSendGoodsZB
		},
		{
			path: '/policyOweDetailZB',
			name: 'policyOweDetailZB',
			component: policyOweDetailZB
		},
    {
      path: '/provinceRetuenMoneyDetailZB',
      name: 'provinceRetuenMoneyDetailZB',
      component: provinceRetuenMoneyDetailZB
    },
    {
      path: '/viewDetailPAZB',
      name: 'viewDetailPAZB',
      component: viewDetailPAZB
    },
    {
      path: '/viewDetailPAeditZB',
      name: 'viewDetailPAeditZB',
      component: viewDetailPAeditZB
    },
		{
			path: '/viewDetail_GoodsSQ',
			name: 'viewDetail_GoodsSQ',
			component: viewDetail_GoodsSQ
		},
		{
			path: '/view_researGoodsSQ',
			name: 'view_researGoodsSQ',
			component: view_researGoodsSQ
		},
    {
      path: '/PersonnelApplicationDatailSQ',
      name: 'PersonnelApplicationDatailSQ',
      component: PersonnelApplicationDatailSQ
    },
		{
			path: '/changePriceSQ',
			name: 'changePriceSQ',
			component: changePriceSQ
		},
		{
			path: '/batChangeSQ',
			name: 'batChangeSQ',
			component: batChangeSQ
		},
		{
			path: '/applyFormDeataiSQ',
			name: 'applyFormDeataiSQ',
			component: applyFormDeataiSQ
		},
		{
			path: '/provinStockLogSQ',
			name: 'provinStockLogSQ',
			component: provinStockLogSQ
		},
		{
			path: '/saleOrderDetailSQ',
			name: 'saleOrderDetailSQ',
			component: saleOrderDetailSQ
		},
		{
			path: '/viewterminCustomerSQ',
			name: 'viewterminCustomerSQ',
			component: viewterminCustomerSQ
		},
		{
			path: '/meetingManageDetailSQ',
			name: 'meetingManageDetailSQ',
			component: meetingManageDetailSQ
		},
		{
			path: '/add_promoPolicySQ',
			name: 'add_promoPolicySQ',
			component: add_promoPolicySQ
    },
		{
			path: '/view_promoPolicySQ',
			name: 'view_promoPolicySQ',
			component: view_promoPolicySQ
    },
		{
			path: '/edit_promoPolicySQ',
			name: 'edit_promoPolicySQ',
			component: edit_promoPolicySQ
    },
    {
      path: '/provinceRetuenMoneyDetailSQ',
      name: 'provinceRetuenMoneyDetailSQ',
      component: provinceRetuenMoneyDetailSQ
    },
	]

})
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user')
    next()
  } else if(to.path.startsWith('/register')){
    window.sessionStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});
export default router
