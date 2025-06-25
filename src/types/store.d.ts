import type { Task, FilterType } from '@/types/todos'
import type { ApiParams } from '@/types/api'

import type { Commit, Dispatch } from 'vuex'

export interface State {
  todos: Task[]
  filter: FilterType
  isLoadingTodos: boolean
}
export interface ActionPayload {
  params?: ApiParams
}

type ActionContext = {
  state: State
  getters: {
    getTodos: Task[]
    getFilter: FilterType
    getIsLoadingTodos: boolean
  }
  commit: Commit
  dispatch: Dispatch
}
