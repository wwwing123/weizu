// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import axios from 'axios'
import ImgLazyLoad from 'vue-lazyload'
import MuseUi from 'muse-ui'
import Toast from './components/Toast.js'
import './components/Toast.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import VeeValidate,{ Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';


Vue.use(Toast)
Vue.use(Router)
Vue.use(MuseUi)
Vue.use(VeeValidate);
Validator.locale ==="en" ? "zh_CN" : "en";
Validator.localize(Validator.locale,{
    messages: {
        email: () => '请输入正确的邮箱格式',
        required: (field,a)=> field+"不能为空"
      },
    attributes:{
        email:'登录名',
        loginPassword:'密码'
    }
});
console.log(Validator)
Validator.extend('mobile', {
	getMessage:(field, [args]) => `请输入正确的手机号码`,
	validate: value => {
    return value.length == 11 && /^1[3|4|5|8][0-9]\d{4,8}$/.test(value)
	}
});
Validator.extend('vcode', {
	getMessage:(field, [args]) => `请输入6位数字验证码`,
	validate: value => {
    return value.length == 6 && /^\d{6}$/.test(value)
	}
});
Validator.extend('password', {
	getMessage:(field, [args]) => `请输入8位以上的密码`,
	validate: value => {
    return /^[0-9a-zA-Z!@#$%^&*]{8,19}$/.test(value)
	}
});
//Validator.extend('vcode', {
//messages: {
//  zh_CN:field => field + '必须是6位数字验证码',
//},
//validate: value => {
//  return value.length == 6 && /^\d{6}$/.test(value)
//}
//});
const dictionary = {
   zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: ( field )=> "请输入" + field
      },
      attributes:{
        email:'邮箱',
        password:'密码',
        name: '账号',
        mobile: '手机',
        length11:'长度'
      }
  }
};
//Validator.updateDictionary(dictionary);


Vue.config.productionTip = false
window.axios = axios;
Vue.use(ImgLazyLoad, {
  loading: 'http://image.heitem.com/timg.gif',
  })
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5993f32f059b9c566dbf4430/frent';
axios.defaults.autofaceURL = 'https://www.easy-mock.com/mock/5993f32f059b9c566dbf4430/frent';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
