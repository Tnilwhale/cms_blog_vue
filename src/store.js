

import Vue from 'vue'
import Vuex from 'vuex'
import token from './token'
import {login} from "./api/user";
/*
 * @Author shaokexiang
 * @Date 2021/2/15 21:08
 * @Description //转态管理
 **/

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: token.get()
  },
  mutations: {
    setToken(state, paramToken) {
      state.token = paramToken
      token.set(paramToken)
    },
  },
  actions:{
    login({commit},user){
      return new Promise((resolve,reject)=> {
        login(user.userName,user.password).then(data=>{
          //处理 token写入vuex、localStorage
          // console.log(data)
          // console.log(data)
          // console.log(data)
          // commit('setToken',data.data.token)
          // console.log(data.data.user)
          token.setUser(data.data.user)
          commit('setToken',data.data.token)
          resolve()
        }).catch(error=>{
          reject(error)
        })
      })
    }
  }

})

export default store