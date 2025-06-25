import type { ApiRequest, ApiResponse } from '@/types/api'
import type { Task } from '@/types/todos'

const createApiMock = () => {
  const delay = 500
  const defaultData: Task[] = [
    {
      id: 1,
      title: 'Продумать архитектуру',
      completed: true,
    },
    {
      id: 2,
      title: 'Написать логику',
      completed: false,
    },
    {
      id: 3,
      title: 'Протестировать',
      completed: false,
    },
  ]

  let mockData: Task[] = [...defaultData]

  return {
    get: ({ params }: ApiRequest): Promise<ApiResponse> => {
      return new Promise((resolve) => {
        let response: Task[] = mockData

        if (params?.filter) {
          response = response.filter(({ completed }) => {
            if (params.filter === 'completed') {
              return completed
            } else if (params.filter === 'active') {
              return !completed
            } else {
              return true
            }
          })
        }

        setTimeout(() => {
          resolve({
            status: 200,
            data: response,
          })
        }, delay)
      })
    },

    post: ({ params }: ApiRequest): Promise<ApiResponse> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!params || !params.title) {
            reject({
              status: 400,
              message: 'Bad Request: Name is required',
            })
            return
          }

          const response: Task = {
            id: Math.floor(Math.random() * 1000),
            title: params.title,
            completed: false,
          }

          mockData.push(response)
          resolve({
            status: 201,
            data: response,
          })
        }, delay)
      })
    },

    put: ({ params }: ApiRequest): Promise<ApiResponse> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!params?.id) {
            reject({
              status: 400,
              message: 'Bad Request: No data provided',
            })
            return
          }
          const index = mockData.findIndex(({ id }) => id === params.id)
          if (index === -1) {
            reject({
              status: 404,
              message: 'Not Found',
            })
            return
          }

          mockData[index] = {
            ...mockData[index],
            ...params,
          }

          resolve({
            status: 200,
            data: mockData[index],
          })
        }, delay)
      })
    },

    delete: ({ url, params }: ApiRequest): Promise<ApiResponse> => {
      return new Promise((resolve) => {
        if (params?.id) {
          mockData = mockData.filter(({ id }) => id !== params.id)
        }
        if (params?.completed) {
          mockData = mockData.filter(({ completed }) => !completed)
        }
        setTimeout(() => {
          resolve({
            status: 200,
            message: `Resource at ${url} deleted successfully`,
          })
        }, delay)
      })
    },
  }
}

const apiMock = createApiMock()

export default apiMock
