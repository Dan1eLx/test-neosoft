import type { Task, FilterType } from '@/types/todos'

export type ApiParams = Partial<Task> & {
  filter?: FilterType
  id?: number
  completed?: boolean
}

export interface ApiRequest {
  url: string
  params?: ApiParams
}

export interface ApiResponse {
  status: number
  data?: Task | Task[]
  message?: string
}
