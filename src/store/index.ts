import { createStore } from 'vuex'

import type { State, ActionPayload, ActionContext } from '@/types/store'
import type { Task, FilterType } from '@/types/todos'

import mockApi from '@/helpers/mockApi'

export default createStore<State>({
  state: () => ({
    todos: [],
    task: null,
    filter: 'any',
    search: '',
    isLoadingTodos: false,
  }),

  getters: {
    getTodos: (state: State) => state.todos,
    getFilter: (state: State) => state.filter,
    getIsLoadingTodos: (state: State) => state.isLoadingTodos,
  },

  mutations: {
    setTodos(state: State, payload: Task[]) {
      state.todos = payload
    },
    setFilter(state: State, payload: FilterType) {
      state.filter = payload
    },
    setIsLoadingTodos(state: State, payload: boolean) {
      state.isLoadingTodos = payload
    },
  },

  actions: {
    async onGetTodos({ getters, commit }: ActionContext, { params }: ActionPayload) {
      commit('setIsLoadingTodos', true)

      const response = await mockApi.get({
        url: '/todos/',
        params: { filter: getters.getFilter, ...params },
      })

      if (response.status === 200 || response.status === 201) {
        commit('setTodos', response.data as Task[])
      }

      commit('setIsLoadingTodos', false)
    },

    async onCreateTask({ commit, dispatch }: ActionContext, { params }: ActionPayload) {
      commit('setIsLoadingTodos', true)

      const response = await mockApi.post({ url: '/todos/', params })
      if (response.status === 200 || response.status === 201) {
        await dispatch('onGetTodos', {})
      }

      commit('setIsLoadingTodos', false)
      return response
    },

    async onUpdateTask({ commit, dispatch }: ActionContext, { params }: ActionPayload) {
      commit('setIsLoadingTodos', true)

      const response = await mockApi.put({ url: `/todos/${params?.id}`, params })
      if (response.status === 200 || response.status === 201) {
        await dispatch('onGetTodos', {})
      }

      commit('setIsLoadingTodos', false)
      return response
    },

    async onDeleteTask({ commit, dispatch }: ActionContext, { params }: ActionPayload) {
      commit('setIsLoadingTodos', true)

      let response
      if (params?.id) {
        response = await mockApi.delete({ url: `/todos/${params?.id}`, params })
      } else if (params?.completed) {
        response = await mockApi.delete({ url: `/todos/`, params })
      }

      commit('setIsLoadingTodos', false)
      if (response?.status === 200 || response?.status === 201) {
        await dispatch('onGetTodos', {})
      }
    },
  },
})
