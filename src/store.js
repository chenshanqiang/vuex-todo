/* jshint esversion: 6 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 所有列表任务
        list: [],
        inputValue: 'aaa',
        nextId: 5,
        keys: 'all'
    },
    mutations: {
        initList(state, data) {
            state.list = data
        },
        // 输入框赋值
        setInputValue(state, val) {
            state.inputValue = val
        },
        // 添加列表数据
        addItem(state) {
            const obj = {
                id: state.nextId,
                info: state.inputValue.trim(),
                done: false
            }
            state.list.push(obj)
            state.inputValue = ''
            state.nextId++
        },
        removeItem(state, id) {
            // 根据Id查找对应项的索引
            const i = state.list.findIndex((x) => x.id === id)
                // 根据索引，删除对应的元素
            if (i !== -1) {
                state.list.splice(i, 1)
            }
        },
        // 修改选中状态
        changeStatus(state, params) {
            const i = state.list.findIndex((x) => x.id === params.id)
            if (i !== -1) {
                state.list[i].done = params.status
            }
        },
        // 清除选中的
        cleanDone(state) {
            state.list = state.list.filter(x => x.done === false)
        },
        changeViewKey(state, key) {
            state.keys = key
        }
    },
    actions: {
        getAsync(context) {
            axios.get('./list.json').then(({ data }) => {
                context.commit('initList', data)
            })
        }
    },
    // getters对数据源进行包装，并不改变数据源
    getters: {
        undoList(state) {
            // eslint-disable-next-line no-return-assign
            return state.list.filter(x => x.done === true).length
        },
        infolist(state) {
            if (state.keys === 'all') {
                return state.list
            }
            if (state.keys === 'undone') {
                return state.list.filter(x => !x.done)
            }
            if (state.keys === 'done') {
                return state.list.filter(x => x.done)
            }
            return state.list
        }
    }
})