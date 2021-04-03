import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Tinymce
import 'tinymce/plugins/colorpicker/plugin.js'
import 'tinymce/plugins/paste/plugin.js'
import 'tinymce/plugins/importcss/plugin.js'
import 'tinymce/plugins/image/plugin.js'
import 'tinymce/plugins/code/plugin.js'
import 'tinymce/plugins/table/plugin.js'
import 'tinymce/plugins/advlist/plugin.js'
import 'tinymce/plugins/fullscreen/plugin.js'
import 'tinymce/plugins/link/plugin.js'
import 'tinymce/plugins/lists/plugin.js'
import 'tinymce/plugins/textcolor/plugin.js'
import 'tinymce/plugins/hr/plugin.js'
import 'tinymce/plugins/preview/plugin.js'
import 'tinymce/zh_CN.js'

//dialog可拖动与调整大小
import '@/js/directives.js';
// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')