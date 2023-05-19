import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //现在正在阅读图书的信息
    currentReadBook:[]
  },
  getters: {
  },
  mutations: {
    getBookMsg(state,value){
      state.currentReadBook = value
    }
  },
  actions: {
  },
  modules: {
  }
})
