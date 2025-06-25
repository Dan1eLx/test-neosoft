export interface Task {
  id: number
  title: string
  completed: boolean
}

export type FilterType = 'any' | 'completed' | 'active'

export interface Filter {
  value: FilterType
  label: string
}
