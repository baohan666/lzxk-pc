import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.scss'
import './assets/css/common.scss'

import Vue from 'vue'
import ElementUI from 'element-ui'
import instance from './service/http'
import store from './store/index'
import router from './router'


import App from './App'
import './config/rem'
import VueOnkeypress from 'src/directive/onkeypress/index'
Vue.directive('VueOnkeypress', VueOnkeypress);

Vue.config.productionTip = false
Vue.use(ElementUI);

/*点击查看大图*/
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": false, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

new Vue({
  el: '#app',
  instance,
  router,
  store,
  components: { App },
  template: '<App/>'
})
