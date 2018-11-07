import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import {increment} from './mutation-types'
const myPlugin=store=>{
	store.subscribe((mutation,state) => {
		console.log(234)
	})
}
const moduleA={
	state:{
		count:10,
	},
	plugins:[myPlugin],
	mutations:{
		increment(state,payload){
			state.count+=payload.amount;
		}
	}
}
const moduleB={
	state:{
		count:100,
	},
	mutations:{
		increment(state,payload){
			state.count+=payload.amount;
		}
	}
}

export default new Vuex.Store({
	modules:{
		a:moduleA,
		b:moduleB
	},
	
//	state:{
//		count:0,
//		todos:[
//			{id:1,text:'...',done:true},
//			{id:2,text:'...',done:true}
//		]
//	},
//	getters:{
//		doneTodos:state=>{
//			return state.todos.filter(todo=>todo.done)
//		},
//		doneTodosCount:(state,getters)=>{
//			return getters.doneTodos.length
//		},
//		getTodoById:(state)=>(id)=>{
//			return state.todos.find(todo=>todo.id==id)
//		}
//	},
//	mutations:{
//		[increment](state,payload){
//			state.count+=payload.amount
//		},
//		incrementBy(state){
//			state.count++
//		}
//	},
//	actions:{
//		increment(context){
//			context.commit('increment')
//		},
//		incrementAsync({commit}){
//			setTimeout(()=>{
//				commit('increment',{amount:10})
//			},1000)
//		},
//		actionA({commit}){
//			return new Promise((resolve,reject)=>{
//				setTimeout(()=>{
//					commit('someMutation')
//					resolve()
//				},1000)
//			})
//		}
//	}
})
