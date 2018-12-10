export const getNavbarInfo = 'getNavbarInfo'

export default {	
	getNavbarInfo(state,res){
		state.navbarList = res;
	},
	changeMenuIndex(state,res){
		state.activeIndexTop = res;
	}
}
