import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PhoneNumber: '',
    isLogin:0
  },
  mutations: {
    LoginPhone (state, phone) {
      state.PhoneNumber = phone;
      sessionStorage.setItem('PhoneNumber', JSON.stringify(state.PhoneNumber))
    },
    updateLogin(state, status){
      state.isLogin = status;
      sessionStorage.setItem('isLogin', JSON.stringify(state.isLogin))
    }
  },
})
